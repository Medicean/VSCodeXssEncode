'use strict';

const Transformer = require('../core');

class StringToBase32Transformer extends Transformer {
    get command () {
        return 'StringToBase32';
    }
    get label() {
        return "String to Base32";
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
        return new Base32().encode(input);
	}
}

class Base32ToStringTransformer extends Transformer {
    get command () {
        return 'Base32ToString';
    }
    get label() {
        return "Base32 to String"
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
        return new Base32().decode(input);
	}
}

class Base32 {
    RFCB32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    lookup = this.init_lookup_table();
    PAD = '=';
    PAD_C = 0x3D;

    /**
     * @name init_lookup_table
     * @desc Initializes a lookup table.
     * @returns {Object}
     * @private
     */
    init_lookup_table(){
        const lookup = {};
        let i;
        for(i = 0; i < this.RFCB32.length; i++){
            lookup[this.RFCB32.charCodeAt(i)] = i;
        }
        return lookup;
    }

    /**
     * @name create_mask
     * @param start {number}
     * @param end {number}
     * @returns {number}
     * @private
     */
    create_mask(start, end){
        let mask = 0, i;
        start = (start < 0) ? 0 : start;
        for(i = start; i < end; i++)
            mask |= 1 << i;
        return mask;
    }

    /**
     * @name pad_end
     * @param str
     * @param i
     * @returns {string|*}
     * @private
     */
    pad_end(str, i){
        let cnt;
        /* 1 byte of information in last byte = 6 * '=' */
        if(i == 1)
            cnt = 6;
        /* 2 bytes of information in last byte = 4 * '=' */
        else if(i == 2)
            cnt = 4;
        /* 3 bytes of information in last byte = 3 * '=' */
        else if(i == 3)
            cnt = 3;
        /* 4 bytes of information in last byte = 1 * '=' */
        else
            cnt = 1;
        return str.repeat(cnt);
    }

    /**
     * @name divide_into_blocks
     * @param buf
     * @param len
     * @returns {Array}
     * @private
     */
    divide_into_blocks(buf, len){
        const blocks = [];
        const l = Math.ceil(buf.byteLength/len);
        let i, o;
        for(i = 0; i < l; i++){
            o = len * i;
            blocks.push(buf.slice(o, o+len));
        }
        return blocks;
    }

    /**
     * @name get_block_index
     * @param i
     * @returns {Number}
     * @private
     */
    get_block_index(i){
        return Math.floor((5 * i) / 8);
    }

    /**
     * @name get_block_index_d
     * @param i
     * @returns {Number}
     * @private
     */
    get_block_index_d(i){
        return Math.floor((8 * i) / 5);
    }

    /**
     * @name get_block_start
     * @param i
     * @returns {number}
     * @private
     */
    get_block_start(i){
        return 8 - (5 * i) % 8;
    }

    /**
     * @name get_block_start_d
     * @param i
     * @returns {number}
     * @private
     */
    get_block_start_d(i){
        return 5 - (8 * i) % 5;
    }
    /**
     * @name encode
     * @desc Encodes a string or binary data in base32.
     * @param input {String|Buffer}
     * @returns {String}
     */
    encode(input) {
        /* If it is a normal string, convert to a buffer */
        if(!Buffer.isBuffer(input))
            input = Buffer.from(input);
            /* Divide input into blocks of 5 bytes */
            const blocks = this.divide_into_blocks(input, 5);
            let encoded_string = '';
            if(blocks){
            let i;
            for(i = 0; i < blocks.length; i++){
                const block = blocks[i];
                let j, b, s;
                /* Divide block into 8 groups of 5 bits */
                for(j = 0; j < 8; j++){
                    b = this.get_block_index(j);
                    s = this.get_block_start(j);
                    if(b >= block.length){
                        encoded_string += this.pad_end(this.PAD, b);
                        break;
                    }
                    const v_cb = block[b];
                    /* gets a group of s - 5 bits */
                    let g = v_cb & this.create_mask(s - 5, s);
                    /* goes to next block */
                    if(s - 5 < 0){
                        const o = 8 - Math.abs(s - 5);
                        const v_nb = block[b+1];
                        g = (g << (5 - s)) | ((v_nb & this.create_mask(o, 8)) >> o);
                    } else {
                        /* logical (zero-fill) shift */
                        g >>>= (s - 5);
                    }
                    encoded_string += this.RFCB32[g];
                }
            }
        }
        return encoded_string;
    }
    /**
     * @name decode
     * @desc Decodes data encoded in base32.
     * @param input {String|Buffer}
     * @returns {String}
     */
    decode(input){
        /* If it is a normal string, convert to a buffer */
        if(!Buffer.isBuffer(input))
            input = Buffer.from(input);
        /* Divide into groups of 8 bytes */
        const blocks = this.divide_into_blocks(input, 8);
        let decoded_string = '';
        if(blocks) {
            let i;
            for (i = 0; i < blocks.length; i++) {
                /* Divide 8 groups of 5 bits into 5 groups of 8 bits */
                const block = blocks[i];
                let j, b, s;
                for (j = 0; j < 5; j++) {
                    b = this.get_block_index_d(j);
                    s = this.get_block_start_d(j);
                    let l = 8 - s;
                    /* Base32 Value */
                    const v_cb = this.lookup[block[b]];
                    /* Creates new byte group (v_cb)...0 */
                    let g = v_cb << l & this.create_mask(l, 8);
                    while(l > 0){
                        b += 1;
                        if(block[b] === this.PAD_C)
                            return decoded_string;
                        const v_nb = this.lookup[block[b]];
                        g |= (l < 5) ? v_nb >>> (5-l) : v_nb << (l-5);
                        l -= 5;
                    }
                    decoded_string += String.fromCharCode(g);
                }
            }
        }
        return decoded_string;
    }
}



module.exports = {
    StringToBase32Transformer,
    Base32ToStringTransformer
}