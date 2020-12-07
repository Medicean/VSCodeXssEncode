'use strict';

const Transformer = require('../core');
const jscrypto = require('crypto');

class StringToMD5Transformer extends Transformer {
    algorithm = "md5"
    get command () {
        return 'StringToMD5';
    }
    get label() {
        return "String to MD5";
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
        var c = jscrypto.createHash(this.algorithm);
        c.write(input);
        var output = c.digest().toString('hex');
		return output;
	}
}

class StringToMD5_16Transformer extends Transformer {
    get command () {
        return 'StringToMD5_16';
    }
    get label() {
        return "String to MD5(16bit)"
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
        var c = jscrypto.createHash('md5');
        c.write(input);
        var output = c.digest().toString('hex');
		return output.slice(8,24);
	}
}

class StringToSHA1Transformer extends StringToMD5Transformer {
    algorithm = "sha1"
    get command () {
        return 'StringToSHA1';
    }
    get label() {
        return "String to SHA1";
    }
}

class StringToSHA224Transformer extends StringToSHA1Transformer {
    algorithm = "sha224"
    get command () {
        return 'StringToSHA224';
    }
    get label() {
        return "String to SHA224";
    }
}

class StringToSHA256Transformer extends StringToSHA1Transformer {
    algorithm = "sha256"
    get command () {
        return 'StringToSHA256';
    }
    get label() {
        return "String to SHA256";
    }
}

class StringToSHA384Transformer extends StringToSHA1Transformer {
    algorithm = "sha384"
    get command () {
        return 'StringToSHA384';
    }
    get label() {
        return "String to SHA384";
    }
}

class StringToSHA512Transformer extends StringToSHA1Transformer {
    algorithm = "sha512"
    get command () {
        return 'StringToSHA512';
    }
    get label() {
        return "String to SHA512";
    }
}

module.exports = {
    StringToMD5Transformer,
    StringToMD5_16Transformer,
    StringToSHA1Transformer,
    StringToSHA224Transformer,
    StringToSHA256Transformer,
    StringToSHA384Transformer,
    StringToSHA512Transformer
}