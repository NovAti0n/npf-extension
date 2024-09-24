import * as vscode from 'vscode';
import { sections } from './keywords';

export function activate(context: vscode.ExtensionContext) {
    // Register the diagnostic collection
    const diagnosticCollection = vscode.languages.createDiagnosticCollection("npf");

    // Validate the document on open
    vscode.workspace.onDidOpenTextDocument(doc => {
        validateDocument(doc, diagnosticCollection);
    });

    // Validate the document on change
    vscode.workspace.onDidChangeTextDocument(e => {
        validateDocument(e.document, diagnosticCollection);
    });

    // Provides autocompletion for section names
    const sectionCompletionProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'npf', scheme: 'file' },
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                // Get the text before the cursor
                const linePrefix = document.lineAt(position).text.slice(0, position.character);

                if (!linePrefix.endsWith('%')) return undefined;

                // Add a completion item for each section
                const completionItems = sections.map(s => {
                    const item = new vscode.CompletionItem(s.name, vscode.CompletionItemKind.Keyword);
                    item.insertText = new vscode.SnippetString(s.name);
                    item.documentation = new vscode.MarkdownString(s.description);

                    return item;
                });

                return completionItems;
            }
        },
        '%' // Trigger autocompletion when the user types '%'
    );

    const sectionHoverProvider = vscode.languages.registerHoverProvider(
        { "language": "npf", "scheme": "file" },
        {
            provideHover(document, position) {
                const range = document.getWordRangeAtPosition(position);
                if (!range) return;

                const word = document.getText(range);
                const section = sections.find(s => s.name === word);
                if (!section) return;

                return new vscode.Hover(section.description, range);
            }
        }
    );

    // Register the providers
    context.subscriptions.push(sectionCompletionProvider, sectionHoverProvider, diagnosticCollection);
}

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

export function deactivate() { }
