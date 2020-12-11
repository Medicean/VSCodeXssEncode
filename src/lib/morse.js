'use strict';

const Transformer = require('../core');
const xmorse = require('xmorse');

class StringToMorseTransformer extends Transformer {
    get command () {
        return 'StringToMorse';
    }
    get label() {
        return "String to Morse";
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
		var output = xmorse.encode(input, {
            space: ' ',
            long: '-',
            short: '.',
        });
		return output;
	}
}

class MorseToStringTransformer extends Transformer {
    get command () {
        return 'MorseToString';
    }
    get label() {
        return "Morse to String"
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
        input = input.replace(/\//g, ' ');
		var output = xmorse.decode(input, {
            space: ' ',
            long: '-',
            short: '.',
        });
		return output;
	}
}

module.exports = {
    StringToMorseTransformer,
    MorseToStringTransformer
}