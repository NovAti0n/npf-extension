import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";

import parameters from "../symbols/parameters";
import sections from "../symbols/sections";

export function validateDocument(document: TextDocument): Diagnostic[] {
    const diagnostics: Diagnostic[] = [];
    const lines = document.getText().split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (!line.startsWith('%')) continue;

        const section = sections.find(s => line.startsWith(`%${s.name}`));

        if (!section) {
            // Check if section exists
            diagnostics.push({
                range: {
                    start: { line: i, character: 0 },
                    end: { line: i, character: line.length }
                },
                message: `Unknown section '${line.split(' ')[0]}'`,
                severity: DiagnosticSeverity.Error
            });
        } else {
            if (!section.hasRoleName && line.includes('@')) {
                // Check if section allows role names
                diagnostics.push({
                    range: {
                        start: { line: i, character: 0 },
                        end: { line: i, character: line.length }
                    },
                    message: `Section '%${section.name}' does not allow role names`,
                    severity: DiagnosticSeverity.Error
                });
            }

            // Extract parameters from the line
            const paramMatches = line.match(/\b(\w+)=([^ ]+)/g);
            
            if (paramMatches) {
                // Validate each parameter against the allowed parameters for this section
                paramMatches.forEach(param => {
                    const [key, _] = param.split('=');
                    const paramInfo = parameters.find(p => p.name === key);

                    if (!paramInfo) {
                        // If the parameter is not recognized at all
                        diagnostics.push({
                            range: {
                                start: { line: i, character: line.indexOf(param) },
                                end: { line: i, character: line.indexOf(param) + param.length }
                            },
                            message: `Unknown parameter '${key}'`,
                            severity: DiagnosticSeverity.Warning
                        });
                    } else if (!paramInfo.sections.includes(section.name)) {
                        // If the parameter is not allowed in the current section
                        diagnostics.push({
                            range: {
                                start: { line: i, character: line.indexOf(param) },
                                end: { line: i, character: line.indexOf(param) + param.length }
                            },
                            message: `Parameter '${key}' is not allowed in section '%${section.name}'`,
                            severity: DiagnosticSeverity.Error
                        });
                    }
                });
            }
        }
    }

    return diagnostics;
}