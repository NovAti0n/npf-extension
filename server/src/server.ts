import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';

const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialized(() => {
    console.log("Server initialized");
});

documents.listen(connection);
connection.listen();