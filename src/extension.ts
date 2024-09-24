import * as vscode from 'vscode';
import { sections } from './keywords';

export function activate(context: vscode.ExtensionContext) {
    const sectionCompletionProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'npf', scheme: 'file' },
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const linePrefix = document.lineAt(position).text.slice(0, position.character);

                if (!linePrefix.endsWith('%')) return undefined;

                const completionItems = sections.map(section => {
                    const item = new vscode.CompletionItem(section, vscode.CompletionItemKind.Keyword);
                    item.insertText = new vscode.SnippetString(section);

                    return item;
                });

                return completionItems;
            }
        },
        '%'
    );
    
    context.subscriptions.push(sectionCompletionProvider);
}

export function deactivate() { }
