'use strict';

const Transformer = require('../core');

class StringReverseTransformer extends Transformer {
    get command () {
        return 'StringReverse';
    }
    get label() {
        return "String Reverse";
    }
    check(input) {
        return true;
    }
    transform(input) {
        var output = input.split('').reverse().join('');
        return output;
    }
}

module.exports = {
    StringReverseTransformer
};