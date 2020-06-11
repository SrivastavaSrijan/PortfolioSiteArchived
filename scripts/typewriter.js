(function(){"use strict";(function(){for(var t=0,e=["ms","moz","webkit","o"],n=0;n<e.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[e[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[n]+"CancelAnimationFrame"]||window[e[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,n){var i=(new Date).getTime(),s=Math.max(0,16-(i-t)),r=window.setTimeout(function(){e(i+s)},s);return t=i+s,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})})(),window.Typewriter=function(t,e){return this._settings={cursorAnimationPaused:!1,opacityIncreasing:!1,currentOpacity:1,delayedQue:[],delayItemsCount:0,eventQue:[],calledEvents:[],eventRunning:!1,timeout:!1,delayExecution:!1,fps:.06,typingFrameCount:0,stringToTypeHTMLArray:[],currentTypedCharacters:[],typing:!1,usedIDs:[],charAmountToDelete:!1,userOptions:{},eventLoopRerun:0},t?"object"!=typeof e?console.error("Typewriter only accepts the options as an object."):(this._settings.userOptions=e,this.default_options={strings:!1,cursorClassName:"typewriter-cursor",cursor:"|",animateCursor:!0,blinkSpeed:50,typingSpeed:"natural",deleteSpeed:"natural",charSpanClassName:"typewriter-char",wrapperClassName:"typewriter-wrapper",loop:!1,autoStart:!1,devMode:!1},this.options=this._setupOptions(e),this.el=t,this._setupTypwriterWrapper(),this._startCursorAnimation(),void(!0===this.options.autoStart&&this.options.strings&&this.typeOutAllStrings())):console.error("Please choose an DOM element so that type writer can display itself.")};var t=window.Typewriter.prototype;t.stop=function(){return this._addToEventQue(this._stopEventLoop),this},t.start=function(){return this._startEventLoop(),this},t.rerun=function(){return this._addToEventQue(this._rerunCalledEvents),this},t.typeString=function(t){if(!t||"string"!=typeof t)return console.error("Please enter a string as the paramater.");var e=this._getCharacters(t);return this._addToEventQue([this._typeCharacters,[e]]),this},t.deleteAll=function(){return this._addToEventQue([this._deleteChars,["all"]]),this},t.deleteChars=function(t){return this._addToEventQue([this._deleteChars,[t]]),this},t.pauseFor=function(t){return this._addToEventQue([this._pauseFor,[t]]),this},t.typeOutAllStrings=function(){var t=this._getStringsAsCharsArray();if(1===t.length)this._typeCharacters(t[0]);else for(var e=0,n=t.length;e<n;e++)this._addToEventQue([this._typeCharacters,[t[e]]]),this.pauseFor(this._randomInteger(1500,2500)),this.deleteAll(),this.pauseFor(this._randomInteger(1500,2500));return this},t.changeSettings=function(t){return t||"object"==typeof t?(this._addToEventQue([this._changeSettings,[JSON.stringify(t)]]),this):console.error("Typewriter will only accept an object as the settings.")},t.changeBlinkSpeed=function(t){return t||"number"==typeof t?(this.changeSettings({blinkSpeed:t}),this):console.error("Please enter a number for the new blink speed.")},t.changeTypingSpeed=function(t){if(!t&&"number"!=typeof t)return console.error("Please enter a number for the new typing speed.");return this.changeSettings({typingSpeed:t}),this},t.changeDeleteSpeed=function(t){return t||"number"==typeof t?(this.changeSettings({changeDeleteSpeed:t}),this):console.error("Please enter a number for the new delete speed.")},t._rerunCalledEvents=function(){this._settings.currentTypedCharacters.length>0?(this.deleteAll(),this._resetEventLoop("rerunCalledEvents")):(this._settings.eventQue=this._settings.calledEvents,this._settings.calledEvents=[],this.options=this._setupOptions(this._settings.userOptions),this._settings.usedIDs=[],this.charAmountToDelete=!1,this._startEventLoop())},t._deleteChars=function(t){return t&&(this._settings.charAmountToDelete=t),this._deletingCharIdsAnimation=window.requestAnimationFrame(this._deletingCharAnimationFrame.bind(this)),this},t._pauseFor=function(t){var e=this;e._settings.eventRunning=!0,setTimeout(function(){e._resetEventLoop("pauseFor")},t)},t._changeSettings=function(t){this.options=this._setupOptions(JSON.parse(t[0])),this._resetEventLoop("changeSettings"),this.options.devMode&&console.log("New settings",this.options)},t._deletingCharAnimationFrame=function(){var t=this,e=this.options.deleteSpeed,n=t.options.wrapperClassName,i=t._settings.currentTypedCharacters,s=t._settings.charAmountToDelete;if(!t._settings.charAmountToDelete||0===t._settings.charAmountToDelete||0===i)return t._resetEventLoop("deletingCharAnimationFrame"),!0;"natural"==e&&(e=t._randomInteger(50,150)),"all"==s&&(s=i.length,t._settings.charAmountToDelete=s),setTimeout(function(){if(t._settings.charAmountToDelete){var e=i.length-1,r=i[e];t._settings.currentTypedCharacters.splice(e,1);var o=document.getElementById(r);if(o){var a=t.el.querySelector("."+n);a.removeChild(o),t._settings.charAmountToDelete=s-1,t.options.devMode&&console.log("Deleted char with ID",r)}}t._deletingCharIdsAnimation=window.requestAnimationFrame(t._deletingCharAnimationFrame.bind(t))},e)},t._setupOptions=function(t){var e={};for(var n in this.default_options)e[n]=this.default_options[n];if(this._settings.userOptions)for(var n in this._settings.userOptions)e[n]=this._settings.userOptions[n];for(var n in t)e[n]=t[n];return e},t._addToEventQue=function(t){this._settings.eventQue.push(t),this._settings.eventQue.length>0&&!this._settings.eventRunning&&this.options.autoStart&&this._startEventLoop()},t._startEventLoop=function(){if(this.options.devMode&&console.log("Event loop started."),!this._settings.eventRunning){if(this._settings.eventQue.length>0){this.eventLoopRerun=0;var t=this._settings.eventQue[0];"function"==typeof t?(this._settings.eventRunning=!0,this._settings.calledEvents.push(t),this._settings.eventQue.splice(0,1),t.call(this),this.options.devMode&&console.log("Event started.")):t instanceof Array&&"function"==typeof t[0]&&t[1]instanceof Array&&(this._settings.eventRunning=!0,this._settings.calledEvents.push(t),this._settings.eventQue.splice(0,1),t[0].call(this,t[1]),this.options.devMode&&console.log("Event started."))}this._eventQueAnimation=window.requestAnimationFrame(this._startEventLoop.bind(this))}if(!this._settings.eventRunning&&this._settings.eventQue.length<=0){var e=this;return e._stopEventLoop(),void setTimeout(function(){e.options.loop&&(e.eventLoopRerun++,e.options.devMode&&console.log("Before Loop State",e._settings),e.eventLoopRerun>4?(console.error("Maximum amount of loop retries reached."),e._stopEventLoop()):(e.options.devMode&&console.log("Looping events."),e._rerunCalledEvents()))},1e3)}},t._resetEventLoop=function(t){var e=t||"Event";this._settings.eventRunning=!1,this._startEventLoop(),this.options.devMode&&console.log(e,"Finished")},t._stopEventLoop=function(){window.cancelAnimationFrame(this._eventQueAnimation),this.options.devMode&&console.log("Event loop stopped.")},t._setupTypwriterWrapper=function(){var t=this.options.wrapperClassName,e=document.createElement("span");e.className=t,this.el.innerHTML="",this.el.appendChild(e)},t._typeCharacters=function(t){return this._settings.stringToTypeHTMLArray=this._convertCharsToHTML(t),this._typingAnimation=window.requestAnimationFrame(this._typingAnimationFrame.bind(this,t.length)),this},t._typingAnimationFrame=function(t){var e=this,n=this.options.typingSpeed,i=e.options.wrapperClassName;if(0==e._settings.stringToTypeHTMLArray.length)return window.cancelAnimationFrame(e._typingAnimation),this._resetEventLoop("typingAnimationFrame"),!0;"natural"==n&&(n=this._randomInteger(50,150)),setTimeout(function(){e.el.innerHTML;var n=e._settings.stringToTypeHTMLArray[0];e.el.querySelector("."+i).appendChild(n.el),e._settings.currentTypedCharacters.push(n.id),e._settings.stringToTypeHTMLArray.splice(0,1),e._typingAnimation=window.requestAnimationFrame(e._typingAnimationFrame.bind(e,t)),e.options.devMode&&console.log("Typed",n)},n)},t._convertCharsToHTML=function(t){for(var e=[],n=this.options.charSpanClassName,i=t[0],s=0,r=i.length;s<r;s++){var o=document.createElement("span"),a=this._generateUniqueID();o.id=a,o.className=n+" typewriter-item-"+s,o.innerHTML=i[s],e.push({id:a,el:o})}return e},t._getCharacters=function(t){return"string"==typeof t&&t.split("")},t._getStringsAsCharsArray=function(){var t=this.options.strings instanceof Array,e="string"==typeof this.options.strings;if(!t)return e?[this.options.strings.split("")]:console.error("Typewriter only accepts strings or an array of strings as the input.");for(var n=[],i=0,s=this.options.strings.length;i<s;i++){var r=this._getCharacters(this.options.strings[i]);if(!r){console.error("Please enter only strings.");break}n.push(r)}return n},t._cursorAnimationFrame=function(){if(!this._settings.cursorAnimationPaused){var t=this.options.blinkSpeed,e=.001*t,n=this.el.querySelector(".typewriter-cursor");1==this._settings.opacityIncreasing&&(this._settings.currentOpacity>=1&&(this._settings.opacityIncreasing=!1,this._settings.currentOpacity=1),this._settings.currentOpacity+=e),0==this._settings.opacityIncreasing&&(this._settings.currentOpacity<=0&&(this._settings.opacityIncreasing=!0,this._settings.currentOpacity=0),this._settings.currentOpacity-=e),n.style.opacity=this._settings.currentOpacity,this._cursorAnimation=window.requestAnimationFrame(this._cursorAnimationFrame.bind(this))}},t._startCursorAnimation=function(){var t=this.options.cursor,e=this.options.cursorClassName,n=document.createElement("span");n.className=e,n.innerHTML=t,this.el.appendChild(n),this.options.animateCursor&&(this._cursorAnimation=window.requestAnimationFrame(this._cursorAnimationFrame.bind(this)))},t._pauseCursorAnimation=function(){this._settings.cursorAnimationPaused||(window.cancelAnimationFrame(this._cursorAnimation),this._settings.cursorAnimationPaused=!0)},t._restartCursorAnimation=function(){if(!this._settings.cursorAnimationPaused)return console.error("Cursor animation is already running.");this._settings.cursorAnimationPaused=!1,this._cursorAnimation=window.requestAnimationFrame(this._cursorAnimationFrame.bind(this))},t._randomInteger=function(t,e){return Math.floor(Math.random()*(e-t+1))+t},t._randomID=function(){for(var t="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;n<this._randomInteger(5,15);n++)t+=e.charAt(Math.floor(Math.random()*e.length));return t},t._generateUniqueID=function(){var t=this._randomID();return-1==this._settings.usedIDs.indexOf(t)?(this._settings.usedIDs.push(t),t):this._generateUniqueID.call(this)}})();