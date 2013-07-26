/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, PlanoBe.com.br
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of PlanoBe.com.br nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL PLANOBE.COM.BR BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var MixedFoldMode = require("./mixed").FoldMode;
var XmlFoldMode = require("./xml").FoldMode;
var CStyleFoldMode = require("./cstyle").FoldMode;

var FoldMode = exports.FoldMode = function() {
    MixedFoldMode.call(this, new XmlFoldMode({
        // void elements
        "display": 1,
        "cleandisplay": 1,
        "inputinteger": 1,
        "inputoption": 1,
        "inputmoney": 1,
        "inputformat": 1,
        "print": 1,
        "printbig": 1,
        "paperfeed": 1,
        "inputfloat": 1,
        "preconnect": 1,
        "shutdownmodem": 1,
        "getcardvariable": 1,
        "waitkey": 1,
        "wait": 1,
        "callfunction": 1,
        "integervariable": 1,
        "stringvariable": 1,
        "substring": 1,
        "stringtoint": 1,
        "inttostring": 1,
        "string.getvaluebykey": 1,
        "menu": 1,
        "menuwithheader": 1,
        "readfile": 1,
        "editfile": 1,
        "integeroperator": 1,
        "adjustdatetime": 1,
        "getdatetime": 1,
        "checkpaperout": 1,
        "mathematicaloperation": 1,
        "joinstring": 1,
        "deletefile": 1,
        "printbarcode": 1,
        "waitkeytimeout": 1,
        "execute": 1,
        "break": 1,
        "openserialport": 1,
        "readserialport": 1,
        "writeserialport": 1,
        "closeserialport": 1,
        "string.length": 1,
        "exit": 1,
        "downloadfile": 1,
        "readfilebyindex": 1,
        "displaybitmap": 1,
        "printbitmap": 1,
        "readkey": 1,
        "unzipfile": 1,
        "else": 1,
        "integerconvert": 1,
        "iso8583.initfieldtable": 1,
        "iso8583.initmessage": 1,
        "iso8583.analyzemessage": 1,
        "iso8583.endmessage": 1,
        "iso8583.putfield": 1,
        "iso8583.getfield": 1,
        "string.charat": 1,
        "string.trim": 1,
        "string.find": 1,
        "string.replace": 1,
        "string.substring": 1,
        "string.elements": 1,
        "string.insertat": 1,
        "string.replaceat": 1,
        "string.elementat": 1,
        "string.removeat": 1,
        "network.send": 1,
        "network.receive": 1,
        "system.restart": 1,
        "filesystem.filesize": 1,
        "filesystem.space": 1,
        "filesystem.listfiles": 1,
        "convert.toint": 1,
        "predial": 1,
        "network.checkgprssignal": 1,
        "system.checkbattery": 1,
        "network.ping": 1,
        "system.beep": 1,
        "system.readcard": 1,
        "network.hostdisconnect": 1,
        "iso8583.transactmessage": 1,
        "smartcard.insertedcard": 1,
        "smartcard.startreader": 1,
        "smartcard.transmitAPDU": 1,
        "smartcard.closereader": 1,
        "string.tohex": 1,
        "string.fromhex": 1,
        "crypto.encryptdecrypt": 1,
        "crypto.lrc": 1,
        "crypto.xor": 1,
        "crypto.crc": 1,
        "system.info": 1,
        "system.gettouchscreen": 1,
        "pinpad.open": 1,
        "pinpad.display": 1,
        "pinpad.getkey": 1,
        "pinpad.getpindukpt": 1,
        "pinpad.loadipek": 1,
        "pinpad.close": 1,
        "emv.open": 1,
        "emv.settimeout": 1,
        "emv.loadtables": 1,
        "emv.cleanstructures": 1,
        "emv.adddata": 1,
        "emv.getinfo": 1,
        "emv.inittransaction": 1,
        "emv.processtransaction": 1,
        "emv.finishtransaction": 1,
        "emv.removecard": 1,
        "parseticket": 1,
        "file.open": 1,
        "file.close": 1,
        "file.read": 1,
        "file.write": 1,
        "input.getvalue": 1,
        "string.pad": 1,
        "time.calculate": 1,
    }));
};

oop.inherits(FoldMode, MixedFoldMode);

});
