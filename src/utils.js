
// Returns true if all digits in string s are valid hex numbers
function IsValidHex(s) {
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
function isAlphaNumeric(cc) {
    // a - z
    if (97 <= cc && cc <= 122) return true;
    // A - Z
    if (65 <= cc && cc <= 90) return true;
    // 0 - 9
    if (48 <= cc && cc <= 57) return true;

    return false;
}

