'use strict';

const hex = require('./hex');

class StringToBase16Transformer extends hex.StringToHexTransformer {
    get command () {
        return 'StringToBase16';
    }
    get label() {
        return "String to Base16";
    }
}

class Base16ToStringTransformer extends hex.HexToStringTransformer {
    get command () {
        return 'Base16ToString';
    }
    get label() {
        return "Base16 to String"
    }
}

module.exports = {
    StringToBase16Transformer,
    Base16ToStringTransformer
}