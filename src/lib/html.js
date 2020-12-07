'use strict';

const Transformer = require('../core');
const entities = require("entities");


class StringToHTMLEntitiesTransformer extends Transformer {
    get command () {
        return 'StringToHTMLEntities';
    }
    get label() {
        return "String to HTML Entities";
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
        return entities.encodeHTML(input);
    }
}

class StringToHTML10Transformer extends Transformer {
    get command () {
        return 'StringToHTML10';
    }
    get label() {
        return "String to HTML10";
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
        let output = "";
        for (let index = 0; index < input.length; index++) {
            output += "&#" + input.charCodeAt(index) + ";";
        }
        return output;
    }
}

class StringToHTML16Transformer extends Transformer {
    get command () {
        return 'StringToHTML16';
    }
    get label() {
        return "String to HTML16";
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
        let output = "";
        for (let index = 0; index < input.length; index++) {
            output += "&#x" + input.charCodeAt(index).toString(16) + ";";
        }
        return output;
    }
}

class HTMLToStringTransformer extends Transformer {
    get command () {
        return 'HTMLToString';
    }
    get label() {
        return "HTML to String"
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
        return entities.decodeHTML(input)
    }
}

module.exports = {
    StringToHTMLEntitiesTransformer,
    StringToHTML10Transformer,
    StringToHTML16Transformer,
    HTMLToStringTransformer
}