import * as vscode from 'vscode';
import { sections } from './keywords';

export function activate(context: vscode.ExtensionContext) {
    // Provides autocompletion for section names
    const sectionCompletionProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'npf', scheme: 'file' },
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                // Get the text before the cursor
                const linePrefix = document.lineAt(position).text.slice(0, position.character);

                if (!linePrefix.endsWith('%')) return undefined;

                // Add a completion item for each section
                const completionItems = sections.map(section => {
                    const item = new vscode.CompletionItem(section.name, vscode.CompletionItemKind.Keyword);
                    item.insertText = new vscode.SnippetString(section.name);
                    item.documentation = new vscode.MarkdownString(section.description);

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
    context.subscriptions.push(sectionCompletionProvider, sectionHoverProvider);
}

export function deactivate() { }
