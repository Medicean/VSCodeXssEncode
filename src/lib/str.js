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

class StringToQuotedPrintableTransformer extends Transformer {
    get command () {
        return 'StringToQuotedPrintable';
    }
    get label() {
        return "String to Quoted Printable";
    }
    check(input) {
        return true;
    }
    transform(input) {
        return quotedPrintableEncode(input);
    }
}

class QuotedPrintableToStringTransformer extends Transformer {
    get command () {
        return 'QuotedPrintableToString';
    }
    get label() {
        return "Quoted Printable to String";
    }
    check(input) {
        return true;
    }
    transform(input) {
        return quotedPrintableDecode(input);
    }
}

function quotedPrintableEncode(str) {
    const encoder = new TextEncoder('utf-8');
    const bytes = encoder.encode(str); // 转换为UTF-8字节数组
    const result = [];
    let currentLineLength = 0; // 跟踪当前行长度

    for (const byte of bytes) {
        let encoded;

        // 处理特殊字符和可打印字符
        if (byte === 61) { // '=' 必须编码
            encoded = '=3D';
        } else if ((byte >= 33 && byte <= 60) || (byte >= 62 && byte <= 126)) { // 可打印ASCII（非=）
            encoded = String.fromCharCode(byte);
        } else if (byte === 13 || byte === 10) { // 硬换行（保留，重置行长度）
            encoded = String.fromCharCode(byte);
            currentLineLength = 0;
        } else { // 其他字符（含UTF-8多字节）编码为=XX
            encoded = '=' + byte.toString(16).toUpperCase().padStart(2, '0');
        }

        // 处理行长度（软换行）
        if (currentLineLength + encoded.length > 76) {
            result.push('=\r\n'); // 软换行（= + CRLF）
            currentLineLength = 0;
        }

        result.push(encoded);
        currentLineLength += encoded.length;
    }

    return result.join('');
}

function quotedPrintableDecode(encodedStr) {
    // 第一步：移除软换行（=后跟CRLF或LF）
    const str = encodedStr.replace(/=\r?\n/g, '=');
    const bytes = [];
    let i = 0;

    while (i < str.length) {
        if (str[i] === '=') {
            // 处理=XX格式：需确保后面有2个字符
            if (i + 2 < str.length) {
                const hex = str.substring(i + 1, i + 3); // 提取XX
                const byte = parseInt(hex, 16);
                if (!isNaN(byte)) { // 验证是否为有效十六进制
                    bytes.push(byte);
                    i += 3; // 跳过当前=XX
                    continue;
                }
            }
            // 若无效（如=在末尾或XX非十六进制），当作普通=处理
            bytes.push(str.charCodeAt(i));
            i++;
        } else {
            // 普通字符直接转为字节
            bytes.push(str.charCodeAt(i));
            i++;
        }
    }

    // 解码UTF-8字节数组
    return new TextDecoder('utf-8').decode(new Uint8Array(bytes));
}

module.exports = {
    StringReverseTransformer,
    StringToQuotedPrintableTransformer,
    QuotedPrintableToStringTransformer
};