/**
 * Created by coolbong on 2015-05-28.
 */


/** number */
if(typeof Number.prototype.toHexString != 'function') {
    Number.prototype.toHexString = function(num) {
        // figure means bytes length
        var figure;
        if(num === undefined) {
            figure = 1 * 2; // num is 1
        } else {
            figure = num * 2;
        }

        var hex = this.toString(16).toUpperCase();

        if(hex.length >= figure) {
            return hex.right(figure);
        } else {
            return new Array(figure - hex.length + 1).join('0')+hex;
        }

    };
}

/** string */
if (typeof String.prototype.chunk != 'function') {
    String.prototype.chunk = function (n) {
        var ret = [];
        for (var i = 0, len = this.length; i < len; i += n) {
            ret.push(this.substr(i, n))
        }
        return ret
    };
}

if (typeof String.prototype.toHexString != 'function') {
    String.prototype.toHexString = function () {
        return this.chunk(2).join(' ');
    };
}

//"{0}".format('hello') => "hello"
if (typeof String.prototype.format != 'function') {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str){
        return this.slice(-str.length) == str;
    };
}

if (typeof String.prototype.strip != 'function') {
    String.prototype.strip = function (){
        return this.replace(/\s+/g, '');
    };
}

if (typeof String.prototype.left != 'function') {
    String.prototype.left = function(num) {
        return this.slice(0, num);
    };
}

if (typeof String.prototype.right != 'function') {
    String.prototype.right = function(num) {
        return this.slice(this.length - num, this.length);
    };
}

if (typeof String.prototype.toJavaBytes != 'function') {
    String.prototype.toJavaBytes = function(prefix) {
        var ret = '';
        if(prefix !== undefined) {
            ret = prefix
        }
        return ret + '{ (byte)0x' + this.chunk(2).join(', (byte)0x') + ' };';
    };
}

if (typeof String.prototype.toBuffer!= 'function') {
    String.prototype.toBuffer = function() {
        var tmp = this.replace(/\s+/g, '');
        return new Buffer(tmp, 'hex');
    };
}



/** Buffer */

if (typeof Buffer.prototype.readUIntBE!= 'function') {
    Buffer.prototype.readUIntBE = function (offset, byteLength, noAssert) {
        offset = offset >>> 0;
        byteLength = byteLength >>> 0;
        if (!noAssert) {
            if (offset + byteLength > this.length) {
                throw new RangeError('index out of range');
            }
            //checkOffset(offset, byteLength, this.length);
        }

        var val = this[offset + --byteLength];
        var mul = 1;
        while (byteLength > 0 && (mul *= 0x100)) {
            val += this[offset + --byteLength] * mul;
        }

        return val;
    };
}
if (typeof Buffer.prototype.writeUIntBE!= 'function') {
    Buffer.prototype.writeUIntBE = function (value, offset, byteLength, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength = byteLength >>> 0;
        if (!noAssert) {
            if (value > Math.pow(2, 8 * byteLength) || value < 0)
                throw new TypeError('value is out of bounds');
            if (offset + byteLength > this.length)
                throw new RangeError('index out of range');
        }

        var i = byteLength - 1;
        var mul = 1;
        this[offset + i] = value;
        while (--i >= 0 && (mul *= 0x100))
            this[offset + i] = (value / mul) >>> 0;

        return offset + byteLength;
    };
}

if (typeof Buffer.prototype.readDoubleBE!= 'function') {
    Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
            checkOffset(offset, 8, this.length);
        return internal.readDoubleBE(this, offset);
    };
}


if (typeof Buffer.prototype.toHexString != 'function') {
    Buffer.prototype.toHexString = function() {
        return this.toString('hex').toUpperCase();
    };
}

if (typeof Buffer.prototype.left != 'function') {
    Buffer.prototype.left = function(num) {
        return this.slice(0, num);
    };
}

if (typeof Buffer.prototype.right != 'function') {
    Buffer.prototype.right = function(num) {
        return this.slice(this.length - num, this.length);
    };
}

if (typeof Buffer.prototype.getShort != 'function') {
    Buffer.prototype.getShort = function(offset) {
        return this.readUInt16BE(offset);
    };
}

if (typeof Buffer.prototype.setShort != 'function') {
    Buffer.prototype.setShort = function(offset, value) {
        return this.writeUInt16BE(offset, value);
    };
}

if (typeof Buffer.prototype.toJavaBytes != 'function') {
    Buffer.prototype.toJavaBytes = function(prefix) {
        var ret = '';
        if(prefix !== undefined) {
            ret = prefix
        }
        return ret + '{ (byte)0x' + this.toHexString().chunk(2).join(', (byte)0x') + ' };';
    };
}