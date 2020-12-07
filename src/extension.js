// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const base64 = require('./lib/base64');
const base32 = require('./lib/base32');
const hex = require('./lib/hex');
const urlencode = require('./lib/urlencode');
const ip = require('./lib/ip');
const html = require('./lib/html');
const hash = require('./lib/hash');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "xssencode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let transformers =  [
		new base64.Base64ToStringTransformer(),
		new base64.StringToBase64Transformer(),
		new base32.Base32ToStringTransformer(),
		new base32.StringToBase32Transformer(),
		new hex.StringToHexTransformer(),
		new hex.HexToStringTransformer(),
		new urlencode.StringToEncodedUrlTransformer(),
		new urlencode.StringToEncodedUrlAllCharactersTransformer(),
		new urlencode.EncodedUrlToStringTransformer(),
		new ip.IPv4ToNumberTransformer(),
		new ip.NumberToIPv4Transformer(),
		new html.StringToHTMLEntitiesTransformer(),
		new html.StringToHTML10Transformer(),
		new html.StringToHTML16Transformer(),
		new html.HTMLToStringTransformer(),
		new hash.StringToMD5Transformer(),
		new hash.StringToMD5_16Transformer(),
		new hash.StringToSHA1Transformer()
	];

	transformers.forEach(v => {
		context.subscriptions.push(vscode.commands.registerTextEditorCommand(`xssencode.${v.command}`, function(textEditor, edit){
			v.Init(textEditor, edit);
		}));
	});
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
