'use strict';

const Transformer = require('../core');

class StringToRot13Transformer extends Transformer {
    get command () {
        return 'StringToRot13';
    }
    get label() {
        return "String to Rot13";
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
        const encode = (s) => {
            //use a Regular Expression to Replace only the characters that are a-z or A-Z
            return s.replace(/[a-zA-Z]/g, function (c) {
              // Get the character code of the current character and add 13 to it If it is
              // larger than z's character code then subtract 26 to support wrap around.
                return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
            });
        }
        var output = encode(input);
        return output;
	}
}

class Rot13ToStringTransformer extends StringToRot13Transformer {
    get command () {
        return 'Rot13ToString';
    }
    get label() {
        return "Rot13 to String"
    }
}

module.exports = {
    StringToRot13Transformer,
    Rot13ToStringTransformer
}