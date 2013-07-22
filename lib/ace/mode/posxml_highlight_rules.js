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
            // "lessthan|greaterthan|equalto|notequalto|greaterthanorequalto|lessthanorequalto|"+
            ""
        );

        // Completion Wrappers for XML
        //----------------------------
        var lt = "<";
        var gt = ">";
        var bs = "/";
        var sp = " ";
        var nl = "\n";
        var empty = "";

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
                attributes : { line : "0", column : "0", message : empty },
                wrapper : selfClose
            },
            "<cleandisplay" : {
                attributes : null,
                wrapper : selfClose
            },
            "<if" : {
                attributes : { variable : "$()", operator : empty, value : empty },
                wrapper : tagClose
            },
            "<function" : {
                attributes : { name : empty },
                wrapper : tagClose
            },
            "<inputinteger" : {
                attributes : { variable : "$()", line : "0", column : "0", message : empty, minimum : "0", maximum : "50" },
                wrapper : selfClose
            },
            "<inputoption" : {
                attributes : { variable : "$()", line : "0", column : "0", message : empty, minimum : "0", maximum : "50" },
                wrapper : selfClose
            },
            "<inputmoney" : {
                attributes : { variable : "$()", line : "0", column : "0", message : empty },
                wrapper : selfClose
            },
            "<inputformat" : {
                attributes : { variable : "$()", line : "0", column : "0", message : empty, format : empty },
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
                attributes : { variable : "$()", line : "0", column : "0", message : empty },
                wrapper : selfClose
            },
            "<preconnect" : {
                attributes : { variablestatus : "$()" },
                wrapper : selfClose
            },
            "<shutdownmodem" : {
                attributes : null,
                wrapper : selfClose
            },
            "<getcardvariable" : {
                attributes : { firstmessage : empty, secondmessage : empty, minimum : "0", maximum : "50", variable : "$()" },
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
                attributes : { value : empty, variable : empty },
                wrapper : selfClose
            },
            "<stringvariable" : {
                attributes : { value : empty, variable : empty },
                wrapper : selfClose
            },
            "<substring" : {
                attributes : { index : "0", variablesource : "$()", variabledestination : "$()", character : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<stringtoint" : {
                attributes : { variablestring : "$()", variableinteger : "$()" },
                wrapper : selfClose
            },
            "<inttostring" : {
                attributes : { variableinteger : "$()", variablestring : "$()" },
                wrapper : selfClose
            },
            "<string.getvaluebykey" : {
                attributes : { string : "''", key : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<menu" : {
                attributes : { variable : "$()", options : "OPTION 1\\OPTION 2\\OPTION 3" },
                wrapper : selfClose
            },
            "<menuwithheader" : {
                attributes : { header : empty, options : "OPTION 1\\OPTION 2\\OPTION 3" , timeoutheader : "1", timeout : "30", variablereturn : "$()" },
                wrapper : selfClose
            },
            "<readfile" : {
                attributes : { filename : empty, key : empty, variabledestination : "$()" },
                wrapper : selfClose
            },
            "<editfile" : {
                attributes : { filename : empty, key : empty, value : empty },
                wrapper : selfClose
            },
            "<integeroperator" : {
                attributes : { operator : "++", variablesource : "$()" },
                wrapper : selfClose
            },
            "<adjustdatetime" : {
                attributes : { datetime : empty },
                wrapper : selfClose
            },
            "<getdatetime" : {
                attributes : { format : empty, variabledestination : "$()" },
                wrapper : selfClose
            },
            "<checkpaperout" : {
                attributes : { variablereturn : "$()" },
                wrapper : selfClose
            },
            "<mathematicaloperation" : {
                attributes : { variabledestination : "$()", operator : "+", firstvalue : "$()", secondvalue : "$()" },
                wrapper : selfClose
            },
            "<joinstring" : {
                attributes : { firstvalue : "$()", secondvalue : "$()", variabledestination : "$()" },
                wrapper : selfClose
            },
            "<deletefile" : {
                attributes : { filename : empty },
                wrapper : selfClose
            },
            "<printbarcode" : {
                attributes : { number : empty, horizontal : empty },
                wrapper : selfClose
            },
            "<waitkeytimeout" : {
                attributes : { seconds : empty },
                wrapper : selfClose
            },
            "<execute" : {
                attributes : { filename : empty },
                wrapper : selfClose
            },
            "<while" : {
                attributes : { variable : "$()", operator : empty, value : empty },
                wrapper : selfClose
            },
            "<break" : {
                attributes : null,
                wrapper : selfClose
            },
            "<openserialport" : {
                attributes : { port : empty, rate : empty, configuration : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<readserialport" : {
                attributes : { variablehandle : "$()", variablereturn : "$()", bytes : "8", timeout : "10000", variablebuffer : "$()" },
                wrapper : selfClose
            },
            "<writeserialport" : {
                attributes : { variablehandle : "$()", buffer : "$()" },
                wrapper : selfClose
            },
            "<closeserialport" : {
                attributes : { variablehandle : "$()" },
                wrapper : selfClose
            },
            "<string.length" : {
                attributes : { value : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<exit" : {
                attributes : null,
                wrapper : selfClose
            },
            "<downloadfile" : {
                attributes : { filename : empty, remotepath : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<readfilebyindex" : {
                attributes : { filename : empty, index : "0", variablekey : empty, variablevalue : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<displaybitmap" : {
                attributes : { filename : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<printbitmap" : {
                attributes : { filename : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<readkey" : {
                attributes : { miliseconds : "2000", variablereturn : "$()" },
                wrapper : selfClose
            },
            "<unzipfile" : {
                attributes : { filename : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<else" : {
                attributes : null,
                wrapper : selfClose
            },
            "<integerconvert" : {
                attributes : { number : empty, base : empty, sizereturn : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<iso8583.initfieldtable" : {
                attributes : { filename : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<iso8583.initmessage" : {
                attributes : { format : empty, id : empty, variablemessage : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<iso8583.analyzemessage" : {
                attributes : { format : empty, size : empty, variablemessage : empty, variableid : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<iso8583.endmessage" : {
                attributes : { variablesize : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<iso8583.putfield" : {
                attributes : { fieldnumber : empty, type : empty, value : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<iso8583.getfield" : {
                attributes : { fieldnumber : empty, type : empty, variablevalue : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.charat" : {
                attributes : { string : empty, character_index : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.trim" : {
                attributes : { string : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.find" : {
                attributes : { string : empty, substring : empty, start : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.replace" : {
                attributes : { original_string : empty, old_substring : empty, new_substring : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.substring" : {
                attributes : { string : empty, start : empty, length : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.elements" : {
                attributes : { string : empty, delimiter : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.insertat" : {
                attributes : { string : empty, string_to_be_inserted : empty, element_index : empty, delimiter : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.replaceat" : {
                attributes : { string : empty, new_element : empty, element_index : empty, delimiter : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.elementat" : {
                attributes : { string : empty, element_index : empty, delimiter : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.removeat" : {
                attributes : { string : empty, element_index : empty, delimiter : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<network.send" : {
                attributes : { buffer : "$()", size : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<network.receive" : {
                attributes : { variablebuffer : "$()", maxsize : empty, variablereceivedbytes : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<system.restart" : {
                attributes : null,
                wrapper : selfClose
            },
            "<filesystem.filesize" : {
                attributes : { filename : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<filesystem.space" : {
                attributes : { dir : empty, type : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<filesystem.listfiles" : {
                attributes : { dir : empty, listfilename : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<convert.toint" : {
                attributes : { base : empty, number : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<predial" : {
                attributes : { option : empty, variablestatus : "$()" },
                wrapper : selfClose
            },
            "<network.checkgprssignal" : {
                attributes : { variablestatus : "$()" },
                wrapper : selfClose
            },
            "<system.checkbattery" : {
                attributes : { variablestatus : "$()" },
                wrapper : selfClose
            },
            "<network.ping" : {
                attributes : { host : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<system.beep" : {
                attributes : null,
                wrapper : selfClose
            },
            "<system.readcard" : {
                attributes : { keyvariable : "$()", cardvariable : "$()", timeout : "30", variablereturn : "$()" },
                wrapper : selfClose
            },
            "<system.inputtransaction" : {
                attributes : { keyvariable : "$()", cardvariable : "$()", timeout : "30", variablereturn : "$()", keyboard : empty, inputtype : empty },
                wrapper : selfClose
            },
            "<network.hostdisconnect" : {
                attributes : null,
                wrapper : selfClose
            },
            "<iso8583.transactmessage" : {
                attributes : { channel : empty, header : empty, trailler : empty, isomsg : empty, variableresponse : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<smartcard.insertedcard" : {
                attributes : { slot : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<smartcard.startreader" : {
                attributes : { slot : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<smartcard.transmitAPDU" : {
                attributes : { slot : empty, header : empty, LC : empty, datafield : empty, LE : empty, variabledatafieldresponse : empty, variableSW : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<smartcard.closereader" : {
                attributes : { slot : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.tohex" : {
                attributes : { string : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.fromhex" : {
                attributes : { string : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<crypto.encryptdecrypt" : {
                attributes : { message : empty, key : empty, cryptotype : empty, type : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<crypto.lrc" : {
                attributes : { buffer : "$()", size : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<crypto.xor" : {
                attributes : { buffer1 : empty, buffer2 : empty, size : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<crypto.crc" : {
                attributes : { buffer : "$()", size : empty, crctype : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<system.info" : {
                attributes : { type : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<system.gettouchscreen" : {
                attributes : { axisx : empty, axisy : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<pinpad.open" : {
                attributes : { type : empty, variableserialnumber : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<pinpad.display" : {
                attributes : { message : empty },
                wrapper : selfClose
            },
            "<pinpad.getkey" : {
                attributes : { message : empty, timeout : "30", variablereturn : "$()" },
                wrapper : selfClose
            },
            "<pinpad.getpindukpt" : {
                attributes : { message : empty, type : empty, pan : empty, maxlen : empty, variablereturnpin : empty, variablereturnksn : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<pinpad.loadipek" : {
                attributes : { ipek : empty, ksn : empty, type : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<pinpad.close" : {
                attributes : { message : empty },
                wrapper : selfClose
            },
            "<emv.open" : {
                attributes : { variablereturn : "$()", mkslot : empty, pinpadtype : empty, pinpadwk : empty, showamount : empty },
                wrapper : selfClose
            },
            "<emv.close" : {
                attributes : { variablereturn : "0" },
                wrapper : selfClose
            },
            "<emv.settimeout" : {
                attributes : { seconds : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<emv.loadtables" : {
                attributes : { acquirer : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<emv.cleanstructures" : {
                attributes : null,
                wrapper : selfClose
            },
            "<emv.adddata" : {
                attributes : { type : empty, parameter : empty, value : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<emv.getinfo" : {
                attributes : { type : empty, parameter : empty, value : empty },
                wrapper : selfClose
            },
            "<emv.inittransaction" : {
                attributes : { variablereturn : "$()" },
                wrapper : selfClose
            },
            "<emv.processtransaction" : {
                attributes : { variablereturn : "$()", ctls : empty },
                wrapper : selfClose
            },
            "<emv.finishtransaction" : {
                attributes : { variablereturn : "$()" },
                wrapper : selfClose
            },
            "<emv.removecard" : {
                attributes : { variablereturn : "$()" },
                wrapper : selfClose
            },
            "<parseticket" : {
                attributes : { productmenu : empty, ticket : empty, message : empty, literal : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<file.open" : {
                attributes : { mode : empty, filename : empty, variablehandle : "$()" },
                wrapper : selfClose
            },
            "<file.close" : {
                attributes : { handle : empty },
                wrapper : selfClose
            },
            "<file.read" : {
                attributes : { handle : empty, size : empty, variablebuffer : "$()", variablereturn : "$()" },
                wrapper : selfClose
            },
            "<file.write" : {
                attributes : { handle : empty, size : empty, buffer : "$()" },
                wrapper : selfClose
            },
            "<input.getvalue" : {
                attributes : { linecaption : empty, columncaption : empty, caption : empty, lineinput : empty, columninput : empty, minimum : "0", maximum : "50", allowsempty : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.pad" : {
                attributes : { origin : empty, character : empty, align : empty, length : empty, destination : empty },
                wrapper : selfClose
            },
            "<time.calculate" : {
                attributes : { operation : empty, type : empty, date : empty, greaterdate : empty, value : empty, variablereturn : "$()" },
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
