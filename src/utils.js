'use strict'

var utils = {
    isFunction: function(arg) {
        return typeof arg === 'function';
    }
};

// Returns true if all digits in string s are valid hex numbers
utils.IsValidHex = function (s) {
    for (var i = 0; i < s.length; ++i) {
        var cc = s.charCodeAt(i);
        if ((48 <= cc && cc <= 57) ||
            (65 <= cc && cc <= 70) ||
            (97 <= cc && cc <= 102)) {
        // '0'..'9', 'A'..'F' and 'a' .. 'f'.
        } else {
            return false;
        }
    }
    return true;
}

// Does the char code correspond to an alpha-numeric char.
utils.isAlphaNumeric = function isAlphaNumeric(cc) {
    // a - z
    if (97 <= cc && cc <= 122) return true;
    // A - Z
    if (65 <= cc && cc <= 90) return true;
    // 0 - 9
    if (48 <= cc && cc <= 57) return true;

    return false;
}

/**
 * 随机从列表返回指定长度的列表
 * @param {array} array 待选列表
 * @param {array} excludes 排除列表
 * @param {number} len 返回的长度,默认 1
 */
utils.RandomChoice = function(array, excludes = [], len = 1) {
    var tmp = [];
    while (tmp.length < len) {
        let v = array[Math.ceil(Math.random() * array.length - 1)];
        excludes.indexOf(v) === -1 && tmp.indexOf(v) === -1 && tmp.push(v);
    }
    return tmp;
}

module.exports = utils;
