'use strict';

const Transformer = require('../core');
const utils = require('../utils');

class StringFromCharCodeTransformer extends Transformer {
    constructor(base=10) {
        super();
        this.base = base;
    }
    get command () {
        switch(this.base) {
            case 8:
                return 'StringFromCharCode8';
            case 16:
                return 'StringFromCharCode16';
            default:
                return 'StringFromCharCode';
        }
    }
    get label() {
        switch(this.base) {
            case 8:
                return "StringFromCharCode8 (Octal)";
            case 16:
                return "StringFromCharCode16 (Hex)";
            default:
                return "StringFromCharCode";
        }
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
            switch(this.base) {
                case 8:
                    arr[i] = `0${input.charCodeAt(i).toString(8)}`;
                    break;
                case 16:
                    arr[i] = `0x${input.charCodeAt(i).toString(16)}`;
                    break;
                default:
                    arr[i] = input.charCodeAt(i);
                    break;
            }
        }
        var output = `String.fromCharCode(${arr})`;
		return output;
	}
}


class StringToMySQLCHARTransformer extends Transformer {
    constructor(base=10) {
        super();
        this.base = base;
    }
    get command () {
        switch(this.base) {
            case 8:
                return 'StringToMySQLCHAR8';
            case 16:
                return 'StringToMySQLCHAR16';
            default:
                return 'StringToMySQLCHAR';
        }
    }
    get label() {
        switch(this.base) {
            case 8:
                return "String to MySQL CHAR8 (Octal)";
            case 16:
                return "String to MySQL CHAR16 (Hex)";
            default:
                return "String to MySQL CHAR";
        }
    }

    get chr () {
        return `${utils.RandomChoice(['c','C'])}${utils.RandomChoice(['h','H'])}${utils.RandomChoice(['a','A'])}${utils.RandomChoice(['r','R'])}`;
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
            switch(this.base) {
                case 8:
                    arr[i] = `0${input.charCodeAt(i).toString(8)}`;
                    break;
                case 16:
                    arr[i] = `0x${input.charCodeAt(i).toString(16)}`;
                    break;
                default:
                    arr[i] = `${input.charCodeAt(i)}`;
                    break;
            }
        }
        var output = arr.join(',');
        output = `${this.chr}(${output})`;
        return output;
    }
}


class StringToPHPCHRTransformer extends Transformer {
    constructor(base=10) {
        super();
        this.base = base;
    }
    get command () {
        switch(this.base) {
            case 8:
                return 'StringToPHPCHR8';
            case 16:
                return 'StringToPHPCHR16';
            default:
                return 'StringToPHPCHR';
        }
    }
    get label() {
        switch(this.base) {
            case 8:
                return "String to PHP CHR8 (Octal)";
            case 16:
                return "String to PHP CHR16 (Hex)";
            default:
                return "String to PHP CHR";
        }
    }

    get chr () {
        return `${utils.RandomChoice(['c','C'])}${utils.RandomChoice(['h','H'])}${utils.RandomChoice(['r','R'])}`;
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
            switch(this.base) {
                case 8:
                    arr[i] = `${this.chr}(0${input.charCodeAt(i).toString(8)})`;
                    break;
                case 16:
                    arr[i] = `${this.chr}(0x${input.charCodeAt(i).toString(16)})`;
                    break;
                default:
                    arr[i] = `${this.chr}(${input.charCodeAt(i)})`;
                    break;
            }
        }
        var output = arr.join('.');
        return output;
    }
}

class StringToPythonCHRTransformer extends Transformer {
    constructor(base=10) {
        super();
        this.base = base;
    }
    get command () {
        switch(this.base) {
            case 8:
                return 'StringToPythonCHR8';
            case 16:
                return 'StringToPythonCHR16';
            default:
                return 'StringToPythonCHR';
        }
    }
    get label() {
        switch(this.base) {
            case 8:
                return "String to Python CHR8 (Octal)";
            case 16:
                return "String to Python CHR16 (Hex)";
            default:
                return "String to Python CHR";
        }
    }

    get chr () {
        return `chr`;
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
            switch(this.base) {
                case 8:
                    arr[i] = `${this.chr}(0${input.charCodeAt(i).toString(8)})`;
                    break;
                case 16:
                    arr[i] = `${this.chr}(0x${input.charCodeAt(i).toString(16)})`;
                    break;
                default:
                    arr[i] = `${this.chr}(${input.charCodeAt(i)})`;
                    break;
            }
        }
        var output = arr.join('+');
        return output;
    }
}

class StringToOracleCHRTransformer extends Transformer {
    constructor(base=10) {
        super();
        this.base = base;
    }
    get command () {
        switch(this.base) {
            case 8:
                return 'StringToOracleCHR8';
            case 16:
                return 'StringToOracleCHR16';
            default:
                return 'StringToOracleCHR';
        }
    }
    get label() {
        switch(this.base) {
            case 8:
                return "String to Oracle CHR8 (Octal)";
            case 16:
                return "String to Oracle CHR16 (Hex)";
            default:
                return "String to Oracle CHR";
        }
    }

    get chr () {
        return `${utils.RandomChoice(['c','C'])}${utils.RandomChoice(['h','H'])}${utils.RandomChoice(['r','R'])}`;
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
            switch(this.base) {
                case 8:
                    arr[i] = `${this.chr}(0${input.charCodeAt(i).toString(8)})`;
                    break;
                case 16:
                    arr[i] = `${this.chr}(0x${input.charCodeAt(i).toString(16)})`;
                    break;
                default:
                    arr[i] = `${this.chr}(${input.charCodeAt(i)})`;
                    break;
            }
        }
        var output = arr.join('||');
        return output;
    }
}

class UnChrTransformer extends Transformer {
    get command () {
        return 'UnChr'
    }
    get label() {
        return 'UnChr (Chr to String)'
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
        const convert = (s) => {
            s=s.replace(/(\)(\.|\+|\|\|)cha?r\()/ig, ',');
            s=s.replace(/cha?r\(/ig, 'String.fromCharCode(');
            return eval(s);
        }
        var output = convert(input);
		return output;
	}
}

module.exports = {
    StringFromCharCodeTransformer,
    StringToPHPCHRTransformer,
    StringToPythonCHRTransformer,
    StringToOracleCHRTransformer,
    StringToMySQLCHARTransformer,
    UnChrTransformer
}
