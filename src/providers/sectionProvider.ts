import * as vscode from 'vscode';

import { sections } from '../keywords';

// Provides autocompletion for section names
export const sectionCompletionProvider = vscode.languages.registerCompletionItemProvider(
    { language: 'npf', scheme: 'file' },
    {
        provideCompletionItems(document, position) {
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

export const sectionHoverProvider = vscode.languages.registerHoverProvider(
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