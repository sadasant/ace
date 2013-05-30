/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2013, PlanoBe.com.br
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

require("ace/lib/fixoldbrowsers");
require("ace/config").init();

var env = {};

var dom         = require("ace/lib/dom");
var net         = require("ace/lib/net");
var lang        = require("ace/lib/lang");
var useragent   = require("ace/lib/useragent");
var event       = require("ace/lib/event");
var theme       = require("ace/theme/monokai");
var EditSession = require("ace/edit_session").EditSession;
var UndoManager = require("ace/undomanager").UndoManager;
var HashHandler = require("ace/keyboard/hash_handler").HashHandler;
var Renderer    = require("ace/virtual_renderer").VirtualRenderer;
var Editor      = require("ace/editor").Editor;
var MultiSelect = require("ace/multi_select").MultiSelect;
var modelist    = require("./modelist");

/*********** create editor ***************************/
var container = document.getElementById("editor-container");

// Splitting.
var Split = require("ace/split").Split;
var split = new Split(container, theme, 1);
env.editor = split.getEditor(0);
split.on("focus", function(editor) {
    env.editor = editor;
});
env.split = split;
window.env = env;
window.ace = env.editor;
env.editor.setAnimatedScroll(true);

var edit_file_path = "demo/walkcompiler/docs/posxml_en.posxml";
net.get(edit_file_path, function(file) {
    var mode = modelist.getModeFromPath(edit_file_path);
    var session = new EditSession(file);
    session.setUndoManager(new UndoManager());
    session.modeName = mode.name;
    session.setMode(mode.mode);
    session.setUseSoftTabs(true);
    session.setTabSize(2);
    env.split.setSession(session);
});

// add multiple cursor support to editor
require("ace/multi_select").MultiSelect(env.editor);

var keybindings = {
    ace: null, // Null = use "default" keymapping
    vim: require("ace/keyboard/vim").handler,
    emacs: "ace/keyboard/emacs",
    // This is a way to define simple keyboard remappings
    custom: new HashHandler({
        "gotoright":      "Tab",
        "indent":         "]",
        "outdent":        "[",
        "gotolinestart":  "^",
        "gotolineend":    "$"
    })
};


/*********** manage layout ***************************/
function onResize() {
    var left = env.split.$container.offsetLeft;
    var width = document.documentElement.clientWidth - left;
    container.style.width = width + "px";
    env.split.resize();
}

window.onresize = onResize;
onResize();

});
