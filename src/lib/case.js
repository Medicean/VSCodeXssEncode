'use strict';

const Transformer = require('../core');
const utils = require('../utils');

class StringToRandomCaseTransformer extends Transformer {
    get command () {
        return 'StringToRandomCase';
    }
    get label() {
        return "String to Random Case";
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
        let arr = input.split('').map(e => {
          return utils.RandomChoice([e.toLocaleLowerCase(),e.toUpperCase()])
        });
        return arr.join('');
	}
}

module.exports = {
  StringToRandomCaseTransformer,
}