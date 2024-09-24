import * as vscode from 'vscode';

/**
 * Represents a symbol object
 */
interface SymbolObject {
    name: string;
    description: string;
    [key: string]: any; // Allow any other properties
}

/**
* Builds a completion provider for symbols
* @param symbols The symbols to provide completion for
* @param trigger The trigger character for autocompletion
* @returns The completion provider
*/
export function buildSymbolCompletionProvider(symbols: SymbolObject[], trigger: string) {
    const symbolCompletionProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'npf', scheme: 'file' },
        {
            provideCompletionItems(document, position) {
                // Get the text before the cursor
                const linePrefix = document.lineAt(position).text.slice(0, position.character);
    
                if (!linePrefix.endsWith(trigger)) return undefined;
    
                // Add a completion item for each keyword
                const completionItems = symbols.map(s => {
                    const item = new vscode.CompletionItem(s.name, vscode.CompletionItemKind.Keyword);
                    item.documentation = new vscode.MarkdownString(s.description);
    
                    return item;
                });
    
                return completionItems;
            }
        },
        trigger
    );

    return symbolCompletionProvider;
}

/**
 * Builds a hover provider for symbols
 * @param symbol The symbols to provide hover information for
 * @returns The hover provider
 */
export function buildSymbolHoverProvider(symbol: SymbolObject[]) {
    const symbolHoverProvider = vscode.languages.registerHoverProvider(
        { "language": "npf", "scheme": "file" },
        {
            provideHover(document, position) {
                const range = document.getWordRangeAtPosition(position);
                if (!range) return;
    
                const word = document.getText(range);
                const section = symbol.find(s => s.name === word);
                if (!section) return;
    
                return new vscode.Hover(section.description, range);
            }
        }
    );

    return symbolHoverProvider;
}