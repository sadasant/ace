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
var XmlBehaviour = require("../behaviour/xml").XmlBehaviour;
var CstyleBehaviour = require("./cstyle").CstyleBehaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;

function hasType(token, type) {
    var doHasType = true;
    var typeList = token.type.split('.');
    var needleList = type.split('.');
    needleList.forEach(function(needle){
        if (typeList.indexOf(needle) == -1) {
            doHasType = false;
            return false;
        }
    });
    return doHasType;
}

var PosXmlBehaviour = function () {

    this.inherit(XmlBehaviour); // Get xml behaviour

    var _PosXmlBehaviour = this;
    var lt = '<';

    this.add("autoclosing", "insertion", function (state, action, editor, session, text) {
        if (this.keywordsWrappers && this.keywordsWrappers[lt+text]) {
            return _PosXmlBehaviour.getBehaviours().wrapCompletion.insertion.apply(this, [state, action, editor, session, lt+text]);
        }
        if (text == '>') {
            var position = editor.getCursorPosition();
            var iterator = new TokenIterator(session, position.row, position.column);
            var token = iterator.getCurrentToken();
            var atCursor = false;
            var tagname = token ? token.value : '';
            if (!token || !hasType(token, 'meta.tag') && !(hasType(token, 'text') && token.value.match('/'))){
                do {
                    token = iterator.stepBackward();
                    tagname = token.value + tagname;
                    tagname = token ? token.value + tagname : tagname;
                } while (token && (hasType(token, 'string') || hasType(token, 'keyword.operator') || hasType(token, 'entity.attribute-name') || hasType(token, 'text')));
            } else {
                atCursor = true;
            }
            if (!token || !hasType(token, 'meta.tag-name') || iterator.stepBackward().value.match('/')) {
                return;
            }
            var tag = token.value;
            if (atCursor){
                tag = tag.substring(0, position.column - token.start);
            }

            tagname = '<' + tagname;
            if (this.keywordsWrappers && this.keywordsWrappers[tagname]) {
                return _PosXmlBehaviour.getBehaviours().wrapCompletion.insertion.apply(this, [state, action, editor, session, tagname]);
            }

            return {
               text: '>' + '</' + tag + '>',
               selection: [1, 1]
            };
        }
    });

};
oop.inherits(PosXmlBehaviour, XmlBehaviour);

exports.PosXmlBehaviour = PosXmlBehaviour;
});
