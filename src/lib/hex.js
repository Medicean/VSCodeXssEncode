'use strict';

const Transformer = require('../core');

class StringToHexTransformer extends Transformer {
    get command () {
        return 'StringToHex';
    }
    get label() {
        return "String to Hex";
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
		var output = Buffer.from(input).toString('hex');
		return output;
	}
}

class HexToStringTransformer extends Transformer {
    get command () {
        return 'HexToString';
    }
    get label() {
        return "Hex to String"
    }
    /**
     * @param {string} input
     * @returns {boolean}
     */
    check(input) {
        for (var i = 0; i < input.length; ++i) {
            var cc = input.charCodeAt(i);
            if ((48 <= cc && cc <= 57) ||
                (65 <= cc && cc <= 70) ||
                (97 <= cc && cc <= 102)) {
              // '0'..'9', 'A'..'F' and 'a' .. 'f'.
            } else {
                return false;
            }
        }
        return true;
    }
    /**
     * @param {string} input
     * @returns {string}
     */
    transform(input) {
		var output = Buffer.from(input, 'hex').toString();
		return output;
	}
}

module.exports = {
    StringToHexTransformer,
    HexToStringTransformer
}