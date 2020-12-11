'use strict';

const Transformer = require('../core');

let hexCharCodeArray = 0;

function Encode(uri, unescape) {
    var uriLength = uri.length;
    var array = new Array(uriLength);
    var index = 0;
    for (var k = 0; k < uriLength; k++) {
        var cc1 = uri.charCodeAt(k);
        if (unescape(cc1)) {
            array[index++] = cc1;
        } else {
            if (cc1 >= 0xDC00 && cc1 <= 0xDFFF) throw new Error("URI malformed");
            if (cc1 < 0xD800 || cc1 > 0xDBFF) {
                index = URIEncodeSingle(cc1, array, index);
            } else {
                k++;
                if (k == uriLength) throw new Error("URI malformed");
                var cc2 = uri.charCodeAt(k);
                if (cc2 < 0xDC00 || cc2 > 0xDFFF) throw new URIError("URI malformed");
                index = URIEncodePair(cc1, cc2, array, index);
            }
        }
    }
    return Buffer.from(array).toString();
}

function URIEncodeSingle(cc, result, index) {
    var x = (cc >> 12) & 0xF;
    var y = (cc >> 6) & 63;
    var z = cc & 63;
    var octets = new Array(3);
    if (cc <= 0x007F) {
        octets[0] = cc;
    } else if (cc <= 0x07FF) {
        octets[0] = y + 192;
        octets[1] = z + 128;
    } else {
        octets[0] = x + 224;
        octets[1] = y + 128;
        octets[2] = z + 128;
    }
    return URIEncodeOctets(octets, result, index);
}

function URIEncodePair(cc1 , cc2, result, index) {
    var u = ((cc1 >> 6) & 0xF) + 1;
    var w = (cc1 >> 2) & 0xF;
    var x = cc1 & 3;
    var y = (cc2 >> 6) & 0xF;
    var z = cc2 & 63;
    var octets = new Array(4);
    octets[0] = (u >> 2) + 240;
    octets[1] = (((u & 3) << 4) | w) + 128;
    octets[2] = ((x << 4) | y) + 128;
    octets[3] = z + 128;
    return URIEncodeOctets(octets, result, index);
}

function URIAddEncodedOctetToBuffer(octet, result, index) {
    result[index++] = 37; // Char code of '%'.
    result[index++] = hexCharCodeArray[octet >> 4];
    result[index++] = hexCharCodeArray[octet & 0x0F];
    return index;
}

function URIEncodeOctets(octets, result, index) {
    if (hexCharCodeArray === 0) {
        // @ts-ignore
        hexCharCodeArray = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70];
    }
    index = URIAddEncodedOctetToBuffer(octets[0], result, index);
    if (octets[1]) index = URIAddEncodedOctetToBuffer(octets[1], result, index);
    if (octets[2]) index = URIAddEncodedOctetToBuffer(octets[2], result, index);
    if (octets[3]) index = URIAddEncodedOctetToBuffer(octets[3], result, index);
    return index;
}

class StringToEncodedUrlAllCharactersTransformer extends Transformer {
    get command () {
        return 'StringToEncodedUrlAllCharacters';
    }
    get label() {
        return "String to Encoded URL All Characters";
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
        // var output = Encode(input, ()=>{return false});
        function urlall(a, b) {
            return ++b ? '%' + (10 + a.charCodeAt().toString(16)).slice(-2) : unescape(encodeURIComponent(a)).replace(/[^]/g, urlall)
        }
        let output = urlall(input);
		return output;
	}
}

class StringToEncodedUrlTransformer extends Transformer {
    get command () {
        return 'StringToEncodedUrl';
    }
    get label() {
        return "String to Encoded URL";
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
        return encodeURIComponent(input)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A');
            // .replace(/%20/g, '+');
	}
}

class EncodedUrlToStringTransformer extends Transformer {
    get command () {
        return 'EncodedUrlToString';
    }
    get label() {
        return "Encoded URL to String"
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
		var output = unescape(input);
		return output;
	}
}

module.exports = {
    StringToEncodedUrlTransformer,
    StringToEncodedUrlAllCharactersTransformer,
    EncodedUrlToStringTransformer
}