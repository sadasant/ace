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

    var oop = require("../lib/oop");
    var xmlUtil = require("./xml_util");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var PosXmlHighlightRules = function() {
        var keywords = (
            // POSXML elements
            // ----------
            "display|"+
            "cleandisplay|"+
            "if|"+
            "function|"+
            "inputinteger|"+
            "inputoption|"+
            "inputmoney|"+
            "inputformat|"+
            "print|"+
            "printbig|"+
            "paperfeed|"+
            "inputfloat|"+
            "preconnect|"+
            "shutdownmodem|"+
            "getcardvariable|"+
            "waitkey|"+
            "wait|"+
            "callfunction|"+
            "integervariable|"+
            "stringvariable|"+
            "substring|"+
            "stringtoint|"+
            "inttostring|"+
            "string.getvaluebykey|"+
            "menu|"+
            "menuwithheader|"+
            "readfile|"+
            "editfile|"+
            "integeroperator|"+
            "adjustdatetime|"+
            "getdatetime|"+
            "checkpaperout|"+
            "mathematicaloperation|"+
            "joinstring|"+
            "deletefile|"+
            "printbarcode|"+
            "waitkeytimeout|"+
            "execute|"+
            "while|"+
            "break|"+
            "openserialport|"+
            "readserialport|"+
            "writeserialport|"+
            "closeserialport|"+
            "string.length|"+
            "exit|"+
            "downloadfile|"+
            "readfilebyindex|"+
            "displaybitmap|"+
            "printbitmap|"+
            "readkey|"+
            "unzipfile|"+
            "else|"+
            "integerconvert|"+
            "iso8583.initfieldtable|"+
            "iso8583.initmessage|"+
            "iso8583.analyzemessage|"+
            "iso8583.endmessage|"+
            "iso8583.putfield|"+
            "iso8583.getfield|"+
            "string.charat|"+
            "string.trim|"+
            "string.find|"+
            "string.replace|"+
            "string.substring|"+
            "string.elements|"+
            "string.insertat|"+
            "string.replaceat|"+
            "string.elementat|"+
            "string.removeat|"+
            "network.send|"+
            "network.receive|"+
            "system.restart|"+
            "system.backlight|"+
            "filesystem.filesize|"+
            "filesystem.space|"+
            "filesystem.listfiles|"+
            "convert.toint|"+
            "predial|"+
            "network.checkgprssignal|"+
            "system.checkbattery|"+
            "network.ping|"+
            "system.beep|"+
            "system.readcard|"+
            "system.inputtransaction|"+
            "network.hostdisconnect|"+
            "iso8583.transactmessage|"+
            "smartcard.insertedcard|"+
            "smartcard.startreader|"+
            "smartcard.transmitAPDU|"+
            "smartcard.closereader|"+
            "string.tohex|"+
            "string.fromhex|"+
            "crypto.encryptdecrypt|"+
            "crypto.lrc|"+
            "crypto.xor|"+
            "crypto.crc|"+
            "system.info|"+
            "system.gettouchscreen|"+
            "pinpad.open|"+
            "pinpad.display|"+
            "pinpad.getkey|"+
            "pinpad.getpindukpt|"+
            "pinpad.loadipek|"+
            "pinpad.close|"+
            "emv.open|"+
            "emv.close|"+
            "emv.settimeout|"+
            "emv.loadtables|"+
            "emv.cleanstructures|"+
            "emv.adddata|"+
            "emv.getinfo|"+
            "emv.inittransaction|"+
            "emv.processtransaction|"+
            "emv.finishtransaction|"+
            "emv.removecard|"+
            "parseticket|"+
            "file.open|"+
            "file.close|"+
            "file.read|"+
            "file.write|"+
            "input.getvalue|"+
            "string.pad|"+
            "time.calculate|"+
            // POSXML elements without <
            // -------------------------
            // "display|cleandisplay|if|function|inputinteger|inputoption|"+
            // "inputmoney|inputformat|print|printbig|paperfeed|inputfloat|"+
            // "preconnect|shutdownmodem|getcardvariable|waitkey|wait|callfunction|"+
            // "integervariable|stringvariable|substring|stringtoint|inttostring|"+
            // "string.getvaluebykey|menu|menuwithheader|readfile|editfile|"+
            // "integeroperator|adjustdatetime|getdatetime|checkpaperout|mathematicaloperation|"+
            // "joinstring|deletefile|printbarcode|waitkeytimeout|execute|"+
            // "while|break|openserialport|readserialport|writeserialport|"+
            // "closeserialport|string.length|exit|downloadfile|readfilebyindex|"+
            // "displaybitmap|printbitmap|readkey|unzipfile|else|integerconvert|"+
            // "iso8583.initfieldtable|iso8583.initmessage|iso8583.analyzemessage|iso8583.endmessage|"+
            // "iso8583.putfield|iso8583.getfield|string.charat|string.trim|string.find|"+
            // "string.replace|string.substring|string.elements|string.insertat|string.replaceat|"+
            // "string.elementat|string.removeat|network.send|network.receive|system.restart|"+
            // "filesystem.filesize|filesystem.space|filesystem.listfiles|convert.toint|"+
            // "predial|network.checkgprssignal|system.checkbattery|network.ping|"+
            // "system.beep|system.readcard|network.hostdisconnect|iso8583.transactmessage|"+
            // "smartcard.insertedcard|smartcard.startreader|smartcard.transmitAPDU|smartcard.closereader|"+
            // "string.tohex|string.fromhex|crypto.encryptdecrypt|crypto.lrc|"+
            // "crypto.xor|crypto.crc|system.info|system.gettouchscreen|pinpad.open|"+
            // "pinpad.display|pinpad.getkey|pinpad.getpindukpt|pinpad.loadipek|"+
            // "pinpad.close|emv.open|emv.settimeout|emv.loadtables|emv.cleanstructures|"+
            // "emv.adddata|emv.getinfo|emv.inittransaction|emv.processtransaction|"+
            // "emv.finishtransaction|emv.removecard|parseticket|file.open|file.close|"+
            // "file.read|file.write|input.getvalue|string.pad|time.calculate|"+
            // attributes (some of them)
            // -------------------------
            // "keyvariable|cardvariable|variablereturn|variablestatus|"+
            // "channel|slot|header|host|option|listfilename|string_to_be_inserted|"+
            // "old_substring|original_string|new_substring|delimiter|fieldnumber|"+
            // "variable|opereator|column|firstmessage|seconds|miliseconds|"+
            // "filename|datetime|format|"+
            // attributes' values
            // ------------------
            // <if operator=""
            "lessthan|greaterthan|equalto|notequalto|greaterthanorequalto|lessthanorequalto|"+
            ""
        );

        // Completion Wrappers for XML
        //----------------------------
        var lt = "<";
        var gt = ">";
        var bs = "/";
        var sp = " ";
        var nl = "\n";
        var empty    = "";
        var zero     = "0";
        var emptyvar = "$()";

        // Completing attributes
        function completeAttributes(that) {
            if (that.attributes === null)
                return empty;
            if (typeof that.attributes === "string")
                return that.attributes;
            var attributes = empty;
            for (var k in that.attributes) {
                attributes += sp;
                attributes += k + "=\"" + that.attributes[k] + "\"";
            }
            that.attributes = attributes;
            return that.attributes;
        }

        // <tag attributes... ></tag>
        function tagClose(tag) {
            var attributes = completeAttributes(this);
            return tag + attributes + gt +
                   // nl + nl +
                   tag.replace(lt, lt + bs) + gt;
        }
        // <tag attributes... />
        function selfClose(tag) {
            var attributes = completeAttributes(this);
            return tag + attributes + sp + bs + gt;
        }
        // <tag attributes... >
        function noEndClose(tag) {
            var attributes = completeAttributes(this);
            return tag + attributes + gt;
        }

        // keywordsWrappers object to be added to the mode
        this.keywordsWrappers = {
            "<display" : {
                attributes : { line : zero, column : zero, message : empty },
                wrapper : selfClose
            },
            "<cleandisplay" : {
                attributes : null,
                wrapper : selfClose
            },
            "<if" : {
                attributes : { variable : emptyvar, operator : "equalto", value : empty },
                wrapper : tagClose
            },
            "<function" : {
                attributes : { name : empty },
                wrapper : tagClose
            },
            "<inputinteger" : {
                attributes : { variable : emptyvar, line : zero, column : zero, message : empty, minimum : zero, maximum : "50" },
                wrapper : selfClose
            },
            "<inputoption" : {
                attributes : { variable : emptyvar, line : zero, column : zero, message : empty, minimum : zero, maximum : "50" },
                wrapper : selfClose
            },
            "<inputmoney" : {
                attributes : { variable : emptyvar, line : zero, column : zero, message : empty },
                wrapper : selfClose
            },
            "<inputformat" : {
                attributes : { variable : emptyvar, line : zero, column : zero, message : empty, format : empty },
                wrapper : selfClose
            },
            "<print" : {
                attributes : { message : empty },
                wrapper : selfClose
            },
            "<printbig" : {
                attributes : { message : empty },
                wrapper : selfClose
            },
            "<paperfeed" : {
                attributes : null,
                wrapper : selfClose
            },
            "<inputfloat" : {
                attributes : { variable : emptyvar, line : zero, column : zero, message : empty },
                wrapper : selfClose
            },
            "<preconnect" : {
                attributes : { variablestatus : emptyvar },
                wrapper : selfClose
            },
            "<shutdownmodem" : {
                attributes : null,
                wrapper : selfClose
            },
            "<getcardvariable" : {
                attributes : { firstmessage : empty, secondmessage : empty, minimum : zero, maximum : "50", variable : emptyvar },
                wrapper : selfClose
            },
            "<waitkey" : {
                attributes : null,
                wrapper : selfClose
            },
            "<wait" : {
                attributes : { miliseconds : "2000" },
                wrapper : selfClose
            },
            "<callfunction" : {
                attributes : { name : empty },
                wrapper : selfClose
            },
            "<integervariable" : {
                attributes : { value : zero, variable : empty },
                wrapper : selfClose
            },
            "<stringvariable" : {
                attributes : { value : empty, variable : empty },
                wrapper : selfClose
            },
            "<substring" : {
                attributes : { index : zero, variablesource : emptyvar, variabledestination : emptyvar, character : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<stringtoint" : {
                attributes : { variablestring : emptyvar, variableinteger : emptyvar },
                wrapper : selfClose
            },
            "<inttostring" : {
                attributes : { variableinteger : emptyvar, variablestring : emptyvar },
                wrapper : selfClose
            },
            "<string.getvaluebykey" : {
                attributes : { string : "''", key : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<menu" : {
                attributes : { variable : emptyvar, options : "OPTION 1\\OPTION 2\\OPTION 3" },
                wrapper : selfClose
            },
            "<menuwithheader" : {
                attributes : { header : empty, options : "OPTION 1\\OPTION 2\\OPTION 3" , timeoutheader : "1", timeout : "30", variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<readfile" : {
                attributes : { filename : empty, key : empty, variabledestination : emptyvar },
                wrapper : selfClose
            },
            "<editfile" : {
                attributes : { filename : empty, key : empty, value : empty },
                wrapper : selfClose
            },
            "<integeroperator" : {
                attributes : { operator : "++", variablesource : emptyvar },
                wrapper : selfClose
            },
            "<adjustdatetime" : {
                attributes : { datetime : empty },
                wrapper : selfClose
            },
            "<getdatetime" : {
                attributes : { format : empty, variabledestination : emptyvar },
                wrapper : selfClose
            },
            "<checkpaperout" : {
                attributes : { variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<mathematicaloperation" : {
                attributes : { variabledestination : emptyvar, operator : "+", firstvalue : emptyvar, secondvalue : emptyvar },
                wrapper : selfClose
            },
            "<joinstring" : {
                attributes : { firstvalue : emptyvar, secondvalue : emptyvar, variabledestination : emptyvar },
                wrapper : selfClose
            },
            "<deletefile" : {
                attributes : { filename : empty },
                wrapper : selfClose
            },
            "<printbarcode" : {
                attributes : { number : empty, horizontal : zero },
                wrapper : selfClose
            },
            "<waitkeytimeout" : {
                attributes : { seconds : zero },
                wrapper : selfClose
            },
            "<execute" : {
                attributes : { filename : empty },
                wrapper : selfClose
            },
            "<while" : {
                attributes : { variable : emptyvar, operator : empty, value : empty },
                wrapper : tagClose
            },
            "<break" : {
                attributes : null,
                wrapper : selfClose
            },
            "<openserialport" : {
                attributes : { port : "COM1", rate : "300", configuration : "A7E1", variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<readserialport" : {
                attributes : { variablehandle : emptyvar, variablebuffer : emptyvar, bytes : "8", timeout : "10000" },
                wrapper : selfClose
            },
            "<writeserialport" : {
                attributes : { variablehandle : emptyvar, buffer : empty },
                wrapper : selfClose
            },
            "<closeserialport" : {
                attributes : { variablehandle : emptyvar },
                wrapper : selfClose
            },
            "<string.length" : {
                attributes : { value : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<exit" : {
                attributes : null,
                wrapper : selfClose
            },
            "<downloadfile" : {
                attributes : { filename : empty, remotepath : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<readfilebyindex" : {
                attributes : { filename : empty, index : zero, variablekey : emptyvar, variablevalue : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<displaybitmap" : {
                attributes : { filename : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<printbitmap" : {
                attributes : { filename : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<readkey" : {
                attributes : { miliseconds : "2000", variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<unzipfile" : {
                attributes : { filename : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<else" : {
                attributes : null,
                wrapper : selfClose
            },
            "<integerconvert" : {
                attributes : { number : zero, base : "2", sizereturn : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<iso8583.initfieldtable" : {
                attributes : { filename : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<iso8583.initmessage" : {
                attributes : { format : "ASCII", id : "0000", variablemessage : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<iso8583.analyzemessage" : {
                attributes : { format : "ASCII", size : empty, variablemessage : empty, variableid : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<iso8583.endmessage" : {
                attributes : { variablesize : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<iso8583.putfield" : {
                attributes : { fieldnumber : "2", type : "string", value : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<iso8583.getfield" : {
                attributes : { fieldnumber : "2", type : "string", variablevalue : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<string.charat" : {
                attributes : { string : empty, character_index : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<string.trim" : {
                attributes : { string : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<string.find" : {
                attributes : { string : empty, substring : empty, start : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<string.replace" : {
                attributes : { original_string : empty, old_substring : empty, new_substring : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<string.substring" : {
                attributes : { string : empty, start : empty, length : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<string.elements" : {
                attributes : { string : empty, delimiter : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<string.insertat" : {
                attributes : { string : empty, string_to_be_inserted : empty, element_index : empty, delimiter : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<string.replaceat" : {
                attributes : { string : empty, new_element : empty, element_index : empty, delimiter : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<string.elementat" : {
                attributes : { string : empty, element_index : empty, delimiter : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<string.removeat" : {
                attributes : { string : empty, element_index : empty, delimiter : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<network.send" : {
                attributes : { buffer : emptyvar, size : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<network.receive" : {
                attributes : { variablebuffer : emptyvar, maxsize : empty, variablereceivedbytes : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<system.restart" : {
                attributes : null,
                wrapper : selfClose
            },
            "<system.backlight" : {
                attributes : { level : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<filesystem.filesize" : {
                attributes : { filename : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<filesystem.space" : {
                attributes : { dir : "I:", type : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<filesystem.listfiles" : {
                attributes : { dir : "I:", listfilename : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<convert.toint" : {
                attributes : { base : "2", number : zero, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<predial" : {
                attributes : { option : "1", variablestatus : emptyvar },
                wrapper : selfClose
            },
            "<network.checkgprssignal" : {
                attributes : { variablestatus : emptyvar },
                wrapper : selfClose
            },
            "<system.checkbattery" : {
                attributes : { variablestatus : emptyvar },
                wrapper : selfClose
            },
            "<network.ping" : {
                attributes : { host : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<system.beep" : {
                attributes : null,
                wrapper : selfClose
            },
            "<system.readcard" : {
                attributes : { keyvariable : "KEY_0", cardvariable : emptyvar, timeout : "30", variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<system.inputtransaction" : {
                attributes : { keyvariable : "KEY_0", cardvariable : emptyvar, timeout : "30", variablereturn : emptyvar, keyboard : zero, inputtype : "1" },
                wrapper : selfClose
            },
            "<network.hostdisconnect" : {
                attributes : null,
                wrapper : selfClose
            },
            "<iso8583.transactmessage" : {
                attributes : { channel : "NONE", header : empty, trailler : empty, isomsg : empty, variableresponse : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<smartcard.insertedcard" : {
                attributes : { slot : "1", variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<smartcard.startreader" : {
                attributes : { slot : "1", variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<smartcard.transmitAPDU" : {
                attributes : { slot : "1", header : "B00C0000", LC : empty, datafield : empty, LE : empty, variabledatafieldresponse : empty, variableSW : emptyvar, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<smartcard.closereader" : {
                attributes : { slot : "1", variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<string.tohex" : {
                attributes : { string : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<string.fromhex" : {
                attributes : { string : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<crypto.encryptdecrypt" : {
                attributes : { message : empty, key : empty, cryptotype : "DES", type : zero, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<crypto.lrc" : {
                attributes : { buffer : emptyvar, size : "0000", variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<crypto.xor" : {
                attributes : { buffer1 : empty, buffer2 : empty, size : "0000", variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<crypto.crc" : {
                attributes : { buffer : emptyvar, size : "0000", crctype : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<system.info" : {
                attributes : { type : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<system.gettouchscreen" : {
                attributes : { axisx : empty, axisy : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<pinpad.open" : {
                attributes : { type : zero, variableserialnumber : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<pinpad.display" : {
                attributes : { message : empty },
                wrapper : selfClose
            },
            "<pinpad.getkey" : {
                attributes : { message : empty, timeout : "30", variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<pinpad.getpindukpt" : {
                attributes : { message : empty, type : zero, pan : empty, maxlen : empty, variablereturnpin : empty, variablereturnksn : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<pinpad.loadipek" : {
                attributes : { ipek : empty, ksn : empty, type : zero, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<pinpad.close" : {
                attributes : { message : empty },
                wrapper : selfClose
            },
            "<emv.open" : {
                attributes : { variablereturn : emptyvar, mkslot : empty, pinpadtype : "1", pinpadwk : empty, showamount : zero },
                wrapper : selfClose
            },
            "<emv.close" : {
                attributes : { variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<emv.settimeout" : {
                attributes : { seconds : zero, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<emv.loadtables" : {
                attributes : { acquirer : zero, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<emv.cleanstructures" : {
                attributes : null,
                wrapper : selfClose
            },
            "<emv.adddata" : {
                attributes : { type : empty, parameter : empty, value : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<emv.getinfo" : {
                attributes : { type : empty, parameter : empty, value : empty },
                wrapper : selfClose
            },
            "<emv.inittransaction" : {
                attributes : { variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<emv.processtransaction" : {
                attributes : { variablereturn : emptyvar, ctls : zero },
                wrapper : selfClose
            },
            "<emv.finishtransaction" : {
                attributes : { variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<emv.removecard" : {
                attributes : { variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<parseticket" : {
                attributes : { productmenu : empty, ticket : empty, message : empty, literal : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<file.open" : {
                attributes : { mode : "r", filename : empty, variablehandle : emptyvar },
                wrapper : selfClose
            },
            "<file.close" : {
                attributes : { handle : empty },
                wrapper : selfClose
            },
            "<file.read" : {
                attributes : { handle : empty, size : empty, variablebuffer : emptyvar, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<file.write" : {
                attributes : { handle : empty, size : empty, buffer : emptyvar },
                wrapper : selfClose
            },
            "<input.getvalue" : {
                attributes : { linecaption : empty, columncaption : empty, caption : empty, lineinput : empty, columninput : empty, minimum : zero, maximum : "50", allowsempty : empty, variablereturn : emptyvar },
                wrapper : selfClose
            },
            "<string.pad" : {
                attributes : { origin : empty, character : empty, align : empty, length : empty, destination : empty },
                wrapper : selfClose
            },
            "<time.calculate" : {
                attributes : { operation : empty, type : empty, date : empty, greaterdate : empty, value : empty, variablereturn : emptyvar },
                wrapper : selfClose
            }
        };

        var keywordMapper = this.$keywords = this.createKeywordMapper({
            // The line below added "this" to the possible completions
            // "variable.language": "this",
            "keyword": keywords,
        }, "identifier");

        this.$rules = {
            start : [

                {token : "text"        , regex : "<\\!\\[CDATA\\["             , next : "cdata"   } ,
                {token : "xml-pe"      , regex : "<\\?.*?\\?>"                                    } ,
                {token : keywordMapper , regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"                    } ,
                {token : "comment"     , regex : "<\\!--"                      , next : "comment" } ,
                {token : "xml-pe"      , regex : "<\\!.*?>"                                       } ,
                {token : "meta.tag"    , regex : "<\\/?"                       , next : "tag"     } ,
                {token : "text"        , regex : "\\s+"                                           } ,
                {
                    token : "constant.character.entity", 
                    regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)" 
                }
            ],

            cdata : [
                {token : "text", regex : "\\]\\]>", next : "start"},
                {token : "text", regex : "\\s+"},
                {token : "text", regex : "(?:[^\\]]|\\](?!\\]>))+"}
            ],

            comment : [
                {token : "comment", regex : ".*?-->", next : "start"},
                {token : "comment", regex : ".+"}
            ]
        };

        xmlUtil.tag(this.$rules, "tag", "start");
    };

    oop.inherits(PosXmlHighlightRules, TextHighlightRules);

    exports.PosXmlHighlightRules = PosXmlHighlightRules;
});
