'use strict';

const Transformer = require('../core');

class StringToBashTransformer extends Transformer {
    get command () {
        return 'StringToBash';
    }
    get label() {
        return "String to Bash";
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
        return `bash -c {echo,${Buffer.from(input).toString('base64')}}|{base64,-d}|{bash,-i}`;
	}
}

class StringToPowerShellTransformer extends Transformer {
    get command () {
        return 'StringToPowerShell';
    }
    get label() {
        return "String to PowerShell";
    }
    check(input) {
        return Buffer.from(input).length != 0;
    }
    transform(input) {
        return `powershell.exe -NonI -W Hidden -NoP -Exec Bypass -Enc ${Buffer.from(input).toString('base64')}`;
    }
}

class StringToPythonTransformer extends Transformer {
    get command () {
        return 'StringToPython';
    }
    get label() {
        return "String to Python";
    }
    check(input) {
        return Buffer.from(input).length != 0;
    }
    transform(input) {
        return `python -c exec('${Buffer.from(input).toString('base64')}'.decode('base64'))`;
    }
}

class StringToPerlTransformer extends Transformer {
    get command () {
        return 'StringToPerl';
    }
    get label() {
        return "String to Perl";
    }
    check(input) {
        return Buffer.from(input).length != 0;
    }
    transform(input) {
        return `perl -MMIME::Base64 -e eval(decode_base64('${Buffer.from(input).toString('base64')}'))`;
    }
}

module.exports = {
  StringToBashTransformer,
  StringToPowerShellTransformer,
  StringToPythonTransformer,
  StringToPerlTransformer
}
