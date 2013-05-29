/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
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

    var XmlHighlightRules = function() {
        var keywords = (
            "<display|"+
            "<cleandisplay|"+
            "<if|"+
            "<function|"+
            "<inputinteger|"+
            "<inputoption|"+
            "<inputmoney|"+
            "<inputformat|"+
            "<print|"+
            "<printbig|"+
            "<paperfeed|"+
            "<inputfloat|"+
            "<preconnect|"+
            "<shutdownmodem|"+
            "<getcardvariable|"+
            "<waitkey|"+
            "<wait|"+
            "<callfunction|"+
            "<integervariable|"+
            "<stringvariable|"+
            "<substring|"+
            "<stringtoint|"+
            "<inttostring|"+
            "<string.getvaluebykey|"+
            "<menu|"+
            "<menuwithheader|"+
            "<readfile|"+
            "<editfile|"+
            "<integeroperator|"+
            "<adjustdatetime|"+
            "<getdatetime|"+
            "<checkpaperout|"+
            "<mathematicaloperation|"+
            "<joinstring|"+
            "<deletefile|"+
            "<printbarcode|"+
            "<waitkeytimeout|"+
            "<execute|"+
            "<while|"+
            "<break|"+
            "<openserialport|"+
            "<readserialport|"+
            "<writeserialport|"+
            "<closeserialport|"+
            "<string.length|"+
            "<exit|"+
            "<downloadfile|"+
            "<readfilebyindex|"+
            "<displaybitmap|"+
            "<printbitmap|"+
            "<readkey|"+
            "<unzipfile|"+
            "<else|"+
            "<integerconvert|"+
            "<iso8583.initfieldtable|"+
            "<iso8583.initmessage|"+
            "<iso8583.analyzemessage|"+
            "<iso8583.endmessage|"+
            "<iso8583.putfield|"+
            "<iso8583.getfield|"+
            "<string.charat|"+
            "<string.trim|"+
            "<string.find|"+
            "<string.replace|"+
            "<string.substring|"+
            "<string.elements|"+
            "<string.insertat|"+
            "<string.replaceat|"+
            "<string.elementat|"+
            "<string.removeat|"+
            "<network.send|"+
            "<network.receive|"+
            "<system.restart|"+
            "<filesystem.filesize|"+
            "<filesystem.space|"+
            "<filesystem.listfiles|"+
            "<convert.toint|"+
            "<predial|"+
            "<network.checkgprssignal|"+
            "<system.checkbattery|"+
            "<network.ping|"+
            "<system.beep|"+
            "<system.readcard|"+
            "<network.hostdisconnect|"+
            "<iso8583.transactmessage|"+
            "<smartcard.insertedcard|"+
            "<smartcard.startreader|"+
            "<smartcard.transmitAPDU|"+
            "<smartcard.closereader|"+
            "<string.tohex|"+
            "<string.fromhex|"+
            "<crypto.encryptdecrypt|"+
            "<crypto.lrc|"+
            "<crypto.xor|"+
            "<crypto.crc|"+
            "<system.info|"+
            "<system.gettouchscreen|"+
            "<pinpad.open|"+
            "<pinpad.display|"+
            "<pinpad.getkey|"+
            "<pinpad.getpindukpt|"+
            "<pinpad.loadipek|"+
            "<pinpad.close|"+
            "<emv.open|"+
            "<emv.settimeout|"+
            "<emv.loadtables|"+
            "<emv.cleanstructures|"+
            "<emv.adddata|"+
            "<emv.getinfo|"+
            "<emv.inittransaction|"+
            "<emv.processtransaction|"+
            "<emv.finishtransaction|"+
            "<emv.removecard|"+
            "<parseticket|"+
            "<file.open|"+
            "<file.close|"+
            "<file.read|"+
            "<file.write|"+
            "<input.getvalue|"+
            "<string.pad|"+
            "<time.calculate|"+
            // attributes
            // name=""
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
            return tag + attributes + bs + gt;
        }
        // <tag attributes... >
        function noEndClose(tag) {
            var attributes = completeAttributes(this);
            return tag + attributes + gt;
        }

        // keywordsWrappers object to be added to the mode
        this.keywordsWrappers = {
            "<display" : {
                attributes : { line : empty, column : empty, message : empty },
                wrapper : selfClose
            },
            "<cleandisplay" : {
                attributes : null,
                wrapper : selfClose
            },
            "<if" : {
                attributes : { variable : empty, operator : empty, value : empty },
                wrapper : tagClose
            },
            "<function" : {
                attributes : { name : empty },
                wrapper : tagClose
            },
            "<inputinteger" : {
                attributes : { variable : empty, line : empty, column : empty, message : empty, minimum : empty, maximum : empty },
                wrapper : selfClose
            },
            "<inputoption" : {
                attributes : { variable : empty, line : empty, column : empty, message : empty, minimum : empty, maximum : empty },
                wrapper : selfClose
            },
            "<inputmoney" : {
                attributes : { variable : empty, line : empty, column : empty, message : empty },
                wrapper : selfClose
            },
            "<inputformat" : {
                attributes : { variable : empty, line : empty, column : empty, message : empty, format : empty },
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
                attributes : { variable : empty, line : empty, column : empty, message : empty },
                wrapper : selfClose
            },
            "<preconnect" : {
                attributes : { variablestatus : empty },
                wrapper : selfClose
            },
            "<shutdownmodem" : {
                attributes : null,
                wrapper : selfClose
            },
            "<getcardvariable" : {
                attributes : { firstmessage : empty, secondmessage : empty, minimum : empty, maximum : empty, variable : empty },
                wrapper : selfClose
            },
            "<waitkey" : {
                attributes : null,
                wrapper : selfClose
            },
            "<wait" : {
                attributes : { miliseconds : empty },
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
                attributes : { index : empty, variablesource : empty, variabledestination : empty, character : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<stringtoint" : {
                attributes : { variablestring : empty, variableinteger : empty },
                wrapper : selfClose
            },
            "<inttostring" : {
                attributes : { variableinteger : empty, variablestring : empty },
                wrapper : selfClose
            },
            "<string.getvaluebykey" : {
                attributes : { string : empty, key : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<menu" : {
                attributes : { variable : empty, options : empty },
                wrapper : selfClose
            },
            "<menuwithheader" : {
                attributes : { header : empty, options : empty, timeoutheader : empty, timeout : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<readfile" : {
                attributes : { filename : empty, key : empty, variabledestination : empty },
                wrapper : selfClose
            },
            "<editfile" : {
                attributes : { filename : empty, key : empty, value : empty },
                wrapper : selfClose
            },
            "<integeroperator" : {
                attributes : { operator : empty, variablesource : empty },
                wrapper : selfClose
            },
            "<adjustdatetime" : {
                attributes : { datetime : empty },
                wrapper : selfClose
            },
            "<getdatetime" : {
                attributes : { format : empty, variabledestination : empty },
                wrapper : selfClose
            },
            "<checkpaperout" : {
                attributes : { variablereturn : empty },
                wrapper : selfClose
            },
            "<mathematicaloperation" : {
                attributes : { variabledestination : empty, operator : empty, firstvalue : empty, secondvalue : empty },
                wrapper : selfClose
            },
            "<joinstring" : {
                attributes : { firstvalue : empty, secondvalue : empty, variabledestination : empty },
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
                attributes : { variable : empty, operator : empty, value : empty },
                wrapper : selfClose
            },
            "<break" : {
                attributes : null,
                wrapper : selfClose
            },
            "<openserialport" : {
                attributes : { port : empty, rate : empty, configuration : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<readserialport" : {
                attributes : { variablehandle : empty, variablebuffer : empty, bytes : empty, timeout : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<writeserialport" : {
                attributes : { variablehandle : empty, buffer : empty },
                wrapper : selfClose
            },
            "<closeserialport" : {
                attributes : { variablehandle : empty },
                wrapper : selfClose
            },
            "<string.length" : {
                attributes : { value : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<exit" : {
                attributes : null,
                wrapper : selfClose
            },
            "<downloadfile" : {
                attributes : { filename : empty, remotepath : empty, deleteafterdownload : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<readfilebyindex" : {
                attributes : { filename : empty, remotepath : empty, deleteafterdownload : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<displaybitmap" : {
                attributes : { filename : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<printbitmap" : {
                attributes : { filename : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<readkey" : {
                attributes : { miliseconds : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<unzipfile" : {
                attributes : { filename : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<else" : {
                attributes : null,
                wrapper : selfClose
            },
            "<integerconvert" : {
                attributes : { number : empty, base : empty, sizereturn : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<iso8583.initfieldtable" : {
                attributes : { filename : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<iso8583.initmessage" : {
                attributes : { format : empty, id : empty, variablemessage : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<iso8583.analyzemessage" : {
                attributes : { format : empty, size : empty, variablemessage : empty, variableid : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<iso8583.endmessage" : {
                attributes : { variablesize : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<iso8583.putfield" : {
                attributes : { fieldnumber : empty, type : empty, value : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<iso8583.getfield" : {
                attributes : { fieldnumber : empty, type : empty, variablevalue : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<string.charat" : {
                attributes : { string : empty, character_index : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<string.trim" : {
                attributes : { string : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<string.find" : {
                attributes : { string : empty, substring : empty, start : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<string.replace" : {
                attributes : { original_string : empty, old_substring : empty, new_substring : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<string.substring" : {
                attributes : { original_string : empty, old_substring : empty, new_substring : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<string.elements" : {
                attributes : { string : empty, delimiter : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<string.insertat" : {
                attributes : { string : empty, string_to_be_inserted : empty, element_index : empty, delimiter : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<string.replaceat" : {
                attributes : { string : empty, new_element : empty, element_index : empty, delimiter : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<string.elementat" : {
                attributes : { string : empty, element_index : empty, delimiter : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<string.removeat" : {
                attributes : { string : empty, element_index : empty, delimiter : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<network.send" : {
                attributes : { buffer : empty, size : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<network.receive" : {
                attributes : { variablebuffer : empty, maxsize : empty, variablereceivedbytes : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<system.restart" : {
                attributes : null,
                wrapper : selfClose
            },
            "<filesystem.filesize" : {
                attributes : { filename : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<filesystem.space" : {
                attributes : { dir : empty, type : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<filesystem.listfiles" : {
                attributes : { dir : empty, listfilename : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<convert.toint" : {
                attributes : { base : empty, number : empty, variablereturn : empty },
                wrapper : selfClose
            },
            "<predial" : {
                attributes : { option : empty, variablestatus : empty },
                wrapper : selfClose
            },
            "<time.calculate" : {
                attributes : { operation : empty, type : empty, date : empty, greaterdate : empty, value : empty, variablereturn : empty },
                wrapper : selfClose
            }
        };

        var keywordMapper = this.$keywords = this.createKeywordMapper({
            "variable.language": "this",
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

    oop.inherits(XmlHighlightRules, TextHighlightRules);

    exports.XmlHighlightRules = XmlHighlightRules;
});
