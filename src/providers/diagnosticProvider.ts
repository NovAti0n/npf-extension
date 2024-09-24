import * as vscode from 'vscode';

import { sections } from '../keywords';

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
        } else if (!section.hasRoleName && line.includes('@')) {
            // Check if section allows role names
            diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(i, 0, i, line.length),
                "Roles are not allowed in this section (allowed in script and import)",
                vscode.DiagnosticSeverity.Error
            ));
        }
    }

    diagnosticCollection.set(document.uri, diagnostics);
}