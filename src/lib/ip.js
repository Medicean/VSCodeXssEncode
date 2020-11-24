'use strict';

const Transformer = require('../core');

class IPv4ToNumberTransformer extends Transformer {
    get command () {
        return 'IPv4ToNumber';
    }
    get label() {
        return "IPv4 to Number";
    }
    /**
     * @param {string} input
     * @returns {boolean}
     */
    check(input) {
        var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
        if (re.test(input)) {
            // @ts-ignore
            if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {string} input
     * @returns {string}
     */
    transform(input) {
        var TmpList = input.split(".");
        let output = 256 * 256 * 256 * Number(TmpList[0]) + 256 * 256 * Number(TmpList[1]) + 256 * Number(TmpList[2]) + Number(TmpList[3]);
        return String(output);
    }
}

class NumberToIPv4Transformer extends Transformer {
    get command () {
        return 'NumberToIPv4';
    }
    get label() {
        return "Number to IPv4"
    }
    /**
     * @param {string} input
     * @returns {boolean}
     */
    check(input) {
        if (parseInt(input) > 0 && parseInt(input) <= 4294967295) {
            return true;
        }
        return false;
    }
    /**
     * @param {string} input
     * @returns {string}
     */
    transform(input) {
        let e = parseInt(input);
        let o = [
            e >>> 24 >>> 0,
            e << 8 >>> 24 >>> 0,
            e << 16 >>> 24,
            e << 24 >>> 24,
        ];
		return o.join('.');
	}
}

module.exports = {
    IPv4ToNumberTransformer,
    NumberToIPv4Transformer
}