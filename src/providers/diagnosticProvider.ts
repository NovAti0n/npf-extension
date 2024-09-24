import * as vscode from 'vscode';

import parameters from '../symbols/parameters';
import sections from '../symbols/sections';

// Register the diagnostic collection
export const diagnosticProvider = vscode.languages.createDiagnosticCollection("npf");

// Validate the document on open
vscode.workspace.onDidOpenTextDocument(doc => {
    validateDocument(doc, diagnosticProvider);
});

// Validate the document on change
vscode.workspace.onDidChangeTextDocument(e => {
    validateDocument(e.document, diagnosticProvider);
});

function validateDocument(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection) {
    const diagnostics: vscode.Diagnostic[] = [];
    const lines = document.getText().split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (!line.startsWith('%')) continue;

        const section = sections.find(s => line.startsWith(`%${s.name}`));

        if (!section) {
            // Check if section exists
            diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(i, 0, i, line.length),
                "Unknown section name",
                vscode.DiagnosticSeverity.Error
            ));
        } else {
            if (!section.hasRoleName && line.includes('@')) {
                // Check if section allows role names
                diagnostics.push(new vscode.Diagnostic(
                    new vscode.Range(i, 0, i, line.length),
                    "Roles are not allowed in this section (allowed in script and import)",
                    vscode.DiagnosticSeverity.Error
                ));
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
                        diagnostics.push(new vscode.Diagnostic(
                            new vscode.Range(i, line.indexOf(param), i, line.indexOf(param) + param.length),
                            `Unknown parameter '${key}'`,
                            vscode.DiagnosticSeverity.Warning
                        ));
                    } else if (!paramInfo.sections.includes(section.name)) {
                        // If the parameter is not allowed in the current section
                        diagnostics.push(new vscode.Diagnostic(
                            new vscode.Range(i, line.indexOf(param), i, line.indexOf(param) + param.length),
                            `Parameter '${key}' is not allowed in section '%${section.name}'`,
                            vscode.DiagnosticSeverity.Error
                        ));
                    }
                });
            }
        }
    }

    diagnosticCollection.set(document.uri, diagnostics);
}