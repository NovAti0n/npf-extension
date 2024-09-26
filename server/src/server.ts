import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
	InitializeResult,
	TextDocumentSyncKind,
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';

const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

/* connection.onInitialize(_ => {
	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental, // Server will sync document changes to the client
			completionProvider: { // Server provides completion items
				resolveProvider: true // Server will resolve additional information for completion items
			}
		}
	};

	return result;
}); */

connection.onInitialized(() => {
	console.log("Server initialized");
});

documents.listen(connection);
connection.listen();