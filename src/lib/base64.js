'use strict';

const Transformer = require('../core');

class StringToBase64Transformer extends Transformer {
    get command () {
        return 'StringToBase64';
    }
    get label() {
        return "String to Base64";
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
		var output = Buffer.from(input).toString('base64');
		return output;
	}
}

class Base64ToStringTransformer extends Transformer {
    get command () {
        return 'Base64ToString';
    }
    get label() {
        return "Base64 to String"
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
		var output = Buffer.from(input, 'base64').toString();
		return output;
	}
}

module.exports = {
    StringToBase64Transformer,
    Base64ToStringTransformer
}