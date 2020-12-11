'use strict';

const Transformer = require('../core');

class StringToUnicodeTransformer extends Transformer {
    get command () {
        return 'StringToUnicode';
    }
    get label() {
        return "String to Unicode";
    }
    /**
     * @param {string} input
     * @returns {boolean}
     */
    check(input) {
        return Buffer.from(input).length != 0;
    }
    /**
     * @param {string} input
     * @returns {string}
     */
    transform(input) {
        var arr = new Array();
        for (let i = 0; i < input.length; i++) {
            arr[i] = `\\u${input.charCodeAt(i).toString(16).padStart(4, "0")}`
        }
        var output = arr.join("");
		return output;
	}
}

class UnicodeToStringTransformer extends Transformer {
    get command () {
        return 'UnicodeToString';
    }
    get label() {
        return "Unicode to String"
    }
    /**
     * @param {string} input
     * @returns {boolean}
     */
    check(input) {
        return true;
    }
    /**
     * @param {string} input
     * @returns {string}
     */
    transform(input) {
        var output = input.replace(/\\u/g, "%u");
        output = unescape(output);
		return output;
	}
}

module.exports = {
    StringToUnicodeTransformer,
    UnicodeToStringTransformer
}