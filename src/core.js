
'use strict'

const util = require('util');
const vscode = require('vscode');

class Transformer {
    constructor() {
        this.textEditor = null;
        this.edit = null;
    }
    get command() {
        return 'BaseTransformer';
    }
    get label() {
        return "Base Transformer";
    }
    get description() {
        return this.label;
    }
    /**
     * @param {string} input
     * @returns {boolean}
     */
    check(input) {
        return true;
    }
    transform(input) {
        return input;
    }
    Init(textEditor, edit) {
        let _self = this;
        _self.textEditor = textEditor;
        _self.edit = edit;
        let failed = [];
        // process each selection
        for (let selectionIndex = 0; selectionIndex < _self.textEditor.selections.length; selectionIndex++) {
            let selection = _self.textEditor.selections[selectionIndex];
            let range = new vscode.Range(selection.start, selection.end);
            if (_self.textEditor.selections.length === 1 && range.isEmpty) {
                let firstLine = _self.textEditor.document.lineAt(0);
                let lastLine = _self.textEditor.document.lineAt(_self.textEditor.document.lineCount - 1);
                range = new vscode.Range(firstLine.range.start, lastLine.range.end)
            }
            let input = _self.textEditor.document.getText(range);
            let output = input;
            try {
                let checkresult = _self.check(input);
                if (checkresult === true) {
                    try {
                        output = _self.transform(input);
                        _self.edit.replace(range, output);
                    } catch (error) {
                        failed.push({
                            err: error,
                            range: range,
                            input: input
                        })
                    }
                } else {
                    failed.push({
                        err: 'CheckFail',
                        range: range,
                        input: input
                    })
                }
            } catch (error) {
                failed.push({
                    err: 'CheckException:' + error.toString(),
                    range: range,
                    input: input
                })
            }
        }
        //
        if(failed.length != 0) {
            let message = util.format(
                '%s selections could not be processed.<br/>See more at Output Pannel.',
                failed.length
            );
            vscode.window.showWarningMessage(message);
            let outChannel = vscode.window.createOutputChannel("xssencode");
            for (let index = 0; index < failed.length; index++) {
                const v = failed[index];
                var tmpinput = v.input.replace(/\s+?/g,'');
                let msg = util.format(
                    "%d. [section: %d:%d ~ %d:%d] input: (%s) Error: %s",
                    index + 1,
                    v.range.start.line,
                    v.range.start.character,
                    v.range.end.line,
                    v.range.end.character,
                    tmpinput.length > 10 ? `${tmpinput.slice(0,3)}...${tmpinput.slice(-3)}`: tmpinput,
                    v.err.toString(),
                )
                outChannel.appendLine(msg)
                console.warn(msg)
            }
            outChannel.show()
        }
    }
}

module.exports = Transformer;
