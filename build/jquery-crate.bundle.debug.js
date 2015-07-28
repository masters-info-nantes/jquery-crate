(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Model = require('./model/model.js');

$.fn.cratify = function(options, session){
    
    var defaults = {
        'headerBackgroundColor': '#242b32',
        'headerColor': '#ececec',
        'editorBackgroundColor': '#ffffff',
        'editorHeight': '400px'
    };
    
    var parameters = $.extend(defaults, options);
    
    return this.each(function(){
        // #A create the header
        var header = jQuery('<div>').appendTo(this)
            .css('width', '100%')
            .css('box-shadow', '0px 1px 5px #ababab')
            .css('border-top-left-radius', '4px')
            .css('border-top-right-radius', '4px')
            .css('color', parameters.headerColor)
            .css('background-color', parameters.headerBackgroundColor);

        var headerContainer = jQuery('<div>').appendTo(header)
            .addClass('container');                

        // Divide the header in three part with different purpose
        var headerLeft = jQuery('<div>').appendTo(headerContainer)
            .addClass('pull-left')
            .css('padding-top','10px')
            .css('padding-bottom','10px');
        
        var headerRightRight = jQuery('<div>').appendTo(headerContainer)
            .addClass('pull-right')
            .css('padding-top','10px')
            .css('padding-bottom','10px')
            .css('height','34px');

        var headerRightLeft = jQuery('<div>').appendTo(headerContainer)
            .addClass('pull-right')
            .css('padding-top','10px')
            .css('padding-bottom','10px')
            .css('height','34px');

        // Contains data about the document
        var buttonFile = jQuery('<a>').appendTo(headerLeft)
            .attr('href','#')
            .attr('data-trigger', 'hover').attr('data-toggle', 'popover')
            .attr('data-placement', 'bottom').attr('data-html', 'true')
            .attr('title','Document').attr('data-content', '')
            .css('color', 'black').addClass('crate-icon')
            .css('height','34px');

        // Contains awareness information such as network state
        var signalingState = jQuery('<i>').appendTo(headerRightLeft)
            .addClass('fa fa-circle-o-notch fa-2x')
            .attr('data-trigger', 'hover').attr('data-toggle', 'popover')
            .attr('title', 'Signaling server status')
            .attr('data-html', 'true').attr('data-content', '')
            .attr('data-placement', 'bottom')
            .css('margin-right', '10px')
            .css('height','34px')
            .css('width','34px');
        
        var networkState = jQuery('<i>').appendTo(headerRightLeft)
            .addClass('fa fa-globe fa-2x')
            .attr('data-trigger', 'hover').attr('data-toggle', 'popover')
            .attr('title', 'Network status')
            .attr('data-html', 'true')
            .attr('data-content', 'Disconnected: you are currently'+
                  'editing <span class="alert-info">on your own</span>.')
            .attr('data-placement', 'bottom')
            .css('margin-right', '10px')
            .css('height','34px').css('width','34px');

        // Rightmost header part containing the dropdown menu
        function createDropdown(parent, texts){
            var dropdownElements = [], item, element;
            var ul = jQuery('<ul>').appendTo(parent)
                .addClass('dropdown-menu')
                .attr('role', 'menu');
            
            for (var i = 0; i < texts.length; ++i){
                if (texts[i]==='divider'){
                    jQuery('<li>').appendTo(ul).addClass('divider');
                } else {
                    item = jQuery('<li>').appendTo(ul)
                        .attr('role','presentation');
                    element = jQuery('<a>').appendTo(item)
                        .attr('href', 'javascript:void(0)')
                        .append(texts[i]);
                    dropdownElements.push(element);
                };
            };
            
            return dropdownElements;
        };
        
        var fileDropdown =  jQuery('<div>').appendTo(headerRightRight)
            .addClass('btn-group')
            .attr('role', 'group').attr('aria-label', 'menu bar')
            .css('margin-right','4px');
        
        jQuery('<button>').appendTo(fileDropdown)
            .addClass('btn btn-default dropdown-toggle')
            .attr('aria-label', 'File text')
            .attr('data-toggle', 'dropdown')
            .append( jQuery('<i>').addClass('fa fa-file-text'))
            .append( ' File ' )
            .append( jQuery('<span>').addClass('caret'));
        
        var fileButtons = createDropdown(fileDropdown, [
            'New',
            'Open',
            'Quick save',
            'Save on Disk' ]);

        var shareDropdown = jQuery('<div>').appendTo(headerRightRight)
            .addClass('btn-group')
            .attr('role', 'group').attr('aria-label', 'menu bar')
            .css('margin-right','4px');
        
        jQuery('<button>').appendTo(shareDropdown)
            .addClass('btn btn-default')
            .append( jQuery('<i>').addClass('fa fa-link'))
            .append( ' Share ' );
        jQuery('<button>').appendTo(shareDropdown)
            .addClass('btn btn-default dropdown-toggle')
            .html('&nbsp')
            .attr('data-toggle', 'dropdown').attr('aria-expanded', 'false')
            .append( jQuery('<span>').addClass('caret') );

        var shareButtons = createDropdown(shareDropdown,[
            '<i class="fa fa-long-arrow-right"></i> Get an entrance ticket',
            '<i class="fa fa-long-arrow-left"></i> Stamp a ticket',
            '<i class="fa fa-exchange"></i> Confirm our arrival',
            'divider',
            '<i class="fa fa-sign-out"></i> Disconnect' ]);
        
        
        var settingsDropdown =  jQuery('<div>').appendTo(headerRightRight)
            .addClass('btn-group')
            .attr('role', 'group').attr('aria-label', 'menu bar')
            .css('margin-right', '4px');
        
        jQuery('<button>').appendTo(settingsDropdown)
            .addClass('btn btn-default dropdown-toggle')
            .attr('aria-label', 'File text')
            .attr('data-toggle', 'dropdown')
            .append( jQuery('<i>').addClass('fa fa-cogs'))
            .append( ' Settings ' )
            .append( jQuery('<span>').addClass('caret'));

        var settingsButton = createDropdown( settingsDropdown, [
            '<i class="fa fa-book"></i> Editor',
            '<i class="fa fa-users"></i> Network' ]);
        
        // #B create the editor
        var post = jQuery('<div>').appendTo(this)
            .css('box-shadow', '0px 1px 5px #ababab')
            .css('border-bottom-left-radius', '4px')
            .css('border-bottom-right-radius', '4px')
            .css('margin-bottom', '20px')
            .css('padding', '30px 15px')
            .css('background-color', parameters.editorBackgroundColor);
        
        // (TODO) change id to something more meaningful
        var id = Math.random();
        var divEditor = jQuery('<div>').appendTo(post).attr('id','miaou'+id)
            .css('min-height', parameters.editorHeight);
        var editor = ace.edit('miaou'+id);
        
        editor.setTheme("ace/theme/chrome");
        editor.getSession().setUseWrapMode(true); // word wrapping
        editor.setHighlightActiveLine(false); // not highlighting current line
        editor.setShowPrintMargin(false); // no 80 column margin
        editor.renderer.setShowGutter(false); // no line numbers
    });
};

},{"./model/model.js":2}],2:[function(require,module,exports){
var Core = require('crate-core');
var Signaling = require('./signaling.js');

/*!
 * \brief the whole model of the application is contained within this object
 */
function Model(config, connect, object){
    // #1 initalize
    this.uid = Math.floor(Math.random()*133742133742);
    this.core = new Core(this.uid, {config:config});
    this.signaling = new Signaling(Lorem.getWord(), this.core.broadcast.source);
//    if (object && !connect){ this.core.init(object); };
    
    // #2 fast access
    this.broadcast = this.core.broadcast;
    this.rps = this.core.broadcast.source;
    this.sequence = this.core.sequence;    
};

},{"./signaling.js":3,"crate-core":4}],3:[function(require,module,exports){

/*!
 * \brief handle the signaling server
 * \param name the identifier used at the signaling server to identify your
 * editing session
 * \param rps the random peer sampling protocol
 */
function Signaling(name, rps){
    this.name = name;
    this.rps = rps;
    this.address = "file:///Users/chat-wane/Desktop/project/crate/"
    // this.address = "http://chat-wane.github.io/CRATE/";
    // this.signalingServer = "https://ancient-shelf-9067.herokuapp.com";
    // this.signalingServer = "http://adrouet.net:5000";
    this.signalingServer = "http://127.0.0.1:5000";
    this.socketIOConfig = { "force new connection": true,
                            "reconnection": false };
    this.startedSocket = false;
    this.socket = null;
    this.socketDuration = 5 * 60 * 1000;
    this.timeout = null; // event id of the termination
    this.joiners = 0;
};

Signaling.prototype.createSocket = function(){
    var self = this;
    if(!this.startedSocket){
        this.socket = io(this.signalingServer, this.socketIOConfig);
        this.startedSocket = true;
        this.socket.on("connect", function(){
            console.log("Connection to the signaling server established");
        });
        this.socket.on("launchResponse", function(destUid, offerTicket){
            self.joiners = self.joiners + 1;
            self.rps.answer(offerTicket, function(stampedTicket){
                console.log("answered");
                self.socket.emit("answer", self.rps.id, destUid, stampedTicket);
            });
        });
        this.socket.on("answerResponse", function(handshakeMessage){
            self.rps.handshake(handshakeMessage);
            self.socket.disconnect();
        });
        this.socket.on("disconnect", function(){
            console.log("Disconnection from the signaling server");
            self.startedSocket = false;
            self.joiners = 0;
            clearTimeout(this.timeout);
        });
    }

    // restart timer before closing the connection
    if (this.timeout!==null){ clearTimeout(this.timeout); }; 
    this.timeout = setTimeout(function(){
        self.stopSharing();
    }, this.socketDuration);
};

Signaling.prototype.startSharing = function(){
    var self = this;
    this.createSocket();
    this.socket.on("connect", function(){
        self.socket.emit("share", self.name);
    });
    return this.socket;
};

Signaling.prototype.stopSharing = function(){
    this.socket.emit("unshare", this.name);
    this.socket.disconnect();
    this.timeout = null;
};

Signaling.prototype.startJoining = function(originName){
    var self = this;
    this.createSocket();
    this.socket.on("connect", function(){
        self.rps.launch(function(launchMessage){
            console.log("launched");
            self.socket.emit("launch", originName, self.rps.id, launchMessage);
        });
    });
    return this.socket;
};



},{}],4:[function(require,module,exports){
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Spray = require('spray-wrtc');
var CausalBroadcast = require('causal-broadcast-definition');
var VVwE = require('version-vector-with-exceptions');
var LSEQTree = require('lseqtree');
var GUID = require('./guid.js');

var MInsertOperation = require('./messages.js').MInsertOperation;
var MAEInsertOperation = require('./messages.js').MAEInsertOperation;
var MRemoveOperation = require('./messages.js').MRemoveOperation;

util.inherits(CrateCore, EventEmitter);

/*!
 * \brief link together all components of the model of the CRATE editor
 * \param id the unique site identifier
 * \param options the webrtc specific options 
 */
function CrateCore(id, options){
    EventEmitter.call(this);
    
    this.id = id || GUID();
    this.options = options;
    this.broadcast = new CausalBroadcast(new Spray(this.id, this.options),
                                         new VVwE(this.id));
    this.sequence = new LSEQTree(this.id);

    var self = this;
    // #A regular receive
    this.broadcast.on('receive', function(receivedBroadcastMessage){
        switch (receivedBroadcastMessage.type){
        case 'MRemoveOperation':
            self.remoteRemove(receivedBroadcastMessage.remove);
            break;
        case 'MInsertOperation':
            self.remoteInsert(receivedBroadcastMessage.insert);
            break;
        };
    });
    // #B anti-entropy for the missing operation
    this.broadcast.on('antiEntropy', function(socket, remoteVVwE, localVVwE){
        /*var remoteVVwE = (new VVwE(null)).fromJSON(remoteVVwE); // cast
        var toSearch = [];
        // #1 for each entry of our VVwE, look if the remote VVwE knows less
        for (var i=0; i<localVVwE.vector.arr.length; ++i){
            var localEntry = localVVwE.vector.arr[i];
            var index = remoteVVwE.vector.indexOf(localVVwE.vector.arr[i]);
            var start = 1;
            // #A check if the entry exists in the remote vvwe
            if (index >=0){ start = remoteVVwE.vector.arr[index].v + 1; };
            for (var j=start; j<=localEntry.v; ++j){
                // #B check if not one of the local exceptions
                if (localEntry.x.indexOf(j)<0){
                    toSearch.push({_e: localEntry.e, _c: j});
                };
            };
            // #C handle the exceptions of the remote vector
            if (index >=0){
                for (var j=0; j<remoteVVwE.vector.arr[index].x.length;++j){
                    var except = remoteVVwE.vector.arr[index].x[j];
                    if (localEntry.x.indexOf(except)<0 && except<=localEntry.v){
                        toSearch.push({_e: localEntry.e, _c: except});
                    };
                };
            };
        };
        var elements = self.getElements(toSearch);*/
        var elements = [];
        // #2 send back the found elements
        self.broadcast.sendAntiEntropyResponse(socket, localVVwE, elements);
    });
};

/*!
 * \brief create the core from an existing object
 * \param object the object to initialize the core model of crate containing a 
 * sequence and causality tracking metadata
 */
CrateCore.prototype.init = function(object){
    // (TODO)
    /* this.broadcast = new CausalBroadcast(new Spray(this.id, this.options),
                                         (new VVwE(this.id)).fromJSON(
                                             object.causality));
    this.sequence = (new LSEQTree(id)).fromJSON(object.sequence);*/
};

/*!
 * \brief local insertion of a character inside the sequence structure. It
 * broadcasts the operation to the rest of the network.
 * \param character the character to insert in the sequence
 * \param index the index in the sequence to insert
 * \return the identifier freshly allocated
 */
CrateCore.prototype.insert = function(character, index){
    var ei = this.sequence.insert(character, index);
    var id = {_e: ei._i._s[ei._i._s.length-1], _c: ei._i._c[ei._i._c.length-1]};
    this.broadcast.send(new MInsertOperation(ei), id, null);
    return ei;
};

/*!
 * \brief local deletion of a character from the sequence structure. It 
 * broadcasts the operation to the rest of the network.
 * \param index the index of the element to remove
 * \return the identifier freshly removed
 */
CrateCore.prototype.remove = function(index){
    var i = this.sequence.remove(index);
    var isReady = {_e: i._s[i._s.length-1], _c: i._c[i._c.length-1]};
    this.sequence._c += 1;
    var id = {_e:this.sequence._s, _c: this.sequence._c } // (TODO) fix uglyness
    this.broadcast.send(new MRemoveOperation(i), id, isReady);
    return i;
};

/*!
 * \brief insertion of an element from a remote site. It emits 'remoteInsert' 
 * with the index of the element to insert, -1 if already existing.
 * \param ei the result of the remote insert operation
 */
CrateCore.prototype.remoteInsert = function(ei){
    this.emit('remoteInsert',
              ei._e,
              this.sequence.applyInsert(ei._e, ei._i, true));
    // (TODO) fix the noIndex thing
};

/*!
 * \brief removal of an element from a remote site.  It emits 'remoteRemove'
 * with the index of the element to remove, -1 if does not exist
 * \param id the result of the remote insert operation
 */
CrateCore.prototype.remoteRemove = function(id){
    this.emit('remoteRemove', this.sequence.applyRemove(id));
};

/*!
 * \brief search a set of elements in our sequence and return them
 * \param toSearch the array of elements {_e, _c} to search
 * \returns an array of nodes
 */
CrateCore.prototype.getElements = function(toSearch){
    var result = [], found, node, tempNode, i=this.sequence.length, j=0;
    // (TODO) improve research by exploiting the fact that if a node is
    // missing, all its children are missing too.
    // (TODO) improve the returned representation: either a tree to factorize
    // common parts of the structure or identifiers to get the polylog size
    // (TODO) improve the search by using the fact that toSearch is a sorted
    // array, possibly restructure this argument to be even more efficient
    while (toSearch.length > 0 && i<=this.sequence.length && i>0){
        node = this.sequence.get(i);
        tempNode = node;
        while( tempNode.children.length > 0){
            tempNode = tempNode.children[0];
        };
        j = 0;
        found = false;
        while (j < toSearch.length && !found){
            if (tempNode.t.s === toSearch[j]._e &&
                tempNode.t.c === toSearch[j]._c){
                found = true;
                result.push(new MAEInsertOperation({_e: tempNode.e, _i:node},
                                                   {_e: toSearch[j]._e,
                                                    _c: toSearch[j]._c} ));
                toSearch.splice(j,1);
            } else {
                ++j;
            };
        };
        //        ++i;
        --i;
    };
     return result;
};

module.exports = CrateCore;

},{"./guid.js":5,"./messages.js":6,"causal-broadcast-definition":7,"events":45,"lseqtree":15,"spray-wrtc":24,"util":63,"version-vector-with-exceptions":37}],5:[function(require,module,exports){
/*
 * \url https://github.com/justayak/yutils/blob/master/yutils.js
 * \author justayak
 */

/*!
 * \brief get a globally unique (with high probability) identifier
 * \return a string being the identifier
 */
function GUID(){
    var d = new Date().getTime();
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return guid;
};

module.exports = GUID;

},{}],6:[function(require,module,exports){
/*!
 * \brief object that represents the result of an insert operation
 * \param insert the result of the local insert operation
 */
function MInsertOperation(insert){
    this.type = "MInsertOperation";
    this.insert = insert;
};
module.exports.MInsertOperation = MInsertOperation;

function MAEInsertOperation(insert, id){
    this.type = "MAEInsertOperation";
    this.payload = new MInsertOperation(insert);
    this.id = id;
    this.isReady = null;
};
module.exports.MAEInsertOperation = MAEInsertOperation;

/*!
 * \brief object that represents the result of a delete operation
 * \param remove the result of the local delete operation
 */
function MRemoveOperation(remove){
    this.type = "MRemoveOperation";
    this.remove = remove;
};
module.exports.MRemoveOperation = MRemoveOperation;

},{}],7:[function(require,module,exports){
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var GUID = require('./guid.js');

var MBroadcast = require('./messages').MBroadcast;
var MAntiEntropyRequest = require('./messages.js').MAntiEntropyRequest;
var MAntiEntropyResponse = require('./messages.js').MAntiEntropyResponse;

var Unicast = require('unicast-definition');

util.inherits(CausalBroadcast, EventEmitter);

/*!
 * It takes a unique value for peer and a counter to distinguish a message. It
 * emits 'receive' event when the message is considered ready
 * \param source the protocol receiving the messages
 * \param causality the causality tracking structure
 */
function CausalBroadcast(source, causality, name) {
    EventEmitter.call(this);
    this.name = name || 'causal';
    this.source = source;
    this.causality = causality;
    this.deltaAntiEntropy = 1000*60*1/6; // (TODO) configurable
    this.unicast = new Unicast(this.source, this.name+'-unicast');
    
    this.buffer = [];
    
    var self = this;
    this.source.on(self.name+'-broadcast-receive', function(socket, message){
        self.receiveBroadcast(message);
    });
    this.unicast.on('receive', function(socket, message){
        self.receiveUnicast(socket, message);
    });
    setInterval(function(){
        self.unicast.send(new MAntiEntropyRequest(self.causality));
    }, this.deltaAntiEntropy);
};

/*!
 * \brief broadcast the message to all participants
 * \param message the message to broadcast
 * \param id the id of the message
 * \param isReady the id(s) that must exist to deliver the message
 */
CausalBroadcast.prototype.send = function(message, id, isReady){
    // #1 get the neighborhood and create the message
    var links = this.source.getPeers(Number.MAX_VALUE);
    var mBroadcast = new MBroadcast(this.name, id || GUID(), isReady, message);
    // #2 register the message in the structure
    this.causality.incrementFrom(id);
    // #3 send the message to the neighborhood
    for (var i = 0; i < links.length; ++i){
        if (links[i].connected &&
            links[i]._channel && links[i]._channel.readyState==='open'){
            links[i].send(mBroadcast);
        };
    };
};

/*!
 * \brief answers to an antientropy request message with the missing elements
 * \param socket the origin of the request
 * \param causalityAtReceipt the local causality structure when the message was
 * received
 * \param messages the missing messages
 */ 
CausalBroadcast.prototype.sendAntiEntropyResponse =
    function(socket, causalityAtReceipt, messages){
        this.unicast.send(
            new MAntiEntropyResponse(causalityAtReceipt, messages),
            socket);
    };

/*!
 * \brief receive a broadcast message
 * \param message the received message
 */
CausalBroadcast.prototype.receiveBroadcast = function(message){
    var id = message.id,
        isReady = message.isReady;

    if (!this.stopPropagation(message)){
        // #1 register the operation
        this.buffer.push(message);
        // #2 deliver
        this.reviewBuffer();
        // #3 rebroadcast
        var links = this.source.getPeers(Number.MAX_VALUE);
        for (var i = 0; i < links.length; ++i){
            if (links[i].connected &&
                links[i]._channel && links[i]._channel.readyState==='open'){
                links[i].send(message);
            };
        };
    };
};

/*!
 * \brief go through the buffer of messages and delivers all
 * ready operations
 */
CausalBroadcast.prototype.reviewBuffer = function(){
    var found = false,
        i = this.buffer.length - 1;
    while(i>=0){
        var message = this.buffer[i];
        if (this.causality.isLower(message.id)){
            this.buffer.splice(i, 1);
        } else {
            if (this.causality.isReady(message.isReady)){
                found = true;
                this.causality.incrementFrom(message.id);
                this.buffer.splice(i, 1);
                this.emit('receive', message.payload);
            };
        };
        --i;
    };
    if (found){ this.reviewBuffer();  };
};

/*!
 * \brief receive a unicast message, i.e., either an antientropy request or an
 * antientropy response
 * \brief socket the origin of the message
 * \brief message the message received 
 */
CausalBroadcast.prototype.receiveUnicast = function(socket, message){
    switch (message.type){
    case 'MAntiEntropyRequest':
        this.emit('antiEntropy',
                  socket, message.causality, this.causality.clone());
        break;
    case 'MAntiEntropyResponse':
        // #1 considere each message in the response independantly
        for (var i = 0; i<message.elements.length; ++i){
            // #2 only check if the message has not been received yet
            if (!this.stopPropagation(message.elements[i])){
                this.causality.incrementFrom(message.elements[i].id);
                this.emit('receive', message.elements[i].payload);
            };
        };
        // #2 merge causality structures
        this.causality.merge(message.causality);
        break;
    };
};

/*!
 * \brief gets called when a broadcast message reaches this node.  this
 * function evaluates if the node should propagate the message further or if it
 * should stop sending it.
 * \param message a broadcast message
 * \return true if the message is already known, false otherwise
 */
CausalBroadcast.prototype.stopPropagation = function (message) {
    return this.causality.isLower(message.id) ||
        this.bufferIndexOf(message.id)>=0;
};

/*!
 * \brief get the index in the buffer of the message identified by id
 * \param id the identifier to search
 * \return the index of the message in the buffer, -1 if not found
 */
CausalBroadcast.prototype.bufferIndexOf = function(id){
    var found = false,
        index = -1,
        i = 0;
    while (!found && i<this.buffer.length){
        // (TODO) fix uglyness
        if (JSON.stringify(this.buffer[i].id) === JSON.stringify(id)){ 
            found = true; index = i;
        };
        ++i
    };
    return index;
};

module.exports = CausalBroadcast;

},{"./guid.js":8,"./messages":9,"./messages.js":9,"events":45,"unicast-definition":11,"util":63}],8:[function(require,module,exports){
module.exports=require(5)
},{"/Users/chat-wane/Desktop/project/jquery-crate/node_modules/crate-core/lib/guid.js":5}],9:[function(require,module,exports){

/*!
 * \brief message containing data to broadcast
 * \param name the name of the protocol, default 'causal'
 * \param id the identifier of the broadcast message
 * \param isReady the identifier(s) that must exist to deliver this message
 * \param payload the broadcasted data
 */
function MBroadcast(name, id, isReady, payload){
    this.protocol = (name && name+'-broadcast') || 'causal-broadcast';
    this.id = id;
    this.isReady = isReady;
    this.payload = payload;
};
module.exports.MBroadcast = MBroadcast;

/*!
 * \brief message that request an AntiEntropy 
 * \param causality the causality structure
 */
function MAntiEntropyRequest(causality){
    this.type = 'MAntiEntropyRequest';
    this.causality = causality;
};
module.exports.MAntiEntropyRequest = MAntiEntropyRequest;

/*!
 * \brief message responding to the AntiEntropy request
 * \param name the name of the protocol, default 'causal'
 * \param causality the causality structure
 * \param elements the elements to send
 */
function MAntiEntropyResponse(causality, elements){
    this.type = 'MAntiEntropyResponse';
    this.causality = causality;
    this.elements = elements;
};
module.exports.MAntiEntropyResponse = MAntiEntropyResponse;


},{}],10:[function(require,module,exports){

/*!
 * \brief message containing data to unicast
 * \param name the protocol name
 * \param payload the sent data
 */
function MUnicast(name, payload){
    this.protocol = name || 'unicast';
    this.payload = payload;
};
module.exports.MUnicast = MUnicast;

},{}],11:[function(require,module,exports){
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var MUnicast = require('./messages').MUnicast;

util.inherits(Unicast, EventEmitter);

/*!
 * Unicast component that simply chose a random peer and send a message
 * \param source the protocol receiving the messages
 * \param name the name of the protocol, default is 'unicast'
 */
function Unicast(source, max, name) {
    EventEmitter.call(this);
    this.name = name || 'unicast';
    this.source = source;
    var self = this;
    this.source.on(self.name+'-receive', function(socket, message){
        self.emit('receive', socket, message.payload);
    });
};

/*!
 * \brief send the message to one random participant
 * \param message the message to send
 * \param socket optional known socket
 */
Unicast.prototype.send = function(message, socket){
    // #1 get the neighborhood and create the message
    var links = (socket && [socket]) || this.source.getPeers(1);
    var mUnicast = new MUnicast(this.name, message);
    // #2 send the message
    if (links.length>0 && links[0].connected){
        links[0].send(mUnicast);
    };
};

module.exports = Unicast;

},{"./messages":10,"events":45,"util":63}],12:[function(require,module,exports){
var BI = require('BigInt');

/*!
 * \class Base
 * \brief provides basic function to bit manipulation
 * \param b the number of bits at level 0 of the dense space
 */
function Base(b){    
    var DEFAULT_BASE = 3;
    this._b = b || DEFAULT_BASE;
};

/*!
 * \brief Process the number of bits usage at a certain level of dense space
 * \param level the level in dense space, i.e., the number of concatenation
 */
Base.prototype.getBitBase = function(level){
    return this._b + level;
};

/*!
 * \brief Process the total number of bits usage to get to a certain level
 * \param level the level in dense space
 */
Base.prototype.getSumBit = function(level){
    var n = this.getBitBase(level),
        m = this._b-1;
    return (n * (n + 1)) / 2 - (m * (m + 1) / 2);
};

/*!
  \brief process the interval between two LSEQNode
  \param p the previous LSEQNode
  \param q the next LSEQNode
  \param level the depth of the tree to process
  \return an integer which is the interval between the two node at the depth
*/
Base.prototype.getInterval = function(p, q, level){
    var sum = 0, i = 0,
        pIsGreater = false, commonRoot = true,
        prevValue = 0, nextValue = 0;
    
    while (i<=level){
	prevValue = 0; if (p !== null){ prevValue = p.t.p; }
        nextValue = 0; if (q !== null){ nextValue = q.t.p; }
        if (commonRoot && prevValue !== nextValue){
            commonRoot = false;
            pIsGreater = prevValue > nextValue;
        }
        if (pIsGreater){ nextValue = Math.pow(2,this.getBitBase(i))-1; }
        if (commonRoot || pIsGreater || i!==level){
            sum += nextValue - prevValue; 
        } else {
            sum += nextValue - prevValue - 1;
        }
        if (i!==level){
            sum *= Math.pow(2,this.getBitBase(i+1));
        };
        if (p!==null && p.children.length!==0){p=p.children[0];} else{p=null;};
        if (q!==null && q.children.length!==0){q=q.children[0];} else{q=null;};
        ++i;
    }
    return sum;
};

Base.instance = null;

module.exports = function(args){
    if (args){
        Base.instance = new Base(args);
    } else {
        if (Base.instance === null){
            Base.instance = new Base();
        };
    };
    return Base.instance;
};

},{"BigInt":19}],13:[function(require,module,exports){
var BI = require('BigInt');
var Base = require('./base.js')();
var Triple = require('./triple.js');
var LSEQNode = require('./lseqnode.js');

/*!
 * \class Identifier
 * \brief Unique and immutable identifier composed of digit, sources, counters
 * \param d the digit (position in dense space)
 * \param s the list of sources
 * \param c the list of counters
 */
function Identifier(d, s, c){
    this._d = d;
    this._s = s;
    this._c = c;
};

/*!
 * \brief set the d,s,c values according to the node in argument
 * \param node the lseqnode containing the path in the tree structure
 */
Identifier.prototype.fromNode = function(node){
    // #1 process the length of the path
    var length = 1, tempNode = node, i = 0;
    
    while (tempNode.children.length !== 0){
	++length;
        tempNode = tempNode.children[0];
    };
    // #1 copy the values contained in the path
    this._d = BI.int2bigInt(0,Base.getSumBit(length - 1));
    
    for (var i = 0; i < length ; ++i){
        // #1a copy the site id
        this._s.push(node.t.s);
        // #1b copy the counter
        this._c.push(node.t.c);
        // #1c copy the digit
        BI.addInt_(this._d, node.t.p);
        if (i!==(length-1)){
            BI.leftShift_(this._d, Base.getBitBase(i+1));
        };
        node = node.children[0];
    };
};

/*!
 * \brief convert the identifier into a node without element
 * \param e the element associated with the node
 */
Identifier.prototype.toNode = function(e){
    var resultPath = [], dBitLength = Base.getSumBit(this._c.length -1), i = 0,
        mine;
    // #1 deconstruct the digit 
    for (var i = 0; i < this._c.length; ++i){
        // #1 truncate mine
        mine = BI.dup(this._d);
        // #1a shift right to erase the tail of the path
        BI.rightShift_(mine, dBitLength - Base.getSumBit(i));
        // #1b copy value in the result
        resultPath.push(new Triple(BI.modInt(mine,
                                             Math.pow(2,Base.getBitBase(i))),
                                   this._s[i],
                                   this._c[i]));
    };
    return new LSEQNode(resultPath, e);
};

/*!
 * \brief compare two identifiers
 * \param o the other identifier
 * \return -1 if this is lower, 0 if they are equal, 1 if this is greater
 */
Identifier.prototype.compare = function(o){
    var dBitLength = Base.getSumBit(this._c.length - 1),
        odBitLength = Base.getSumBit(o._c.length - 1),
        comparing = true,
        comp = 0, i = 0,
        sum, mine, other;
    
    // #1 Compare the list of <d,s,c>
    while (comparing && i < Math.min(this._c.length, o._c.length) ) {
        // can stop before the end of for loop wiz return
        sum = Base.getSumBit(i);
        // #1a truncate mine
        mine = BI.dup(this._d);
        BI.rightShift_(mine, dBitLength - sum);
        // #1b truncate other
        other = BI.dup(o._d);
        BI.rightShift_(other, odBitLength - sum);
        // #2 Compare triples
        if (!BI.equals(mine,other)) {  // #2a digit
            if (BI.greater(mine,other)){comp = 1;}else{comp = -1;};
            comparing = false;
        } else {
            comp = this._s[i] - o._s[i]; // #2b source
            if (comp !== 0) {
                comparing = false;
            } else {
                comp = this._c[i] - o._c[i]; // 2c clock
                if (comp !== 0) {
                    comparing = false;
                };
            };
        };
        ++i;
    };
    
    if (comp===0){
        comp = this._c.length - o._c.length; // #3 compare list size
    };
    return comp;
};


module.exports = Identifier;

},{"./base.js":12,"./lseqnode.js":14,"./triple.js":17,"BigInt":19}],14:[function(require,module,exports){
var Triple = require('./triple.js');
require('./util.js');

/*!
 * \brief a node of the LSEQ tree
 * \param tripleList the list of triple composing the path to the element
 * \param element the element to insert in the structure
 */
function LSEQNode(tripleList, element){
    this.t = tripleList.shift();
    if (tripleList.length === 0){
        this.e = element;
        this.subCounter = 0; // count the number of children and subchildren
        this.children = [];
    } else {
        this.e = null;
        this.subCounter = 1;
        this.children = [];
        this.children.push(new LSEQNode(tripleList, element));
    };
};

/*!
 * \brief add a path element to the current node
 * \param node the node to add as a children of this node
 * \return -1 if the element already exists
 */
LSEQNode.prototype.add = function(node){
    var index = this.children.binaryIndexOf(node);
    
    // #1 if the path do no exist, create it
    if (index < 0 || this.children.length === 0  ||
        (index === 0 && this.children.length > 0 && 
         this.children[0].compare(node)!==0)){
        this.children.splice(-index, 0, node);
        this.subCounter+=1;
    } else {
        // #2 otherwise, continue to explore the subtrees
        if (node.children.length === 0){
            // #2a check if the element already exists
            if (this.children[index].e !== null){
                return -1;
            } else {
                this.children[index].e = node.e;
                this.subCounter+=1;
            };
        } else {
            // #3 if didnot exist, increment the counter
            if (this.children[index].add(node.children[0])!==-1){
                this.subCounter+=1;
            };
        };
    };
};

/*! 
 * \brief remove the node of the tree and all node within path being useless
 * \param node the node containing the path to remove
 * \return -1 if the node does not exist
 */
LSEQNode.prototype.del = function(node){
    var indexes = this.getIndexes(node),
        currentTree = this, i = 0, isSplitted = false;

    if (indexes === -1) { return -1; }; // it does not exists
    this.subCounter -= 1;
    while (i < indexes.length && !(isSplitted)){
        if (!(currentTree.children[indexes[i]].e !== null &&
              i===(indexes.length - 1))){
            currentTree.children[indexes[i]].subCounter -= 1;     
        };
        if (currentTree.children[indexes[i]].subCounter <= 0
            && (currentTree.children[indexes[i]].e === null ||
                (currentTree.children[indexes[i]].e !== null &&
                 i===(indexes.length - 1)))){
            currentTree.children.splice(indexes[i],1);
            isSplitted = true;
        };
        currentTree = currentTree.children[indexes[i]];
        ++i;
    };
    if (!isSplitted){ currentTree.e = null;};
};

/*!
 * \brief comparison function used to order the list of children at each node
 * \param o the other node to compare with
 */
LSEQNode.prototype.compare = function(o){
    return this.t.compare(o.t);
};

/*!
 * \brief the ordered tree can be linearized into a sequence. This function get
 * the index of the path represented by the list of triples
 * \param node the node containing the path
 * \return the index of the path in the node
 */
LSEQNode.prototype.indexOf = function(node){
    var indexes = this.getIndexes(node),
        sum = 0, currentTree = this,
        j = 0;
    if (indexes === -1){return -1;}; // node does not exist
    if (this.e !== null){ sum +=1; };
    
    for (var i = 0; i<indexes.length; ++i){
        if (indexes[i] < (currentTree.children.length/2)){
            // #A start from the beginning
            for (var j = 0; j<indexes[i]; ++j){
                if (currentTree.children[j].e !== null){ sum+=1; };
                sum += currentTree.children[j].subCounter;
            };
        } else {
            // #B start from the end
            sum += currentTree.subCounter;
            for (var j = currentTree.children.length-1; j>=indexes[i];--j){
                if (currentTree.children[j].e !== null){ sum-=1; };
                sum -= currentTree.children[j].subCounter;  
            };
            j += 1;
        };
        if (currentTree.children[j].e !== null){ sum+=1; };
        currentTree = currentTree.children[j];
    };
    return sum-1; // -1 because algorithm counted the element itself
};

/*!
 * \brief get the list of indexes of the arrays representing the children in
 * the tree
 * \param node the node containing the path
 * \return a list of integer
 */
LSEQNode.prototype.getIndexes = function(node){
    function _getIndexes(indexes, currentTree, currentNode){
        var index = currentTree.children.binaryIndexOf(currentNode);
        if (index < 0 ||
            (index===0 && currentTree.children.length===0)){ return -1; }
        indexes.push(index);
        if (currentNode.children.length===0 ||
            currentTree.children.length===0){
            return indexes;
        };
        return _getIndexes(indexes,
                           currentTree.children[index],
                           currentNode.children[0]);
        
    };
    return _getIndexes([], this, node);
};

/*!
 * \brief the ordered tree can be linearized. This function gets the node at
 * the index in the projected sequence.
 * \param index the index in the sequence
 * \returns the node at the index
 */
LSEQNode.prototype.get = function(index){
    function _get(leftSum, buildingNode, queue, currentNode){
        var startBeginning = true, useFunction, i = 0,
            p, temp;
        // #0 the node is found, return the incrementally built node and praise
        // #the sun !
        if (leftSum === index && currentNode.e !== null){
            // 1a copy the value of the element in the path
            queue.e = currentNode.e;
            return buildingNode;
        };
        if (currentNode.e !== null){ leftSum += 1; };

        // #1 search: do I start from the beginning or the end
        startBeginning = ((index-leftSum)<(currentNode.subCounter/2));
        if (startBeginning){
            useFunction = function(a,b){return a+b;};
        } else {
            leftSum += currentNode.subCounter;
            useFunction = function(a,b){return a-b;};
        }

        // #2a counting the element from left to right
        if (!startBeginning) { i = currentNode.children.length-1; };
        while ((startBeginning && leftSum <= index) ||
               (!startBeginning && leftSum > index)){
            if (currentNode.children[i].e!==null){
                leftSum = useFunction(leftSum, 1);
            };
            leftSum = useFunction(leftSum,currentNode.children[i].subCounter);
            i = useFunction(i, 1);
        };

        // #2b decreasing the incrementation
        i = useFunction(i,-1);
        if (startBeginning){
            if (currentNode.children[i].e!==null){
                leftSum = useFunction(leftSum, -1);
            };
            leftSum = useFunction(leftSum,-currentNode.children[i].subCounter);
        };
        
        // #3 build path
        p = []; p.push(currentNode.children[i].t);
        if (buildingNode === null){
            buildingNode = new LSEQNode(p,null);
            queue = buildingNode;
        } else {
            temp = new LSEQNode(p,null);
            queue.add(temp);
            queue = temp;
        };
        return _get(leftSum, buildingNode, queue,
                    currentNode.children[i]);
    };
    return _get(0, null, null, this);
};

/*!
 * \brief cast the JSON object to a LSEQNode
 * \param object the JSON object
 * \return a self reference
 */
LSEQNode.prototype.fromJSON = function(object){
    this.t = new Triple(object.t.p, object.t.s, object.t.c);
    if (object.children.length === 0){
        this.e = object.e;
        this.subCounter = 0;
        this.children = [];
    } else {
        this.e = null;
        this.subCounter = 1;
        this.children = [];
        this.children.push(
            (new LSEQNode([], null).fromJSON(object.children[0])));
    };
    return this;
};

module.exports = LSEQNode;

},{"./triple.js":17,"./util.js":18}],15:[function(require,module,exports){
var BI = require('BigInt');
var Base = require('./base.js')(15);
var S = require('./strategy.js')(10);
var ID = require('./identifier.js');
var Triple = require('./triple.js');
var LSEQNode = require('./lseqnode.js');

/*!
 * \class LSEQTree
 *
 * \brief Distributed array using LSEQ allocation strategy with an underlying
 * exponential tree model
 */
function LSEQTree(s){
    var listTriple;
    
    this._s = s;
    this._c = 0;
    this._hash = function(depth) { return depth%2; };
    this.length = 0;

    this.root = new LSEQNode([],null);
    listTriple = []; listTriple.push(new Triple(0,0,0));  // min bound
    this.root.add(new LSEQNode(listTriple, ""));
    listTriple = [];
    listTriple.push(new Triple(Math.pow(2,Base.getBitBase(0))-1,
                               Number.MAX_VALUE,
                               Number.MAX_VALUE)); // max bound
    this.root.add(new LSEQNode(listTriple, ""));
};

/*!
 * \brief return the LSEQNode of the element at  targeted index
 * \param index the index of the element in the flattened array
 * \return the LSEQNode targeting the element at index
 */
LSEQTree.prototype.get = function(index){
    // #1 search in the tree to get the value
    return this.root.get(index);
};

/*!
 * \brief insert a value at the targeted index
 * \param element the element to insert
 * \param index the position in the array
 * \return a pair {_e: element , _i: identifier}
 */
LSEQTree.prototype.insert = function(element, index){
    var pei = this.get(index), // #1a previous bound
        qei = this.get(index+1), // #1b next bound
        id, couple;
    this._c += 1; // #2a incrementing the local counter
    id = this.alloc(pei, qei); // #2b generating the id inbetween the bounds
    // #3 add it to the structure and return value
    couple = {_e: element, _i: id}
    this.applyInsert(element, id, true);
    return couple;
};

/*!
 * \brief delete the element at the index
 * \param index the index of the element to delete in the array
 * \return the identifier of the element at the index
 */
LSEQTree.prototype.remove = function(index){
    var ei = this.get(index+1),
        i = new ID(null, [], []);
    i.fromNode(ei); // from node -> id
    this.applyRemove(ei); 
    return i;
};

/*!
 * \brief generate the digit part of the identifiers  between p and q
 * \param p the digit part of the previous identifier
 * \param q the digit part of the next identifier
 * \return the digit part located between p and q
 */
LSEQTree.prototype.alloc = function (p,q){
    var interval = 0, level = 0;
    // #1 process the level of the new identifier
    while (interval<=0){ // no room for insertion
        interval = Base.getInterval(p, q, level); // (TODO) optimize
        ++level;
    };
    level -= 1;
    if (this._hash(level) === 0){
        return S.bPlus(p, q, level, interval, this._s, this._c);
    } else {
        return S.bMinus(p, q, level, interval, this._s, this._c);
    };
};

/*!
 * \brief insert an element created from a remote site into the array
 * \param e the element to insert
 * \param i the identifier of the element
 * \param noIndex whether or not it should return the index of the insert
 * \return the index of the newly inserted element in the array
 */
LSEQTree.prototype.applyInsert = function(e, i, noIndex){
    var node, result;
    // #0 cast from the proper type
    // #0A the identifier is an ID
    if (i && i._d && i._s && i._c){
        node = (new ID(i._d, i._s, i._c).toNode(e));
    };
    // #0B the identifier is a LSEQNode
    if (i && i.t && i.children){
        node = (new LSEQNode([],null)).fromJSON(i);
    };
    // #2 integrates the new element to the data structure
    result = this.root.add(node);
    if (result !== -1){
        // #3 if the element as been added
        this.length += 1;
    };
    return result || (!noIndex && this.root.indexOf(node));
};

/*!
 * \brief delete the element with the targeted identifier
 * \param i the identifier of the element
 * \return the index of the element feshly deleted, -1 if no removal
 */
LSEQTree.prototype.applyRemove = function(i){
    var node, position;
    // #0 cast from the proper type
    if (i && i._d && i._s && i._c){
        node = (new ID(i._d, i._s, i._c)).toNode(null);
    };
    // #0B the identifier is a LSEQNode
    if (i && i.t && i.children){
        node = (new LSEQNode([],null)).fromJSON(i);
    };
    // #1 get the index of the element to remove
    position = this.root.indexOf(node);
    if (position !== -1){
        // #2 if it exists remove it
        this.root.del(node);
        this.length -= 1;
    };
    return position;
};


/*!
 * \brief cast the JSON object into a proper LSEQTree.
 * \param object the JSON object to cast
 * \return a self reference
 */
LSEQTree.prototype.fromJSON = function(object){
    // #1 copy the source, counter, and length of the object
    this._s = object._s;
    this._c = object._c;
    this.length = object.length;
    // #2 depth first adding
    var self = this;
    function depthFirst(currentNode, currentPath){
        var triple = new Triple(currentNode.t.p,
                                currentNode.t.s,
                                currentNode.t.c);
        currentPath.push(triple);
        if (currentNode.e!==null){
            self.root.add(new LSEQNode(currentPath, currentNode.e));
        };
        for (var i = 0; i<currentNode.children.length; ++i){
            depthFirst(currentNode.children[i], currentPath);
        };
    };
    for (var i = 0; i<object.root.children.length; ++i){
        depthFirst(object.root, []);
    };
    return this;
};

module.exports = LSEQTree;

},{"./base.js":12,"./identifier.js":13,"./lseqnode.js":14,"./strategy.js":16,"./triple.js":17,"BigInt":19}],16:[function(require,module,exports){
var BI = require('BigInt');
var Base = require('./base.js')();
var ID = require('./identifier.js');

/*!
 * \class Strategy
 * \brief Enumerate the available sub-allocation strategies. The signature of
 * these functions is f(Id, Id, N+, N+, N, N): Id.
 * \param boundary the value used as the default maximum spacing between ids
 */
function Strategy(boundary){
    var DEFAULT_BOUNDARY = 10;
    this._boundary = boundary || DEFAULT_BOUNDARY;
};

/*!
 * \brief Choose an id starting from previous bound and adding random number
 * \param p the previous identifier
 * \param q the next identifier
 * \param level the number of concatenation composing the new identifier
 * \param interval the interval between p and q
 * \param s the source that creates the new identifier
 * \param c the counter of that source
 */
Strategy.prototype.bPlus = function (p, q, level, interval, s, c){
    var copyP = p, copyQ = q,
        step = Math.min(this._boundary, interval), //#0 the min interval
        digit = BI.int2bigInt(0,Base.getSumBit(level)),
        value;
    
    // #1 copy the previous identifier
    for (var i = 0; i<=level;++i){
	      value = 0;
        if (p!==null){ value = p.t.p; };
        BI.addInt_(digit,value);
        if (i!==level){ BI.leftShift_(digit,Base.getBitBase(i+1)); };
        if (p!==null && p.children.length!==0){
            p = p.children[0];
        } else {
            p = null;
        };
    };
    // #2 create a digit for an identifier by adding a random value
    // #2a Digit
    BI.addInt_(digit, Math.floor(Math.random()*step+1));
    // #2b Source & counter
    return getSC(digit, copyP, copyQ, level, s, c);
};


/*!
 * \brief Choose an id starting from next bound and substract a random number
 * \param p the previous identifier
 * \param q the next identifier
 * \param level the number of concatenation composing the new identifier
 * \param interval the interval between p and q
 * \param s the source that creates the new identifier
 * \param c the counter of that source
 */
Strategy.prototype.bMinus = function (p, q, level, interval, s, c){
    var copyP = p, copyQ = q,
        step = Math.min(this._boundary, interval), // #0 process min interval
        digit = BI.int2bigInt(0,Base.getSumBit(level)),
        pIsGreater = false, commonRoot = true,
        prevValue, nextValue;
    
    // #1 copy next, if previous is greater, copy maxValue @ depth
    for (var i = 0; i<=level;++i){
        prevValue = 0; if (p !== null){ prevValue = p.t.p; }
        nextValue = 0; if (q !== null){ nextValue = q.t.p; }
        if (commonRoot && prevValue !== nextValue){
            commonRoot = false;
            pIsGreater = prevValue > nextValue;
        }
        if (pIsGreater){ nextValue = Math.pow(2,Base.getBitBase(i))-1; }
        BI.addInt_(digit, nextValue);
        if (i!==level){ BI.leftShift_(digit,Base.getBitBase(i+1)); }
        if (q!==null && q.children.length!==0){
            q = q.children[0];
        } else {
            q = null;
        };
        if (p!==null && p.children.length!==0){
            p = p.children[0];
        } else {
            p = null;
        };
    };
    // #3 create a digit for an identifier by subing a random value
    // #3a Digit
    if (pIsGreater){
        BI.addInt_(digit, -Math.floor(Math.random()*step) );
    } else {
        BI.addInt_(digit, -Math.floor(Math.random()*step)-1 );
    };
    
    // #3b Source & counter
    return getSC(digit, copyP, copyQ, level, s, c);
};

/*!
 * \brief copies the appropriates source and counter from the adjacent 
 * identifiers at the insertion position.
 * \param d the digit part of the new identifier
 * \param p the previous identifier
 * \param q the next identifier
 * \param level the size of the new identifier
 * \param s the local site identifier 
 * \param c the local monotonic counter
 */
function getSC(d, p, q, level, s, c){
    var sources = [], counters = [],
        i = 0,
        sumBit = Base.getSumBit(level),
        tempDigit, value;
    
    while (i<=level){
        tempDigit = BI.dup(d);
        BI.rightShift_(tempDigit, sumBit - Base.getSumBit(i));
        value = BI.modInt(tempDigit,Math.pow(2,Base.getBitBase(i)));
        sources[i]=s;
        counters[i]=c
        if (q!==null && q.t.p===value){ sources[i]=q.t.s; counters[i]=q.t.c};
        if (p!==null && p.t.p===value){ sources[i]=p.t.s; counters[i]=p.t.c};
        if (q!==null && q.children.length!==0){
            q = q.children[0];
        } else {
            q = null;
        };
        if (p!==null && p.children.length!==0){
            p = p.children[0];
        } else {
            p = null;
        };
        ++i;
    };
    
    return new ID(d, sources, counters);
};

Strategy.instance = null;

module.exports = function(args){
    if (args){
        Strategy.instance = new Strategy(args);
    } else {
        if (Strategy.instance === null){
            Strategy.instance = new Strategy();
        };
    };
    return Strategy.instance;
};

},{"./base.js":12,"./identifier.js":13,"BigInt":19}],17:[function(require,module,exports){

/*!
 * \brief triple that contains a <path site counter>
 * \param path the part of the path in the tree
 * \param site the unique site identifier that created the triple
 * \param counter the counter of the site when it created the triple
 */
function Triple(path, site, counter){
    this.p = path;
    this.s = site;
    this.c = counter;
};

/*!
 * \brief compare two triples prioritizing the path, then site, then counter
 * \param o the other triple to compare
 * \return -1 if this is lower than o, 1 if this is greater than o, 0 otherwise
 */
Triple.prototype.compare = function(o){
    if (this.s === Number.MAX_VALUE && this.c === Number.MAX_VALUE){
        return 1;
    };
    if (o.s === Number.MAX_VALUE && o.s === Number.MAX_VALUE){
        return -1;
    };
    
    if (this.p < o.p) { return -1;};
    if (this.p > o.p) { return 1 ;};
    if (this.s < o.s) { return -1;};
    if (this.s > o.s) { return 1 ;};
    if (this.c < o.c) { return -1;};
    if (this.c > o.c) { return 1 ;};
    return 0;
};

module.exports = Triple;

},{}],18:[function(require,module,exports){

function binaryIndexOf(){

/**
 * \from: [https://gist.github.com/Wolfy87/5734530]
 * Performs a binary search on the host array. This method can either be
 * injected into Array.prototype or called with a specified scope like this:
 * binaryIndexOf.call(someArray, searchElement);
 *
 *
 * @param {*} searchElement The item to search for within the array.
 * @return {Number} The index of the element which defaults to -1 when not
 * found.
 */
Array.prototype.binaryIndexOf = function(searchElement) {
    var minIndex = 0;
    var maxIndex = this.length - 1;
    var currentIndex;
    var currentElement;

    while (minIndex <= maxIndex) {
        currentIndex = Math.floor((minIndex + maxIndex) / 2);
        currentElement = this[currentIndex];
        if (currentElement.compare(searchElement) < 0) {
            minIndex = currentIndex + 1;
        }
        else if (currentElement.compare(searchElement) > 0) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    };
    return ~maxIndex;
};

}

module.exports = binaryIndexOf();
},{}],19:[function(require,module,exports){
// Vjeux: Customized bigInt2str and str2bigInt in order to accept custom base.

////////////////////////////////////////////////////////////////////////////////////////
// Big Integer Library v. 5.4
// Created 2000, last modified 2009
// Leemon Baird
// www.leemon.com
//
// Version history:
// v 5.4  3 Oct 2009
//   - added "var i" to greaterShift() so i is not global. (Thanks to P�ter Szab� for finding that bug)
//
// v 5.3  21 Sep 2009
//   - added randProbPrime(k) for probable primes
//   - unrolled loop in mont_ (slightly faster)
//   - millerRabin now takes a bigInt parameter rather than an int
//
// v 5.2  15 Sep 2009
//   - fixed capitalization in call to int2bigInt in randBigInt
//     (thanks to Emili Evripidou, Reinhold Behringer, and Samuel Macaleese for finding that bug)
//
// v 5.1  8 Oct 2007
//   - renamed inverseModInt_ to inverseModInt since it doesn't change its parameters
//   - added functions GCD and randBigInt, which call GCD_ and randBigInt_
//   - fixed a bug found by Rob Visser (see comment with his name below)
//   - improved comments
//
// This file is public domain.   You can use it for any purpose without restriction.
// I do not guarantee that it is correct, so use it at your own risk.  If you use
// it for something interesting, I'd appreciate hearing about it.  If you find
// any bugs or make any improvements, I'd appreciate hearing about those too.
// It would also be nice if my name and URL were left in the comments.  But none
// of that is required.
//
// This code defines a bigInt library for arbitrary-precision integers.
// A bigInt is an array of integers storing the value in chunks of bpe bits,
// little endian (buff[0] is the least significant word).
// Negative bigInts are stored two's complement.  Almost all the functions treat
// bigInts as nonnegative.  The few that view them as two's complement say so
// in their comments.  Some functions assume their parameters have at least one
// leading zero element. Functions with an underscore at the end of the name put
// their answer into one of the arrays passed in, and have unpredictable behavior
// in case of overflow, so the caller must make sure the arrays are big enough to
// hold the answer.  But the average user should never have to call any of the
// underscored functions.  Each important underscored function has a wrapper function
// of the same name without the underscore that takes care of the details for you.
// For each underscored function where a parameter is modified, that same variable
// must not be used as another argument too.  So, you cannot square x by doing
// multMod_(x,x,n).  You must use squareMod_(x,n) instead, or do y=dup(x); multMod_(x,y,n).
// Or simply use the multMod(x,x,n) function without the underscore, where
// such issues never arise, because non-underscored functions never change
// their parameters; they always allocate new memory for the answer that is returned.
//
// These functions are designed to avoid frequent dynamic memory allocation in the inner loop.
// For most functions, if it needs a BigInt as a local variable it will actually use
// a global, and will only allocate to it only when it's not the right size.  This ensures
// that when a function is called repeatedly with same-sized parameters, it only allocates
// memory on the first call.
//
// Note that for cryptographic purposes, the calls to Math.random() must
// be replaced with calls to a better pseudorandom number generator.
//
// In the following, "bigInt" means a bigInt with at least one leading zero element,
// and "integer" means a nonnegative integer less than radix.  In some cases, integer
// can be negative.  Negative bigInts are 2s complement.
//
// The following functions do not modify their inputs.
// Those returning a bigInt, string, or Array will dynamically allocate memory for that value.
// Those returning a boolean will return the integer 0 (false) or 1 (true).
// Those returning boolean or int will not allocate memory except possibly on the first
// time they're called with a given parameter size.
//
// bigInt  add(x,y)               //return (x+y) for bigInts x and y.
// bigInt  addInt(x,n)            //return (x+n) where x is a bigInt and n is an integer.
// string  bigInt2str(x,base)     //return a string form of bigInt x in a given base, with 2 <= base <= 95
// int     bitSize(x)             //return how many bits long the bigInt x is, not counting leading zeros
// bigInt  dup(x)                 //return a copy of bigInt x
// boolean equals(x,y)            //is the bigInt x equal to the bigint y?
// boolean equalsInt(x,y)         //is bigint x equal to integer y?
// bigInt  expand(x,n)            //return a copy of x with at least n elements, adding leading zeros if needed
// Array   findPrimes(n)          //return array of all primes less than integer n
// bigInt  GCD(x,y)               //return greatest common divisor of bigInts x and y (each with same number of elements).
// boolean greater(x,y)           //is x>y?  (x and y are nonnegative bigInts)
// boolean greaterShift(x,y,shift)//is (x <<(shift*bpe)) > y?
// bigInt  int2bigInt(t,n,m)      //return a bigInt equal to integer t, with at least n bits and m array elements
// bigInt  inverseMod(x,n)        //return (x**(-1) mod n) for bigInts x and n.  If no inverse exists, it returns null
// int     inverseModInt(x,n)     //return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
// boolean isZero(x)              //is the bigInt x equal to zero?
// boolean millerRabin(x,b)       //does one round of Miller-Rabin base integer b say that bigInt x is possibly prime? (b is bigInt, 1<b<x)
// boolean millerRabinInt(x,b)    //does one round of Miller-Rabin base integer b say that bigInt x is possibly prime? (b is int,    1<b<x)
// bigInt  mod(x,n)               //return a new bigInt equal to (x mod n) for bigInts x and n.
// int     modInt(x,n)            //return x mod n for bigInt x and integer n.
// bigInt  mult(x,y)              //return x*y for bigInts x and y. This is faster when y<x.
// bigInt  multMod(x,y,n)         //return (x*y mod n) for bigInts x,y,n.  For greater speed, let y<x.
// boolean negative(x)            //is bigInt x negative?
// bigInt  powMod(x,y,n)          //return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
// bigInt  randBigInt(n,s)        //return an n-bit random BigInt (n>=1).  If s=1, then the most significant of those n bits is set to 1.
// bigInt  randTruePrime(k)       //return a new, random, k-bit, true prime bigInt using Maurer's algorithm.
// bigInt  randProbPrime(k)       //return a new, random, k-bit, probable prime bigInt (probability it's composite less than 2^-80).
// bigInt  str2bigInt(s,b,n,m)    //return a bigInt for number represented in string s in base b with at least n bits and m array elements
// bigInt  sub(x,y)               //return (x-y) for bigInts x and y.  Negative answers will be 2s complement
// bigInt  trim(x,k)              //return a copy of x with exactly k leading zero elements
//
//
// The following functions each have a non-underscored version, which most users should call instead.
// These functions each write to a single parameter, and the caller is responsible for ensuring the array
// passed in is large enough to hold the result.
//
// void    addInt_(x,n)          //do x=x+n where x is a bigInt and n is an integer
// void    add_(x,y)             //do x=x+y for bigInts x and y
// void    copy_(x,y)            //do x=y on bigInts x and y
// void    copyInt_(x,n)         //do x=n on bigInt x and integer n
// void    GCD_(x,y)             //set x to the greatest common divisor of bigInts x and y, (y is destroyed).  (This never overflows its array).
// boolean inverseMod_(x,n)      //do x=x**(-1) mod n, for bigInts x and n. Returns 1 (0) if inverse does (doesn't) exist
// void    mod_(x,n)             //do x=x mod n for bigInts x and n. (This never overflows its array).
// void    mult_(x,y)            //do x=x*y for bigInts x and y.
// void    multMod_(x,y,n)       //do x=x*y  mod n for bigInts x,y,n.
// void    powMod_(x,y,n)        //do x=x**y mod n, where x,y,n are bigInts (n is odd) and ** is exponentiation.  0**0=1.
// void    randBigInt_(b,n,s)    //do b = an n-bit random BigInt. if s=1, then nth bit (most significant bit) is set to 1. n>=1.
// void    randTruePrime_(ans,k) //do ans = a random k-bit true random prime (not just probable prime) with 1 in the msb.
// void    sub_(x,y)             //do x=x-y for bigInts x and y. Negative answers will be 2s complement.
//
// The following functions do NOT have a non-underscored version.
// They each write a bigInt result to one or more parameters.  The caller is responsible for
// ensuring the arrays passed in are large enough to hold the results.
//
// void addShift_(x,y,ys)       //do x=x+(y<<(ys*bpe))
// void carry_(x)               //do carries and borrows so each element of the bigInt x fits in bpe bits.
// void divide_(x,y,q,r)        //divide x by y giving quotient q and remainder r
// int  divInt_(x,n)            //do x=floor(x/n) for bigInt x and integer n, and return the remainder. (This never overflows its array).
// int  eGCD_(x,y,d,a,b)        //sets a,b,d to positive bigInts such that d = GCD_(x,y) = a*x-b*y
// void halve_(x)               //do x=floor(|x|/2)*sgn(x) for bigInt x in 2's complement.  (This never overflows its array).
// void leftShift_(x,n)         //left shift bigInt x by n bits.  n<bpe.
// void linComb_(x,y,a,b)       //do x=a*x+b*y for bigInts x and y and integers a and b
// void linCombShift_(x,y,b,ys) //do x=x+b*(y<<(ys*bpe)) for bigInts x and y, and integers b and ys
// void mont_(x,y,n,np)         //Montgomery multiplication (see comments where the function is defined)
// void multInt_(x,n)           //do x=x*n where x is a bigInt and n is an integer.
// void rightShift_(x,n)        //right shift bigInt x by n bits.  0 <= n < bpe. (This never overflows its array).
// void squareMod_(x,n)         //do x=x*x  mod n for bigInts x,n
// void subShift_(x,y,ys)       //do x=x-(y<<(ys*bpe)). Negative answers will be 2s complement.
//
// The following functions are based on algorithms from the _Handbook of Applied Cryptography_
//    powMod_()           = algorithm 14.94, Montgomery exponentiation
//    eGCD_,inverseMod_() = algorithm 14.61, Binary extended GCD_
//    GCD_()              = algorothm 14.57, Lehmer's algorithm
//    mont_()             = algorithm 14.36, Montgomery multiplication
//    divide_()           = algorithm 14.20  Multiple-precision division
//    squareMod_()        = algorithm 14.16  Multiple-precision squaring
//    randTruePrime_()    = algorithm  4.62, Maurer's algorithm
//    millerRabin()       = algorithm  4.24, Miller-Rabin algorithm
//
// Profiling shows:
//     randTruePrime_() spends:
//         10% of its time in calls to powMod_()
//         85% of its time in calls to millerRabin()
//     millerRabin() spends:
//         99% of its time in calls to powMod_()   (always with a base of 2)
//     powMod_() spends:
//         94% of its time in calls to mont_()  (almost always with x==y)
//
// This suggests there are several ways to speed up this library slightly:
//     - convert powMod_ to use a Montgomery form of k-ary window (or maybe a Montgomery form of sliding window)
//         -- this should especially focus on being fast when raising 2 to a power mod n
//     - convert randTruePrime_() to use a minimum r of 1/3 instead of 1/2 with the appropriate change to the test
//     - tune the parameters in randTruePrime_(), including c, m, and recLimit
//     - speed up the single loop in mont_() that takes 95% of the runtime, perhaps by reducing checking
//       within the loop when all the parameters are the same length.
//
// There are several ideas that look like they wouldn't help much at all:
//     - replacing trial division in randTruePrime_() with a sieve (that speeds up something taking almost no time anyway)
//     - increase bpe from 15 to 30 (that would help if we had a 32*32->64 multiplier, but not with JavaScript's 32*32->32)
//     - speeding up mont_(x,y,n,np) when x==y by doing a non-modular, non-Montgomery square
//       followed by a Montgomery reduction.  The intermediate answer will be twice as long as x, so that
//       method would be slower.  This is unfortunate because the code currently spends almost all of its time
//       doing mont_(x,x,...), both for randTruePrime_() and powMod_().  A faster method for Montgomery squaring
//       would have a large impact on the speed of randTruePrime_() and powMod_().  HAC has a couple of poorly-worded
//       sentences that seem to imply it's faster to do a non-modular square followed by a single
//       Montgomery reduction, but that's obviously wrong.
////////////////////////////////////////////////////////////////////////////////////////

(function () {
//globals
bpe=0;         //bits stored per array element
mask=0;        //AND this with an array element to chop it down to bpe bits
radix=mask+1;  //equals 2^bpe.  A single 1 bit to the left of the last bit of mask.

//the digits for converting to different bases
digitsStr='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\\'\"+-';

//initialize the global variables
for (bpe=0; (1<<(bpe+1)) > (1<<bpe); bpe++);  //bpe=number of bits in the mantissa on this platform
bpe>>=1;                   //bpe=number of bits in one element of the array representing the bigInt
mask=(1<<bpe)-1;           //AND the mask with an integer to get its bpe least significant bits
radix=mask+1;              //2^bpe.  a single 1 bit to the left of the first bit of mask
one=int2bigInt(1,1,1);     //constant used in powMod_()

//the following global variables are scratchpad memory to
//reduce dynamic memory allocation in the inner loop
t=new Array(0);
ss=t;       //used in mult_()
s0=t;       //used in multMod_(), squareMod_()
s1=t;       //used in powMod_(), multMod_(), squareMod_()
s2=t;       //used in powMod_(), multMod_()
s3=t;       //used in powMod_()
s4=t; s5=t; //used in mod_()
s6=t;       //used in bigInt2str()
s7=t;       //used in powMod_()
T=t;        //used in GCD_()
sa=t;       //used in mont_()
mr_x1=t; mr_r=t; mr_a=t;                                      //used in millerRabin()
eg_v=t; eg_u=t; eg_A=t; eg_B=t; eg_C=t; eg_D=t;               //used in eGCD_(), inverseMod_()
md_q1=t; md_q2=t; md_q3=t; md_r=t; md_r1=t; md_r2=t; md_tt=t; //used in mod_()

primes=t; pows=t; s_i=t; s_i2=t; s_R=t; s_rm=t; s_q=t; s_n1=t;
  s_a=t; s_r2=t; s_n=t; s_b=t; s_d=t; s_x1=t; s_x2=t, s_aa=t; //used in randTruePrime_()

rpprb=t; //used in randProbPrimeRounds() (which also uses "primes")

////////////////////////////////////////////////////////////////////////////////////////


//return array of all primes less than integer n
function findPrimes(n) {
  var i,s,p,ans;
  s=new Array(n);
  for (i=0;i<n;i++)
    s[i]=0;
  s[0]=2;
  p=0;    //first p elements of s are primes, the rest are a sieve
  for(;s[p]<n;) {                  //s[p] is the pth prime
    for(i=s[p]*s[p]; i<n; i+=s[p]) //mark multiples of s[p]
      s[i]=1;
    p++;
    s[p]=s[p-1]+1;
    for(; s[p]<n && s[s[p]]; s[p]++); //find next prime (where s[p]==0)
  }
  ans=new Array(p);
  for(i=0;i<p;i++)
    ans[i]=s[i];
  return ans;
}


//does a single round of Miller-Rabin base b consider x to be a possible prime?
//x is a bigInt, and b is an integer, with b<x
function millerRabinInt(x,b) {
  if (mr_x1.length!=x.length) {
    mr_x1=dup(x);
    mr_r=dup(x);
    mr_a=dup(x);
  }

  copyInt_(mr_a,b);
  return millerRabin(x,mr_a);
}

//does a single round of Miller-Rabin base b consider x to be a possible prime?
//x and b are bigInts with b<x
function millerRabin(x,b) {
  var i,j,k,s;

  if (mr_x1.length!=x.length) {
    mr_x1=dup(x);
    mr_r=dup(x);
    mr_a=dup(x);
  }

  copy_(mr_a,b);
  copy_(mr_r,x);
  copy_(mr_x1,x);

  addInt_(mr_r,-1);
  addInt_(mr_x1,-1);

  //s=the highest power of two that divides mr_r
  k=0;
  for (i=0;i<mr_r.length;i++)
    for (j=1;j<mask;j<<=1)
      if (x[i] & j) {
        s=(k<mr_r.length+bpe ? k : 0);
         i=mr_r.length;
         j=mask;
      } else
        k++;

  if (s)
    rightShift_(mr_r,s);

  powMod_(mr_a,mr_r,x);

  if (!equalsInt(mr_a,1) && !equals(mr_a,mr_x1)) {
    j=1;
    while (j<=s-1 && !equals(mr_a,mr_x1)) {
      squareMod_(mr_a,x);
      if (equalsInt(mr_a,1)) {
        return 0;
      }
      j++;
    }
    if (!equals(mr_a,mr_x1)) {
      return 0;
    }
  }
  return 1;
}

//returns how many bits long the bigInt is, not counting leading zeros.
function bitSize(x) {
  var j,z,w;
  for (j=x.length-1; (x[j]==0) && (j>0); j--);
  for (z=0,w=x[j]; w; (w>>=1),z++);
  z+=bpe*j;
  return z;
}

//return a copy of x with at least n elements, adding leading zeros if needed
function expand(x,n) {
  var ans=int2bigInt(0,(x.length>n ? x.length : n)*bpe,0);
  copy_(ans,x);
  return ans;
}

//return a k-bit true random prime using Maurer's algorithm.
function randTruePrime(k) {
  var ans=int2bigInt(0,k,0);
  randTruePrime_(ans,k);
  return trim(ans,1);
}

//return a k-bit random probable prime with probability of error < 2^-80
function randProbPrime(k) {
  if (k>=600) return randProbPrimeRounds(k,2); //numbers from HAC table 4.3
  if (k>=550) return randProbPrimeRounds(k,4);
  if (k>=500) return randProbPrimeRounds(k,5);
  if (k>=400) return randProbPrimeRounds(k,6);
  if (k>=350) return randProbPrimeRounds(k,7);
  if (k>=300) return randProbPrimeRounds(k,9);
  if (k>=250) return randProbPrimeRounds(k,12); //numbers from HAC table 4.4
  if (k>=200) return randProbPrimeRounds(k,15);
  if (k>=150) return randProbPrimeRounds(k,18);
  if (k>=100) return randProbPrimeRounds(k,27);
              return randProbPrimeRounds(k,40); //number from HAC remark 4.26 (only an estimate)
}

//return a k-bit probable random prime using n rounds of Miller Rabin (after trial division with small primes)
function randProbPrimeRounds(k,n) {
  var ans, i, divisible, B;
  B=30000;  //B is largest prime to use in trial division
  ans=int2bigInt(0,k,0);

  //optimization: try larger and smaller B to find the best limit.

  if (primes.length==0)
    primes=findPrimes(30000);  //check for divisibility by primes <=30000

  if (rpprb.length!=ans.length)
    rpprb=dup(ans);

  for (;;) { //keep trying random values for ans until one appears to be prime
    //optimization: pick a random number times L=2*3*5*...*p, plus a
    //   random element of the list of all numbers in [0,L) not divisible by any prime up to p.
    //   This can reduce the amount of random number generation.

    randBigInt_(ans,k,0); //ans = a random odd number to check
    ans[0] |= 1;
    divisible=0;

    //check ans for divisibility by small primes up to B
    for (i=0; (i<primes.length) && (primes[i]<=B); i++)
      if (modInt(ans,primes[i])==0 && !equalsInt(ans,primes[i])) {
        divisible=1;
        break;
      }

    //optimization: change millerRabin so the base can be bigger than the number being checked, then eliminate the while here.

    //do n rounds of Miller Rabin, with random bases less than ans
    for (i=0; i<n && !divisible; i++) {
      randBigInt_(rpprb,k,0);
      while(!greater(ans,rpprb)) //pick a random rpprb that's < ans
        randBigInt_(rpprb,k,0);
      if (!millerRabin(ans,rpprb))
        divisible=1;
    }

    if(!divisible)
      return ans;
  }
}

//return a new bigInt equal to (x mod n) for bigInts x and n.
function mod(x,n) {
  var ans=dup(x);
  mod_(ans,n);
  return trim(ans,1);
}

//return (x+n) where x is a bigInt and n is an integer.
function addInt(x,n) {
  var ans=expand(x,x.length+1);
  addInt_(ans,n);
  return trim(ans,1);
}

//return x*y for bigInts x and y. This is faster when y<x.
function mult(x,y) {
  var ans=expand(x,x.length+y.length);
  mult_(ans,y);
  return trim(ans,1);
}

//return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
function powMod(x,y,n) {
  var ans=expand(x,n.length);
  powMod_(ans,trim(y,2),trim(n,2),0);  //this should work without the trim, but doesn't
  return trim(ans,1);
}

//return (x-y) for bigInts x and y.  Negative answers will be 2s complement
function sub(x,y) {
  var ans=expand(x,(x.length>y.length ? x.length+1 : y.length+1));
  sub_(ans,y);
  return trim(ans,1);
}

//return (x+y) for bigInts x and y.
function add(x,y) {
  var ans=expand(x,(x.length>y.length ? x.length+1 : y.length+1));
  add_(ans,y);
  return trim(ans,1);
}

//return (x**(-1) mod n) for bigInts x and n.  If no inverse exists, it returns null
function inverseMod(x,n) {
  var ans=expand(x,n.length);
  var s;
  s=inverseMod_(ans,n);
  return s ? trim(ans,1) : null;
}

//return (x*y mod n) for bigInts x,y,n.  For greater speed, let y<x.
function multMod(x,y,n) {
  var ans=expand(x,n.length);
  multMod_(ans,y,n);
  return trim(ans,1);
}

//generate a k-bit true random prime using Maurer's algorithm,
//and put it into ans.  The bigInt ans must be large enough to hold it.
function randTruePrime_(ans,k) {
  var c,m,pm,dd,j,r,B,divisible,z,zz,recSize;

  if (primes.length==0)
    primes=findPrimes(30000);  //check for divisibility by primes <=30000

  if (pows.length==0) {
    pows=new Array(512);
    for (j=0;j<512;j++) {
      pows[j]=Math.pow(2,j/511.-1.);
    }
  }

  //c and m should be tuned for a particular machine and value of k, to maximize speed
  c=0.1;  //c=0.1 in HAC
  m=20;   //generate this k-bit number by first recursively generating a number that has between k/2 and k-m bits
  recLimit=20; //stop recursion when k <=recLimit.  Must have recLimit >= 2

  if (s_i2.length!=ans.length) {
    s_i2=dup(ans);
    s_R =dup(ans);
    s_n1=dup(ans);
    s_r2=dup(ans);
    s_d =dup(ans);
    s_x1=dup(ans);
    s_x2=dup(ans);
    s_b =dup(ans);
    s_n =dup(ans);
    s_i =dup(ans);
    s_rm=dup(ans);
    s_q =dup(ans);
    s_a =dup(ans);
    s_aa=dup(ans);
  }

  if (k <= recLimit) {  //generate small random primes by trial division up to its square root
    pm=(1<<((k+2)>>1))-1; //pm is binary number with all ones, just over sqrt(2^k)
    copyInt_(ans,0);
    for (dd=1;dd;) {
      dd=0;
      ans[0]= 1 | (1<<(k-1)) | Math.floor(Math.random()*(1<<k));  //random, k-bit, odd integer, with msb 1
      for (j=1;(j<primes.length) && ((primes[j]&pm)==primes[j]);j++) { //trial division by all primes 3...sqrt(2^k)
        if (0==(ans[0]%primes[j])) {
          dd=1;
          break;
        }
      }
    }
    carry_(ans);
    return;
  }

  B=c*k*k;    //try small primes up to B (or all the primes[] array if the largest is less than B).
  if (k>2*m)  //generate this k-bit number by first recursively generating a number that has between k/2 and k-m bits
    for (r=1; k-k*r<=m; )
      r=pows[Math.floor(Math.random()*512)];   //r=Math.pow(2,Math.random()-1);
  else
    r=.5;

  //simulation suggests the more complex algorithm using r=.333 is only slightly faster.

  recSize=Math.floor(r*k)+1;

  randTruePrime_(s_q,recSize);
  copyInt_(s_i2,0);
  s_i2[Math.floor((k-2)/bpe)] |= (1<<((k-2)%bpe));   //s_i2=2^(k-2)
  divide_(s_i2,s_q,s_i,s_rm);                        //s_i=floor((2^(k-1))/(2q))

  z=bitSize(s_i);

  for (;;) {
    for (;;) {  //generate z-bit numbers until one falls in the range [0,s_i-1]
      randBigInt_(s_R,z,0);
      if (greater(s_i,s_R))
        break;
    }                //now s_R is in the range [0,s_i-1]
    addInt_(s_R,1);  //now s_R is in the range [1,s_i]
    add_(s_R,s_i);   //now s_R is in the range [s_i+1,2*s_i]

    copy_(s_n,s_q);
    mult_(s_n,s_R);
    multInt_(s_n,2);
    addInt_(s_n,1);    //s_n=2*s_R*s_q+1

    copy_(s_r2,s_R);
    multInt_(s_r2,2);  //s_r2=2*s_R

    //check s_n for divisibility by small primes up to B
    for (divisible=0,j=0; (j<primes.length) && (primes[j]<B); j++)
      if (modInt(s_n,primes[j])==0 && !equalsInt(s_n,primes[j])) {
        divisible=1;
        break;
      }

    if (!divisible)    //if it passes small primes check, then try a single Miller-Rabin base 2
      if (!millerRabinInt(s_n,2)) //this line represents 75% of the total runtime for randTruePrime_
        divisible=1;

    if (!divisible) {  //if it passes that test, continue checking s_n
      addInt_(s_n,-3);
      for (j=s_n.length-1;(s_n[j]==0) && (j>0); j--);  //strip leading zeros
      for (zz=0,w=s_n[j]; w; (w>>=1),zz++);
      zz+=bpe*j;                             //zz=number of bits in s_n, ignoring leading zeros
      for (;;) {  //generate z-bit numbers until one falls in the range [0,s_n-1]
        randBigInt_(s_a,zz,0);
        if (greater(s_n,s_a))
          break;
      }                //now s_a is in the range [0,s_n-1]
      addInt_(s_n,3);  //now s_a is in the range [0,s_n-4]
      addInt_(s_a,2);  //now s_a is in the range [2,s_n-2]
      copy_(s_b,s_a);
      copy_(s_n1,s_n);
      addInt_(s_n1,-1);
      powMod_(s_b,s_n1,s_n);   //s_b=s_a^(s_n-1) modulo s_n
      addInt_(s_b,-1);
      if (isZero(s_b)) {
        copy_(s_b,s_a);
        powMod_(s_b,s_r2,s_n);
        addInt_(s_b,-1);
        copy_(s_aa,s_n);
        copy_(s_d,s_b);
        GCD_(s_d,s_n);  //if s_b and s_n are relatively prime, then s_n is a prime
        if (equalsInt(s_d,1)) {
          copy_(ans,s_aa);
          return;     //if we've made it this far, then s_n is absolutely guaranteed to be prime
        }
      }
    }
  }
}

//Return an n-bit random BigInt (n>=1).  If s=1, then the most significant of those n bits is set to 1.
function randBigInt(n,s) {
  var a,b;
  a=Math.floor((n-1)/bpe)+2; //# array elements to hold the BigInt with a leading 0 element
  b=int2bigInt(0,0,a);
  randBigInt_(b,n,s);
  return b;
}

//Set b to an n-bit random BigInt.  If s=1, then the most significant of those n bits is set to 1.
//Array b must be big enough to hold the result. Must have n>=1
function randBigInt_(b,n,s) {
  var i,a;
  for (i=0;i<b.length;i++)
    b[i]=0;
  a=Math.floor((n-1)/bpe)+1; //# array elements to hold the BigInt
  for (i=0;i<a;i++) {
    b[i]=Math.floor(Math.random()*(1<<(bpe-1)));
  }
  b[a-1] &= (2<<((n-1)%bpe))-1;
  if (s==1)
    b[a-1] |= (1<<((n-1)%bpe));
}

//Return the greatest common divisor of bigInts x and y (each with same number of elements).
function GCD(x,y) {
  var xc,yc;
  xc=dup(x);
  yc=dup(y);
  GCD_(xc,yc);
  return xc;
}

//set x to the greatest common divisor of bigInts x and y (each with same number of elements).
//y is destroyed.
function GCD_(x,y) {
  var i,xp,yp,A,B,C,D,q,sing;
  if (T.length!=x.length)
    T=dup(x);

  sing=1;
  while (sing) { //while y has nonzero elements other than y[0]
    sing=0;
    for (i=1;i<y.length;i++) //check if y has nonzero elements other than 0
      if (y[i]) {
        sing=1;
        break;
      }
    if (!sing) break; //quit when y all zero elements except possibly y[0]

    for (i=x.length;!x[i] && i>=0;i--);  //find most significant element of x
    xp=x[i];
    yp=y[i];
    A=1; B=0; C=0; D=1;
    while ((yp+C) && (yp+D)) {
      q =Math.floor((xp+A)/(yp+C));
      qp=Math.floor((xp+B)/(yp+D));
      if (q!=qp)
        break;
      t= A-q*C;   A=C;   C=t;    //  do (A,B,xp, C,D,yp) = (C,D,yp, A,B,xp) - q*(0,0,0, C,D,yp)
      t= B-q*D;   B=D;   D=t;
      t=xp-q*yp; xp=yp; yp=t;
    }
    if (B) {
      copy_(T,x);
      linComb_(x,y,A,B); //x=A*x+B*y
      linComb_(y,T,D,C); //y=D*y+C*T
    } else {
      mod_(x,y);
      copy_(T,x);
      copy_(x,y);
      copy_(y,T);
    }
  }
  if (y[0]==0)
    return;
  t=modInt(x,y[0]);
  copyInt_(x,y[0]);
  y[0]=t;
  while (y[0]) {
    x[0]%=y[0];
    t=x[0]; x[0]=y[0]; y[0]=t;
  }
}

//do x=x**(-1) mod n, for bigInts x and n.
//If no inverse exists, it sets x to zero and returns 0, else it returns 1.
//The x array must be at least as large as the n array.
function inverseMod_(x,n) {
  var k=1+2*Math.max(x.length,n.length);

  if(!(x[0]&1)  && !(n[0]&1)) {  //if both inputs are even, then inverse doesn't exist
    copyInt_(x,0);
    return 0;
  }

  if (eg_u.length!=k) {
    eg_u=new Array(k);
    eg_v=new Array(k);
    eg_A=new Array(k);
    eg_B=new Array(k);
    eg_C=new Array(k);
    eg_D=new Array(k);
  }

  copy_(eg_u,x);
  copy_(eg_v,n);
  copyInt_(eg_A,1);
  copyInt_(eg_B,0);
  copyInt_(eg_C,0);
  copyInt_(eg_D,1);
  for (;;) {
    while(!(eg_u[0]&1)) {  //while eg_u is even
      halve_(eg_u);
      if (!(eg_A[0]&1) && !(eg_B[0]&1)) { //if eg_A==eg_B==0 mod 2
        halve_(eg_A);
        halve_(eg_B);
      } else {
        add_(eg_A,n);  halve_(eg_A);
        sub_(eg_B,x);  halve_(eg_B);
      }
    }

    while (!(eg_v[0]&1)) {  //while eg_v is even
      halve_(eg_v);
      if (!(eg_C[0]&1) && !(eg_D[0]&1)) { //if eg_C==eg_D==0 mod 2
        halve_(eg_C);
        halve_(eg_D);
      } else {
        add_(eg_C,n);  halve_(eg_C);
        sub_(eg_D,x);  halve_(eg_D);
      }
    }

    if (!greater(eg_v,eg_u)) { //eg_v <= eg_u
      sub_(eg_u,eg_v);
      sub_(eg_A,eg_C);
      sub_(eg_B,eg_D);
    } else {                   //eg_v > eg_u
      sub_(eg_v,eg_u);
      sub_(eg_C,eg_A);
      sub_(eg_D,eg_B);
    }

    if (equalsInt(eg_u,0)) {
      if (negative(eg_C)) //make sure answer is nonnegative
        add_(eg_C,n);
      copy_(x,eg_C);

      if (!equalsInt(eg_v,1)) { //if GCD_(x,n)!=1, then there is no inverse
        copyInt_(x,0);
        return 0;
      }
      return 1;
    }
  }
}

//return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
function inverseModInt(x,n) {
  var a=1,b=0,t;
  for (;;) {
    if (x==1) return a;
    if (x==0) return 0;
    b-=a*Math.floor(n/x);
    n%=x;

    if (n==1) return b; //to avoid negatives, change this b to n-b, and each -= to +=
    if (n==0) return 0;
    a-=b*Math.floor(x/n);
    x%=n;
  }
}

//this deprecated function is for backward compatibility only.
function inverseModInt_(x,n) {
   return inverseModInt(x,n);
}


//Given positive bigInts x and y, change the bigints v, a, and b to positive bigInts such that:
//     v = GCD_(x,y) = a*x-b*y
//The bigInts v, a, b, must have exactly as many elements as the larger of x and y.
function eGCD_(x,y,v,a,b) {
  var g=0;
  var k=Math.max(x.length,y.length);
  if (eg_u.length!=k) {
    eg_u=new Array(k);
    eg_A=new Array(k);
    eg_B=new Array(k);
    eg_C=new Array(k);
    eg_D=new Array(k);
  }
  while(!(x[0]&1)  && !(y[0]&1)) {  //while x and y both even
    halve_(x);
    halve_(y);
    g++;
  }
  copy_(eg_u,x);
  copy_(v,y);
  copyInt_(eg_A,1);
  copyInt_(eg_B,0);
  copyInt_(eg_C,0);
  copyInt_(eg_D,1);
  for (;;) {
    while(!(eg_u[0]&1)) {  //while u is even
      halve_(eg_u);
      if (!(eg_A[0]&1) && !(eg_B[0]&1)) { //if A==B==0 mod 2
        halve_(eg_A);
        halve_(eg_B);
      } else {
        add_(eg_A,y);  halve_(eg_A);
        sub_(eg_B,x);  halve_(eg_B);
      }
    }

    while (!(v[0]&1)) {  //while v is even
      halve_(v);
      if (!(eg_C[0]&1) && !(eg_D[0]&1)) { //if C==D==0 mod 2
        halve_(eg_C);
        halve_(eg_D);
      } else {
        add_(eg_C,y);  halve_(eg_C);
        sub_(eg_D,x);  halve_(eg_D);
      }
    }

    if (!greater(v,eg_u)) { //v<=u
      sub_(eg_u,v);
      sub_(eg_A,eg_C);
      sub_(eg_B,eg_D);
    } else {                //v>u
      sub_(v,eg_u);
      sub_(eg_C,eg_A);
      sub_(eg_D,eg_B);
    }
    if (equalsInt(eg_u,0)) {
      if (negative(eg_C)) {   //make sure a (C)is nonnegative
        add_(eg_C,y);
        sub_(eg_D,x);
      }
      multInt_(eg_D,-1);  ///make sure b (D) is nonnegative
      copy_(a,eg_C);
      copy_(b,eg_D);
      leftShift_(v,g);
      return;
    }
  }
}


//is bigInt x negative?
function negative(x) {
  return ((x[x.length-1]>>(bpe-1))&1);
}


//is (x << (shift*bpe)) > y?
//x and y are nonnegative bigInts
//shift is a nonnegative integer
function greaterShift(x,y,shift) {
  var i, kx=x.length, ky=y.length;
  k=((kx+shift)<ky) ? (kx+shift) : ky;
  for (i=ky-1-shift; i<kx && i>=0; i++)
    if (x[i]>0)
      return 1; //if there are nonzeros in x to the left of the first column of y, then x is bigger
  for (i=kx-1+shift; i<ky; i++)
    if (y[i]>0)
      return 0; //if there are nonzeros in y to the left of the first column of x, then x is not bigger
  for (i=k-1; i>=shift; i--)
    if      (x[i-shift]>y[i]) return 1;
    else if (x[i-shift]<y[i]) return 0;
  return 0;
}

//is x > y? (x and y both nonnegative)
function greater(x,y) {
  var i;
  var k=(x.length<y.length) ? x.length : y.length;

  for (i=x.length;i<y.length;i++)
    if (y[i])
      return 0;  //y has more digits

  for (i=y.length;i<x.length;i++)
    if (x[i])
      return 1;  //x has more digits

  for (i=k-1;i>=0;i--)
    if (x[i]>y[i])
      return 1;
    else if (x[i]<y[i])
      return 0;
  return 0;
}

//divide x by y giving quotient q and remainder r.  (q=floor(x/y),  r=x mod y).  All 4 are bigints.
//x must have at least one leading zero element.
//y must be nonzero.
//q and r must be arrays that are exactly the same length as x. (Or q can have more).
//Must have x.length >= y.length >= 2.
function divide_(x,y,q,r) {
  var kx, ky;
  var i,j,y1,y2,c,a,b;
  copy_(r,x);
  for (ky=y.length;y[ky-1]==0;ky--); //ky is number of elements in y, not including leading zeros

  //normalize: ensure the most significant element of y has its highest bit set
  b=y[ky-1];
  for (a=0; b; a++)
    b>>=1;
  a=bpe-a;  //a is how many bits to shift so that the high order bit of y is leftmost in its array element
  leftShift_(y,a);  //multiply both by 1<<a now, then divide both by that at the end
  leftShift_(r,a);

  //Rob Visser discovered a bug: the following line was originally just before the normalization.
  for (kx=r.length;r[kx-1]==0 && kx>ky;kx--); //kx is number of elements in normalized x, not including leading zeros

  copyInt_(q,0);                      // q=0
  while (!greaterShift(y,r,kx-ky)) {  // while (leftShift_(y,kx-ky) <= r) {
    subShift_(r,y,kx-ky);             //   r=r-leftShift_(y,kx-ky)
    q[kx-ky]++;                       //   q[kx-ky]++;
  }                                   // }

  for (i=kx-1; i>=ky; i--) {
    if (r[i]==y[ky-1])
      q[i-ky]=mask;
    else
      q[i-ky]=Math.floor((r[i]*radix+r[i-1])/y[ky-1]);

    //The following for(;;) loop is equivalent to the commented while loop,
    //except that the uncommented version avoids overflow.
    //The commented loop comes from HAC, which assumes r[-1]==y[-1]==0
    //  while (q[i-ky]*(y[ky-1]*radix+y[ky-2]) > r[i]*radix*radix+r[i-1]*radix+r[i-2])
    //    q[i-ky]--;
    for (;;) {
      y2=(ky>1 ? y[ky-2] : 0)*q[i-ky];
      c=y2>>bpe;
      y2=y2 & mask;
      y1=c+q[i-ky]*y[ky-1];
      c=y1>>bpe;
      y1=y1 & mask;

      if (c==r[i] ? y1==r[i-1] ? y2>(i>1 ? r[i-2] : 0) : y1>r[i-1] : c>r[i])
        q[i-ky]--;
      else
        break;
    }

    linCombShift_(r,y,-q[i-ky],i-ky);    //r=r-q[i-ky]*leftShift_(y,i-ky)
    if (negative(r)) {
      addShift_(r,y,i-ky);         //r=r+leftShift_(y,i-ky)
      q[i-ky]--;
    }
  }

  rightShift_(y,a);  //undo the normalization step
  rightShift_(r,a);  //undo the normalization step
}

//do carries and borrows so each element of the bigInt x fits in bpe bits.
function carry_(x) {
  var i,k,c,b;
  k=x.length;
  c=0;
  for (i=0;i<k;i++) {
    c+=x[i];
    b=0;
    if (c<0) {
      b=-(c>>bpe);
      c+=b*radix;
    }
    x[i]=c & mask;
    c=(c>>bpe)-b;
  }
}

//return x mod n for bigInt x and integer n.
function modInt(x,n) {
  var i,c=0;
  for (i=x.length-1; i>=0; i--)
    c=(c*radix+x[i])%n;
  return c;
}

//convert the integer t into a bigInt with at least the given number of bits.
//the returned array stores the bigInt in bpe-bit chunks, little endian (buff[0] is least significant word)
//Pad the array with leading zeros so that it has at least minSize elements.
//There will always be at least one leading 0 element.
function int2bigInt(t,bits,minSize) {
  var i,k;
  k=Math.ceil(bits/bpe)+1;
  k=minSize>k ? minSize : k;
  buff=new Array(k);
  copyInt_(buff,t);
  return buff;
}

//return the bigInt given a string representation in a given base.
//Pad the array with leading zeros so that it has at least minSize elements.
//If base=-1, then it reads in a space-separated list of array elements in decimal.
//The array will always have at least one leading zero, unless base=-1.
function str2bigInt(s,b,minSize) {
  var d, i, j, base, str, x, y, kk;
  if (typeof b === 'string') {
	  base = b.length;
	  str = b;
  } else {
	  base = b;
	  str = digitsStr;
  }
  var k=s.length;
  if (base==-1) { //comma-separated list of array elements in decimal
    x=new Array(0);
    for (;;) {
      y=new Array(x.length+1);
      for (i=0;i<x.length;i++)
        y[i+1]=x[i];
      y[0]=parseInt(s,10);
      x=y;
      d=s.indexOf(',',0);
      if (d<1)
        break;
      s=s.substring(d+1);
      if (s.length==0)
        break;
    }
    if (x.length<minSize) {
      y=new Array(minSize);
      copy_(y,x);
      return y;
    }
    return x;
  }

  x=int2bigInt(0,base*k,0);
  for (i=0;i<k;i++) {
    d=str.indexOf(s.substring(i,i+1),0);
//    if (base<=36 && d>=36)  //convert lowercase to uppercase if base<=36
//      d-=26;
    if (d>=base || d<0) {   //ignore illegal characters
      continue;
    }
    multInt_(x,base);
    addInt_(x,d);
  }

  for (k=x.length;k>0 && !x[k-1];k--); //strip off leading zeros
  k=minSize>k+1 ? minSize : k+1;
  y=new Array(k);
  kk=k<x.length ? k : x.length;
  for (i=0;i<kk;i++)
    y[i]=x[i];
  for (;i<k;i++)
    y[i]=0;
  return y;
}

//is bigint x equal to integer y?
//y must have less than bpe bits
function equalsInt(x,y) {
  var i;
  if (x[0]!=y)
    return 0;
  for (i=1;i<x.length;i++)
    if (x[i])
      return 0;
  return 1;
}

//are bigints x and y equal?
//this works even if x and y are different lengths and have arbitrarily many leading zeros
function equals(x,y) {
  var i;
  var k=x.length<y.length ? x.length : y.length;
  for (i=0;i<k;i++)
    if (x[i]!=y[i])
      return 0;
  if (x.length>y.length) {
    for (;i<x.length;i++)
      if (x[i])
        return 0;
  } else {
    for (;i<y.length;i++)
      if (y[i])
        return 0;
  }
  return 1;
}

//is the bigInt x equal to zero?
function isZero(x) {
  var i;
  for (i=0;i<x.length;i++)
    if (x[i])
      return 0;
  return 1;
}

//convert a bigInt into a string in a given base, from base 2 up to base 95.
//Base -1 prints the contents of the array representing the number.
function bigInt2str(x,b) {
  var i,t,base,str,s="";
  if (typeof b === 'string') {
	  base = b.length;
	  str = b;
  } else {
	  base = b;
	  str = digitsStr;
  }

  if (s6.length!=x.length)
    s6=dup(x);
  else
    copy_(s6,x);

  if (base==-1) { //return the list of array contents
    for (i=x.length-1;i>0;i--)
      s+=x[i]+',';
    s+=x[0];
  }
  else { //return it in the given base
    while (!isZero(s6)) {
      t=divInt_(s6,base);  //t=s6 % base; s6=floor(s6/base);
      s=str.substring(t,t+1)+s;
    }
  }
  if (s.length==0)
    s=str[0];
  return s;
}

//returns a duplicate of bigInt x
function dup(x) {
  var i;
  buff=new Array(x.length);
  copy_(buff,x);
  return buff;
}

//do x=y on bigInts x and y.  x must be an array at least as big as y (not counting the leading zeros in y).
function copy_(x,y) {
  var i;
  var k=x.length<y.length ? x.length : y.length;
  for (i=0;i<k;i++)
    x[i]=y[i];
  for (i=k;i<x.length;i++)
    x[i]=0;
}

//do x=y on bigInt x and integer y.
function copyInt_(x,n) {
  var i,c;
  for (c=n,i=0;i<x.length;i++) {
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x+n where x is a bigInt and n is an integer.
//x must be large enough to hold the result.
function addInt_(x,n) {
  var i,k,c,b;
  x[0]+=n;
  k=x.length;
  c=0;
  for (i=0;i<k;i++) {
    c+=x[i];
    b=0;
    if (c<0) {
      b=-(c>>bpe);
      c+=b*radix;
    }
    x[i]=c & mask;
    c=(c>>bpe)-b;
    if (!c) return; //stop carrying as soon as the carry is zero
  }
}

//right shift bigInt x by n bits.  0 <= n < bpe.
function rightShift_(x,n) {
  var i;
  var k=Math.floor(n/bpe);
  if (k) {
    for (i=0;i<x.length-k;i++) //right shift x by k elements
      x[i]=x[i+k];
    for (;i<x.length;i++)
      x[i]=0;
    n%=bpe;
  }
  for (i=0;i<x.length-1;i++) {
    x[i]=mask & ((x[i+1]<<(bpe-n)) | (x[i]>>n));
  }
  x[i]>>=n;
}

//do x=floor(|x|/2)*sgn(x) for bigInt x in 2's complement
function halve_(x) {
  var i;
  for (i=0;i<x.length-1;i++) {
    x[i]=mask & ((x[i+1]<<(bpe-1)) | (x[i]>>1));
  }
  x[i]=(x[i]>>1) | (x[i] & (radix>>1));  //most significant bit stays the same
}

//left shift bigInt x by n bits.
function leftShift_(x,n) {
  var i;
  var k=Math.floor(n/bpe);
  if (k) {
    for (i=x.length; i>=k; i--) //left shift x by k elements
      x[i]=x[i-k];
    for (;i>=0;i--)
      x[i]=0;
    n%=bpe;
  }
  if (!n)
    return;
  for (i=x.length-1;i>0;i--) {
    x[i]=mask & ((x[i]<<n) | (x[i-1]>>(bpe-n)));
  }
  x[i]=mask & (x[i]<<n);
}

//do x=x*n where x is a bigInt and n is an integer.
//x must be large enough to hold the result.
function multInt_(x,n) {
  var i,k,c,b;
  if (!n)
    return;
  k=x.length;
  c=0;
  for (i=0;i<k;i++) {
    c+=x[i]*n;
    b=0;
    if (c<0) {
      b=-(c>>bpe);
      c+=b*radix;
    }
    x[i]=c & mask;
    c=(c>>bpe)-b;
  }
}

//do x=floor(x/n) for bigInt x and integer n, and return the remainder
function divInt_(x,n) {
  var i,r=0,s;
  for (i=x.length-1;i>=0;i--) {
    s=r*radix+x[i];
    x[i]=Math.floor(s/n);
    r=s%n;
  }
  return r;
}

//do the linear combination x=a*x+b*y for bigInts x and y, and integers a and b.
//x must be large enough to hold the answer.
function linComb_(x,y,a,b) {
  var i,c,k,kk;
  k=x.length<y.length ? x.length : y.length;
  kk=x.length;
  for (c=0,i=0;i<k;i++) {
    c+=a*x[i]+b*y[i];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;i<kk;i++) {
    c+=a*x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do the linear combination x=a*x+b*(y<<(ys*bpe)) for bigInts x and y, and integers a, b and ys.
//x must be large enough to hold the answer.
function linCombShift_(x,y,b,ys) {
  var i,c,k,kk;
  k=x.length<ys+y.length ? x.length : ys+y.length;
  kk=x.length;
  for (c=0,i=ys;i<k;i++) {
    c+=x[i]+b*y[i-ys];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<kk;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x+(y<<(ys*bpe)) for bigInts x and y, and integers a,b and ys.
//x must be large enough to hold the answer.
function addShift_(x,y,ys) {
  var i,c,k,kk;
  k=x.length<ys+y.length ? x.length : ys+y.length;
  kk=x.length;
  for (c=0,i=ys;i<k;i++) {
    c+=x[i]+y[i-ys];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<kk;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x-(y<<(ys*bpe)) for bigInts x and y, and integers a,b and ys.
//x must be large enough to hold the answer.
function subShift_(x,y,ys) {
  var i,c,k,kk;
  k=x.length<ys+y.length ? x.length : ys+y.length;
  kk=x.length;
  for (c=0,i=ys;i<k;i++) {
    c+=x[i]-y[i-ys];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<kk;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x-y for bigInts x and y.
//x must be large enough to hold the answer.
//negative answers will be 2s complement
function sub_(x,y) {
  var i,c,k,kk;
  k=x.length<y.length ? x.length : y.length;
  for (c=0,i=0;i<k;i++) {
    c+=x[i]-y[i];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<x.length;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x+y for bigInts x and y.
//x must be large enough to hold the answer.
function add_(x,y) {
  var i,c,k,kk;
  k=x.length<y.length ? x.length : y.length;
  for (c=0,i=0;i<k;i++) {
    c+=x[i]+y[i];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<x.length;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x*y for bigInts x and y.  This is faster when y<x.
function mult_(x,y) {
  var i;
  if (ss.length!=2*x.length)
    ss=new Array(2*x.length);
  copyInt_(ss,0);
  for (i=0;i<y.length;i++)
    if (y[i])
      linCombShift_(ss,x,y[i],i);   //ss=1*ss+y[i]*(x<<(i*bpe))
  copy_(x,ss);
}

//do x=x mod n for bigInts x and n.
function mod_(x,n) {
  if (s4.length!=x.length)
    s4=dup(x);
  else
    copy_(s4,x);
  if (s5.length!=x.length)
    s5=dup(x);
  divide_(s4,n,s5,x);  //x = remainder of s4 / n
}

//do x=x*y mod n for bigInts x,y,n.
//for greater speed, let y<x.
function multMod_(x,y,n) {
  var i;
  if (s0.length!=2*x.length)
    s0=new Array(2*x.length);
  copyInt_(s0,0);
  for (i=0;i<y.length;i++)
    if (y[i])
      linCombShift_(s0,x,y[i],i);   //s0=1*s0+y[i]*(x<<(i*bpe))
  mod_(s0,n);
  copy_(x,s0);
}

//do x=x*x mod n for bigInts x,n.
function squareMod_(x,n) {
  var i,j,d,c,kx,kn,k;
  for (kx=x.length; kx>0 && !x[kx-1]; kx--);  //ignore leading zeros in x
  k=kx>n.length ? 2*kx : 2*n.length; //k=# elements in the product, which is twice the elements in the larger of x and n
  if (s0.length!=k)
    s0=new Array(k);
  copyInt_(s0,0);
  for (i=0;i<kx;i++) {
    c=s0[2*i]+x[i]*x[i];
    s0[2*i]=c & mask;
    c>>=bpe;
    for (j=i+1;j<kx;j++) {
      c=s0[i+j]+2*x[i]*x[j]+c;
      s0[i+j]=(c & mask);
      c>>=bpe;
    }
    s0[i+kx]=c;
  }
  mod_(s0,n);
  copy_(x,s0);
}

//return x with exactly k leading zero elements
function trim(x,k) {
  var i,y;
  for (i=x.length; i>0 && !x[i-1]; i--);
  y=new Array(i+k);
  copy_(y,x);
  return y;
}

//do x=x**y mod n, where x,y,n are bigInts and ** is exponentiation.  0**0=1.
//this is faster when n is odd.  x usually needs to have as many elements as n.
function powMod_(x,y,n) {
  var k1,k2,kn,np;
  if(s7.length!=n.length)
    s7=dup(n);

  //for even modulus, use a simple square-and-multiply algorithm,
  //rather than using the more complex Montgomery algorithm.
  if ((n[0]&1)==0) {
    copy_(s7,x);
    copyInt_(x,1);
    while(!equalsInt(y,0)) {
      if (y[0]&1)
        multMod_(x,s7,n);
      divInt_(y,2);
      squareMod_(s7,n);
    }
    return;
  }

  //calculate np from n for the Montgomery multiplications
  copyInt_(s7,0);
  for (kn=n.length;kn>0 && !n[kn-1];kn--);
  np=radix-inverseModInt(modInt(n,radix),radix);
  s7[kn]=1;
  multMod_(x ,s7,n);   // x = x * 2**(kn*bp) mod n

  if (s3.length!=x.length)
    s3=dup(x);
  else
    copy_(s3,x);

  for (k1=y.length-1;k1>0 & !y[k1]; k1--);  //k1=first nonzero element of y
  if (y[k1]==0) {  //anything to the 0th power is 1
    copyInt_(x,1);
    return;
  }
  for (k2=1<<(bpe-1);k2 && !(y[k1] & k2); k2>>=1);  //k2=position of first 1 bit in y[k1]
  for (;;) {
    if (!(k2>>=1)) {  //look at next bit of y
      k1--;
      if (k1<0) {
        mont_(x,one,n,np);
        return;
      }
      k2=1<<(bpe-1);
    }
    mont_(x,x,n,np);

    if (k2 & y[k1]) //if next bit is a 1
      mont_(x,s3,n,np);
  }
}


//do x=x*y*Ri mod n for bigInts x,y,n,
//  where Ri = 2**(-kn*bpe) mod n, and kn is the
//  number of elements in the n array, not
//  counting leading zeros.
//x array must have at least as many elemnts as the n array
//It's OK if x and y are the same variable.
//must have:
//  x,y < n
//  n is odd
//  np = -(n^(-1)) mod radix
function mont_(x,y,n,np) {
  var i,j,c,ui,t,ks;
  var kn=n.length;
  var ky=y.length;

  if (sa.length!=kn)
    sa=new Array(kn);

  copyInt_(sa,0);

  for (;kn>0 && n[kn-1]==0;kn--); //ignore leading zeros of n
  for (;ky>0 && y[ky-1]==0;ky--); //ignore leading zeros of y
  ks=sa.length-1; //sa will never have more than this many nonzero elements.

  //the following loop consumes 95% of the runtime for randTruePrime_() and powMod_() for large numbers
  for (i=0; i<kn; i++) {
    t=sa[0]+x[i]*y[0];
    ui=((t & mask) * np) & mask;  //the inner "& mask" was needed on Safari (but not MSIE) at one time
    c=(t+ui*n[0]) >> bpe;
    t=x[i];

    //do sa=(sa+x[i]*y+ui*n)/b   where b=2**bpe.  Loop is unrolled 5-fold for speed
    j=1;
    for (;j<ky-4;) { c+=sa[j]+ui*n[j]+t*y[j];   sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j]+t*y[j];   sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j]+t*y[j];   sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j]+t*y[j];   sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j]+t*y[j];   sa[j-1]=c & mask;   c>>=bpe;   j++; }
    for (;j<ky;)   { c+=sa[j]+ui*n[j]+t*y[j];   sa[j-1]=c & mask;   c>>=bpe;   j++; }
    for (;j<kn-4;) { c+=sa[j]+ui*n[j];          sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j];          sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j];          sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j];          sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j];          sa[j-1]=c & mask;   c>>=bpe;   j++; }
    for (;j<kn;)   { c+=sa[j]+ui*n[j];          sa[j-1]=c & mask;   c>>=bpe;   j++; }
    for (;j<ks;)   { c+=sa[j];                  sa[j-1]=c & mask;   c>>=bpe;   j++; }
    sa[j-1]=c & mask;
  }

  if (!greater(n,sa))
    sub_(sa,n);
  copy_(x,sa);
}

if (typeof module === 'undefined') {
	module = {};
}
BigInt = module.exports = {
	'add': add, 'addInt': addInt, 'bigInt2str': bigInt2str, 'bitSize': bitSize,
	'dup': dup, 'equals': equals, 'equalsInt': equalsInt, 'expand': expand,
	'findPrimes': findPrimes, 'GCD': GCD, 'greater': greater,
	'greaterShift': greaterShift, 'int2bigInt': int2bigInt,
	'inverseMod': inverseMod, 'inverseModInt': inverseModInt, 'isZero': isZero,
	'millerRabin': millerRabin, 'millerRabinInt': millerRabinInt, 'mod': mod,
	'modInt': modInt, 'mult': mult, 'multMod': multMod, 'negative': negative,
	'powMod': powMod, 'randBigInt': randBigInt, 'randTruePrime': randTruePrime,
	'randProbPrime': randProbPrime, 'str2bigInt': str2bigInt, 'sub': sub,
	'trim': trim, 'addInt_': addInt_, 'add_': add_, 'copy_': copy_,
	'copyInt_': copyInt_, 'GCD_': GCD_, 'inverseMod_': inverseMod_, 'mod_': mod_,
	'mult_': mult_, 'multMod_': multMod_, 'powMod_': powMod_,
	'randBigInt_': randBigInt_, 'randTruePrime_': randTruePrime_, 'sub_': sub_,
	'addShift_': addShift_, 'carry_': carry_, 'divide_': divide_,
	'divInt_': divInt_, 'eGCD_': eGCD_, 'halve_': halve_, 'leftShift_': leftShift_,
	'linComb_': linComb_, 'linCombShift_': linCombShift_, 'mont_': mont_,
	'multInt_': multInt_, 'rightShift_': rightShift_, 'squareMod_': squareMod_,
	'subShift_': subShift_, 'powMod_': powMod_, 'eGCD_': eGCD_,
	'inverseMod_': inverseMod_, 'GCD_': GCD_, 'mont_': mont_, 'divide_': divide_,
	'squareMod_': squareMod_, 'randTruePrime_': randTruePrime_,
	'millerRabin': millerRabin
};

})();

},{}],20:[function(require,module,exports){
module.exports=require(5)
},{"/Users/chat-wane/Desktop/project/jquery-crate/node_modules/crate-core/lib/guid.js":5}],21:[function(require,module,exports){
/*!
 * MJoin(id)
 * MRequestTicket(id)
 * MOfferTicket(id, ticket, peer)
 * MStampedTicket(id, ticket, peer)
 * MExchange(id, peer)
 */

/*!
 * \brief message requesting to join the network
 * \param id the identifier of the join message
 */
function MJoin(id){
    this.protocol = 'spray';
    this.type = 'MJoin';
    this.id = id;
};
module.exports.MJoin = MJoin;

/*!
 * \brief message requesting an offer ticket
 * \param id the identifier of the request message
 */
function MRequestTicket(id){
    this.protocol = 'spray';
    this.type = 'MRequestTicket';
    this.id = id;
};
module.exports.MRequestTicket = MRequestTicket;

/*!
 * \brief an offer ticket containing the first part of the webrtc connection
 * establishment
 * \param id the unique identifier of the request message
 * \param ticket the first step of the connection establishement data
 * \param peer the peer that emit the offer ticket
 */
function MOfferTicket(id, ticket, peer){
    this.protocol = 'spray';
    this.type = 'MOfferTicket';
    this.id = id;
    this.ticket = ticket;
    this.peer = peer;
};
module.exports.MOfferTicket = MOfferTicket;

/*!
 * \brief an stamped ticket containing the second part of the webrtc connection
 * establishement
 * \param id the unique identifier of the request ticket
 * \param ticket the second step of the connection establishement data
 * \param peer the peer that emit the stamped ticket
 */
function MStampedTicket(id, ticket, peer){
    this.protocol = 'spray';
    this.type = 'MStampedTicket';
    this.id = id;
    this.ticket = ticket;
    this.peer = peer;
};
module.exports.MStampedTicket = MStampedTicket;

/*!
 * \brief message requesting an exchange of neighborhood
 * \param id the identifier of the request message
 * \param peer the identity of the initiator of the exchange
 */
function MExchange(id, peer){
    this.protocol = 'spray';
    this.type = 'MExchange';
    this.id = id;
    this.peer = peer;
};
module.exports.MExchange = MExchange;

},{}],22:[function(require,module,exports){
var SortedArray = require("sorted-cmp-array");

/*!
 * \brief comparator
 * \param a the first object including an 'age' property
 * \param b the second object including an 'age' property
 * \return 1 if a.age > b.age, -1 if a.age < b.age, 0 otherwise
 */
function comp(a, b){
    if (a.age < b.age){ return -1;};
    if (a.age > b.age){ return  1;};
    return 0;
};

/*!
 * \brief structure containing the neighborhood of a peer.
 */
function PartialView(){
    // #1 initialize the partial view as an array sorted by age
    this.array = new SortedArray(comp);
};

/*!
 * \return the oldest peer in the array
 */
PartialView.prototype.getOldest = function(){
    return this.array.arr[0];
};

/*!
 * \brief increment the age of the whole partial view
 */
PartialView.prototype.incrementAge = function(){
    for (var i=0; i<this.array.arr.length; ++i){
        this.array.arr[i].age += 1;
    };
};

/*!
 * \brief get a sample of the partial to send to the neighbor
 * \param neighbor the neighbor which performs the exchange with us
 * \param isInitiator whether or not the caller is the initiator of the
 * exchange
 * \return an array containing neighbors from this partial view
 */
PartialView.prototype.getSample = function(neighbor, isInitiator){
    var sample = [];
    // #1 copy the partial view
    var clone = new SortedArray(comp);
    for (var i = 0; i < this.array.arr.length; ++i){
        clone.arr.push(this.array.arr[i]);
    };

    // #2 process the size of the sample
    var sampleSize = Math.ceil(this.array.arr.length/2);
    
    if (isInitiator){
        // #A remove an occurrence of the chosen neighbor
        var index = clone.indexOf(neighbor);
        sample.push(clone.arr[index]); 
        clone.arr.splice(index, 1);
    };
    
    // #3 randomly add neighbors to the sample
    while (sample.length < sampleSize){
        var rn = Math.floor(Math.random()*clone.arr.length);
        sample.push(clone.arr[rn]);
        clone.arr.splice(rn, 1);
    };
    
    return sample;
};



/*!
 * \brief replace the occurrences of the old peer by the fresh one
 * \param sample the sample to modify
 * \param old the old reference to replace
 * \param fresh the new reference to insert
 * \return an array with the replaced occurences
 */
PartialView.prototype.replace = function(sample, old, fresh){
    var result = [];
    for (var i = 0; i < sample.length; ++i){
        if (sample[i].id === old.id){
            result.push(fresh);
        } else {
            result.push(sample[i]);
        };
    };
    return result;
};

/*!
 * \brief add the neigbhor to the partial view with an age of 0
 * \param peer the peer to add to the partial view
 */
PartialView.prototype.addNeighbor = function(peer){
    peer.age = 0;
    this.array.arr.push(peer);
};


/*!
 * \brief get the index of the peer in the partialview
 * \return the index of the peer in the array, -1 if not found
 */
PartialView.prototype.getIndex = function(peer){
    var i = 0,
        index = -1;
        found = false;
    while (!found && i < this.array.arr.length){
        if (peer.id === this.array.arr[i].id){
            found = true;
            index = i;
        };
        ++i;
    };
    return index;
};

/*!
 * \brief remove the peer from the partial view
 * \param peer the peer to remove
 * \return the removed entry if it exists, null otherwise
 */
PartialView.prototype.removePeer = function(peer){
    var index = this.getIndex(peer),
        removedEntry = null;
    if (index > -1){
        removedEntry = this.array.arr[index];
        this.array.arr.splice(index, 1);
    };
    return removedEntry;
};

/*!
 * \brief remove the peer with the associated age from the partial view
 * \param peer the peer to remove
 * \param age the age of the peer to remove
 * \return the removed entry if it exists, null otherwise
 */
PartialView.prototype.removePeerAge = function(peer, age){
    var found = false,
        i = 0,
        removedEntry = null;
    while(!found && i < this.array.arr.length){
        if (peer.id === this.array.arr[i].id && age === this.array.arr[i].age){
            found = true;
            removedEntry = this.array.arr[i];
            this.array.arr.splice(i, 1);
        };
        ++i;
    };
    return removedEntry;
};

/*!
 * \brief remove all occurrences of the peer and return the number of removals
 * \param peer the peer to remove
 * \return the number of occurrences of the removed peer
 */
PartialView.prototype.removeAll = function(peer){
    var occ = 0,
        i = 0;
    while (i < this.array.arr.length){
        if (this.array.arr[i].id === peer.id){
            this.array.arr.splice(i, 1);
            occ += 1;
        } else {
            ++i;
        };
    };
    return occ;
};

/*!
 * \brief remove all the elements contained in the sample in argument
 * \param sample the elements to remove
 */
PartialView.prototype.removeSample = function(sample){
    for (var i = 0; i < sample.length; ++i){
        this.removePeerAge(sample[i], sample[i].age);
    };
};

/*!
 * \brief get the size of the partial view
 * \return the size of the partial view
 */
PartialView.prototype.length = function(){
    return this.array.arr.length;
};

/*!
 * \brief check if the partial view contains the reference
 * \param peer the peer to check
 * \return true if the peer is in the partial view, false otherwise
 */
PartialView.prototype.contains = function(peer){
    return this.getIndex(peer)>=0;
};

module.exports = PartialView;

},{"sorted-cmp-array":35}],23:[function(require,module,exports){
var SortedArray = require("sorted-cmp-array");

/*!
 * \brief represent the array containing the sockets associated with
 * a unique identifier id
 */
function Sockets(){
    this.array = new SortedArray(
        function(a, b){
            if (a.id < b.id){ return -1; };
            if (a.id > b.id){ return  1; };
            return 0;
        }
    );
    this.lastChance = null; // last chance socket.
};

/*!
 * \brief add the socket with an object containing an identifier 
 * \param socket the socket to communicate with peer
 * \param object the object containing the identifier
 * \return true if the socket as been added, false otherwise
 */ 
Sockets.prototype.addSocket = function(socket, object){
    var contains = this.contains(object);
    if (!contains){
        this.array.insert({id:object.id, socket:socket});
    };
    return !contains;
};

/*!
 * \brief remove the object and its associated socket from the array
 * \param object the object containing the identifier to remove
 * \return the socket targeted by the removal, null if it does not exist
 */
Sockets.prototype.removeSocket = function(object){
    var socket = this.getSocket(object);
    if (socket !== null){
        this.array.remove(object);
        this.lastChance = socket;
    };
    return socket;
};

/*!
 * \brief get the socket attached to the object identity
 * \param object the object containing the identifier to search
 * \return the socket if the object exists, null otherwise
 */
Sockets.prototype.getSocket = function(object){
    var index = this.array.indexOf(object),
        socket = null;
    if (index !== -1){
        socket = this.array.arr[index].socket;
    };
    return socket;
};

/*!
 * \brief check if there is a socket associated to the object
 * \param object the object containing the identifier to check
 * \return true if a socket associated to the object exists, false otherwise
 */
Sockets.prototype.contains = function(object){
    return (this.array.indexOf(object) !== -1);
};

/*!
 * \brief get the length of the underlying array
 * \return the length of the array
 */
Sockets.prototype.length = function(){
    return this.array.arr.length;
};

module.exports = Sockets;

},{"sorted-cmp-array":35}],24:[function(require,module,exports){
var EventEmitter = require('events').EventEmitter;
var Socket = require('simple-peer');
var util = require('util');

var PartialView = require('./partialview.js');
var Sockets = require('./sockets.js');
var GUID = require('./guid.js');

var Messages = require('./messages.js');
var MJoin = Messages.MJoin;
var MRequestTicket = Messages.MRequestTicket;
var MOfferTicket = Messages.MOfferTicket;
var MStampedTicket = Messages.MStampedTicket;
var MExchange = Messages.MExchange;

util.inherits(Spray, EventEmitter);

/*!
 * \brief Implementation of the random peer sampling called Spray on top of
 * socket.io
 * \param id the unique identifier of our peer
 * \param options the WebRTC options, for more informations: 
 * \url https://github.com/feross/simple-peer
 */
function Spray(id, options){
    EventEmitter.call(this);
    // #A constants
    this.DELTATIME = (options && options.deltatime) || 1000 * 60 * 2; // 2min
    this.TIMEOUT = (options && options.timeout) || 1000 * 60 * 1; // 1min
    this.ID = (id && ''+id+'') || GUID();
    this.OPTIONS = options || {};
    
    // #B protocol variables
    this.partialView = new PartialView();
    this.sockets = new Sockets();
    this.pending = new Sockets();
    this.forwards = new Sockets();
    this.state = 'disconnect';
    
    // #C webrtc specifics
    var self = this;
    setInterval(function(){
        if (self.partialView.length()>0){
            self.exchange();
        };
    }, this.DELTATIME);

    // #D events
    this.on('spray-receive', function(socket, message){
        self.onSprayReceive(socket, message);
    });
};

/*!
 * \brief check if the network is ready and callback, nothing otherwise
 * \param callback the function to call if the network is ready
 */
Spray.prototype.ready = function(callback){
    if (this.partialView.length() > 0){ callback(); };
};

/*!
 * \brief get a set of neighbors
 * \param k the number of neighbors requested
 * \return a list of sockets
 */
Spray.prototype.getPeers = function(k){
    var result = [];
    // #A copy the sockets of the partial view
    var cloneSockets = [];
    for (var i = 0; i < this.sockets.length(); ++i){
        cloneSockets[i] = this.sockets.array.arr[i];
    };
    // #B get as much neighbors as possible
    while (0 < cloneSockets.length && result.length < k){
        var rn = Math.floor(Math.random()*cloneSockets.length);
        result.push(cloneSockets[rn].socket);
        cloneSockets.splice(rn, 1);
    };
    // #C last chance socket
    if (k>0 && result.length===0 && this.sockets.lastChance!==null){
        result.push(this.sockets.lastChance);
    };
    return result;
};

Spray.prototype.updateState = function(){
    if (this.partialView.length() > 0 && this.state !== 'connect'){
        this.state = 'connect';
        this.emit('statechange', 'connect');
    }
    if (this.partialView.length() === 0 && this.pending.length() > 0 &&
        this.state !== 'partial'){
        this.state = 'partial';
        this.emit('statechange', 'partial');
    };
    if (this.partialView.length() === 0 && this.pending.length() === 0 &&
        this.state !== 'disconnect'){
        this.state = 'disconnect';
        this.emit('statechange', 'disconnect');
    };
};

/*******************************************************************************
 * Bootstrap the first WebRTC connection
 ******************************************************************************/

/*!
 * \brief the very first part of a connection establishment to join the network.
 * This part corresponds to the first part of the 'onStampedTicketRequest' of
 * the spray protocol.
 * \param callback a callback function taking a 'message' in argument and
 * called when we receive the data from the stun server
 */
Spray.prototype.launch = function(callback){
    var options=this.OPTIONS; options.initiator=true; options.trickle=false;
    var socket = new Socket(options),
        id = GUID(),
        self = this;
    socket.on('signal', function(data){
        var message = new MOfferTicket(id, data, {id: self.ID});
        self.pending.addSocket(socket, message);
        callback(message);
    });
    setTimeout(function(){
        if (self.pending.contains({id:id})){
            self.pending.removeSocket({id:id});
            socket.destroy();
        };
    }, this.TIMEOUT);
};

/*!
 * \brief the second part of the connection establishment. This function is
 * called at the peer already inside the network. It corresponds to the function
 * 'onTicketRequest' of the Spray protocol
 * \param message the message generated by the launch function at the joining
 * peer
 * \param callback the function called when we receive the stamped ticket from
 * the stun server. It has a 'message' argument.
 */
Spray.prototype.answer = function(message, callback){
    var options=this.OPTIONS; options.initiator=false; options.trickle=false;
    var socket = new Socket(options),
        id = message.id,
        ticket = message.ticket,
        peer = message.peer,
        self = this;
    socket.on('signal', function(data){
        var stampedTicket = new MStampedTicket(id, data, {id:self.ID});
        self.pending.addSocket(socket, stampedTicket);
        callback(stampedTicket);
    });
    socket.on('connect', function(){
        console.log('wrtc: successful connection establishment');
        self.pending.removeSocket(message);
    });
    socket.on('data', function(receivedMessage){
        self.receive(socket, receivedMessage);
    });
    socket.on('stream', function(stream){
        self.emit('stream', socket, stream);
    });
    socket.on('close', function(){
        console.log('wrtc: a connection has been closed');
    });
    socket.signal(ticket);
    setTimeout(function(){
        if (self.pending.contains({id:id})){
            var socket = self.pending.removeSocket({id:id});
            socket.destroy();
        };
    }, this.TIMEOUT);
};

/*!
 * \brief the third part of the very first connection establishment to join the
 * network. It corresponds to the last part of the function of
 * 'onStampedTicketRequest' of the Spray protocol.
 * \param message the message containing the stamped ticket from the contact
 * peer
 */
Spray.prototype.handshake = function(message){
    var socket = this.pending.removeSocket(message),
        id = message.id,
        ticket = message.ticket,
        peer = message.peer,
        self = this;
    socket.on('connect', function(){
        console.log('wrtc: successful connection establishment');
        self.partialView.addNeighbor(peer);
        self.sockets.addSocket(socket, peer);
        self.join(peer);
        self.updateState();
    });
    socket.on('data', function(receivedMessage){
        self.receive(socket, receivedMessage);
    });
    socket.on('stream', function(stream){
        self.emit('stream', socket, stream);
    });
    socket.on('close', function(){
        console.log('wrtc: a connection has been closed');
        self.updateState();
    });
    socket.signal(ticket);
};


/*******************************************************************************
 * Spray's protocol implementation
 ******************************************************************************/

/*!
 * \brief join the network using the kwnon contact peer 
 * \param contact the known peer that will introduce us to the network
 */
Spray.prototype.join = function(contact){
    // #A ask to the contact peer to advertise your presence in the network
    var message = new MJoin(GUID());
    this.send(message, contact);
};

/*!
 * \brief event executer when "this" receives a join message
 * \param id the identifier of the request
 */
Spray.prototype.onJoin = function(id){
    // #A if it is the very first connection, establish a connection from
    // us to the newcomer
    if (this.partialView.length()===0){
        var mRequestTicket = new MRequestTicket(GUID());
        this.send(mRequestTicket, {id:id});
    } else {
        // #B if there is an already established network, we request that
        // the newcomer sends us an offer ticket for each of our neighbors
        for (var i = 0; i < this.partialView.length(); ++i){
            // #1 create the ticket with an original identifier
            var mRequestTicket = new MRequestTicket(GUID());
            // #2 register the forwarding route for the answers
            this.forwards.addSocket(
                this.sockets.getSocket(this.partialView.array.arr[i]),
                mRequestTicket);
            // #3 send the request to the new comer
            this.send(mRequestTicket, {id:id});
        };
    };
};

/*!
 * \brief periodically called function that aims to balance the partial view
 * and to mix the neighbors inside them
 */
Spray.prototype.exchange = function(){
    var self = this;
    var socketOldest = null;
    // #1 get the oldest neighbor reachable
    while ((socketOldest===null) ||
           (socketOldest!==null && !socketOldest.connected) &&
           this.partialView.length()>0){
        var oldest = this.partialView.getOldest();
        socketOldest = this.sockets.getSocket(oldest);
        if (socketOldest===null ||
            (socketOldest!==null && !socketOldest.connected)) {
            this.onPeerDown(oldest);
        };
    };
    if (this.partialView.length()===0){return;}; // ugly return
    // #2 notify the oldest neighbor that it is the chosen one
    var mExchange = new MExchange(GUID(), {id:this.ID});
    this.send(mExchange, oldest);
    // #3 get a sample from our partial view
    var sample = this.partialView.getSample(oldest, true);
    // #4 ask to the neighbors in the sample to create the offer tickets in
    // order to forward them to the oldest neighbor
    for (var i = 0; i < sample.length; ++i){
        if (sample[i].id !== oldest.id){
            // #5 if the neighbor is not the oldest neighbor
            // #5A register the forwarding destination
            var message = new MRequestTicket(GUID());
            this.forwards.addSocket(this.sockets.getSocket(oldest),message);
            // #5B send a ticket request to the neighbor in the sample
            this.send(message, sample[i]);
        } else {
            // #6 otherwise, create an offer ticket ourself and send it to the
            // oldest neigbhor
            var idTicket = GUID();
            this.forwards.addSocket(this.sockets.getSocket(oldest),
                                    {id:idTicket});
            this.onTicketRequest(idTicket);
        };
    };
    // #7 remove the sent sample from our partial view
    this.partialView.removeSample(sample);
    // #8 remove from the sockets dictionnary
    for (var i = 0; i < sample.length; ++i){
        // #8A check if the partial view still contains references to the socket
        if (!this.partialView.contains(sample[i])){
            // #8B otherwise remove the socket from the dictionnary
            var socket = this.sockets.removeSocket(sample[i]);
            // #8C close the socket after a while
            if (socket!==null){
                setTimeout(function(s){
                    s.destroy();
                }, this.TIMEOUT, socket);
            };
        };
    };    
};

/*!
 * \brief event executed when we receive an exchange request
 * \param id the identifier of the request message
 * \param initiator the peer that requested the exchange
 */
Spray.prototype.onExchange = function(id, initiator){
    // #1 get a sample of neighbors from our partial view
    var sample = this.partialView.getSample(initiator, false);
    // #2 ask to each neighbor in the sample to create an offer ticket to
    // give to the initiator peer
    for (var i = 0; i < sample.length; ++i){
        if (sample[i].id !== initiator.id){
            // #2A if the neigbhor is not the initiator, request an offer ticket
            // from it
            var message = new MRequestTicket(GUID());
            // #2B register the forwarding route
            this.forwards.addSocket(this.forwards.getSocket({id:id}), message);
            // #2C send the ticket request to the neigbhor
            this.send(message, sample[i]);
        } else {
            // #3A if the neigbhor is the initiator, create an offer ticket
            // ourself            
            var idTicket = GUID();
            // #3B register the forwarding route for our own offer ticket
            this.forwards.addSocket(this.forwards.getSocket({id:id}),
                                    {id:idTicket});
            // #3C create the offer ticket and send it
            this.onTicketRequest(idTicket);
        };
    };
    // #4 remove the sample from our partial view
    this.partialView.removeSample(sample);
    // #5 remove the sample from the sockets dictionnary
    for (var i = 0; i < sample.length; ++i){
        // #5A check if the partial view still contains references to the socket
        if (!this.partialView.contains(sample[i])){
            // #5B otherwise remove the socket from the dictionnary
            var socket = this.sockets.removeSocket(sample[i])
            // #5C close the socket after a while
            if (socket!==null){
                setTimeout(function(s){
                    s.destroy();
                }, this.TIMEOUT, socket);
            };
        };
    };
};

/*!
 * \brief the function called when a neighbor is unreachable and supposedly
 * crashed/departed. It probabilistically keeps an arc up
 * \param peer the peer that cannot be reached
 */
Spray.prototype.onPeerDown = function(peer){
    console.log('wrtc: a neighbor crashed/left');
    // #A remove all occurrences of the peer in the partial view
    var occ = this.partialView.removeAll(peer);
    this.sockets.removeSocket(peer);
    // #B probabilistically recreate an arc to a known peer
    if (this.partialView.length() > 0){
        for (var i = 0; i < occ; ++i){
            if (Math.random() > (1/(this.partialView.length()+occ))){
                var rn = Math.floor(Math.random()*this.partialView.length());
                this.partialView.addNeighbor(this.partialView.array.arr[rn]);
                console.log('wrtc: create a duplicate');
            };
        };
    };
    this.updateState();
};

/*!
 * \brief a connection failed to establish properly, systematically duplicates
 * an element of the partial view.
 */
Spray.prototype.onArcDown = function(){
    console.log('wrtc: an arc did not properly established');
    if (this.partialView.length()>0){
        var rn = Math.floor(Math.random()*this.partialView.length());
        this.partialView.addNeighbor(this.partialView.array.arr[rn]);
    };
    this.updateState();
};

/*!
 * \brief WebRTC specific event. A neighbor wants us to connect to another peer.
 * To do so, the former requests an offer ticket it can exchange with one of
 * its neighbor.
 * \param peer the identifier of the request message
 */
Spray.prototype.onTicketRequest = function(id){
    var options=this.OPTIONS; options.initiator=true; options.trickle=false;
    var socket = new Socket(options),
        self = this;
    // #1 get the offer ticket from the stun service    
    socket.on('signal', function(data){
        // #A register this socket in pending sockets dictionnary
        var message = new MOfferTicket(id, data, {id: self.ID});
        self.pending.addSocket(socket, message);
        // #B send the offer ticket to the requester along with our identifier
        self.send(message, message);
        // #C remove the forwarding route 
        self.forwards.removeSocket(message);
    });
    // #2 successful connection establishment
    socket.on('connect', function(){
        console.log('wrtc: successful connection establishment');
        // #A remove from the pending sockets dictionnary
        self.pending.removeSocket({id:id});
    });
    // #3 closed connection
    socket.on('close', function(){
        console.log('wrtc: a connection has been closed');
    });
    // #4 receive a message
    socket.on('data', function(message){
        self.receive(socket, message);
    });
    socket.on('stream', function(stream){
        self.emit('stream', socket, stream);
    });
    
    // #5 timeout on connection establishment
    setTimeout(function(){
        // #A check if it the connection established, otherwise, clean socket
        if (self.pending.contains({id:id})){
            self.pending.removeSocket({id:id});
            socket.destroy();
        };
    }, this.TIMEOUT);
};

/*!
 * \brief WebRTC specific event. A neighbor sent a ticket to stamp. We must
 * stamp it back to establish a connection.
 * \param id the identifier of the message carrying the offer ticket
 * \param ticket the offer ticket to stamp
 * \param peer the emitting peer containing its identifier
 */
Spray.prototype.onStampedTicketRequest = function(id, ticket, peer){
    var self = this;
    // #1 if the partial view already contains this neigbhor, duplicate the
    // entry and stop the processus
    if (this.partialView.contains(peer)){
        console.log("wrtc: create a duplicate");
        this.partialView.addNeighbor(peer);
        // #2 send an empty stamped ticket to close the pending and forwardings
        var message = new MStampedTicket(id, null, {id:self.ID});
        self.send(message, message);
        self.forwards.removeSocket({id:id});
        return; // do nothing else. Ugly return
    };
    // #2 otherwise creates an answer
    var options=this.OPTIONS; options.initiator=false; options.trickle=false;
    var socket = new Socket(options);
    // #3 get the stamped ticket from the stun service
    socket.on('signal', function(data){
        // #A create the message containing the stamped ticket
        var message = new MStampedTicket(id, data, {id:self.ID});
        // #B send it back from where it arrives
        self.send(message, message);
        // #C remove the forwarding route
        self.forwards.removeSocket(message);
    });
    // #4 successful connection establishment
    socket.on('connect', function(){
        console.log('wrtc: successful connection establishment');
        // #A remove from pending
        self.pending.removeSocket({id:id});        
        // #B add the neigbhor to our partial view
        self.partialView.addNeighbor(peer);
        // #C add the neigbhor to the socket dictionnary, if it does not exist
        if (!self.sockets.addSocket(socket, peer)){
            socket.destroy();
        };
        self.updateState();
    });
    // #5 closed connection
    socket.on('close', function(){
        console.log('wrtc: a connection has been closed');
        self.updateState();
    });
    // #6 receive a message
    socket.on('data', function(message){
        self.receive(socket, message);
    });
    socket.on('stream', function(stream){
        self.emit('stream', socket, stream);
    });
    // #7 signal the offer ticket to the fresh socket
    socket.signal(ticket);
    this.pending.addSocket(socket, {id:id});
    // #8 a timeout on connection establishment
    setTimeout(function(){
        if (self.pending.contains({id:id})){
            // #A if the connection is not successful, remove the socket and
            // create a duplicate
            self.pending.removeSocket({id:id});
            socket.destroy();
            self.onArcDown();
        };
    }, this.TIMEOUT);
};

/*!
 * \brief send a message to a particular peer. If no peer are passed in
 * arguments, it will try to forwards it the appropriate peer.
 * \param message the message to send
 * \param object the object containing the id to send the message
 * \param return true if the message as been sent, false otherwise
 */
Spray.prototype.send = function(message, object){
    var sent = false;
    var id = (object && object.id) || message.id;
    var socket = this.sockets.getSocket({id:id});
    if (socket !== null){
        if (socket.connected &&
            socket._channel && socket._channel.readyState === 'open'){
            socket.send(message);
            sent = true;
        } else {
            this.onPeerDown({id:id});            
        };
    } else {
        socket = this.forwards.getSocket({id:id});
        if (socket !== null && socket.connected &&
            socket._channel && socket._channel.readyState === 'open'){
            socket.send(message);
            sent = true;
        };
    };
    return sent;
};

/*!
 * \brief receive a membership message and process it accordingly
 * \param socket the socket from which we receive the message
 * \param message the received message
 */
Spray.prototype.receive = function(socket, message){
    if (message && message.protocol){
        this.emit(message.protocol+'-receive', socket, message);
    };
};

Spray.prototype.onSprayReceive = function(socket, message){
    switch (message.type){
    case 'MJoin':
        console.log('wrtc: a new member joins the network');
        var self = this;
        setTimeout(function(){
            self.forwards.addSocket(socket, message);
            self.onJoin(message.id);
            self.forwards.removeSocket(message);
        }, 1000); // make sure that the socket is undoubtedly opened
        break;
    case 'MRequestTicket':
        console.log('wrtc: a member request an offer ticket');
        this.forwards.addSocket(socket, message);
        this.onTicketRequest(message.id);
        break;
    case 'MOfferTicket':
        console.log('wrtc: you received an offer ticket');
        if (!this.forwards.contains(message)){
            // #1 if there is no forwarding route, the offer ticket is for us to
            // stamp
            this.forwards.addSocket(socket, message);
            this.onStampedTicketRequest(message.id,message.ticket,message.peer);
        } else {
            // #2A otherwise, we forward the offer ticket accordingly
            if (this.send(message, message)){
                // #2B invert the direction of forwarding route in order to
                // consistently redirect the stamped ticket
                this.forwards.removeSocket(message);
                this.forwards.addSocket(socket, message);
            } else {
                // #2C if the message has not been sent, simply remove the route
                this.forwards.removeSocket(message);
            };
        };
        break;
    case 'MStampedTicket':
        console.log('wrtc: you received a stamped ticket');
        if (!this.forwards.contains(message)){
            // #1 if there is no forwarding route, the message is for us to
            // finalize
            if (message.ticket === null){
                // #1A empty ticket meaning the remote peer already knows us,
                // therefore, simply close the pending offer
                var socket = this.pending.removeSocket(message);
                socket.destroy();
            } else {
                // #1B otherwise, finalize the connection
                this.pending.getSocket(message).signal(message.ticket);
            };
        } else {
            // #2A otherwise, we forward the stamped ticket accordingly
            this.send(message, message);
            // #2B remove the direction from the known forwarding routes
            this.forwards.removeSocket(message);
        };
        break;
    case 'MExchange':
        console.log('wrtc: a peer starts to exchange with you');
        this.forwards.addSocket(socket, message);
        this.onExchange(message.id, message.peer);
        this.forwards.removeSocket(message);
        break;
    };
};

module.exports = Spray;

},{"./guid.js":20,"./messages.js":21,"./partialview.js":22,"./sockets.js":23,"events":45,"simple-peer":25,"util":63}],25:[function(require,module,exports){
(function (Buffer){
/* global Blob */

module.exports = Peer

var debug = require('debug')('simple-peer')
var hat = require('hat')
var inherits = require('inherits')
var isTypedArray = require('is-typedarray')
var once = require('once')
var stream = require('stream')
var toBuffer = require('typedarray-to-buffer')

inherits(Peer, stream.Duplex)

/**
 * WebRTC peer connection. Same API as node core `net.Socket`, plus a few extra methods.
 * Duplex stream.
 * @param {Object} opts
 */
function Peer (opts) {
  var self = this
  if (!(self instanceof Peer)) return new Peer(opts)
  self._debug('new peer %o', opts)

  if (!opts) opts = {}
  opts.allowHalfOpen = false
  if (opts.highWaterMark == null) opts.highWaterMark = 1024 * 1024

  stream.Duplex.call(self, opts)

  self.initiator = opts.initiator || false
  self.channelConfig = opts.channelConfig || Peer.channelConfig
  self.channelName = opts.channelName || hat(160)
  if (!opts.initiator) self.channelName = null
  self.config = opts.config || Peer.config
  self.constraints = opts.constraints || Peer.constraints
  self.reconnectTimer = opts.reconnectTimer || 0
  self.sdpTransform = opts.sdpTransform || function (sdp) { return sdp }
  self.stream = opts.stream || false
  self.trickle = opts.trickle !== undefined ? opts.trickle : true

  self.destroyed = false
  self.connected = false

  // so Peer object always has same shape (V8 optimization)
  self.remoteAddress = undefined
  self.remoteFamily = undefined
  self.remotePort = undefined
  self.localAddress = undefined
  self.localPort = undefined

  self._wrtc = opts.wrtc || getBrowserRTC()
  if (!self._wrtc) {
    if (typeof window === 'undefined') {
      throw new Error('No WebRTC support: Specify `opts.wrtc` option in this environment')
    } else {
      throw new Error('No WebRTC support: Not a supported browser')
    }
  }

  self._maxBufferedAmount = opts.highWaterMark
  self._pcReady = false
  self._channelReady = false
  self._iceComplete = false // ice candidate trickle done (got null candidate)
  self._channel = null

  self._chunk = null
  self._cb = null
  self._interval = null
  self._reconnectTimeout = null

  self._pc = new (self._wrtc.RTCPeerConnection)(self.config, self.constraints)
  self._pc.oniceconnectionstatechange = self._onIceConnectionStateChange.bind(self)
  self._pc.onsignalingstatechange = self._onSignalingStateChange.bind(self)
  self._pc.onicecandidate = self._onIceCandidate.bind(self)

  if (self.stream) self._pc.addStream(self.stream)
  self._pc.onaddstream = self._onAddStream.bind(self)

  if (self.initiator) {
    self._setupData({ channel: self._pc.createDataChannel(self.channelName, self.channelConfig) })
    self._pc.onnegotiationneeded = once(self._createOffer.bind(self))
    // Only Chrome triggers "negotiationneeded"; this is a workaround for other
    // implementations
    if (typeof window === 'undefined' || !window.webkitRTCPeerConnection) {
      self._pc.onnegotiationneeded()
    }
  } else {
    self._pc.ondatachannel = self._setupData.bind(self)
  }

  self.on('finish', function () {
    if (self.connected) {
      // When local peer is finished writing, close connection to remote peer.
      // Half open connections are currently not supported.
      // Wait a bit before destroying so the datachannel flushes.
      // TODO: is there a more reliable way to accomplish this?
      setTimeout(function () {
        self._destroy()
      }, 100)
    } else {
      // If data channel is not connected when local peer is finished writing, wait until
      // data is flushed to network at "connect" event.
      // TODO: is there a more reliable way to accomplish this?
      self.once('connect', function () {
        setTimeout(function () {
          self._destroy()
        }, 100)
      })
    }
  })
}

Peer.WEBRTC_SUPPORT = !!getBrowserRTC()

/**
 * Expose config, constraints, and data channel config for overriding all Peer
 * instances. Otherwise, just set opts.config, opts.constraints, or opts.channelConfig
 * when constructing a Peer.
 */
Peer.config = {
  iceServers: [
    {
      url: 'stun:23.21.150.121', // deprecated, replaced by `urls`
      urls: 'stun:23.21.150.121'
    }
  ]
}
Peer.constraints = {}
Peer.channelConfig = {}

Object.defineProperty(Peer.prototype, 'bufferSize', {
  get: function () {
    var self = this
    return (self._channel && self._channel.bufferedAmount) || 0
  }
})

Peer.prototype.address = function () {
  var self = this
  return { port: self.localPort, family: 'IPv4', address: self.localAddress }
}

Peer.prototype.signal = function (data) {
  var self = this
  if (self.destroyed) throw new Error('cannot signal after peer is destroyed')
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (err) {
      data = {}
    }
  }
  self._debug('signal()')
  if (data.sdp) {
    self._pc.setRemoteDescription(new (self._wrtc.RTCSessionDescription)(data), function () {
      if (self.destroyed) return
      if (self._pc.remoteDescription.type === 'offer') self._createAnswer()
    }, self._onError.bind(self))
  }
  if (data.candidate) {
    try {
      self._pc.addIceCandidate(
        new (self._wrtc.RTCIceCandidate)(data.candidate), noop, self._onError.bind(self)
      )
    } catch (err) {
      self._destroy(new Error('error adding candidate: ' + err.message))
    }
  }
  if (!data.sdp && !data.candidate) {
    self._destroy(new Error('signal() called with invalid signal data'))
  }
}

/**
 * Send text/binary data to the remote peer.
 * @param {TypedArrayView|ArrayBuffer|Buffer|string|Blob|Object} chunk
 */
Peer.prototype.send = function (chunk) {
  var self = this

  if (!isTypedArray.strict(chunk) && !(chunk instanceof ArrayBuffer) &&
    !Buffer.isBuffer(chunk) && typeof chunk !== 'string' &&
    (typeof Blob === 'undefined' || !(chunk instanceof Blob))) {
    chunk = JSON.stringify(chunk)
  }

  // `wrtc` module doesn't accept node.js buffer
  if (Buffer.isBuffer(chunk) && !isTypedArray.strict(chunk)) {
    chunk = new Uint8Array(chunk)
  }

  var len = chunk.length || chunk.byteLength || chunk.size
  self._channel.send(chunk)
  self._debug('write: %d bytes', len)
}

Peer.prototype.destroy = function (onclose) {
  var self = this
  self._destroy(null, onclose)
}

Peer.prototype._destroy = function (err, onclose) {
  var self = this
  if (self.destroyed) return
  if (onclose) self.once('close', onclose)

  self._debug('destroy (error: %s)', err && err.message)

  self.readable = self.writable = false

  if (!self._readableState.ended) self.push(null)
  if (!self._writableState.finished) self.end()

  self.destroyed = true
  self.connected = false
  self._pcReady = false
  self._channelReady = false

  self._chunk = null
  self._cb = null
  clearInterval(self._interval)
  clearTimeout(self._reconnectTimeout)

  if (self._pc) {
    try {
      self._pc.close()
    } catch (err) {}

    self._pc.oniceconnectionstatechange = null
    self._pc.onsignalingstatechange = null
    self._pc.onicecandidate = null
  }

  if (self._channel) {
    try {
      self._channel.close()
    } catch (err) {}

    self._channel.onmessage = null
    self._channel.onopen = null
    self._channel.onclose = null
  }
  self._pc = null
  self._channel = null

  if (err) self.emit('error', err)
  self.emit('close')
}

Peer.prototype._setupData = function (event) {
  var self = this
  self._channel = event.channel
  self.channelName = self._channel.label

  self._channel.binaryType = 'arraybuffer'
  self._channel.onmessage = self._onChannelMessage.bind(self)
  self._channel.onopen = self._onChannelOpen.bind(self)
  self._channel.onclose = self._onChannelClose.bind(self)
}

Peer.prototype._read = function () {}

Peer.prototype._write = function (chunk, encoding, cb) {
  var self = this
  if (self.destroyed) return cb(new Error('cannot write after peer is destroyed'))

  if (self.connected) {
    self.send(chunk)
    if (self._channel.bufferedAmount > self._maxBufferedAmount) {
      self._debug('start backpressure: bufferedAmount %d', self._channel.bufferedAmount)
      self._cb = cb
    } else {
      cb(null)
    }
  } else {
    self._debug('write before connect')
    self._chunk = chunk
    self._cb = cb
  }
}

Peer.prototype._createOffer = function () {
  var self = this
  if (self.destroyed) return

  self._pc.createOffer(function (offer) {
    if (self.destroyed) return
    speedHack(offer)
    offer.sdp = self.sdpTransform(offer.sdp)
    self._pc.setLocalDescription(offer, noop, self._onError.bind(self))
    var sendOffer = function () {
      self._debug('signal')
      self.emit('signal', self._pc.localDescription || offer)
    }
    if (self.trickle || self._iceComplete) sendOffer()
    else self.once('_iceComplete', sendOffer) // wait for candidates
  }, self._onError.bind(self), self.offerConstraints)
}

Peer.prototype._createAnswer = function () {
  var self = this
  if (self.destroyed) return

  self._pc.createAnswer(function (answer) {
    if (self.destroyed) return
    speedHack(answer)
    answer.sdp = self.sdpTransform(answer.sdp)
    self._pc.setLocalDescription(answer, noop, self._onError.bind(self))
    var sendAnswer = function () {
      self._debug('signal')
      self.emit('signal', self._pc.localDescription || answer)
    }
    if (self.trickle || self._iceComplete) sendAnswer()
    else self.once('_iceComplete', sendAnswer)
  }, self._onError.bind(self), self.answerConstraints)
}

Peer.prototype._onIceConnectionStateChange = function () {
  var self = this
  if (self.destroyed) return
  var iceGatheringState = self._pc.iceGatheringState
  var iceConnectionState = self._pc.iceConnectionState
  self._debug('iceConnectionStateChange %s %s', iceGatheringState, iceConnectionState)
  self.emit('iceConnectionStateChange', iceGatheringState, iceConnectionState)
  if (iceConnectionState === 'connected' || iceConnectionState === 'completed') {
    clearTimeout(self._reconnectTimeout)
    self._pcReady = true
    self._maybeReady()
  }
  if (iceConnectionState === 'disconnected') {
    if (self.reconnectTimer) {
      // If user has set `opt.reconnectTimer`, allow time for ICE to attempt a reconnect
      clearTimeout(self._reconnectTimeout)
      self._reconnectTimeout = setTimeout(function () {
        self._destroy()
      }, self.reconnectTimer)
    } else {
      self._destroy()
    }
  }
  if (iceConnectionState === 'closed') {
    self._destroy()
  }
}

Peer.prototype._maybeReady = function () {
  var self = this
  self._debug('maybeReady pc %s channel %s', self._pcReady, self._channelReady)
  if (self.connected || self._connecting || !self._pcReady || !self._channelReady) return
  self._connecting = true

  if (typeof window !== 'undefined' && !!window.mozRTCPeerConnection) {
    self._pc.getStats(null, function (res) {
      var items = []
      res.forEach(function (item) {
        items.push(item)
      })
      onStats(items)
    }, self._onError.bind(self))
  } else {
    self._pc.getStats(function (res) {
      var items = []
      res.result().forEach(function (result) {
        var item = {}
        result.names().forEach(function (name) {
          item[name] = result.stat(name)
        })
        item.id = result.id
        item.type = result.type
        item.timestamp = result.timestamp
        items.push(item)
      })
      onStats(items)
    })
  }

  function onStats (items) {
    items.forEach(function (item) {
      if (item.type === 'remotecandidate') {
        self.remoteAddress = item.ipAddress
        self.remoteFamily = 'IPv4'
        self.remotePort = Number(item.portNumber)
        self._debug(
          'connect remote: %s:%s (%s)',
          self.remoteAddress, self.remotePort, self.remoteFamily
        )
      } else if (item.type === 'localcandidate' && item.candidateType === 'host') {
        self.localAddress = item.ipAddress
        self.localPort = Number(item.portNumber)
        self._debug('connect local: %s:%s', self.localAddress, self.localPort)
      }
    })

    self._connecting = false
    self.connected = true

    if (self._chunk) {
      self.send(self._chunk)
      self._chunk = null
      self._debug('sent chunk from "write before connect"')

      var cb = self._cb
      self._cb = null
      cb(null)
    }

    self._interval = setInterval(function () {
      if (!self._cb || !self._channel || self._channel.bufferedAmount > self._maxBufferedAmount) return
      self._debug('ending backpressure: bufferedAmount %d', self._channel.bufferedAmount)
      var cb = self._cb
      self._cb = null
      cb(null)
    }, 150)
    if (self._interval.unref) self._interval.unref()

    self._debug('connect')
    self.emit('connect')
  }
}

Peer.prototype._onSignalingStateChange = function () {
  var self = this
  if (self.destroyed) return
  self._debug('signalingStateChange %s', self._pc.signalingState)
  self.emit('signalingStateChange', self._pc.signalingState)
}

Peer.prototype._onIceCandidate = function (event) {
  var self = this
  if (self.destroyed) return
  if (event.candidate && self.trickle) {
    self.emit('signal', { candidate: event.candidate })
  } else if (!event.candidate) {
    self._iceComplete = true
    self.emit('_iceComplete')
  }
}

Peer.prototype._onChannelMessage = function (event) {
  var self = this
  if (self.destroyed) return
  var data = event.data
  self._debug('read: %d bytes', data.byteLength || data.length)

  if (data instanceof ArrayBuffer) {
    data = toBuffer(new Uint8Array(data))
    self.push(data)
  } else {
    try {
      data = JSON.parse(data)
    } catch (err) {}
    self.emit('data', data)
  }
}

Peer.prototype._onChannelOpen = function () {
  var self = this
  if (self.connected || self.destroyed) return
  self._debug('on channel open')
  self._channelReady = true
  self._maybeReady()
}

Peer.prototype._onChannelClose = function () {
  var self = this
  if (self.destroyed) return
  self._debug('on channel close')
  self._destroy()
}

Peer.prototype._onAddStream = function (event) {
  var self = this
  if (self.destroyed) return
  self._debug('on add stream')
  self.emit('stream', event.stream)
}

Peer.prototype._onError = function (err) {
  var self = this
  if (self.destroyed) return
  self._debug('error %s', err.message || err)
  self._destroy(err)
}

Peer.prototype._debug = function () {
  var self = this
  var args = [].slice.call(arguments)
  var id = self.channelName && self.channelName.substring(0, 7)
  args[0] = '[' + id + '] ' + args[0]
  debug.apply(null, args)
}

function getBrowserRTC () {
  if (typeof window === 'undefined') return null
  var wrtc = {
    RTCPeerConnection: window.mozRTCPeerConnection || window.RTCPeerConnection ||
      window.webkitRTCPeerConnection,
    RTCSessionDescription: window.mozRTCSessionDescription ||
      window.RTCSessionDescription || window.webkitRTCSessionDescription,
    RTCIceCandidate: window.mozRTCIceCandidate || window.RTCIceCandidate ||
      window.webkitRTCIceCandidate
  }
  if (!wrtc.RTCPeerConnection) return null
  return wrtc
}

function speedHack (obj) {
  var s = obj.sdp.split('b=AS:30')
  if (s.length > 1) obj.sdp = s[0] + 'b=AS:1638400' + s[1]
}

function noop () {}

}).call(this,require("buffer").Buffer)
},{"buffer":41,"debug":26,"hat":29,"inherits":30,"is-typedarray":31,"once":33,"stream":60,"typedarray-to-buffer":34}],26:[function(require,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

},{"./debug":27}],27:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":28}],28:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],29:[function(require,module,exports){
var hat = module.exports = function (bits, base) {
    if (!base) base = 16;
    if (bits === undefined) bits = 128;
    if (bits <= 0) return '0';
    
    var digits = Math.log(Math.pow(2, bits)) / Math.log(base);
    for (var i = 2; digits === Infinity; i *= 2) {
        digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i;
    }
    
    var rem = digits - Math.floor(digits);
    
    var res = '';
    
    for (var i = 0; i < Math.floor(digits); i++) {
        var x = Math.floor(Math.random() * base).toString(base);
        res = x + res;
    }
    
    if (rem) {
        var b = Math.pow(base, rem);
        var x = Math.floor(Math.random() * b).toString(base);
        res = x + res;
    }
    
    var parsed = parseInt(res, base);
    if (parsed !== Infinity && parsed >= Math.pow(2, bits)) {
        return hat(bits, base)
    }
    else return res;
};

hat.rack = function (bits, base, expandBy) {
    var fn = function (data) {
        var iters = 0;
        do {
            if (iters ++ > 10) {
                if (expandBy) bits += expandBy;
                else throw new Error('too many ID collisions, use more bits')
            }
            
            var id = hat(bits, base);
        } while (Object.hasOwnProperty.call(hats, id));
        
        hats[id] = data;
        return id;
    };
    var hats = fn.hats = {};
    
    fn.get = function (id) {
        return fn.hats[id];
    };
    
    fn.set = function (id, value) {
        fn.hats[id] = value;
        return fn;
    };
    
    fn.bits = bits || 128;
    fn.base = base || 16;
    return fn;
};

},{}],30:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],31:[function(require,module,exports){
module.exports      = isTypedArray
isTypedArray.strict = isStrictTypedArray
isTypedArray.loose  = isLooseTypedArray

var toString = Object.prototype.toString
var names = {
    '[object Int8Array]': true
  , '[object Int16Array]': true
  , '[object Int32Array]': true
  , '[object Uint8Array]': true
  , '[object Uint8ClampedArray]': true
  , '[object Uint16Array]': true
  , '[object Uint32Array]': true
  , '[object Float32Array]': true
  , '[object Float64Array]': true
}

function isTypedArray(arr) {
  return (
       isStrictTypedArray(arr)
    || isLooseTypedArray(arr)
  )
}

function isStrictTypedArray(arr) {
  return (
       arr instanceof Int8Array
    || arr instanceof Int16Array
    || arr instanceof Int32Array
    || arr instanceof Uint8Array
    || arr instanceof Uint8ClampedArray
    || arr instanceof Uint16Array
    || arr instanceof Uint32Array
    || arr instanceof Float32Array
    || arr instanceof Float64Array
  )
}

function isLooseTypedArray(arr) {
  return names[toString.call(arr)]
}

},{}],32:[function(require,module,exports){
// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}

},{}],33:[function(require,module,exports){
var wrappy = require('wrappy')
module.exports = wrappy(once)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

},{"wrappy":32}],34:[function(require,module,exports){
(function (Buffer){
/**
 * Convert a typed array to a Buffer without a copy
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install typedarray-to-buffer`
 */

var isTypedArray = require('is-typedarray').strict

module.exports = function (arr) {
  // If `Buffer` is the browser `buffer` module, and the browser supports typed arrays,
  // then avoid a copy. Otherwise, create a `Buffer` with a copy.
  var constructor = Buffer.TYPED_ARRAY_SUPPORT
    ? Buffer._augment
    : function (arr) { return new Buffer(arr) }

  if (arr instanceof Uint8Array) {
    return constructor(arr)
  } else if (arr instanceof ArrayBuffer) {
    return constructor(new Uint8Array(arr))
  } else if (isTypedArray(arr)) {
    // Use the typed array's underlying ArrayBuffer to back new Buffer. This respects
    // the "view" on the ArrayBuffer, i.e. byteOffset and byteLength. No copy.
    return constructor(new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength))
  } else {
    // Unsupported type, just pass it through to the `Buffer` constructor.
    return new Buffer(arr)
  }
}

}).call(this,require("buffer").Buffer)
},{"buffer":41,"is-typedarray":31}],35:[function(require,module,exports){
'use strict';
module.exports = SortedArray
var search = require('binary-search')

function SortedArray(cmp, arr) {
  if (typeof cmp != 'function')
    throw new TypeError('comparator must be a function')

  this.arr = arr || []
  this.cmp = cmp
}

SortedArray.prototype.insert = function(element) {
  var index = search(this.arr, element, this.cmp)
  if (index < 0)
    index = ~index

  this.arr.splice(index, 0, element)
}

SortedArray.prototype.indexOf = function(element) {
  var index = search(this.arr, element, this.cmp)
  return index >= 0
    ? index
    : -1
}

SortedArray.prototype.remove = function(element) {
  var index = search(this.arr, element, this.cmp)
  if (index < 0)
    return false

  this.arr.splice(index, 1)
  return true
}

},{"binary-search":36}],36:[function(require,module,exports){
module.exports = function(haystack, needle, comparator, low, high) {
  var mid, cmp;

  if(low === undefined)
    low = 0;

  else {
    low = low|0;
    if(low < 0 || low >= haystack.length)
      throw new RangeError("invalid lower bound");
  }

  if(high === undefined)
    high = haystack.length - 1;

  else {
    high = high|0;
    if(high < low || high >= haystack.length)
      throw new RangeError("invalid upper bound");
  }

  while(low <= high) {
    /* Note that "(low + high) >>> 1" may overflow, and results in a typecast
     * to double (which gives the wrong results). */
    mid = low + (high - low >> 1);
    cmp = +comparator(haystack[mid], needle);

    /* Too low. */
    if(cmp < 0.0) 
      low  = mid + 1;

    /* Too high. */
    else if(cmp > 0.0)
      high = mid - 1;
    
    /* Key found. */
    else
      return mid;
  }

  /* Key not found. */
  return ~low;
}

},{}],37:[function(require,module,exports){
var SortedArray = require('sorted-cmp-array');
var Comparator = require('./vvweentry.js').Comparator;
var VVwEEntry = require('./vvweentry.js');

/**
 * \class VVwE
 * \brief class version vector with exception keeps track of events in a 
 * concise way
 * \param e the entry chosen by the local site (1 entry <-> 1 site)
 */
function VVwE(e){
    this.local = new VVwEEntry(e);
    this.vector = new SortedArray(Comparator);
    this.vector.insert(this.local);
};

/*!
 * \brief clone of this vvwe
 */
VVwE.prototype.clone = function(){
    var cloneVVwE = new VVwE(this.local.e);
    for (var i=0; i<this.vector.arr.length; ++i){
        cloneVVwE.vector.arr[i] = new VVwEEntry(this.vector.arr[i].e);
        cloneVVwE.vector.arr[i].v = this.vector.arr[i].v;
        for (var j=0; j<this.vector.arr[i].x.length; ++j){
            cloneVVwE.vector.arr[i].x.push(this.vector.arr[i].x[j]);
        };
        if (cloneVVwE.vector.arr[i].e === this.local.e){
            cloneVVwE.local = cloneVVwE.vector.arr[i];
        };
    };
    return cloneVVwE;
};

VVwE.prototype.fromJSON = function(object){
    for (var i=0; i<object.vector.arr.length; ++i){
        this.vector.arr[i] = new VVwEEntry(object.vector.arr[i].e);
        this.vector.arr[i].v = object.vector.arr[i].v;
        for (var j=0; j<object.vector.arr[i].x.length; ++j){
            this.vector.arr[i].x.push(object.vector.arr[i].x[j]);
        };
        if (object.vector.arr[i].e === object.local.e){
            this.local = this.vector.arr[i];
        };
    };
    return this;
};

/**
 * \brief increment the entry of the vector on local update
 * \return {_e: entry, _c: counter} uniquely identifying the operation
 */
VVwE.prototype.increment = function(){
    this.local.increment();
    return {_e: this.local.e, _c:this.local.v}; 
};


/**
 * \brief increment from a remote operation
 * \param ec the entry and clock of the received event to add supposedly rdy
 * the type is {_e: entry, _c: counter}
 */
VVwE.prototype.incrementFrom = function (ec){
    if (!ec || (ec && !ec._e) || (ec && !ec._c)) {return;}
    // #0 find the entry within the array of VVwEntries
    var index = this.vector.indexOf(ec._e);
    if (index < 0){
        // #1 if the entry does not exist, initialize and increment
        this.vector.insert(new VVwEEntry(ec._e));
        this.vector.arr[this.vector.indexOf(ec._e)].incrementFrom(ec._c);
    } else {
        // #2 otherwise, only increment
        this.vector.arr[index].incrementFrom(ec._c);
    };
};


/**
 * \brief check if the argument are causally ready regards to this vector
 * \param ec the site clock that happen-before the current event
 */
VVwE.prototype.isReady = function(ec){
    var ready = !ec;
    if (!ready){
        var index = this.vector.indexOf(ec._e);
        ready = index >=0 && ec._c <= this.vector.arr[index].v &&
            this.vector.arr[index].x.indexOf(ec._c)<0;
    };
    return ready;
};

/**
 * \brief check if the message contains information already delivered
 * \param ec the site clock to check
 */
VVwE.prototype.isLower = function(ec){
    return (ec && this.isReady(ec));
};

/**
 * \brief merge the version vector in argument with this
 * \param other the other version vector to merge
 */
VVwE.prototype.merge = function(other){
    for (var i = 0; i < other.vector.arr.length; ++i){
        var entry = other.vector.arr[i];
        var index = this.vector.indexOf(entry);
        if (index < 0){
            // #1 entry does not exist, fully copy it
            var newEntry = new VVwEEntry(entry.e);
            newEntry.v = entry.v;
            for (var j = 0; j < entry.x.length; ++j){
                newEntry.x.push(entry.x[j]);
            };
            this.vector.insert(newEntry);
        }else{
            // #2 otherwise merge the entries
            var currEntry = this.vector.arr[i];
            // #2A remove the exception from our vector
            var j = 0;
            while (j<currEntry.x.length){
                if (currEntry.x[j]<entry.v &&
                    entry.x.indexOf(currEntry.x[j])<0){
                    currEntry.x.splice(j, 1);
                } else {
                    ++j;
                };
            };
            // #2B add the new exceptions
            j = 0;
            while (j<entry.x.length){
                if (entry.x[j] > currEntry.v &&
                    currEntry.x.indexOf(entry.x[j])<0){
                    currEntry.x.push(entry.x[j]);
                };
                ++j;
            };
            currEntry.v = Math.max(currEntry.v, entry.v);
        };
    };
};

module.exports = VVwE;


},{"./vvweentry.js":38,"sorted-cmp-array":39}],38:[function(require,module,exports){

/*!
  \brief create an entry of the version vector with exceptions containing the
  index of the entry, the value v that creates a contiguous interval
  from 0 to v, an array of integers that contain the operations lower to v that
  have not been received yet
  \param e the entry in the interval version vector
*/
function VVwEEntry(e){
    this.e = e;   
    this.v = 0;
    this.x = [];
};

/*!
 * \brief local counter incremented
 */
VVwEEntry.prototype.increment = function(){
    this.v += 1;
};

/**
 * \brief increment from a remote operation
 * \param c the counter of the operation to add to this 
 */
VVwEEntry.prototype.incrementFrom = function(c){
    // #1 check if the counter is included in the exceptions
    if (c < this.v){
        var index = this.x.indexOf(c);
        if (index>=0){ // the exception is found
            this.x.splice(index, 1);
        };
    };
    // #2 if the value is +1 compared to the current value of the vector
    if (c == (this.v + 1)){
        this.v += 1;
    };
    // #3 otherwise exception are made
    if (c > (this.v + 1)){
        for (var i = (this.v + 1); i<c; ++i){
            this.x.push(i);
        };
        this.v = c;
    };
};

/*!
 * \brief comparison function between two VVwE entries
 * \param a the first element
 * \param b the second element
 * \return -1 if a < b, 1 if a > b, 0 otherwise
 */
function Comparator (a, b){
    var aEntry = (a.e) || a;
    var bEntry = (b.e) || b;
    if (aEntry < bEntry){ return -1; };
    if (aEntry > bEntry){ return  1; };
    return 0;
};

module.exports = VVwEEntry;
module.exports.Comparator = Comparator;

},{}],39:[function(require,module,exports){
module.exports=require(35)
},{"/Users/chat-wane/Desktop/project/jquery-crate/node_modules/crate-core/node_modules/spray-wrtc/node_modules/sorted-cmp-array/index.js":35,"binary-search":40}],40:[function(require,module,exports){
module.exports=require(36)
},{"/Users/chat-wane/Desktop/project/jquery-crate/node_modules/crate-core/node_modules/spray-wrtc/node_modules/sorted-cmp-array/node_modules/binary-search/index.js":36}],41:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var kMaxLength = 0x3fffffff

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Find the length
  var length
  if (type === 'number')
    length = subject > 0 ? subject >>> 0 : 0
  else if (type === 'string') {
    if (encoding === 'base64')
      subject = base64clean(subject)
    length = Buffer.byteLength(subject, encoding)
  } else if (type === 'object' && subject !== null) { // assume object is array-like
    if (subject.type === 'Buffer' && isArray(subject.data))
      subject = subject.data
    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
  } else
    throw new TypeError('must start with number, buffer, array or string')

  if (this.length > kMaxLength)
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
      'size: 0x' + kMaxLength.toString(16) + ' bytes')

  var buf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    if (Buffer.isBuffer(subject)) {
      for (i = 0; i < length; i++)
        buf[i] = subject.readUInt8(i)
    } else {
      for (i = 0; i < length; i++)
        buf[i] = ((subject[i] % 256) + 256) % 256
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

Buffer.isBuffer = function (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
    throw new TypeError('Arguments must be Buffers')

  var x = a.length
  var y = b.length
  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
  if (i !== len) {
    x = a[i]
    y = b[i]
  }
  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function (list, totalLength) {
  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (totalLength === undefined) {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    case 'hex':
      ret = str.length >>> 1
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    default:
      ret = str.length
  }
  return ret
}

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function (encoding, start, end) {
  var loweredCase = false

  start = start >>> 0
  end = end === undefined || end === Infinity ? this.length : end >>> 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase)
          throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.equals = function (b) {
  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max)
      str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b)
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(byte)) throw new Error('Invalid hex string')
    buf[offset + i] = byte
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function asciiWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function utf16leWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leWrite(this, string, offset, length)
      break
    default:
      throw new TypeError('Unknown encoding: ' + encoding)
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function binarySlice (buf, start, end) {
  return asciiSlice(buf, start, end)
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len;
    if (start < 0)
      start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0)
      end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start)
    end = start

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0)
    throw new RangeError('offset is not uint')
  if (offset + ext > length)
    throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80))
    return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  if (end < start) throw new TypeError('sourceEnd < sourceStart')
  if (target_start < 0 || target_start >= target.length)
    throw new TypeError('targetStart out of bounds')
  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new TypeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F) {
      byteArray.push(b)
    } else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++) {
        byteArray.push(parseInt(h[j], 16))
      }
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":42,"ieee754":43,"is-array":44}],42:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],43:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],44:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],45:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],46:[function(require,module,exports){
module.exports=require(30)
},{"/Users/chat-wane/Desktop/project/jquery-crate/node_modules/crate-core/node_modules/spray-wrtc/node_modules/simple-peer/node_modules/inherits/inherits_browser.js":30}],47:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],48:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],49:[function(require,module,exports){
module.exports = require("./lib/_stream_duplex.js")

},{"./lib/_stream_duplex.js":50}],50:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

module.exports = Duplex;

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}
/*</replacement>*/


/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

forEach(objectKeys(Writable.prototype), function(method) {
  if (!Duplex.prototype[method])
    Duplex.prototype[method] = Writable.prototype[method];
});

function Duplex(options) {
  if (!(this instanceof Duplex))
    return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false)
    this.readable = false;

  if (options && options.writable === false)
    this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false)
    this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended)
    return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  process.nextTick(this.end.bind(this));
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

}).call(this,require('_process'))
},{"./_stream_readable":52,"./_stream_writable":54,"_process":48,"core-util-is":55,"inherits":46}],51:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};

},{"./_stream_transform":53,"core-util-is":55,"inherits":46}],52:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/


/*<replacement>*/
var Buffer = require('buffer').Buffer;
/*</replacement>*/

Readable.ReadableState = ReadableState;

var EE = require('events').EventEmitter;

/*<replacement>*/
if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

var Stream = require('stream');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var StringDecoder;

util.inherits(Readable, Stream);

function ReadableState(options, stream) {
  options = options || {};

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.buffer = [];
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = false;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // In streams that never have any data, and do push(null) right away,
  // the consumer can miss the 'end' event if they do some I/O before
  // consuming the stream.  So, we don't emit('end') until some reading
  // happens.
  this.calledRead = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, becuase any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;


  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder)
      StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  if (!(this instanceof Readable))
    return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function(chunk, encoding) {
  var state = this._readableState;

  if (typeof chunk === 'string' && !state.objectMode) {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = new Buffer(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function(chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null || chunk === undefined) {
    state.reading = false;
    if (!state.ended)
      onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var e = new Error('stream.unshift() after end event');
      stream.emit('error', e);
    } else {
      if (state.decoder && !addToFront && !encoding)
        chunk = state.decoder.write(chunk);

      // update the buffer info.
      state.length += state.objectMode ? 1 : chunk.length;
      if (addToFront) {
        state.buffer.unshift(chunk);
      } else {
        state.reading = false;
        state.buffer.push(chunk);
      }

      if (state.needReadable)
        emitReadable(stream);

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}



// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended &&
         (state.needReadable ||
          state.length < state.highWaterMark ||
          state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function(enc) {
  if (!StringDecoder)
    StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
};

// Don't raise the hwm > 128MB
var MAX_HWM = 0x800000;
function roundUpToNextPowerOf2(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2
    n--;
    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
    n++;
  }
  return n;
}

function howMuchToRead(n, state) {
  if (state.length === 0 && state.ended)
    return 0;

  if (state.objectMode)
    return n === 0 ? 0 : 1;

  if (n === null || isNaN(n)) {
    // only flow one buffer at a time
    if (state.flowing && state.buffer.length)
      return state.buffer[0].length;
    else
      return state.length;
  }

  if (n <= 0)
    return 0;

  // If we're asking for more than the target buffer level,
  // then raise the water mark.  Bump up to the next highest
  // power of 2, to prevent increasing it excessively in tiny
  // amounts.
  if (n > state.highWaterMark)
    state.highWaterMark = roundUpToNextPowerOf2(n);

  // don't have that much.  return null, unless we've ended.
  if (n > state.length) {
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    } else
      return state.length;
  }

  return n;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function(n) {
  var state = this._readableState;
  state.calledRead = true;
  var nOrig = n;
  var ret;

  if (typeof n !== 'number' || n > 0)
    state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 &&
      state.needReadable &&
      (state.length >= state.highWaterMark || state.ended)) {
    emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    ret = null;

    // In cases where the decoder did not receive enough data
    // to produce a full chunk, then immediately received an
    // EOF, state.buffer will contain [<Buffer >, <Buffer 00 ...>].
    // howMuchToRead will see this and coerce the amount to
    // read to zero (because it's looking at the length of the
    // first <Buffer > in state.buffer), and we'll end up here.
    //
    // This can only happen via state.decoder -- no other venue
    // exists for pushing a zero-length chunk into state.buffer
    // and triggering this behavior. In this case, we return our
    // remaining data and end the stream, if appropriate.
    if (state.length > 0 && state.decoder) {
      ret = fromList(n, state);
      state.length -= ret.length;
    }

    if (state.length === 0)
      endReadable(this);

    return ret;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;

  // if we currently have less than the highWaterMark, then also read some
  if (state.length - n <= state.highWaterMark)
    doRead = true;

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading)
    doRead = false;

  if (doRead) {
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0)
      state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
  }

  // If _read called its callback synchronously, then `reading`
  // will be false, and we need to re-evaluate how much data we
  // can return to the user.
  if (doRead && !state.reading)
    n = howMuchToRead(nOrig, state);

  if (n > 0)
    ret = fromList(n, state);
  else
    ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  }

  state.length -= n;

  // If we have nothing in the buffer, then we want to know
  // as soon as we *do* get something into the buffer.
  if (state.length === 0 && !state.ended)
    state.needReadable = true;

  // If we happened to read() exactly the remaining amount in the
  // buffer, and the EOF has been seen at this point, then make sure
  // that we emit 'end' on the very next tick.
  if (state.ended && !state.endEmitted && state.length === 0)
    endReadable(this);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) &&
      'string' !== typeof chunk &&
      chunk !== null &&
      chunk !== undefined &&
      !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}


function onEofChunk(stream, state) {
  if (state.decoder && !state.ended) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // if we've ended and we have some data left, then emit
  // 'readable' now to make sure it gets picked up.
  if (state.length > 0)
    emitReadable(stream);
  else
    endReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (state.emittedReadable)
    return;

  state.emittedReadable = true;
  if (state.sync)
    process.nextTick(function() {
      emitReadable_(stream);
    });
  else
    emitReadable_(stream);
}

function emitReadable_(stream) {
  stream.emit('readable');
}


// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(function() {
      maybeReadMore_(stream, state);
    });
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended &&
         state.length < state.highWaterMark) {
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;
    else
      len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function(n) {
  this.emit('error', new Error('not implemented'));
};

Readable.prototype.pipe = function(dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;

  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
              dest !== process.stdout &&
              dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted)
    process.nextTick(endFn);
  else
    src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    if (readable !== src) return;
    cleanup();
  }

  function onend() {
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  function cleanup() {
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (!dest._writableState || dest._writableState.needDrain)
      ondrain();
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    unpipe();
    dest.removeListener('error', onerror);
    if (EE.listenerCount(dest, 'error') === 0)
      dest.emit('error', er);
  }
  // This is a brutally ugly hack to make sure that our error handler
  // is attached before any userland ones.  NEVER DO THIS.
  if (!dest._events || !dest._events.error)
    dest.on('error', onerror);
  else if (isArray(dest._events.error))
    dest._events.error.unshift(onerror);
  else
    dest._events.error = [onerror, dest._events.error];



  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    // the handler that waits for readable events after all
    // the data gets sucked out in flow.
    // This would be easier to follow with a .once() handler
    // in flow(), but that is too slow.
    this.on('readable', pipeOnReadable);

    state.flowing = true;
    process.nextTick(function() {
      flow(src);
    });
  }

  return dest;
};

function pipeOnDrain(src) {
  return function() {
    var dest = this;
    var state = src._readableState;
    state.awaitDrain--;
    if (state.awaitDrain === 0)
      flow(src);
  };
}

function flow(src) {
  var state = src._readableState;
  var chunk;
  state.awaitDrain = 0;

  function write(dest, i, list) {
    var written = dest.write(chunk);
    if (false === written) {
      state.awaitDrain++;
    }
  }

  while (state.pipesCount && null !== (chunk = src.read())) {

    if (state.pipesCount === 1)
      write(state.pipes, 0, null);
    else
      forEach(state.pipes, write);

    src.emit('data', chunk);

    // if anyone needs a drain, then we have to wait for that.
    if (state.awaitDrain > 0)
      return;
  }

  // if every destination was unpiped, either before entering this
  // function, or in the while loop, then stop flowing.
  //
  // NB: This is a pretty rare edge case.
  if (state.pipesCount === 0) {
    state.flowing = false;

    // if there were data event listeners added, then switch to old mode.
    if (EE.listenerCount(src, 'data') > 0)
      emitDataEvents(src);
    return;
  }

  // at this point, no one needed a drain, so we just ran out of data
  // on the next readable event, start it over again.
  state.ranOut = true;
}

function pipeOnReadable() {
  if (this._readableState.ranOut) {
    this._readableState.ranOut = false;
    flow(this);
  }
}


Readable.prototype.unpipe = function(dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0)
    return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes)
      return this;

    if (!dest)
      dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    this.removeListener('readable', pipeOnReadable);
    state.flowing = false;
    if (dest)
      dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    this.removeListener('readable', pipeOnReadable);
    state.flowing = false;

    for (var i = 0; i < len; i++)
      dests[i].emit('unpipe', this);
    return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1)
    return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1)
    state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function(ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data' && !this._readableState.flowing)
    emitDataEvents(this);

  if (ev === 'readable' && this.readable) {
    var state = this._readableState;
    if (!state.readableListening) {
      state.readableListening = true;
      state.emittedReadable = false;
      state.needReadable = true;
      if (!state.reading) {
        this.read(0);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function() {
  emitDataEvents(this);
  this.read(0);
  this.emit('resume');
};

Readable.prototype.pause = function() {
  emitDataEvents(this, true);
  this.emit('pause');
};

function emitDataEvents(stream, startPaused) {
  var state = stream._readableState;

  if (state.flowing) {
    // https://github.com/isaacs/readable-stream/issues/16
    throw new Error('Cannot switch to old mode now.');
  }

  var paused = startPaused || false;
  var readable = false;

  // convert to an old-style stream.
  stream.readable = true;
  stream.pipe = Stream.prototype.pipe;
  stream.on = stream.addListener = Stream.prototype.on;

  stream.on('readable', function() {
    readable = true;

    var c;
    while (!paused && (null !== (c = stream.read())))
      stream.emit('data', c);

    if (c === null) {
      readable = false;
      stream._readableState.needReadable = true;
    }
  });

  stream.pause = function() {
    paused = true;
    this.emit('pause');
  };

  stream.resume = function() {
    paused = false;
    if (readable)
      process.nextTick(function() {
        stream.emit('readable');
      });
    else
      this.read(0);
    this.emit('resume');
  };

  // now make it start, just in case it hadn't already.
  stream.emit('readable');
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function(stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function() {
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length)
        self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function(chunk) {
    if (state.decoder)
      chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    //if (state.objectMode && util.isNullOrUndefined(chunk))
    if (state.objectMode && (chunk === null || chunk === undefined))
      return;
    else if (!state.objectMode && (!chunk || !chunk.length))
      return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (typeof stream[i] === 'function' &&
        typeof this[i] === 'undefined') {
      this[i] = function(method) { return function() {
        return stream[method].apply(stream, arguments);
      }}(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function(ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function(n) {
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};



// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
function fromList(n, state) {
  var list = state.buffer;
  var length = state.length;
  var stringMode = !!state.decoder;
  var objectMode = !!state.objectMode;
  var ret;

  // nothing in the list, definitely empty.
  if (list.length === 0)
    return null;

  if (length === 0)
    ret = null;
  else if (objectMode)
    ret = list.shift();
  else if (!n || n >= length) {
    // read it all, truncate the array.
    if (stringMode)
      ret = list.join('');
    else
      ret = Buffer.concat(list, length);
    list.length = 0;
  } else {
    // read just some of it.
    if (n < list[0].length) {
      // just take a part of the first list item.
      // slice is the same for buffers and strings.
      var buf = list[0];
      ret = buf.slice(0, n);
      list[0] = buf.slice(n);
    } else if (n === list[0].length) {
      // first list is a perfect match
      ret = list.shift();
    } else {
      // complex case.
      // we have enough to cover it, but it spans past the first buffer.
      if (stringMode)
        ret = '';
      else
        ret = new Buffer(n);

      var c = 0;
      for (var i = 0, l = list.length; i < l && c < n; i++) {
        var buf = list[0];
        var cpy = Math.min(n - c, buf.length);

        if (stringMode)
          ret += buf.slice(0, cpy);
        else
          buf.copy(ret, c, 0, cpy);

        if (cpy < buf.length)
          list[0] = buf.slice(cpy);
        else
          list.shift();

        c += cpy;
      }
    }
  }

  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0)
    throw new Error('endReadable called on non-empty stream');

  if (!state.endEmitted && state.calledRead) {
    state.ended = true;
    process.nextTick(function() {
      // Check that we didn't get one last unshift.
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
      }
    });
  }
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf (xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

}).call(this,require('_process'))
},{"_process":48,"buffer":41,"core-util-is":55,"events":45,"inherits":46,"isarray":47,"stream":60,"string_decoder/":61}],53:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);


function TransformState(options, stream) {
  this.afterTransform = function(er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb)
    return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined)
    stream.push(data);

  if (cb)
    cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}


function Transform(options) {
  if (!(this instanceof Transform))
    return new Transform(options);

  Duplex.call(this, options);

  var ts = this._transformState = new TransformState(options, this);

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  this.once('finish', function() {
    if ('function' === typeof this._flush)
      this._flush(function(er) {
        done(stream, er);
      });
    else
      done(stream);
  });
}

Transform.prototype.push = function(chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function(chunk, encoding, cb) {
  throw new Error('not implemented');
};

Transform.prototype._write = function(chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform ||
        rs.needReadable ||
        rs.length < rs.highWaterMark)
      this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function(n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};


function done(stream, er) {
  if (er)
    return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var rs = stream._readableState;
  var ts = stream._transformState;

  if (ws.length)
    throw new Error('calling transform done when ws.length != 0');

  if (ts.transforming)
    throw new Error('calling transform done when still transforming');

  return stream.push(null);
}

},{"./_stream_duplex":50,"core-util-is":55,"inherits":46}],54:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, cb), and it'll handle all
// the drain event emission and buffering.

module.exports = Writable;

/*<replacement>*/
var Buffer = require('buffer').Buffer;
/*</replacement>*/

Writable.WritableState = WritableState;


/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Stream = require('stream');

util.inherits(Writable, Stream);

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
}

function WritableState(options, stream) {
  options = options || {};

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, becuase any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function(er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.buffer = [];

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;
}

function Writable(options) {
  var Duplex = require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable) && !(this instanceof Duplex))
    return new Writable(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function() {
  this.emit('error', new Error('Cannot pipe. Not readable.'));
};


function writeAfterEnd(stream, state, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  process.nextTick(function() {
    cb(er);
  });
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  if (!Buffer.isBuffer(chunk) &&
      'string' !== typeof chunk &&
      chunk !== null &&
      chunk !== undefined &&
      !state.objectMode) {
    var er = new TypeError('Invalid non-string/buffer chunk');
    stream.emit('error', er);
    process.nextTick(function() {
      cb(er);
    });
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function(chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (Buffer.isBuffer(chunk))
    encoding = 'buffer';
  else if (!encoding)
    encoding = state.defaultEncoding;

  if (typeof cb !== 'function')
    cb = function() {};

  if (state.ended)
    writeAfterEnd(this, state, cb);
  else if (validChunk(this, state, chunk, cb))
    ret = writeOrBuffer(this, state, chunk, encoding, cb);

  return ret;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode &&
      state.decodeStrings !== false &&
      typeof chunk === 'string') {
    chunk = new Buffer(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);
  if (Buffer.isBuffer(chunk))
    encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret)
    state.needDrain = true;

  if (state.writing)
    state.buffer.push(new WriteReq(chunk, encoding, cb));
  else
    doWrite(stream, state, len, chunk, encoding, cb);

  return ret;
}

function doWrite(stream, state, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  if (sync)
    process.nextTick(function() {
      cb(er);
    });
  else
    cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er)
    onwriteError(stream, state, sync, er, cb);
  else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(stream, state);

    if (!finished && !state.bufferProcessing && state.buffer.length)
      clearBuffer(stream, state);

    if (sync) {
      process.nextTick(function() {
        afterWrite(stream, state, finished, cb);
      });
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished)
    onwriteDrain(stream, state);
  cb();
  if (finished)
    finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}


// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;

  for (var c = 0; c < state.buffer.length; c++) {
    var entry = state.buffer[c];
    var chunk = entry.chunk;
    var encoding = entry.encoding;
    var cb = entry.callback;
    var len = state.objectMode ? 1 : chunk.length;

    doWrite(stream, state, len, chunk, encoding, cb);

    // if we didn't call the onwrite immediately, then
    // it means that we need to wait until it does.
    // also, that means that the chunk and cb are currently
    // being processed, so move the buffer counter past them.
    if (state.writing) {
      c++;
      break;
    }
  }

  state.bufferProcessing = false;
  if (c < state.buffer.length)
    state.buffer = state.buffer.slice(c);
  else
    state.buffer.length = 0;
}

Writable.prototype._write = function(chunk, encoding, cb) {
  cb(new Error('not implemented'));
};

Writable.prototype.end = function(chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (typeof chunk !== 'undefined' && chunk !== null)
    this.write(chunk, encoding);

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished)
    endWritable(this, state, cb);
};


function needFinish(stream, state) {
  return (state.ending &&
          state.length === 0 &&
          !state.finished &&
          !state.writing);
}

function finishMaybe(stream, state) {
  var need = needFinish(stream, state);
  if (need) {
    state.finished = true;
    stream.emit('finish');
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished)
      process.nextTick(cb);
    else
      stream.once('finish', cb);
  }
  state.ended = true;
}

}).call(this,require('_process'))
},{"./_stream_duplex":50,"_process":48,"buffer":41,"core-util-is":55,"inherits":46,"stream":60}],55:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

function isBuffer(arg) {
  return Buffer.isBuffer(arg);
}
exports.isBuffer = isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}
}).call(this,require("buffer").Buffer)
},{"buffer":41}],56:[function(require,module,exports){
module.exports = require("./lib/_stream_passthrough.js")

},{"./lib/_stream_passthrough.js":51}],57:[function(require,module,exports){
var Stream = require('stream'); // hack to fix a circular dependency issue when used with browserify
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = Stream;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":50,"./lib/_stream_passthrough.js":51,"./lib/_stream_readable.js":52,"./lib/_stream_transform.js":53,"./lib/_stream_writable.js":54,"stream":60}],58:[function(require,module,exports){
module.exports = require("./lib/_stream_transform.js")

},{"./lib/_stream_transform.js":53}],59:[function(require,module,exports){
module.exports = require("./lib/_stream_writable.js")

},{"./lib/_stream_writable.js":54}],60:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":45,"inherits":46,"readable-stream/duplex.js":49,"readable-stream/passthrough.js":56,"readable-stream/readable.js":57,"readable-stream/transform.js":58,"readable-stream/writable.js":59}],61:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = require('buffer').Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}

},{"buffer":41}],62:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],63:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":62,"_process":48,"inherits":46}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9jcmF0aWZ5LmpzIiwibGliL21vZGVsL21vZGVsLmpzIiwibGliL21vZGVsL3NpZ25hbGluZy5qcyIsIm5vZGVfbW9kdWxlcy9jcmF0ZS1jb3JlL2xpYi9jcmF0ZS1jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2NyYXRlLWNvcmUvbGliL2d1aWQuanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9saWIvbWVzc2FnZXMuanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9ub2RlX21vZHVsZXMvY2F1c2FsLWJyb2FkY2FzdC1kZWZpbml0aW9uL2xpYi9jYXVzYWxicm9hZGNhc3QuanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9ub2RlX21vZHVsZXMvY2F1c2FsLWJyb2FkY2FzdC1kZWZpbml0aW9uL2xpYi9tZXNzYWdlcy5qcyIsIm5vZGVfbW9kdWxlcy9jcmF0ZS1jb3JlL25vZGVfbW9kdWxlcy9jYXVzYWwtYnJvYWRjYXN0LWRlZmluaXRpb24vbm9kZV9tb2R1bGVzL3VuaWNhc3QtZGVmaW5pdGlvbi9saWIvbWVzc2FnZXMuanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9ub2RlX21vZHVsZXMvY2F1c2FsLWJyb2FkY2FzdC1kZWZpbml0aW9uL25vZGVfbW9kdWxlcy91bmljYXN0LWRlZmluaXRpb24vbGliL3VuaWNhc3QuanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9ub2RlX21vZHVsZXMvbHNlcXRyZWUvbGliL2Jhc2UuanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9ub2RlX21vZHVsZXMvbHNlcXRyZWUvbGliL2lkZW50aWZpZXIuanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9ub2RlX21vZHVsZXMvbHNlcXRyZWUvbGliL2xzZXFub2RlLmpzIiwibm9kZV9tb2R1bGVzL2NyYXRlLWNvcmUvbm9kZV9tb2R1bGVzL2xzZXF0cmVlL2xpYi9sc2VxdHJlZS5qcyIsIm5vZGVfbW9kdWxlcy9jcmF0ZS1jb3JlL25vZGVfbW9kdWxlcy9sc2VxdHJlZS9saWIvc3RyYXRlZ3kuanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9ub2RlX21vZHVsZXMvbHNlcXRyZWUvbGliL3RyaXBsZS5qcyIsIm5vZGVfbW9kdWxlcy9jcmF0ZS1jb3JlL25vZGVfbW9kdWxlcy9sc2VxdHJlZS9saWIvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9jcmF0ZS1jb3JlL25vZGVfbW9kdWxlcy9sc2VxdHJlZS9ub2RlX21vZHVsZXMvQmlnSW50L3NyYy9CaWdJbnQuanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9ub2RlX21vZHVsZXMvc3ByYXktd3J0Yy9saWIvbWVzc2FnZXMuanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9ub2RlX21vZHVsZXMvc3ByYXktd3J0Yy9saWIvcGFydGlhbHZpZXcuanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9ub2RlX21vZHVsZXMvc3ByYXktd3J0Yy9saWIvc29ja2V0cy5qcyIsIm5vZGVfbW9kdWxlcy9jcmF0ZS1jb3JlL25vZGVfbW9kdWxlcy9zcHJheS13cnRjL2xpYi9zcHJheS5qcyIsIm5vZGVfbW9kdWxlcy9jcmF0ZS1jb3JlL25vZGVfbW9kdWxlcy9zcHJheS13cnRjL25vZGVfbW9kdWxlcy9zaW1wbGUtcGVlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jcmF0ZS1jb3JlL25vZGVfbW9kdWxlcy9zcHJheS13cnRjL25vZGVfbW9kdWxlcy9zaW1wbGUtcGVlci9ub2RlX21vZHVsZXMvZGVidWcvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9jcmF0ZS1jb3JlL25vZGVfbW9kdWxlcy9zcHJheS13cnRjL25vZGVfbW9kdWxlcy9zaW1wbGUtcGVlci9ub2RlX21vZHVsZXMvZGVidWcvZGVidWcuanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9ub2RlX21vZHVsZXMvc3ByYXktd3J0Yy9ub2RlX21vZHVsZXMvc2ltcGxlLXBlZXIvbm9kZV9tb2R1bGVzL2RlYnVnL25vZGVfbW9kdWxlcy9tcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jcmF0ZS1jb3JlL25vZGVfbW9kdWxlcy9zcHJheS13cnRjL25vZGVfbW9kdWxlcy9zaW1wbGUtcGVlci9ub2RlX21vZHVsZXMvaGF0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NyYXRlLWNvcmUvbm9kZV9tb2R1bGVzL3NwcmF5LXdydGMvbm9kZV9tb2R1bGVzL3NpbXBsZS1wZWVyL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2NyYXRlLWNvcmUvbm9kZV9tb2R1bGVzL3NwcmF5LXdydGMvbm9kZV9tb2R1bGVzL3NpbXBsZS1wZWVyL25vZGVfbW9kdWxlcy9pcy10eXBlZGFycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NyYXRlLWNvcmUvbm9kZV9tb2R1bGVzL3NwcmF5LXdydGMvbm9kZV9tb2R1bGVzL3NpbXBsZS1wZWVyL25vZGVfbW9kdWxlcy9vbmNlL25vZGVfbW9kdWxlcy93cmFwcHkvd3JhcHB5LmpzIiwibm9kZV9tb2R1bGVzL2NyYXRlLWNvcmUvbm9kZV9tb2R1bGVzL3NwcmF5LXdydGMvbm9kZV9tb2R1bGVzL3NpbXBsZS1wZWVyL25vZGVfbW9kdWxlcy9vbmNlL29uY2UuanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9ub2RlX21vZHVsZXMvc3ByYXktd3J0Yy9ub2RlX21vZHVsZXMvc2ltcGxlLXBlZXIvbm9kZV9tb2R1bGVzL3R5cGVkYXJyYXktdG8tYnVmZmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NyYXRlLWNvcmUvbm9kZV9tb2R1bGVzL3NwcmF5LXdydGMvbm9kZV9tb2R1bGVzL3NvcnRlZC1jbXAtYXJyYXkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9ub2RlX21vZHVsZXMvc3ByYXktd3J0Yy9ub2RlX21vZHVsZXMvc29ydGVkLWNtcC1hcnJheS9ub2RlX21vZHVsZXMvYmluYXJ5LXNlYXJjaC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jcmF0ZS1jb3JlL25vZGVfbW9kdWxlcy92ZXJzaW9uLXZlY3Rvci13aXRoLWV4Y2VwdGlvbnMvbGliL3Z2d2UuanMiLCJub2RlX21vZHVsZXMvY3JhdGUtY29yZS9ub2RlX21vZHVsZXMvdmVyc2lvbi12ZWN0b3Itd2l0aC1leGNlcHRpb25zL2xpYi92dndlZW50cnkuanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWIvYjY0LmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pcy1hcnJheS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2R1cGxleC5qcyIsIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3JlYWRhYmxlLXN0cmVhbS9saWIvX3N0cmVhbV9kdXBsZXguanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fcGFzc3Rocm91Z2guanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fcmVhZGFibGUuanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vbGliL19zdHJlYW1fdHJhbnNmb3JtLmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL2xpYi9fc3RyZWFtX3dyaXRhYmxlLmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL25vZGVfbW9kdWxlcy9jb3JlLXV0aWwtaXMvbGliL3V0aWwuanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vcGFzc3Rocm91Z2guanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vcmVhZGFibGUuanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9yZWFkYWJsZS1zdHJlYW0vdHJhbnNmb3JtLmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcmVhZGFibGUtc3RyZWFtL3dyaXRhYmxlLmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvc3RyZWFtLWJyb3dzZXJpZnkvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9zdHJpbmdfZGVjb2Rlci9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3V0aWwvc3VwcG9ydC9pc0J1ZmZlckJyb3dzZXIuanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy91dGlsL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3RMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3Z0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzltQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25nQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN1NBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4OUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBNb2RlbCA9IHJlcXVpcmUoJy4vbW9kZWwvbW9kZWwuanMnKTtcblxuJC5mbi5jcmF0aWZ5ID0gZnVuY3Rpb24ob3B0aW9ucywgc2Vzc2lvbil7XG4gICAgXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAnaGVhZGVyQmFja2dyb3VuZENvbG9yJzogJyMyNDJiMzInLFxuICAgICAgICAnaGVhZGVyQ29sb3InOiAnI2VjZWNlYycsXG4gICAgICAgICdlZGl0b3JCYWNrZ3JvdW5kQ29sb3InOiAnI2ZmZmZmZicsXG4gICAgICAgICdlZGl0b3JIZWlnaHQnOiAnNDAwcHgnXG4gICAgfTtcbiAgICBcbiAgICB2YXIgcGFyYW1ldGVycyA9ICQuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICBcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vICNBIGNyZWF0ZSB0aGUgaGVhZGVyXG4gICAgICAgIHZhciBoZWFkZXIgPSBqUXVlcnkoJzxkaXY+JykuYXBwZW5kVG8odGhpcylcbiAgICAgICAgICAgIC5jc3MoJ3dpZHRoJywgJzEwMCUnKVxuICAgICAgICAgICAgLmNzcygnYm94LXNoYWRvdycsICcwcHggMXB4IDVweCAjYWJhYmFiJylcbiAgICAgICAgICAgIC5jc3MoJ2JvcmRlci10b3AtbGVmdC1yYWRpdXMnLCAnNHB4JylcbiAgICAgICAgICAgIC5jc3MoJ2JvcmRlci10b3AtcmlnaHQtcmFkaXVzJywgJzRweCcpXG4gICAgICAgICAgICAuY3NzKCdjb2xvcicsIHBhcmFtZXRlcnMuaGVhZGVyQ29sb3IpXG4gICAgICAgICAgICAuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgcGFyYW1ldGVycy5oZWFkZXJCYWNrZ3JvdW5kQ29sb3IpO1xuXG4gICAgICAgIHZhciBoZWFkZXJDb250YWluZXIgPSBqUXVlcnkoJzxkaXY+JykuYXBwZW5kVG8oaGVhZGVyKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdjb250YWluZXInKTsgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgLy8gRGl2aWRlIHRoZSBoZWFkZXIgaW4gdGhyZWUgcGFydCB3aXRoIGRpZmZlcmVudCBwdXJwb3NlXG4gICAgICAgIHZhciBoZWFkZXJMZWZ0ID0galF1ZXJ5KCc8ZGl2PicpLmFwcGVuZFRvKGhlYWRlckNvbnRhaW5lcilcbiAgICAgICAgICAgIC5hZGRDbGFzcygncHVsbC1sZWZ0JylcbiAgICAgICAgICAgIC5jc3MoJ3BhZGRpbmctdG9wJywnMTBweCcpXG4gICAgICAgICAgICAuY3NzKCdwYWRkaW5nLWJvdHRvbScsJzEwcHgnKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBoZWFkZXJSaWdodFJpZ2h0ID0galF1ZXJ5KCc8ZGl2PicpLmFwcGVuZFRvKGhlYWRlckNvbnRhaW5lcilcbiAgICAgICAgICAgIC5hZGRDbGFzcygncHVsbC1yaWdodCcpXG4gICAgICAgICAgICAuY3NzKCdwYWRkaW5nLXRvcCcsJzEwcHgnKVxuICAgICAgICAgICAgLmNzcygncGFkZGluZy1ib3R0b20nLCcxMHB4JylcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsJzM0cHgnKTtcblxuICAgICAgICB2YXIgaGVhZGVyUmlnaHRMZWZ0ID0galF1ZXJ5KCc8ZGl2PicpLmFwcGVuZFRvKGhlYWRlckNvbnRhaW5lcilcbiAgICAgICAgICAgIC5hZGRDbGFzcygncHVsbC1yaWdodCcpXG4gICAgICAgICAgICAuY3NzKCdwYWRkaW5nLXRvcCcsJzEwcHgnKVxuICAgICAgICAgICAgLmNzcygncGFkZGluZy1ib3R0b20nLCcxMHB4JylcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsJzM0cHgnKTtcblxuICAgICAgICAvLyBDb250YWlucyBkYXRhIGFib3V0IHRoZSBkb2N1bWVudFxuICAgICAgICB2YXIgYnV0dG9uRmlsZSA9IGpRdWVyeSgnPGE+JykuYXBwZW5kVG8oaGVhZGVyTGVmdClcbiAgICAgICAgICAgIC5hdHRyKCdocmVmJywnIycpXG4gICAgICAgICAgICAuYXR0cignZGF0YS10cmlnZ2VyJywgJ2hvdmVyJykuYXR0cignZGF0YS10b2dnbGUnLCAncG9wb3ZlcicpXG4gICAgICAgICAgICAuYXR0cignZGF0YS1wbGFjZW1lbnQnLCAnYm90dG9tJykuYXR0cignZGF0YS1odG1sJywgJ3RydWUnKVxuICAgICAgICAgICAgLmF0dHIoJ3RpdGxlJywnRG9jdW1lbnQnKS5hdHRyKCdkYXRhLWNvbnRlbnQnLCAnJylcbiAgICAgICAgICAgIC5jc3MoJ2NvbG9yJywgJ2JsYWNrJykuYWRkQ2xhc3MoJ2NyYXRlLWljb24nKVxuICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywnMzRweCcpO1xuXG4gICAgICAgIC8vIENvbnRhaW5zIGF3YXJlbmVzcyBpbmZvcm1hdGlvbiBzdWNoIGFzIG5ldHdvcmsgc3RhdGVcbiAgICAgICAgdmFyIHNpZ25hbGluZ1N0YXRlID0galF1ZXJ5KCc8aT4nKS5hcHBlbmRUbyhoZWFkZXJSaWdodExlZnQpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhIGZhLWNpcmNsZS1vLW5vdGNoIGZhLTJ4JylcbiAgICAgICAgICAgIC5hdHRyKCdkYXRhLXRyaWdnZXInLCAnaG92ZXInKS5hdHRyKCdkYXRhLXRvZ2dsZScsICdwb3BvdmVyJylcbiAgICAgICAgICAgIC5hdHRyKCd0aXRsZScsICdTaWduYWxpbmcgc2VydmVyIHN0YXR1cycpXG4gICAgICAgICAgICAuYXR0cignZGF0YS1odG1sJywgJ3RydWUnKS5hdHRyKCdkYXRhLWNvbnRlbnQnLCAnJylcbiAgICAgICAgICAgIC5hdHRyKCdkYXRhLXBsYWNlbWVudCcsICdib3R0b20nKVxuICAgICAgICAgICAgLmNzcygnbWFyZ2luLXJpZ2h0JywgJzEwcHgnKVxuICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywnMzRweCcpXG4gICAgICAgICAgICAuY3NzKCd3aWR0aCcsJzM0cHgnKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBuZXR3b3JrU3RhdGUgPSBqUXVlcnkoJzxpPicpLmFwcGVuZFRvKGhlYWRlclJpZ2h0TGVmdClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmEgZmEtZ2xvYmUgZmEtMngnKVxuICAgICAgICAgICAgLmF0dHIoJ2RhdGEtdHJpZ2dlcicsICdob3ZlcicpLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ3BvcG92ZXInKVxuICAgICAgICAgICAgLmF0dHIoJ3RpdGxlJywgJ05ldHdvcmsgc3RhdHVzJylcbiAgICAgICAgICAgIC5hdHRyKCdkYXRhLWh0bWwnLCAndHJ1ZScpXG4gICAgICAgICAgICAuYXR0cignZGF0YS1jb250ZW50JywgJ0Rpc2Nvbm5lY3RlZDogeW91IGFyZSBjdXJyZW50bHknK1xuICAgICAgICAgICAgICAgICAgJ2VkaXRpbmcgPHNwYW4gY2xhc3M9XCJhbGVydC1pbmZvXCI+b24geW91ciBvd248L3NwYW4+LicpXG4gICAgICAgICAgICAuYXR0cignZGF0YS1wbGFjZW1lbnQnLCAnYm90dG9tJylcbiAgICAgICAgICAgIC5jc3MoJ21hcmdpbi1yaWdodCcsICcxMHB4JylcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsJzM0cHgnKS5jc3MoJ3dpZHRoJywnMzRweCcpO1xuXG4gICAgICAgIC8vIFJpZ2h0bW9zdCBoZWFkZXIgcGFydCBjb250YWluaW5nIHRoZSBkcm9wZG93biBtZW51XG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZURyb3Bkb3duKHBhcmVudCwgdGV4dHMpe1xuICAgICAgICAgICAgdmFyIGRyb3Bkb3duRWxlbWVudHMgPSBbXSwgaXRlbSwgZWxlbWVudDtcbiAgICAgICAgICAgIHZhciB1bCA9IGpRdWVyeSgnPHVsPicpLmFwcGVuZFRvKHBhcmVudClcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2Ryb3Bkb3duLW1lbnUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdyb2xlJywgJ21lbnUnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0cy5sZW5ndGg7ICsraSl7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRzW2ldPT09J2RpdmlkZXInKXtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCc8bGk+JykuYXBwZW5kVG8odWwpLmFkZENsYXNzKCdkaXZpZGVyJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGpRdWVyeSgnPGxpPicpLmFwcGVuZFRvKHVsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3JvbGUnLCdwcmVzZW50YXRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGpRdWVyeSgnPGE+JykuYXBwZW5kVG8oaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgJ2phdmFzY3JpcHQ6dm9pZCgwKScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKHRleHRzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25FbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZHJvcGRvd25FbGVtZW50cztcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHZhciBmaWxlRHJvcGRvd24gPSAgalF1ZXJ5KCc8ZGl2PicpLmFwcGVuZFRvKGhlYWRlclJpZ2h0UmlnaHQpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2J0bi1ncm91cCcpXG4gICAgICAgICAgICAuYXR0cigncm9sZScsICdncm91cCcpLmF0dHIoJ2FyaWEtbGFiZWwnLCAnbWVudSBiYXInKVxuICAgICAgICAgICAgLmNzcygnbWFyZ2luLXJpZ2h0JywnNHB4Jyk7XG4gICAgICAgIFxuICAgICAgICBqUXVlcnkoJzxidXR0b24+JykuYXBwZW5kVG8oZmlsZURyb3Bkb3duKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlJylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWxhYmVsJywgJ0ZpbGUgdGV4dCcpXG4gICAgICAgICAgICAuYXR0cignZGF0YS10b2dnbGUnLCAnZHJvcGRvd24nKVxuICAgICAgICAgICAgLmFwcGVuZCggalF1ZXJ5KCc8aT4nKS5hZGRDbGFzcygnZmEgZmEtZmlsZS10ZXh0JykpXG4gICAgICAgICAgICAuYXBwZW5kKCAnIEZpbGUgJyApXG4gICAgICAgICAgICAuYXBwZW5kKCBqUXVlcnkoJzxzcGFuPicpLmFkZENsYXNzKCdjYXJldCcpKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBmaWxlQnV0dG9ucyA9IGNyZWF0ZURyb3Bkb3duKGZpbGVEcm9wZG93biwgW1xuICAgICAgICAgICAgJ05ldycsXG4gICAgICAgICAgICAnT3BlbicsXG4gICAgICAgICAgICAnUXVpY2sgc2F2ZScsXG4gICAgICAgICAgICAnU2F2ZSBvbiBEaXNrJyBdKTtcblxuICAgICAgICB2YXIgc2hhcmVEcm9wZG93biA9IGpRdWVyeSgnPGRpdj4nKS5hcHBlbmRUbyhoZWFkZXJSaWdodFJpZ2h0KVxuICAgICAgICAgICAgLmFkZENsYXNzKCdidG4tZ3JvdXAnKVxuICAgICAgICAgICAgLmF0dHIoJ3JvbGUnLCAnZ3JvdXAnKS5hdHRyKCdhcmlhLWxhYmVsJywgJ21lbnUgYmFyJylcbiAgICAgICAgICAgIC5jc3MoJ21hcmdpbi1yaWdodCcsJzRweCcpO1xuICAgICAgICBcbiAgICAgICAgalF1ZXJ5KCc8YnV0dG9uPicpLmFwcGVuZFRvKHNoYXJlRHJvcGRvd24pXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2J0biBidG4tZGVmYXVsdCcpXG4gICAgICAgICAgICAuYXBwZW5kKCBqUXVlcnkoJzxpPicpLmFkZENsYXNzKCdmYSBmYS1saW5rJykpXG4gICAgICAgICAgICAuYXBwZW5kKCAnIFNoYXJlICcgKTtcbiAgICAgICAgalF1ZXJ5KCc8YnV0dG9uPicpLmFwcGVuZFRvKHNoYXJlRHJvcGRvd24pXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2J0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGUnKVxuICAgICAgICAgICAgLmh0bWwoJyZuYnNwJylcbiAgICAgICAgICAgIC5hdHRyKCdkYXRhLXRvZ2dsZScsICdkcm9wZG93bicpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxuICAgICAgICAgICAgLmFwcGVuZCggalF1ZXJ5KCc8c3Bhbj4nKS5hZGRDbGFzcygnY2FyZXQnKSApO1xuXG4gICAgICAgIHZhciBzaGFyZUJ1dHRvbnMgPSBjcmVhdGVEcm9wZG93bihzaGFyZURyb3Bkb3duLFtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cImZhIGZhLWxvbmctYXJyb3ctcmlnaHRcIj48L2k+IEdldCBhbiBlbnRyYW5jZSB0aWNrZXQnLFxuICAgICAgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtbG9uZy1hcnJvdy1sZWZ0XCI+PC9pPiBTdGFtcCBhIHRpY2tldCcsXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJmYSBmYS1leGNoYW5nZVwiPjwvaT4gQ29uZmlybSBvdXIgYXJyaXZhbCcsXG4gICAgICAgICAgICAnZGl2aWRlcicsXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJmYSBmYS1zaWduLW91dFwiPjwvaT4gRGlzY29ubmVjdCcgXSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdmFyIHNldHRpbmdzRHJvcGRvd24gPSAgalF1ZXJ5KCc8ZGl2PicpLmFwcGVuZFRvKGhlYWRlclJpZ2h0UmlnaHQpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2J0bi1ncm91cCcpXG4gICAgICAgICAgICAuYXR0cigncm9sZScsICdncm91cCcpLmF0dHIoJ2FyaWEtbGFiZWwnLCAnbWVudSBiYXInKVxuICAgICAgICAgICAgLmNzcygnbWFyZ2luLXJpZ2h0JywgJzRweCcpO1xuICAgICAgICBcbiAgICAgICAgalF1ZXJ5KCc8YnV0dG9uPicpLmFwcGVuZFRvKHNldHRpbmdzRHJvcGRvd24pXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2J0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ2FyaWEtbGFiZWwnLCAnRmlsZSB0ZXh0JylcbiAgICAgICAgICAgIC5hdHRyKCdkYXRhLXRvZ2dsZScsICdkcm9wZG93bicpXG4gICAgICAgICAgICAuYXBwZW5kKCBqUXVlcnkoJzxpPicpLmFkZENsYXNzKCdmYSBmYS1jb2dzJykpXG4gICAgICAgICAgICAuYXBwZW5kKCAnIFNldHRpbmdzICcgKVxuICAgICAgICAgICAgLmFwcGVuZCggalF1ZXJ5KCc8c3Bhbj4nKS5hZGRDbGFzcygnY2FyZXQnKSk7XG5cbiAgICAgICAgdmFyIHNldHRpbmdzQnV0dG9uID0gY3JlYXRlRHJvcGRvd24oIHNldHRpbmdzRHJvcGRvd24sIFtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cImZhIGZhLWJvb2tcIj48L2k+IEVkaXRvcicsXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJmYSBmYS11c2Vyc1wiPjwvaT4gTmV0d29yaycgXSk7XG4gICAgICAgIFxuICAgICAgICAvLyAjQiBjcmVhdGUgdGhlIGVkaXRvclxuICAgICAgICB2YXIgcG9zdCA9IGpRdWVyeSgnPGRpdj4nKS5hcHBlbmRUbyh0aGlzKVxuICAgICAgICAgICAgLmNzcygnYm94LXNoYWRvdycsICcwcHggMXB4IDVweCAjYWJhYmFiJylcbiAgICAgICAgICAgIC5jc3MoJ2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXMnLCAnNHB4JylcbiAgICAgICAgICAgIC5jc3MoJ2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzJywgJzRweCcpXG4gICAgICAgICAgICAuY3NzKCdtYXJnaW4tYm90dG9tJywgJzIwcHgnKVxuICAgICAgICAgICAgLmNzcygncGFkZGluZycsICczMHB4IDE1cHgnKVxuICAgICAgICAgICAgLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHBhcmFtZXRlcnMuZWRpdG9yQmFja2dyb3VuZENvbG9yKTtcbiAgICAgICAgXG4gICAgICAgIC8vIChUT0RPKSBjaGFuZ2UgaWQgdG8gc29tZXRoaW5nIG1vcmUgbWVhbmluZ2Z1bFxuICAgICAgICB2YXIgaWQgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICB2YXIgZGl2RWRpdG9yID0galF1ZXJ5KCc8ZGl2PicpLmFwcGVuZFRvKHBvc3QpLmF0dHIoJ2lkJywnbWlhb3UnK2lkKVxuICAgICAgICAgICAgLmNzcygnbWluLWhlaWdodCcsIHBhcmFtZXRlcnMuZWRpdG9ySGVpZ2h0KTtcbiAgICAgICAgdmFyIGVkaXRvciA9IGFjZS5lZGl0KCdtaWFvdScraWQpO1xuICAgICAgICBcbiAgICAgICAgZWRpdG9yLnNldFRoZW1lKFwiYWNlL3RoZW1lL2Nocm9tZVwiKTtcbiAgICAgICAgZWRpdG9yLmdldFNlc3Npb24oKS5zZXRVc2VXcmFwTW9kZSh0cnVlKTsgLy8gd29yZCB3cmFwcGluZ1xuICAgICAgICBlZGl0b3Iuc2V0SGlnaGxpZ2h0QWN0aXZlTGluZShmYWxzZSk7IC8vIG5vdCBoaWdobGlnaHRpbmcgY3VycmVudCBsaW5lXG4gICAgICAgIGVkaXRvci5zZXRTaG93UHJpbnRNYXJnaW4oZmFsc2UpOyAvLyBubyA4MCBjb2x1bW4gbWFyZ2luXG4gICAgICAgIGVkaXRvci5yZW5kZXJlci5zZXRTaG93R3V0dGVyKGZhbHNlKTsgLy8gbm8gbGluZSBudW1iZXJzXG4gICAgfSk7XG59O1xuIiwidmFyIENvcmUgPSByZXF1aXJlKCdjcmF0ZS1jb3JlJyk7XG52YXIgU2lnbmFsaW5nID0gcmVxdWlyZSgnLi9zaWduYWxpbmcuanMnKTtcblxuLyohXG4gKiBcXGJyaWVmIHRoZSB3aG9sZSBtb2RlbCBvZiB0aGUgYXBwbGljYXRpb24gaXMgY29udGFpbmVkIHdpdGhpbiB0aGlzIG9iamVjdFxuICovXG5mdW5jdGlvbiBNb2RlbChjb25maWcsIGNvbm5lY3QsIG9iamVjdCl7XG4gICAgLy8gIzEgaW5pdGFsaXplXG4gICAgdGhpcy51aWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTMzNzQyMTMzNzQyKTtcbiAgICB0aGlzLmNvcmUgPSBuZXcgQ29yZSh0aGlzLnVpZCwge2NvbmZpZzpjb25maWd9KTtcbiAgICB0aGlzLnNpZ25hbGluZyA9IG5ldyBTaWduYWxpbmcoTG9yZW0uZ2V0V29yZCgpLCB0aGlzLmNvcmUuYnJvYWRjYXN0LnNvdXJjZSk7XG4vLyAgICBpZiAob2JqZWN0ICYmICFjb25uZWN0KXsgdGhpcy5jb3JlLmluaXQob2JqZWN0KTsgfTtcbiAgICBcbiAgICAvLyAjMiBmYXN0IGFjY2Vzc1xuICAgIHRoaXMuYnJvYWRjYXN0ID0gdGhpcy5jb3JlLmJyb2FkY2FzdDtcbiAgICB0aGlzLnJwcyA9IHRoaXMuY29yZS5icm9hZGNhc3Quc291cmNlO1xuICAgIHRoaXMuc2VxdWVuY2UgPSB0aGlzLmNvcmUuc2VxdWVuY2U7ICAgIFxufTtcbiIsIlxuLyohXG4gKiBcXGJyaWVmIGhhbmRsZSB0aGUgc2lnbmFsaW5nIHNlcnZlclxuICogXFxwYXJhbSBuYW1lIHRoZSBpZGVudGlmaWVyIHVzZWQgYXQgdGhlIHNpZ25hbGluZyBzZXJ2ZXIgdG8gaWRlbnRpZnkgeW91clxuICogZWRpdGluZyBzZXNzaW9uXG4gKiBcXHBhcmFtIHJwcyB0aGUgcmFuZG9tIHBlZXIgc2FtcGxpbmcgcHJvdG9jb2xcbiAqL1xuZnVuY3Rpb24gU2lnbmFsaW5nKG5hbWUsIHJwcyl7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnJwcyA9IHJwcztcbiAgICB0aGlzLmFkZHJlc3MgPSBcImZpbGU6Ly8vVXNlcnMvY2hhdC13YW5lL0Rlc2t0b3AvcHJvamVjdC9jcmF0ZS9cIlxuICAgIC8vIHRoaXMuYWRkcmVzcyA9IFwiaHR0cDovL2NoYXQtd2FuZS5naXRodWIuaW8vQ1JBVEUvXCI7XG4gICAgLy8gdGhpcy5zaWduYWxpbmdTZXJ2ZXIgPSBcImh0dHBzOi8vYW5jaWVudC1zaGVsZi05MDY3Lmhlcm9rdWFwcC5jb21cIjtcbiAgICAvLyB0aGlzLnNpZ25hbGluZ1NlcnZlciA9IFwiaHR0cDovL2Fkcm91ZXQubmV0OjUwMDBcIjtcbiAgICB0aGlzLnNpZ25hbGluZ1NlcnZlciA9IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAwXCI7XG4gICAgdGhpcy5zb2NrZXRJT0NvbmZpZyA9IHsgXCJmb3JjZSBuZXcgY29ubmVjdGlvblwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVjb25uZWN0aW9uXCI6IGZhbHNlIH07XG4gICAgdGhpcy5zdGFydGVkU29ja2V0ID0gZmFsc2U7XG4gICAgdGhpcy5zb2NrZXQgPSBudWxsO1xuICAgIHRoaXMuc29ja2V0RHVyYXRpb24gPSA1ICogNjAgKiAxMDAwO1xuICAgIHRoaXMudGltZW91dCA9IG51bGw7IC8vIGV2ZW50IGlkIG9mIHRoZSB0ZXJtaW5hdGlvblxuICAgIHRoaXMuam9pbmVycyA9IDA7XG59O1xuXG5TaWduYWxpbmcucHJvdG90eXBlLmNyZWF0ZVNvY2tldCA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmKCF0aGlzLnN0YXJ0ZWRTb2NrZXQpe1xuICAgICAgICB0aGlzLnNvY2tldCA9IGlvKHRoaXMuc2lnbmFsaW5nU2VydmVyLCB0aGlzLnNvY2tldElPQ29uZmlnKTtcbiAgICAgICAgdGhpcy5zdGFydGVkU29ja2V0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zb2NrZXQub24oXCJjb25uZWN0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gdG8gdGhlIHNpZ25hbGluZyBzZXJ2ZXIgZXN0YWJsaXNoZWRcIik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNvY2tldC5vbihcImxhdW5jaFJlc3BvbnNlXCIsIGZ1bmN0aW9uKGRlc3RVaWQsIG9mZmVyVGlja2V0KXtcbiAgICAgICAgICAgIHNlbGYuam9pbmVycyA9IHNlbGYuam9pbmVycyArIDE7XG4gICAgICAgICAgICBzZWxmLnJwcy5hbnN3ZXIob2ZmZXJUaWNrZXQsIGZ1bmN0aW9uKHN0YW1wZWRUaWNrZXQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYW5zd2VyZWRcIik7XG4gICAgICAgICAgICAgICAgc2VsZi5zb2NrZXQuZW1pdChcImFuc3dlclwiLCBzZWxmLnJwcy5pZCwgZGVzdFVpZCwgc3RhbXBlZFRpY2tldCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKFwiYW5zd2VyUmVzcG9uc2VcIiwgZnVuY3Rpb24oaGFuZHNoYWtlTWVzc2FnZSl7XG4gICAgICAgICAgICBzZWxmLnJwcy5oYW5kc2hha2UoaGFuZHNoYWtlTWVzc2FnZSk7XG4gICAgICAgICAgICBzZWxmLnNvY2tldC5kaXNjb25uZWN0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlzY29ubmVjdGlvbiBmcm9tIHRoZSBzaWduYWxpbmcgc2VydmVyXCIpO1xuICAgICAgICAgICAgc2VsZi5zdGFydGVkU29ja2V0ID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmpvaW5lcnMgPSAwO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHJlc3RhcnQgdGltZXIgYmVmb3JlIGNsb3NpbmcgdGhlIGNvbm5lY3Rpb25cbiAgICBpZiAodGhpcy50aW1lb3V0IT09bnVsbCl7IGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpOyB9OyBcbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIHNlbGYuc3RvcFNoYXJpbmcoKTtcbiAgICB9LCB0aGlzLnNvY2tldER1cmF0aW9uKTtcbn07XG5cblNpZ25hbGluZy5wcm90b3R5cGUuc3RhcnRTaGFyaW5nID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5jcmVhdGVTb2NrZXQoKTtcbiAgICB0aGlzLnNvY2tldC5vbihcImNvbm5lY3RcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgc2VsZi5zb2NrZXQuZW1pdChcInNoYXJlXCIsIHNlbGYubmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0O1xufTtcblxuU2lnbmFsaW5nLnByb3RvdHlwZS5zdG9wU2hhcmluZyA9IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5zb2NrZXQuZW1pdChcInVuc2hhcmVcIiwgdGhpcy5uYW1lKTtcbiAgICB0aGlzLnNvY2tldC5kaXNjb25uZWN0KCk7XG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbn07XG5cblNpZ25hbGluZy5wcm90b3R5cGUuc3RhcnRKb2luaW5nID0gZnVuY3Rpb24ob3JpZ2luTmFtZSl7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuY3JlYXRlU29ja2V0KCk7XG4gICAgdGhpcy5zb2NrZXQub24oXCJjb25uZWN0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHNlbGYucnBzLmxhdW5jaChmdW5jdGlvbihsYXVuY2hNZXNzYWdlKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGF1bmNoZWRcIik7XG4gICAgICAgICAgICBzZWxmLnNvY2tldC5lbWl0KFwibGF1bmNoXCIsIG9yaWdpbk5hbWUsIHNlbGYucnBzLmlkLCBsYXVuY2hNZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0O1xufTtcblxuXG4iLCJ2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbnZhciBTcHJheSA9IHJlcXVpcmUoJ3NwcmF5LXdydGMnKTtcbnZhciBDYXVzYWxCcm9hZGNhc3QgPSByZXF1aXJlKCdjYXVzYWwtYnJvYWRjYXN0LWRlZmluaXRpb24nKTtcbnZhciBWVndFID0gcmVxdWlyZSgndmVyc2lvbi12ZWN0b3Itd2l0aC1leGNlcHRpb25zJyk7XG52YXIgTFNFUVRyZWUgPSByZXF1aXJlKCdsc2VxdHJlZScpO1xudmFyIEdVSUQgPSByZXF1aXJlKCcuL2d1aWQuanMnKTtcblxudmFyIE1JbnNlcnRPcGVyYXRpb24gPSByZXF1aXJlKCcuL21lc3NhZ2VzLmpzJykuTUluc2VydE9wZXJhdGlvbjtcbnZhciBNQUVJbnNlcnRPcGVyYXRpb24gPSByZXF1aXJlKCcuL21lc3NhZ2VzLmpzJykuTUFFSW5zZXJ0T3BlcmF0aW9uO1xudmFyIE1SZW1vdmVPcGVyYXRpb24gPSByZXF1aXJlKCcuL21lc3NhZ2VzLmpzJykuTVJlbW92ZU9wZXJhdGlvbjtcblxudXRpbC5pbmhlcml0cyhDcmF0ZUNvcmUsIEV2ZW50RW1pdHRlcik7XG5cbi8qIVxuICogXFxicmllZiBsaW5rIHRvZ2V0aGVyIGFsbCBjb21wb25lbnRzIG9mIHRoZSBtb2RlbCBvZiB0aGUgQ1JBVEUgZWRpdG9yXG4gKiBcXHBhcmFtIGlkIHRoZSB1bmlxdWUgc2l0ZSBpZGVudGlmaWVyXG4gKiBcXHBhcmFtIG9wdGlvbnMgdGhlIHdlYnJ0YyBzcGVjaWZpYyBvcHRpb25zIFxuICovXG5mdW5jdGlvbiBDcmF0ZUNvcmUoaWQsIG9wdGlvbnMpe1xuICAgIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuICAgIFxuICAgIHRoaXMuaWQgPSBpZCB8fCBHVUlEKCk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmJyb2FkY2FzdCA9IG5ldyBDYXVzYWxCcm9hZGNhc3QobmV3IFNwcmF5KHRoaXMuaWQsIHRoaXMub3B0aW9ucyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBWVndFKHRoaXMuaWQpKTtcbiAgICB0aGlzLnNlcXVlbmNlID0gbmV3IExTRVFUcmVlKHRoaXMuaWQpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vICNBIHJlZ3VsYXIgcmVjZWl2ZVxuICAgIHRoaXMuYnJvYWRjYXN0Lm9uKCdyZWNlaXZlJywgZnVuY3Rpb24ocmVjZWl2ZWRCcm9hZGNhc3RNZXNzYWdlKXtcbiAgICAgICAgc3dpdGNoIChyZWNlaXZlZEJyb2FkY2FzdE1lc3NhZ2UudHlwZSl7XG4gICAgICAgIGNhc2UgJ01SZW1vdmVPcGVyYXRpb24nOlxuICAgICAgICAgICAgc2VsZi5yZW1vdGVSZW1vdmUocmVjZWl2ZWRCcm9hZGNhc3RNZXNzYWdlLnJlbW92ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTUluc2VydE9wZXJhdGlvbic6XG4gICAgICAgICAgICBzZWxmLnJlbW90ZUluc2VydChyZWNlaXZlZEJyb2FkY2FzdE1lc3NhZ2UuaW5zZXJ0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0pO1xuICAgIC8vICNCIGFudGktZW50cm9weSBmb3IgdGhlIG1pc3Npbmcgb3BlcmF0aW9uXG4gICAgdGhpcy5icm9hZGNhc3Qub24oJ2FudGlFbnRyb3B5JywgZnVuY3Rpb24oc29ja2V0LCByZW1vdGVWVndFLCBsb2NhbFZWd0Upe1xuICAgICAgICAvKnZhciByZW1vdGVWVndFID0gKG5ldyBWVndFKG51bGwpKS5mcm9tSlNPTihyZW1vdGVWVndFKTsgLy8gY2FzdFxuICAgICAgICB2YXIgdG9TZWFyY2ggPSBbXTtcbiAgICAgICAgLy8gIzEgZm9yIGVhY2ggZW50cnkgb2Ygb3VyIFZWd0UsIGxvb2sgaWYgdGhlIHJlbW90ZSBWVndFIGtub3dzIGxlc3NcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPGxvY2FsVlZ3RS52ZWN0b3IuYXJyLmxlbmd0aDsgKytpKXtcbiAgICAgICAgICAgIHZhciBsb2NhbEVudHJ5ID0gbG9jYWxWVndFLnZlY3Rvci5hcnJbaV07XG4gICAgICAgICAgICB2YXIgaW5kZXggPSByZW1vdGVWVndFLnZlY3Rvci5pbmRleE9mKGxvY2FsVlZ3RS52ZWN0b3IuYXJyW2ldKTtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IDE7XG4gICAgICAgICAgICAvLyAjQSBjaGVjayBpZiB0aGUgZW50cnkgZXhpc3RzIGluIHRoZSByZW1vdGUgdnZ3ZVxuICAgICAgICAgICAgaWYgKGluZGV4ID49MCl7IHN0YXJ0ID0gcmVtb3RlVlZ3RS52ZWN0b3IuYXJyW2luZGV4XS52ICsgMTsgfTtcbiAgICAgICAgICAgIGZvciAodmFyIGo9c3RhcnQ7IGo8PWxvY2FsRW50cnkudjsgKytqKXtcbiAgICAgICAgICAgICAgICAvLyAjQiBjaGVjayBpZiBub3Qgb25lIG9mIHRoZSBsb2NhbCBleGNlcHRpb25zXG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsRW50cnkueC5pbmRleE9mKGopPDApe1xuICAgICAgICAgICAgICAgICAgICB0b1NlYXJjaC5wdXNoKHtfZTogbG9jYWxFbnRyeS5lLCBfYzogan0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gI0MgaGFuZGxlIHRoZSBleGNlcHRpb25zIG9mIHRoZSByZW1vdGUgdmVjdG9yXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0wKXtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqPTA7IGo8cmVtb3RlVlZ3RS52ZWN0b3IuYXJyW2luZGV4XS54Lmxlbmd0aDsrK2ope1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXhjZXB0ID0gcmVtb3RlVlZ3RS52ZWN0b3IuYXJyW2luZGV4XS54W2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAobG9jYWxFbnRyeS54LmluZGV4T2YoZXhjZXB0KTwwICYmIGV4Y2VwdDw9bG9jYWxFbnRyeS52KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvU2VhcmNoLnB1c2goe19lOiBsb2NhbEVudHJ5LmUsIF9jOiBleGNlcHR9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gc2VsZi5nZXRFbGVtZW50cyh0b1NlYXJjaCk7Ki9cbiAgICAgICAgdmFyIGVsZW1lbnRzID0gW107XG4gICAgICAgIC8vICMyIHNlbmQgYmFjayB0aGUgZm91bmQgZWxlbWVudHNcbiAgICAgICAgc2VsZi5icm9hZGNhc3Quc2VuZEFudGlFbnRyb3B5UmVzcG9uc2Uoc29ja2V0LCBsb2NhbFZWd0UsIGVsZW1lbnRzKTtcbiAgICB9KTtcbn07XG5cbi8qIVxuICogXFxicmllZiBjcmVhdGUgdGhlIGNvcmUgZnJvbSBhbiBleGlzdGluZyBvYmplY3RcbiAqIFxccGFyYW0gb2JqZWN0IHRoZSBvYmplY3QgdG8gaW5pdGlhbGl6ZSB0aGUgY29yZSBtb2RlbCBvZiBjcmF0ZSBjb250YWluaW5nIGEgXG4gKiBzZXF1ZW5jZSBhbmQgY2F1c2FsaXR5IHRyYWNraW5nIG1ldGFkYXRhXG4gKi9cbkNyYXRlQ29yZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgLy8gKFRPRE8pXG4gICAgLyogdGhpcy5icm9hZGNhc3QgPSBuZXcgQ2F1c2FsQnJvYWRjYXN0KG5ldyBTcHJheSh0aGlzLmlkLCB0aGlzLm9wdGlvbnMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobmV3IFZWd0UodGhpcy5pZCkpLmZyb21KU09OKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmNhdXNhbGl0eSkpO1xuICAgIHRoaXMuc2VxdWVuY2UgPSAobmV3IExTRVFUcmVlKGlkKSkuZnJvbUpTT04ob2JqZWN0LnNlcXVlbmNlKTsqL1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGxvY2FsIGluc2VydGlvbiBvZiBhIGNoYXJhY3RlciBpbnNpZGUgdGhlIHNlcXVlbmNlIHN0cnVjdHVyZS4gSXRcbiAqIGJyb2FkY2FzdHMgdGhlIG9wZXJhdGlvbiB0byB0aGUgcmVzdCBvZiB0aGUgbmV0d29yay5cbiAqIFxccGFyYW0gY2hhcmFjdGVyIHRoZSBjaGFyYWN0ZXIgdG8gaW5zZXJ0IGluIHRoZSBzZXF1ZW5jZVxuICogXFxwYXJhbSBpbmRleCB0aGUgaW5kZXggaW4gdGhlIHNlcXVlbmNlIHRvIGluc2VydFxuICogXFxyZXR1cm4gdGhlIGlkZW50aWZpZXIgZnJlc2hseSBhbGxvY2F0ZWRcbiAqL1xuQ3JhdGVDb3JlLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbihjaGFyYWN0ZXIsIGluZGV4KXtcbiAgICB2YXIgZWkgPSB0aGlzLnNlcXVlbmNlLmluc2VydChjaGFyYWN0ZXIsIGluZGV4KTtcbiAgICB2YXIgaWQgPSB7X2U6IGVpLl9pLl9zW2VpLl9pLl9zLmxlbmd0aC0xXSwgX2M6IGVpLl9pLl9jW2VpLl9pLl9jLmxlbmd0aC0xXX07XG4gICAgdGhpcy5icm9hZGNhc3Quc2VuZChuZXcgTUluc2VydE9wZXJhdGlvbihlaSksIGlkLCBudWxsKTtcbiAgICByZXR1cm4gZWk7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgbG9jYWwgZGVsZXRpb24gb2YgYSBjaGFyYWN0ZXIgZnJvbSB0aGUgc2VxdWVuY2Ugc3RydWN0dXJlLiBJdCBcbiAqIGJyb2FkY2FzdHMgdGhlIG9wZXJhdGlvbiB0byB0aGUgcmVzdCBvZiB0aGUgbmV0d29yay5cbiAqIFxccGFyYW0gaW5kZXggdGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIHJlbW92ZVxuICogXFxyZXR1cm4gdGhlIGlkZW50aWZpZXIgZnJlc2hseSByZW1vdmVkXG4gKi9cbkNyYXRlQ29yZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgIHZhciBpID0gdGhpcy5zZXF1ZW5jZS5yZW1vdmUoaW5kZXgpO1xuICAgIHZhciBpc1JlYWR5ID0ge19lOiBpLl9zW2kuX3MubGVuZ3RoLTFdLCBfYzogaS5fY1tpLl9jLmxlbmd0aC0xXX07XG4gICAgdGhpcy5zZXF1ZW5jZS5fYyArPSAxO1xuICAgIHZhciBpZCA9IHtfZTp0aGlzLnNlcXVlbmNlLl9zLCBfYzogdGhpcy5zZXF1ZW5jZS5fYyB9IC8vIChUT0RPKSBmaXggdWdseW5lc3NcbiAgICB0aGlzLmJyb2FkY2FzdC5zZW5kKG5ldyBNUmVtb3ZlT3BlcmF0aW9uKGkpLCBpZCwgaXNSZWFkeSk7XG4gICAgcmV0dXJuIGk7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgaW5zZXJ0aW9uIG9mIGFuIGVsZW1lbnQgZnJvbSBhIHJlbW90ZSBzaXRlLiBJdCBlbWl0cyAncmVtb3RlSW5zZXJ0JyBcbiAqIHdpdGggdGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIGluc2VydCwgLTEgaWYgYWxyZWFkeSBleGlzdGluZy5cbiAqIFxccGFyYW0gZWkgdGhlIHJlc3VsdCBvZiB0aGUgcmVtb3RlIGluc2VydCBvcGVyYXRpb25cbiAqL1xuQ3JhdGVDb3JlLnByb3RvdHlwZS5yZW1vdGVJbnNlcnQgPSBmdW5jdGlvbihlaSl7XG4gICAgdGhpcy5lbWl0KCdyZW1vdGVJbnNlcnQnLFxuICAgICAgICAgICAgICBlaS5fZSxcbiAgICAgICAgICAgICAgdGhpcy5zZXF1ZW5jZS5hcHBseUluc2VydChlaS5fZSwgZWkuX2ksIHRydWUpKTtcbiAgICAvLyAoVE9ETykgZml4IHRoZSBub0luZGV4IHRoaW5nXG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgcmVtb3ZhbCBvZiBhbiBlbGVtZW50IGZyb20gYSByZW1vdGUgc2l0ZS4gIEl0IGVtaXRzICdyZW1vdGVSZW1vdmUnXG4gKiB3aXRoIHRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB0byByZW1vdmUsIC0xIGlmIGRvZXMgbm90IGV4aXN0XG4gKiBcXHBhcmFtIGlkIHRoZSByZXN1bHQgb2YgdGhlIHJlbW90ZSBpbnNlcnQgb3BlcmF0aW9uXG4gKi9cbkNyYXRlQ29yZS5wcm90b3R5cGUucmVtb3RlUmVtb3ZlID0gZnVuY3Rpb24oaWQpe1xuICAgIHRoaXMuZW1pdCgncmVtb3RlUmVtb3ZlJywgdGhpcy5zZXF1ZW5jZS5hcHBseVJlbW92ZShpZCkpO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIHNlYXJjaCBhIHNldCBvZiBlbGVtZW50cyBpbiBvdXIgc2VxdWVuY2UgYW5kIHJldHVybiB0aGVtXG4gKiBcXHBhcmFtIHRvU2VhcmNoIHRoZSBhcnJheSBvZiBlbGVtZW50cyB7X2UsIF9jfSB0byBzZWFyY2hcbiAqIFxccmV0dXJucyBhbiBhcnJheSBvZiBub2Rlc1xuICovXG5DcmF0ZUNvcmUucHJvdG90eXBlLmdldEVsZW1lbnRzID0gZnVuY3Rpb24odG9TZWFyY2gpe1xuICAgIHZhciByZXN1bHQgPSBbXSwgZm91bmQsIG5vZGUsIHRlbXBOb2RlLCBpPXRoaXMuc2VxdWVuY2UubGVuZ3RoLCBqPTA7XG4gICAgLy8gKFRPRE8pIGltcHJvdmUgcmVzZWFyY2ggYnkgZXhwbG9pdGluZyB0aGUgZmFjdCB0aGF0IGlmIGEgbm9kZSBpc1xuICAgIC8vIG1pc3NpbmcsIGFsbCBpdHMgY2hpbGRyZW4gYXJlIG1pc3NpbmcgdG9vLlxuICAgIC8vIChUT0RPKSBpbXByb3ZlIHRoZSByZXR1cm5lZCByZXByZXNlbnRhdGlvbjogZWl0aGVyIGEgdHJlZSB0byBmYWN0b3JpemVcbiAgICAvLyBjb21tb24gcGFydHMgb2YgdGhlIHN0cnVjdHVyZSBvciBpZGVudGlmaWVycyB0byBnZXQgdGhlIHBvbHlsb2cgc2l6ZVxuICAgIC8vIChUT0RPKSBpbXByb3ZlIHRoZSBzZWFyY2ggYnkgdXNpbmcgdGhlIGZhY3QgdGhhdCB0b1NlYXJjaCBpcyBhIHNvcnRlZFxuICAgIC8vIGFycmF5LCBwb3NzaWJseSByZXN0cnVjdHVyZSB0aGlzIGFyZ3VtZW50IHRvIGJlIGV2ZW4gbW9yZSBlZmZpY2llbnRcbiAgICB3aGlsZSAodG9TZWFyY2gubGVuZ3RoID4gMCAmJiBpPD10aGlzLnNlcXVlbmNlLmxlbmd0aCAmJiBpPjApe1xuICAgICAgICBub2RlID0gdGhpcy5zZXF1ZW5jZS5nZXQoaSk7XG4gICAgICAgIHRlbXBOb2RlID0gbm9kZTtcbiAgICAgICAgd2hpbGUoIHRlbXBOb2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgdGVtcE5vZGUgPSB0ZW1wTm9kZS5jaGlsZHJlblswXTtcbiAgICAgICAgfTtcbiAgICAgICAgaiA9IDA7XG4gICAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChqIDwgdG9TZWFyY2gubGVuZ3RoICYmICFmb3VuZCl7XG4gICAgICAgICAgICBpZiAodGVtcE5vZGUudC5zID09PSB0b1NlYXJjaFtqXS5fZSAmJlxuICAgICAgICAgICAgICAgIHRlbXBOb2RlLnQuYyA9PT0gdG9TZWFyY2hbal0uX2Mpe1xuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgTUFFSW5zZXJ0T3BlcmF0aW9uKHtfZTogdGVtcE5vZGUuZSwgX2k6bm9kZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7X2U6IHRvU2VhcmNoW2pdLl9lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jOiB0b1NlYXJjaFtqXS5fY30gKSk7XG4gICAgICAgICAgICAgICAgdG9TZWFyY2guc3BsaWNlKGosMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICsrajtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIC8vICAgICAgICArK2k7XG4gICAgICAgIC0taTtcbiAgICB9O1xuICAgICByZXR1cm4gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDcmF0ZUNvcmU7XG4iLCIvKlxuICogXFx1cmwgaHR0cHM6Ly9naXRodWIuY29tL2p1c3RheWFrL3l1dGlscy9ibG9iL21hc3Rlci95dXRpbHMuanNcbiAqIFxcYXV0aG9yIGp1c3RheWFrXG4gKi9cblxuLyohXG4gKiBcXGJyaWVmIGdldCBhIGdsb2JhbGx5IHVuaXF1ZSAod2l0aCBoaWdoIHByb2JhYmlsaXR5KSBpZGVudGlmaWVyXG4gKiBcXHJldHVybiBhIHN0cmluZyBiZWluZyB0aGUgaWRlbnRpZmllclxuICovXG5mdW5jdGlvbiBHVUlEKCl7XG4gICAgdmFyIGQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgZ3VpZCA9ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgdmFyIHIgPSAoZCArIE1hdGgucmFuZG9tKCkgKiAxNikgJSAxNiB8IDA7XG4gICAgICAgIGQgPSBNYXRoLmZsb29yKGQgLyAxNik7XG4gICAgICAgIHJldHVybiAoYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KSkudG9TdHJpbmcoMTYpO1xuICAgIH0pO1xuICAgIHJldHVybiBndWlkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBHVUlEO1xuIiwiLyohXG4gKiBcXGJyaWVmIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgdGhlIHJlc3VsdCBvZiBhbiBpbnNlcnQgb3BlcmF0aW9uXG4gKiBcXHBhcmFtIGluc2VydCB0aGUgcmVzdWx0IG9mIHRoZSBsb2NhbCBpbnNlcnQgb3BlcmF0aW9uXG4gKi9cbmZ1bmN0aW9uIE1JbnNlcnRPcGVyYXRpb24oaW5zZXJ0KXtcbiAgICB0aGlzLnR5cGUgPSBcIk1JbnNlcnRPcGVyYXRpb25cIjtcbiAgICB0aGlzLmluc2VydCA9IGluc2VydDtcbn07XG5tb2R1bGUuZXhwb3J0cy5NSW5zZXJ0T3BlcmF0aW9uID0gTUluc2VydE9wZXJhdGlvbjtcblxuZnVuY3Rpb24gTUFFSW5zZXJ0T3BlcmF0aW9uKGluc2VydCwgaWQpe1xuICAgIHRoaXMudHlwZSA9IFwiTUFFSW5zZXJ0T3BlcmF0aW9uXCI7XG4gICAgdGhpcy5wYXlsb2FkID0gbmV3IE1JbnNlcnRPcGVyYXRpb24oaW5zZXJ0KTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5pc1JlYWR5ID0gbnVsbDtcbn07XG5tb2R1bGUuZXhwb3J0cy5NQUVJbnNlcnRPcGVyYXRpb24gPSBNQUVJbnNlcnRPcGVyYXRpb247XG5cbi8qIVxuICogXFxicmllZiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSByZXN1bHQgb2YgYSBkZWxldGUgb3BlcmF0aW9uXG4gKiBcXHBhcmFtIHJlbW92ZSB0aGUgcmVzdWx0IG9mIHRoZSBsb2NhbCBkZWxldGUgb3BlcmF0aW9uXG4gKi9cbmZ1bmN0aW9uIE1SZW1vdmVPcGVyYXRpb24ocmVtb3ZlKXtcbiAgICB0aGlzLnR5cGUgPSBcIk1SZW1vdmVPcGVyYXRpb25cIjtcbiAgICB0aGlzLnJlbW92ZSA9IHJlbW92ZTtcbn07XG5tb2R1bGUuZXhwb3J0cy5NUmVtb3ZlT3BlcmF0aW9uID0gTVJlbW92ZU9wZXJhdGlvbjtcbiIsInZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbnZhciBHVUlEID0gcmVxdWlyZSgnLi9ndWlkLmpzJyk7XG5cbnZhciBNQnJvYWRjYXN0ID0gcmVxdWlyZSgnLi9tZXNzYWdlcycpLk1Ccm9hZGNhc3Q7XG52YXIgTUFudGlFbnRyb3B5UmVxdWVzdCA9IHJlcXVpcmUoJy4vbWVzc2FnZXMuanMnKS5NQW50aUVudHJvcHlSZXF1ZXN0O1xudmFyIE1BbnRpRW50cm9weVJlc3BvbnNlID0gcmVxdWlyZSgnLi9tZXNzYWdlcy5qcycpLk1BbnRpRW50cm9weVJlc3BvbnNlO1xuXG52YXIgVW5pY2FzdCA9IHJlcXVpcmUoJ3VuaWNhc3QtZGVmaW5pdGlvbicpO1xuXG51dGlsLmluaGVyaXRzKENhdXNhbEJyb2FkY2FzdCwgRXZlbnRFbWl0dGVyKTtcblxuLyohXG4gKiBJdCB0YWtlcyBhIHVuaXF1ZSB2YWx1ZSBmb3IgcGVlciBhbmQgYSBjb3VudGVyIHRvIGRpc3Rpbmd1aXNoIGEgbWVzc2FnZS4gSXRcbiAqIGVtaXRzICdyZWNlaXZlJyBldmVudCB3aGVuIHRoZSBtZXNzYWdlIGlzIGNvbnNpZGVyZWQgcmVhZHlcbiAqIFxccGFyYW0gc291cmNlIHRoZSBwcm90b2NvbCByZWNlaXZpbmcgdGhlIG1lc3NhZ2VzXG4gKiBcXHBhcmFtIGNhdXNhbGl0eSB0aGUgY2F1c2FsaXR5IHRyYWNraW5nIHN0cnVjdHVyZVxuICovXG5mdW5jdGlvbiBDYXVzYWxCcm9hZGNhc3Qoc291cmNlLCBjYXVzYWxpdHksIG5hbWUpIHtcbiAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lIHx8ICdjYXVzYWwnO1xuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgIHRoaXMuY2F1c2FsaXR5ID0gY2F1c2FsaXR5O1xuICAgIHRoaXMuZGVsdGFBbnRpRW50cm9weSA9IDEwMDAqNjAqMS82OyAvLyAoVE9ETykgY29uZmlndXJhYmxlXG4gICAgdGhpcy51bmljYXN0ID0gbmV3IFVuaWNhc3QodGhpcy5zb3VyY2UsIHRoaXMubmFtZSsnLXVuaWNhc3QnKTtcbiAgICBcbiAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgIFxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLnNvdXJjZS5vbihzZWxmLm5hbWUrJy1icm9hZGNhc3QtcmVjZWl2ZScsIGZ1bmN0aW9uKHNvY2tldCwgbWVzc2FnZSl7XG4gICAgICAgIHNlbGYucmVjZWl2ZUJyb2FkY2FzdChtZXNzYWdlKTtcbiAgICB9KTtcbiAgICB0aGlzLnVuaWNhc3Qub24oJ3JlY2VpdmUnLCBmdW5jdGlvbihzb2NrZXQsIG1lc3NhZ2Upe1xuICAgICAgICBzZWxmLnJlY2VpdmVVbmljYXN0KHNvY2tldCwgbWVzc2FnZSk7XG4gICAgfSk7XG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICAgICAgc2VsZi51bmljYXN0LnNlbmQobmV3IE1BbnRpRW50cm9weVJlcXVlc3Qoc2VsZi5jYXVzYWxpdHkpKTtcbiAgICB9LCB0aGlzLmRlbHRhQW50aUVudHJvcHkpO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGJyb2FkY2FzdCB0aGUgbWVzc2FnZSB0byBhbGwgcGFydGljaXBhbnRzXG4gKiBcXHBhcmFtIG1lc3NhZ2UgdGhlIG1lc3NhZ2UgdG8gYnJvYWRjYXN0XG4gKiBcXHBhcmFtIGlkIHRoZSBpZCBvZiB0aGUgbWVzc2FnZVxuICogXFxwYXJhbSBpc1JlYWR5IHRoZSBpZChzKSB0aGF0IG11c3QgZXhpc3QgdG8gZGVsaXZlciB0aGUgbWVzc2FnZVxuICovXG5DYXVzYWxCcm9hZGNhc3QucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihtZXNzYWdlLCBpZCwgaXNSZWFkeSl7XG4gICAgLy8gIzEgZ2V0IHRoZSBuZWlnaGJvcmhvb2QgYW5kIGNyZWF0ZSB0aGUgbWVzc2FnZVxuICAgIHZhciBsaW5rcyA9IHRoaXMuc291cmNlLmdldFBlZXJzKE51bWJlci5NQVhfVkFMVUUpO1xuICAgIHZhciBtQnJvYWRjYXN0ID0gbmV3IE1Ccm9hZGNhc3QodGhpcy5uYW1lLCBpZCB8fCBHVUlEKCksIGlzUmVhZHksIG1lc3NhZ2UpO1xuICAgIC8vICMyIHJlZ2lzdGVyIHRoZSBtZXNzYWdlIGluIHRoZSBzdHJ1Y3R1cmVcbiAgICB0aGlzLmNhdXNhbGl0eS5pbmNyZW1lbnRGcm9tKGlkKTtcbiAgICAvLyAjMyBzZW5kIHRoZSBtZXNzYWdlIHRvIHRoZSBuZWlnaGJvcmhvb2RcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgKytpKXtcbiAgICAgICAgaWYgKGxpbmtzW2ldLmNvbm5lY3RlZCAmJlxuICAgICAgICAgICAgbGlua3NbaV0uX2NoYW5uZWwgJiYgbGlua3NbaV0uX2NoYW5uZWwucmVhZHlTdGF0ZT09PSdvcGVuJyl7XG4gICAgICAgICAgICBsaW5rc1tpXS5zZW5kKG1Ccm9hZGNhc3QpO1xuICAgICAgICB9O1xuICAgIH07XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgYW5zd2VycyB0byBhbiBhbnRpZW50cm9weSByZXF1ZXN0IG1lc3NhZ2Ugd2l0aCB0aGUgbWlzc2luZyBlbGVtZW50c1xuICogXFxwYXJhbSBzb2NrZXQgdGhlIG9yaWdpbiBvZiB0aGUgcmVxdWVzdFxuICogXFxwYXJhbSBjYXVzYWxpdHlBdFJlY2VpcHQgdGhlIGxvY2FsIGNhdXNhbGl0eSBzdHJ1Y3R1cmUgd2hlbiB0aGUgbWVzc2FnZSB3YXNcbiAqIHJlY2VpdmVkXG4gKiBcXHBhcmFtIG1lc3NhZ2VzIHRoZSBtaXNzaW5nIG1lc3NhZ2VzXG4gKi8gXG5DYXVzYWxCcm9hZGNhc3QucHJvdG90eXBlLnNlbmRBbnRpRW50cm9weVJlc3BvbnNlID1cbiAgICBmdW5jdGlvbihzb2NrZXQsIGNhdXNhbGl0eUF0UmVjZWlwdCwgbWVzc2FnZXMpe1xuICAgICAgICB0aGlzLnVuaWNhc3Quc2VuZChcbiAgICAgICAgICAgIG5ldyBNQW50aUVudHJvcHlSZXNwb25zZShjYXVzYWxpdHlBdFJlY2VpcHQsIG1lc3NhZ2VzKSxcbiAgICAgICAgICAgIHNvY2tldCk7XG4gICAgfTtcblxuLyohXG4gKiBcXGJyaWVmIHJlY2VpdmUgYSBicm9hZGNhc3QgbWVzc2FnZVxuICogXFxwYXJhbSBtZXNzYWdlIHRoZSByZWNlaXZlZCBtZXNzYWdlXG4gKi9cbkNhdXNhbEJyb2FkY2FzdC5wcm90b3R5cGUucmVjZWl2ZUJyb2FkY2FzdCA9IGZ1bmN0aW9uKG1lc3NhZ2Upe1xuICAgIHZhciBpZCA9IG1lc3NhZ2UuaWQsXG4gICAgICAgIGlzUmVhZHkgPSBtZXNzYWdlLmlzUmVhZHk7XG5cbiAgICBpZiAoIXRoaXMuc3RvcFByb3BhZ2F0aW9uKG1lc3NhZ2UpKXtcbiAgICAgICAgLy8gIzEgcmVnaXN0ZXIgdGhlIG9wZXJhdGlvblxuICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAvLyAjMiBkZWxpdmVyXG4gICAgICAgIHRoaXMucmV2aWV3QnVmZmVyKCk7XG4gICAgICAgIC8vICMzIHJlYnJvYWRjYXN0XG4gICAgICAgIHZhciBsaW5rcyA9IHRoaXMuc291cmNlLmdldFBlZXJzKE51bWJlci5NQVhfVkFMVUUpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgKytpKXtcbiAgICAgICAgICAgIGlmIChsaW5rc1tpXS5jb25uZWN0ZWQgJiZcbiAgICAgICAgICAgICAgICBsaW5rc1tpXS5fY2hhbm5lbCAmJiBsaW5rc1tpXS5fY2hhbm5lbC5yZWFkeVN0YXRlPT09J29wZW4nKXtcbiAgICAgICAgICAgICAgICBsaW5rc1tpXS5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGdvIHRocm91Z2ggdGhlIGJ1ZmZlciBvZiBtZXNzYWdlcyBhbmQgZGVsaXZlcnMgYWxsXG4gKiByZWFkeSBvcGVyYXRpb25zXG4gKi9cbkNhdXNhbEJyb2FkY2FzdC5wcm90b3R5cGUucmV2aWV3QnVmZmVyID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgZm91bmQgPSBmYWxzZSxcbiAgICAgICAgaSA9IHRoaXMuYnVmZmVyLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUoaT49MCl7XG4gICAgICAgIHZhciBtZXNzYWdlID0gdGhpcy5idWZmZXJbaV07XG4gICAgICAgIGlmICh0aGlzLmNhdXNhbGl0eS5pc0xvd2VyKG1lc3NhZ2UuaWQpKXtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyLnNwbGljZShpLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhdXNhbGl0eS5pc1JlYWR5KG1lc3NhZ2UuaXNSZWFkeSkpe1xuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhdXNhbGl0eS5pbmNyZW1lbnRGcm9tKG1lc3NhZ2UuaWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3JlY2VpdmUnLCBtZXNzYWdlLnBheWxvYWQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgLS1pO1xuICAgIH07XG4gICAgaWYgKGZvdW5kKXsgdGhpcy5yZXZpZXdCdWZmZXIoKTsgIH07XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgcmVjZWl2ZSBhIHVuaWNhc3QgbWVzc2FnZSwgaS5lLiwgZWl0aGVyIGFuIGFudGllbnRyb3B5IHJlcXVlc3Qgb3IgYW5cbiAqIGFudGllbnRyb3B5IHJlc3BvbnNlXG4gKiBcXGJyaWVmIHNvY2tldCB0aGUgb3JpZ2luIG9mIHRoZSBtZXNzYWdlXG4gKiBcXGJyaWVmIG1lc3NhZ2UgdGhlIG1lc3NhZ2UgcmVjZWl2ZWQgXG4gKi9cbkNhdXNhbEJyb2FkY2FzdC5wcm90b3R5cGUucmVjZWl2ZVVuaWNhc3QgPSBmdW5jdGlvbihzb2NrZXQsIG1lc3NhZ2Upe1xuICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKXtcbiAgICBjYXNlICdNQW50aUVudHJvcHlSZXF1ZXN0JzpcbiAgICAgICAgdGhpcy5lbWl0KCdhbnRpRW50cm9weScsXG4gICAgICAgICAgICAgICAgICBzb2NrZXQsIG1lc3NhZ2UuY2F1c2FsaXR5LCB0aGlzLmNhdXNhbGl0eS5jbG9uZSgpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTUFudGlFbnRyb3B5UmVzcG9uc2UnOlxuICAgICAgICAvLyAjMSBjb25zaWRlcmUgZWFjaCBtZXNzYWdlIGluIHRoZSByZXNwb25zZSBpbmRlcGVuZGFudGx5XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpPG1lc3NhZ2UuZWxlbWVudHMubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgLy8gIzIgb25seSBjaGVjayBpZiB0aGUgbWVzc2FnZSBoYXMgbm90IGJlZW4gcmVjZWl2ZWQgeWV0XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RvcFByb3BhZ2F0aW9uKG1lc3NhZ2UuZWxlbWVudHNbaV0pKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNhdXNhbGl0eS5pbmNyZW1lbnRGcm9tKG1lc3NhZ2UuZWxlbWVudHNbaV0uaWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgncmVjZWl2ZScsIG1lc3NhZ2UuZWxlbWVudHNbaV0ucGF5bG9hZCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICAvLyAjMiBtZXJnZSBjYXVzYWxpdHkgc3RydWN0dXJlc1xuICAgICAgICB0aGlzLmNhdXNhbGl0eS5tZXJnZShtZXNzYWdlLmNhdXNhbGl0eSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH07XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgZ2V0cyBjYWxsZWQgd2hlbiBhIGJyb2FkY2FzdCBtZXNzYWdlIHJlYWNoZXMgdGhpcyBub2RlLiAgdGhpc1xuICogZnVuY3Rpb24gZXZhbHVhdGVzIGlmIHRoZSBub2RlIHNob3VsZCBwcm9wYWdhdGUgdGhlIG1lc3NhZ2UgZnVydGhlciBvciBpZiBpdFxuICogc2hvdWxkIHN0b3Agc2VuZGluZyBpdC5cbiAqIFxccGFyYW0gbWVzc2FnZSBhIGJyb2FkY2FzdCBtZXNzYWdlXG4gKiBcXHJldHVybiB0cnVlIGlmIHRoZSBtZXNzYWdlIGlzIGFscmVhZHkga25vd24sIGZhbHNlIG90aGVyd2lzZVxuICovXG5DYXVzYWxCcm9hZGNhc3QucHJvdG90eXBlLnN0b3BQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgcmV0dXJuIHRoaXMuY2F1c2FsaXR5LmlzTG93ZXIobWVzc2FnZS5pZCkgfHxcbiAgICAgICAgdGhpcy5idWZmZXJJbmRleE9mKG1lc3NhZ2UuaWQpPj0wO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGdldCB0aGUgaW5kZXggaW4gdGhlIGJ1ZmZlciBvZiB0aGUgbWVzc2FnZSBpZGVudGlmaWVkIGJ5IGlkXG4gKiBcXHBhcmFtIGlkIHRoZSBpZGVudGlmaWVyIHRvIHNlYXJjaFxuICogXFxyZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBtZXNzYWdlIGluIHRoZSBidWZmZXIsIC0xIGlmIG5vdCBmb3VuZFxuICovXG5DYXVzYWxCcm9hZGNhc3QucHJvdG90eXBlLmJ1ZmZlckluZGV4T2YgPSBmdW5jdGlvbihpZCl7XG4gICAgdmFyIGZvdW5kID0gZmFsc2UsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGkgPSAwO1xuICAgIHdoaWxlICghZm91bmQgJiYgaTx0aGlzLmJ1ZmZlci5sZW5ndGgpe1xuICAgICAgICAvLyAoVE9ETykgZml4IHVnbHluZXNzXG4gICAgICAgIGlmIChKU09OLnN0cmluZ2lmeSh0aGlzLmJ1ZmZlcltpXS5pZCkgPT09IEpTT04uc3RyaW5naWZ5KGlkKSl7IFxuICAgICAgICAgICAgZm91bmQgPSB0cnVlOyBpbmRleCA9IGk7XG4gICAgICAgIH07XG4gICAgICAgICsraVxuICAgIH07XG4gICAgcmV0dXJuIGluZGV4O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYXVzYWxCcm9hZGNhc3Q7XG4iLCJcbi8qIVxuICogXFxicmllZiBtZXNzYWdlIGNvbnRhaW5pbmcgZGF0YSB0byBicm9hZGNhc3RcbiAqIFxccGFyYW0gbmFtZSB0aGUgbmFtZSBvZiB0aGUgcHJvdG9jb2wsIGRlZmF1bHQgJ2NhdXNhbCdcbiAqIFxccGFyYW0gaWQgdGhlIGlkZW50aWZpZXIgb2YgdGhlIGJyb2FkY2FzdCBtZXNzYWdlXG4gKiBcXHBhcmFtIGlzUmVhZHkgdGhlIGlkZW50aWZpZXIocykgdGhhdCBtdXN0IGV4aXN0IHRvIGRlbGl2ZXIgdGhpcyBtZXNzYWdlXG4gKiBcXHBhcmFtIHBheWxvYWQgdGhlIGJyb2FkY2FzdGVkIGRhdGFcbiAqL1xuZnVuY3Rpb24gTUJyb2FkY2FzdChuYW1lLCBpZCwgaXNSZWFkeSwgcGF5bG9hZCl7XG4gICAgdGhpcy5wcm90b2NvbCA9IChuYW1lICYmIG5hbWUrJy1icm9hZGNhc3QnKSB8fCAnY2F1c2FsLWJyb2FkY2FzdCc7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMuaXNSZWFkeSA9IGlzUmVhZHk7XG4gICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZDtcbn07XG5tb2R1bGUuZXhwb3J0cy5NQnJvYWRjYXN0ID0gTUJyb2FkY2FzdDtcblxuLyohXG4gKiBcXGJyaWVmIG1lc3NhZ2UgdGhhdCByZXF1ZXN0IGFuIEFudGlFbnRyb3B5IFxuICogXFxwYXJhbSBjYXVzYWxpdHkgdGhlIGNhdXNhbGl0eSBzdHJ1Y3R1cmVcbiAqL1xuZnVuY3Rpb24gTUFudGlFbnRyb3B5UmVxdWVzdChjYXVzYWxpdHkpe1xuICAgIHRoaXMudHlwZSA9ICdNQW50aUVudHJvcHlSZXF1ZXN0JztcbiAgICB0aGlzLmNhdXNhbGl0eSA9IGNhdXNhbGl0eTtcbn07XG5tb2R1bGUuZXhwb3J0cy5NQW50aUVudHJvcHlSZXF1ZXN0ID0gTUFudGlFbnRyb3B5UmVxdWVzdDtcblxuLyohXG4gKiBcXGJyaWVmIG1lc3NhZ2UgcmVzcG9uZGluZyB0byB0aGUgQW50aUVudHJvcHkgcmVxdWVzdFxuICogXFxwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBwcm90b2NvbCwgZGVmYXVsdCAnY2F1c2FsJ1xuICogXFxwYXJhbSBjYXVzYWxpdHkgdGhlIGNhdXNhbGl0eSBzdHJ1Y3R1cmVcbiAqIFxccGFyYW0gZWxlbWVudHMgdGhlIGVsZW1lbnRzIHRvIHNlbmRcbiAqL1xuZnVuY3Rpb24gTUFudGlFbnRyb3B5UmVzcG9uc2UoY2F1c2FsaXR5LCBlbGVtZW50cyl7XG4gICAgdGhpcy50eXBlID0gJ01BbnRpRW50cm9weVJlc3BvbnNlJztcbiAgICB0aGlzLmNhdXNhbGl0eSA9IGNhdXNhbGl0eTtcbiAgICB0aGlzLmVsZW1lbnRzID0gZWxlbWVudHM7XG59O1xubW9kdWxlLmV4cG9ydHMuTUFudGlFbnRyb3B5UmVzcG9uc2UgPSBNQW50aUVudHJvcHlSZXNwb25zZTtcblxuIiwiXG4vKiFcbiAqIFxcYnJpZWYgbWVzc2FnZSBjb250YWluaW5nIGRhdGEgdG8gdW5pY2FzdFxuICogXFxwYXJhbSBuYW1lIHRoZSBwcm90b2NvbCBuYW1lXG4gKiBcXHBhcmFtIHBheWxvYWQgdGhlIHNlbnQgZGF0YVxuICovXG5mdW5jdGlvbiBNVW5pY2FzdChuYW1lLCBwYXlsb2FkKXtcbiAgICB0aGlzLnByb3RvY29sID0gbmFtZSB8fCAndW5pY2FzdCc7XG4gICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZDtcbn07XG5tb2R1bGUuZXhwb3J0cy5NVW5pY2FzdCA9IE1VbmljYXN0O1xuIiwidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG52YXIgTVVuaWNhc3QgPSByZXF1aXJlKCcuL21lc3NhZ2VzJykuTVVuaWNhc3Q7XG5cbnV0aWwuaW5oZXJpdHMoVW5pY2FzdCwgRXZlbnRFbWl0dGVyKTtcblxuLyohXG4gKiBVbmljYXN0IGNvbXBvbmVudCB0aGF0IHNpbXBseSBjaG9zZSBhIHJhbmRvbSBwZWVyIGFuZCBzZW5kIGEgbWVzc2FnZVxuICogXFxwYXJhbSBzb3VyY2UgdGhlIHByb3RvY29sIHJlY2VpdmluZyB0aGUgbWVzc2FnZXNcbiAqIFxccGFyYW0gbmFtZSB0aGUgbmFtZSBvZiB0aGUgcHJvdG9jb2wsIGRlZmF1bHQgaXMgJ3VuaWNhc3QnXG4gKi9cbmZ1bmN0aW9uIFVuaWNhc3Qoc291cmNlLCBtYXgsIG5hbWUpIHtcbiAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lIHx8ICd1bmljYXN0JztcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5zb3VyY2Uub24oc2VsZi5uYW1lKyctcmVjZWl2ZScsIGZ1bmN0aW9uKHNvY2tldCwgbWVzc2FnZSl7XG4gICAgICAgIHNlbGYuZW1pdCgncmVjZWl2ZScsIHNvY2tldCwgbWVzc2FnZS5wYXlsb2FkKTtcbiAgICB9KTtcbn07XG5cbi8qIVxuICogXFxicmllZiBzZW5kIHRoZSBtZXNzYWdlIHRvIG9uZSByYW5kb20gcGFydGljaXBhbnRcbiAqIFxccGFyYW0gbWVzc2FnZSB0aGUgbWVzc2FnZSB0byBzZW5kXG4gKiBcXHBhcmFtIHNvY2tldCBvcHRpb25hbCBrbm93biBzb2NrZXRcbiAqL1xuVW5pY2FzdC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHNvY2tldCl7XG4gICAgLy8gIzEgZ2V0IHRoZSBuZWlnaGJvcmhvb2QgYW5kIGNyZWF0ZSB0aGUgbWVzc2FnZVxuICAgIHZhciBsaW5rcyA9IChzb2NrZXQgJiYgW3NvY2tldF0pIHx8IHRoaXMuc291cmNlLmdldFBlZXJzKDEpO1xuICAgIHZhciBtVW5pY2FzdCA9IG5ldyBNVW5pY2FzdCh0aGlzLm5hbWUsIG1lc3NhZ2UpO1xuICAgIC8vICMyIHNlbmQgdGhlIG1lc3NhZ2VcbiAgICBpZiAobGlua3MubGVuZ3RoPjAgJiYgbGlua3NbMF0uY29ubmVjdGVkKXtcbiAgICAgICAgbGlua3NbMF0uc2VuZChtVW5pY2FzdCk7XG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVW5pY2FzdDtcbiIsInZhciBCSSA9IHJlcXVpcmUoJ0JpZ0ludCcpO1xuXG4vKiFcbiAqIFxcY2xhc3MgQmFzZVxuICogXFxicmllZiBwcm92aWRlcyBiYXNpYyBmdW5jdGlvbiB0byBiaXQgbWFuaXB1bGF0aW9uXG4gKiBcXHBhcmFtIGIgdGhlIG51bWJlciBvZiBiaXRzIGF0IGxldmVsIDAgb2YgdGhlIGRlbnNlIHNwYWNlXG4gKi9cbmZ1bmN0aW9uIEJhc2UoYil7ICAgIFxuICAgIHZhciBERUZBVUxUX0JBU0UgPSAzO1xuICAgIHRoaXMuX2IgPSBiIHx8IERFRkFVTFRfQkFTRTtcbn07XG5cbi8qIVxuICogXFxicmllZiBQcm9jZXNzIHRoZSBudW1iZXIgb2YgYml0cyB1c2FnZSBhdCBhIGNlcnRhaW4gbGV2ZWwgb2YgZGVuc2Ugc3BhY2VcbiAqIFxccGFyYW0gbGV2ZWwgdGhlIGxldmVsIGluIGRlbnNlIHNwYWNlLCBpLmUuLCB0aGUgbnVtYmVyIG9mIGNvbmNhdGVuYXRpb25cbiAqL1xuQmFzZS5wcm90b3R5cGUuZ2V0Qml0QmFzZSA9IGZ1bmN0aW9uKGxldmVsKXtcbiAgICByZXR1cm4gdGhpcy5fYiArIGxldmVsO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIFByb2Nlc3MgdGhlIHRvdGFsIG51bWJlciBvZiBiaXRzIHVzYWdlIHRvIGdldCB0byBhIGNlcnRhaW4gbGV2ZWxcbiAqIFxccGFyYW0gbGV2ZWwgdGhlIGxldmVsIGluIGRlbnNlIHNwYWNlXG4gKi9cbkJhc2UucHJvdG90eXBlLmdldFN1bUJpdCA9IGZ1bmN0aW9uKGxldmVsKXtcbiAgICB2YXIgbiA9IHRoaXMuZ2V0Qml0QmFzZShsZXZlbCksXG4gICAgICAgIG0gPSB0aGlzLl9iLTE7XG4gICAgcmV0dXJuIChuICogKG4gKyAxKSkgLyAyIC0gKG0gKiAobSArIDEpIC8gMik7XG59O1xuXG4vKiFcbiAgXFxicmllZiBwcm9jZXNzIHRoZSBpbnRlcnZhbCBiZXR3ZWVuIHR3byBMU0VRTm9kZVxuICBcXHBhcmFtIHAgdGhlIHByZXZpb3VzIExTRVFOb2RlXG4gIFxccGFyYW0gcSB0aGUgbmV4dCBMU0VRTm9kZVxuICBcXHBhcmFtIGxldmVsIHRoZSBkZXB0aCBvZiB0aGUgdHJlZSB0byBwcm9jZXNzXG4gIFxccmV0dXJuIGFuIGludGVnZXIgd2hpY2ggaXMgdGhlIGludGVydmFsIGJldHdlZW4gdGhlIHR3byBub2RlIGF0IHRoZSBkZXB0aFxuKi9cbkJhc2UucHJvdG90eXBlLmdldEludGVydmFsID0gZnVuY3Rpb24ocCwgcSwgbGV2ZWwpe1xuICAgIHZhciBzdW0gPSAwLCBpID0gMCxcbiAgICAgICAgcElzR3JlYXRlciA9IGZhbHNlLCBjb21tb25Sb290ID0gdHJ1ZSxcbiAgICAgICAgcHJldlZhbHVlID0gMCwgbmV4dFZhbHVlID0gMDtcbiAgICBcbiAgICB3aGlsZSAoaTw9bGV2ZWwpe1xuXHRwcmV2VmFsdWUgPSAwOyBpZiAocCAhPT0gbnVsbCl7IHByZXZWYWx1ZSA9IHAudC5wOyB9XG4gICAgICAgIG5leHRWYWx1ZSA9IDA7IGlmIChxICE9PSBudWxsKXsgbmV4dFZhbHVlID0gcS50LnA7IH1cbiAgICAgICAgaWYgKGNvbW1vblJvb3QgJiYgcHJldlZhbHVlICE9PSBuZXh0VmFsdWUpe1xuICAgICAgICAgICAgY29tbW9uUm9vdCA9IGZhbHNlO1xuICAgICAgICAgICAgcElzR3JlYXRlciA9IHByZXZWYWx1ZSA+IG5leHRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocElzR3JlYXRlcil7IG5leHRWYWx1ZSA9IE1hdGgucG93KDIsdGhpcy5nZXRCaXRCYXNlKGkpKS0xOyB9XG4gICAgICAgIGlmIChjb21tb25Sb290IHx8IHBJc0dyZWF0ZXIgfHwgaSE9PWxldmVsKXtcbiAgICAgICAgICAgIHN1bSArPSBuZXh0VmFsdWUgLSBwcmV2VmFsdWU7IFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VtICs9IG5leHRWYWx1ZSAtIHByZXZWYWx1ZSAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkhPT1sZXZlbCl7XG4gICAgICAgICAgICBzdW0gKj0gTWF0aC5wb3coMix0aGlzLmdldEJpdEJhc2UoaSsxKSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChwIT09bnVsbCAmJiBwLmNoaWxkcmVuLmxlbmd0aCE9PTApe3A9cC5jaGlsZHJlblswXTt9IGVsc2V7cD1udWxsO307XG4gICAgICAgIGlmIChxIT09bnVsbCAmJiBxLmNoaWxkcmVuLmxlbmd0aCE9PTApe3E9cS5jaGlsZHJlblswXTt9IGVsc2V7cT1udWxsO307XG4gICAgICAgICsraTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bTtcbn07XG5cbkJhc2UuaW5zdGFuY2UgPSBudWxsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFyZ3Mpe1xuICAgIGlmIChhcmdzKXtcbiAgICAgICAgQmFzZS5pbnN0YW5jZSA9IG5ldyBCYXNlKGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChCYXNlLmluc3RhbmNlID09PSBudWxsKXtcbiAgICAgICAgICAgIEJhc2UuaW5zdGFuY2UgPSBuZXcgQmFzZSgpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIEJhc2UuaW5zdGFuY2U7XG59O1xuIiwidmFyIEJJID0gcmVxdWlyZSgnQmlnSW50Jyk7XG52YXIgQmFzZSA9IHJlcXVpcmUoJy4vYmFzZS5qcycpKCk7XG52YXIgVHJpcGxlID0gcmVxdWlyZSgnLi90cmlwbGUuanMnKTtcbnZhciBMU0VRTm9kZSA9IHJlcXVpcmUoJy4vbHNlcW5vZGUuanMnKTtcblxuLyohXG4gKiBcXGNsYXNzIElkZW50aWZpZXJcbiAqIFxcYnJpZWYgVW5pcXVlIGFuZCBpbW11dGFibGUgaWRlbnRpZmllciBjb21wb3NlZCBvZiBkaWdpdCwgc291cmNlcywgY291bnRlcnNcbiAqIFxccGFyYW0gZCB0aGUgZGlnaXQgKHBvc2l0aW9uIGluIGRlbnNlIHNwYWNlKVxuICogXFxwYXJhbSBzIHRoZSBsaXN0IG9mIHNvdXJjZXNcbiAqIFxccGFyYW0gYyB0aGUgbGlzdCBvZiBjb3VudGVyc1xuICovXG5mdW5jdGlvbiBJZGVudGlmaWVyKGQsIHMsIGMpe1xuICAgIHRoaXMuX2QgPSBkO1xuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSBjO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIHNldCB0aGUgZCxzLGMgdmFsdWVzIGFjY29yZGluZyB0byB0aGUgbm9kZSBpbiBhcmd1bWVudFxuICogXFxwYXJhbSBub2RlIHRoZSBsc2Vxbm9kZSBjb250YWluaW5nIHRoZSBwYXRoIGluIHRoZSB0cmVlIHN0cnVjdHVyZVxuICovXG5JZGVudGlmaWVyLnByb3RvdHlwZS5mcm9tTm9kZSA9IGZ1bmN0aW9uKG5vZGUpe1xuICAgIC8vICMxIHByb2Nlc3MgdGhlIGxlbmd0aCBvZiB0aGUgcGF0aFxuICAgIHZhciBsZW5ndGggPSAxLCB0ZW1wTm9kZSA9IG5vZGUsIGkgPSAwO1xuICAgIFxuICAgIHdoaWxlICh0ZW1wTm9kZS5jaGlsZHJlbi5sZW5ndGggIT09IDApe1xuXHQrK2xlbmd0aDtcbiAgICAgICAgdGVtcE5vZGUgPSB0ZW1wTm9kZS5jaGlsZHJlblswXTtcbiAgICB9O1xuICAgIC8vICMxIGNvcHkgdGhlIHZhbHVlcyBjb250YWluZWQgaW4gdGhlIHBhdGhcbiAgICB0aGlzLl9kID0gQkkuaW50MmJpZ0ludCgwLEJhc2UuZ2V0U3VtQml0KGxlbmd0aCAtIDEpKTtcbiAgICBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aCA7ICsraSl7XG4gICAgICAgIC8vICMxYSBjb3B5IHRoZSBzaXRlIGlkXG4gICAgICAgIHRoaXMuX3MucHVzaChub2RlLnQucyk7XG4gICAgICAgIC8vICMxYiBjb3B5IHRoZSBjb3VudGVyXG4gICAgICAgIHRoaXMuX2MucHVzaChub2RlLnQuYyk7XG4gICAgICAgIC8vICMxYyBjb3B5IHRoZSBkaWdpdFxuICAgICAgICBCSS5hZGRJbnRfKHRoaXMuX2QsIG5vZGUudC5wKTtcbiAgICAgICAgaWYgKGkhPT0obGVuZ3RoLTEpKXtcbiAgICAgICAgICAgIEJJLmxlZnRTaGlmdF8odGhpcy5fZCwgQmFzZS5nZXRCaXRCYXNlKGkrMSkpO1xuICAgICAgICB9O1xuICAgICAgICBub2RlID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICB9O1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGNvbnZlcnQgdGhlIGlkZW50aWZpZXIgaW50byBhIG5vZGUgd2l0aG91dCBlbGVtZW50XG4gKiBcXHBhcmFtIGUgdGhlIGVsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSBub2RlXG4gKi9cbklkZW50aWZpZXIucHJvdG90eXBlLnRvTm9kZSA9IGZ1bmN0aW9uKGUpe1xuICAgIHZhciByZXN1bHRQYXRoID0gW10sIGRCaXRMZW5ndGggPSBCYXNlLmdldFN1bUJpdCh0aGlzLl9jLmxlbmd0aCAtMSksIGkgPSAwLFxuICAgICAgICBtaW5lO1xuICAgIC8vICMxIGRlY29uc3RydWN0IHRoZSBkaWdpdCBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2MubGVuZ3RoOyArK2kpe1xuICAgICAgICAvLyAjMSB0cnVuY2F0ZSBtaW5lXG4gICAgICAgIG1pbmUgPSBCSS5kdXAodGhpcy5fZCk7XG4gICAgICAgIC8vICMxYSBzaGlmdCByaWdodCB0byBlcmFzZSB0aGUgdGFpbCBvZiB0aGUgcGF0aFxuICAgICAgICBCSS5yaWdodFNoaWZ0XyhtaW5lLCBkQml0TGVuZ3RoIC0gQmFzZS5nZXRTdW1CaXQoaSkpO1xuICAgICAgICAvLyAjMWIgY29weSB2YWx1ZSBpbiB0aGUgcmVzdWx0XG4gICAgICAgIHJlc3VsdFBhdGgucHVzaChuZXcgVHJpcGxlKEJJLm1vZEludChtaW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coMixCYXNlLmdldEJpdEJhc2UoaSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY1tpXSkpO1xuICAgIH07XG4gICAgcmV0dXJuIG5ldyBMU0VRTm9kZShyZXN1bHRQYXRoLCBlKTtcbn07XG5cbi8qIVxuICogXFxicmllZiBjb21wYXJlIHR3byBpZGVudGlmaWVyc1xuICogXFxwYXJhbSBvIHRoZSBvdGhlciBpZGVudGlmaWVyXG4gKiBcXHJldHVybiAtMSBpZiB0aGlzIGlzIGxvd2VyLCAwIGlmIHRoZXkgYXJlIGVxdWFsLCAxIGlmIHRoaXMgaXMgZ3JlYXRlclxuICovXG5JZGVudGlmaWVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24obyl7XG4gICAgdmFyIGRCaXRMZW5ndGggPSBCYXNlLmdldFN1bUJpdCh0aGlzLl9jLmxlbmd0aCAtIDEpLFxuICAgICAgICBvZEJpdExlbmd0aCA9IEJhc2UuZ2V0U3VtQml0KG8uX2MubGVuZ3RoIC0gMSksXG4gICAgICAgIGNvbXBhcmluZyA9IHRydWUsXG4gICAgICAgIGNvbXAgPSAwLCBpID0gMCxcbiAgICAgICAgc3VtLCBtaW5lLCBvdGhlcjtcbiAgICBcbiAgICAvLyAjMSBDb21wYXJlIHRoZSBsaXN0IG9mIDxkLHMsYz5cbiAgICB3aGlsZSAoY29tcGFyaW5nICYmIGkgPCBNYXRoLm1pbih0aGlzLl9jLmxlbmd0aCwgby5fYy5sZW5ndGgpICkge1xuICAgICAgICAvLyBjYW4gc3RvcCBiZWZvcmUgdGhlIGVuZCBvZiBmb3IgbG9vcCB3aXogcmV0dXJuXG4gICAgICAgIHN1bSA9IEJhc2UuZ2V0U3VtQml0KGkpO1xuICAgICAgICAvLyAjMWEgdHJ1bmNhdGUgbWluZVxuICAgICAgICBtaW5lID0gQkkuZHVwKHRoaXMuX2QpO1xuICAgICAgICBCSS5yaWdodFNoaWZ0XyhtaW5lLCBkQml0TGVuZ3RoIC0gc3VtKTtcbiAgICAgICAgLy8gIzFiIHRydW5jYXRlIG90aGVyXG4gICAgICAgIG90aGVyID0gQkkuZHVwKG8uX2QpO1xuICAgICAgICBCSS5yaWdodFNoaWZ0XyhvdGhlciwgb2RCaXRMZW5ndGggLSBzdW0pO1xuICAgICAgICAvLyAjMiBDb21wYXJlIHRyaXBsZXNcbiAgICAgICAgaWYgKCFCSS5lcXVhbHMobWluZSxvdGhlcikpIHsgIC8vICMyYSBkaWdpdFxuICAgICAgICAgICAgaWYgKEJJLmdyZWF0ZXIobWluZSxvdGhlcikpe2NvbXAgPSAxO31lbHNle2NvbXAgPSAtMTt9O1xuICAgICAgICAgICAgY29tcGFyaW5nID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wID0gdGhpcy5fc1tpXSAtIG8uX3NbaV07IC8vICMyYiBzb3VyY2VcbiAgICAgICAgICAgIGlmIChjb21wICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29tcGFyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbXAgPSB0aGlzLl9jW2ldIC0gby5fY1tpXTsgLy8gMmMgY2xvY2tcbiAgICAgICAgICAgICAgICBpZiAoY29tcCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb21wYXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgKytpO1xuICAgIH07XG4gICAgXG4gICAgaWYgKGNvbXA9PT0wKXtcbiAgICAgICAgY29tcCA9IHRoaXMuX2MubGVuZ3RoIC0gby5fYy5sZW5ndGg7IC8vICMzIGNvbXBhcmUgbGlzdCBzaXplXG4gICAgfTtcbiAgICByZXR1cm4gY29tcDtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBJZGVudGlmaWVyO1xuIiwidmFyIFRyaXBsZSA9IHJlcXVpcmUoJy4vdHJpcGxlLmpzJyk7XG5yZXF1aXJlKCcuL3V0aWwuanMnKTtcblxuLyohXG4gKiBcXGJyaWVmIGEgbm9kZSBvZiB0aGUgTFNFUSB0cmVlXG4gKiBcXHBhcmFtIHRyaXBsZUxpc3QgdGhlIGxpc3Qgb2YgdHJpcGxlIGNvbXBvc2luZyB0aGUgcGF0aCB0byB0aGUgZWxlbWVudFxuICogXFxwYXJhbSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIGluc2VydCBpbiB0aGUgc3RydWN0dXJlXG4gKi9cbmZ1bmN0aW9uIExTRVFOb2RlKHRyaXBsZUxpc3QsIGVsZW1lbnQpe1xuICAgIHRoaXMudCA9IHRyaXBsZUxpc3Quc2hpZnQoKTtcbiAgICBpZiAodHJpcGxlTGlzdC5sZW5ndGggPT09IDApe1xuICAgICAgICB0aGlzLmUgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLnN1YkNvdW50ZXIgPSAwOyAvLyBjb3VudCB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIGFuZCBzdWJjaGlsZHJlblxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdWJDb3VudGVyID0gMTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IExTRVFOb2RlKHRyaXBsZUxpc3QsIGVsZW1lbnQpKTtcbiAgICB9O1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGFkZCBhIHBhdGggZWxlbWVudCB0byB0aGUgY3VycmVudCBub2RlXG4gKiBcXHBhcmFtIG5vZGUgdGhlIG5vZGUgdG8gYWRkIGFzIGEgY2hpbGRyZW4gb2YgdGhpcyBub2RlXG4gKiBcXHJldHVybiAtMSBpZiB0aGUgZWxlbWVudCBhbHJlYWR5IGV4aXN0c1xuICovXG5MU0VRTm9kZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24obm9kZSl7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5jaGlsZHJlbi5iaW5hcnlJbmRleE9mKG5vZGUpO1xuICAgIFxuICAgIC8vICMxIGlmIHRoZSBwYXRoIGRvIG5vIGV4aXN0LCBjcmVhdGUgaXRcbiAgICBpZiAoaW5kZXggPCAwIHx8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwICB8fFxuICAgICAgICAoaW5kZXggPT09IDAgJiYgdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwICYmIFxuICAgICAgICAgdGhpcy5jaGlsZHJlblswXS5jb21wYXJlKG5vZGUpIT09MCkpe1xuICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSgtaW5kZXgsIDAsIG5vZGUpO1xuICAgICAgICB0aGlzLnN1YkNvdW50ZXIrPTE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gIzIgb3RoZXJ3aXNlLCBjb250aW51ZSB0byBleHBsb3JlIHRoZSBzdWJ0cmVlc1xuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgLy8gIzJhIGNoZWNrIGlmIHRoZSBlbGVtZW50IGFscmVhZHkgZXhpc3RzXG4gICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbltpbmRleF0uZSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2luZGV4XS5lID0gbm9kZS5lO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViQ291bnRlcis9MTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAjMyBpZiBkaWRub3QgZXhpc3QsIGluY3JlbWVudCB0aGUgY291bnRlclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5baW5kZXhdLmFkZChub2RlLmNoaWxkcmVuWzBdKSE9PS0xKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YkNvdW50ZXIrPTE7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG59O1xuXG4vKiEgXG4gKiBcXGJyaWVmIHJlbW92ZSB0aGUgbm9kZSBvZiB0aGUgdHJlZSBhbmQgYWxsIG5vZGUgd2l0aGluIHBhdGggYmVpbmcgdXNlbGVzc1xuICogXFxwYXJhbSBub2RlIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHBhdGggdG8gcmVtb3ZlXG4gKiBcXHJldHVybiAtMSBpZiB0aGUgbm9kZSBkb2VzIG5vdCBleGlzdFxuICovXG5MU0VRTm9kZS5wcm90b3R5cGUuZGVsID0gZnVuY3Rpb24obm9kZSl7XG4gICAgdmFyIGluZGV4ZXMgPSB0aGlzLmdldEluZGV4ZXMobm9kZSksXG4gICAgICAgIGN1cnJlbnRUcmVlID0gdGhpcywgaSA9IDAsIGlzU3BsaXR0ZWQgPSBmYWxzZTtcblxuICAgIGlmIChpbmRleGVzID09PSAtMSkgeyByZXR1cm4gLTE7IH07IC8vIGl0IGRvZXMgbm90IGV4aXN0c1xuICAgIHRoaXMuc3ViQ291bnRlciAtPSAxO1xuICAgIHdoaWxlIChpIDwgaW5kZXhlcy5sZW5ndGggJiYgIShpc1NwbGl0dGVkKSl7XG4gICAgICAgIGlmICghKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLmUgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgaT09PShpbmRleGVzLmxlbmd0aCAtIDEpKSl7XG4gICAgICAgICAgICBjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleGVzW2ldXS5zdWJDb3VudGVyIC09IDE7ICAgICBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLnN1YkNvdW50ZXIgPD0gMFxuICAgICAgICAgICAgJiYgKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLmUgPT09IG51bGwgfHxcbiAgICAgICAgICAgICAgICAoY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhlc1tpXV0uZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICBpPT09KGluZGV4ZXMubGVuZ3RoIC0gMSkpKSl7XG4gICAgICAgICAgICBjdXJyZW50VHJlZS5jaGlsZHJlbi5zcGxpY2UoaW5kZXhlc1tpXSwxKTtcbiAgICAgICAgICAgIGlzU3BsaXR0ZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBjdXJyZW50VHJlZSA9IGN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dO1xuICAgICAgICArK2k7XG4gICAgfTtcbiAgICBpZiAoIWlzU3BsaXR0ZWQpeyBjdXJyZW50VHJlZS5lID0gbnVsbDt9O1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGNvbXBhcmlzb24gZnVuY3Rpb24gdXNlZCB0byBvcmRlciB0aGUgbGlzdCBvZiBjaGlsZHJlbiBhdCBlYWNoIG5vZGVcbiAqIFxccGFyYW0gbyB0aGUgb3RoZXIgbm9kZSB0byBjb21wYXJlIHdpdGhcbiAqL1xuTFNFUU5vZGUucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbihvKXtcbiAgICByZXR1cm4gdGhpcy50LmNvbXBhcmUoby50KTtcbn07XG5cbi8qIVxuICogXFxicmllZiB0aGUgb3JkZXJlZCB0cmVlIGNhbiBiZSBsaW5lYXJpemVkIGludG8gYSBzZXF1ZW5jZS4gVGhpcyBmdW5jdGlvbiBnZXRcbiAqIHRoZSBpbmRleCBvZiB0aGUgcGF0aCByZXByZXNlbnRlZCBieSB0aGUgbGlzdCBvZiB0cmlwbGVzXG4gKiBcXHBhcmFtIG5vZGUgdGhlIG5vZGUgY29udGFpbmluZyB0aGUgcGF0aFxuICogXFxyZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBwYXRoIGluIHRoZSBub2RlXG4gKi9cbkxTRVFOb2RlLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24obm9kZSl7XG4gICAgdmFyIGluZGV4ZXMgPSB0aGlzLmdldEluZGV4ZXMobm9kZSksXG4gICAgICAgIHN1bSA9IDAsIGN1cnJlbnRUcmVlID0gdGhpcyxcbiAgICAgICAgaiA9IDA7XG4gICAgaWYgKGluZGV4ZXMgPT09IC0xKXtyZXR1cm4gLTE7fTsgLy8gbm9kZSBkb2VzIG5vdCBleGlzdFxuICAgIGlmICh0aGlzLmUgIT09IG51bGwpeyBzdW0gKz0xOyB9O1xuICAgIFxuICAgIGZvciAodmFyIGkgPSAwOyBpPGluZGV4ZXMubGVuZ3RoOyArK2kpe1xuICAgICAgICBpZiAoaW5kZXhlc1tpXSA8IChjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGgvMikpe1xuICAgICAgICAgICAgLy8gI0Egc3RhcnQgZnJvbSB0aGUgYmVnaW5uaW5nXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgajxpbmRleGVzW2ldOyArK2ope1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5lICE9PSBudWxsKXsgc3VtKz0xOyB9O1xuICAgICAgICAgICAgICAgIHN1bSArPSBjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5zdWJDb3VudGVyO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICNCIHN0YXJ0IGZyb20gdGhlIGVuZFxuICAgICAgICAgICAgc3VtICs9IGN1cnJlbnRUcmVlLnN1YkNvdW50ZXI7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gY3VycmVudFRyZWUuY2hpbGRyZW4ubGVuZ3RoLTE7IGo+PWluZGV4ZXNbaV07LS1qKXtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRyZWUuY2hpbGRyZW5bal0uZSAhPT0gbnVsbCl7IHN1bS09MTsgfTtcbiAgICAgICAgICAgICAgICBzdW0gLT0gY3VycmVudFRyZWUuY2hpbGRyZW5bal0uc3ViQ291bnRlcjsgIFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGogKz0gMTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLmUgIT09IG51bGwpeyBzdW0rPTE7IH07XG4gICAgICAgIGN1cnJlbnRUcmVlID0gY3VycmVudFRyZWUuY2hpbGRyZW5bal07XG4gICAgfTtcbiAgICByZXR1cm4gc3VtLTE7IC8vIC0xIGJlY2F1c2UgYWxnb3JpdGhtIGNvdW50ZWQgdGhlIGVsZW1lbnQgaXRzZWxmXG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgZ2V0IHRoZSBsaXN0IG9mIGluZGV4ZXMgb2YgdGhlIGFycmF5cyByZXByZXNlbnRpbmcgdGhlIGNoaWxkcmVuIGluXG4gKiB0aGUgdHJlZVxuICogXFxwYXJhbSBub2RlIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHBhdGhcbiAqIFxccmV0dXJuIGEgbGlzdCBvZiBpbnRlZ2VyXG4gKi9cbkxTRVFOb2RlLnByb3RvdHlwZS5nZXRJbmRleGVzID0gZnVuY3Rpb24obm9kZSl7XG4gICAgZnVuY3Rpb24gX2dldEluZGV4ZXMoaW5kZXhlcywgY3VycmVudFRyZWUsIGN1cnJlbnROb2RlKXtcbiAgICAgICAgdmFyIGluZGV4ID0gY3VycmVudFRyZWUuY2hpbGRyZW4uYmluYXJ5SW5kZXhPZihjdXJyZW50Tm9kZSk7XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHxcbiAgICAgICAgICAgIChpbmRleD09PTAgJiYgY3VycmVudFRyZWUuY2hpbGRyZW4ubGVuZ3RoPT09MCkpeyByZXR1cm4gLTE7IH1cbiAgICAgICAgaW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aD09PTAgfHxcbiAgICAgICAgICAgIGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aD09PTApe1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4ZXM7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfZ2V0SW5kZXhlcyhpbmRleGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUuY2hpbGRyZW5bMF0pO1xuICAgICAgICBcbiAgICB9O1xuICAgIHJldHVybiBfZ2V0SW5kZXhlcyhbXSwgdGhpcywgbm9kZSk7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgdGhlIG9yZGVyZWQgdHJlZSBjYW4gYmUgbGluZWFyaXplZC4gVGhpcyBmdW5jdGlvbiBnZXRzIHRoZSBub2RlIGF0XG4gKiB0aGUgaW5kZXggaW4gdGhlIHByb2plY3RlZCBzZXF1ZW5jZS5cbiAqIFxccGFyYW0gaW5kZXggdGhlIGluZGV4IGluIHRoZSBzZXF1ZW5jZVxuICogXFxyZXR1cm5zIHRoZSBub2RlIGF0IHRoZSBpbmRleFxuICovXG5MU0VRTm9kZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgIGZ1bmN0aW9uIF9nZXQobGVmdFN1bSwgYnVpbGRpbmdOb2RlLCBxdWV1ZSwgY3VycmVudE5vZGUpe1xuICAgICAgICB2YXIgc3RhcnRCZWdpbm5pbmcgPSB0cnVlLCB1c2VGdW5jdGlvbiwgaSA9IDAsXG4gICAgICAgICAgICBwLCB0ZW1wO1xuICAgICAgICAvLyAjMCB0aGUgbm9kZSBpcyBmb3VuZCwgcmV0dXJuIHRoZSBpbmNyZW1lbnRhbGx5IGJ1aWx0IG5vZGUgYW5kIHByYWlzZVxuICAgICAgICAvLyAjdGhlIHN1biAhXG4gICAgICAgIGlmIChsZWZ0U3VtID09PSBpbmRleCAmJiBjdXJyZW50Tm9kZS5lICE9PSBudWxsKXtcbiAgICAgICAgICAgIC8vIDFhIGNvcHkgdGhlIHZhbHVlIG9mIHRoZSBlbGVtZW50IGluIHRoZSBwYXRoXG4gICAgICAgICAgICBxdWV1ZS5lID0gY3VycmVudE5vZGUuZTtcbiAgICAgICAgICAgIHJldHVybiBidWlsZGluZ05vZGU7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS5lICE9PSBudWxsKXsgbGVmdFN1bSArPSAxOyB9O1xuXG4gICAgICAgIC8vICMxIHNlYXJjaDogZG8gSSBzdGFydCBmcm9tIHRoZSBiZWdpbm5pbmcgb3IgdGhlIGVuZFxuICAgICAgICBzdGFydEJlZ2lubmluZyA9ICgoaW5kZXgtbGVmdFN1bSk8KGN1cnJlbnROb2RlLnN1YkNvdW50ZXIvMikpO1xuICAgICAgICBpZiAoc3RhcnRCZWdpbm5pbmcpe1xuICAgICAgICAgICAgdXNlRnVuY3Rpb24gPSBmdW5jdGlvbihhLGIpe3JldHVybiBhK2I7fTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlZnRTdW0gKz0gY3VycmVudE5vZGUuc3ViQ291bnRlcjtcbiAgICAgICAgICAgIHVzZUZ1bmN0aW9uID0gZnVuY3Rpb24oYSxiKXtyZXR1cm4gYS1iO307XG4gICAgICAgIH1cblxuICAgICAgICAvLyAjMmEgY291bnRpbmcgdGhlIGVsZW1lbnQgZnJvbSBsZWZ0IHRvIHJpZ2h0XG4gICAgICAgIGlmICghc3RhcnRCZWdpbm5pbmcpIHsgaSA9IGN1cnJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aC0xOyB9O1xuICAgICAgICB3aGlsZSAoKHN0YXJ0QmVnaW5uaW5nICYmIGxlZnRTdW0gPD0gaW5kZXgpIHx8XG4gICAgICAgICAgICAgICAoIXN0YXJ0QmVnaW5uaW5nICYmIGxlZnRTdW0gPiBpbmRleCkpe1xuICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLmUhPT1udWxsKXtcbiAgICAgICAgICAgICAgICBsZWZ0U3VtID0gdXNlRnVuY3Rpb24obGVmdFN1bSwgMSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sY3VycmVudE5vZGUuY2hpbGRyZW5baV0uc3ViQ291bnRlcik7XG4gICAgICAgICAgICBpID0gdXNlRnVuY3Rpb24oaSwgMSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gIzJiIGRlY3JlYXNpbmcgdGhlIGluY3JlbWVudGF0aW9uXG4gICAgICAgIGkgPSB1c2VGdW5jdGlvbihpLC0xKTtcbiAgICAgICAgaWYgKHN0YXJ0QmVnaW5uaW5nKXtcbiAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZS5jaGlsZHJlbltpXS5lIT09bnVsbCl7XG4gICAgICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sIC0xKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZWZ0U3VtID0gdXNlRnVuY3Rpb24obGVmdFN1bSwtY3VycmVudE5vZGUuY2hpbGRyZW5baV0uc3ViQ291bnRlcik7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvLyAjMyBidWlsZCBwYXRoXG4gICAgICAgIHAgPSBbXTsgcC5wdXNoKGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLnQpO1xuICAgICAgICBpZiAoYnVpbGRpbmdOb2RlID09PSBudWxsKXtcbiAgICAgICAgICAgIGJ1aWxkaW5nTm9kZSA9IG5ldyBMU0VRTm9kZShwLG51bGwpO1xuICAgICAgICAgICAgcXVldWUgPSBidWlsZGluZ05vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZW1wID0gbmV3IExTRVFOb2RlKHAsbnVsbCk7XG4gICAgICAgICAgICBxdWV1ZS5hZGQodGVtcCk7XG4gICAgICAgICAgICBxdWV1ZSA9IHRlbXA7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfZ2V0KGxlZnRTdW0sIGJ1aWxkaW5nTm9kZSwgcXVldWUsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldKTtcbiAgICB9O1xuICAgIHJldHVybiBfZ2V0KDAsIG51bGwsIG51bGwsIHRoaXMpO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGNhc3QgdGhlIEpTT04gb2JqZWN0IHRvIGEgTFNFUU5vZGVcbiAqIFxccGFyYW0gb2JqZWN0IHRoZSBKU09OIG9iamVjdFxuICogXFxyZXR1cm4gYSBzZWxmIHJlZmVyZW5jZVxuICovXG5MU0VRTm9kZS5wcm90b3R5cGUuZnJvbUpTT04gPSBmdW5jdGlvbihvYmplY3Qpe1xuICAgIHRoaXMudCA9IG5ldyBUcmlwbGUob2JqZWN0LnQucCwgb2JqZWN0LnQucywgb2JqZWN0LnQuYyk7XG4gICAgaWYgKG9iamVjdC5jaGlsZHJlbi5sZW5ndGggPT09IDApe1xuICAgICAgICB0aGlzLmUgPSBvYmplY3QuZTtcbiAgICAgICAgdGhpcy5zdWJDb3VudGVyID0gMDtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3ViQ291bnRlciA9IDE7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKFxuICAgICAgICAgICAgKG5ldyBMU0VRTm9kZShbXSwgbnVsbCkuZnJvbUpTT04ob2JqZWN0LmNoaWxkcmVuWzBdKSkpO1xuICAgIH07XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExTRVFOb2RlO1xuIiwidmFyIEJJID0gcmVxdWlyZSgnQmlnSW50Jyk7XG52YXIgQmFzZSA9IHJlcXVpcmUoJy4vYmFzZS5qcycpKDE1KTtcbnZhciBTID0gcmVxdWlyZSgnLi9zdHJhdGVneS5qcycpKDEwKTtcbnZhciBJRCA9IHJlcXVpcmUoJy4vaWRlbnRpZmllci5qcycpO1xudmFyIFRyaXBsZSA9IHJlcXVpcmUoJy4vdHJpcGxlLmpzJyk7XG52YXIgTFNFUU5vZGUgPSByZXF1aXJlKCcuL2xzZXFub2RlLmpzJyk7XG5cbi8qIVxuICogXFxjbGFzcyBMU0VRVHJlZVxuICpcbiAqIFxcYnJpZWYgRGlzdHJpYnV0ZWQgYXJyYXkgdXNpbmcgTFNFUSBhbGxvY2F0aW9uIHN0cmF0ZWd5IHdpdGggYW4gdW5kZXJseWluZ1xuICogZXhwb25lbnRpYWwgdHJlZSBtb2RlbFxuICovXG5mdW5jdGlvbiBMU0VRVHJlZShzKXtcbiAgICB2YXIgbGlzdFRyaXBsZTtcbiAgICBcbiAgICB0aGlzLl9zID0gcztcbiAgICB0aGlzLl9jID0gMDtcbiAgICB0aGlzLl9oYXNoID0gZnVuY3Rpb24oZGVwdGgpIHsgcmV0dXJuIGRlcHRoJTI7IH07XG4gICAgdGhpcy5sZW5ndGggPSAwO1xuXG4gICAgdGhpcy5yb290ID0gbmV3IExTRVFOb2RlKFtdLG51bGwpO1xuICAgIGxpc3RUcmlwbGUgPSBbXTsgbGlzdFRyaXBsZS5wdXNoKG5ldyBUcmlwbGUoMCwwLDApKTsgIC8vIG1pbiBib3VuZFxuICAgIHRoaXMucm9vdC5hZGQobmV3IExTRVFOb2RlKGxpc3RUcmlwbGUsIFwiXCIpKTtcbiAgICBsaXN0VHJpcGxlID0gW107XG4gICAgbGlzdFRyaXBsZS5wdXNoKG5ldyBUcmlwbGUoTWF0aC5wb3coMixCYXNlLmdldEJpdEJhc2UoMCkpLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIuTUFYX1ZBTFVFKSk7IC8vIG1heCBib3VuZFxuICAgIHRoaXMucm9vdC5hZGQobmV3IExTRVFOb2RlKGxpc3RUcmlwbGUsIFwiXCIpKTtcbn07XG5cbi8qIVxuICogXFxicmllZiByZXR1cm4gdGhlIExTRVFOb2RlIG9mIHRoZSBlbGVtZW50IGF0ICB0YXJnZXRlZCBpbmRleFxuICogXFxwYXJhbSBpbmRleCB0aGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGhlIGZsYXR0ZW5lZCBhcnJheVxuICogXFxyZXR1cm4gdGhlIExTRVFOb2RlIHRhcmdldGluZyB0aGUgZWxlbWVudCBhdCBpbmRleFxuICovXG5MU0VRVHJlZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgIC8vICMxIHNlYXJjaCBpbiB0aGUgdHJlZSB0byBnZXQgdGhlIHZhbHVlXG4gICAgcmV0dXJuIHRoaXMucm9vdC5nZXQoaW5kZXgpO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGluc2VydCBhIHZhbHVlIGF0IHRoZSB0YXJnZXRlZCBpbmRleFxuICogXFxwYXJhbSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIGluc2VydFxuICogXFxwYXJhbSBpbmRleCB0aGUgcG9zaXRpb24gaW4gdGhlIGFycmF5XG4gKiBcXHJldHVybiBhIHBhaXIge19lOiBlbGVtZW50ICwgX2k6IGlkZW50aWZpZXJ9XG4gKi9cbkxTRVFUcmVlLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbihlbGVtZW50LCBpbmRleCl7XG4gICAgdmFyIHBlaSA9IHRoaXMuZ2V0KGluZGV4KSwgLy8gIzFhIHByZXZpb3VzIGJvdW5kXG4gICAgICAgIHFlaSA9IHRoaXMuZ2V0KGluZGV4KzEpLCAvLyAjMWIgbmV4dCBib3VuZFxuICAgICAgICBpZCwgY291cGxlO1xuICAgIHRoaXMuX2MgKz0gMTsgLy8gIzJhIGluY3JlbWVudGluZyB0aGUgbG9jYWwgY291bnRlclxuICAgIGlkID0gdGhpcy5hbGxvYyhwZWksIHFlaSk7IC8vICMyYiBnZW5lcmF0aW5nIHRoZSBpZCBpbmJldHdlZW4gdGhlIGJvdW5kc1xuICAgIC8vICMzIGFkZCBpdCB0byB0aGUgc3RydWN0dXJlIGFuZCByZXR1cm4gdmFsdWVcbiAgICBjb3VwbGUgPSB7X2U6IGVsZW1lbnQsIF9pOiBpZH1cbiAgICB0aGlzLmFwcGx5SW5zZXJ0KGVsZW1lbnQsIGlkLCB0cnVlKTtcbiAgICByZXR1cm4gY291cGxlO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGRlbGV0ZSB0aGUgZWxlbWVudCBhdCB0aGUgaW5kZXhcbiAqIFxccGFyYW0gaW5kZXggdGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIGRlbGV0ZSBpbiB0aGUgYXJyYXlcbiAqIFxccmV0dXJuIHRoZSBpZGVudGlmaWVyIG9mIHRoZSBlbGVtZW50IGF0IHRoZSBpbmRleFxuICovXG5MU0VRVHJlZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgIHZhciBlaSA9IHRoaXMuZ2V0KGluZGV4KzEpLFxuICAgICAgICBpID0gbmV3IElEKG51bGwsIFtdLCBbXSk7XG4gICAgaS5mcm9tTm9kZShlaSk7IC8vIGZyb20gbm9kZSAtPiBpZFxuICAgIHRoaXMuYXBwbHlSZW1vdmUoZWkpOyBcbiAgICByZXR1cm4gaTtcbn07XG5cbi8qIVxuICogXFxicmllZiBnZW5lcmF0ZSB0aGUgZGlnaXQgcGFydCBvZiB0aGUgaWRlbnRpZmllcnMgIGJldHdlZW4gcCBhbmQgcVxuICogXFxwYXJhbSBwIHRoZSBkaWdpdCBwYXJ0IG9mIHRoZSBwcmV2aW91cyBpZGVudGlmaWVyXG4gKiBcXHBhcmFtIHEgdGhlIGRpZ2l0IHBhcnQgb2YgdGhlIG5leHQgaWRlbnRpZmllclxuICogXFxyZXR1cm4gdGhlIGRpZ2l0IHBhcnQgbG9jYXRlZCBiZXR3ZWVuIHAgYW5kIHFcbiAqL1xuTFNFUVRyZWUucHJvdG90eXBlLmFsbG9jID0gZnVuY3Rpb24gKHAscSl7XG4gICAgdmFyIGludGVydmFsID0gMCwgbGV2ZWwgPSAwO1xuICAgIC8vICMxIHByb2Nlc3MgdGhlIGxldmVsIG9mIHRoZSBuZXcgaWRlbnRpZmllclxuICAgIHdoaWxlIChpbnRlcnZhbDw9MCl7IC8vIG5vIHJvb20gZm9yIGluc2VydGlvblxuICAgICAgICBpbnRlcnZhbCA9IEJhc2UuZ2V0SW50ZXJ2YWwocCwgcSwgbGV2ZWwpOyAvLyAoVE9ETykgb3B0aW1pemVcbiAgICAgICAgKytsZXZlbDtcbiAgICB9O1xuICAgIGxldmVsIC09IDE7XG4gICAgaWYgKHRoaXMuX2hhc2gobGV2ZWwpID09PSAwKXtcbiAgICAgICAgcmV0dXJuIFMuYlBsdXMocCwgcSwgbGV2ZWwsIGludGVydmFsLCB0aGlzLl9zLCB0aGlzLl9jKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUy5iTWludXMocCwgcSwgbGV2ZWwsIGludGVydmFsLCB0aGlzLl9zLCB0aGlzLl9jKTtcbiAgICB9O1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGluc2VydCBhbiBlbGVtZW50IGNyZWF0ZWQgZnJvbSBhIHJlbW90ZSBzaXRlIGludG8gdGhlIGFycmF5XG4gKiBcXHBhcmFtIGUgdGhlIGVsZW1lbnQgdG8gaW5zZXJ0XG4gKiBcXHBhcmFtIGkgdGhlIGlkZW50aWZpZXIgb2YgdGhlIGVsZW1lbnRcbiAqIFxccGFyYW0gbm9JbmRleCB3aGV0aGVyIG9yIG5vdCBpdCBzaG91bGQgcmV0dXJuIHRoZSBpbmRleCBvZiB0aGUgaW5zZXJ0XG4gKiBcXHJldHVybiB0aGUgaW5kZXggb2YgdGhlIG5ld2x5IGluc2VydGVkIGVsZW1lbnQgaW4gdGhlIGFycmF5XG4gKi9cbkxTRVFUcmVlLnByb3RvdHlwZS5hcHBseUluc2VydCA9IGZ1bmN0aW9uKGUsIGksIG5vSW5kZXgpe1xuICAgIHZhciBub2RlLCByZXN1bHQ7XG4gICAgLy8gIzAgY2FzdCBmcm9tIHRoZSBwcm9wZXIgdHlwZVxuICAgIC8vICMwQSB0aGUgaWRlbnRpZmllciBpcyBhbiBJRFxuICAgIGlmIChpICYmIGkuX2QgJiYgaS5fcyAmJiBpLl9jKXtcbiAgICAgICAgbm9kZSA9IChuZXcgSUQoaS5fZCwgaS5fcywgaS5fYykudG9Ob2RlKGUpKTtcbiAgICB9O1xuICAgIC8vICMwQiB0aGUgaWRlbnRpZmllciBpcyBhIExTRVFOb2RlXG4gICAgaWYgKGkgJiYgaS50ICYmIGkuY2hpbGRyZW4pe1xuICAgICAgICBub2RlID0gKG5ldyBMU0VRTm9kZShbXSxudWxsKSkuZnJvbUpTT04oaSk7XG4gICAgfTtcbiAgICAvLyAjMiBpbnRlZ3JhdGVzIHRoZSBuZXcgZWxlbWVudCB0byB0aGUgZGF0YSBzdHJ1Y3R1cmVcbiAgICByZXN1bHQgPSB0aGlzLnJvb3QuYWRkKG5vZGUpO1xuICAgIGlmIChyZXN1bHQgIT09IC0xKXtcbiAgICAgICAgLy8gIzMgaWYgdGhlIGVsZW1lbnQgYXMgYmVlbiBhZGRlZFxuICAgICAgICB0aGlzLmxlbmd0aCArPSAxO1xuICAgIH07XG4gICAgcmV0dXJuIHJlc3VsdCB8fCAoIW5vSW5kZXggJiYgdGhpcy5yb290LmluZGV4T2Yobm9kZSkpO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGRlbGV0ZSB0aGUgZWxlbWVudCB3aXRoIHRoZSB0YXJnZXRlZCBpZGVudGlmaWVyXG4gKiBcXHBhcmFtIGkgdGhlIGlkZW50aWZpZXIgb2YgdGhlIGVsZW1lbnRcbiAqIFxccmV0dXJuIHRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCBmZXNobHkgZGVsZXRlZCwgLTEgaWYgbm8gcmVtb3ZhbFxuICovXG5MU0VRVHJlZS5wcm90b3R5cGUuYXBwbHlSZW1vdmUgPSBmdW5jdGlvbihpKXtcbiAgICB2YXIgbm9kZSwgcG9zaXRpb247XG4gICAgLy8gIzAgY2FzdCBmcm9tIHRoZSBwcm9wZXIgdHlwZVxuICAgIGlmIChpICYmIGkuX2QgJiYgaS5fcyAmJiBpLl9jKXtcbiAgICAgICAgbm9kZSA9IChuZXcgSUQoaS5fZCwgaS5fcywgaS5fYykpLnRvTm9kZShudWxsKTtcbiAgICB9O1xuICAgIC8vICMwQiB0aGUgaWRlbnRpZmllciBpcyBhIExTRVFOb2RlXG4gICAgaWYgKGkgJiYgaS50ICYmIGkuY2hpbGRyZW4pe1xuICAgICAgICBub2RlID0gKG5ldyBMU0VRTm9kZShbXSxudWxsKSkuZnJvbUpTT04oaSk7XG4gICAgfTtcbiAgICAvLyAjMSBnZXQgdGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIHJlbW92ZVxuICAgIHBvc2l0aW9uID0gdGhpcy5yb290LmluZGV4T2Yobm9kZSk7XG4gICAgaWYgKHBvc2l0aW9uICE9PSAtMSl7XG4gICAgICAgIC8vICMyIGlmIGl0IGV4aXN0cyByZW1vdmUgaXRcbiAgICAgICAgdGhpcy5yb290LmRlbChub2RlKTtcbiAgICAgICAgdGhpcy5sZW5ndGggLT0gMTtcbiAgICB9O1xuICAgIHJldHVybiBwb3NpdGlvbjtcbn07XG5cblxuLyohXG4gKiBcXGJyaWVmIGNhc3QgdGhlIEpTT04gb2JqZWN0IGludG8gYSBwcm9wZXIgTFNFUVRyZWUuXG4gKiBcXHBhcmFtIG9iamVjdCB0aGUgSlNPTiBvYmplY3QgdG8gY2FzdFxuICogXFxyZXR1cm4gYSBzZWxmIHJlZmVyZW5jZVxuICovXG5MU0VRVHJlZS5wcm90b3R5cGUuZnJvbUpTT04gPSBmdW5jdGlvbihvYmplY3Qpe1xuICAgIC8vICMxIGNvcHkgdGhlIHNvdXJjZSwgY291bnRlciwgYW5kIGxlbmd0aCBvZiB0aGUgb2JqZWN0XG4gICAgdGhpcy5fcyA9IG9iamVjdC5fcztcbiAgICB0aGlzLl9jID0gb2JqZWN0Ll9jO1xuICAgIHRoaXMubGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgICAvLyAjMiBkZXB0aCBmaXJzdCBhZGRpbmdcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZnVuY3Rpb24gZGVwdGhGaXJzdChjdXJyZW50Tm9kZSwgY3VycmVudFBhdGgpe1xuICAgICAgICB2YXIgdHJpcGxlID0gbmV3IFRyaXBsZShjdXJyZW50Tm9kZS50LnAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLnQucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUudC5jKTtcbiAgICAgICAgY3VycmVudFBhdGgucHVzaCh0cmlwbGUpO1xuICAgICAgICBpZiAoY3VycmVudE5vZGUuZSE9PW51bGwpe1xuICAgICAgICAgICAgc2VsZi5yb290LmFkZChuZXcgTFNFUU5vZGUoY3VycmVudFBhdGgsIGN1cnJlbnROb2RlLmUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGk8Y3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgZGVwdGhGaXJzdChjdXJyZW50Tm9kZS5jaGlsZHJlbltpXSwgY3VycmVudFBhdGgpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgZm9yICh2YXIgaSA9IDA7IGk8b2JqZWN0LnJvb3QuY2hpbGRyZW4ubGVuZ3RoOyArK2kpe1xuICAgICAgICBkZXB0aEZpcnN0KG9iamVjdC5yb290LCBbXSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTFNFUVRyZWU7XG4iLCJ2YXIgQkkgPSByZXF1aXJlKCdCaWdJbnQnKTtcbnZhciBCYXNlID0gcmVxdWlyZSgnLi9iYXNlLmpzJykoKTtcbnZhciBJRCA9IHJlcXVpcmUoJy4vaWRlbnRpZmllci5qcycpO1xuXG4vKiFcbiAqIFxcY2xhc3MgU3RyYXRlZ3lcbiAqIFxcYnJpZWYgRW51bWVyYXRlIHRoZSBhdmFpbGFibGUgc3ViLWFsbG9jYXRpb24gc3RyYXRlZ2llcy4gVGhlIHNpZ25hdHVyZSBvZlxuICogdGhlc2UgZnVuY3Rpb25zIGlzIGYoSWQsIElkLCBOKywgTissIE4sIE4pOiBJZC5cbiAqIFxccGFyYW0gYm91bmRhcnkgdGhlIHZhbHVlIHVzZWQgYXMgdGhlIGRlZmF1bHQgbWF4aW11bSBzcGFjaW5nIGJldHdlZW4gaWRzXG4gKi9cbmZ1bmN0aW9uIFN0cmF0ZWd5KGJvdW5kYXJ5KXtcbiAgICB2YXIgREVGQVVMVF9CT1VOREFSWSA9IDEwO1xuICAgIHRoaXMuX2JvdW5kYXJ5ID0gYm91bmRhcnkgfHwgREVGQVVMVF9CT1VOREFSWTtcbn07XG5cbi8qIVxuICogXFxicmllZiBDaG9vc2UgYW4gaWQgc3RhcnRpbmcgZnJvbSBwcmV2aW91cyBib3VuZCBhbmQgYWRkaW5nIHJhbmRvbSBudW1iZXJcbiAqIFxccGFyYW0gcCB0aGUgcHJldmlvdXMgaWRlbnRpZmllclxuICogXFxwYXJhbSBxIHRoZSBuZXh0IGlkZW50aWZpZXJcbiAqIFxccGFyYW0gbGV2ZWwgdGhlIG51bWJlciBvZiBjb25jYXRlbmF0aW9uIGNvbXBvc2luZyB0aGUgbmV3IGlkZW50aWZpZXJcbiAqIFxccGFyYW0gaW50ZXJ2YWwgdGhlIGludGVydmFsIGJldHdlZW4gcCBhbmQgcVxuICogXFxwYXJhbSBzIHRoZSBzb3VyY2UgdGhhdCBjcmVhdGVzIHRoZSBuZXcgaWRlbnRpZmllclxuICogXFxwYXJhbSBjIHRoZSBjb3VudGVyIG9mIHRoYXQgc291cmNlXG4gKi9cblN0cmF0ZWd5LnByb3RvdHlwZS5iUGx1cyA9IGZ1bmN0aW9uIChwLCBxLCBsZXZlbCwgaW50ZXJ2YWwsIHMsIGMpe1xuICAgIHZhciBjb3B5UCA9IHAsIGNvcHlRID0gcSxcbiAgICAgICAgc3RlcCA9IE1hdGgubWluKHRoaXMuX2JvdW5kYXJ5LCBpbnRlcnZhbCksIC8vIzAgdGhlIG1pbiBpbnRlcnZhbFxuICAgICAgICBkaWdpdCA9IEJJLmludDJiaWdJbnQoMCxCYXNlLmdldFN1bUJpdChsZXZlbCkpLFxuICAgICAgICB2YWx1ZTtcbiAgICBcbiAgICAvLyAjMSBjb3B5IHRoZSBwcmV2aW91cyBpZGVudGlmaWVyXG4gICAgZm9yICh2YXIgaSA9IDA7IGk8PWxldmVsOysraSl7XG5cdCAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgaWYgKHAhPT1udWxsKXsgdmFsdWUgPSBwLnQucDsgfTtcbiAgICAgICAgQkkuYWRkSW50XyhkaWdpdCx2YWx1ZSk7XG4gICAgICAgIGlmIChpIT09bGV2ZWwpeyBCSS5sZWZ0U2hpZnRfKGRpZ2l0LEJhc2UuZ2V0Qml0QmFzZShpKzEpKTsgfTtcbiAgICAgICAgaWYgKHAhPT1udWxsICYmIHAuY2hpbGRyZW4ubGVuZ3RoIT09MCl7XG4gICAgICAgICAgICBwID0gcC5jaGlsZHJlblswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHAgPSBudWxsO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgLy8gIzIgY3JlYXRlIGEgZGlnaXQgZm9yIGFuIGlkZW50aWZpZXIgYnkgYWRkaW5nIGEgcmFuZG9tIHZhbHVlXG4gICAgLy8gIzJhIERpZ2l0XG4gICAgQkkuYWRkSW50XyhkaWdpdCwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnN0ZXArMSkpO1xuICAgIC8vICMyYiBTb3VyY2UgJiBjb3VudGVyXG4gICAgcmV0dXJuIGdldFNDKGRpZ2l0LCBjb3B5UCwgY29weVEsIGxldmVsLCBzLCBjKTtcbn07XG5cblxuLyohXG4gKiBcXGJyaWVmIENob29zZSBhbiBpZCBzdGFydGluZyBmcm9tIG5leHQgYm91bmQgYW5kIHN1YnN0cmFjdCBhIHJhbmRvbSBudW1iZXJcbiAqIFxccGFyYW0gcCB0aGUgcHJldmlvdXMgaWRlbnRpZmllclxuICogXFxwYXJhbSBxIHRoZSBuZXh0IGlkZW50aWZpZXJcbiAqIFxccGFyYW0gbGV2ZWwgdGhlIG51bWJlciBvZiBjb25jYXRlbmF0aW9uIGNvbXBvc2luZyB0aGUgbmV3IGlkZW50aWZpZXJcbiAqIFxccGFyYW0gaW50ZXJ2YWwgdGhlIGludGVydmFsIGJldHdlZW4gcCBhbmQgcVxuICogXFxwYXJhbSBzIHRoZSBzb3VyY2UgdGhhdCBjcmVhdGVzIHRoZSBuZXcgaWRlbnRpZmllclxuICogXFxwYXJhbSBjIHRoZSBjb3VudGVyIG9mIHRoYXQgc291cmNlXG4gKi9cblN0cmF0ZWd5LnByb3RvdHlwZS5iTWludXMgPSBmdW5jdGlvbiAocCwgcSwgbGV2ZWwsIGludGVydmFsLCBzLCBjKXtcbiAgICB2YXIgY29weVAgPSBwLCBjb3B5USA9IHEsXG4gICAgICAgIHN0ZXAgPSBNYXRoLm1pbih0aGlzLl9ib3VuZGFyeSwgaW50ZXJ2YWwpLCAvLyAjMCBwcm9jZXNzIG1pbiBpbnRlcnZhbFxuICAgICAgICBkaWdpdCA9IEJJLmludDJiaWdJbnQoMCxCYXNlLmdldFN1bUJpdChsZXZlbCkpLFxuICAgICAgICBwSXNHcmVhdGVyID0gZmFsc2UsIGNvbW1vblJvb3QgPSB0cnVlLFxuICAgICAgICBwcmV2VmFsdWUsIG5leHRWYWx1ZTtcbiAgICBcbiAgICAvLyAjMSBjb3B5IG5leHQsIGlmIHByZXZpb3VzIGlzIGdyZWF0ZXIsIGNvcHkgbWF4VmFsdWUgQCBkZXB0aFxuICAgIGZvciAodmFyIGkgPSAwOyBpPD1sZXZlbDsrK2kpe1xuICAgICAgICBwcmV2VmFsdWUgPSAwOyBpZiAocCAhPT0gbnVsbCl7IHByZXZWYWx1ZSA9IHAudC5wOyB9XG4gICAgICAgIG5leHRWYWx1ZSA9IDA7IGlmIChxICE9PSBudWxsKXsgbmV4dFZhbHVlID0gcS50LnA7IH1cbiAgICAgICAgaWYgKGNvbW1vblJvb3QgJiYgcHJldlZhbHVlICE9PSBuZXh0VmFsdWUpe1xuICAgICAgICAgICAgY29tbW9uUm9vdCA9IGZhbHNlO1xuICAgICAgICAgICAgcElzR3JlYXRlciA9IHByZXZWYWx1ZSA+IG5leHRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocElzR3JlYXRlcil7IG5leHRWYWx1ZSA9IE1hdGgucG93KDIsQmFzZS5nZXRCaXRCYXNlKGkpKS0xOyB9XG4gICAgICAgIEJJLmFkZEludF8oZGlnaXQsIG5leHRWYWx1ZSk7XG4gICAgICAgIGlmIChpIT09bGV2ZWwpeyBCSS5sZWZ0U2hpZnRfKGRpZ2l0LEJhc2UuZ2V0Qml0QmFzZShpKzEpKTsgfVxuICAgICAgICBpZiAocSE9PW51bGwgJiYgcS5jaGlsZHJlbi5sZW5ndGghPT0wKXtcbiAgICAgICAgICAgIHEgPSBxLmNoaWxkcmVuWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcSA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChwIT09bnVsbCAmJiBwLmNoaWxkcmVuLmxlbmd0aCE9PTApe1xuICAgICAgICAgICAgcCA9IHAuY2hpbGRyZW5bMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8vICMzIGNyZWF0ZSBhIGRpZ2l0IGZvciBhbiBpZGVudGlmaWVyIGJ5IHN1YmluZyBhIHJhbmRvbSB2YWx1ZVxuICAgIC8vICMzYSBEaWdpdFxuICAgIGlmIChwSXNHcmVhdGVyKXtcbiAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgLU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpzdGVwKSApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIEJJLmFkZEludF8oZGlnaXQsIC1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqc3RlcCktMSApO1xuICAgIH07XG4gICAgXG4gICAgLy8gIzNiIFNvdXJjZSAmIGNvdW50ZXJcbiAgICByZXR1cm4gZ2V0U0MoZGlnaXQsIGNvcHlQLCBjb3B5USwgbGV2ZWwsIHMsIGMpO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGNvcGllcyB0aGUgYXBwcm9wcmlhdGVzIHNvdXJjZSBhbmQgY291bnRlciBmcm9tIHRoZSBhZGphY2VudCBcbiAqIGlkZW50aWZpZXJzIGF0IHRoZSBpbnNlcnRpb24gcG9zaXRpb24uXG4gKiBcXHBhcmFtIGQgdGhlIGRpZ2l0IHBhcnQgb2YgdGhlIG5ldyBpZGVudGlmaWVyXG4gKiBcXHBhcmFtIHAgdGhlIHByZXZpb3VzIGlkZW50aWZpZXJcbiAqIFxccGFyYW0gcSB0aGUgbmV4dCBpZGVudGlmaWVyXG4gKiBcXHBhcmFtIGxldmVsIHRoZSBzaXplIG9mIHRoZSBuZXcgaWRlbnRpZmllclxuICogXFxwYXJhbSBzIHRoZSBsb2NhbCBzaXRlIGlkZW50aWZpZXIgXG4gKiBcXHBhcmFtIGMgdGhlIGxvY2FsIG1vbm90b25pYyBjb3VudGVyXG4gKi9cbmZ1bmN0aW9uIGdldFNDKGQsIHAsIHEsIGxldmVsLCBzLCBjKXtcbiAgICB2YXIgc291cmNlcyA9IFtdLCBjb3VudGVycyA9IFtdLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgc3VtQml0ID0gQmFzZS5nZXRTdW1CaXQobGV2ZWwpLFxuICAgICAgICB0ZW1wRGlnaXQsIHZhbHVlO1xuICAgIFxuICAgIHdoaWxlIChpPD1sZXZlbCl7XG4gICAgICAgIHRlbXBEaWdpdCA9IEJJLmR1cChkKTtcbiAgICAgICAgQkkucmlnaHRTaGlmdF8odGVtcERpZ2l0LCBzdW1CaXQgLSBCYXNlLmdldFN1bUJpdChpKSk7XG4gICAgICAgIHZhbHVlID0gQkkubW9kSW50KHRlbXBEaWdpdCxNYXRoLnBvdygyLEJhc2UuZ2V0Qml0QmFzZShpKSkpO1xuICAgICAgICBzb3VyY2VzW2ldPXM7XG4gICAgICAgIGNvdW50ZXJzW2ldPWNcbiAgICAgICAgaWYgKHEhPT1udWxsICYmIHEudC5wPT09dmFsdWUpeyBzb3VyY2VzW2ldPXEudC5zOyBjb3VudGVyc1tpXT1xLnQuY307XG4gICAgICAgIGlmIChwIT09bnVsbCAmJiBwLnQucD09PXZhbHVlKXsgc291cmNlc1tpXT1wLnQuczsgY291bnRlcnNbaV09cC50LmN9O1xuICAgICAgICBpZiAocSE9PW51bGwgJiYgcS5jaGlsZHJlbi5sZW5ndGghPT0wKXtcbiAgICAgICAgICAgIHEgPSBxLmNoaWxkcmVuWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcSA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChwIT09bnVsbCAmJiBwLmNoaWxkcmVuLmxlbmd0aCE9PTApe1xuICAgICAgICAgICAgcCA9IHAuY2hpbGRyZW5bMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgKytpO1xuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIG5ldyBJRChkLCBzb3VyY2VzLCBjb3VudGVycyk7XG59O1xuXG5TdHJhdGVneS5pbnN0YW5jZSA9IG51bGw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJncyl7XG4gICAgaWYgKGFyZ3Mpe1xuICAgICAgICBTdHJhdGVneS5pbnN0YW5jZSA9IG5ldyBTdHJhdGVneShhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoU3RyYXRlZ3kuaW5zdGFuY2UgPT09IG51bGwpe1xuICAgICAgICAgICAgU3RyYXRlZ3kuaW5zdGFuY2UgPSBuZXcgU3RyYXRlZ3koKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBTdHJhdGVneS5pbnN0YW5jZTtcbn07XG4iLCJcbi8qIVxuICogXFxicmllZiB0cmlwbGUgdGhhdCBjb250YWlucyBhIDxwYXRoIHNpdGUgY291bnRlcj5cbiAqIFxccGFyYW0gcGF0aCB0aGUgcGFydCBvZiB0aGUgcGF0aCBpbiB0aGUgdHJlZVxuICogXFxwYXJhbSBzaXRlIHRoZSB1bmlxdWUgc2l0ZSBpZGVudGlmaWVyIHRoYXQgY3JlYXRlZCB0aGUgdHJpcGxlXG4gKiBcXHBhcmFtIGNvdW50ZXIgdGhlIGNvdW50ZXIgb2YgdGhlIHNpdGUgd2hlbiBpdCBjcmVhdGVkIHRoZSB0cmlwbGVcbiAqL1xuZnVuY3Rpb24gVHJpcGxlKHBhdGgsIHNpdGUsIGNvdW50ZXIpe1xuICAgIHRoaXMucCA9IHBhdGg7XG4gICAgdGhpcy5zID0gc2l0ZTtcbiAgICB0aGlzLmMgPSBjb3VudGVyO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGNvbXBhcmUgdHdvIHRyaXBsZXMgcHJpb3JpdGl6aW5nIHRoZSBwYXRoLCB0aGVuIHNpdGUsIHRoZW4gY291bnRlclxuICogXFxwYXJhbSBvIHRoZSBvdGhlciB0cmlwbGUgdG8gY29tcGFyZVxuICogXFxyZXR1cm4gLTEgaWYgdGhpcyBpcyBsb3dlciB0aGFuIG8sIDEgaWYgdGhpcyBpcyBncmVhdGVyIHRoYW4gbywgMCBvdGhlcndpc2VcbiAqL1xuVHJpcGxlLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24obyl7XG4gICAgaWYgKHRoaXMucyA9PT0gTnVtYmVyLk1BWF9WQUxVRSAmJiB0aGlzLmMgPT09IE51bWJlci5NQVhfVkFMVUUpe1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9O1xuICAgIGlmIChvLnMgPT09IE51bWJlci5NQVhfVkFMVUUgJiYgby5zID09PSBOdW1iZXIuTUFYX1ZBTFVFKXtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG4gICAgXG4gICAgaWYgKHRoaXMucCA8IG8ucCkgeyByZXR1cm4gLTE7fTtcbiAgICBpZiAodGhpcy5wID4gby5wKSB7IHJldHVybiAxIDt9O1xuICAgIGlmICh0aGlzLnMgPCBvLnMpIHsgcmV0dXJuIC0xO307XG4gICAgaWYgKHRoaXMucyA+IG8ucykgeyByZXR1cm4gMSA7fTtcbiAgICBpZiAodGhpcy5jIDwgby5jKSB7IHJldHVybiAtMTt9O1xuICAgIGlmICh0aGlzLmMgPiBvLmMpIHsgcmV0dXJuIDEgO307XG4gICAgcmV0dXJuIDA7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyaXBsZTtcbiIsIlxuZnVuY3Rpb24gYmluYXJ5SW5kZXhPZigpe1xuXG4vKipcbiAqIFxcZnJvbTogW2h0dHBzOi8vZ2lzdC5naXRodWIuY29tL1dvbGZ5ODcvNTczNDUzMF1cbiAqIFBlcmZvcm1zIGEgYmluYXJ5IHNlYXJjaCBvbiB0aGUgaG9zdCBhcnJheS4gVGhpcyBtZXRob2QgY2FuIGVpdGhlciBiZVxuICogaW5qZWN0ZWQgaW50byBBcnJheS5wcm90b3R5cGUgb3IgY2FsbGVkIHdpdGggYSBzcGVjaWZpZWQgc2NvcGUgbGlrZSB0aGlzOlxuICogYmluYXJ5SW5kZXhPZi5jYWxsKHNvbWVBcnJheSwgc2VhcmNoRWxlbWVudCk7XG4gKlxuICpcbiAqIEBwYXJhbSB7Kn0gc2VhcmNoRWxlbWVudCBUaGUgaXRlbSB0byBzZWFyY2ggZm9yIHdpdGhpbiB0aGUgYXJyYXkuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB3aGljaCBkZWZhdWx0cyB0byAtMSB3aGVuIG5vdFxuICogZm91bmQuXG4gKi9cbkFycmF5LnByb3RvdHlwZS5iaW5hcnlJbmRleE9mID0gZnVuY3Rpb24oc2VhcmNoRWxlbWVudCkge1xuICAgIHZhciBtaW5JbmRleCA9IDA7XG4gICAgdmFyIG1heEluZGV4ID0gdGhpcy5sZW5ndGggLSAxO1xuICAgIHZhciBjdXJyZW50SW5kZXg7XG4gICAgdmFyIGN1cnJlbnRFbGVtZW50O1xuXG4gICAgd2hpbGUgKG1pbkluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgICAgIGN1cnJlbnRJbmRleCA9IE1hdGguZmxvb3IoKG1pbkluZGV4ICsgbWF4SW5kZXgpIC8gMik7XG4gICAgICAgIGN1cnJlbnRFbGVtZW50ID0gdGhpc1tjdXJyZW50SW5kZXhdO1xuICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQuY29tcGFyZShzZWFyY2hFbGVtZW50KSA8IDApIHtcbiAgICAgICAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjdXJyZW50RWxlbWVudC5jb21wYXJlKHNlYXJjaEVsZW1lbnQpID4gMCkge1xuICAgICAgICAgICAgbWF4SW5kZXggPSBjdXJyZW50SW5kZXggLSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRJbmRleDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIH5tYXhJbmRleDtcbn07XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5hcnlJbmRleE9mKCk7IiwiLy8gVmpldXg6IEN1c3RvbWl6ZWQgYmlnSW50MnN0ciBhbmQgc3RyMmJpZ0ludCBpbiBvcmRlciB0byBhY2NlcHQgY3VzdG9tIGJhc2UuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEJpZyBJbnRlZ2VyIExpYnJhcnkgdi4gNS40XG4vLyBDcmVhdGVkIDIwMDAsIGxhc3QgbW9kaWZpZWQgMjAwOVxuLy8gTGVlbW9uIEJhaXJkXG4vLyB3d3cubGVlbW9uLmNvbVxuLy9cbi8vIFZlcnNpb24gaGlzdG9yeTpcbi8vIHYgNS40ICAzIE9jdCAyMDA5XG4vLyAgIC0gYWRkZWQgXCJ2YXIgaVwiIHRvIGdyZWF0ZXJTaGlmdCgpIHNvIGkgaXMgbm90IGdsb2JhbC4gKFRoYW5rcyB0byBQ77+9dGVyIFN6YWLvv70gZm9yIGZpbmRpbmcgdGhhdCBidWcpXG4vL1xuLy8gdiA1LjMgIDIxIFNlcCAyMDA5XG4vLyAgIC0gYWRkZWQgcmFuZFByb2JQcmltZShrKSBmb3IgcHJvYmFibGUgcHJpbWVzXG4vLyAgIC0gdW5yb2xsZWQgbG9vcCBpbiBtb250XyAoc2xpZ2h0bHkgZmFzdGVyKVxuLy8gICAtIG1pbGxlclJhYmluIG5vdyB0YWtlcyBhIGJpZ0ludCBwYXJhbWV0ZXIgcmF0aGVyIHRoYW4gYW4gaW50XG4vL1xuLy8gdiA1LjIgIDE1IFNlcCAyMDA5XG4vLyAgIC0gZml4ZWQgY2FwaXRhbGl6YXRpb24gaW4gY2FsbCB0byBpbnQyYmlnSW50IGluIHJhbmRCaWdJbnRcbi8vICAgICAodGhhbmtzIHRvIEVtaWxpIEV2cmlwaWRvdSwgUmVpbmhvbGQgQmVocmluZ2VyLCBhbmQgU2FtdWVsIE1hY2FsZWVzZSBmb3IgZmluZGluZyB0aGF0IGJ1Zylcbi8vXG4vLyB2IDUuMSAgOCBPY3QgMjAwN1xuLy8gICAtIHJlbmFtZWQgaW52ZXJzZU1vZEludF8gdG8gaW52ZXJzZU1vZEludCBzaW5jZSBpdCBkb2Vzbid0IGNoYW5nZSBpdHMgcGFyYW1ldGVyc1xuLy8gICAtIGFkZGVkIGZ1bmN0aW9ucyBHQ0QgYW5kIHJhbmRCaWdJbnQsIHdoaWNoIGNhbGwgR0NEXyBhbmQgcmFuZEJpZ0ludF9cbi8vICAgLSBmaXhlZCBhIGJ1ZyBmb3VuZCBieSBSb2IgVmlzc2VyIChzZWUgY29tbWVudCB3aXRoIGhpcyBuYW1lIGJlbG93KVxuLy8gICAtIGltcHJvdmVkIGNvbW1lbnRzXG4vL1xuLy8gVGhpcyBmaWxlIGlzIHB1YmxpYyBkb21haW4uICAgWW91IGNhbiB1c2UgaXQgZm9yIGFueSBwdXJwb3NlIHdpdGhvdXQgcmVzdHJpY3Rpb24uXG4vLyBJIGRvIG5vdCBndWFyYW50ZWUgdGhhdCBpdCBpcyBjb3JyZWN0LCBzbyB1c2UgaXQgYXQgeW91ciBvd24gcmlzay4gIElmIHlvdSB1c2Vcbi8vIGl0IGZvciBzb21ldGhpbmcgaW50ZXJlc3RpbmcsIEknZCBhcHByZWNpYXRlIGhlYXJpbmcgYWJvdXQgaXQuICBJZiB5b3UgZmluZFxuLy8gYW55IGJ1Z3Mgb3IgbWFrZSBhbnkgaW1wcm92ZW1lbnRzLCBJJ2QgYXBwcmVjaWF0ZSBoZWFyaW5nIGFib3V0IHRob3NlIHRvby5cbi8vIEl0IHdvdWxkIGFsc28gYmUgbmljZSBpZiBteSBuYW1lIGFuZCBVUkwgd2VyZSBsZWZ0IGluIHRoZSBjb21tZW50cy4gIEJ1dCBub25lXG4vLyBvZiB0aGF0IGlzIHJlcXVpcmVkLlxuLy9cbi8vIFRoaXMgY29kZSBkZWZpbmVzIGEgYmlnSW50IGxpYnJhcnkgZm9yIGFyYml0cmFyeS1wcmVjaXNpb24gaW50ZWdlcnMuXG4vLyBBIGJpZ0ludCBpcyBhbiBhcnJheSBvZiBpbnRlZ2VycyBzdG9yaW5nIHRoZSB2YWx1ZSBpbiBjaHVua3Mgb2YgYnBlIGJpdHMsXG4vLyBsaXR0bGUgZW5kaWFuIChidWZmWzBdIGlzIHRoZSBsZWFzdCBzaWduaWZpY2FudCB3b3JkKS5cbi8vIE5lZ2F0aXZlIGJpZ0ludHMgYXJlIHN0b3JlZCB0d28ncyBjb21wbGVtZW50LiAgQWxtb3N0IGFsbCB0aGUgZnVuY3Rpb25zIHRyZWF0XG4vLyBiaWdJbnRzIGFzIG5vbm5lZ2F0aXZlLiAgVGhlIGZldyB0aGF0IHZpZXcgdGhlbSBhcyB0d28ncyBjb21wbGVtZW50IHNheSBzb1xuLy8gaW4gdGhlaXIgY29tbWVudHMuICBTb21lIGZ1bmN0aW9ucyBhc3N1bWUgdGhlaXIgcGFyYW1ldGVycyBoYXZlIGF0IGxlYXN0IG9uZVxuLy8gbGVhZGluZyB6ZXJvIGVsZW1lbnQuIEZ1bmN0aW9ucyB3aXRoIGFuIHVuZGVyc2NvcmUgYXQgdGhlIGVuZCBvZiB0aGUgbmFtZSBwdXRcbi8vIHRoZWlyIGFuc3dlciBpbnRvIG9uZSBvZiB0aGUgYXJyYXlzIHBhc3NlZCBpbiwgYW5kIGhhdmUgdW5wcmVkaWN0YWJsZSBiZWhhdmlvclxuLy8gaW4gY2FzZSBvZiBvdmVyZmxvdywgc28gdGhlIGNhbGxlciBtdXN0IG1ha2Ugc3VyZSB0aGUgYXJyYXlzIGFyZSBiaWcgZW5vdWdoIHRvXG4vLyBob2xkIHRoZSBhbnN3ZXIuICBCdXQgdGhlIGF2ZXJhZ2UgdXNlciBzaG91bGQgbmV2ZXIgaGF2ZSB0byBjYWxsIGFueSBvZiB0aGVcbi8vIHVuZGVyc2NvcmVkIGZ1bmN0aW9ucy4gIEVhY2ggaW1wb3J0YW50IHVuZGVyc2NvcmVkIGZ1bmN0aW9uIGhhcyBhIHdyYXBwZXIgZnVuY3Rpb25cbi8vIG9mIHRoZSBzYW1lIG5hbWUgd2l0aG91dCB0aGUgdW5kZXJzY29yZSB0aGF0IHRha2VzIGNhcmUgb2YgdGhlIGRldGFpbHMgZm9yIHlvdS5cbi8vIEZvciBlYWNoIHVuZGVyc2NvcmVkIGZ1bmN0aW9uIHdoZXJlIGEgcGFyYW1ldGVyIGlzIG1vZGlmaWVkLCB0aGF0IHNhbWUgdmFyaWFibGVcbi8vIG11c3Qgbm90IGJlIHVzZWQgYXMgYW5vdGhlciBhcmd1bWVudCB0b28uICBTbywgeW91IGNhbm5vdCBzcXVhcmUgeCBieSBkb2luZ1xuLy8gbXVsdE1vZF8oeCx4LG4pLiAgWW91IG11c3QgdXNlIHNxdWFyZU1vZF8oeCxuKSBpbnN0ZWFkLCBvciBkbyB5PWR1cCh4KTsgbXVsdE1vZF8oeCx5LG4pLlxuLy8gT3Igc2ltcGx5IHVzZSB0aGUgbXVsdE1vZCh4LHgsbikgZnVuY3Rpb24gd2l0aG91dCB0aGUgdW5kZXJzY29yZSwgd2hlcmVcbi8vIHN1Y2ggaXNzdWVzIG5ldmVyIGFyaXNlLCBiZWNhdXNlIG5vbi11bmRlcnNjb3JlZCBmdW5jdGlvbnMgbmV2ZXIgY2hhbmdlXG4vLyB0aGVpciBwYXJhbWV0ZXJzOyB0aGV5IGFsd2F5cyBhbGxvY2F0ZSBuZXcgbWVtb3J5IGZvciB0aGUgYW5zd2VyIHRoYXQgaXMgcmV0dXJuZWQuXG4vL1xuLy8gVGhlc2UgZnVuY3Rpb25zIGFyZSBkZXNpZ25lZCB0byBhdm9pZCBmcmVxdWVudCBkeW5hbWljIG1lbW9yeSBhbGxvY2F0aW9uIGluIHRoZSBpbm5lciBsb29wLlxuLy8gRm9yIG1vc3QgZnVuY3Rpb25zLCBpZiBpdCBuZWVkcyBhIEJpZ0ludCBhcyBhIGxvY2FsIHZhcmlhYmxlIGl0IHdpbGwgYWN0dWFsbHkgdXNlXG4vLyBhIGdsb2JhbCwgYW5kIHdpbGwgb25seSBhbGxvY2F0ZSB0byBpdCBvbmx5IHdoZW4gaXQncyBub3QgdGhlIHJpZ2h0IHNpemUuICBUaGlzIGVuc3VyZXNcbi8vIHRoYXQgd2hlbiBhIGZ1bmN0aW9uIGlzIGNhbGxlZCByZXBlYXRlZGx5IHdpdGggc2FtZS1zaXplZCBwYXJhbWV0ZXJzLCBpdCBvbmx5IGFsbG9jYXRlc1xuLy8gbWVtb3J5IG9uIHRoZSBmaXJzdCBjYWxsLlxuLy9cbi8vIE5vdGUgdGhhdCBmb3IgY3J5cHRvZ3JhcGhpYyBwdXJwb3NlcywgdGhlIGNhbGxzIHRvIE1hdGgucmFuZG9tKCkgbXVzdFxuLy8gYmUgcmVwbGFjZWQgd2l0aCBjYWxscyB0byBhIGJldHRlciBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvci5cbi8vXG4vLyBJbiB0aGUgZm9sbG93aW5nLCBcImJpZ0ludFwiIG1lYW5zIGEgYmlnSW50IHdpdGggYXQgbGVhc3Qgb25lIGxlYWRpbmcgemVybyBlbGVtZW50LFxuLy8gYW5kIFwiaW50ZWdlclwiIG1lYW5zIGEgbm9ubmVnYXRpdmUgaW50ZWdlciBsZXNzIHRoYW4gcmFkaXguICBJbiBzb21lIGNhc2VzLCBpbnRlZ2VyXG4vLyBjYW4gYmUgbmVnYXRpdmUuICBOZWdhdGl2ZSBiaWdJbnRzIGFyZSAycyBjb21wbGVtZW50LlxuLy9cbi8vIFRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIGRvIG5vdCBtb2RpZnkgdGhlaXIgaW5wdXRzLlxuLy8gVGhvc2UgcmV0dXJuaW5nIGEgYmlnSW50LCBzdHJpbmcsIG9yIEFycmF5IHdpbGwgZHluYW1pY2FsbHkgYWxsb2NhdGUgbWVtb3J5IGZvciB0aGF0IHZhbHVlLlxuLy8gVGhvc2UgcmV0dXJuaW5nIGEgYm9vbGVhbiB3aWxsIHJldHVybiB0aGUgaW50ZWdlciAwIChmYWxzZSkgb3IgMSAodHJ1ZSkuXG4vLyBUaG9zZSByZXR1cm5pbmcgYm9vbGVhbiBvciBpbnQgd2lsbCBub3QgYWxsb2NhdGUgbWVtb3J5IGV4Y2VwdCBwb3NzaWJseSBvbiB0aGUgZmlyc3Rcbi8vIHRpbWUgdGhleSdyZSBjYWxsZWQgd2l0aCBhIGdpdmVuIHBhcmFtZXRlciBzaXplLlxuLy9cbi8vIGJpZ0ludCAgYWRkKHgseSkgICAgICAgICAgICAgICAvL3JldHVybiAoeCt5KSBmb3IgYmlnSW50cyB4IGFuZCB5LlxuLy8gYmlnSW50ICBhZGRJbnQoeCxuKSAgICAgICAgICAgIC8vcmV0dXJuICh4K24pIHdoZXJlIHggaXMgYSBiaWdJbnQgYW5kIG4gaXMgYW4gaW50ZWdlci5cbi8vIHN0cmluZyAgYmlnSW50MnN0cih4LGJhc2UpICAgICAvL3JldHVybiBhIHN0cmluZyBmb3JtIG9mIGJpZ0ludCB4IGluIGEgZ2l2ZW4gYmFzZSwgd2l0aCAyIDw9IGJhc2UgPD0gOTVcbi8vIGludCAgICAgYml0U2l6ZSh4KSAgICAgICAgICAgICAvL3JldHVybiBob3cgbWFueSBiaXRzIGxvbmcgdGhlIGJpZ0ludCB4IGlzLCBub3QgY291bnRpbmcgbGVhZGluZyB6ZXJvc1xuLy8gYmlnSW50ICBkdXAoeCkgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGEgY29weSBvZiBiaWdJbnQgeFxuLy8gYm9vbGVhbiBlcXVhbHMoeCx5KSAgICAgICAgICAgIC8vaXMgdGhlIGJpZ0ludCB4IGVxdWFsIHRvIHRoZSBiaWdpbnQgeT9cbi8vIGJvb2xlYW4gZXF1YWxzSW50KHgseSkgICAgICAgICAvL2lzIGJpZ2ludCB4IGVxdWFsIHRvIGludGVnZXIgeT9cbi8vIGJpZ0ludCAgZXhwYW5kKHgsbikgICAgICAgICAgICAvL3JldHVybiBhIGNvcHkgb2YgeCB3aXRoIGF0IGxlYXN0IG4gZWxlbWVudHMsIGFkZGluZyBsZWFkaW5nIHplcm9zIGlmIG5lZWRlZFxuLy8gQXJyYXkgICBmaW5kUHJpbWVzKG4pICAgICAgICAgIC8vcmV0dXJuIGFycmF5IG9mIGFsbCBwcmltZXMgbGVzcyB0aGFuIGludGVnZXIgblxuLy8gYmlnSW50ICBHQ0QoeCx5KSAgICAgICAgICAgICAgIC8vcmV0dXJuIGdyZWF0ZXN0IGNvbW1vbiBkaXZpc29yIG9mIGJpZ0ludHMgeCBhbmQgeSAoZWFjaCB3aXRoIHNhbWUgbnVtYmVyIG9mIGVsZW1lbnRzKS5cbi8vIGJvb2xlYW4gZ3JlYXRlcih4LHkpICAgICAgICAgICAvL2lzIHg+eT8gICh4IGFuZCB5IGFyZSBub25uZWdhdGl2ZSBiaWdJbnRzKVxuLy8gYm9vbGVhbiBncmVhdGVyU2hpZnQoeCx5LHNoaWZ0KS8vaXMgKHggPDwoc2hpZnQqYnBlKSkgPiB5P1xuLy8gYmlnSW50ICBpbnQyYmlnSW50KHQsbixtKSAgICAgIC8vcmV0dXJuIGEgYmlnSW50IGVxdWFsIHRvIGludGVnZXIgdCwgd2l0aCBhdCBsZWFzdCBuIGJpdHMgYW5kIG0gYXJyYXkgZWxlbWVudHNcbi8vIGJpZ0ludCAgaW52ZXJzZU1vZCh4LG4pICAgICAgICAvL3JldHVybiAoeCoqKC0xKSBtb2QgbikgZm9yIGJpZ0ludHMgeCBhbmQgbi4gIElmIG5vIGludmVyc2UgZXhpc3RzLCBpdCByZXR1cm5zIG51bGxcbi8vIGludCAgICAgaW52ZXJzZU1vZEludCh4LG4pICAgICAvL3JldHVybiB4KiooLTEpIG1vZCBuLCBmb3IgaW50ZWdlcnMgeCBhbmQgbi4gIFJldHVybiAwIGlmIHRoZXJlIGlzIG5vIGludmVyc2Vcbi8vIGJvb2xlYW4gaXNaZXJvKHgpICAgICAgICAgICAgICAvL2lzIHRoZSBiaWdJbnQgeCBlcXVhbCB0byB6ZXJvP1xuLy8gYm9vbGVhbiBtaWxsZXJSYWJpbih4LGIpICAgICAgIC8vZG9lcyBvbmUgcm91bmQgb2YgTWlsbGVyLVJhYmluIGJhc2UgaW50ZWdlciBiIHNheSB0aGF0IGJpZ0ludCB4IGlzIHBvc3NpYmx5IHByaW1lPyAoYiBpcyBiaWdJbnQsIDE8Yjx4KVxuLy8gYm9vbGVhbiBtaWxsZXJSYWJpbkludCh4LGIpICAgIC8vZG9lcyBvbmUgcm91bmQgb2YgTWlsbGVyLVJhYmluIGJhc2UgaW50ZWdlciBiIHNheSB0aGF0IGJpZ0ludCB4IGlzIHBvc3NpYmx5IHByaW1lPyAoYiBpcyBpbnQsICAgIDE8Yjx4KVxuLy8gYmlnSW50ICBtb2QoeCxuKSAgICAgICAgICAgICAgIC8vcmV0dXJuIGEgbmV3IGJpZ0ludCBlcXVhbCB0byAoeCBtb2QgbikgZm9yIGJpZ0ludHMgeCBhbmQgbi5cbi8vIGludCAgICAgbW9kSW50KHgsbikgICAgICAgICAgICAvL3JldHVybiB4IG1vZCBuIGZvciBiaWdJbnQgeCBhbmQgaW50ZWdlciBuLlxuLy8gYmlnSW50ICBtdWx0KHgseSkgICAgICAgICAgICAgIC8vcmV0dXJuIHgqeSBmb3IgYmlnSW50cyB4IGFuZCB5LiBUaGlzIGlzIGZhc3RlciB3aGVuIHk8eC5cbi8vIGJpZ0ludCAgbXVsdE1vZCh4LHksbikgICAgICAgICAvL3JldHVybiAoeCp5IG1vZCBuKSBmb3IgYmlnSW50cyB4LHksbi4gIEZvciBncmVhdGVyIHNwZWVkLCBsZXQgeTx4LlxuLy8gYm9vbGVhbiBuZWdhdGl2ZSh4KSAgICAgICAgICAgIC8vaXMgYmlnSW50IHggbmVnYXRpdmU/XG4vLyBiaWdJbnQgIHBvd01vZCh4LHksbikgICAgICAgICAgLy9yZXR1cm4gKHgqKnkgbW9kIG4pIHdoZXJlIHgseSxuIGFyZSBiaWdJbnRzIGFuZCAqKiBpcyBleHBvbmVudGlhdGlvbi4gIDAqKjA9MS4gRmFzdGVyIGZvciBvZGQgbi5cbi8vIGJpZ0ludCAgcmFuZEJpZ0ludChuLHMpICAgICAgICAvL3JldHVybiBhbiBuLWJpdCByYW5kb20gQmlnSW50IChuPj0xKS4gIElmIHM9MSwgdGhlbiB0aGUgbW9zdCBzaWduaWZpY2FudCBvZiB0aG9zZSBuIGJpdHMgaXMgc2V0IHRvIDEuXG4vLyBiaWdJbnQgIHJhbmRUcnVlUHJpbWUoaykgICAgICAgLy9yZXR1cm4gYSBuZXcsIHJhbmRvbSwgay1iaXQsIHRydWUgcHJpbWUgYmlnSW50IHVzaW5nIE1hdXJlcidzIGFsZ29yaXRobS5cbi8vIGJpZ0ludCAgcmFuZFByb2JQcmltZShrKSAgICAgICAvL3JldHVybiBhIG5ldywgcmFuZG9tLCBrLWJpdCwgcHJvYmFibGUgcHJpbWUgYmlnSW50IChwcm9iYWJpbGl0eSBpdCdzIGNvbXBvc2l0ZSBsZXNzIHRoYW4gMl4tODApLlxuLy8gYmlnSW50ICBzdHIyYmlnSW50KHMsYixuLG0pICAgIC8vcmV0dXJuIGEgYmlnSW50IGZvciBudW1iZXIgcmVwcmVzZW50ZWQgaW4gc3RyaW5nIHMgaW4gYmFzZSBiIHdpdGggYXQgbGVhc3QgbiBiaXRzIGFuZCBtIGFycmF5IGVsZW1lbnRzXG4vLyBiaWdJbnQgIHN1Yih4LHkpICAgICAgICAgICAgICAgLy9yZXR1cm4gKHgteSkgZm9yIGJpZ0ludHMgeCBhbmQgeS4gIE5lZ2F0aXZlIGFuc3dlcnMgd2lsbCBiZSAycyBjb21wbGVtZW50XG4vLyBiaWdJbnQgIHRyaW0oeCxrKSAgICAgICAgICAgICAgLy9yZXR1cm4gYSBjb3B5IG9mIHggd2l0aCBleGFjdGx5IGsgbGVhZGluZyB6ZXJvIGVsZW1lbnRzXG4vL1xuLy9cbi8vIFRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIGVhY2ggaGF2ZSBhIG5vbi11bmRlcnNjb3JlZCB2ZXJzaW9uLCB3aGljaCBtb3N0IHVzZXJzIHNob3VsZCBjYWxsIGluc3RlYWQuXG4vLyBUaGVzZSBmdW5jdGlvbnMgZWFjaCB3cml0ZSB0byBhIHNpbmdsZSBwYXJhbWV0ZXIsIGFuZCB0aGUgY2FsbGVyIGlzIHJlc3BvbnNpYmxlIGZvciBlbnN1cmluZyB0aGUgYXJyYXlcbi8vIHBhc3NlZCBpbiBpcyBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgcmVzdWx0LlxuLy9cbi8vIHZvaWQgICAgYWRkSW50Xyh4LG4pICAgICAgICAgIC8vZG8geD14K24gd2hlcmUgeCBpcyBhIGJpZ0ludCBhbmQgbiBpcyBhbiBpbnRlZ2VyXG4vLyB2b2lkICAgIGFkZF8oeCx5KSAgICAgICAgICAgICAvL2RvIHg9eCt5IGZvciBiaWdJbnRzIHggYW5kIHlcbi8vIHZvaWQgICAgY29weV8oeCx5KSAgICAgICAgICAgIC8vZG8geD15IG9uIGJpZ0ludHMgeCBhbmQgeVxuLy8gdm9pZCAgICBjb3B5SW50Xyh4LG4pICAgICAgICAgLy9kbyB4PW4gb24gYmlnSW50IHggYW5kIGludGVnZXIgblxuLy8gdm9pZCAgICBHQ0RfKHgseSkgICAgICAgICAgICAgLy9zZXQgeCB0byB0aGUgZ3JlYXRlc3QgY29tbW9uIGRpdmlzb3Igb2YgYmlnSW50cyB4IGFuZCB5LCAoeSBpcyBkZXN0cm95ZWQpLiAgKFRoaXMgbmV2ZXIgb3ZlcmZsb3dzIGl0cyBhcnJheSkuXG4vLyBib29sZWFuIGludmVyc2VNb2RfKHgsbikgICAgICAvL2RvIHg9eCoqKC0xKSBtb2QgbiwgZm9yIGJpZ0ludHMgeCBhbmQgbi4gUmV0dXJucyAxICgwKSBpZiBpbnZlcnNlIGRvZXMgKGRvZXNuJ3QpIGV4aXN0XG4vLyB2b2lkICAgIG1vZF8oeCxuKSAgICAgICAgICAgICAvL2RvIHg9eCBtb2QgbiBmb3IgYmlnSW50cyB4IGFuZCBuLiAoVGhpcyBuZXZlciBvdmVyZmxvd3MgaXRzIGFycmF5KS5cbi8vIHZvaWQgICAgbXVsdF8oeCx5KSAgICAgICAgICAgIC8vZG8geD14KnkgZm9yIGJpZ0ludHMgeCBhbmQgeS5cbi8vIHZvaWQgICAgbXVsdE1vZF8oeCx5LG4pICAgICAgIC8vZG8geD14KnkgIG1vZCBuIGZvciBiaWdJbnRzIHgseSxuLlxuLy8gdm9pZCAgICBwb3dNb2RfKHgseSxuKSAgICAgICAgLy9kbyB4PXgqKnkgbW9kIG4sIHdoZXJlIHgseSxuIGFyZSBiaWdJbnRzIChuIGlzIG9kZCkgYW5kICoqIGlzIGV4cG9uZW50aWF0aW9uLiAgMCoqMD0xLlxuLy8gdm9pZCAgICByYW5kQmlnSW50XyhiLG4scykgICAgLy9kbyBiID0gYW4gbi1iaXQgcmFuZG9tIEJpZ0ludC4gaWYgcz0xLCB0aGVuIG50aCBiaXQgKG1vc3Qgc2lnbmlmaWNhbnQgYml0KSBpcyBzZXQgdG8gMS4gbj49MS5cbi8vIHZvaWQgICAgcmFuZFRydWVQcmltZV8oYW5zLGspIC8vZG8gYW5zID0gYSByYW5kb20gay1iaXQgdHJ1ZSByYW5kb20gcHJpbWUgKG5vdCBqdXN0IHByb2JhYmxlIHByaW1lKSB3aXRoIDEgaW4gdGhlIG1zYi5cbi8vIHZvaWQgICAgc3ViXyh4LHkpICAgICAgICAgICAgIC8vZG8geD14LXkgZm9yIGJpZ0ludHMgeCBhbmQgeS4gTmVnYXRpdmUgYW5zd2VycyB3aWxsIGJlIDJzIGNvbXBsZW1lbnQuXG4vL1xuLy8gVGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgZG8gTk9UIGhhdmUgYSBub24tdW5kZXJzY29yZWQgdmVyc2lvbi5cbi8vIFRoZXkgZWFjaCB3cml0ZSBhIGJpZ0ludCByZXN1bHQgdG8gb25lIG9yIG1vcmUgcGFyYW1ldGVycy4gIFRoZSBjYWxsZXIgaXMgcmVzcG9uc2libGUgZm9yXG4vLyBlbnN1cmluZyB0aGUgYXJyYXlzIHBhc3NlZCBpbiBhcmUgbGFyZ2UgZW5vdWdoIHRvIGhvbGQgdGhlIHJlc3VsdHMuXG4vL1xuLy8gdm9pZCBhZGRTaGlmdF8oeCx5LHlzKSAgICAgICAvL2RvIHg9eCsoeTw8KHlzKmJwZSkpXG4vLyB2b2lkIGNhcnJ5Xyh4KSAgICAgICAgICAgICAgIC8vZG8gY2FycmllcyBhbmQgYm9ycm93cyBzbyBlYWNoIGVsZW1lbnQgb2YgdGhlIGJpZ0ludCB4IGZpdHMgaW4gYnBlIGJpdHMuXG4vLyB2b2lkIGRpdmlkZV8oeCx5LHEscikgICAgICAgIC8vZGl2aWRlIHggYnkgeSBnaXZpbmcgcXVvdGllbnQgcSBhbmQgcmVtYWluZGVyIHJcbi8vIGludCAgZGl2SW50Xyh4LG4pICAgICAgICAgICAgLy9kbyB4PWZsb29yKHgvbikgZm9yIGJpZ0ludCB4IGFuZCBpbnRlZ2VyIG4sIGFuZCByZXR1cm4gdGhlIHJlbWFpbmRlci4gKFRoaXMgbmV2ZXIgb3ZlcmZsb3dzIGl0cyBhcnJheSkuXG4vLyBpbnQgIGVHQ0RfKHgseSxkLGEsYikgICAgICAgIC8vc2V0cyBhLGIsZCB0byBwb3NpdGl2ZSBiaWdJbnRzIHN1Y2ggdGhhdCBkID0gR0NEXyh4LHkpID0gYSp4LWIqeVxuLy8gdm9pZCBoYWx2ZV8oeCkgICAgICAgICAgICAgICAvL2RvIHg9Zmxvb3IofHh8LzIpKnNnbih4KSBmb3IgYmlnSW50IHggaW4gMidzIGNvbXBsZW1lbnQuICAoVGhpcyBuZXZlciBvdmVyZmxvd3MgaXRzIGFycmF5KS5cbi8vIHZvaWQgbGVmdFNoaWZ0Xyh4LG4pICAgICAgICAgLy9sZWZ0IHNoaWZ0IGJpZ0ludCB4IGJ5IG4gYml0cy4gIG48YnBlLlxuLy8gdm9pZCBsaW5Db21iXyh4LHksYSxiKSAgICAgICAvL2RvIHg9YSp4K2IqeSBmb3IgYmlnSW50cyB4IGFuZCB5IGFuZCBpbnRlZ2VycyBhIGFuZCBiXG4vLyB2b2lkIGxpbkNvbWJTaGlmdF8oeCx5LGIseXMpIC8vZG8geD14K2IqKHk8PCh5cypicGUpKSBmb3IgYmlnSW50cyB4IGFuZCB5LCBhbmQgaW50ZWdlcnMgYiBhbmQgeXNcbi8vIHZvaWQgbW9udF8oeCx5LG4sbnApICAgICAgICAgLy9Nb250Z29tZXJ5IG11bHRpcGxpY2F0aW9uIChzZWUgY29tbWVudHMgd2hlcmUgdGhlIGZ1bmN0aW9uIGlzIGRlZmluZWQpXG4vLyB2b2lkIG11bHRJbnRfKHgsbikgICAgICAgICAgIC8vZG8geD14Km4gd2hlcmUgeCBpcyBhIGJpZ0ludCBhbmQgbiBpcyBhbiBpbnRlZ2VyLlxuLy8gdm9pZCByaWdodFNoaWZ0Xyh4LG4pICAgICAgICAvL3JpZ2h0IHNoaWZ0IGJpZ0ludCB4IGJ5IG4gYml0cy4gIDAgPD0gbiA8IGJwZS4gKFRoaXMgbmV2ZXIgb3ZlcmZsb3dzIGl0cyBhcnJheSkuXG4vLyB2b2lkIHNxdWFyZU1vZF8oeCxuKSAgICAgICAgIC8vZG8geD14KnggIG1vZCBuIGZvciBiaWdJbnRzIHgsblxuLy8gdm9pZCBzdWJTaGlmdF8oeCx5LHlzKSAgICAgICAvL2RvIHg9eC0oeTw8KHlzKmJwZSkpLiBOZWdhdGl2ZSBhbnN3ZXJzIHdpbGwgYmUgMnMgY29tcGxlbWVudC5cbi8vXG4vLyBUaGUgZm9sbG93aW5nIGZ1bmN0aW9ucyBhcmUgYmFzZWQgb24gYWxnb3JpdGhtcyBmcm9tIHRoZSBfSGFuZGJvb2sgb2YgQXBwbGllZCBDcnlwdG9ncmFwaHlfXG4vLyAgICBwb3dNb2RfKCkgICAgICAgICAgID0gYWxnb3JpdGhtIDE0Ljk0LCBNb250Z29tZXJ5IGV4cG9uZW50aWF0aW9uXG4vLyAgICBlR0NEXyxpbnZlcnNlTW9kXygpID0gYWxnb3JpdGhtIDE0LjYxLCBCaW5hcnkgZXh0ZW5kZWQgR0NEX1xuLy8gICAgR0NEXygpICAgICAgICAgICAgICA9IGFsZ29yb3RobSAxNC41NywgTGVobWVyJ3MgYWxnb3JpdGhtXG4vLyAgICBtb250XygpICAgICAgICAgICAgID0gYWxnb3JpdGhtIDE0LjM2LCBNb250Z29tZXJ5IG11bHRpcGxpY2F0aW9uXG4vLyAgICBkaXZpZGVfKCkgICAgICAgICAgID0gYWxnb3JpdGhtIDE0LjIwICBNdWx0aXBsZS1wcmVjaXNpb24gZGl2aXNpb25cbi8vICAgIHNxdWFyZU1vZF8oKSAgICAgICAgPSBhbGdvcml0aG0gMTQuMTYgIE11bHRpcGxlLXByZWNpc2lvbiBzcXVhcmluZ1xuLy8gICAgcmFuZFRydWVQcmltZV8oKSAgICA9IGFsZ29yaXRobSAgNC42MiwgTWF1cmVyJ3MgYWxnb3JpdGhtXG4vLyAgICBtaWxsZXJSYWJpbigpICAgICAgID0gYWxnb3JpdGhtICA0LjI0LCBNaWxsZXItUmFiaW4gYWxnb3JpdGhtXG4vL1xuLy8gUHJvZmlsaW5nIHNob3dzOlxuLy8gICAgIHJhbmRUcnVlUHJpbWVfKCkgc3BlbmRzOlxuLy8gICAgICAgICAxMCUgb2YgaXRzIHRpbWUgaW4gY2FsbHMgdG8gcG93TW9kXygpXG4vLyAgICAgICAgIDg1JSBvZiBpdHMgdGltZSBpbiBjYWxscyB0byBtaWxsZXJSYWJpbigpXG4vLyAgICAgbWlsbGVyUmFiaW4oKSBzcGVuZHM6XG4vLyAgICAgICAgIDk5JSBvZiBpdHMgdGltZSBpbiBjYWxscyB0byBwb3dNb2RfKCkgICAoYWx3YXlzIHdpdGggYSBiYXNlIG9mIDIpXG4vLyAgICAgcG93TW9kXygpIHNwZW5kczpcbi8vICAgICAgICAgOTQlIG9mIGl0cyB0aW1lIGluIGNhbGxzIHRvIG1vbnRfKCkgIChhbG1vc3QgYWx3YXlzIHdpdGggeD09eSlcbi8vXG4vLyBUaGlzIHN1Z2dlc3RzIHRoZXJlIGFyZSBzZXZlcmFsIHdheXMgdG8gc3BlZWQgdXAgdGhpcyBsaWJyYXJ5IHNsaWdodGx5OlxuLy8gICAgIC0gY29udmVydCBwb3dNb2RfIHRvIHVzZSBhIE1vbnRnb21lcnkgZm9ybSBvZiBrLWFyeSB3aW5kb3cgKG9yIG1heWJlIGEgTW9udGdvbWVyeSBmb3JtIG9mIHNsaWRpbmcgd2luZG93KVxuLy8gICAgICAgICAtLSB0aGlzIHNob3VsZCBlc3BlY2lhbGx5IGZvY3VzIG9uIGJlaW5nIGZhc3Qgd2hlbiByYWlzaW5nIDIgdG8gYSBwb3dlciBtb2QgblxuLy8gICAgIC0gY29udmVydCByYW5kVHJ1ZVByaW1lXygpIHRvIHVzZSBhIG1pbmltdW0gciBvZiAxLzMgaW5zdGVhZCBvZiAxLzIgd2l0aCB0aGUgYXBwcm9wcmlhdGUgY2hhbmdlIHRvIHRoZSB0ZXN0XG4vLyAgICAgLSB0dW5lIHRoZSBwYXJhbWV0ZXJzIGluIHJhbmRUcnVlUHJpbWVfKCksIGluY2x1ZGluZyBjLCBtLCBhbmQgcmVjTGltaXRcbi8vICAgICAtIHNwZWVkIHVwIHRoZSBzaW5nbGUgbG9vcCBpbiBtb250XygpIHRoYXQgdGFrZXMgOTUlIG9mIHRoZSBydW50aW1lLCBwZXJoYXBzIGJ5IHJlZHVjaW5nIGNoZWNraW5nXG4vLyAgICAgICB3aXRoaW4gdGhlIGxvb3Agd2hlbiBhbGwgdGhlIHBhcmFtZXRlcnMgYXJlIHRoZSBzYW1lIGxlbmd0aC5cbi8vXG4vLyBUaGVyZSBhcmUgc2V2ZXJhbCBpZGVhcyB0aGF0IGxvb2sgbGlrZSB0aGV5IHdvdWxkbid0IGhlbHAgbXVjaCBhdCBhbGw6XG4vLyAgICAgLSByZXBsYWNpbmcgdHJpYWwgZGl2aXNpb24gaW4gcmFuZFRydWVQcmltZV8oKSB3aXRoIGEgc2lldmUgKHRoYXQgc3BlZWRzIHVwIHNvbWV0aGluZyB0YWtpbmcgYWxtb3N0IG5vIHRpbWUgYW55d2F5KVxuLy8gICAgIC0gaW5jcmVhc2UgYnBlIGZyb20gMTUgdG8gMzAgKHRoYXQgd291bGQgaGVscCBpZiB3ZSBoYWQgYSAzMiozMi0+NjQgbXVsdGlwbGllciwgYnV0IG5vdCB3aXRoIEphdmFTY3JpcHQncyAzMiozMi0+MzIpXG4vLyAgICAgLSBzcGVlZGluZyB1cCBtb250Xyh4LHksbixucCkgd2hlbiB4PT15IGJ5IGRvaW5nIGEgbm9uLW1vZHVsYXIsIG5vbi1Nb250Z29tZXJ5IHNxdWFyZVxuLy8gICAgICAgZm9sbG93ZWQgYnkgYSBNb250Z29tZXJ5IHJlZHVjdGlvbi4gIFRoZSBpbnRlcm1lZGlhdGUgYW5zd2VyIHdpbGwgYmUgdHdpY2UgYXMgbG9uZyBhcyB4LCBzbyB0aGF0XG4vLyAgICAgICBtZXRob2Qgd291bGQgYmUgc2xvd2VyLiAgVGhpcyBpcyB1bmZvcnR1bmF0ZSBiZWNhdXNlIHRoZSBjb2RlIGN1cnJlbnRseSBzcGVuZHMgYWxtb3N0IGFsbCBvZiBpdHMgdGltZVxuLy8gICAgICAgZG9pbmcgbW9udF8oeCx4LC4uLiksIGJvdGggZm9yIHJhbmRUcnVlUHJpbWVfKCkgYW5kIHBvd01vZF8oKS4gIEEgZmFzdGVyIG1ldGhvZCBmb3IgTW9udGdvbWVyeSBzcXVhcmluZ1xuLy8gICAgICAgd291bGQgaGF2ZSBhIGxhcmdlIGltcGFjdCBvbiB0aGUgc3BlZWQgb2YgcmFuZFRydWVQcmltZV8oKSBhbmQgcG93TW9kXygpLiAgSEFDIGhhcyBhIGNvdXBsZSBvZiBwb29ybHktd29yZGVkXG4vLyAgICAgICBzZW50ZW5jZXMgdGhhdCBzZWVtIHRvIGltcGx5IGl0J3MgZmFzdGVyIHRvIGRvIGEgbm9uLW1vZHVsYXIgc3F1YXJlIGZvbGxvd2VkIGJ5IGEgc2luZ2xlXG4vLyAgICAgICBNb250Z29tZXJ5IHJlZHVjdGlvbiwgYnV0IHRoYXQncyBvYnZpb3VzbHkgd3JvbmcuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbihmdW5jdGlvbiAoKSB7XG4vL2dsb2JhbHNcbmJwZT0wOyAgICAgICAgIC8vYml0cyBzdG9yZWQgcGVyIGFycmF5IGVsZW1lbnRcbm1hc2s9MDsgICAgICAgIC8vQU5EIHRoaXMgd2l0aCBhbiBhcnJheSBlbGVtZW50IHRvIGNob3AgaXQgZG93biB0byBicGUgYml0c1xucmFkaXg9bWFzaysxOyAgLy9lcXVhbHMgMl5icGUuICBBIHNpbmdsZSAxIGJpdCB0byB0aGUgbGVmdCBvZiB0aGUgbGFzdCBiaXQgb2YgbWFzay5cblxuLy90aGUgZGlnaXRzIGZvciBjb252ZXJ0aW5nIHRvIGRpZmZlcmVudCBiYXNlc1xuZGlnaXRzU3RyPScwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5el89IUAjJCVeJiooKVtde318OzosLjw+Lz9gfiBcXFxcXFwnXFxcIistJztcblxuLy9pbml0aWFsaXplIHRoZSBnbG9iYWwgdmFyaWFibGVzXG5mb3IgKGJwZT0wOyAoMTw8KGJwZSsxKSkgPiAoMTw8YnBlKTsgYnBlKyspOyAgLy9icGU9bnVtYmVyIG9mIGJpdHMgaW4gdGhlIG1hbnRpc3NhIG9uIHRoaXMgcGxhdGZvcm1cbmJwZT4+PTE7ICAgICAgICAgICAgICAgICAgIC8vYnBlPW51bWJlciBvZiBiaXRzIGluIG9uZSBlbGVtZW50IG9mIHRoZSBhcnJheSByZXByZXNlbnRpbmcgdGhlIGJpZ0ludFxubWFzaz0oMTw8YnBlKS0xOyAgICAgICAgICAgLy9BTkQgdGhlIG1hc2sgd2l0aCBhbiBpbnRlZ2VyIHRvIGdldCBpdHMgYnBlIGxlYXN0IHNpZ25pZmljYW50IGJpdHNcbnJhZGl4PW1hc2srMTsgICAgICAgICAgICAgIC8vMl5icGUuICBhIHNpbmdsZSAxIGJpdCB0byB0aGUgbGVmdCBvZiB0aGUgZmlyc3QgYml0IG9mIG1hc2tcbm9uZT1pbnQyYmlnSW50KDEsMSwxKTsgICAgIC8vY29uc3RhbnQgdXNlZCBpbiBwb3dNb2RfKClcblxuLy90aGUgZm9sbG93aW5nIGdsb2JhbCB2YXJpYWJsZXMgYXJlIHNjcmF0Y2hwYWQgbWVtb3J5IHRvXG4vL3JlZHVjZSBkeW5hbWljIG1lbW9yeSBhbGxvY2F0aW9uIGluIHRoZSBpbm5lciBsb29wXG50PW5ldyBBcnJheSgwKTtcbnNzPXQ7ICAgICAgIC8vdXNlZCBpbiBtdWx0XygpXG5zMD10OyAgICAgICAvL3VzZWQgaW4gbXVsdE1vZF8oKSwgc3F1YXJlTW9kXygpXG5zMT10OyAgICAgICAvL3VzZWQgaW4gcG93TW9kXygpLCBtdWx0TW9kXygpLCBzcXVhcmVNb2RfKClcbnMyPXQ7ICAgICAgIC8vdXNlZCBpbiBwb3dNb2RfKCksIG11bHRNb2RfKClcbnMzPXQ7ICAgICAgIC8vdXNlZCBpbiBwb3dNb2RfKClcbnM0PXQ7IHM1PXQ7IC8vdXNlZCBpbiBtb2RfKClcbnM2PXQ7ICAgICAgIC8vdXNlZCBpbiBiaWdJbnQyc3RyKClcbnM3PXQ7ICAgICAgIC8vdXNlZCBpbiBwb3dNb2RfKClcblQ9dDsgICAgICAgIC8vdXNlZCBpbiBHQ0RfKClcbnNhPXQ7ICAgICAgIC8vdXNlZCBpbiBtb250XygpXG5tcl94MT10OyBtcl9yPXQ7IG1yX2E9dDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNlZCBpbiBtaWxsZXJSYWJpbigpXG5lZ192PXQ7IGVnX3U9dDsgZWdfQT10OyBlZ19CPXQ7IGVnX0M9dDsgZWdfRD10OyAgICAgICAgICAgICAgIC8vdXNlZCBpbiBlR0NEXygpLCBpbnZlcnNlTW9kXygpXG5tZF9xMT10OyBtZF9xMj10OyBtZF9xMz10OyBtZF9yPXQ7IG1kX3IxPXQ7IG1kX3IyPXQ7IG1kX3R0PXQ7IC8vdXNlZCBpbiBtb2RfKClcblxucHJpbWVzPXQ7IHBvd3M9dDsgc19pPXQ7IHNfaTI9dDsgc19SPXQ7IHNfcm09dDsgc19xPXQ7IHNfbjE9dDtcbiAgc19hPXQ7IHNfcjI9dDsgc19uPXQ7IHNfYj10OyBzX2Q9dDsgc194MT10OyBzX3gyPXQsIHNfYWE9dDsgLy91c2VkIGluIHJhbmRUcnVlUHJpbWVfKClcblxucnBwcmI9dDsgLy91c2VkIGluIHJhbmRQcm9iUHJpbWVSb3VuZHMoKSAod2hpY2ggYWxzbyB1c2VzIFwicHJpbWVzXCIpXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4vL3JldHVybiBhcnJheSBvZiBhbGwgcHJpbWVzIGxlc3MgdGhhbiBpbnRlZ2VyIG5cbmZ1bmN0aW9uIGZpbmRQcmltZXMobikge1xuICB2YXIgaSxzLHAsYW5zO1xuICBzPW5ldyBBcnJheShuKTtcbiAgZm9yIChpPTA7aTxuO2krKylcbiAgICBzW2ldPTA7XG4gIHNbMF09MjtcbiAgcD0wOyAgICAvL2ZpcnN0IHAgZWxlbWVudHMgb2YgcyBhcmUgcHJpbWVzLCB0aGUgcmVzdCBhcmUgYSBzaWV2ZVxuICBmb3IoO3NbcF08bjspIHsgICAgICAgICAgICAgICAgICAvL3NbcF0gaXMgdGhlIHB0aCBwcmltZVxuICAgIGZvcihpPXNbcF0qc1twXTsgaTxuOyBpKz1zW3BdKSAvL21hcmsgbXVsdGlwbGVzIG9mIHNbcF1cbiAgICAgIHNbaV09MTtcbiAgICBwKys7XG4gICAgc1twXT1zW3AtMV0rMTtcbiAgICBmb3IoOyBzW3BdPG4gJiYgc1tzW3BdXTsgc1twXSsrKTsgLy9maW5kIG5leHQgcHJpbWUgKHdoZXJlIHNbcF09PTApXG4gIH1cbiAgYW5zPW5ldyBBcnJheShwKTtcbiAgZm9yKGk9MDtpPHA7aSsrKVxuICAgIGFuc1tpXT1zW2ldO1xuICByZXR1cm4gYW5zO1xufVxuXG5cbi8vZG9lcyBhIHNpbmdsZSByb3VuZCBvZiBNaWxsZXItUmFiaW4gYmFzZSBiIGNvbnNpZGVyIHggdG8gYmUgYSBwb3NzaWJsZSBwcmltZT9cbi8veCBpcyBhIGJpZ0ludCwgYW5kIGIgaXMgYW4gaW50ZWdlciwgd2l0aCBiPHhcbmZ1bmN0aW9uIG1pbGxlclJhYmluSW50KHgsYikge1xuICBpZiAobXJfeDEubGVuZ3RoIT14Lmxlbmd0aCkge1xuICAgIG1yX3gxPWR1cCh4KTtcbiAgICBtcl9yPWR1cCh4KTtcbiAgICBtcl9hPWR1cCh4KTtcbiAgfVxuXG4gIGNvcHlJbnRfKG1yX2EsYik7XG4gIHJldHVybiBtaWxsZXJSYWJpbih4LG1yX2EpO1xufVxuXG4vL2RvZXMgYSBzaW5nbGUgcm91bmQgb2YgTWlsbGVyLVJhYmluIGJhc2UgYiBjb25zaWRlciB4IHRvIGJlIGEgcG9zc2libGUgcHJpbWU/XG4vL3ggYW5kIGIgYXJlIGJpZ0ludHMgd2l0aCBiPHhcbmZ1bmN0aW9uIG1pbGxlclJhYmluKHgsYikge1xuICB2YXIgaSxqLGsscztcblxuICBpZiAobXJfeDEubGVuZ3RoIT14Lmxlbmd0aCkge1xuICAgIG1yX3gxPWR1cCh4KTtcbiAgICBtcl9yPWR1cCh4KTtcbiAgICBtcl9hPWR1cCh4KTtcbiAgfVxuXG4gIGNvcHlfKG1yX2EsYik7XG4gIGNvcHlfKG1yX3IseCk7XG4gIGNvcHlfKG1yX3gxLHgpO1xuXG4gIGFkZEludF8obXJfciwtMSk7XG4gIGFkZEludF8obXJfeDEsLTEpO1xuXG4gIC8vcz10aGUgaGlnaGVzdCBwb3dlciBvZiB0d28gdGhhdCBkaXZpZGVzIG1yX3JcbiAgaz0wO1xuICBmb3IgKGk9MDtpPG1yX3IubGVuZ3RoO2krKylcbiAgICBmb3IgKGo9MTtqPG1hc2s7ajw8PTEpXG4gICAgICBpZiAoeFtpXSAmIGopIHtcbiAgICAgICAgcz0oazxtcl9yLmxlbmd0aCticGUgPyBrIDogMCk7XG4gICAgICAgICBpPW1yX3IubGVuZ3RoO1xuICAgICAgICAgaj1tYXNrO1xuICAgICAgfSBlbHNlXG4gICAgICAgIGsrKztcblxuICBpZiAocylcbiAgICByaWdodFNoaWZ0Xyhtcl9yLHMpO1xuXG4gIHBvd01vZF8obXJfYSxtcl9yLHgpO1xuXG4gIGlmICghZXF1YWxzSW50KG1yX2EsMSkgJiYgIWVxdWFscyhtcl9hLG1yX3gxKSkge1xuICAgIGo9MTtcbiAgICB3aGlsZSAoajw9cy0xICYmICFlcXVhbHMobXJfYSxtcl94MSkpIHtcbiAgICAgIHNxdWFyZU1vZF8obXJfYSx4KTtcbiAgICAgIGlmIChlcXVhbHNJbnQobXJfYSwxKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIGorKztcbiAgICB9XG4gICAgaWYgKCFlcXVhbHMobXJfYSxtcl94MSkpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuICByZXR1cm4gMTtcbn1cblxuLy9yZXR1cm5zIGhvdyBtYW55IGJpdHMgbG9uZyB0aGUgYmlnSW50IGlzLCBub3QgY291bnRpbmcgbGVhZGluZyB6ZXJvcy5cbmZ1bmN0aW9uIGJpdFNpemUoeCkge1xuICB2YXIgaix6LHc7XG4gIGZvciAoaj14Lmxlbmd0aC0xOyAoeFtqXT09MCkgJiYgKGo+MCk7IGotLSk7XG4gIGZvciAoej0wLHc9eFtqXTsgdzsgKHc+Pj0xKSx6KyspO1xuICB6Kz1icGUqajtcbiAgcmV0dXJuIHo7XG59XG5cbi8vcmV0dXJuIGEgY29weSBvZiB4IHdpdGggYXQgbGVhc3QgbiBlbGVtZW50cywgYWRkaW5nIGxlYWRpbmcgemVyb3MgaWYgbmVlZGVkXG5mdW5jdGlvbiBleHBhbmQoeCxuKSB7XG4gIHZhciBhbnM9aW50MmJpZ0ludCgwLCh4Lmxlbmd0aD5uID8geC5sZW5ndGggOiBuKSpicGUsMCk7XG4gIGNvcHlfKGFucyx4KTtcbiAgcmV0dXJuIGFucztcbn1cblxuLy9yZXR1cm4gYSBrLWJpdCB0cnVlIHJhbmRvbSBwcmltZSB1c2luZyBNYXVyZXIncyBhbGdvcml0aG0uXG5mdW5jdGlvbiByYW5kVHJ1ZVByaW1lKGspIHtcbiAgdmFyIGFucz1pbnQyYmlnSW50KDAsaywwKTtcbiAgcmFuZFRydWVQcmltZV8oYW5zLGspO1xuICByZXR1cm4gdHJpbShhbnMsMSk7XG59XG5cbi8vcmV0dXJuIGEgay1iaXQgcmFuZG9tIHByb2JhYmxlIHByaW1lIHdpdGggcHJvYmFiaWxpdHkgb2YgZXJyb3IgPCAyXi04MFxuZnVuY3Rpb24gcmFuZFByb2JQcmltZShrKSB7XG4gIGlmIChrPj02MDApIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssMik7IC8vbnVtYmVycyBmcm9tIEhBQyB0YWJsZSA0LjNcbiAgaWYgKGs+PTU1MCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw0KTtcbiAgaWYgKGs+PTUwMCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw1KTtcbiAgaWYgKGs+PTQwMCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw2KTtcbiAgaWYgKGs+PTM1MCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw3KTtcbiAgaWYgKGs+PTMwMCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw5KTtcbiAgaWYgKGs+PTI1MCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoaywxMik7IC8vbnVtYmVycyBmcm9tIEhBQyB0YWJsZSA0LjRcbiAgaWYgKGs+PTIwMCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoaywxNSk7XG4gIGlmIChrPj0xNTApIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssMTgpO1xuICBpZiAoaz49MTAwKSByZXR1cm4gcmFuZFByb2JQcmltZVJvdW5kcyhrLDI3KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw0MCk7IC8vbnVtYmVyIGZyb20gSEFDIHJlbWFyayA0LjI2IChvbmx5IGFuIGVzdGltYXRlKVxufVxuXG4vL3JldHVybiBhIGstYml0IHByb2JhYmxlIHJhbmRvbSBwcmltZSB1c2luZyBuIHJvdW5kcyBvZiBNaWxsZXIgUmFiaW4gKGFmdGVyIHRyaWFsIGRpdmlzaW9uIHdpdGggc21hbGwgcHJpbWVzKVxuZnVuY3Rpb24gcmFuZFByb2JQcmltZVJvdW5kcyhrLG4pIHtcbiAgdmFyIGFucywgaSwgZGl2aXNpYmxlLCBCO1xuICBCPTMwMDAwOyAgLy9CIGlzIGxhcmdlc3QgcHJpbWUgdG8gdXNlIGluIHRyaWFsIGRpdmlzaW9uXG4gIGFucz1pbnQyYmlnSW50KDAsaywwKTtcblxuICAvL29wdGltaXphdGlvbjogdHJ5IGxhcmdlciBhbmQgc21hbGxlciBCIHRvIGZpbmQgdGhlIGJlc3QgbGltaXQuXG5cbiAgaWYgKHByaW1lcy5sZW5ndGg9PTApXG4gICAgcHJpbWVzPWZpbmRQcmltZXMoMzAwMDApOyAgLy9jaGVjayBmb3IgZGl2aXNpYmlsaXR5IGJ5IHByaW1lcyA8PTMwMDAwXG5cbiAgaWYgKHJwcHJiLmxlbmd0aCE9YW5zLmxlbmd0aClcbiAgICBycHByYj1kdXAoYW5zKTtcblxuICBmb3IgKDs7KSB7IC8va2VlcCB0cnlpbmcgcmFuZG9tIHZhbHVlcyBmb3IgYW5zIHVudGlsIG9uZSBhcHBlYXJzIHRvIGJlIHByaW1lXG4gICAgLy9vcHRpbWl6YXRpb246IHBpY2sgYSByYW5kb20gbnVtYmVyIHRpbWVzIEw9MiozKjUqLi4uKnAsIHBsdXMgYVxuICAgIC8vICAgcmFuZG9tIGVsZW1lbnQgb2YgdGhlIGxpc3Qgb2YgYWxsIG51bWJlcnMgaW4gWzAsTCkgbm90IGRpdmlzaWJsZSBieSBhbnkgcHJpbWUgdXAgdG8gcC5cbiAgICAvLyAgIFRoaXMgY2FuIHJlZHVjZSB0aGUgYW1vdW50IG9mIHJhbmRvbSBudW1iZXIgZ2VuZXJhdGlvbi5cblxuICAgIHJhbmRCaWdJbnRfKGFucyxrLDApOyAvL2FucyA9IGEgcmFuZG9tIG9kZCBudW1iZXIgdG8gY2hlY2tcbiAgICBhbnNbMF0gfD0gMTtcbiAgICBkaXZpc2libGU9MDtcblxuICAgIC8vY2hlY2sgYW5zIGZvciBkaXZpc2liaWxpdHkgYnkgc21hbGwgcHJpbWVzIHVwIHRvIEJcbiAgICBmb3IgKGk9MDsgKGk8cHJpbWVzLmxlbmd0aCkgJiYgKHByaW1lc1tpXTw9Qik7IGkrKylcbiAgICAgIGlmIChtb2RJbnQoYW5zLHByaW1lc1tpXSk9PTAgJiYgIWVxdWFsc0ludChhbnMscHJpbWVzW2ldKSkge1xuICAgICAgICBkaXZpc2libGU9MTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAvL29wdGltaXphdGlvbjogY2hhbmdlIG1pbGxlclJhYmluIHNvIHRoZSBiYXNlIGNhbiBiZSBiaWdnZXIgdGhhbiB0aGUgbnVtYmVyIGJlaW5nIGNoZWNrZWQsIHRoZW4gZWxpbWluYXRlIHRoZSB3aGlsZSBoZXJlLlxuXG4gICAgLy9kbyBuIHJvdW5kcyBvZiBNaWxsZXIgUmFiaW4sIHdpdGggcmFuZG9tIGJhc2VzIGxlc3MgdGhhbiBhbnNcbiAgICBmb3IgKGk9MDsgaTxuICYmICFkaXZpc2libGU7IGkrKykge1xuICAgICAgcmFuZEJpZ0ludF8ocnBwcmIsaywwKTtcbiAgICAgIHdoaWxlKCFncmVhdGVyKGFucyxycHByYikpIC8vcGljayBhIHJhbmRvbSBycHByYiB0aGF0J3MgPCBhbnNcbiAgICAgICAgcmFuZEJpZ0ludF8ocnBwcmIsaywwKTtcbiAgICAgIGlmICghbWlsbGVyUmFiaW4oYW5zLHJwcHJiKSlcbiAgICAgICAgZGl2aXNpYmxlPTE7XG4gICAgfVxuXG4gICAgaWYoIWRpdmlzaWJsZSlcbiAgICAgIHJldHVybiBhbnM7XG4gIH1cbn1cblxuLy9yZXR1cm4gYSBuZXcgYmlnSW50IGVxdWFsIHRvICh4IG1vZCBuKSBmb3IgYmlnSW50cyB4IGFuZCBuLlxuZnVuY3Rpb24gbW9kKHgsbikge1xuICB2YXIgYW5zPWR1cCh4KTtcbiAgbW9kXyhhbnMsbik7XG4gIHJldHVybiB0cmltKGFucywxKTtcbn1cblxuLy9yZXR1cm4gKHgrbikgd2hlcmUgeCBpcyBhIGJpZ0ludCBhbmQgbiBpcyBhbiBpbnRlZ2VyLlxuZnVuY3Rpb24gYWRkSW50KHgsbikge1xuICB2YXIgYW5zPWV4cGFuZCh4LHgubGVuZ3RoKzEpO1xuICBhZGRJbnRfKGFucyxuKTtcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL3JldHVybiB4KnkgZm9yIGJpZ0ludHMgeCBhbmQgeS4gVGhpcyBpcyBmYXN0ZXIgd2hlbiB5PHguXG5mdW5jdGlvbiBtdWx0KHgseSkge1xuICB2YXIgYW5zPWV4cGFuZCh4LHgubGVuZ3RoK3kubGVuZ3RoKTtcbiAgbXVsdF8oYW5zLHkpO1xuICByZXR1cm4gdHJpbShhbnMsMSk7XG59XG5cbi8vcmV0dXJuICh4Kip5IG1vZCBuKSB3aGVyZSB4LHksbiBhcmUgYmlnSW50cyBhbmQgKiogaXMgZXhwb25lbnRpYXRpb24uICAwKiowPTEuIEZhc3RlciBmb3Igb2RkIG4uXG5mdW5jdGlvbiBwb3dNb2QoeCx5LG4pIHtcbiAgdmFyIGFucz1leHBhbmQoeCxuLmxlbmd0aCk7XG4gIHBvd01vZF8oYW5zLHRyaW0oeSwyKSx0cmltKG4sMiksMCk7ICAvL3RoaXMgc2hvdWxkIHdvcmsgd2l0aG91dCB0aGUgdHJpbSwgYnV0IGRvZXNuJ3RcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL3JldHVybiAoeC15KSBmb3IgYmlnSW50cyB4IGFuZCB5LiAgTmVnYXRpdmUgYW5zd2VycyB3aWxsIGJlIDJzIGNvbXBsZW1lbnRcbmZ1bmN0aW9uIHN1Yih4LHkpIHtcbiAgdmFyIGFucz1leHBhbmQoeCwoeC5sZW5ndGg+eS5sZW5ndGggPyB4Lmxlbmd0aCsxIDogeS5sZW5ndGgrMSkpO1xuICBzdWJfKGFucyx5KTtcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL3JldHVybiAoeCt5KSBmb3IgYmlnSW50cyB4IGFuZCB5LlxuZnVuY3Rpb24gYWRkKHgseSkge1xuICB2YXIgYW5zPWV4cGFuZCh4LCh4Lmxlbmd0aD55Lmxlbmd0aCA/IHgubGVuZ3RoKzEgOiB5Lmxlbmd0aCsxKSk7XG4gIGFkZF8oYW5zLHkpO1xuICByZXR1cm4gdHJpbShhbnMsMSk7XG59XG5cbi8vcmV0dXJuICh4KiooLTEpIG1vZCBuKSBmb3IgYmlnSW50cyB4IGFuZCBuLiAgSWYgbm8gaW52ZXJzZSBleGlzdHMsIGl0IHJldHVybnMgbnVsbFxuZnVuY3Rpb24gaW52ZXJzZU1vZCh4LG4pIHtcbiAgdmFyIGFucz1leHBhbmQoeCxuLmxlbmd0aCk7XG4gIHZhciBzO1xuICBzPWludmVyc2VNb2RfKGFucyxuKTtcbiAgcmV0dXJuIHMgPyB0cmltKGFucywxKSA6IG51bGw7XG59XG5cbi8vcmV0dXJuICh4KnkgbW9kIG4pIGZvciBiaWdJbnRzIHgseSxuLiAgRm9yIGdyZWF0ZXIgc3BlZWQsIGxldCB5PHguXG5mdW5jdGlvbiBtdWx0TW9kKHgseSxuKSB7XG4gIHZhciBhbnM9ZXhwYW5kKHgsbi5sZW5ndGgpO1xuICBtdWx0TW9kXyhhbnMseSxuKTtcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL2dlbmVyYXRlIGEgay1iaXQgdHJ1ZSByYW5kb20gcHJpbWUgdXNpbmcgTWF1cmVyJ3MgYWxnb3JpdGhtLFxuLy9hbmQgcHV0IGl0IGludG8gYW5zLiAgVGhlIGJpZ0ludCBhbnMgbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCBpdC5cbmZ1bmN0aW9uIHJhbmRUcnVlUHJpbWVfKGFucyxrKSB7XG4gIHZhciBjLG0scG0sZGQsaixyLEIsZGl2aXNpYmxlLHosenoscmVjU2l6ZTtcblxuICBpZiAocHJpbWVzLmxlbmd0aD09MClcbiAgICBwcmltZXM9ZmluZFByaW1lcygzMDAwMCk7ICAvL2NoZWNrIGZvciBkaXZpc2liaWxpdHkgYnkgcHJpbWVzIDw9MzAwMDBcblxuICBpZiAocG93cy5sZW5ndGg9PTApIHtcbiAgICBwb3dzPW5ldyBBcnJheSg1MTIpO1xuICAgIGZvciAoaj0wO2o8NTEyO2orKykge1xuICAgICAgcG93c1tqXT1NYXRoLnBvdygyLGovNTExLi0xLik7XG4gICAgfVxuICB9XG5cbiAgLy9jIGFuZCBtIHNob3VsZCBiZSB0dW5lZCBmb3IgYSBwYXJ0aWN1bGFyIG1hY2hpbmUgYW5kIHZhbHVlIG9mIGssIHRvIG1heGltaXplIHNwZWVkXG4gIGM9MC4xOyAgLy9jPTAuMSBpbiBIQUNcbiAgbT0yMDsgICAvL2dlbmVyYXRlIHRoaXMgay1iaXQgbnVtYmVyIGJ5IGZpcnN0IHJlY3Vyc2l2ZWx5IGdlbmVyYXRpbmcgYSBudW1iZXIgdGhhdCBoYXMgYmV0d2VlbiBrLzIgYW5kIGstbSBiaXRzXG4gIHJlY0xpbWl0PTIwOyAvL3N0b3AgcmVjdXJzaW9uIHdoZW4gayA8PXJlY0xpbWl0LiAgTXVzdCBoYXZlIHJlY0xpbWl0ID49IDJcblxuICBpZiAoc19pMi5sZW5ndGghPWFucy5sZW5ndGgpIHtcbiAgICBzX2kyPWR1cChhbnMpO1xuICAgIHNfUiA9ZHVwKGFucyk7XG4gICAgc19uMT1kdXAoYW5zKTtcbiAgICBzX3IyPWR1cChhbnMpO1xuICAgIHNfZCA9ZHVwKGFucyk7XG4gICAgc194MT1kdXAoYW5zKTtcbiAgICBzX3gyPWR1cChhbnMpO1xuICAgIHNfYiA9ZHVwKGFucyk7XG4gICAgc19uID1kdXAoYW5zKTtcbiAgICBzX2kgPWR1cChhbnMpO1xuICAgIHNfcm09ZHVwKGFucyk7XG4gICAgc19xID1kdXAoYW5zKTtcbiAgICBzX2EgPWR1cChhbnMpO1xuICAgIHNfYWE9ZHVwKGFucyk7XG4gIH1cblxuICBpZiAoayA8PSByZWNMaW1pdCkgeyAgLy9nZW5lcmF0ZSBzbWFsbCByYW5kb20gcHJpbWVzIGJ5IHRyaWFsIGRpdmlzaW9uIHVwIHRvIGl0cyBzcXVhcmUgcm9vdFxuICAgIHBtPSgxPDwoKGsrMik+PjEpKS0xOyAvL3BtIGlzIGJpbmFyeSBudW1iZXIgd2l0aCBhbGwgb25lcywganVzdCBvdmVyIHNxcnQoMl5rKVxuICAgIGNvcHlJbnRfKGFucywwKTtcbiAgICBmb3IgKGRkPTE7ZGQ7KSB7XG4gICAgICBkZD0wO1xuICAgICAgYW5zWzBdPSAxIHwgKDE8PChrLTEpKSB8IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooMTw8aykpOyAgLy9yYW5kb20sIGstYml0LCBvZGQgaW50ZWdlciwgd2l0aCBtc2IgMVxuICAgICAgZm9yIChqPTE7KGo8cHJpbWVzLmxlbmd0aCkgJiYgKChwcmltZXNbal0mcG0pPT1wcmltZXNbal0pO2orKykgeyAvL3RyaWFsIGRpdmlzaW9uIGJ5IGFsbCBwcmltZXMgMy4uLnNxcnQoMl5rKVxuICAgICAgICBpZiAoMD09KGFuc1swXSVwcmltZXNbal0pKSB7XG4gICAgICAgICAgZGQ9MTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjYXJyeV8oYW5zKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBCPWMqayprOyAgICAvL3RyeSBzbWFsbCBwcmltZXMgdXAgdG8gQiAob3IgYWxsIHRoZSBwcmltZXNbXSBhcnJheSBpZiB0aGUgbGFyZ2VzdCBpcyBsZXNzIHRoYW4gQikuXG4gIGlmIChrPjIqbSkgIC8vZ2VuZXJhdGUgdGhpcyBrLWJpdCBudW1iZXIgYnkgZmlyc3QgcmVjdXJzaXZlbHkgZ2VuZXJhdGluZyBhIG51bWJlciB0aGF0IGhhcyBiZXR3ZWVuIGsvMiBhbmQgay1tIGJpdHNcbiAgICBmb3IgKHI9MTsgay1rKnI8PW07IClcbiAgICAgIHI9cG93c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTEyKV07ICAgLy9yPU1hdGgucG93KDIsTWF0aC5yYW5kb20oKS0xKTtcbiAgZWxzZVxuICAgIHI9LjU7XG5cbiAgLy9zaW11bGF0aW9uIHN1Z2dlc3RzIHRoZSBtb3JlIGNvbXBsZXggYWxnb3JpdGhtIHVzaW5nIHI9LjMzMyBpcyBvbmx5IHNsaWdodGx5IGZhc3Rlci5cblxuICByZWNTaXplPU1hdGguZmxvb3IociprKSsxO1xuXG4gIHJhbmRUcnVlUHJpbWVfKHNfcSxyZWNTaXplKTtcbiAgY29weUludF8oc19pMiwwKTtcbiAgc19pMltNYXRoLmZsb29yKChrLTIpL2JwZSldIHw9ICgxPDwoKGstMiklYnBlKSk7ICAgLy9zX2kyPTJeKGstMilcbiAgZGl2aWRlXyhzX2kyLHNfcSxzX2ksc19ybSk7ICAgICAgICAgICAgICAgICAgICAgICAgLy9zX2k9Zmxvb3IoKDJeKGstMSkpLygycSkpXG5cbiAgej1iaXRTaXplKHNfaSk7XG5cbiAgZm9yICg7Oykge1xuICAgIGZvciAoOzspIHsgIC8vZ2VuZXJhdGUgei1iaXQgbnVtYmVycyB1bnRpbCBvbmUgZmFsbHMgaW4gdGhlIHJhbmdlIFswLHNfaS0xXVxuICAgICAgcmFuZEJpZ0ludF8oc19SLHosMCk7XG4gICAgICBpZiAoZ3JlYXRlcihzX2ksc19SKSlcbiAgICAgICAgYnJlYWs7XG4gICAgfSAgICAgICAgICAgICAgICAvL25vdyBzX1IgaXMgaW4gdGhlIHJhbmdlIFswLHNfaS0xXVxuICAgIGFkZEludF8oc19SLDEpOyAgLy9ub3cgc19SIGlzIGluIHRoZSByYW5nZSBbMSxzX2ldXG4gICAgYWRkXyhzX1Isc19pKTsgICAvL25vdyBzX1IgaXMgaW4gdGhlIHJhbmdlIFtzX2krMSwyKnNfaV1cblxuICAgIGNvcHlfKHNfbixzX3EpO1xuICAgIG11bHRfKHNfbixzX1IpO1xuICAgIG11bHRJbnRfKHNfbiwyKTtcbiAgICBhZGRJbnRfKHNfbiwxKTsgICAgLy9zX249MipzX1Iqc19xKzFcblxuICAgIGNvcHlfKHNfcjIsc19SKTtcbiAgICBtdWx0SW50XyhzX3IyLDIpOyAgLy9zX3IyPTIqc19SXG5cbiAgICAvL2NoZWNrIHNfbiBmb3IgZGl2aXNpYmlsaXR5IGJ5IHNtYWxsIHByaW1lcyB1cCB0byBCXG4gICAgZm9yIChkaXZpc2libGU9MCxqPTA7IChqPHByaW1lcy5sZW5ndGgpICYmIChwcmltZXNbal08Qik7IGorKylcbiAgICAgIGlmIChtb2RJbnQoc19uLHByaW1lc1tqXSk9PTAgJiYgIWVxdWFsc0ludChzX24scHJpbWVzW2pdKSkge1xuICAgICAgICBkaXZpc2libGU9MTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICBpZiAoIWRpdmlzaWJsZSkgICAgLy9pZiBpdCBwYXNzZXMgc21hbGwgcHJpbWVzIGNoZWNrLCB0aGVuIHRyeSBhIHNpbmdsZSBNaWxsZXItUmFiaW4gYmFzZSAyXG4gICAgICBpZiAoIW1pbGxlclJhYmluSW50KHNfbiwyKSkgLy90aGlzIGxpbmUgcmVwcmVzZW50cyA3NSUgb2YgdGhlIHRvdGFsIHJ1bnRpbWUgZm9yIHJhbmRUcnVlUHJpbWVfXG4gICAgICAgIGRpdmlzaWJsZT0xO1xuXG4gICAgaWYgKCFkaXZpc2libGUpIHsgIC8vaWYgaXQgcGFzc2VzIHRoYXQgdGVzdCwgY29udGludWUgY2hlY2tpbmcgc19uXG4gICAgICBhZGRJbnRfKHNfbiwtMyk7XG4gICAgICBmb3IgKGo9c19uLmxlbmd0aC0xOyhzX25bal09PTApICYmIChqPjApOyBqLS0pOyAgLy9zdHJpcCBsZWFkaW5nIHplcm9zXG4gICAgICBmb3IgKHp6PTAsdz1zX25bal07IHc7ICh3Pj49MSksenorKyk7XG4gICAgICB6eis9YnBlKmo7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3p6PW51bWJlciBvZiBiaXRzIGluIHNfbiwgaWdub3JpbmcgbGVhZGluZyB6ZXJvc1xuICAgICAgZm9yICg7OykgeyAgLy9nZW5lcmF0ZSB6LWJpdCBudW1iZXJzIHVudGlsIG9uZSBmYWxscyBpbiB0aGUgcmFuZ2UgWzAsc19uLTFdXG4gICAgICAgIHJhbmRCaWdJbnRfKHNfYSx6eiwwKTtcbiAgICAgICAgaWYgKGdyZWF0ZXIoc19uLHNfYSkpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9ICAgICAgICAgICAgICAgIC8vbm93IHNfYSBpcyBpbiB0aGUgcmFuZ2UgWzAsc19uLTFdXG4gICAgICBhZGRJbnRfKHNfbiwzKTsgIC8vbm93IHNfYSBpcyBpbiB0aGUgcmFuZ2UgWzAsc19uLTRdXG4gICAgICBhZGRJbnRfKHNfYSwyKTsgIC8vbm93IHNfYSBpcyBpbiB0aGUgcmFuZ2UgWzIsc19uLTJdXG4gICAgICBjb3B5XyhzX2Isc19hKTtcbiAgICAgIGNvcHlfKHNfbjEsc19uKTtcbiAgICAgIGFkZEludF8oc19uMSwtMSk7XG4gICAgICBwb3dNb2RfKHNfYixzX24xLHNfbik7ICAgLy9zX2I9c19hXihzX24tMSkgbW9kdWxvIHNfblxuICAgICAgYWRkSW50XyhzX2IsLTEpO1xuICAgICAgaWYgKGlzWmVybyhzX2IpKSB7XG4gICAgICAgIGNvcHlfKHNfYixzX2EpO1xuICAgICAgICBwb3dNb2RfKHNfYixzX3IyLHNfbik7XG4gICAgICAgIGFkZEludF8oc19iLC0xKTtcbiAgICAgICAgY29weV8oc19hYSxzX24pO1xuICAgICAgICBjb3B5XyhzX2Qsc19iKTtcbiAgICAgICAgR0NEXyhzX2Qsc19uKTsgIC8vaWYgc19iIGFuZCBzX24gYXJlIHJlbGF0aXZlbHkgcHJpbWUsIHRoZW4gc19uIGlzIGEgcHJpbWVcbiAgICAgICAgaWYgKGVxdWFsc0ludChzX2QsMSkpIHtcbiAgICAgICAgICBjb3B5XyhhbnMsc19hYSk7XG4gICAgICAgICAgcmV0dXJuOyAgICAgLy9pZiB3ZSd2ZSBtYWRlIGl0IHRoaXMgZmFyLCB0aGVuIHNfbiBpcyBhYnNvbHV0ZWx5IGd1YXJhbnRlZWQgdG8gYmUgcHJpbWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vL1JldHVybiBhbiBuLWJpdCByYW5kb20gQmlnSW50IChuPj0xKS4gIElmIHM9MSwgdGhlbiB0aGUgbW9zdCBzaWduaWZpY2FudCBvZiB0aG9zZSBuIGJpdHMgaXMgc2V0IHRvIDEuXG5mdW5jdGlvbiByYW5kQmlnSW50KG4scykge1xuICB2YXIgYSxiO1xuICBhPU1hdGguZmxvb3IoKG4tMSkvYnBlKSsyOyAvLyMgYXJyYXkgZWxlbWVudHMgdG8gaG9sZCB0aGUgQmlnSW50IHdpdGggYSBsZWFkaW5nIDAgZWxlbWVudFxuICBiPWludDJiaWdJbnQoMCwwLGEpO1xuICByYW5kQmlnSW50XyhiLG4scyk7XG4gIHJldHVybiBiO1xufVxuXG4vL1NldCBiIHRvIGFuIG4tYml0IHJhbmRvbSBCaWdJbnQuICBJZiBzPTEsIHRoZW4gdGhlIG1vc3Qgc2lnbmlmaWNhbnQgb2YgdGhvc2UgbiBiaXRzIGlzIHNldCB0byAxLlxuLy9BcnJheSBiIG11c3QgYmUgYmlnIGVub3VnaCB0byBob2xkIHRoZSByZXN1bHQuIE11c3QgaGF2ZSBuPj0xXG5mdW5jdGlvbiByYW5kQmlnSW50XyhiLG4scykge1xuICB2YXIgaSxhO1xuICBmb3IgKGk9MDtpPGIubGVuZ3RoO2krKylcbiAgICBiW2ldPTA7XG4gIGE9TWF0aC5mbG9vcigobi0xKS9icGUpKzE7IC8vIyBhcnJheSBlbGVtZW50cyB0byBob2xkIHRoZSBCaWdJbnRcbiAgZm9yIChpPTA7aTxhO2krKykge1xuICAgIGJbaV09TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKigxPDwoYnBlLTEpKSk7XG4gIH1cbiAgYlthLTFdICY9ICgyPDwoKG4tMSklYnBlKSktMTtcbiAgaWYgKHM9PTEpXG4gICAgYlthLTFdIHw9ICgxPDwoKG4tMSklYnBlKSk7XG59XG5cbi8vUmV0dXJuIHRoZSBncmVhdGVzdCBjb21tb24gZGl2aXNvciBvZiBiaWdJbnRzIHggYW5kIHkgKGVhY2ggd2l0aCBzYW1lIG51bWJlciBvZiBlbGVtZW50cykuXG5mdW5jdGlvbiBHQ0QoeCx5KSB7XG4gIHZhciB4Yyx5YztcbiAgeGM9ZHVwKHgpO1xuICB5Yz1kdXAoeSk7XG4gIEdDRF8oeGMseWMpO1xuICByZXR1cm4geGM7XG59XG5cbi8vc2V0IHggdG8gdGhlIGdyZWF0ZXN0IGNvbW1vbiBkaXZpc29yIG9mIGJpZ0ludHMgeCBhbmQgeSAoZWFjaCB3aXRoIHNhbWUgbnVtYmVyIG9mIGVsZW1lbnRzKS5cbi8veSBpcyBkZXN0cm95ZWQuXG5mdW5jdGlvbiBHQ0RfKHgseSkge1xuICB2YXIgaSx4cCx5cCxBLEIsQyxELHEsc2luZztcbiAgaWYgKFQubGVuZ3RoIT14Lmxlbmd0aClcbiAgICBUPWR1cCh4KTtcblxuICBzaW5nPTE7XG4gIHdoaWxlIChzaW5nKSB7IC8vd2hpbGUgeSBoYXMgbm9uemVybyBlbGVtZW50cyBvdGhlciB0aGFuIHlbMF1cbiAgICBzaW5nPTA7XG4gICAgZm9yIChpPTE7aTx5Lmxlbmd0aDtpKyspIC8vY2hlY2sgaWYgeSBoYXMgbm9uemVybyBlbGVtZW50cyBvdGhlciB0aGFuIDBcbiAgICAgIGlmICh5W2ldKSB7XG4gICAgICAgIHNpbmc9MTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgaWYgKCFzaW5nKSBicmVhazsgLy9xdWl0IHdoZW4geSBhbGwgemVybyBlbGVtZW50cyBleGNlcHQgcG9zc2libHkgeVswXVxuXG4gICAgZm9yIChpPXgubGVuZ3RoOyF4W2ldICYmIGk+PTA7aS0tKTsgIC8vZmluZCBtb3N0IHNpZ25pZmljYW50IGVsZW1lbnQgb2YgeFxuICAgIHhwPXhbaV07XG4gICAgeXA9eVtpXTtcbiAgICBBPTE7IEI9MDsgQz0wOyBEPTE7XG4gICAgd2hpbGUgKCh5cCtDKSAmJiAoeXArRCkpIHtcbiAgICAgIHEgPU1hdGguZmxvb3IoKHhwK0EpLyh5cCtDKSk7XG4gICAgICBxcD1NYXRoLmZsb29yKCh4cCtCKS8oeXArRCkpO1xuICAgICAgaWYgKHEhPXFwKVxuICAgICAgICBicmVhaztcbiAgICAgIHQ9IEEtcSpDOyAgIEE9QzsgICBDPXQ7ICAgIC8vICBkbyAoQSxCLHhwLCBDLEQseXApID0gKEMsRCx5cCwgQSxCLHhwKSAtIHEqKDAsMCwwLCBDLEQseXApXG4gICAgICB0PSBCLXEqRDsgICBCPUQ7ICAgRD10O1xuICAgICAgdD14cC1xKnlwOyB4cD15cDsgeXA9dDtcbiAgICB9XG4gICAgaWYgKEIpIHtcbiAgICAgIGNvcHlfKFQseCk7XG4gICAgICBsaW5Db21iXyh4LHksQSxCKTsgLy94PUEqeCtCKnlcbiAgICAgIGxpbkNvbWJfKHksVCxELEMpOyAvL3k9RCp5K0MqVFxuICAgIH0gZWxzZSB7XG4gICAgICBtb2RfKHgseSk7XG4gICAgICBjb3B5XyhULHgpO1xuICAgICAgY29weV8oeCx5KTtcbiAgICAgIGNvcHlfKHksVCk7XG4gICAgfVxuICB9XG4gIGlmICh5WzBdPT0wKVxuICAgIHJldHVybjtcbiAgdD1tb2RJbnQoeCx5WzBdKTtcbiAgY29weUludF8oeCx5WzBdKTtcbiAgeVswXT10O1xuICB3aGlsZSAoeVswXSkge1xuICAgIHhbMF0lPXlbMF07XG4gICAgdD14WzBdOyB4WzBdPXlbMF07IHlbMF09dDtcbiAgfVxufVxuXG4vL2RvIHg9eCoqKC0xKSBtb2QgbiwgZm9yIGJpZ0ludHMgeCBhbmQgbi5cbi8vSWYgbm8gaW52ZXJzZSBleGlzdHMsIGl0IHNldHMgeCB0byB6ZXJvIGFuZCByZXR1cm5zIDAsIGVsc2UgaXQgcmV0dXJucyAxLlxuLy9UaGUgeCBhcnJheSBtdXN0IGJlIGF0IGxlYXN0IGFzIGxhcmdlIGFzIHRoZSBuIGFycmF5LlxuZnVuY3Rpb24gaW52ZXJzZU1vZF8oeCxuKSB7XG4gIHZhciBrPTErMipNYXRoLm1heCh4Lmxlbmd0aCxuLmxlbmd0aCk7XG5cbiAgaWYoISh4WzBdJjEpICAmJiAhKG5bMF0mMSkpIHsgIC8vaWYgYm90aCBpbnB1dHMgYXJlIGV2ZW4sIHRoZW4gaW52ZXJzZSBkb2Vzbid0IGV4aXN0XG4gICAgY29weUludF8oeCwwKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmIChlZ191Lmxlbmd0aCE9aykge1xuICAgIGVnX3U9bmV3IEFycmF5KGspO1xuICAgIGVnX3Y9bmV3IEFycmF5KGspO1xuICAgIGVnX0E9bmV3IEFycmF5KGspO1xuICAgIGVnX0I9bmV3IEFycmF5KGspO1xuICAgIGVnX0M9bmV3IEFycmF5KGspO1xuICAgIGVnX0Q9bmV3IEFycmF5KGspO1xuICB9XG5cbiAgY29weV8oZWdfdSx4KTtcbiAgY29weV8oZWdfdixuKTtcbiAgY29weUludF8oZWdfQSwxKTtcbiAgY29weUludF8oZWdfQiwwKTtcbiAgY29weUludF8oZWdfQywwKTtcbiAgY29weUludF8oZWdfRCwxKTtcbiAgZm9yICg7Oykge1xuICAgIHdoaWxlKCEoZWdfdVswXSYxKSkgeyAgLy93aGlsZSBlZ191IGlzIGV2ZW5cbiAgICAgIGhhbHZlXyhlZ191KTtcbiAgICAgIGlmICghKGVnX0FbMF0mMSkgJiYgIShlZ19CWzBdJjEpKSB7IC8vaWYgZWdfQT09ZWdfQj09MCBtb2QgMlxuICAgICAgICBoYWx2ZV8oZWdfQSk7XG4gICAgICAgIGhhbHZlXyhlZ19CKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZF8oZWdfQSxuKTsgIGhhbHZlXyhlZ19BKTtcbiAgICAgICAgc3ViXyhlZ19CLHgpOyAgaGFsdmVfKGVnX0IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdoaWxlICghKGVnX3ZbMF0mMSkpIHsgIC8vd2hpbGUgZWdfdiBpcyBldmVuXG4gICAgICBoYWx2ZV8oZWdfdik7XG4gICAgICBpZiAoIShlZ19DWzBdJjEpICYmICEoZWdfRFswXSYxKSkgeyAvL2lmIGVnX0M9PWVnX0Q9PTAgbW9kIDJcbiAgICAgICAgaGFsdmVfKGVnX0MpO1xuICAgICAgICBoYWx2ZV8oZWdfRCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRfKGVnX0Msbik7ICBoYWx2ZV8oZWdfQyk7XG4gICAgICAgIHN1Yl8oZWdfRCx4KTsgIGhhbHZlXyhlZ19EKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWdyZWF0ZXIoZWdfdixlZ191KSkgeyAvL2VnX3YgPD0gZWdfdVxuICAgICAgc3ViXyhlZ191LGVnX3YpO1xuICAgICAgc3ViXyhlZ19BLGVnX0MpO1xuICAgICAgc3ViXyhlZ19CLGVnX0QpO1xuICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgIC8vZWdfdiA+IGVnX3VcbiAgICAgIHN1Yl8oZWdfdixlZ191KTtcbiAgICAgIHN1Yl8oZWdfQyxlZ19BKTtcbiAgICAgIHN1Yl8oZWdfRCxlZ19CKTtcbiAgICB9XG5cbiAgICBpZiAoZXF1YWxzSW50KGVnX3UsMCkpIHtcbiAgICAgIGlmIChuZWdhdGl2ZShlZ19DKSkgLy9tYWtlIHN1cmUgYW5zd2VyIGlzIG5vbm5lZ2F0aXZlXG4gICAgICAgIGFkZF8oZWdfQyxuKTtcbiAgICAgIGNvcHlfKHgsZWdfQyk7XG5cbiAgICAgIGlmICghZXF1YWxzSW50KGVnX3YsMSkpIHsgLy9pZiBHQ0RfKHgsbikhPTEsIHRoZW4gdGhlcmUgaXMgbm8gaW52ZXJzZVxuICAgICAgICBjb3B5SW50Xyh4LDApO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgfVxufVxuXG4vL3JldHVybiB4KiooLTEpIG1vZCBuLCBmb3IgaW50ZWdlcnMgeCBhbmQgbi4gIFJldHVybiAwIGlmIHRoZXJlIGlzIG5vIGludmVyc2VcbmZ1bmN0aW9uIGludmVyc2VNb2RJbnQoeCxuKSB7XG4gIHZhciBhPTEsYj0wLHQ7XG4gIGZvciAoOzspIHtcbiAgICBpZiAoeD09MSkgcmV0dXJuIGE7XG4gICAgaWYgKHg9PTApIHJldHVybiAwO1xuICAgIGItPWEqTWF0aC5mbG9vcihuL3gpO1xuICAgIG4lPXg7XG5cbiAgICBpZiAobj09MSkgcmV0dXJuIGI7IC8vdG8gYXZvaWQgbmVnYXRpdmVzLCBjaGFuZ2UgdGhpcyBiIHRvIG4tYiwgYW5kIGVhY2ggLT0gdG8gKz1cbiAgICBpZiAobj09MCkgcmV0dXJuIDA7XG4gICAgYS09YipNYXRoLmZsb29yKHgvbik7XG4gICAgeCU9bjtcbiAgfVxufVxuXG4vL3RoaXMgZGVwcmVjYXRlZCBmdW5jdGlvbiBpcyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBvbmx5LlxuZnVuY3Rpb24gaW52ZXJzZU1vZEludF8oeCxuKSB7XG4gICByZXR1cm4gaW52ZXJzZU1vZEludCh4LG4pO1xufVxuXG5cbi8vR2l2ZW4gcG9zaXRpdmUgYmlnSW50cyB4IGFuZCB5LCBjaGFuZ2UgdGhlIGJpZ2ludHMgdiwgYSwgYW5kIGIgdG8gcG9zaXRpdmUgYmlnSW50cyBzdWNoIHRoYXQ6XG4vLyAgICAgdiA9IEdDRF8oeCx5KSA9IGEqeC1iKnlcbi8vVGhlIGJpZ0ludHMgdiwgYSwgYiwgbXVzdCBoYXZlIGV4YWN0bHkgYXMgbWFueSBlbGVtZW50cyBhcyB0aGUgbGFyZ2VyIG9mIHggYW5kIHkuXG5mdW5jdGlvbiBlR0NEXyh4LHksdixhLGIpIHtcbiAgdmFyIGc9MDtcbiAgdmFyIGs9TWF0aC5tYXgoeC5sZW5ndGgseS5sZW5ndGgpO1xuICBpZiAoZWdfdS5sZW5ndGghPWspIHtcbiAgICBlZ191PW5ldyBBcnJheShrKTtcbiAgICBlZ19BPW5ldyBBcnJheShrKTtcbiAgICBlZ19CPW5ldyBBcnJheShrKTtcbiAgICBlZ19DPW5ldyBBcnJheShrKTtcbiAgICBlZ19EPW5ldyBBcnJheShrKTtcbiAgfVxuICB3aGlsZSghKHhbMF0mMSkgICYmICEoeVswXSYxKSkgeyAgLy93aGlsZSB4IGFuZCB5IGJvdGggZXZlblxuICAgIGhhbHZlXyh4KTtcbiAgICBoYWx2ZV8oeSk7XG4gICAgZysrO1xuICB9XG4gIGNvcHlfKGVnX3UseCk7XG4gIGNvcHlfKHYseSk7XG4gIGNvcHlJbnRfKGVnX0EsMSk7XG4gIGNvcHlJbnRfKGVnX0IsMCk7XG4gIGNvcHlJbnRfKGVnX0MsMCk7XG4gIGNvcHlJbnRfKGVnX0QsMSk7XG4gIGZvciAoOzspIHtcbiAgICB3aGlsZSghKGVnX3VbMF0mMSkpIHsgIC8vd2hpbGUgdSBpcyBldmVuXG4gICAgICBoYWx2ZV8oZWdfdSk7XG4gICAgICBpZiAoIShlZ19BWzBdJjEpICYmICEoZWdfQlswXSYxKSkgeyAvL2lmIEE9PUI9PTAgbW9kIDJcbiAgICAgICAgaGFsdmVfKGVnX0EpO1xuICAgICAgICBoYWx2ZV8oZWdfQik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRfKGVnX0EseSk7ICBoYWx2ZV8oZWdfQSk7XG4gICAgICAgIHN1Yl8oZWdfQix4KTsgIGhhbHZlXyhlZ19CKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aGlsZSAoISh2WzBdJjEpKSB7ICAvL3doaWxlIHYgaXMgZXZlblxuICAgICAgaGFsdmVfKHYpO1xuICAgICAgaWYgKCEoZWdfQ1swXSYxKSAmJiAhKGVnX0RbMF0mMSkpIHsgLy9pZiBDPT1EPT0wIG1vZCAyXG4gICAgICAgIGhhbHZlXyhlZ19DKTtcbiAgICAgICAgaGFsdmVfKGVnX0QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkXyhlZ19DLHkpOyAgaGFsdmVfKGVnX0MpO1xuICAgICAgICBzdWJfKGVnX0QseCk7ICBoYWx2ZV8oZWdfRCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFncmVhdGVyKHYsZWdfdSkpIHsgLy92PD11XG4gICAgICBzdWJfKGVnX3Usdik7XG4gICAgICBzdWJfKGVnX0EsZWdfQyk7XG4gICAgICBzdWJfKGVnX0IsZWdfRCk7XG4gICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgLy92PnVcbiAgICAgIHN1Yl8odixlZ191KTtcbiAgICAgIHN1Yl8oZWdfQyxlZ19BKTtcbiAgICAgIHN1Yl8oZWdfRCxlZ19CKTtcbiAgICB9XG4gICAgaWYgKGVxdWFsc0ludChlZ191LDApKSB7XG4gICAgICBpZiAobmVnYXRpdmUoZWdfQykpIHsgICAvL21ha2Ugc3VyZSBhIChDKWlzIG5vbm5lZ2F0aXZlXG4gICAgICAgIGFkZF8oZWdfQyx5KTtcbiAgICAgICAgc3ViXyhlZ19ELHgpO1xuICAgICAgfVxuICAgICAgbXVsdEludF8oZWdfRCwtMSk7ICAvLy9tYWtlIHN1cmUgYiAoRCkgaXMgbm9ubmVnYXRpdmVcbiAgICAgIGNvcHlfKGEsZWdfQyk7XG4gICAgICBjb3B5XyhiLGVnX0QpO1xuICAgICAgbGVmdFNoaWZ0Xyh2LGcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxufVxuXG5cbi8vaXMgYmlnSW50IHggbmVnYXRpdmU/XG5mdW5jdGlvbiBuZWdhdGl2ZSh4KSB7XG4gIHJldHVybiAoKHhbeC5sZW5ndGgtMV0+PihicGUtMSkpJjEpO1xufVxuXG5cbi8vaXMgKHggPDwgKHNoaWZ0KmJwZSkpID4geT9cbi8veCBhbmQgeSBhcmUgbm9ubmVnYXRpdmUgYmlnSW50c1xuLy9zaGlmdCBpcyBhIG5vbm5lZ2F0aXZlIGludGVnZXJcbmZ1bmN0aW9uIGdyZWF0ZXJTaGlmdCh4LHksc2hpZnQpIHtcbiAgdmFyIGksIGt4PXgubGVuZ3RoLCBreT15Lmxlbmd0aDtcbiAgaz0oKGt4K3NoaWZ0KTxreSkgPyAoa3grc2hpZnQpIDoga3k7XG4gIGZvciAoaT1reS0xLXNoaWZ0OyBpPGt4ICYmIGk+PTA7IGkrKylcbiAgICBpZiAoeFtpXT4wKVxuICAgICAgcmV0dXJuIDE7IC8vaWYgdGhlcmUgYXJlIG5vbnplcm9zIGluIHggdG8gdGhlIGxlZnQgb2YgdGhlIGZpcnN0IGNvbHVtbiBvZiB5LCB0aGVuIHggaXMgYmlnZ2VyXG4gIGZvciAoaT1reC0xK3NoaWZ0OyBpPGt5OyBpKyspXG4gICAgaWYgKHlbaV0+MClcbiAgICAgIHJldHVybiAwOyAvL2lmIHRoZXJlIGFyZSBub256ZXJvcyBpbiB5IHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBjb2x1bW4gb2YgeCwgdGhlbiB4IGlzIG5vdCBiaWdnZXJcbiAgZm9yIChpPWstMTsgaT49c2hpZnQ7IGktLSlcbiAgICBpZiAgICAgICh4W2ktc2hpZnRdPnlbaV0pIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKHhbaS1zaGlmdF08eVtpXSkgcmV0dXJuIDA7XG4gIHJldHVybiAwO1xufVxuXG4vL2lzIHggPiB5PyAoeCBhbmQgeSBib3RoIG5vbm5lZ2F0aXZlKVxuZnVuY3Rpb24gZ3JlYXRlcih4LHkpIHtcbiAgdmFyIGk7XG4gIHZhciBrPSh4Lmxlbmd0aDx5Lmxlbmd0aCkgPyB4Lmxlbmd0aCA6IHkubGVuZ3RoO1xuXG4gIGZvciAoaT14Lmxlbmd0aDtpPHkubGVuZ3RoO2krKylcbiAgICBpZiAoeVtpXSlcbiAgICAgIHJldHVybiAwOyAgLy95IGhhcyBtb3JlIGRpZ2l0c1xuXG4gIGZvciAoaT15Lmxlbmd0aDtpPHgubGVuZ3RoO2krKylcbiAgICBpZiAoeFtpXSlcbiAgICAgIHJldHVybiAxOyAgLy94IGhhcyBtb3JlIGRpZ2l0c1xuXG4gIGZvciAoaT1rLTE7aT49MDtpLS0pXG4gICAgaWYgKHhbaV0+eVtpXSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKHhbaV08eVtpXSlcbiAgICAgIHJldHVybiAwO1xuICByZXR1cm4gMDtcbn1cblxuLy9kaXZpZGUgeCBieSB5IGdpdmluZyBxdW90aWVudCBxIGFuZCByZW1haW5kZXIgci4gIChxPWZsb29yKHgveSksICByPXggbW9kIHkpLiAgQWxsIDQgYXJlIGJpZ2ludHMuXG4vL3ggbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBsZWFkaW5nIHplcm8gZWxlbWVudC5cbi8veSBtdXN0IGJlIG5vbnplcm8uXG4vL3EgYW5kIHIgbXVzdCBiZSBhcnJheXMgdGhhdCBhcmUgZXhhY3RseSB0aGUgc2FtZSBsZW5ndGggYXMgeC4gKE9yIHEgY2FuIGhhdmUgbW9yZSkuXG4vL011c3QgaGF2ZSB4Lmxlbmd0aCA+PSB5Lmxlbmd0aCA+PSAyLlxuZnVuY3Rpb24gZGl2aWRlXyh4LHkscSxyKSB7XG4gIHZhciBreCwga3k7XG4gIHZhciBpLGoseTEseTIsYyxhLGI7XG4gIGNvcHlfKHIseCk7XG4gIGZvciAoa3k9eS5sZW5ndGg7eVtreS0xXT09MDtreS0tKTsgLy9reSBpcyBudW1iZXIgb2YgZWxlbWVudHMgaW4geSwgbm90IGluY2x1ZGluZyBsZWFkaW5nIHplcm9zXG5cbiAgLy9ub3JtYWxpemU6IGVuc3VyZSB0aGUgbW9zdCBzaWduaWZpY2FudCBlbGVtZW50IG9mIHkgaGFzIGl0cyBoaWdoZXN0IGJpdCBzZXRcbiAgYj15W2t5LTFdO1xuICBmb3IgKGE9MDsgYjsgYSsrKVxuICAgIGI+Pj0xO1xuICBhPWJwZS1hOyAgLy9hIGlzIGhvdyBtYW55IGJpdHMgdG8gc2hpZnQgc28gdGhhdCB0aGUgaGlnaCBvcmRlciBiaXQgb2YgeSBpcyBsZWZ0bW9zdCBpbiBpdHMgYXJyYXkgZWxlbWVudFxuICBsZWZ0U2hpZnRfKHksYSk7ICAvL211bHRpcGx5IGJvdGggYnkgMTw8YSBub3csIHRoZW4gZGl2aWRlIGJvdGggYnkgdGhhdCBhdCB0aGUgZW5kXG4gIGxlZnRTaGlmdF8ocixhKTtcblxuICAvL1JvYiBWaXNzZXIgZGlzY292ZXJlZCBhIGJ1ZzogdGhlIGZvbGxvd2luZyBsaW5lIHdhcyBvcmlnaW5hbGx5IGp1c3QgYmVmb3JlIHRoZSBub3JtYWxpemF0aW9uLlxuICBmb3IgKGt4PXIubGVuZ3RoO3Jba3gtMV09PTAgJiYga3g+a3k7a3gtLSk7IC8va3ggaXMgbnVtYmVyIG9mIGVsZW1lbnRzIGluIG5vcm1hbGl6ZWQgeCwgbm90IGluY2x1ZGluZyBsZWFkaW5nIHplcm9zXG5cbiAgY29weUludF8ocSwwKTsgICAgICAgICAgICAgICAgICAgICAgLy8gcT0wXG4gIHdoaWxlICghZ3JlYXRlclNoaWZ0KHkscixreC1reSkpIHsgIC8vIHdoaWxlIChsZWZ0U2hpZnRfKHksa3gta3kpIDw9IHIpIHtcbiAgICBzdWJTaGlmdF8ocix5LGt4LWt5KTsgICAgICAgICAgICAgLy8gICByPXItbGVmdFNoaWZ0Xyh5LGt4LWt5KVxuICAgIHFba3gta3ldKys7ICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHFba3gta3ldKys7XG4gIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cblxuICBmb3IgKGk9a3gtMTsgaT49a3k7IGktLSkge1xuICAgIGlmIChyW2ldPT15W2t5LTFdKVxuICAgICAgcVtpLWt5XT1tYXNrO1xuICAgIGVsc2VcbiAgICAgIHFbaS1reV09TWF0aC5mbG9vcigocltpXSpyYWRpeCtyW2ktMV0pL3lba3ktMV0pO1xuXG4gICAgLy9UaGUgZm9sbG93aW5nIGZvcig7OykgbG9vcCBpcyBlcXVpdmFsZW50IHRvIHRoZSBjb21tZW50ZWQgd2hpbGUgbG9vcCxcbiAgICAvL2V4Y2VwdCB0aGF0IHRoZSB1bmNvbW1lbnRlZCB2ZXJzaW9uIGF2b2lkcyBvdmVyZmxvdy5cbiAgICAvL1RoZSBjb21tZW50ZWQgbG9vcCBjb21lcyBmcm9tIEhBQywgd2hpY2ggYXNzdW1lcyByWy0xXT09eVstMV09PTBcbiAgICAvLyAgd2hpbGUgKHFbaS1reV0qKHlba3ktMV0qcmFkaXgreVtreS0yXSkgPiByW2ldKnJhZGl4KnJhZGl4K3JbaS0xXSpyYWRpeCtyW2ktMl0pXG4gICAgLy8gICAgcVtpLWt5XS0tO1xuICAgIGZvciAoOzspIHtcbiAgICAgIHkyPShreT4xID8geVtreS0yXSA6IDApKnFbaS1reV07XG4gICAgICBjPXkyPj5icGU7XG4gICAgICB5Mj15MiAmIG1hc2s7XG4gICAgICB5MT1jK3FbaS1reV0qeVtreS0xXTtcbiAgICAgIGM9eTE+PmJwZTtcbiAgICAgIHkxPXkxICYgbWFzaztcblxuICAgICAgaWYgKGM9PXJbaV0gPyB5MT09cltpLTFdID8geTI+KGk+MSA/IHJbaS0yXSA6IDApIDogeTE+cltpLTFdIDogYz5yW2ldKVxuICAgICAgICBxW2kta3ldLS07XG4gICAgICBlbHNlXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGxpbkNvbWJTaGlmdF8ocix5LC1xW2kta3ldLGkta3kpOyAgICAvL3I9ci1xW2kta3ldKmxlZnRTaGlmdF8oeSxpLWt5KVxuICAgIGlmIChuZWdhdGl2ZShyKSkge1xuICAgICAgYWRkU2hpZnRfKHIseSxpLWt5KTsgICAgICAgICAvL3I9citsZWZ0U2hpZnRfKHksaS1reSlcbiAgICAgIHFbaS1reV0tLTtcbiAgICB9XG4gIH1cblxuICByaWdodFNoaWZ0Xyh5LGEpOyAgLy91bmRvIHRoZSBub3JtYWxpemF0aW9uIHN0ZXBcbiAgcmlnaHRTaGlmdF8ocixhKTsgIC8vdW5kbyB0aGUgbm9ybWFsaXphdGlvbiBzdGVwXG59XG5cbi8vZG8gY2FycmllcyBhbmQgYm9ycm93cyBzbyBlYWNoIGVsZW1lbnQgb2YgdGhlIGJpZ0ludCB4IGZpdHMgaW4gYnBlIGJpdHMuXG5mdW5jdGlvbiBjYXJyeV8oeCkge1xuICB2YXIgaSxrLGMsYjtcbiAgaz14Lmxlbmd0aDtcbiAgYz0wO1xuICBmb3IgKGk9MDtpPGs7aSsrKSB7XG4gICAgYys9eFtpXTtcbiAgICBiPTA7XG4gICAgaWYgKGM8MCkge1xuICAgICAgYj0tKGM+PmJwZSk7XG4gICAgICBjKz1iKnJhZGl4O1xuICAgIH1cbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM9KGM+PmJwZSktYjtcbiAgfVxufVxuXG4vL3JldHVybiB4IG1vZCBuIGZvciBiaWdJbnQgeCBhbmQgaW50ZWdlciBuLlxuZnVuY3Rpb24gbW9kSW50KHgsbikge1xuICB2YXIgaSxjPTA7XG4gIGZvciAoaT14Lmxlbmd0aC0xOyBpPj0wOyBpLS0pXG4gICAgYz0oYypyYWRpeCt4W2ldKSVuO1xuICByZXR1cm4gYztcbn1cblxuLy9jb252ZXJ0IHRoZSBpbnRlZ2VyIHQgaW50byBhIGJpZ0ludCB3aXRoIGF0IGxlYXN0IHRoZSBnaXZlbiBudW1iZXIgb2YgYml0cy5cbi8vdGhlIHJldHVybmVkIGFycmF5IHN0b3JlcyB0aGUgYmlnSW50IGluIGJwZS1iaXQgY2h1bmtzLCBsaXR0bGUgZW5kaWFuIChidWZmWzBdIGlzIGxlYXN0IHNpZ25pZmljYW50IHdvcmQpXG4vL1BhZCB0aGUgYXJyYXkgd2l0aCBsZWFkaW5nIHplcm9zIHNvIHRoYXQgaXQgaGFzIGF0IGxlYXN0IG1pblNpemUgZWxlbWVudHMuXG4vL1RoZXJlIHdpbGwgYWx3YXlzIGJlIGF0IGxlYXN0IG9uZSBsZWFkaW5nIDAgZWxlbWVudC5cbmZ1bmN0aW9uIGludDJiaWdJbnQodCxiaXRzLG1pblNpemUpIHtcbiAgdmFyIGksaztcbiAgaz1NYXRoLmNlaWwoYml0cy9icGUpKzE7XG4gIGs9bWluU2l6ZT5rID8gbWluU2l6ZSA6IGs7XG4gIGJ1ZmY9bmV3IEFycmF5KGspO1xuICBjb3B5SW50XyhidWZmLHQpO1xuICByZXR1cm4gYnVmZjtcbn1cblxuLy9yZXR1cm4gdGhlIGJpZ0ludCBnaXZlbiBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBpbiBhIGdpdmVuIGJhc2UuXG4vL1BhZCB0aGUgYXJyYXkgd2l0aCBsZWFkaW5nIHplcm9zIHNvIHRoYXQgaXQgaGFzIGF0IGxlYXN0IG1pblNpemUgZWxlbWVudHMuXG4vL0lmIGJhc2U9LTEsIHRoZW4gaXQgcmVhZHMgaW4gYSBzcGFjZS1zZXBhcmF0ZWQgbGlzdCBvZiBhcnJheSBlbGVtZW50cyBpbiBkZWNpbWFsLlxuLy9UaGUgYXJyYXkgd2lsbCBhbHdheXMgaGF2ZSBhdCBsZWFzdCBvbmUgbGVhZGluZyB6ZXJvLCB1bmxlc3MgYmFzZT0tMS5cbmZ1bmN0aW9uIHN0cjJiaWdJbnQocyxiLG1pblNpemUpIHtcbiAgdmFyIGQsIGksIGosIGJhc2UsIHN0ciwgeCwgeSwga2s7XG4gIGlmICh0eXBlb2YgYiA9PT0gJ3N0cmluZycpIHtcblx0ICBiYXNlID0gYi5sZW5ndGg7XG5cdCAgc3RyID0gYjtcbiAgfSBlbHNlIHtcblx0ICBiYXNlID0gYjtcblx0ICBzdHIgPSBkaWdpdHNTdHI7XG4gIH1cbiAgdmFyIGs9cy5sZW5ndGg7XG4gIGlmIChiYXNlPT0tMSkgeyAvL2NvbW1hLXNlcGFyYXRlZCBsaXN0IG9mIGFycmF5IGVsZW1lbnRzIGluIGRlY2ltYWxcbiAgICB4PW5ldyBBcnJheSgwKTtcbiAgICBmb3IgKDs7KSB7XG4gICAgICB5PW5ldyBBcnJheSh4Lmxlbmd0aCsxKTtcbiAgICAgIGZvciAoaT0wO2k8eC5sZW5ndGg7aSsrKVxuICAgICAgICB5W2krMV09eFtpXTtcbiAgICAgIHlbMF09cGFyc2VJbnQocywxMCk7XG4gICAgICB4PXk7XG4gICAgICBkPXMuaW5kZXhPZignLCcsMCk7XG4gICAgICBpZiAoZDwxKVxuICAgICAgICBicmVhaztcbiAgICAgIHM9cy5zdWJzdHJpbmcoZCsxKTtcbiAgICAgIGlmIChzLmxlbmd0aD09MClcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh4Lmxlbmd0aDxtaW5TaXplKSB7XG4gICAgICB5PW5ldyBBcnJheShtaW5TaXplKTtcbiAgICAgIGNvcHlfKHkseCk7XG4gICAgICByZXR1cm4geTtcbiAgICB9XG4gICAgcmV0dXJuIHg7XG4gIH1cblxuICB4PWludDJiaWdJbnQoMCxiYXNlKmssMCk7XG4gIGZvciAoaT0wO2k8aztpKyspIHtcbiAgICBkPXN0ci5pbmRleE9mKHMuc3Vic3RyaW5nKGksaSsxKSwwKTtcbi8vICAgIGlmIChiYXNlPD0zNiAmJiBkPj0zNikgIC8vY29udmVydCBsb3dlcmNhc2UgdG8gdXBwZXJjYXNlIGlmIGJhc2U8PTM2XG4vLyAgICAgIGQtPTI2O1xuICAgIGlmIChkPj1iYXNlIHx8IGQ8MCkgeyAgIC8vaWdub3JlIGlsbGVnYWwgY2hhcmFjdGVyc1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIG11bHRJbnRfKHgsYmFzZSk7XG4gICAgYWRkSW50Xyh4LGQpO1xuICB9XG5cbiAgZm9yIChrPXgubGVuZ3RoO2s+MCAmJiAheFtrLTFdO2stLSk7IC8vc3RyaXAgb2ZmIGxlYWRpbmcgemVyb3NcbiAgaz1taW5TaXplPmsrMSA/IG1pblNpemUgOiBrKzE7XG4gIHk9bmV3IEFycmF5KGspO1xuICBraz1rPHgubGVuZ3RoID8gayA6IHgubGVuZ3RoO1xuICBmb3IgKGk9MDtpPGtrO2krKylcbiAgICB5W2ldPXhbaV07XG4gIGZvciAoO2k8aztpKyspXG4gICAgeVtpXT0wO1xuICByZXR1cm4geTtcbn1cblxuLy9pcyBiaWdpbnQgeCBlcXVhbCB0byBpbnRlZ2VyIHk/XG4vL3kgbXVzdCBoYXZlIGxlc3MgdGhhbiBicGUgYml0c1xuZnVuY3Rpb24gZXF1YWxzSW50KHgseSkge1xuICB2YXIgaTtcbiAgaWYgKHhbMF0hPXkpXG4gICAgcmV0dXJuIDA7XG4gIGZvciAoaT0xO2k8eC5sZW5ndGg7aSsrKVxuICAgIGlmICh4W2ldKVxuICAgICAgcmV0dXJuIDA7XG4gIHJldHVybiAxO1xufVxuXG4vL2FyZSBiaWdpbnRzIHggYW5kIHkgZXF1YWw/XG4vL3RoaXMgd29ya3MgZXZlbiBpZiB4IGFuZCB5IGFyZSBkaWZmZXJlbnQgbGVuZ3RocyBhbmQgaGF2ZSBhcmJpdHJhcmlseSBtYW55IGxlYWRpbmcgemVyb3NcbmZ1bmN0aW9uIGVxdWFscyh4LHkpIHtcbiAgdmFyIGk7XG4gIHZhciBrPXgubGVuZ3RoPHkubGVuZ3RoID8geC5sZW5ndGggOiB5Lmxlbmd0aDtcbiAgZm9yIChpPTA7aTxrO2krKylcbiAgICBpZiAoeFtpXSE9eVtpXSlcbiAgICAgIHJldHVybiAwO1xuICBpZiAoeC5sZW5ndGg+eS5sZW5ndGgpIHtcbiAgICBmb3IgKDtpPHgubGVuZ3RoO2krKylcbiAgICAgIGlmICh4W2ldKVxuICAgICAgICByZXR1cm4gMDtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKDtpPHkubGVuZ3RoO2krKylcbiAgICAgIGlmICh5W2ldKVxuICAgICAgICByZXR1cm4gMDtcbiAgfVxuICByZXR1cm4gMTtcbn1cblxuLy9pcyB0aGUgYmlnSW50IHggZXF1YWwgdG8gemVybz9cbmZ1bmN0aW9uIGlzWmVybyh4KSB7XG4gIHZhciBpO1xuICBmb3IgKGk9MDtpPHgubGVuZ3RoO2krKylcbiAgICBpZiAoeFtpXSlcbiAgICAgIHJldHVybiAwO1xuICByZXR1cm4gMTtcbn1cblxuLy9jb252ZXJ0IGEgYmlnSW50IGludG8gYSBzdHJpbmcgaW4gYSBnaXZlbiBiYXNlLCBmcm9tIGJhc2UgMiB1cCB0byBiYXNlIDk1LlxuLy9CYXNlIC0xIHByaW50cyB0aGUgY29udGVudHMgb2YgdGhlIGFycmF5IHJlcHJlc2VudGluZyB0aGUgbnVtYmVyLlxuZnVuY3Rpb24gYmlnSW50MnN0cih4LGIpIHtcbiAgdmFyIGksdCxiYXNlLHN0cixzPVwiXCI7XG4gIGlmICh0eXBlb2YgYiA9PT0gJ3N0cmluZycpIHtcblx0ICBiYXNlID0gYi5sZW5ndGg7XG5cdCAgc3RyID0gYjtcbiAgfSBlbHNlIHtcblx0ICBiYXNlID0gYjtcblx0ICBzdHIgPSBkaWdpdHNTdHI7XG4gIH1cblxuICBpZiAoczYubGVuZ3RoIT14Lmxlbmd0aClcbiAgICBzNj1kdXAoeCk7XG4gIGVsc2VcbiAgICBjb3B5XyhzNix4KTtcblxuICBpZiAoYmFzZT09LTEpIHsgLy9yZXR1cm4gdGhlIGxpc3Qgb2YgYXJyYXkgY29udGVudHNcbiAgICBmb3IgKGk9eC5sZW5ndGgtMTtpPjA7aS0tKVxuICAgICAgcys9eFtpXSsnLCc7XG4gICAgcys9eFswXTtcbiAgfVxuICBlbHNlIHsgLy9yZXR1cm4gaXQgaW4gdGhlIGdpdmVuIGJhc2VcbiAgICB3aGlsZSAoIWlzWmVybyhzNikpIHtcbiAgICAgIHQ9ZGl2SW50XyhzNixiYXNlKTsgIC8vdD1zNiAlIGJhc2U7IHM2PWZsb29yKHM2L2Jhc2UpO1xuICAgICAgcz1zdHIuc3Vic3RyaW5nKHQsdCsxKStzO1xuICAgIH1cbiAgfVxuICBpZiAocy5sZW5ndGg9PTApXG4gICAgcz1zdHJbMF07XG4gIHJldHVybiBzO1xufVxuXG4vL3JldHVybnMgYSBkdXBsaWNhdGUgb2YgYmlnSW50IHhcbmZ1bmN0aW9uIGR1cCh4KSB7XG4gIHZhciBpO1xuICBidWZmPW5ldyBBcnJheSh4Lmxlbmd0aCk7XG4gIGNvcHlfKGJ1ZmYseCk7XG4gIHJldHVybiBidWZmO1xufVxuXG4vL2RvIHg9eSBvbiBiaWdJbnRzIHggYW5kIHkuICB4IG11c3QgYmUgYW4gYXJyYXkgYXQgbGVhc3QgYXMgYmlnIGFzIHkgKG5vdCBjb3VudGluZyB0aGUgbGVhZGluZyB6ZXJvcyBpbiB5KS5cbmZ1bmN0aW9uIGNvcHlfKHgseSkge1xuICB2YXIgaTtcbiAgdmFyIGs9eC5sZW5ndGg8eS5sZW5ndGggPyB4Lmxlbmd0aCA6IHkubGVuZ3RoO1xuICBmb3IgKGk9MDtpPGs7aSsrKVxuICAgIHhbaV09eVtpXTtcbiAgZm9yIChpPWs7aTx4Lmxlbmd0aDtpKyspXG4gICAgeFtpXT0wO1xufVxuXG4vL2RvIHg9eSBvbiBiaWdJbnQgeCBhbmQgaW50ZWdlciB5LlxuZnVuY3Rpb24gY29weUludF8oeCxuKSB7XG4gIHZhciBpLGM7XG4gIGZvciAoYz1uLGk9MDtpPHgubGVuZ3RoO2krKykge1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHg9eCtuIHdoZXJlIHggaXMgYSBiaWdJbnQgYW5kIG4gaXMgYW4gaW50ZWdlci5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSByZXN1bHQuXG5mdW5jdGlvbiBhZGRJbnRfKHgsbikge1xuICB2YXIgaSxrLGMsYjtcbiAgeFswXSs9bjtcbiAgaz14Lmxlbmd0aDtcbiAgYz0wO1xuICBmb3IgKGk9MDtpPGs7aSsrKSB7XG4gICAgYys9eFtpXTtcbiAgICBiPTA7XG4gICAgaWYgKGM8MCkge1xuICAgICAgYj0tKGM+PmJwZSk7XG4gICAgICBjKz1iKnJhZGl4O1xuICAgIH1cbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM9KGM+PmJwZSktYjtcbiAgICBpZiAoIWMpIHJldHVybjsgLy9zdG9wIGNhcnJ5aW5nIGFzIHNvb24gYXMgdGhlIGNhcnJ5IGlzIHplcm9cbiAgfVxufVxuXG4vL3JpZ2h0IHNoaWZ0IGJpZ0ludCB4IGJ5IG4gYml0cy4gIDAgPD0gbiA8IGJwZS5cbmZ1bmN0aW9uIHJpZ2h0U2hpZnRfKHgsbikge1xuICB2YXIgaTtcbiAgdmFyIGs9TWF0aC5mbG9vcihuL2JwZSk7XG4gIGlmIChrKSB7XG4gICAgZm9yIChpPTA7aTx4Lmxlbmd0aC1rO2krKykgLy9yaWdodCBzaGlmdCB4IGJ5IGsgZWxlbWVudHNcbiAgICAgIHhbaV09eFtpK2tdO1xuICAgIGZvciAoO2k8eC5sZW5ndGg7aSsrKVxuICAgICAgeFtpXT0wO1xuICAgIG4lPWJwZTtcbiAgfVxuICBmb3IgKGk9MDtpPHgubGVuZ3RoLTE7aSsrKSB7XG4gICAgeFtpXT1tYXNrICYgKCh4W2krMV08PChicGUtbikpIHwgKHhbaV0+Pm4pKTtcbiAgfVxuICB4W2ldPj49bjtcbn1cblxuLy9kbyB4PWZsb29yKHx4fC8yKSpzZ24oeCkgZm9yIGJpZ0ludCB4IGluIDIncyBjb21wbGVtZW50XG5mdW5jdGlvbiBoYWx2ZV8oeCkge1xuICB2YXIgaTtcbiAgZm9yIChpPTA7aTx4Lmxlbmd0aC0xO2krKykge1xuICAgIHhbaV09bWFzayAmICgoeFtpKzFdPDwoYnBlLTEpKSB8ICh4W2ldPj4xKSk7XG4gIH1cbiAgeFtpXT0oeFtpXT4+MSkgfCAoeFtpXSAmIChyYWRpeD4+MSkpOyAgLy9tb3N0IHNpZ25pZmljYW50IGJpdCBzdGF5cyB0aGUgc2FtZVxufVxuXG4vL2xlZnQgc2hpZnQgYmlnSW50IHggYnkgbiBiaXRzLlxuZnVuY3Rpb24gbGVmdFNoaWZ0Xyh4LG4pIHtcbiAgdmFyIGk7XG4gIHZhciBrPU1hdGguZmxvb3Iobi9icGUpO1xuICBpZiAoaykge1xuICAgIGZvciAoaT14Lmxlbmd0aDsgaT49azsgaS0tKSAvL2xlZnQgc2hpZnQgeCBieSBrIGVsZW1lbnRzXG4gICAgICB4W2ldPXhbaS1rXTtcbiAgICBmb3IgKDtpPj0wO2ktLSlcbiAgICAgIHhbaV09MDtcbiAgICBuJT1icGU7XG4gIH1cbiAgaWYgKCFuKVxuICAgIHJldHVybjtcbiAgZm9yIChpPXgubGVuZ3RoLTE7aT4wO2ktLSkge1xuICAgIHhbaV09bWFzayAmICgoeFtpXTw8bikgfCAoeFtpLTFdPj4oYnBlLW4pKSk7XG4gIH1cbiAgeFtpXT1tYXNrICYgKHhbaV08PG4pO1xufVxuXG4vL2RvIHg9eCpuIHdoZXJlIHggaXMgYSBiaWdJbnQgYW5kIG4gaXMgYW4gaW50ZWdlci5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSByZXN1bHQuXG5mdW5jdGlvbiBtdWx0SW50Xyh4LG4pIHtcbiAgdmFyIGksayxjLGI7XG4gIGlmICghbilcbiAgICByZXR1cm47XG4gIGs9eC5sZW5ndGg7XG4gIGM9MDtcbiAgZm9yIChpPTA7aTxrO2krKykge1xuICAgIGMrPXhbaV0qbjtcbiAgICBiPTA7XG4gICAgaWYgKGM8MCkge1xuICAgICAgYj0tKGM+PmJwZSk7XG4gICAgICBjKz1iKnJhZGl4O1xuICAgIH1cbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM9KGM+PmJwZSktYjtcbiAgfVxufVxuXG4vL2RvIHg9Zmxvb3IoeC9uKSBmb3IgYmlnSW50IHggYW5kIGludGVnZXIgbiwgYW5kIHJldHVybiB0aGUgcmVtYWluZGVyXG5mdW5jdGlvbiBkaXZJbnRfKHgsbikge1xuICB2YXIgaSxyPTAscztcbiAgZm9yIChpPXgubGVuZ3RoLTE7aT49MDtpLS0pIHtcbiAgICBzPXIqcmFkaXgreFtpXTtcbiAgICB4W2ldPU1hdGguZmxvb3Iocy9uKTtcbiAgICByPXMlbjtcbiAgfVxuICByZXR1cm4gcjtcbn1cblxuLy9kbyB0aGUgbGluZWFyIGNvbWJpbmF0aW9uIHg9YSp4K2IqeSBmb3IgYmlnSW50cyB4IGFuZCB5LCBhbmQgaW50ZWdlcnMgYSBhbmQgYi5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSBhbnN3ZXIuXG5mdW5jdGlvbiBsaW5Db21iXyh4LHksYSxiKSB7XG4gIHZhciBpLGMsayxraztcbiAgaz14Lmxlbmd0aDx5Lmxlbmd0aCA/IHgubGVuZ3RoIDogeS5sZW5ndGg7XG4gIGtrPXgubGVuZ3RoO1xuICBmb3IgKGM9MCxpPTA7aTxrO2krKykge1xuICAgIGMrPWEqeFtpXStiKnlbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG4gIGZvciAoaT1rO2k8a2s7aSsrKSB7XG4gICAgYys9YSp4W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHRoZSBsaW5lYXIgY29tYmluYXRpb24geD1hKngrYiooeTw8KHlzKmJwZSkpIGZvciBiaWdJbnRzIHggYW5kIHksIGFuZCBpbnRlZ2VycyBhLCBiIGFuZCB5cy5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSBhbnN3ZXIuXG5mdW5jdGlvbiBsaW5Db21iU2hpZnRfKHgseSxiLHlzKSB7XG4gIHZhciBpLGMsayxraztcbiAgaz14Lmxlbmd0aDx5cyt5Lmxlbmd0aCA/IHgubGVuZ3RoIDogeXMreS5sZW5ndGg7XG4gIGtrPXgubGVuZ3RoO1xuICBmb3IgKGM9MCxpPXlzO2k8aztpKyspIHtcbiAgICBjKz14W2ldK2IqeVtpLXlzXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbiAgZm9yIChpPWs7YyAmJiBpPGtrO2krKykge1xuICAgIGMrPXhbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG59XG5cbi8vZG8geD14Kyh5PDwoeXMqYnBlKSkgZm9yIGJpZ0ludHMgeCBhbmQgeSwgYW5kIGludGVnZXJzIGEsYiBhbmQgeXMuXG4vL3ggbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgYW5zd2VyLlxuZnVuY3Rpb24gYWRkU2hpZnRfKHgseSx5cykge1xuICB2YXIgaSxjLGssa2s7XG4gIGs9eC5sZW5ndGg8eXMreS5sZW5ndGggPyB4Lmxlbmd0aCA6IHlzK3kubGVuZ3RoO1xuICBraz14Lmxlbmd0aDtcbiAgZm9yIChjPTAsaT15cztpPGs7aSsrKSB7XG4gICAgYys9eFtpXSt5W2kteXNdO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxuICBmb3IgKGk9aztjICYmIGk8a2s7aSsrKSB7XG4gICAgYys9eFtpXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbn1cblxuLy9kbyB4PXgtKHk8PCh5cypicGUpKSBmb3IgYmlnSW50cyB4IGFuZCB5LCBhbmQgaW50ZWdlcnMgYSxiIGFuZCB5cy5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSBhbnN3ZXIuXG5mdW5jdGlvbiBzdWJTaGlmdF8oeCx5LHlzKSB7XG4gIHZhciBpLGMsayxraztcbiAgaz14Lmxlbmd0aDx5cyt5Lmxlbmd0aCA/IHgubGVuZ3RoIDogeXMreS5sZW5ndGg7XG4gIGtrPXgubGVuZ3RoO1xuICBmb3IgKGM9MCxpPXlzO2k8aztpKyspIHtcbiAgICBjKz14W2ldLXlbaS15c107XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG4gIGZvciAoaT1rO2MgJiYgaTxraztpKyspIHtcbiAgICBjKz14W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHg9eC15IGZvciBiaWdJbnRzIHggYW5kIHkuXG4vL3ggbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgYW5zd2VyLlxuLy9uZWdhdGl2ZSBhbnN3ZXJzIHdpbGwgYmUgMnMgY29tcGxlbWVudFxuZnVuY3Rpb24gc3ViXyh4LHkpIHtcbiAgdmFyIGksYyxrLGtrO1xuICBrPXgubGVuZ3RoPHkubGVuZ3RoID8geC5sZW5ndGggOiB5Lmxlbmd0aDtcbiAgZm9yIChjPTAsaT0wO2k8aztpKyspIHtcbiAgICBjKz14W2ldLXlbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG4gIGZvciAoaT1rO2MgJiYgaTx4Lmxlbmd0aDtpKyspIHtcbiAgICBjKz14W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHg9eCt5IGZvciBiaWdJbnRzIHggYW5kIHkuXG4vL3ggbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgYW5zd2VyLlxuZnVuY3Rpb24gYWRkXyh4LHkpIHtcbiAgdmFyIGksYyxrLGtrO1xuICBrPXgubGVuZ3RoPHkubGVuZ3RoID8geC5sZW5ndGggOiB5Lmxlbmd0aDtcbiAgZm9yIChjPTAsaT0wO2k8aztpKyspIHtcbiAgICBjKz14W2ldK3lbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG4gIGZvciAoaT1rO2MgJiYgaTx4Lmxlbmd0aDtpKyspIHtcbiAgICBjKz14W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHg9eCp5IGZvciBiaWdJbnRzIHggYW5kIHkuICBUaGlzIGlzIGZhc3RlciB3aGVuIHk8eC5cbmZ1bmN0aW9uIG11bHRfKHgseSkge1xuICB2YXIgaTtcbiAgaWYgKHNzLmxlbmd0aCE9Mip4Lmxlbmd0aClcbiAgICBzcz1uZXcgQXJyYXkoMip4Lmxlbmd0aCk7XG4gIGNvcHlJbnRfKHNzLDApO1xuICBmb3IgKGk9MDtpPHkubGVuZ3RoO2krKylcbiAgICBpZiAoeVtpXSlcbiAgICAgIGxpbkNvbWJTaGlmdF8oc3MseCx5W2ldLGkpOyAgIC8vc3M9MSpzcyt5W2ldKih4PDwoaSpicGUpKVxuICBjb3B5Xyh4LHNzKTtcbn1cblxuLy9kbyB4PXggbW9kIG4gZm9yIGJpZ0ludHMgeCBhbmQgbi5cbmZ1bmN0aW9uIG1vZF8oeCxuKSB7XG4gIGlmIChzNC5sZW5ndGghPXgubGVuZ3RoKVxuICAgIHM0PWR1cCh4KTtcbiAgZWxzZVxuICAgIGNvcHlfKHM0LHgpO1xuICBpZiAoczUubGVuZ3RoIT14Lmxlbmd0aClcbiAgICBzNT1kdXAoeCk7XG4gIGRpdmlkZV8oczQsbixzNSx4KTsgIC8veCA9IHJlbWFpbmRlciBvZiBzNCAvIG5cbn1cblxuLy9kbyB4PXgqeSBtb2QgbiBmb3IgYmlnSW50cyB4LHksbi5cbi8vZm9yIGdyZWF0ZXIgc3BlZWQsIGxldCB5PHguXG5mdW5jdGlvbiBtdWx0TW9kXyh4LHksbikge1xuICB2YXIgaTtcbiAgaWYgKHMwLmxlbmd0aCE9Mip4Lmxlbmd0aClcbiAgICBzMD1uZXcgQXJyYXkoMip4Lmxlbmd0aCk7XG4gIGNvcHlJbnRfKHMwLDApO1xuICBmb3IgKGk9MDtpPHkubGVuZ3RoO2krKylcbiAgICBpZiAoeVtpXSlcbiAgICAgIGxpbkNvbWJTaGlmdF8oczAseCx5W2ldLGkpOyAgIC8vczA9MSpzMCt5W2ldKih4PDwoaSpicGUpKVxuICBtb2RfKHMwLG4pO1xuICBjb3B5Xyh4LHMwKTtcbn1cblxuLy9kbyB4PXgqeCBtb2QgbiBmb3IgYmlnSW50cyB4LG4uXG5mdW5jdGlvbiBzcXVhcmVNb2RfKHgsbikge1xuICB2YXIgaSxqLGQsYyxreCxrbixrO1xuICBmb3IgKGt4PXgubGVuZ3RoOyBreD4wICYmICF4W2t4LTFdOyBreC0tKTsgIC8vaWdub3JlIGxlYWRpbmcgemVyb3MgaW4geFxuICBrPWt4Pm4ubGVuZ3RoID8gMipreCA6IDIqbi5sZW5ndGg7IC8vaz0jIGVsZW1lbnRzIGluIHRoZSBwcm9kdWN0LCB3aGljaCBpcyB0d2ljZSB0aGUgZWxlbWVudHMgaW4gdGhlIGxhcmdlciBvZiB4IGFuZCBuXG4gIGlmIChzMC5sZW5ndGghPWspXG4gICAgczA9bmV3IEFycmF5KGspO1xuICBjb3B5SW50XyhzMCwwKTtcbiAgZm9yIChpPTA7aTxreDtpKyspIHtcbiAgICBjPXMwWzIqaV0reFtpXSp4W2ldO1xuICAgIHMwWzIqaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgICBmb3IgKGo9aSsxO2o8a3g7aisrKSB7XG4gICAgICBjPXMwW2kral0rMip4W2ldKnhbal0rYztcbiAgICAgIHMwW2kral09KGMgJiBtYXNrKTtcbiAgICAgIGM+Pj1icGU7XG4gICAgfVxuICAgIHMwW2kra3hdPWM7XG4gIH1cbiAgbW9kXyhzMCxuKTtcbiAgY29weV8oeCxzMCk7XG59XG5cbi8vcmV0dXJuIHggd2l0aCBleGFjdGx5IGsgbGVhZGluZyB6ZXJvIGVsZW1lbnRzXG5mdW5jdGlvbiB0cmltKHgsaykge1xuICB2YXIgaSx5O1xuICBmb3IgKGk9eC5sZW5ndGg7IGk+MCAmJiAheFtpLTFdOyBpLS0pO1xuICB5PW5ldyBBcnJheShpK2spO1xuICBjb3B5Xyh5LHgpO1xuICByZXR1cm4geTtcbn1cblxuLy9kbyB4PXgqKnkgbW9kIG4sIHdoZXJlIHgseSxuIGFyZSBiaWdJbnRzIGFuZCAqKiBpcyBleHBvbmVudGlhdGlvbi4gIDAqKjA9MS5cbi8vdGhpcyBpcyBmYXN0ZXIgd2hlbiBuIGlzIG9kZC4gIHggdXN1YWxseSBuZWVkcyB0byBoYXZlIGFzIG1hbnkgZWxlbWVudHMgYXMgbi5cbmZ1bmN0aW9uIHBvd01vZF8oeCx5LG4pIHtcbiAgdmFyIGsxLGsyLGtuLG5wO1xuICBpZihzNy5sZW5ndGghPW4ubGVuZ3RoKVxuICAgIHM3PWR1cChuKTtcblxuICAvL2ZvciBldmVuIG1vZHVsdXMsIHVzZSBhIHNpbXBsZSBzcXVhcmUtYW5kLW11bHRpcGx5IGFsZ29yaXRobSxcbiAgLy9yYXRoZXIgdGhhbiB1c2luZyB0aGUgbW9yZSBjb21wbGV4IE1vbnRnb21lcnkgYWxnb3JpdGhtLlxuICBpZiAoKG5bMF0mMSk9PTApIHtcbiAgICBjb3B5XyhzNyx4KTtcbiAgICBjb3B5SW50Xyh4LDEpO1xuICAgIHdoaWxlKCFlcXVhbHNJbnQoeSwwKSkge1xuICAgICAgaWYgKHlbMF0mMSlcbiAgICAgICAgbXVsdE1vZF8oeCxzNyxuKTtcbiAgICAgIGRpdkludF8oeSwyKTtcbiAgICAgIHNxdWFyZU1vZF8oczcsbik7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vY2FsY3VsYXRlIG5wIGZyb20gbiBmb3IgdGhlIE1vbnRnb21lcnkgbXVsdGlwbGljYXRpb25zXG4gIGNvcHlJbnRfKHM3LDApO1xuICBmb3IgKGtuPW4ubGVuZ3RoO2tuPjAgJiYgIW5ba24tMV07a24tLSk7XG4gIG5wPXJhZGl4LWludmVyc2VNb2RJbnQobW9kSW50KG4scmFkaXgpLHJhZGl4KTtcbiAgczdba25dPTE7XG4gIG11bHRNb2RfKHggLHM3LG4pOyAgIC8vIHggPSB4ICogMioqKGtuKmJwKSBtb2QgblxuXG4gIGlmIChzMy5sZW5ndGghPXgubGVuZ3RoKVxuICAgIHMzPWR1cCh4KTtcbiAgZWxzZVxuICAgIGNvcHlfKHMzLHgpO1xuXG4gIGZvciAoazE9eS5sZW5ndGgtMTtrMT4wICYgIXlbazFdOyBrMS0tKTsgIC8vazE9Zmlyc3Qgbm9uemVybyBlbGVtZW50IG9mIHlcbiAgaWYgKHlbazFdPT0wKSB7ICAvL2FueXRoaW5nIHRvIHRoZSAwdGggcG93ZXIgaXMgMVxuICAgIGNvcHlJbnRfKHgsMSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAoazI9MTw8KGJwZS0xKTtrMiAmJiAhKHlbazFdICYgazIpOyBrMj4+PTEpOyAgLy9rMj1wb3NpdGlvbiBvZiBmaXJzdCAxIGJpdCBpbiB5W2sxXVxuICBmb3IgKDs7KSB7XG4gICAgaWYgKCEoazI+Pj0xKSkgeyAgLy9sb29rIGF0IG5leHQgYml0IG9mIHlcbiAgICAgIGsxLS07XG4gICAgICBpZiAoazE8MCkge1xuICAgICAgICBtb250Xyh4LG9uZSxuLG5wKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgazI9MTw8KGJwZS0xKTtcbiAgICB9XG4gICAgbW9udF8oeCx4LG4sbnApO1xuXG4gICAgaWYgKGsyICYgeVtrMV0pIC8vaWYgbmV4dCBiaXQgaXMgYSAxXG4gICAgICBtb250Xyh4LHMzLG4sbnApO1xuICB9XG59XG5cblxuLy9kbyB4PXgqeSpSaSBtb2QgbiBmb3IgYmlnSW50cyB4LHksbixcbi8vICB3aGVyZSBSaSA9IDIqKigta24qYnBlKSBtb2QgbiwgYW5kIGtuIGlzIHRoZVxuLy8gIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgbiBhcnJheSwgbm90XG4vLyAgY291bnRpbmcgbGVhZGluZyB6ZXJvcy5cbi8veCBhcnJheSBtdXN0IGhhdmUgYXQgbGVhc3QgYXMgbWFueSBlbGVtbnRzIGFzIHRoZSBuIGFycmF5XG4vL0l0J3MgT0sgaWYgeCBhbmQgeSBhcmUgdGhlIHNhbWUgdmFyaWFibGUuXG4vL211c3QgaGF2ZTpcbi8vICB4LHkgPCBuXG4vLyAgbiBpcyBvZGRcbi8vICBucCA9IC0obl4oLTEpKSBtb2QgcmFkaXhcbmZ1bmN0aW9uIG1vbnRfKHgseSxuLG5wKSB7XG4gIHZhciBpLGosYyx1aSx0LGtzO1xuICB2YXIga249bi5sZW5ndGg7XG4gIHZhciBreT15Lmxlbmd0aDtcblxuICBpZiAoc2EubGVuZ3RoIT1rbilcbiAgICBzYT1uZXcgQXJyYXkoa24pO1xuXG4gIGNvcHlJbnRfKHNhLDApO1xuXG4gIGZvciAoO2tuPjAgJiYgbltrbi0xXT09MDtrbi0tKTsgLy9pZ25vcmUgbGVhZGluZyB6ZXJvcyBvZiBuXG4gIGZvciAoO2t5PjAgJiYgeVtreS0xXT09MDtreS0tKTsgLy9pZ25vcmUgbGVhZGluZyB6ZXJvcyBvZiB5XG4gIGtzPXNhLmxlbmd0aC0xOyAvL3NhIHdpbGwgbmV2ZXIgaGF2ZSBtb3JlIHRoYW4gdGhpcyBtYW55IG5vbnplcm8gZWxlbWVudHMuXG5cbiAgLy90aGUgZm9sbG93aW5nIGxvb3AgY29uc3VtZXMgOTUlIG9mIHRoZSBydW50aW1lIGZvciByYW5kVHJ1ZVByaW1lXygpIGFuZCBwb3dNb2RfKCkgZm9yIGxhcmdlIG51bWJlcnNcbiAgZm9yIChpPTA7IGk8a247IGkrKykge1xuICAgIHQ9c2FbMF0reFtpXSp5WzBdO1xuICAgIHVpPSgodCAmIG1hc2spICogbnApICYgbWFzazsgIC8vdGhlIGlubmVyIFwiJiBtYXNrXCIgd2FzIG5lZWRlZCBvbiBTYWZhcmkgKGJ1dCBub3QgTVNJRSkgYXQgb25lIHRpbWVcbiAgICBjPSh0K3VpKm5bMF0pID4+IGJwZTtcbiAgICB0PXhbaV07XG5cbiAgICAvL2RvIHNhPShzYSt4W2ldKnkrdWkqbikvYiAgIHdoZXJlIGI9MioqYnBlLiAgTG9vcCBpcyB1bnJvbGxlZCA1LWZvbGQgZm9yIHNwZWVkXG4gICAgaj0xO1xuICAgIGZvciAoO2o8a3ktNDspIHsgYys9c2Fbal0rdWkqbltqXSt0Knlbal07ICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgIGMrPXNhW2pdK3VpKm5bal0rdCp5W2pdOyAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICBjKz1zYVtqXSt1aSpuW2pdK3QqeVtqXTsgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgYys9c2Fbal0rdWkqbltqXSt0Knlbal07ICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgIGMrPXNhW2pdK3VpKm5bal0rdCp5W2pdOyAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7IH1cbiAgICBmb3IgKDtqPGt5OykgICB7IGMrPXNhW2pdK3VpKm5bal0rdCp5W2pdOyAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7IH1cbiAgICBmb3IgKDtqPGtuLTQ7KSB7IGMrPXNhW2pdK3VpKm5bal07ICAgICAgICAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICBjKz1zYVtqXSt1aSpuW2pdOyAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgYys9c2Fbal0rdWkqbltqXTsgICAgICAgICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgIGMrPXNhW2pdK3VpKm5bal07ICAgICAgICAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICBjKz1zYVtqXSt1aSpuW2pdOyAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrOyB9XG4gICAgZm9yICg7ajxrbjspICAgeyBjKz1zYVtqXSt1aSpuW2pdOyAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrOyB9XG4gICAgZm9yICg7ajxrczspICAgeyBjKz1zYVtqXTsgICAgICAgICAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrOyB9XG4gICAgc2Fbai0xXT1jICYgbWFzaztcbiAgfVxuXG4gIGlmICghZ3JlYXRlcihuLHNhKSlcbiAgICBzdWJfKHNhLG4pO1xuICBjb3B5Xyh4LHNhKTtcbn1cblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICd1bmRlZmluZWQnKSB7XG5cdG1vZHVsZSA9IHt9O1xufVxuQmlnSW50ID0gbW9kdWxlLmV4cG9ydHMgPSB7XG5cdCdhZGQnOiBhZGQsICdhZGRJbnQnOiBhZGRJbnQsICdiaWdJbnQyc3RyJzogYmlnSW50MnN0ciwgJ2JpdFNpemUnOiBiaXRTaXplLFxuXHQnZHVwJzogZHVwLCAnZXF1YWxzJzogZXF1YWxzLCAnZXF1YWxzSW50JzogZXF1YWxzSW50LCAnZXhwYW5kJzogZXhwYW5kLFxuXHQnZmluZFByaW1lcyc6IGZpbmRQcmltZXMsICdHQ0QnOiBHQ0QsICdncmVhdGVyJzogZ3JlYXRlcixcblx0J2dyZWF0ZXJTaGlmdCc6IGdyZWF0ZXJTaGlmdCwgJ2ludDJiaWdJbnQnOiBpbnQyYmlnSW50LFxuXHQnaW52ZXJzZU1vZCc6IGludmVyc2VNb2QsICdpbnZlcnNlTW9kSW50JzogaW52ZXJzZU1vZEludCwgJ2lzWmVybyc6IGlzWmVybyxcblx0J21pbGxlclJhYmluJzogbWlsbGVyUmFiaW4sICdtaWxsZXJSYWJpbkludCc6IG1pbGxlclJhYmluSW50LCAnbW9kJzogbW9kLFxuXHQnbW9kSW50JzogbW9kSW50LCAnbXVsdCc6IG11bHQsICdtdWx0TW9kJzogbXVsdE1vZCwgJ25lZ2F0aXZlJzogbmVnYXRpdmUsXG5cdCdwb3dNb2QnOiBwb3dNb2QsICdyYW5kQmlnSW50JzogcmFuZEJpZ0ludCwgJ3JhbmRUcnVlUHJpbWUnOiByYW5kVHJ1ZVByaW1lLFxuXHQncmFuZFByb2JQcmltZSc6IHJhbmRQcm9iUHJpbWUsICdzdHIyYmlnSW50Jzogc3RyMmJpZ0ludCwgJ3N1Yic6IHN1Yixcblx0J3RyaW0nOiB0cmltLCAnYWRkSW50Xyc6IGFkZEludF8sICdhZGRfJzogYWRkXywgJ2NvcHlfJzogY29weV8sXG5cdCdjb3B5SW50Xyc6IGNvcHlJbnRfLCAnR0NEXyc6IEdDRF8sICdpbnZlcnNlTW9kXyc6IGludmVyc2VNb2RfLCAnbW9kXyc6IG1vZF8sXG5cdCdtdWx0Xyc6IG11bHRfLCAnbXVsdE1vZF8nOiBtdWx0TW9kXywgJ3Bvd01vZF8nOiBwb3dNb2RfLFxuXHQncmFuZEJpZ0ludF8nOiByYW5kQmlnSW50XywgJ3JhbmRUcnVlUHJpbWVfJzogcmFuZFRydWVQcmltZV8sICdzdWJfJzogc3ViXyxcblx0J2FkZFNoaWZ0Xyc6IGFkZFNoaWZ0XywgJ2NhcnJ5Xyc6IGNhcnJ5XywgJ2RpdmlkZV8nOiBkaXZpZGVfLFxuXHQnZGl2SW50Xyc6IGRpdkludF8sICdlR0NEXyc6IGVHQ0RfLCAnaGFsdmVfJzogaGFsdmVfLCAnbGVmdFNoaWZ0Xyc6IGxlZnRTaGlmdF8sXG5cdCdsaW5Db21iXyc6IGxpbkNvbWJfLCAnbGluQ29tYlNoaWZ0Xyc6IGxpbkNvbWJTaGlmdF8sICdtb250Xyc6IG1vbnRfLFxuXHQnbXVsdEludF8nOiBtdWx0SW50XywgJ3JpZ2h0U2hpZnRfJzogcmlnaHRTaGlmdF8sICdzcXVhcmVNb2RfJzogc3F1YXJlTW9kXyxcblx0J3N1YlNoaWZ0Xyc6IHN1YlNoaWZ0XywgJ3Bvd01vZF8nOiBwb3dNb2RfLCAnZUdDRF8nOiBlR0NEXyxcblx0J2ludmVyc2VNb2RfJzogaW52ZXJzZU1vZF8sICdHQ0RfJzogR0NEXywgJ21vbnRfJzogbW9udF8sICdkaXZpZGVfJzogZGl2aWRlXyxcblx0J3NxdWFyZU1vZF8nOiBzcXVhcmVNb2RfLCAncmFuZFRydWVQcmltZV8nOiByYW5kVHJ1ZVByaW1lXyxcblx0J21pbGxlclJhYmluJzogbWlsbGVyUmFiaW5cbn07XG5cbn0pKCk7XG4iLCIvKiFcbiAqIE1Kb2luKGlkKVxuICogTVJlcXVlc3RUaWNrZXQoaWQpXG4gKiBNT2ZmZXJUaWNrZXQoaWQsIHRpY2tldCwgcGVlcilcbiAqIE1TdGFtcGVkVGlja2V0KGlkLCB0aWNrZXQsIHBlZXIpXG4gKiBNRXhjaGFuZ2UoaWQsIHBlZXIpXG4gKi9cblxuLyohXG4gKiBcXGJyaWVmIG1lc3NhZ2UgcmVxdWVzdGluZyB0byBqb2luIHRoZSBuZXR3b3JrXG4gKiBcXHBhcmFtIGlkIHRoZSBpZGVudGlmaWVyIG9mIHRoZSBqb2luIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gTUpvaW4oaWQpe1xuICAgIHRoaXMucHJvdG9jb2wgPSAnc3ByYXknO1xuICAgIHRoaXMudHlwZSA9ICdNSm9pbic7XG4gICAgdGhpcy5pZCA9IGlkO1xufTtcbm1vZHVsZS5leHBvcnRzLk1Kb2luID0gTUpvaW47XG5cbi8qIVxuICogXFxicmllZiBtZXNzYWdlIHJlcXVlc3RpbmcgYW4gb2ZmZXIgdGlja2V0XG4gKiBcXHBhcmFtIGlkIHRoZSBpZGVudGlmaWVyIG9mIHRoZSByZXF1ZXN0IG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gTVJlcXVlc3RUaWNrZXQoaWQpe1xuICAgIHRoaXMucHJvdG9jb2wgPSAnc3ByYXknO1xuICAgIHRoaXMudHlwZSA9ICdNUmVxdWVzdFRpY2tldCc7XG4gICAgdGhpcy5pZCA9IGlkO1xufTtcbm1vZHVsZS5leHBvcnRzLk1SZXF1ZXN0VGlja2V0ID0gTVJlcXVlc3RUaWNrZXQ7XG5cbi8qIVxuICogXFxicmllZiBhbiBvZmZlciB0aWNrZXQgY29udGFpbmluZyB0aGUgZmlyc3QgcGFydCBvZiB0aGUgd2VicnRjIGNvbm5lY3Rpb25cbiAqIGVzdGFibGlzaG1lbnRcbiAqIFxccGFyYW0gaWQgdGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSByZXF1ZXN0IG1lc3NhZ2VcbiAqIFxccGFyYW0gdGlja2V0IHRoZSBmaXJzdCBzdGVwIG9mIHRoZSBjb25uZWN0aW9uIGVzdGFibGlzaGVtZW50IGRhdGFcbiAqIFxccGFyYW0gcGVlciB0aGUgcGVlciB0aGF0IGVtaXQgdGhlIG9mZmVyIHRpY2tldFxuICovXG5mdW5jdGlvbiBNT2ZmZXJUaWNrZXQoaWQsIHRpY2tldCwgcGVlcil7XG4gICAgdGhpcy5wcm90b2NvbCA9ICdzcHJheSc7XG4gICAgdGhpcy50eXBlID0gJ01PZmZlclRpY2tldCc7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMudGlja2V0ID0gdGlja2V0O1xuICAgIHRoaXMucGVlciA9IHBlZXI7XG59O1xubW9kdWxlLmV4cG9ydHMuTU9mZmVyVGlja2V0ID0gTU9mZmVyVGlja2V0O1xuXG4vKiFcbiAqIFxcYnJpZWYgYW4gc3RhbXBlZCB0aWNrZXQgY29udGFpbmluZyB0aGUgc2Vjb25kIHBhcnQgb2YgdGhlIHdlYnJ0YyBjb25uZWN0aW9uXG4gKiBlc3RhYmxpc2hlbWVudFxuICogXFxwYXJhbSBpZCB0aGUgdW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIHJlcXVlc3QgdGlja2V0XG4gKiBcXHBhcmFtIHRpY2tldCB0aGUgc2Vjb25kIHN0ZXAgb2YgdGhlIGNvbm5lY3Rpb24gZXN0YWJsaXNoZW1lbnQgZGF0YVxuICogXFxwYXJhbSBwZWVyIHRoZSBwZWVyIHRoYXQgZW1pdCB0aGUgc3RhbXBlZCB0aWNrZXRcbiAqL1xuZnVuY3Rpb24gTVN0YW1wZWRUaWNrZXQoaWQsIHRpY2tldCwgcGVlcil7XG4gICAgdGhpcy5wcm90b2NvbCA9ICdzcHJheSc7XG4gICAgdGhpcy50eXBlID0gJ01TdGFtcGVkVGlja2V0JztcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy50aWNrZXQgPSB0aWNrZXQ7XG4gICAgdGhpcy5wZWVyID0gcGVlcjtcbn07XG5tb2R1bGUuZXhwb3J0cy5NU3RhbXBlZFRpY2tldCA9IE1TdGFtcGVkVGlja2V0O1xuXG4vKiFcbiAqIFxcYnJpZWYgbWVzc2FnZSByZXF1ZXN0aW5nIGFuIGV4Y2hhbmdlIG9mIG5laWdoYm9yaG9vZFxuICogXFxwYXJhbSBpZCB0aGUgaWRlbnRpZmllciBvZiB0aGUgcmVxdWVzdCBtZXNzYWdlXG4gKiBcXHBhcmFtIHBlZXIgdGhlIGlkZW50aXR5IG9mIHRoZSBpbml0aWF0b3Igb2YgdGhlIGV4Y2hhbmdlXG4gKi9cbmZ1bmN0aW9uIE1FeGNoYW5nZShpZCwgcGVlcil7XG4gICAgdGhpcy5wcm90b2NvbCA9ICdzcHJheSc7XG4gICAgdGhpcy50eXBlID0gJ01FeGNoYW5nZSc7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMucGVlciA9IHBlZXI7XG59O1xubW9kdWxlLmV4cG9ydHMuTUV4Y2hhbmdlID0gTUV4Y2hhbmdlO1xuIiwidmFyIFNvcnRlZEFycmF5ID0gcmVxdWlyZShcInNvcnRlZC1jbXAtYXJyYXlcIik7XG5cbi8qIVxuICogXFxicmllZiBjb21wYXJhdG9yXG4gKiBcXHBhcmFtIGEgdGhlIGZpcnN0IG9iamVjdCBpbmNsdWRpbmcgYW4gJ2FnZScgcHJvcGVydHlcbiAqIFxccGFyYW0gYiB0aGUgc2Vjb25kIG9iamVjdCBpbmNsdWRpbmcgYW4gJ2FnZScgcHJvcGVydHlcbiAqIFxccmV0dXJuIDEgaWYgYS5hZ2UgPiBiLmFnZSwgLTEgaWYgYS5hZ2UgPCBiLmFnZSwgMCBvdGhlcndpc2VcbiAqL1xuZnVuY3Rpb24gY29tcChhLCBiKXtcbiAgICBpZiAoYS5hZ2UgPCBiLmFnZSl7IHJldHVybiAtMTt9O1xuICAgIGlmIChhLmFnZSA+IGIuYWdlKXsgcmV0dXJuICAxO307XG4gICAgcmV0dXJuIDA7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgc3RydWN0dXJlIGNvbnRhaW5pbmcgdGhlIG5laWdoYm9yaG9vZCBvZiBhIHBlZXIuXG4gKi9cbmZ1bmN0aW9uIFBhcnRpYWxWaWV3KCl7XG4gICAgLy8gIzEgaW5pdGlhbGl6ZSB0aGUgcGFydGlhbCB2aWV3IGFzIGFuIGFycmF5IHNvcnRlZCBieSBhZ2VcbiAgICB0aGlzLmFycmF5ID0gbmV3IFNvcnRlZEFycmF5KGNvbXApO1xufTtcblxuLyohXG4gKiBcXHJldHVybiB0aGUgb2xkZXN0IHBlZXIgaW4gdGhlIGFycmF5XG4gKi9cblBhcnRpYWxWaWV3LnByb3RvdHlwZS5nZXRPbGRlc3QgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGlzLmFycmF5LmFyclswXTtcbn07XG5cbi8qIVxuICogXFxicmllZiBpbmNyZW1lbnQgdGhlIGFnZSBvZiB0aGUgd2hvbGUgcGFydGlhbCB2aWV3XG4gKi9cblBhcnRpYWxWaWV3LnByb3RvdHlwZS5pbmNyZW1lbnRBZ2UgPSBmdW5jdGlvbigpe1xuICAgIGZvciAodmFyIGk9MDsgaTx0aGlzLmFycmF5LmFyci5sZW5ndGg7ICsraSl7XG4gICAgICAgIHRoaXMuYXJyYXkuYXJyW2ldLmFnZSArPSAxO1xuICAgIH07XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgZ2V0IGEgc2FtcGxlIG9mIHRoZSBwYXJ0aWFsIHRvIHNlbmQgdG8gdGhlIG5laWdoYm9yXG4gKiBcXHBhcmFtIG5laWdoYm9yIHRoZSBuZWlnaGJvciB3aGljaCBwZXJmb3JtcyB0aGUgZXhjaGFuZ2Ugd2l0aCB1c1xuICogXFxwYXJhbSBpc0luaXRpYXRvciB3aGV0aGVyIG9yIG5vdCB0aGUgY2FsbGVyIGlzIHRoZSBpbml0aWF0b3Igb2YgdGhlXG4gKiBleGNoYW5nZVxuICogXFxyZXR1cm4gYW4gYXJyYXkgY29udGFpbmluZyBuZWlnaGJvcnMgZnJvbSB0aGlzIHBhcnRpYWwgdmlld1xuICovXG5QYXJ0aWFsVmlldy5wcm90b3R5cGUuZ2V0U2FtcGxlID0gZnVuY3Rpb24obmVpZ2hib3IsIGlzSW5pdGlhdG9yKXtcbiAgICB2YXIgc2FtcGxlID0gW107XG4gICAgLy8gIzEgY29weSB0aGUgcGFydGlhbCB2aWV3XG4gICAgdmFyIGNsb25lID0gbmV3IFNvcnRlZEFycmF5KGNvbXApO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hcnJheS5hcnIubGVuZ3RoOyArK2kpe1xuICAgICAgICBjbG9uZS5hcnIucHVzaCh0aGlzLmFycmF5LmFycltpXSk7XG4gICAgfTtcblxuICAgIC8vICMyIHByb2Nlc3MgdGhlIHNpemUgb2YgdGhlIHNhbXBsZVxuICAgIHZhciBzYW1wbGVTaXplID0gTWF0aC5jZWlsKHRoaXMuYXJyYXkuYXJyLmxlbmd0aC8yKTtcbiAgICBcbiAgICBpZiAoaXNJbml0aWF0b3Ipe1xuICAgICAgICAvLyAjQSByZW1vdmUgYW4gb2NjdXJyZW5jZSBvZiB0aGUgY2hvc2VuIG5laWdoYm9yXG4gICAgICAgIHZhciBpbmRleCA9IGNsb25lLmluZGV4T2YobmVpZ2hib3IpO1xuICAgICAgICBzYW1wbGUucHVzaChjbG9uZS5hcnJbaW5kZXhdKTsgXG4gICAgICAgIGNsb25lLmFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH07XG4gICAgXG4gICAgLy8gIzMgcmFuZG9tbHkgYWRkIG5laWdoYm9ycyB0byB0aGUgc2FtcGxlXG4gICAgd2hpbGUgKHNhbXBsZS5sZW5ndGggPCBzYW1wbGVTaXplKXtcbiAgICAgICAgdmFyIHJuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmNsb25lLmFyci5sZW5ndGgpO1xuICAgICAgICBzYW1wbGUucHVzaChjbG9uZS5hcnJbcm5dKTtcbiAgICAgICAgY2xvbmUuYXJyLnNwbGljZShybiwgMSk7XG4gICAgfTtcbiAgICBcbiAgICByZXR1cm4gc2FtcGxlO1xufTtcblxuXG5cbi8qIVxuICogXFxicmllZiByZXBsYWNlIHRoZSBvY2N1cnJlbmNlcyBvZiB0aGUgb2xkIHBlZXIgYnkgdGhlIGZyZXNoIG9uZVxuICogXFxwYXJhbSBzYW1wbGUgdGhlIHNhbXBsZSB0byBtb2RpZnlcbiAqIFxccGFyYW0gb2xkIHRoZSBvbGQgcmVmZXJlbmNlIHRvIHJlcGxhY2VcbiAqIFxccGFyYW0gZnJlc2ggdGhlIG5ldyByZWZlcmVuY2UgdG8gaW5zZXJ0XG4gKiBcXHJldHVybiBhbiBhcnJheSB3aXRoIHRoZSByZXBsYWNlZCBvY2N1cmVuY2VzXG4gKi9cblBhcnRpYWxWaWV3LnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24oc2FtcGxlLCBvbGQsIGZyZXNoKXtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzYW1wbGUubGVuZ3RoOyArK2kpe1xuICAgICAgICBpZiAoc2FtcGxlW2ldLmlkID09PSBvbGQuaWQpe1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goZnJlc2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goc2FtcGxlW2ldKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgYWRkIHRoZSBuZWlnYmhvciB0byB0aGUgcGFydGlhbCB2aWV3IHdpdGggYW4gYWdlIG9mIDBcbiAqIFxccGFyYW0gcGVlciB0aGUgcGVlciB0byBhZGQgdG8gdGhlIHBhcnRpYWwgdmlld1xuICovXG5QYXJ0aWFsVmlldy5wcm90b3R5cGUuYWRkTmVpZ2hib3IgPSBmdW5jdGlvbihwZWVyKXtcbiAgICBwZWVyLmFnZSA9IDA7XG4gICAgdGhpcy5hcnJheS5hcnIucHVzaChwZWVyKTtcbn07XG5cblxuLyohXG4gKiBcXGJyaWVmIGdldCB0aGUgaW5kZXggb2YgdGhlIHBlZXIgaW4gdGhlIHBhcnRpYWx2aWV3XG4gKiBcXHJldHVybiB0aGUgaW5kZXggb2YgdGhlIHBlZXIgaW4gdGhlIGFycmF5LCAtMSBpZiBub3QgZm91bmRcbiAqL1xuUGFydGlhbFZpZXcucHJvdG90eXBlLmdldEluZGV4ID0gZnVuY3Rpb24ocGVlcil7XG4gICAgdmFyIGkgPSAwLFxuICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICBmb3VuZCA9IGZhbHNlO1xuICAgIHdoaWxlICghZm91bmQgJiYgaSA8IHRoaXMuYXJyYXkuYXJyLmxlbmd0aCl7XG4gICAgICAgIGlmIChwZWVyLmlkID09PSB0aGlzLmFycmF5LmFycltpXS5pZCl7XG4gICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgIH07XG4gICAgICAgICsraTtcbiAgICB9O1xuICAgIHJldHVybiBpbmRleDtcbn07XG5cbi8qIVxuICogXFxicmllZiByZW1vdmUgdGhlIHBlZXIgZnJvbSB0aGUgcGFydGlhbCB2aWV3XG4gKiBcXHBhcmFtIHBlZXIgdGhlIHBlZXIgdG8gcmVtb3ZlXG4gKiBcXHJldHVybiB0aGUgcmVtb3ZlZCBlbnRyeSBpZiBpdCBleGlzdHMsIG51bGwgb3RoZXJ3aXNlXG4gKi9cblBhcnRpYWxWaWV3LnByb3RvdHlwZS5yZW1vdmVQZWVyID0gZnVuY3Rpb24ocGVlcil7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleChwZWVyKSxcbiAgICAgICAgcmVtb3ZlZEVudHJ5ID0gbnVsbDtcbiAgICBpZiAoaW5kZXggPiAtMSl7XG4gICAgICAgIHJlbW92ZWRFbnRyeSA9IHRoaXMuYXJyYXkuYXJyW2luZGV4XTtcbiAgICAgICAgdGhpcy5hcnJheS5hcnIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuICAgIHJldHVybiByZW1vdmVkRW50cnk7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgcmVtb3ZlIHRoZSBwZWVyIHdpdGggdGhlIGFzc29jaWF0ZWQgYWdlIGZyb20gdGhlIHBhcnRpYWwgdmlld1xuICogXFxwYXJhbSBwZWVyIHRoZSBwZWVyIHRvIHJlbW92ZVxuICogXFxwYXJhbSBhZ2UgdGhlIGFnZSBvZiB0aGUgcGVlciB0byByZW1vdmVcbiAqIFxccmV0dXJuIHRoZSByZW1vdmVkIGVudHJ5IGlmIGl0IGV4aXN0cywgbnVsbCBvdGhlcndpc2VcbiAqL1xuUGFydGlhbFZpZXcucHJvdG90eXBlLnJlbW92ZVBlZXJBZ2UgPSBmdW5jdGlvbihwZWVyLCBhZ2Upe1xuICAgIHZhciBmb3VuZCA9IGZhbHNlLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgcmVtb3ZlZEVudHJ5ID0gbnVsbDtcbiAgICB3aGlsZSghZm91bmQgJiYgaSA8IHRoaXMuYXJyYXkuYXJyLmxlbmd0aCl7XG4gICAgICAgIGlmIChwZWVyLmlkID09PSB0aGlzLmFycmF5LmFycltpXS5pZCAmJiBhZ2UgPT09IHRoaXMuYXJyYXkuYXJyW2ldLmFnZSl7XG4gICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICByZW1vdmVkRW50cnkgPSB0aGlzLmFycmF5LmFycltpXTtcbiAgICAgICAgICAgIHRoaXMuYXJyYXkuYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgKytpO1xuICAgIH07XG4gICAgcmV0dXJuIHJlbW92ZWRFbnRyeTtcbn07XG5cbi8qIVxuICogXFxicmllZiByZW1vdmUgYWxsIG9jY3VycmVuY2VzIG9mIHRoZSBwZWVyIGFuZCByZXR1cm4gdGhlIG51bWJlciBvZiByZW1vdmFsc1xuICogXFxwYXJhbSBwZWVyIHRoZSBwZWVyIHRvIHJlbW92ZVxuICogXFxyZXR1cm4gdGhlIG51bWJlciBvZiBvY2N1cnJlbmNlcyBvZiB0aGUgcmVtb3ZlZCBwZWVyXG4gKi9cblBhcnRpYWxWaWV3LnByb3RvdHlwZS5yZW1vdmVBbGwgPSBmdW5jdGlvbihwZWVyKXtcbiAgICB2YXIgb2NjID0gMCxcbiAgICAgICAgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCB0aGlzLmFycmF5LmFyci5sZW5ndGgpe1xuICAgICAgICBpZiAodGhpcy5hcnJheS5hcnJbaV0uaWQgPT09IHBlZXIuaWQpe1xuICAgICAgICAgICAgdGhpcy5hcnJheS5hcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgb2NjICs9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICArK2k7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gb2NjO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIHJlbW92ZSBhbGwgdGhlIGVsZW1lbnRzIGNvbnRhaW5lZCBpbiB0aGUgc2FtcGxlIGluIGFyZ3VtZW50XG4gKiBcXHBhcmFtIHNhbXBsZSB0aGUgZWxlbWVudHMgdG8gcmVtb3ZlXG4gKi9cblBhcnRpYWxWaWV3LnByb3RvdHlwZS5yZW1vdmVTYW1wbGUgPSBmdW5jdGlvbihzYW1wbGUpe1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2FtcGxlLmxlbmd0aDsgKytpKXtcbiAgICAgICAgdGhpcy5yZW1vdmVQZWVyQWdlKHNhbXBsZVtpXSwgc2FtcGxlW2ldLmFnZSk7XG4gICAgfTtcbn07XG5cbi8qIVxuICogXFxicmllZiBnZXQgdGhlIHNpemUgb2YgdGhlIHBhcnRpYWwgdmlld1xuICogXFxyZXR1cm4gdGhlIHNpemUgb2YgdGhlIHBhcnRpYWwgdmlld1xuICovXG5QYXJ0aWFsVmlldy5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhpcy5hcnJheS5hcnIubGVuZ3RoO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGNoZWNrIGlmIHRoZSBwYXJ0aWFsIHZpZXcgY29udGFpbnMgdGhlIHJlZmVyZW5jZVxuICogXFxwYXJhbSBwZWVyIHRoZSBwZWVyIHRvIGNoZWNrXG4gKiBcXHJldHVybiB0cnVlIGlmIHRoZSBwZWVyIGlzIGluIHRoZSBwYXJ0aWFsIHZpZXcsIGZhbHNlIG90aGVyd2lzZVxuICovXG5QYXJ0aWFsVmlldy5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbihwZWVyKXtcbiAgICByZXR1cm4gdGhpcy5nZXRJbmRleChwZWVyKT49MDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGFydGlhbFZpZXc7XG4iLCJ2YXIgU29ydGVkQXJyYXkgPSByZXF1aXJlKFwic29ydGVkLWNtcC1hcnJheVwiKTtcblxuLyohXG4gKiBcXGJyaWVmIHJlcHJlc2VudCB0aGUgYXJyYXkgY29udGFpbmluZyB0aGUgc29ja2V0cyBhc3NvY2lhdGVkIHdpdGhcbiAqIGEgdW5pcXVlIGlkZW50aWZpZXIgaWRcbiAqL1xuZnVuY3Rpb24gU29ja2V0cygpe1xuICAgIHRoaXMuYXJyYXkgPSBuZXcgU29ydGVkQXJyYXkoXG4gICAgICAgIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgICAgICAgaWYgKGEuaWQgPCBiLmlkKXsgcmV0dXJuIC0xOyB9O1xuICAgICAgICAgICAgaWYgKGEuaWQgPiBiLmlkKXsgcmV0dXJuICAxOyB9O1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICApO1xuICAgIHRoaXMubGFzdENoYW5jZSA9IG51bGw7IC8vIGxhc3QgY2hhbmNlIHNvY2tldC5cbn07XG5cbi8qIVxuICogXFxicmllZiBhZGQgdGhlIHNvY2tldCB3aXRoIGFuIG9iamVjdCBjb250YWluaW5nIGFuIGlkZW50aWZpZXIgXG4gKiBcXHBhcmFtIHNvY2tldCB0aGUgc29ja2V0IHRvIGNvbW11bmljYXRlIHdpdGggcGVlclxuICogXFxwYXJhbSBvYmplY3QgdGhlIG9iamVjdCBjb250YWluaW5nIHRoZSBpZGVudGlmaWVyXG4gKiBcXHJldHVybiB0cnVlIGlmIHRoZSBzb2NrZXQgYXMgYmVlbiBhZGRlZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi8gXG5Tb2NrZXRzLnByb3RvdHlwZS5hZGRTb2NrZXQgPSBmdW5jdGlvbihzb2NrZXQsIG9iamVjdCl7XG4gICAgdmFyIGNvbnRhaW5zID0gdGhpcy5jb250YWlucyhvYmplY3QpO1xuICAgIGlmICghY29udGFpbnMpe1xuICAgICAgICB0aGlzLmFycmF5Lmluc2VydCh7aWQ6b2JqZWN0LmlkLCBzb2NrZXQ6c29ja2V0fSk7XG4gICAgfTtcbiAgICByZXR1cm4gIWNvbnRhaW5zO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIHJlbW92ZSB0aGUgb2JqZWN0IGFuZCBpdHMgYXNzb2NpYXRlZCBzb2NrZXQgZnJvbSB0aGUgYXJyYXlcbiAqIFxccGFyYW0gb2JqZWN0IHRoZSBvYmplY3QgY29udGFpbmluZyB0aGUgaWRlbnRpZmllciB0byByZW1vdmVcbiAqIFxccmV0dXJuIHRoZSBzb2NrZXQgdGFyZ2V0ZWQgYnkgdGhlIHJlbW92YWwsIG51bGwgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAqL1xuU29ja2V0cy5wcm90b3R5cGUucmVtb3ZlU29ja2V0ID0gZnVuY3Rpb24ob2JqZWN0KXtcbiAgICB2YXIgc29ja2V0ID0gdGhpcy5nZXRTb2NrZXQob2JqZWN0KTtcbiAgICBpZiAoc29ja2V0ICE9PSBudWxsKXtcbiAgICAgICAgdGhpcy5hcnJheS5yZW1vdmUob2JqZWN0KTtcbiAgICAgICAgdGhpcy5sYXN0Q2hhbmNlID0gc29ja2V0O1xuICAgIH07XG4gICAgcmV0dXJuIHNvY2tldDtcbn07XG5cbi8qIVxuICogXFxicmllZiBnZXQgdGhlIHNvY2tldCBhdHRhY2hlZCB0byB0aGUgb2JqZWN0IGlkZW50aXR5XG4gKiBcXHBhcmFtIG9iamVjdCB0aGUgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGlkZW50aWZpZXIgdG8gc2VhcmNoXG4gKiBcXHJldHVybiB0aGUgc29ja2V0IGlmIHRoZSBvYmplY3QgZXhpc3RzLCBudWxsIG90aGVyd2lzZVxuICovXG5Tb2NrZXRzLnByb3RvdHlwZS5nZXRTb2NrZXQgPSBmdW5jdGlvbihvYmplY3Qpe1xuICAgIHZhciBpbmRleCA9IHRoaXMuYXJyYXkuaW5kZXhPZihvYmplY3QpLFxuICAgICAgICBzb2NrZXQgPSBudWxsO1xuICAgIGlmIChpbmRleCAhPT0gLTEpe1xuICAgICAgICBzb2NrZXQgPSB0aGlzLmFycmF5LmFycltpbmRleF0uc29ja2V0O1xuICAgIH07XG4gICAgcmV0dXJuIHNvY2tldDtcbn07XG5cbi8qIVxuICogXFxicmllZiBjaGVjayBpZiB0aGVyZSBpcyBhIHNvY2tldCBhc3NvY2lhdGVkIHRvIHRoZSBvYmplY3RcbiAqIFxccGFyYW0gb2JqZWN0IHRoZSBvYmplY3QgY29udGFpbmluZyB0aGUgaWRlbnRpZmllciB0byBjaGVja1xuICogXFxyZXR1cm4gdHJ1ZSBpZiBhIHNvY2tldCBhc3NvY2lhdGVkIHRvIHRoZSBvYmplY3QgZXhpc3RzLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuU29ja2V0cy5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbihvYmplY3Qpe1xuICAgIHJldHVybiAodGhpcy5hcnJheS5pbmRleE9mKG9iamVjdCkgIT09IC0xKTtcbn07XG5cbi8qIVxuICogXFxicmllZiBnZXQgdGhlIGxlbmd0aCBvZiB0aGUgdW5kZXJseWluZyBhcnJheVxuICogXFxyZXR1cm4gdGhlIGxlbmd0aCBvZiB0aGUgYXJyYXlcbiAqL1xuU29ja2V0cy5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhpcy5hcnJheS5hcnIubGVuZ3RoO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTb2NrZXRzO1xuIiwidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbnZhciBTb2NrZXQgPSByZXF1aXJlKCdzaW1wbGUtcGVlcicpO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbnZhciBQYXJ0aWFsVmlldyA9IHJlcXVpcmUoJy4vcGFydGlhbHZpZXcuanMnKTtcbnZhciBTb2NrZXRzID0gcmVxdWlyZSgnLi9zb2NrZXRzLmpzJyk7XG52YXIgR1VJRCA9IHJlcXVpcmUoJy4vZ3VpZC5qcycpO1xuXG52YXIgTWVzc2FnZXMgPSByZXF1aXJlKCcuL21lc3NhZ2VzLmpzJyk7XG52YXIgTUpvaW4gPSBNZXNzYWdlcy5NSm9pbjtcbnZhciBNUmVxdWVzdFRpY2tldCA9IE1lc3NhZ2VzLk1SZXF1ZXN0VGlja2V0O1xudmFyIE1PZmZlclRpY2tldCA9IE1lc3NhZ2VzLk1PZmZlclRpY2tldDtcbnZhciBNU3RhbXBlZFRpY2tldCA9IE1lc3NhZ2VzLk1TdGFtcGVkVGlja2V0O1xudmFyIE1FeGNoYW5nZSA9IE1lc3NhZ2VzLk1FeGNoYW5nZTtcblxudXRpbC5pbmhlcml0cyhTcHJheSwgRXZlbnRFbWl0dGVyKTtcblxuLyohXG4gKiBcXGJyaWVmIEltcGxlbWVudGF0aW9uIG9mIHRoZSByYW5kb20gcGVlciBzYW1wbGluZyBjYWxsZWQgU3ByYXkgb24gdG9wIG9mXG4gKiBzb2NrZXQuaW9cbiAqIFxccGFyYW0gaWQgdGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIG91ciBwZWVyXG4gKiBcXHBhcmFtIG9wdGlvbnMgdGhlIFdlYlJUQyBvcHRpb25zLCBmb3IgbW9yZSBpbmZvcm1hdGlvbnM6IFxuICogXFx1cmwgaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9zaW1wbGUtcGVlclxuICovXG5mdW5jdGlvbiBTcHJheShpZCwgb3B0aW9ucyl7XG4gICAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG4gICAgLy8gI0EgY29uc3RhbnRzXG4gICAgdGhpcy5ERUxUQVRJTUUgPSAob3B0aW9ucyAmJiBvcHRpb25zLmRlbHRhdGltZSkgfHwgMTAwMCAqIDYwICogMjsgLy8gMm1pblxuICAgIHRoaXMuVElNRU9VVCA9IChvcHRpb25zICYmIG9wdGlvbnMudGltZW91dCkgfHwgMTAwMCAqIDYwICogMTsgLy8gMW1pblxuICAgIHRoaXMuSUQgPSAoaWQgJiYgJycraWQrJycpIHx8IEdVSUQoKTtcbiAgICB0aGlzLk9QVElPTlMgPSBvcHRpb25zIHx8IHt9O1xuICAgIFxuICAgIC8vICNCIHByb3RvY29sIHZhcmlhYmxlc1xuICAgIHRoaXMucGFydGlhbFZpZXcgPSBuZXcgUGFydGlhbFZpZXcoKTtcbiAgICB0aGlzLnNvY2tldHMgPSBuZXcgU29ja2V0cygpO1xuICAgIHRoaXMucGVuZGluZyA9IG5ldyBTb2NrZXRzKCk7XG4gICAgdGhpcy5mb3J3YXJkcyA9IG5ldyBTb2NrZXRzKCk7XG4gICAgdGhpcy5zdGF0ZSA9ICdkaXNjb25uZWN0JztcbiAgICBcbiAgICAvLyAjQyB3ZWJydGMgc3BlY2lmaWNzXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmIChzZWxmLnBhcnRpYWxWaWV3Lmxlbmd0aCgpPjApe1xuICAgICAgICAgICAgc2VsZi5leGNoYW5nZSgpO1xuICAgICAgICB9O1xuICAgIH0sIHRoaXMuREVMVEFUSU1FKTtcblxuICAgIC8vICNEIGV2ZW50c1xuICAgIHRoaXMub24oJ3NwcmF5LXJlY2VpdmUnLCBmdW5jdGlvbihzb2NrZXQsIG1lc3NhZ2Upe1xuICAgICAgICBzZWxmLm9uU3ByYXlSZWNlaXZlKHNvY2tldCwgbWVzc2FnZSk7XG4gICAgfSk7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgY2hlY2sgaWYgdGhlIG5ldHdvcmsgaXMgcmVhZHkgYW5kIGNhbGxiYWNrLCBub3RoaW5nIG90aGVyd2lzZVxuICogXFxwYXJhbSBjYWxsYmFjayB0aGUgZnVuY3Rpb24gdG8gY2FsbCBpZiB0aGUgbmV0d29yayBpcyByZWFkeVxuICovXG5TcHJheS5wcm90b3R5cGUucmVhZHkgPSBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgaWYgKHRoaXMucGFydGlhbFZpZXcubGVuZ3RoKCkgPiAwKXsgY2FsbGJhY2soKTsgfTtcbn07XG5cbi8qIVxuICogXFxicmllZiBnZXQgYSBzZXQgb2YgbmVpZ2hib3JzXG4gKiBcXHBhcmFtIGsgdGhlIG51bWJlciBvZiBuZWlnaGJvcnMgcmVxdWVzdGVkXG4gKiBcXHJldHVybiBhIGxpc3Qgb2Ygc29ja2V0c1xuICovXG5TcHJheS5wcm90b3R5cGUuZ2V0UGVlcnMgPSBmdW5jdGlvbihrKXtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgLy8gI0EgY29weSB0aGUgc29ja2V0cyBvZiB0aGUgcGFydGlhbCB2aWV3XG4gICAgdmFyIGNsb25lU29ja2V0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zb2NrZXRzLmxlbmd0aCgpOyArK2kpe1xuICAgICAgICBjbG9uZVNvY2tldHNbaV0gPSB0aGlzLnNvY2tldHMuYXJyYXkuYXJyW2ldO1xuICAgIH07XG4gICAgLy8gI0IgZ2V0IGFzIG11Y2ggbmVpZ2hib3JzIGFzIHBvc3NpYmxlXG4gICAgd2hpbGUgKDAgPCBjbG9uZVNvY2tldHMubGVuZ3RoICYmIHJlc3VsdC5sZW5ndGggPCBrKXtcbiAgICAgICAgdmFyIHJuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmNsb25lU29ja2V0cy5sZW5ndGgpO1xuICAgICAgICByZXN1bHQucHVzaChjbG9uZVNvY2tldHNbcm5dLnNvY2tldCk7XG4gICAgICAgIGNsb25lU29ja2V0cy5zcGxpY2Uocm4sIDEpO1xuICAgIH07XG4gICAgLy8gI0MgbGFzdCBjaGFuY2Ugc29ja2V0XG4gICAgaWYgKGs+MCAmJiByZXN1bHQubGVuZ3RoPT09MCAmJiB0aGlzLnNvY2tldHMubGFzdENoYW5jZSE9PW51bGwpe1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzLnNvY2tldHMubGFzdENoYW5jZSk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuU3ByYXkucHJvdG90eXBlLnVwZGF0ZVN0YXRlID0gZnVuY3Rpb24oKXtcbiAgICBpZiAodGhpcy5wYXJ0aWFsVmlldy5sZW5ndGgoKSA+IDAgJiYgdGhpcy5zdGF0ZSAhPT0gJ2Nvbm5lY3QnKXtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdjb25uZWN0JztcbiAgICAgICAgdGhpcy5lbWl0KCdzdGF0ZWNoYW5nZScsICdjb25uZWN0Jyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhcnRpYWxWaWV3Lmxlbmd0aCgpID09PSAwICYmIHRoaXMucGVuZGluZy5sZW5ndGgoKSA+IDAgJiZcbiAgICAgICAgdGhpcy5zdGF0ZSAhPT0gJ3BhcnRpYWwnKXtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdwYXJ0aWFsJztcbiAgICAgICAgdGhpcy5lbWl0KCdzdGF0ZWNoYW5nZScsICdwYXJ0aWFsJyk7XG4gICAgfTtcbiAgICBpZiAodGhpcy5wYXJ0aWFsVmlldy5sZW5ndGgoKSA9PT0gMCAmJiB0aGlzLnBlbmRpbmcubGVuZ3RoKCkgPT09IDAgJiZcbiAgICAgICAgdGhpcy5zdGF0ZSAhPT0gJ2Rpc2Nvbm5lY3QnKXtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdkaXNjb25uZWN0JztcbiAgICAgICAgdGhpcy5lbWl0KCdzdGF0ZWNoYW5nZScsICdkaXNjb25uZWN0Jyk7XG4gICAgfTtcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBCb290c3RyYXAgdGhlIGZpcnN0IFdlYlJUQyBjb25uZWN0aW9uXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKiFcbiAqIFxcYnJpZWYgdGhlIHZlcnkgZmlyc3QgcGFydCBvZiBhIGNvbm5lY3Rpb24gZXN0YWJsaXNobWVudCB0byBqb2luIHRoZSBuZXR3b3JrLlxuICogVGhpcyBwYXJ0IGNvcnJlc3BvbmRzIHRvIHRoZSBmaXJzdCBwYXJ0IG9mIHRoZSAnb25TdGFtcGVkVGlja2V0UmVxdWVzdCcgb2ZcbiAqIHRoZSBzcHJheSBwcm90b2NvbC5cbiAqIFxccGFyYW0gY2FsbGJhY2sgYSBjYWxsYmFjayBmdW5jdGlvbiB0YWtpbmcgYSAnbWVzc2FnZScgaW4gYXJndW1lbnQgYW5kXG4gKiBjYWxsZWQgd2hlbiB3ZSByZWNlaXZlIHRoZSBkYXRhIGZyb20gdGhlIHN0dW4gc2VydmVyXG4gKi9cblNwcmF5LnByb3RvdHlwZS5sYXVuY2ggPSBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgdmFyIG9wdGlvbnM9dGhpcy5PUFRJT05TOyBvcHRpb25zLmluaXRpYXRvcj10cnVlOyBvcHRpb25zLnRyaWNrbGU9ZmFsc2U7XG4gICAgdmFyIHNvY2tldCA9IG5ldyBTb2NrZXQob3B0aW9ucyksXG4gICAgICAgIGlkID0gR1VJRCgpLFxuICAgICAgICBzZWxmID0gdGhpcztcbiAgICBzb2NrZXQub24oJ3NpZ25hbCcsIGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyBNT2ZmZXJUaWNrZXQoaWQsIGRhdGEsIHtpZDogc2VsZi5JRH0pO1xuICAgICAgICBzZWxmLnBlbmRpbmcuYWRkU29ja2V0KHNvY2tldCwgbWVzc2FnZSk7XG4gICAgICAgIGNhbGxiYWNrKG1lc3NhZ2UpO1xuICAgIH0pO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKHNlbGYucGVuZGluZy5jb250YWlucyh7aWQ6aWR9KSl7XG4gICAgICAgICAgICBzZWxmLnBlbmRpbmcucmVtb3ZlU29ja2V0KHtpZDppZH0pO1xuICAgICAgICAgICAgc29ja2V0LmRlc3Ryb3koKTtcbiAgICAgICAgfTtcbiAgICB9LCB0aGlzLlRJTUVPVVQpO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIHRoZSBzZWNvbmQgcGFydCBvZiB0aGUgY29ubmVjdGlvbiBlc3RhYmxpc2htZW50LiBUaGlzIGZ1bmN0aW9uIGlzXG4gKiBjYWxsZWQgYXQgdGhlIHBlZXIgYWxyZWFkeSBpbnNpZGUgdGhlIG5ldHdvcmsuIEl0IGNvcnJlc3BvbmRzIHRvIHRoZSBmdW5jdGlvblxuICogJ29uVGlja2V0UmVxdWVzdCcgb2YgdGhlIFNwcmF5IHByb3RvY29sXG4gKiBcXHBhcmFtIG1lc3NhZ2UgdGhlIG1lc3NhZ2UgZ2VuZXJhdGVkIGJ5IHRoZSBsYXVuY2ggZnVuY3Rpb24gYXQgdGhlIGpvaW5pbmdcbiAqIHBlZXJcbiAqIFxccGFyYW0gY2FsbGJhY2sgdGhlIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIHdlIHJlY2VpdmUgdGhlIHN0YW1wZWQgdGlja2V0IGZyb21cbiAqIHRoZSBzdHVuIHNlcnZlci4gSXQgaGFzIGEgJ21lc3NhZ2UnIGFyZ3VtZW50LlxuICovXG5TcHJheS5wcm90b3R5cGUuYW5zd2VyID0gZnVuY3Rpb24obWVzc2FnZSwgY2FsbGJhY2spe1xuICAgIHZhciBvcHRpb25zPXRoaXMuT1BUSU9OUzsgb3B0aW9ucy5pbml0aWF0b3I9ZmFsc2U7IG9wdGlvbnMudHJpY2tsZT1mYWxzZTtcbiAgICB2YXIgc29ja2V0ID0gbmV3IFNvY2tldChvcHRpb25zKSxcbiAgICAgICAgaWQgPSBtZXNzYWdlLmlkLFxuICAgICAgICB0aWNrZXQgPSBtZXNzYWdlLnRpY2tldCxcbiAgICAgICAgcGVlciA9IG1lc3NhZ2UucGVlcixcbiAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgc29ja2V0Lm9uKCdzaWduYWwnLCBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgdmFyIHN0YW1wZWRUaWNrZXQgPSBuZXcgTVN0YW1wZWRUaWNrZXQoaWQsIGRhdGEsIHtpZDpzZWxmLklEfSk7XG4gICAgICAgIHNlbGYucGVuZGluZy5hZGRTb2NrZXQoc29ja2V0LCBzdGFtcGVkVGlja2V0KTtcbiAgICAgICAgY2FsbGJhY2soc3RhbXBlZFRpY2tldCk7XG4gICAgfSk7XG4gICAgc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ3dydGM6IHN1Y2Nlc3NmdWwgY29ubmVjdGlvbiBlc3RhYmxpc2htZW50Jyk7XG4gICAgICAgIHNlbGYucGVuZGluZy5yZW1vdmVTb2NrZXQobWVzc2FnZSk7XG4gICAgfSk7XG4gICAgc29ja2V0Lm9uKCdkYXRhJywgZnVuY3Rpb24ocmVjZWl2ZWRNZXNzYWdlKXtcbiAgICAgICAgc2VsZi5yZWNlaXZlKHNvY2tldCwgcmVjZWl2ZWRNZXNzYWdlKTtcbiAgICB9KTtcbiAgICBzb2NrZXQub24oJ3N0cmVhbScsIGZ1bmN0aW9uKHN0cmVhbSl7XG4gICAgICAgIHNlbGYuZW1pdCgnc3RyZWFtJywgc29ja2V0LCBzdHJlYW0pO1xuICAgIH0pO1xuICAgIHNvY2tldC5vbignY2xvc2UnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnd3J0YzogYSBjb25uZWN0aW9uIGhhcyBiZWVuIGNsb3NlZCcpO1xuICAgIH0pO1xuICAgIHNvY2tldC5zaWduYWwodGlja2V0KTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmIChzZWxmLnBlbmRpbmcuY29udGFpbnMoe2lkOmlkfSkpe1xuICAgICAgICAgICAgdmFyIHNvY2tldCA9IHNlbGYucGVuZGluZy5yZW1vdmVTb2NrZXQoe2lkOmlkfSk7XG4gICAgICAgICAgICBzb2NrZXQuZGVzdHJveSgpO1xuICAgICAgICB9O1xuICAgIH0sIHRoaXMuVElNRU9VVCk7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgdGhlIHRoaXJkIHBhcnQgb2YgdGhlIHZlcnkgZmlyc3QgY29ubmVjdGlvbiBlc3RhYmxpc2htZW50IHRvIGpvaW4gdGhlXG4gKiBuZXR3b3JrLiBJdCBjb3JyZXNwb25kcyB0byB0aGUgbGFzdCBwYXJ0IG9mIHRoZSBmdW5jdGlvbiBvZlxuICogJ29uU3RhbXBlZFRpY2tldFJlcXVlc3QnIG9mIHRoZSBTcHJheSBwcm90b2NvbC5cbiAqIFxccGFyYW0gbWVzc2FnZSB0aGUgbWVzc2FnZSBjb250YWluaW5nIHRoZSBzdGFtcGVkIHRpY2tldCBmcm9tIHRoZSBjb250YWN0XG4gKiBwZWVyXG4gKi9cblNwcmF5LnByb3RvdHlwZS5oYW5kc2hha2UgPSBmdW5jdGlvbihtZXNzYWdlKXtcbiAgICB2YXIgc29ja2V0ID0gdGhpcy5wZW5kaW5nLnJlbW92ZVNvY2tldChtZXNzYWdlKSxcbiAgICAgICAgaWQgPSBtZXNzYWdlLmlkLFxuICAgICAgICB0aWNrZXQgPSBtZXNzYWdlLnRpY2tldCxcbiAgICAgICAgcGVlciA9IG1lc3NhZ2UucGVlcixcbiAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ3dydGM6IHN1Y2Nlc3NmdWwgY29ubmVjdGlvbiBlc3RhYmxpc2htZW50Jyk7XG4gICAgICAgIHNlbGYucGFydGlhbFZpZXcuYWRkTmVpZ2hib3IocGVlcik7XG4gICAgICAgIHNlbGYuc29ja2V0cy5hZGRTb2NrZXQoc29ja2V0LCBwZWVyKTtcbiAgICAgICAgc2VsZi5qb2luKHBlZXIpO1xuICAgICAgICBzZWxmLnVwZGF0ZVN0YXRlKCk7XG4gICAgfSk7XG4gICAgc29ja2V0Lm9uKCdkYXRhJywgZnVuY3Rpb24ocmVjZWl2ZWRNZXNzYWdlKXtcbiAgICAgICAgc2VsZi5yZWNlaXZlKHNvY2tldCwgcmVjZWl2ZWRNZXNzYWdlKTtcbiAgICB9KTtcbiAgICBzb2NrZXQub24oJ3N0cmVhbScsIGZ1bmN0aW9uKHN0cmVhbSl7XG4gICAgICAgIHNlbGYuZW1pdCgnc3RyZWFtJywgc29ja2V0LCBzdHJlYW0pO1xuICAgIH0pO1xuICAgIHNvY2tldC5vbignY2xvc2UnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnd3J0YzogYSBjb25uZWN0aW9uIGhhcyBiZWVuIGNsb3NlZCcpO1xuICAgICAgICBzZWxmLnVwZGF0ZVN0YXRlKCk7XG4gICAgfSk7XG4gICAgc29ja2V0LnNpZ25hbCh0aWNrZXQpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogU3ByYXkncyBwcm90b2NvbCBpbXBsZW1lbnRhdGlvblxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyohXG4gKiBcXGJyaWVmIGpvaW4gdGhlIG5ldHdvcmsgdXNpbmcgdGhlIGt3bm9uIGNvbnRhY3QgcGVlciBcbiAqIFxccGFyYW0gY29udGFjdCB0aGUga25vd24gcGVlciB0aGF0IHdpbGwgaW50cm9kdWNlIHVzIHRvIHRoZSBuZXR3b3JrXG4gKi9cblNwcmF5LnByb3RvdHlwZS5qb2luID0gZnVuY3Rpb24oY29udGFjdCl7XG4gICAgLy8gI0EgYXNrIHRvIHRoZSBjb250YWN0IHBlZXIgdG8gYWR2ZXJ0aXNlIHlvdXIgcHJlc2VuY2UgaW4gdGhlIG5ldHdvcmtcbiAgICB2YXIgbWVzc2FnZSA9IG5ldyBNSm9pbihHVUlEKCkpO1xuICAgIHRoaXMuc2VuZChtZXNzYWdlLCBjb250YWN0KTtcbn07XG5cbi8qIVxuICogXFxicmllZiBldmVudCBleGVjdXRlciB3aGVuIFwidGhpc1wiIHJlY2VpdmVzIGEgam9pbiBtZXNzYWdlXG4gKiBcXHBhcmFtIGlkIHRoZSBpZGVudGlmaWVyIG9mIHRoZSByZXF1ZXN0XG4gKi9cblNwcmF5LnByb3RvdHlwZS5vbkpvaW4gPSBmdW5jdGlvbihpZCl7XG4gICAgLy8gI0EgaWYgaXQgaXMgdGhlIHZlcnkgZmlyc3QgY29ubmVjdGlvbiwgZXN0YWJsaXNoIGEgY29ubmVjdGlvbiBmcm9tXG4gICAgLy8gdXMgdG8gdGhlIG5ld2NvbWVyXG4gICAgaWYgKHRoaXMucGFydGlhbFZpZXcubGVuZ3RoKCk9PT0wKXtcbiAgICAgICAgdmFyIG1SZXF1ZXN0VGlja2V0ID0gbmV3IE1SZXF1ZXN0VGlja2V0KEdVSUQoKSk7XG4gICAgICAgIHRoaXMuc2VuZChtUmVxdWVzdFRpY2tldCwge2lkOmlkfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gI0IgaWYgdGhlcmUgaXMgYW4gYWxyZWFkeSBlc3RhYmxpc2hlZCBuZXR3b3JrLCB3ZSByZXF1ZXN0IHRoYXRcbiAgICAgICAgLy8gdGhlIG5ld2NvbWVyIHNlbmRzIHVzIGFuIG9mZmVyIHRpY2tldCBmb3IgZWFjaCBvZiBvdXIgbmVpZ2hib3JzXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJ0aWFsVmlldy5sZW5ndGgoKTsgKytpKXtcbiAgICAgICAgICAgIC8vICMxIGNyZWF0ZSB0aGUgdGlja2V0IHdpdGggYW4gb3JpZ2luYWwgaWRlbnRpZmllclxuICAgICAgICAgICAgdmFyIG1SZXF1ZXN0VGlja2V0ID0gbmV3IE1SZXF1ZXN0VGlja2V0KEdVSUQoKSk7XG4gICAgICAgICAgICAvLyAjMiByZWdpc3RlciB0aGUgZm9yd2FyZGluZyByb3V0ZSBmb3IgdGhlIGFuc3dlcnNcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZHMuYWRkU29ja2V0KFxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0cy5nZXRTb2NrZXQodGhpcy5wYXJ0aWFsVmlldy5hcnJheS5hcnJbaV0pLFxuICAgICAgICAgICAgICAgIG1SZXF1ZXN0VGlja2V0KTtcbiAgICAgICAgICAgIC8vICMzIHNlbmQgdGhlIHJlcXVlc3QgdG8gdGhlIG5ldyBjb21lclxuICAgICAgICAgICAgdGhpcy5zZW5kKG1SZXF1ZXN0VGlja2V0LCB7aWQ6aWR9KTtcbiAgICAgICAgfTtcbiAgICB9O1xufTtcblxuLyohXG4gKiBcXGJyaWVmIHBlcmlvZGljYWxseSBjYWxsZWQgZnVuY3Rpb24gdGhhdCBhaW1zIHRvIGJhbGFuY2UgdGhlIHBhcnRpYWwgdmlld1xuICogYW5kIHRvIG1peCB0aGUgbmVpZ2hib3JzIGluc2lkZSB0aGVtXG4gKi9cblNwcmF5LnByb3RvdHlwZS5leGNoYW5nZSA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBzb2NrZXRPbGRlc3QgPSBudWxsO1xuICAgIC8vICMxIGdldCB0aGUgb2xkZXN0IG5laWdoYm9yIHJlYWNoYWJsZVxuICAgIHdoaWxlICgoc29ja2V0T2xkZXN0PT09bnVsbCkgfHxcbiAgICAgICAgICAgKHNvY2tldE9sZGVzdCE9PW51bGwgJiYgIXNvY2tldE9sZGVzdC5jb25uZWN0ZWQpICYmXG4gICAgICAgICAgIHRoaXMucGFydGlhbFZpZXcubGVuZ3RoKCk+MCl7XG4gICAgICAgIHZhciBvbGRlc3QgPSB0aGlzLnBhcnRpYWxWaWV3LmdldE9sZGVzdCgpO1xuICAgICAgICBzb2NrZXRPbGRlc3QgPSB0aGlzLnNvY2tldHMuZ2V0U29ja2V0KG9sZGVzdCk7XG4gICAgICAgIGlmIChzb2NrZXRPbGRlc3Q9PT1udWxsIHx8XG4gICAgICAgICAgICAoc29ja2V0T2xkZXN0IT09bnVsbCAmJiAhc29ja2V0T2xkZXN0LmNvbm5lY3RlZCkpIHtcbiAgICAgICAgICAgIHRoaXMub25QZWVyRG93bihvbGRlc3QpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgaWYgKHRoaXMucGFydGlhbFZpZXcubGVuZ3RoKCk9PT0wKXtyZXR1cm47fTsgLy8gdWdseSByZXR1cm5cbiAgICAvLyAjMiBub3RpZnkgdGhlIG9sZGVzdCBuZWlnaGJvciB0aGF0IGl0IGlzIHRoZSBjaG9zZW4gb25lXG4gICAgdmFyIG1FeGNoYW5nZSA9IG5ldyBNRXhjaGFuZ2UoR1VJRCgpLCB7aWQ6dGhpcy5JRH0pO1xuICAgIHRoaXMuc2VuZChtRXhjaGFuZ2UsIG9sZGVzdCk7XG4gICAgLy8gIzMgZ2V0IGEgc2FtcGxlIGZyb20gb3VyIHBhcnRpYWwgdmlld1xuICAgIHZhciBzYW1wbGUgPSB0aGlzLnBhcnRpYWxWaWV3LmdldFNhbXBsZShvbGRlc3QsIHRydWUpO1xuICAgIC8vICM0IGFzayB0byB0aGUgbmVpZ2hib3JzIGluIHRoZSBzYW1wbGUgdG8gY3JlYXRlIHRoZSBvZmZlciB0aWNrZXRzIGluXG4gICAgLy8gb3JkZXIgdG8gZm9yd2FyZCB0aGVtIHRvIHRoZSBvbGRlc3QgbmVpZ2hib3JcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNhbXBsZS5sZW5ndGg7ICsraSl7XG4gICAgICAgIGlmIChzYW1wbGVbaV0uaWQgIT09IG9sZGVzdC5pZCl7XG4gICAgICAgICAgICAvLyAjNSBpZiB0aGUgbmVpZ2hib3IgaXMgbm90IHRoZSBvbGRlc3QgbmVpZ2hib3JcbiAgICAgICAgICAgIC8vICM1QSByZWdpc3RlciB0aGUgZm9yd2FyZGluZyBkZXN0aW5hdGlvblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgTVJlcXVlc3RUaWNrZXQoR1VJRCgpKTtcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZHMuYWRkU29ja2V0KHRoaXMuc29ja2V0cy5nZXRTb2NrZXQob2xkZXN0KSxtZXNzYWdlKTtcbiAgICAgICAgICAgIC8vICM1QiBzZW5kIGEgdGlja2V0IHJlcXVlc3QgdG8gdGhlIG5laWdoYm9yIGluIHRoZSBzYW1wbGVcbiAgICAgICAgICAgIHRoaXMuc2VuZChtZXNzYWdlLCBzYW1wbGVbaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gIzYgb3RoZXJ3aXNlLCBjcmVhdGUgYW4gb2ZmZXIgdGlja2V0IG91cnNlbGYgYW5kIHNlbmQgaXQgdG8gdGhlXG4gICAgICAgICAgICAvLyBvbGRlc3QgbmVpZ2Job3JcbiAgICAgICAgICAgIHZhciBpZFRpY2tldCA9IEdVSUQoKTtcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZHMuYWRkU29ja2V0KHRoaXMuc29ja2V0cy5nZXRTb2NrZXQob2xkZXN0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpZDppZFRpY2tldH0pO1xuICAgICAgICAgICAgdGhpcy5vblRpY2tldFJlcXVlc3QoaWRUaWNrZXQpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgLy8gIzcgcmVtb3ZlIHRoZSBzZW50IHNhbXBsZSBmcm9tIG91ciBwYXJ0aWFsIHZpZXdcbiAgICB0aGlzLnBhcnRpYWxWaWV3LnJlbW92ZVNhbXBsZShzYW1wbGUpO1xuICAgIC8vICM4IHJlbW92ZSBmcm9tIHRoZSBzb2NrZXRzIGRpY3Rpb25uYXJ5XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzYW1wbGUubGVuZ3RoOyArK2kpe1xuICAgICAgICAvLyAjOEEgY2hlY2sgaWYgdGhlIHBhcnRpYWwgdmlldyBzdGlsbCBjb250YWlucyByZWZlcmVuY2VzIHRvIHRoZSBzb2NrZXRcbiAgICAgICAgaWYgKCF0aGlzLnBhcnRpYWxWaWV3LmNvbnRhaW5zKHNhbXBsZVtpXSkpe1xuICAgICAgICAgICAgLy8gIzhCIG90aGVyd2lzZSByZW1vdmUgdGhlIHNvY2tldCBmcm9tIHRoZSBkaWN0aW9ubmFyeVxuICAgICAgICAgICAgdmFyIHNvY2tldCA9IHRoaXMuc29ja2V0cy5yZW1vdmVTb2NrZXQoc2FtcGxlW2ldKTtcbiAgICAgICAgICAgIC8vICM4QyBjbG9zZSB0aGUgc29ja2V0IGFmdGVyIGEgd2hpbGVcbiAgICAgICAgICAgIGlmIChzb2NrZXQhPT1udWxsKXtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKHMpe1xuICAgICAgICAgICAgICAgICAgICBzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzLlRJTUVPVVQsIHNvY2tldCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07ICAgIFxufTtcblxuLyohXG4gKiBcXGJyaWVmIGV2ZW50IGV4ZWN1dGVkIHdoZW4gd2UgcmVjZWl2ZSBhbiBleGNoYW5nZSByZXF1ZXN0XG4gKiBcXHBhcmFtIGlkIHRoZSBpZGVudGlmaWVyIG9mIHRoZSByZXF1ZXN0IG1lc3NhZ2VcbiAqIFxccGFyYW0gaW5pdGlhdG9yIHRoZSBwZWVyIHRoYXQgcmVxdWVzdGVkIHRoZSBleGNoYW5nZVxuICovXG5TcHJheS5wcm90b3R5cGUub25FeGNoYW5nZSA9IGZ1bmN0aW9uKGlkLCBpbml0aWF0b3Ipe1xuICAgIC8vICMxIGdldCBhIHNhbXBsZSBvZiBuZWlnaGJvcnMgZnJvbSBvdXIgcGFydGlhbCB2aWV3XG4gICAgdmFyIHNhbXBsZSA9IHRoaXMucGFydGlhbFZpZXcuZ2V0U2FtcGxlKGluaXRpYXRvciwgZmFsc2UpO1xuICAgIC8vICMyIGFzayB0byBlYWNoIG5laWdoYm9yIGluIHRoZSBzYW1wbGUgdG8gY3JlYXRlIGFuIG9mZmVyIHRpY2tldCB0b1xuICAgIC8vIGdpdmUgdG8gdGhlIGluaXRpYXRvciBwZWVyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzYW1wbGUubGVuZ3RoOyArK2kpe1xuICAgICAgICBpZiAoc2FtcGxlW2ldLmlkICE9PSBpbml0aWF0b3IuaWQpe1xuICAgICAgICAgICAgLy8gIzJBIGlmIHRoZSBuZWlnYmhvciBpcyBub3QgdGhlIGluaXRpYXRvciwgcmVxdWVzdCBhbiBvZmZlciB0aWNrZXRcbiAgICAgICAgICAgIC8vIGZyb20gaXRcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbmV3IE1SZXF1ZXN0VGlja2V0KEdVSUQoKSk7XG4gICAgICAgICAgICAvLyAjMkIgcmVnaXN0ZXIgdGhlIGZvcndhcmRpbmcgcm91dGVcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZHMuYWRkU29ja2V0KHRoaXMuZm9yd2FyZHMuZ2V0U29ja2V0KHtpZDppZH0pLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIC8vICMyQyBzZW5kIHRoZSB0aWNrZXQgcmVxdWVzdCB0byB0aGUgbmVpZ2Job3JcbiAgICAgICAgICAgIHRoaXMuc2VuZChtZXNzYWdlLCBzYW1wbGVbaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gIzNBIGlmIHRoZSBuZWlnYmhvciBpcyB0aGUgaW5pdGlhdG9yLCBjcmVhdGUgYW4gb2ZmZXIgdGlja2V0XG4gICAgICAgICAgICAvLyBvdXJzZWxmICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgaWRUaWNrZXQgPSBHVUlEKCk7XG4gICAgICAgICAgICAvLyAjM0IgcmVnaXN0ZXIgdGhlIGZvcndhcmRpbmcgcm91dGUgZm9yIG91ciBvd24gb2ZmZXIgdGlja2V0XG4gICAgICAgICAgICB0aGlzLmZvcndhcmRzLmFkZFNvY2tldCh0aGlzLmZvcndhcmRzLmdldFNvY2tldCh7aWQ6aWR9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpZDppZFRpY2tldH0pO1xuICAgICAgICAgICAgLy8gIzNDIGNyZWF0ZSB0aGUgb2ZmZXIgdGlja2V0IGFuZCBzZW5kIGl0XG4gICAgICAgICAgICB0aGlzLm9uVGlja2V0UmVxdWVzdChpZFRpY2tldCk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvLyAjNCByZW1vdmUgdGhlIHNhbXBsZSBmcm9tIG91ciBwYXJ0aWFsIHZpZXdcbiAgICB0aGlzLnBhcnRpYWxWaWV3LnJlbW92ZVNhbXBsZShzYW1wbGUpO1xuICAgIC8vICM1IHJlbW92ZSB0aGUgc2FtcGxlIGZyb20gdGhlIHNvY2tldHMgZGljdGlvbm5hcnlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNhbXBsZS5sZW5ndGg7ICsraSl7XG4gICAgICAgIC8vICM1QSBjaGVjayBpZiB0aGUgcGFydGlhbCB2aWV3IHN0aWxsIGNvbnRhaW5zIHJlZmVyZW5jZXMgdG8gdGhlIHNvY2tldFxuICAgICAgICBpZiAoIXRoaXMucGFydGlhbFZpZXcuY29udGFpbnMoc2FtcGxlW2ldKSl7XG4gICAgICAgICAgICAvLyAjNUIgb3RoZXJ3aXNlIHJlbW92ZSB0aGUgc29ja2V0IGZyb20gdGhlIGRpY3Rpb25uYXJ5XG4gICAgICAgICAgICB2YXIgc29ja2V0ID0gdGhpcy5zb2NrZXRzLnJlbW92ZVNvY2tldChzYW1wbGVbaV0pXG4gICAgICAgICAgICAvLyAjNUMgY2xvc2UgdGhlIHNvY2tldCBhZnRlciBhIHdoaWxlXG4gICAgICAgICAgICBpZiAoc29ja2V0IT09bnVsbCl7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbihzKXtcbiAgICAgICAgICAgICAgICAgICAgcy5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcy5USU1FT1VULCBzb2NrZXQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xufTtcblxuLyohXG4gKiBcXGJyaWVmIHRoZSBmdW5jdGlvbiBjYWxsZWQgd2hlbiBhIG5laWdoYm9yIGlzIHVucmVhY2hhYmxlIGFuZCBzdXBwb3NlZGx5XG4gKiBjcmFzaGVkL2RlcGFydGVkLiBJdCBwcm9iYWJpbGlzdGljYWxseSBrZWVwcyBhbiBhcmMgdXBcbiAqIFxccGFyYW0gcGVlciB0aGUgcGVlciB0aGF0IGNhbm5vdCBiZSByZWFjaGVkXG4gKi9cblNwcmF5LnByb3RvdHlwZS5vblBlZXJEb3duID0gZnVuY3Rpb24ocGVlcil7XG4gICAgY29uc29sZS5sb2coJ3dydGM6IGEgbmVpZ2hib3IgY3Jhc2hlZC9sZWZ0Jyk7XG4gICAgLy8gI0EgcmVtb3ZlIGFsbCBvY2N1cnJlbmNlcyBvZiB0aGUgcGVlciBpbiB0aGUgcGFydGlhbCB2aWV3XG4gICAgdmFyIG9jYyA9IHRoaXMucGFydGlhbFZpZXcucmVtb3ZlQWxsKHBlZXIpO1xuICAgIHRoaXMuc29ja2V0cy5yZW1vdmVTb2NrZXQocGVlcik7XG4gICAgLy8gI0IgcHJvYmFiaWxpc3RpY2FsbHkgcmVjcmVhdGUgYW4gYXJjIHRvIGEga25vd24gcGVlclxuICAgIGlmICh0aGlzLnBhcnRpYWxWaWV3Lmxlbmd0aCgpID4gMCl7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2NjOyArK2kpe1xuICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPiAoMS8odGhpcy5wYXJ0aWFsVmlldy5sZW5ndGgoKStvY2MpKSl7XG4gICAgICAgICAgICAgICAgdmFyIHJuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMucGFydGlhbFZpZXcubGVuZ3RoKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMucGFydGlhbFZpZXcuYWRkTmVpZ2hib3IodGhpcy5wYXJ0aWFsVmlldy5hcnJheS5hcnJbcm5dKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnd3J0YzogY3JlYXRlIGEgZHVwbGljYXRlJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG4gICAgdGhpcy51cGRhdGVTdGF0ZSgpO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGEgY29ubmVjdGlvbiBmYWlsZWQgdG8gZXN0YWJsaXNoIHByb3Blcmx5LCBzeXN0ZW1hdGljYWxseSBkdXBsaWNhdGVzXG4gKiBhbiBlbGVtZW50IG9mIHRoZSBwYXJ0aWFsIHZpZXcuXG4gKi9cblNwcmF5LnByb3RvdHlwZS5vbkFyY0Rvd24gPSBmdW5jdGlvbigpe1xuICAgIGNvbnNvbGUubG9nKCd3cnRjOiBhbiBhcmMgZGlkIG5vdCBwcm9wZXJseSBlc3RhYmxpc2hlZCcpO1xuICAgIGlmICh0aGlzLnBhcnRpYWxWaWV3Lmxlbmd0aCgpPjApe1xuICAgICAgICB2YXIgcm4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdGhpcy5wYXJ0aWFsVmlldy5sZW5ndGgoKSk7XG4gICAgICAgIHRoaXMucGFydGlhbFZpZXcuYWRkTmVpZ2hib3IodGhpcy5wYXJ0aWFsVmlldy5hcnJheS5hcnJbcm5dKTtcbiAgICB9O1xuICAgIHRoaXMudXBkYXRlU3RhdGUoKTtcbn07XG5cbi8qIVxuICogXFxicmllZiBXZWJSVEMgc3BlY2lmaWMgZXZlbnQuIEEgbmVpZ2hib3Igd2FudHMgdXMgdG8gY29ubmVjdCB0byBhbm90aGVyIHBlZXIuXG4gKiBUbyBkbyBzbywgdGhlIGZvcm1lciByZXF1ZXN0cyBhbiBvZmZlciB0aWNrZXQgaXQgY2FuIGV4Y2hhbmdlIHdpdGggb25lIG9mXG4gKiBpdHMgbmVpZ2hib3IuXG4gKiBcXHBhcmFtIHBlZXIgdGhlIGlkZW50aWZpZXIgb2YgdGhlIHJlcXVlc3QgbWVzc2FnZVxuICovXG5TcHJheS5wcm90b3R5cGUub25UaWNrZXRSZXF1ZXN0ID0gZnVuY3Rpb24oaWQpe1xuICAgIHZhciBvcHRpb25zPXRoaXMuT1BUSU9OUzsgb3B0aW9ucy5pbml0aWF0b3I9dHJ1ZTsgb3B0aW9ucy50cmlja2xlPWZhbHNlO1xuICAgIHZhciBzb2NrZXQgPSBuZXcgU29ja2V0KG9wdGlvbnMpLFxuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAvLyAjMSBnZXQgdGhlIG9mZmVyIHRpY2tldCBmcm9tIHRoZSBzdHVuIHNlcnZpY2UgICAgXG4gICAgc29ja2V0Lm9uKCdzaWduYWwnLCBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgLy8gI0EgcmVnaXN0ZXIgdGhpcyBzb2NrZXQgaW4gcGVuZGluZyBzb2NrZXRzIGRpY3Rpb25uYXJ5XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3IE1PZmZlclRpY2tldChpZCwgZGF0YSwge2lkOiBzZWxmLklEfSk7XG4gICAgICAgIHNlbGYucGVuZGluZy5hZGRTb2NrZXQoc29ja2V0LCBtZXNzYWdlKTtcbiAgICAgICAgLy8gI0Igc2VuZCB0aGUgb2ZmZXIgdGlja2V0IHRvIHRoZSByZXF1ZXN0ZXIgYWxvbmcgd2l0aCBvdXIgaWRlbnRpZmllclxuICAgICAgICBzZWxmLnNlbmQobWVzc2FnZSwgbWVzc2FnZSk7XG4gICAgICAgIC8vICNDIHJlbW92ZSB0aGUgZm9yd2FyZGluZyByb3V0ZSBcbiAgICAgICAgc2VsZi5mb3J3YXJkcy5yZW1vdmVTb2NrZXQobWVzc2FnZSk7XG4gICAgfSk7XG4gICAgLy8gIzIgc3VjY2Vzc2Z1bCBjb25uZWN0aW9uIGVzdGFibGlzaG1lbnRcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnd3J0Yzogc3VjY2Vzc2Z1bCBjb25uZWN0aW9uIGVzdGFibGlzaG1lbnQnKTtcbiAgICAgICAgLy8gI0EgcmVtb3ZlIGZyb20gdGhlIHBlbmRpbmcgc29ja2V0cyBkaWN0aW9ubmFyeVxuICAgICAgICBzZWxmLnBlbmRpbmcucmVtb3ZlU29ja2V0KHtpZDppZH0pO1xuICAgIH0pO1xuICAgIC8vICMzIGNsb3NlZCBjb25uZWN0aW9uXG4gICAgc29ja2V0Lm9uKCdjbG9zZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCd3cnRjOiBhIGNvbm5lY3Rpb24gaGFzIGJlZW4gY2xvc2VkJyk7XG4gICAgfSk7XG4gICAgLy8gIzQgcmVjZWl2ZSBhIG1lc3NhZ2VcbiAgICBzb2NrZXQub24oJ2RhdGEnLCBmdW5jdGlvbihtZXNzYWdlKXtcbiAgICAgICAgc2VsZi5yZWNlaXZlKHNvY2tldCwgbWVzc2FnZSk7XG4gICAgfSk7XG4gICAgc29ja2V0Lm9uKCdzdHJlYW0nLCBmdW5jdGlvbihzdHJlYW0pe1xuICAgICAgICBzZWxmLmVtaXQoJ3N0cmVhbScsIHNvY2tldCwgc3RyZWFtKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyAjNSB0aW1lb3V0IG9uIGNvbm5lY3Rpb24gZXN0YWJsaXNobWVudFxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gI0EgY2hlY2sgaWYgaXQgdGhlIGNvbm5lY3Rpb24gZXN0YWJsaXNoZWQsIG90aGVyd2lzZSwgY2xlYW4gc29ja2V0XG4gICAgICAgIGlmIChzZWxmLnBlbmRpbmcuY29udGFpbnMoe2lkOmlkfSkpe1xuICAgICAgICAgICAgc2VsZi5wZW5kaW5nLnJlbW92ZVNvY2tldCh7aWQ6aWR9KTtcbiAgICAgICAgICAgIHNvY2tldC5kZXN0cm95KCk7XG4gICAgICAgIH07XG4gICAgfSwgdGhpcy5USU1FT1VUKTtcbn07XG5cbi8qIVxuICogXFxicmllZiBXZWJSVEMgc3BlY2lmaWMgZXZlbnQuIEEgbmVpZ2hib3Igc2VudCBhIHRpY2tldCB0byBzdGFtcC4gV2UgbXVzdFxuICogc3RhbXAgaXQgYmFjayB0byBlc3RhYmxpc2ggYSBjb25uZWN0aW9uLlxuICogXFxwYXJhbSBpZCB0aGUgaWRlbnRpZmllciBvZiB0aGUgbWVzc2FnZSBjYXJyeWluZyB0aGUgb2ZmZXIgdGlja2V0XG4gKiBcXHBhcmFtIHRpY2tldCB0aGUgb2ZmZXIgdGlja2V0IHRvIHN0YW1wXG4gKiBcXHBhcmFtIHBlZXIgdGhlIGVtaXR0aW5nIHBlZXIgY29udGFpbmluZyBpdHMgaWRlbnRpZmllclxuICovXG5TcHJheS5wcm90b3R5cGUub25TdGFtcGVkVGlja2V0UmVxdWVzdCA9IGZ1bmN0aW9uKGlkLCB0aWNrZXQsIHBlZXIpe1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyAjMSBpZiB0aGUgcGFydGlhbCB2aWV3IGFscmVhZHkgY29udGFpbnMgdGhpcyBuZWlnYmhvciwgZHVwbGljYXRlIHRoZVxuICAgIC8vIGVudHJ5IGFuZCBzdG9wIHRoZSBwcm9jZXNzdXNcbiAgICBpZiAodGhpcy5wYXJ0aWFsVmlldy5jb250YWlucyhwZWVyKSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwid3J0YzogY3JlYXRlIGEgZHVwbGljYXRlXCIpO1xuICAgICAgICB0aGlzLnBhcnRpYWxWaWV3LmFkZE5laWdoYm9yKHBlZXIpO1xuICAgICAgICAvLyAjMiBzZW5kIGFuIGVtcHR5IHN0YW1wZWQgdGlja2V0IHRvIGNsb3NlIHRoZSBwZW5kaW5nIGFuZCBmb3J3YXJkaW5nc1xuICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyBNU3RhbXBlZFRpY2tldChpZCwgbnVsbCwge2lkOnNlbGYuSUR9KTtcbiAgICAgICAgc2VsZi5zZW5kKG1lc3NhZ2UsIG1lc3NhZ2UpO1xuICAgICAgICBzZWxmLmZvcndhcmRzLnJlbW92ZVNvY2tldCh7aWQ6aWR9KTtcbiAgICAgICAgcmV0dXJuOyAvLyBkbyBub3RoaW5nIGVsc2UuIFVnbHkgcmV0dXJuXG4gICAgfTtcbiAgICAvLyAjMiBvdGhlcndpc2UgY3JlYXRlcyBhbiBhbnN3ZXJcbiAgICB2YXIgb3B0aW9ucz10aGlzLk9QVElPTlM7IG9wdGlvbnMuaW5pdGlhdG9yPWZhbHNlOyBvcHRpb25zLnRyaWNrbGU9ZmFsc2U7XG4gICAgdmFyIHNvY2tldCA9IG5ldyBTb2NrZXQob3B0aW9ucyk7XG4gICAgLy8gIzMgZ2V0IHRoZSBzdGFtcGVkIHRpY2tldCBmcm9tIHRoZSBzdHVuIHNlcnZpY2VcbiAgICBzb2NrZXQub24oJ3NpZ25hbCcsIGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAvLyAjQSBjcmVhdGUgdGhlIG1lc3NhZ2UgY29udGFpbmluZyB0aGUgc3RhbXBlZCB0aWNrZXRcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgTVN0YW1wZWRUaWNrZXQoaWQsIGRhdGEsIHtpZDpzZWxmLklEfSk7XG4gICAgICAgIC8vICNCIHNlbmQgaXQgYmFjayBmcm9tIHdoZXJlIGl0IGFycml2ZXNcbiAgICAgICAgc2VsZi5zZW5kKG1lc3NhZ2UsIG1lc3NhZ2UpO1xuICAgICAgICAvLyAjQyByZW1vdmUgdGhlIGZvcndhcmRpbmcgcm91dGVcbiAgICAgICAgc2VsZi5mb3J3YXJkcy5yZW1vdmVTb2NrZXQobWVzc2FnZSk7XG4gICAgfSk7XG4gICAgLy8gIzQgc3VjY2Vzc2Z1bCBjb25uZWN0aW9uIGVzdGFibGlzaG1lbnRcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnd3J0Yzogc3VjY2Vzc2Z1bCBjb25uZWN0aW9uIGVzdGFibGlzaG1lbnQnKTtcbiAgICAgICAgLy8gI0EgcmVtb3ZlIGZyb20gcGVuZGluZ1xuICAgICAgICBzZWxmLnBlbmRpbmcucmVtb3ZlU29ja2V0KHtpZDppZH0pOyAgICAgICAgXG4gICAgICAgIC8vICNCIGFkZCB0aGUgbmVpZ2Job3IgdG8gb3VyIHBhcnRpYWwgdmlld1xuICAgICAgICBzZWxmLnBhcnRpYWxWaWV3LmFkZE5laWdoYm9yKHBlZXIpO1xuICAgICAgICAvLyAjQyBhZGQgdGhlIG5laWdiaG9yIHRvIHRoZSBzb2NrZXQgZGljdGlvbm5hcnksIGlmIGl0IGRvZXMgbm90IGV4aXN0XG4gICAgICAgIGlmICghc2VsZi5zb2NrZXRzLmFkZFNvY2tldChzb2NrZXQsIHBlZXIpKXtcbiAgICAgICAgICAgIHNvY2tldC5kZXN0cm95KCk7XG4gICAgICAgIH07XG4gICAgICAgIHNlbGYudXBkYXRlU3RhdGUoKTtcbiAgICB9KTtcbiAgICAvLyAjNSBjbG9zZWQgY29ubmVjdGlvblxuICAgIHNvY2tldC5vbignY2xvc2UnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnd3J0YzogYSBjb25uZWN0aW9uIGhhcyBiZWVuIGNsb3NlZCcpO1xuICAgICAgICBzZWxmLnVwZGF0ZVN0YXRlKCk7XG4gICAgfSk7XG4gICAgLy8gIzYgcmVjZWl2ZSBhIG1lc3NhZ2VcbiAgICBzb2NrZXQub24oJ2RhdGEnLCBmdW5jdGlvbihtZXNzYWdlKXtcbiAgICAgICAgc2VsZi5yZWNlaXZlKHNvY2tldCwgbWVzc2FnZSk7XG4gICAgfSk7XG4gICAgc29ja2V0Lm9uKCdzdHJlYW0nLCBmdW5jdGlvbihzdHJlYW0pe1xuICAgICAgICBzZWxmLmVtaXQoJ3N0cmVhbScsIHNvY2tldCwgc3RyZWFtKTtcbiAgICB9KTtcbiAgICAvLyAjNyBzaWduYWwgdGhlIG9mZmVyIHRpY2tldCB0byB0aGUgZnJlc2ggc29ja2V0XG4gICAgc29ja2V0LnNpZ25hbCh0aWNrZXQpO1xuICAgIHRoaXMucGVuZGluZy5hZGRTb2NrZXQoc29ja2V0LCB7aWQ6aWR9KTtcbiAgICAvLyAjOCBhIHRpbWVvdXQgb24gY29ubmVjdGlvbiBlc3RhYmxpc2htZW50XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBpZiAoc2VsZi5wZW5kaW5nLmNvbnRhaW5zKHtpZDppZH0pKXtcbiAgICAgICAgICAgIC8vICNBIGlmIHRoZSBjb25uZWN0aW9uIGlzIG5vdCBzdWNjZXNzZnVsLCByZW1vdmUgdGhlIHNvY2tldCBhbmRcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIGR1cGxpY2F0ZVxuICAgICAgICAgICAgc2VsZi5wZW5kaW5nLnJlbW92ZVNvY2tldCh7aWQ6aWR9KTtcbiAgICAgICAgICAgIHNvY2tldC5kZXN0cm95KCk7XG4gICAgICAgICAgICBzZWxmLm9uQXJjRG93bigpO1xuICAgICAgICB9O1xuICAgIH0sIHRoaXMuVElNRU9VVCk7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgc2VuZCBhIG1lc3NhZ2UgdG8gYSBwYXJ0aWN1bGFyIHBlZXIuIElmIG5vIHBlZXIgYXJlIHBhc3NlZCBpblxuICogYXJndW1lbnRzLCBpdCB3aWxsIHRyeSB0byBmb3J3YXJkcyBpdCB0aGUgYXBwcm9wcmlhdGUgcGVlci5cbiAqIFxccGFyYW0gbWVzc2FnZSB0aGUgbWVzc2FnZSB0byBzZW5kXG4gKiBcXHBhcmFtIG9iamVjdCB0aGUgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGlkIHRvIHNlbmQgdGhlIG1lc3NhZ2VcbiAqIFxccGFyYW0gcmV0dXJuIHRydWUgaWYgdGhlIG1lc3NhZ2UgYXMgYmVlbiBzZW50LCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuU3ByYXkucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihtZXNzYWdlLCBvYmplY3Qpe1xuICAgIHZhciBzZW50ID0gZmFsc2U7XG4gICAgdmFyIGlkID0gKG9iamVjdCAmJiBvYmplY3QuaWQpIHx8IG1lc3NhZ2UuaWQ7XG4gICAgdmFyIHNvY2tldCA9IHRoaXMuc29ja2V0cy5nZXRTb2NrZXQoe2lkOmlkfSk7XG4gICAgaWYgKHNvY2tldCAhPT0gbnVsbCl7XG4gICAgICAgIGlmIChzb2NrZXQuY29ubmVjdGVkICYmXG4gICAgICAgICAgICBzb2NrZXQuX2NoYW5uZWwgJiYgc29ja2V0Ll9jaGFubmVsLnJlYWR5U3RhdGUgPT09ICdvcGVuJyl7XG4gICAgICAgICAgICBzb2NrZXQuc2VuZChtZXNzYWdlKTtcbiAgICAgICAgICAgIHNlbnQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vblBlZXJEb3duKHtpZDppZH0pOyAgICAgICAgICAgIFxuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNvY2tldCA9IHRoaXMuZm9yd2FyZHMuZ2V0U29ja2V0KHtpZDppZH0pO1xuICAgICAgICBpZiAoc29ja2V0ICE9PSBudWxsICYmIHNvY2tldC5jb25uZWN0ZWQgJiZcbiAgICAgICAgICAgIHNvY2tldC5fY2hhbm5lbCAmJiBzb2NrZXQuX2NoYW5uZWwucmVhZHlTdGF0ZSA9PT0gJ29wZW4nKXtcbiAgICAgICAgICAgIHNvY2tldC5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICAgICAgc2VudCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gc2VudDtcbn07XG5cbi8qIVxuICogXFxicmllZiByZWNlaXZlIGEgbWVtYmVyc2hpcCBtZXNzYWdlIGFuZCBwcm9jZXNzIGl0IGFjY29yZGluZ2x5XG4gKiBcXHBhcmFtIHNvY2tldCB0aGUgc29ja2V0IGZyb20gd2hpY2ggd2UgcmVjZWl2ZSB0aGUgbWVzc2FnZVxuICogXFxwYXJhbSBtZXNzYWdlIHRoZSByZWNlaXZlZCBtZXNzYWdlXG4gKi9cblNwcmF5LnByb3RvdHlwZS5yZWNlaXZlID0gZnVuY3Rpb24oc29ja2V0LCBtZXNzYWdlKXtcbiAgICBpZiAobWVzc2FnZSAmJiBtZXNzYWdlLnByb3RvY29sKXtcbiAgICAgICAgdGhpcy5lbWl0KG1lc3NhZ2UucHJvdG9jb2wrJy1yZWNlaXZlJywgc29ja2V0LCBtZXNzYWdlKTtcbiAgICB9O1xufTtcblxuU3ByYXkucHJvdG90eXBlLm9uU3ByYXlSZWNlaXZlID0gZnVuY3Rpb24oc29ja2V0LCBtZXNzYWdlKXtcbiAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSl7XG4gICAgY2FzZSAnTUpvaW4nOlxuICAgICAgICBjb25zb2xlLmxvZygnd3J0YzogYSBuZXcgbWVtYmVyIGpvaW5zIHRoZSBuZXR3b3JrJyk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5mb3J3YXJkcy5hZGRTb2NrZXQoc29ja2V0LCBtZXNzYWdlKTtcbiAgICAgICAgICAgIHNlbGYub25Kb2luKG1lc3NhZ2UuaWQpO1xuICAgICAgICAgICAgc2VsZi5mb3J3YXJkcy5yZW1vdmVTb2NrZXQobWVzc2FnZSk7XG4gICAgICAgIH0sIDEwMDApOyAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgc29ja2V0IGlzIHVuZG91YnRlZGx5IG9wZW5lZFxuICAgICAgICBicmVhaztcbiAgICBjYXNlICdNUmVxdWVzdFRpY2tldCc6XG4gICAgICAgIGNvbnNvbGUubG9nKCd3cnRjOiBhIG1lbWJlciByZXF1ZXN0IGFuIG9mZmVyIHRpY2tldCcpO1xuICAgICAgICB0aGlzLmZvcndhcmRzLmFkZFNvY2tldChzb2NrZXQsIG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm9uVGlja2V0UmVxdWVzdChtZXNzYWdlLmlkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTU9mZmVyVGlja2V0JzpcbiAgICAgICAgY29uc29sZS5sb2coJ3dydGM6IHlvdSByZWNlaXZlZCBhbiBvZmZlciB0aWNrZXQnKTtcbiAgICAgICAgaWYgKCF0aGlzLmZvcndhcmRzLmNvbnRhaW5zKG1lc3NhZ2UpKXtcbiAgICAgICAgICAgIC8vICMxIGlmIHRoZXJlIGlzIG5vIGZvcndhcmRpbmcgcm91dGUsIHRoZSBvZmZlciB0aWNrZXQgaXMgZm9yIHVzIHRvXG4gICAgICAgICAgICAvLyBzdGFtcFxuICAgICAgICAgICAgdGhpcy5mb3J3YXJkcy5hZGRTb2NrZXQoc29ja2V0LCBtZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMub25TdGFtcGVkVGlja2V0UmVxdWVzdChtZXNzYWdlLmlkLG1lc3NhZ2UudGlja2V0LG1lc3NhZ2UucGVlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAjMkEgb3RoZXJ3aXNlLCB3ZSBmb3J3YXJkIHRoZSBvZmZlciB0aWNrZXQgYWNjb3JkaW5nbHlcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbmQobWVzc2FnZSwgbWVzc2FnZSkpe1xuICAgICAgICAgICAgICAgIC8vICMyQiBpbnZlcnQgdGhlIGRpcmVjdGlvbiBvZiBmb3J3YXJkaW5nIHJvdXRlIGluIG9yZGVyIHRvXG4gICAgICAgICAgICAgICAgLy8gY29uc2lzdGVudGx5IHJlZGlyZWN0IHRoZSBzdGFtcGVkIHRpY2tldFxuICAgICAgICAgICAgICAgIHRoaXMuZm9yd2FyZHMucmVtb3ZlU29ja2V0KG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yd2FyZHMuYWRkU29ja2V0KHNvY2tldCwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICMyQyBpZiB0aGUgbWVzc2FnZSBoYXMgbm90IGJlZW4gc2VudCwgc2ltcGx5IHJlbW92ZSB0aGUgcm91dGVcbiAgICAgICAgICAgICAgICB0aGlzLmZvcndhcmRzLnJlbW92ZVNvY2tldChtZXNzYWdlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ01TdGFtcGVkVGlja2V0JzpcbiAgICAgICAgY29uc29sZS5sb2coJ3dydGM6IHlvdSByZWNlaXZlZCBhIHN0YW1wZWQgdGlja2V0Jyk7XG4gICAgICAgIGlmICghdGhpcy5mb3J3YXJkcy5jb250YWlucyhtZXNzYWdlKSl7XG4gICAgICAgICAgICAvLyAjMSBpZiB0aGVyZSBpcyBubyBmb3J3YXJkaW5nIHJvdXRlLCB0aGUgbWVzc2FnZSBpcyBmb3IgdXMgdG9cbiAgICAgICAgICAgIC8vIGZpbmFsaXplXG4gICAgICAgICAgICBpZiAobWVzc2FnZS50aWNrZXQgPT09IG51bGwpe1xuICAgICAgICAgICAgICAgIC8vICMxQSBlbXB0eSB0aWNrZXQgbWVhbmluZyB0aGUgcmVtb3RlIHBlZXIgYWxyZWFkeSBrbm93cyB1cyxcbiAgICAgICAgICAgICAgICAvLyB0aGVyZWZvcmUsIHNpbXBseSBjbG9zZSB0aGUgcGVuZGluZyBvZmZlclxuICAgICAgICAgICAgICAgIHZhciBzb2NrZXQgPSB0aGlzLnBlbmRpbmcucmVtb3ZlU29ja2V0KG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHNvY2tldC5kZXN0cm95KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICMxQiBvdGhlcndpc2UsIGZpbmFsaXplIHRoZSBjb25uZWN0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nLmdldFNvY2tldChtZXNzYWdlKS5zaWduYWwobWVzc2FnZS50aWNrZXQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICMyQSBvdGhlcndpc2UsIHdlIGZvcndhcmQgdGhlIHN0YW1wZWQgdGlja2V0IGFjY29yZGluZ2x5XG4gICAgICAgICAgICB0aGlzLnNlbmQobWVzc2FnZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICAvLyAjMkIgcmVtb3ZlIHRoZSBkaXJlY3Rpb24gZnJvbSB0aGUga25vd24gZm9yd2FyZGluZyByb3V0ZXNcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZHMucmVtb3ZlU29ja2V0KG1lc3NhZ2UpO1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICBjYXNlICdNRXhjaGFuZ2UnOlxuICAgICAgICBjb25zb2xlLmxvZygnd3J0YzogYSBwZWVyIHN0YXJ0cyB0byBleGNoYW5nZSB3aXRoIHlvdScpO1xuICAgICAgICB0aGlzLmZvcndhcmRzLmFkZFNvY2tldChzb2NrZXQsIG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm9uRXhjaGFuZ2UobWVzc2FnZS5pZCwgbWVzc2FnZS5wZWVyKTtcbiAgICAgICAgdGhpcy5mb3J3YXJkcy5yZW1vdmVTb2NrZXQobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNwcmF5O1xuIiwiKGZ1bmN0aW9uIChCdWZmZXIpe1xuLyogZ2xvYmFsIEJsb2IgKi9cblxubW9kdWxlLmV4cG9ydHMgPSBQZWVyXG5cbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NpbXBsZS1wZWVyJylcbnZhciBoYXQgPSByZXF1aXJlKCdoYXQnKVxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxudmFyIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJ2lzLXR5cGVkYXJyYXknKVxudmFyIG9uY2UgPSByZXF1aXJlKCdvbmNlJylcbnZhciBzdHJlYW0gPSByZXF1aXJlKCdzdHJlYW0nKVxudmFyIHRvQnVmZmVyID0gcmVxdWlyZSgndHlwZWRhcnJheS10by1idWZmZXInKVxuXG5pbmhlcml0cyhQZWVyLCBzdHJlYW0uRHVwbGV4KVxuXG4vKipcbiAqIFdlYlJUQyBwZWVyIGNvbm5lY3Rpb24uIFNhbWUgQVBJIGFzIG5vZGUgY29yZSBgbmV0LlNvY2tldGAsIHBsdXMgYSBmZXcgZXh0cmEgbWV0aG9kcy5cbiAqIER1cGxleCBzdHJlYW0uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5mdW5jdGlvbiBQZWVyIChvcHRzKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICBpZiAoIShzZWxmIGluc3RhbmNlb2YgUGVlcikpIHJldHVybiBuZXcgUGVlcihvcHRzKVxuICBzZWxmLl9kZWJ1ZygnbmV3IHBlZXIgJW8nLCBvcHRzKVxuXG4gIGlmICghb3B0cykgb3B0cyA9IHt9XG4gIG9wdHMuYWxsb3dIYWxmT3BlbiA9IGZhbHNlXG4gIGlmIChvcHRzLmhpZ2hXYXRlck1hcmsgPT0gbnVsbCkgb3B0cy5oaWdoV2F0ZXJNYXJrID0gMTAyNCAqIDEwMjRcblxuICBzdHJlYW0uRHVwbGV4LmNhbGwoc2VsZiwgb3B0cylcblxuICBzZWxmLmluaXRpYXRvciA9IG9wdHMuaW5pdGlhdG9yIHx8IGZhbHNlXG4gIHNlbGYuY2hhbm5lbENvbmZpZyA9IG9wdHMuY2hhbm5lbENvbmZpZyB8fCBQZWVyLmNoYW5uZWxDb25maWdcbiAgc2VsZi5jaGFubmVsTmFtZSA9IG9wdHMuY2hhbm5lbE5hbWUgfHwgaGF0KDE2MClcbiAgaWYgKCFvcHRzLmluaXRpYXRvcikgc2VsZi5jaGFubmVsTmFtZSA9IG51bGxcbiAgc2VsZi5jb25maWcgPSBvcHRzLmNvbmZpZyB8fCBQZWVyLmNvbmZpZ1xuICBzZWxmLmNvbnN0cmFpbnRzID0gb3B0cy5jb25zdHJhaW50cyB8fCBQZWVyLmNvbnN0cmFpbnRzXG4gIHNlbGYucmVjb25uZWN0VGltZXIgPSBvcHRzLnJlY29ubmVjdFRpbWVyIHx8IDBcbiAgc2VsZi5zZHBUcmFuc2Zvcm0gPSBvcHRzLnNkcFRyYW5zZm9ybSB8fCBmdW5jdGlvbiAoc2RwKSB7IHJldHVybiBzZHAgfVxuICBzZWxmLnN0cmVhbSA9IG9wdHMuc3RyZWFtIHx8IGZhbHNlXG4gIHNlbGYudHJpY2tsZSA9IG9wdHMudHJpY2tsZSAhPT0gdW5kZWZpbmVkID8gb3B0cy50cmlja2xlIDogdHJ1ZVxuXG4gIHNlbGYuZGVzdHJveWVkID0gZmFsc2VcbiAgc2VsZi5jb25uZWN0ZWQgPSBmYWxzZVxuXG4gIC8vIHNvIFBlZXIgb2JqZWN0IGFsd2F5cyBoYXMgc2FtZSBzaGFwZSAoVjggb3B0aW1pemF0aW9uKVxuICBzZWxmLnJlbW90ZUFkZHJlc3MgPSB1bmRlZmluZWRcbiAgc2VsZi5yZW1vdGVGYW1pbHkgPSB1bmRlZmluZWRcbiAgc2VsZi5yZW1vdGVQb3J0ID0gdW5kZWZpbmVkXG4gIHNlbGYubG9jYWxBZGRyZXNzID0gdW5kZWZpbmVkXG4gIHNlbGYubG9jYWxQb3J0ID0gdW5kZWZpbmVkXG5cbiAgc2VsZi5fd3J0YyA9IG9wdHMud3J0YyB8fCBnZXRCcm93c2VyUlRDKClcbiAgaWYgKCFzZWxmLl93cnRjKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIFdlYlJUQyBzdXBwb3J0OiBTcGVjaWZ5IGBvcHRzLndydGNgIG9wdGlvbiBpbiB0aGlzIGVudmlyb25tZW50JylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBXZWJSVEMgc3VwcG9ydDogTm90IGEgc3VwcG9ydGVkIGJyb3dzZXInKVxuICAgIH1cbiAgfVxuXG4gIHNlbGYuX21heEJ1ZmZlcmVkQW1vdW50ID0gb3B0cy5oaWdoV2F0ZXJNYXJrXG4gIHNlbGYuX3BjUmVhZHkgPSBmYWxzZVxuICBzZWxmLl9jaGFubmVsUmVhZHkgPSBmYWxzZVxuICBzZWxmLl9pY2VDb21wbGV0ZSA9IGZhbHNlIC8vIGljZSBjYW5kaWRhdGUgdHJpY2tsZSBkb25lIChnb3QgbnVsbCBjYW5kaWRhdGUpXG4gIHNlbGYuX2NoYW5uZWwgPSBudWxsXG5cbiAgc2VsZi5fY2h1bmsgPSBudWxsXG4gIHNlbGYuX2NiID0gbnVsbFxuICBzZWxmLl9pbnRlcnZhbCA9IG51bGxcbiAgc2VsZi5fcmVjb25uZWN0VGltZW91dCA9IG51bGxcblxuICBzZWxmLl9wYyA9IG5ldyAoc2VsZi5fd3J0Yy5SVENQZWVyQ29ubmVjdGlvbikoc2VsZi5jb25maWcsIHNlbGYuY29uc3RyYWludHMpXG4gIHNlbGYuX3BjLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gc2VsZi5fb25JY2VDb25uZWN0aW9uU3RhdGVDaGFuZ2UuYmluZChzZWxmKVxuICBzZWxmLl9wYy5vbnNpZ25hbGluZ3N0YXRlY2hhbmdlID0gc2VsZi5fb25TaWduYWxpbmdTdGF0ZUNoYW5nZS5iaW5kKHNlbGYpXG4gIHNlbGYuX3BjLm9uaWNlY2FuZGlkYXRlID0gc2VsZi5fb25JY2VDYW5kaWRhdGUuYmluZChzZWxmKVxuXG4gIGlmIChzZWxmLnN0cmVhbSkgc2VsZi5fcGMuYWRkU3RyZWFtKHNlbGYuc3RyZWFtKVxuICBzZWxmLl9wYy5vbmFkZHN0cmVhbSA9IHNlbGYuX29uQWRkU3RyZWFtLmJpbmQoc2VsZilcblxuICBpZiAoc2VsZi5pbml0aWF0b3IpIHtcbiAgICBzZWxmLl9zZXR1cERhdGEoeyBjaGFubmVsOiBzZWxmLl9wYy5jcmVhdGVEYXRhQ2hhbm5lbChzZWxmLmNoYW5uZWxOYW1lLCBzZWxmLmNoYW5uZWxDb25maWcpIH0pXG4gICAgc2VsZi5fcGMub25uZWdvdGlhdGlvbm5lZWRlZCA9IG9uY2Uoc2VsZi5fY3JlYXRlT2ZmZXIuYmluZChzZWxmKSlcbiAgICAvLyBPbmx5IENocm9tZSB0cmlnZ2VycyBcIm5lZ290aWF0aW9ubmVlZGVkXCI7IHRoaXMgaXMgYSB3b3JrYXJvdW5kIGZvciBvdGhlclxuICAgIC8vIGltcGxlbWVudGF0aW9uc1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICBzZWxmLl9wYy5vbm5lZ290aWF0aW9ubmVlZGVkKClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc2VsZi5fcGMub25kYXRhY2hhbm5lbCA9IHNlbGYuX3NldHVwRGF0YS5iaW5kKHNlbGYpXG4gIH1cblxuICBzZWxmLm9uKCdmaW5pc2gnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHNlbGYuY29ubmVjdGVkKSB7XG4gICAgICAvLyBXaGVuIGxvY2FsIHBlZXIgaXMgZmluaXNoZWQgd3JpdGluZywgY2xvc2UgY29ubmVjdGlvbiB0byByZW1vdGUgcGVlci5cbiAgICAgIC8vIEhhbGYgb3BlbiBjb25uZWN0aW9ucyBhcmUgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWQuXG4gICAgICAvLyBXYWl0IGEgYml0IGJlZm9yZSBkZXN0cm95aW5nIHNvIHRoZSBkYXRhY2hhbm5lbCBmbHVzaGVzLlxuICAgICAgLy8gVE9ETzogaXMgdGhlcmUgYSBtb3JlIHJlbGlhYmxlIHdheSB0byBhY2NvbXBsaXNoIHRoaXM/XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5fZGVzdHJveSgpXG4gICAgICB9LCAxMDApXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIGRhdGEgY2hhbm5lbCBpcyBub3QgY29ubmVjdGVkIHdoZW4gbG9jYWwgcGVlciBpcyBmaW5pc2hlZCB3cml0aW5nLCB3YWl0IHVudGlsXG4gICAgICAvLyBkYXRhIGlzIGZsdXNoZWQgdG8gbmV0d29yayBhdCBcImNvbm5lY3RcIiBldmVudC5cbiAgICAgIC8vIFRPRE86IGlzIHRoZXJlIGEgbW9yZSByZWxpYWJsZSB3YXkgdG8gYWNjb21wbGlzaCB0aGlzP1xuICAgICAgc2VsZi5vbmNlKCdjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLl9kZXN0cm95KClcbiAgICAgICAgfSwgMTAwKVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG59XG5cblBlZXIuV0VCUlRDX1NVUFBPUlQgPSAhIWdldEJyb3dzZXJSVEMoKVxuXG4vKipcbiAqIEV4cG9zZSBjb25maWcsIGNvbnN0cmFpbnRzLCBhbmQgZGF0YSBjaGFubmVsIGNvbmZpZyBmb3Igb3ZlcnJpZGluZyBhbGwgUGVlclxuICogaW5zdGFuY2VzLiBPdGhlcndpc2UsIGp1c3Qgc2V0IG9wdHMuY29uZmlnLCBvcHRzLmNvbnN0cmFpbnRzLCBvciBvcHRzLmNoYW5uZWxDb25maWdcbiAqIHdoZW4gY29uc3RydWN0aW5nIGEgUGVlci5cbiAqL1xuUGVlci5jb25maWcgPSB7XG4gIGljZVNlcnZlcnM6IFtcbiAgICB7XG4gICAgICB1cmw6ICdzdHVuOjIzLjIxLjE1MC4xMjEnLCAvLyBkZXByZWNhdGVkLCByZXBsYWNlZCBieSBgdXJsc2BcbiAgICAgIHVybHM6ICdzdHVuOjIzLjIxLjE1MC4xMjEnXG4gICAgfVxuICBdXG59XG5QZWVyLmNvbnN0cmFpbnRzID0ge31cblBlZXIuY2hhbm5lbENvbmZpZyA9IHt9XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShQZWVyLnByb3RvdHlwZSwgJ2J1ZmZlclNpemUnLCB7XG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIHJldHVybiAoc2VsZi5fY2hhbm5lbCAmJiBzZWxmLl9jaGFubmVsLmJ1ZmZlcmVkQW1vdW50KSB8fCAwXG4gIH1cbn0pXG5cblBlZXIucHJvdG90eXBlLmFkZHJlc3MgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICByZXR1cm4geyBwb3J0OiBzZWxmLmxvY2FsUG9ydCwgZmFtaWx5OiAnSVB2NCcsIGFkZHJlc3M6IHNlbGYubG9jYWxBZGRyZXNzIH1cbn1cblxuUGVlci5wcm90b3R5cGUuc2lnbmFsID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIGlmIChzZWxmLmRlc3Ryb3llZCkgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3Qgc2lnbmFsIGFmdGVyIHBlZXIgaXMgZGVzdHJveWVkJylcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgIHRyeSB7XG4gICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgZGF0YSA9IHt9XG4gICAgfVxuICB9XG4gIHNlbGYuX2RlYnVnKCdzaWduYWwoKScpXG4gIGlmIChkYXRhLnNkcCkge1xuICAgIHNlbGYuX3BjLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyAoc2VsZi5fd3J0Yy5SVENTZXNzaW9uRGVzY3JpcHRpb24pKGRhdGEpLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2VsZi5kZXN0cm95ZWQpIHJldHVyblxuICAgICAgaWYgKHNlbGYuX3BjLnJlbW90ZURlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHNlbGYuX2NyZWF0ZUFuc3dlcigpXG4gICAgfSwgc2VsZi5fb25FcnJvci5iaW5kKHNlbGYpKVxuICB9XG4gIGlmIChkYXRhLmNhbmRpZGF0ZSkge1xuICAgIHRyeSB7XG4gICAgICBzZWxmLl9wYy5hZGRJY2VDYW5kaWRhdGUoXG4gICAgICAgIG5ldyAoc2VsZi5fd3J0Yy5SVENJY2VDYW5kaWRhdGUpKGRhdGEuY2FuZGlkYXRlKSwgbm9vcCwgc2VsZi5fb25FcnJvci5iaW5kKHNlbGYpXG4gICAgICApXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZWxmLl9kZXN0cm95KG5ldyBFcnJvcignZXJyb3IgYWRkaW5nIGNhbmRpZGF0ZTogJyArIGVyci5tZXNzYWdlKSlcbiAgICB9XG4gIH1cbiAgaWYgKCFkYXRhLnNkcCAmJiAhZGF0YS5jYW5kaWRhdGUpIHtcbiAgICBzZWxmLl9kZXN0cm95KG5ldyBFcnJvcignc2lnbmFsKCkgY2FsbGVkIHdpdGggaW52YWxpZCBzaWduYWwgZGF0YScpKVxuICB9XG59XG5cbi8qKlxuICogU2VuZCB0ZXh0L2JpbmFyeSBkYXRhIHRvIHRoZSByZW1vdGUgcGVlci5cbiAqIEBwYXJhbSB7VHlwZWRBcnJheVZpZXd8QXJyYXlCdWZmZXJ8QnVmZmVyfHN0cmluZ3xCbG9ifE9iamVjdH0gY2h1bmtcbiAqL1xuUGVlci5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChjaHVuaykge1xuICB2YXIgc2VsZiA9IHRoaXNcblxuICBpZiAoIWlzVHlwZWRBcnJheS5zdHJpY3QoY2h1bmspICYmICEoY2h1bmsgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgJiZcbiAgICAhQnVmZmVyLmlzQnVmZmVyKGNodW5rKSAmJiB0eXBlb2YgY2h1bmsgIT09ICdzdHJpbmcnICYmXG4gICAgKHR5cGVvZiBCbG9iID09PSAndW5kZWZpbmVkJyB8fCAhKGNodW5rIGluc3RhbmNlb2YgQmxvYikpKSB7XG4gICAgY2h1bmsgPSBKU09OLnN0cmluZ2lmeShjaHVuaylcbiAgfVxuXG4gIC8vIGB3cnRjYCBtb2R1bGUgZG9lc24ndCBhY2NlcHQgbm9kZS5qcyBidWZmZXJcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihjaHVuaykgJiYgIWlzVHlwZWRBcnJheS5zdHJpY3QoY2h1bmspKSB7XG4gICAgY2h1bmsgPSBuZXcgVWludDhBcnJheShjaHVuaylcbiAgfVxuXG4gIHZhciBsZW4gPSBjaHVuay5sZW5ndGggfHwgY2h1bmsuYnl0ZUxlbmd0aCB8fCBjaHVuay5zaXplXG4gIHNlbGYuX2NoYW5uZWwuc2VuZChjaHVuaylcbiAgc2VsZi5fZGVidWcoJ3dyaXRlOiAlZCBieXRlcycsIGxlbilcbn1cblxuUGVlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChvbmNsb3NlKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICBzZWxmLl9kZXN0cm95KG51bGwsIG9uY2xvc2UpXG59XG5cblBlZXIucHJvdG90eXBlLl9kZXN0cm95ID0gZnVuY3Rpb24gKGVyciwgb25jbG9zZSkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgaWYgKHNlbGYuZGVzdHJveWVkKSByZXR1cm5cbiAgaWYgKG9uY2xvc2UpIHNlbGYub25jZSgnY2xvc2UnLCBvbmNsb3NlKVxuXG4gIHNlbGYuX2RlYnVnKCdkZXN0cm95IChlcnJvcjogJXMpJywgZXJyICYmIGVyci5tZXNzYWdlKVxuXG4gIHNlbGYucmVhZGFibGUgPSBzZWxmLndyaXRhYmxlID0gZmFsc2VcblxuICBpZiAoIXNlbGYuX3JlYWRhYmxlU3RhdGUuZW5kZWQpIHNlbGYucHVzaChudWxsKVxuICBpZiAoIXNlbGYuX3dyaXRhYmxlU3RhdGUuZmluaXNoZWQpIHNlbGYuZW5kKClcblxuICBzZWxmLmRlc3Ryb3llZCA9IHRydWVcbiAgc2VsZi5jb25uZWN0ZWQgPSBmYWxzZVxuICBzZWxmLl9wY1JlYWR5ID0gZmFsc2VcbiAgc2VsZi5fY2hhbm5lbFJlYWR5ID0gZmFsc2VcblxuICBzZWxmLl9jaHVuayA9IG51bGxcbiAgc2VsZi5fY2IgPSBudWxsXG4gIGNsZWFySW50ZXJ2YWwoc2VsZi5faW50ZXJ2YWwpXG4gIGNsZWFyVGltZW91dChzZWxmLl9yZWNvbm5lY3RUaW1lb3V0KVxuXG4gIGlmIChzZWxmLl9wYykge1xuICAgIHRyeSB7XG4gICAgICBzZWxmLl9wYy5jbG9zZSgpXG4gICAgfSBjYXRjaCAoZXJyKSB7fVxuXG4gICAgc2VsZi5fcGMub25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBudWxsXG4gICAgc2VsZi5fcGMub25zaWduYWxpbmdzdGF0ZWNoYW5nZSA9IG51bGxcbiAgICBzZWxmLl9wYy5vbmljZWNhbmRpZGF0ZSA9IG51bGxcbiAgfVxuXG4gIGlmIChzZWxmLl9jaGFubmVsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHNlbGYuX2NoYW5uZWwuY2xvc2UoKVxuICAgIH0gY2F0Y2ggKGVycikge31cblxuICAgIHNlbGYuX2NoYW5uZWwub25tZXNzYWdlID0gbnVsbFxuICAgIHNlbGYuX2NoYW5uZWwub25vcGVuID0gbnVsbFxuICAgIHNlbGYuX2NoYW5uZWwub25jbG9zZSA9IG51bGxcbiAgfVxuICBzZWxmLl9wYyA9IG51bGxcbiAgc2VsZi5fY2hhbm5lbCA9IG51bGxcblxuICBpZiAoZXJyKSBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKVxuICBzZWxmLmVtaXQoJ2Nsb3NlJylcbn1cblxuUGVlci5wcm90b3R5cGUuX3NldHVwRGF0YSA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgc2VsZi5fY2hhbm5lbCA9IGV2ZW50LmNoYW5uZWxcbiAgc2VsZi5jaGFubmVsTmFtZSA9IHNlbGYuX2NoYW5uZWwubGFiZWxcblxuICBzZWxmLl9jaGFubmVsLmJpbmFyeVR5cGUgPSAnYXJyYXlidWZmZXInXG4gIHNlbGYuX2NoYW5uZWwub25tZXNzYWdlID0gc2VsZi5fb25DaGFubmVsTWVzc2FnZS5iaW5kKHNlbGYpXG4gIHNlbGYuX2NoYW5uZWwub25vcGVuID0gc2VsZi5fb25DaGFubmVsT3Blbi5iaW5kKHNlbGYpXG4gIHNlbGYuX2NoYW5uZWwub25jbG9zZSA9IHNlbGYuX29uQ2hhbm5lbENsb3NlLmJpbmQoc2VsZilcbn1cblxuUGVlci5wcm90b3R5cGUuX3JlYWQgPSBmdW5jdGlvbiAoKSB7fVxuXG5QZWVyLnByb3RvdHlwZS5fd3JpdGUgPSBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgaWYgKHNlbGYuZGVzdHJveWVkKSByZXR1cm4gY2IobmV3IEVycm9yKCdjYW5ub3Qgd3JpdGUgYWZ0ZXIgcGVlciBpcyBkZXN0cm95ZWQnKSlcblxuICBpZiAoc2VsZi5jb25uZWN0ZWQpIHtcbiAgICBzZWxmLnNlbmQoY2h1bmspXG4gICAgaWYgKHNlbGYuX2NoYW5uZWwuYnVmZmVyZWRBbW91bnQgPiBzZWxmLl9tYXhCdWZmZXJlZEFtb3VudCkge1xuICAgICAgc2VsZi5fZGVidWcoJ3N0YXJ0IGJhY2twcmVzc3VyZTogYnVmZmVyZWRBbW91bnQgJWQnLCBzZWxmLl9jaGFubmVsLmJ1ZmZlcmVkQW1vdW50KVxuICAgICAgc2VsZi5fY2IgPSBjYlxuICAgIH0gZWxzZSB7XG4gICAgICBjYihudWxsKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzZWxmLl9kZWJ1Zygnd3JpdGUgYmVmb3JlIGNvbm5lY3QnKVxuICAgIHNlbGYuX2NodW5rID0gY2h1bmtcbiAgICBzZWxmLl9jYiA9IGNiXG4gIH1cbn1cblxuUGVlci5wcm90b3R5cGUuX2NyZWF0ZU9mZmVyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgaWYgKHNlbGYuZGVzdHJveWVkKSByZXR1cm5cblxuICBzZWxmLl9wYy5jcmVhdGVPZmZlcihmdW5jdGlvbiAob2ZmZXIpIHtcbiAgICBpZiAoc2VsZi5kZXN0cm95ZWQpIHJldHVyblxuICAgIHNwZWVkSGFjayhvZmZlcilcbiAgICBvZmZlci5zZHAgPSBzZWxmLnNkcFRyYW5zZm9ybShvZmZlci5zZHApXG4gICAgc2VsZi5fcGMuc2V0TG9jYWxEZXNjcmlwdGlvbihvZmZlciwgbm9vcCwgc2VsZi5fb25FcnJvci5iaW5kKHNlbGYpKVxuICAgIHZhciBzZW5kT2ZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLl9kZWJ1Zygnc2lnbmFsJylcbiAgICAgIHNlbGYuZW1pdCgnc2lnbmFsJywgc2VsZi5fcGMubG9jYWxEZXNjcmlwdGlvbiB8fCBvZmZlcilcbiAgICB9XG4gICAgaWYgKHNlbGYudHJpY2tsZSB8fCBzZWxmLl9pY2VDb21wbGV0ZSkgc2VuZE9mZmVyKClcbiAgICBlbHNlIHNlbGYub25jZSgnX2ljZUNvbXBsZXRlJywgc2VuZE9mZmVyKSAvLyB3YWl0IGZvciBjYW5kaWRhdGVzXG4gIH0sIHNlbGYuX29uRXJyb3IuYmluZChzZWxmKSwgc2VsZi5vZmZlckNvbnN0cmFpbnRzKVxufVxuXG5QZWVyLnByb3RvdHlwZS5fY3JlYXRlQW5zd2VyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgaWYgKHNlbGYuZGVzdHJveWVkKSByZXR1cm5cblxuICBzZWxmLl9wYy5jcmVhdGVBbnN3ZXIoZnVuY3Rpb24gKGFuc3dlcikge1xuICAgIGlmIChzZWxmLmRlc3Ryb3llZCkgcmV0dXJuXG4gICAgc3BlZWRIYWNrKGFuc3dlcilcbiAgICBhbnN3ZXIuc2RwID0gc2VsZi5zZHBUcmFuc2Zvcm0oYW5zd2VyLnNkcClcbiAgICBzZWxmLl9wYy5zZXRMb2NhbERlc2NyaXB0aW9uKGFuc3dlciwgbm9vcCwgc2VsZi5fb25FcnJvci5iaW5kKHNlbGYpKVxuICAgIHZhciBzZW5kQW5zd2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5fZGVidWcoJ3NpZ25hbCcpXG4gICAgICBzZWxmLmVtaXQoJ3NpZ25hbCcsIHNlbGYuX3BjLmxvY2FsRGVzY3JpcHRpb24gfHwgYW5zd2VyKVxuICAgIH1cbiAgICBpZiAoc2VsZi50cmlja2xlIHx8IHNlbGYuX2ljZUNvbXBsZXRlKSBzZW5kQW5zd2VyKClcbiAgICBlbHNlIHNlbGYub25jZSgnX2ljZUNvbXBsZXRlJywgc2VuZEFuc3dlcilcbiAgfSwgc2VsZi5fb25FcnJvci5iaW5kKHNlbGYpLCBzZWxmLmFuc3dlckNvbnN0cmFpbnRzKVxufVxuXG5QZWVyLnByb3RvdHlwZS5fb25JY2VDb25uZWN0aW9uU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICBpZiAoc2VsZi5kZXN0cm95ZWQpIHJldHVyblxuICB2YXIgaWNlR2F0aGVyaW5nU3RhdGUgPSBzZWxmLl9wYy5pY2VHYXRoZXJpbmdTdGF0ZVxuICB2YXIgaWNlQ29ubmVjdGlvblN0YXRlID0gc2VsZi5fcGMuaWNlQ29ubmVjdGlvblN0YXRlXG4gIHNlbGYuX2RlYnVnKCdpY2VDb25uZWN0aW9uU3RhdGVDaGFuZ2UgJXMgJXMnLCBpY2VHYXRoZXJpbmdTdGF0ZSwgaWNlQ29ubmVjdGlvblN0YXRlKVxuICBzZWxmLmVtaXQoJ2ljZUNvbm5lY3Rpb25TdGF0ZUNoYW5nZScsIGljZUdhdGhlcmluZ1N0YXRlLCBpY2VDb25uZWN0aW9uU3RhdGUpXG4gIGlmIChpY2VDb25uZWN0aW9uU3RhdGUgPT09ICdjb25uZWN0ZWQnIHx8IGljZUNvbm5lY3Rpb25TdGF0ZSA9PT0gJ2NvbXBsZXRlZCcpIHtcbiAgICBjbGVhclRpbWVvdXQoc2VsZi5fcmVjb25uZWN0VGltZW91dClcbiAgICBzZWxmLl9wY1JlYWR5ID0gdHJ1ZVxuICAgIHNlbGYuX21heWJlUmVhZHkoKVxuICB9XG4gIGlmIChpY2VDb25uZWN0aW9uU3RhdGUgPT09ICdkaXNjb25uZWN0ZWQnKSB7XG4gICAgaWYgKHNlbGYucmVjb25uZWN0VGltZXIpIHtcbiAgICAgIC8vIElmIHVzZXIgaGFzIHNldCBgb3B0LnJlY29ubmVjdFRpbWVyYCwgYWxsb3cgdGltZSBmb3IgSUNFIHRvIGF0dGVtcHQgYSByZWNvbm5lY3RcbiAgICAgIGNsZWFyVGltZW91dChzZWxmLl9yZWNvbm5lY3RUaW1lb3V0KVxuICAgICAgc2VsZi5fcmVjb25uZWN0VGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLl9kZXN0cm95KClcbiAgICAgIH0sIHNlbGYucmVjb25uZWN0VGltZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuX2Rlc3Ryb3koKVxuICAgIH1cbiAgfVxuICBpZiAoaWNlQ29ubmVjdGlvblN0YXRlID09PSAnY2xvc2VkJykge1xuICAgIHNlbGYuX2Rlc3Ryb3koKVxuICB9XG59XG5cblBlZXIucHJvdG90eXBlLl9tYXliZVJlYWR5ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgc2VsZi5fZGVidWcoJ21heWJlUmVhZHkgcGMgJXMgY2hhbm5lbCAlcycsIHNlbGYuX3BjUmVhZHksIHNlbGYuX2NoYW5uZWxSZWFkeSlcbiAgaWYgKHNlbGYuY29ubmVjdGVkIHx8IHNlbGYuX2Nvbm5lY3RpbmcgfHwgIXNlbGYuX3BjUmVhZHkgfHwgIXNlbGYuX2NoYW5uZWxSZWFkeSkgcmV0dXJuXG4gIHNlbGYuX2Nvbm5lY3RpbmcgPSB0cnVlXG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICEhd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgc2VsZi5fcGMuZ2V0U3RhdHMobnVsbCwgZnVuY3Rpb24gKHJlcykge1xuICAgICAgdmFyIGl0ZW1zID0gW11cbiAgICAgIHJlcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGl0ZW1zLnB1c2goaXRlbSlcbiAgICAgIH0pXG4gICAgICBvblN0YXRzKGl0ZW1zKVxuICAgIH0sIHNlbGYuX29uRXJyb3IuYmluZChzZWxmKSlcbiAgfSBlbHNlIHtcbiAgICBzZWxmLl9wYy5nZXRTdGF0cyhmdW5jdGlvbiAocmVzKSB7XG4gICAgICB2YXIgaXRlbXMgPSBbXVxuICAgICAgcmVzLnJlc3VsdCgpLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICB2YXIgaXRlbSA9IHt9XG4gICAgICAgIHJlc3VsdC5uYW1lcygpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICBpdGVtW25hbWVdID0gcmVzdWx0LnN0YXQobmFtZSlcbiAgICAgICAgfSlcbiAgICAgICAgaXRlbS5pZCA9IHJlc3VsdC5pZFxuICAgICAgICBpdGVtLnR5cGUgPSByZXN1bHQudHlwZVxuICAgICAgICBpdGVtLnRpbWVzdGFtcCA9IHJlc3VsdC50aW1lc3RhbXBcbiAgICAgICAgaXRlbXMucHVzaChpdGVtKVxuICAgICAgfSlcbiAgICAgIG9uU3RhdHMoaXRlbXMpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uU3RhdHMgKGl0ZW1zKSB7XG4gICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ3JlbW90ZWNhbmRpZGF0ZScpIHtcbiAgICAgICAgc2VsZi5yZW1vdGVBZGRyZXNzID0gaXRlbS5pcEFkZHJlc3NcbiAgICAgICAgc2VsZi5yZW1vdGVGYW1pbHkgPSAnSVB2NCdcbiAgICAgICAgc2VsZi5yZW1vdGVQb3J0ID0gTnVtYmVyKGl0ZW0ucG9ydE51bWJlcilcbiAgICAgICAgc2VsZi5fZGVidWcoXG4gICAgICAgICAgJ2Nvbm5lY3QgcmVtb3RlOiAlczolcyAoJXMpJyxcbiAgICAgICAgICBzZWxmLnJlbW90ZUFkZHJlc3MsIHNlbGYucmVtb3RlUG9ydCwgc2VsZi5yZW1vdGVGYW1pbHlcbiAgICAgICAgKVxuICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdsb2NhbGNhbmRpZGF0ZScgJiYgaXRlbS5jYW5kaWRhdGVUeXBlID09PSAnaG9zdCcpIHtcbiAgICAgICAgc2VsZi5sb2NhbEFkZHJlc3MgPSBpdGVtLmlwQWRkcmVzc1xuICAgICAgICBzZWxmLmxvY2FsUG9ydCA9IE51bWJlcihpdGVtLnBvcnROdW1iZXIpXG4gICAgICAgIHNlbGYuX2RlYnVnKCdjb25uZWN0IGxvY2FsOiAlczolcycsIHNlbGYubG9jYWxBZGRyZXNzLCBzZWxmLmxvY2FsUG9ydClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgc2VsZi5fY29ubmVjdGluZyA9IGZhbHNlXG4gICAgc2VsZi5jb25uZWN0ZWQgPSB0cnVlXG5cbiAgICBpZiAoc2VsZi5fY2h1bmspIHtcbiAgICAgIHNlbGYuc2VuZChzZWxmLl9jaHVuaylcbiAgICAgIHNlbGYuX2NodW5rID0gbnVsbFxuICAgICAgc2VsZi5fZGVidWcoJ3NlbnQgY2h1bmsgZnJvbSBcIndyaXRlIGJlZm9yZSBjb25uZWN0XCInKVxuXG4gICAgICB2YXIgY2IgPSBzZWxmLl9jYlxuICAgICAgc2VsZi5fY2IgPSBudWxsXG4gICAgICBjYihudWxsKVxuICAgIH1cblxuICAgIHNlbGYuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFzZWxmLl9jYiB8fCAhc2VsZi5fY2hhbm5lbCB8fCBzZWxmLl9jaGFubmVsLmJ1ZmZlcmVkQW1vdW50ID4gc2VsZi5fbWF4QnVmZmVyZWRBbW91bnQpIHJldHVyblxuICAgICAgc2VsZi5fZGVidWcoJ2VuZGluZyBiYWNrcHJlc3N1cmU6IGJ1ZmZlcmVkQW1vdW50ICVkJywgc2VsZi5fY2hhbm5lbC5idWZmZXJlZEFtb3VudClcbiAgICAgIHZhciBjYiA9IHNlbGYuX2NiXG4gICAgICBzZWxmLl9jYiA9IG51bGxcbiAgICAgIGNiKG51bGwpXG4gICAgfSwgMTUwKVxuICAgIGlmIChzZWxmLl9pbnRlcnZhbC51bnJlZikgc2VsZi5faW50ZXJ2YWwudW5yZWYoKVxuXG4gICAgc2VsZi5fZGVidWcoJ2Nvbm5lY3QnKVxuICAgIHNlbGYuZW1pdCgnY29ubmVjdCcpXG4gIH1cbn1cblxuUGVlci5wcm90b3R5cGUuX29uU2lnbmFsaW5nU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICBpZiAoc2VsZi5kZXN0cm95ZWQpIHJldHVyblxuICBzZWxmLl9kZWJ1Zygnc2lnbmFsaW5nU3RhdGVDaGFuZ2UgJXMnLCBzZWxmLl9wYy5zaWduYWxpbmdTdGF0ZSlcbiAgc2VsZi5lbWl0KCdzaWduYWxpbmdTdGF0ZUNoYW5nZScsIHNlbGYuX3BjLnNpZ25hbGluZ1N0YXRlKVxufVxuXG5QZWVyLnByb3RvdHlwZS5fb25JY2VDYW5kaWRhdGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIGlmIChzZWxmLmRlc3Ryb3llZCkgcmV0dXJuXG4gIGlmIChldmVudC5jYW5kaWRhdGUgJiYgc2VsZi50cmlja2xlKSB7XG4gICAgc2VsZi5lbWl0KCdzaWduYWwnLCB7IGNhbmRpZGF0ZTogZXZlbnQuY2FuZGlkYXRlIH0pXG4gIH0gZWxzZSBpZiAoIWV2ZW50LmNhbmRpZGF0ZSkge1xuICAgIHNlbGYuX2ljZUNvbXBsZXRlID0gdHJ1ZVxuICAgIHNlbGYuZW1pdCgnX2ljZUNvbXBsZXRlJylcbiAgfVxufVxuXG5QZWVyLnByb3RvdHlwZS5fb25DaGFubmVsTWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgaWYgKHNlbGYuZGVzdHJveWVkKSByZXR1cm5cbiAgdmFyIGRhdGEgPSBldmVudC5kYXRhXG4gIHNlbGYuX2RlYnVnKCdyZWFkOiAlZCBieXRlcycsIGRhdGEuYnl0ZUxlbmd0aCB8fCBkYXRhLmxlbmd0aClcblxuICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgZGF0YSA9IHRvQnVmZmVyKG5ldyBVaW50OEFycmF5KGRhdGEpKVxuICAgIHNlbGYucHVzaChkYXRhKVxuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKVxuICAgIH0gY2F0Y2ggKGVycikge31cbiAgICBzZWxmLmVtaXQoJ2RhdGEnLCBkYXRhKVxuICB9XG59XG5cblBlZXIucHJvdG90eXBlLl9vbkNoYW5uZWxPcGVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgaWYgKHNlbGYuY29ubmVjdGVkIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm5cbiAgc2VsZi5fZGVidWcoJ29uIGNoYW5uZWwgb3BlbicpXG4gIHNlbGYuX2NoYW5uZWxSZWFkeSA9IHRydWVcbiAgc2VsZi5fbWF5YmVSZWFkeSgpXG59XG5cblBlZXIucHJvdG90eXBlLl9vbkNoYW5uZWxDbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIGlmIChzZWxmLmRlc3Ryb3llZCkgcmV0dXJuXG4gIHNlbGYuX2RlYnVnKCdvbiBjaGFubmVsIGNsb3NlJylcbiAgc2VsZi5fZGVzdHJveSgpXG59XG5cblBlZXIucHJvdG90eXBlLl9vbkFkZFN0cmVhbSA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgaWYgKHNlbGYuZGVzdHJveWVkKSByZXR1cm5cbiAgc2VsZi5fZGVidWcoJ29uIGFkZCBzdHJlYW0nKVxuICBzZWxmLmVtaXQoJ3N0cmVhbScsIGV2ZW50LnN0cmVhbSlcbn1cblxuUGVlci5wcm90b3R5cGUuX29uRXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICBpZiAoc2VsZi5kZXN0cm95ZWQpIHJldHVyblxuICBzZWxmLl9kZWJ1ZygnZXJyb3IgJXMnLCBlcnIubWVzc2FnZSB8fCBlcnIpXG4gIHNlbGYuX2Rlc3Ryb3koZXJyKVxufVxuXG5QZWVyLnByb3RvdHlwZS5fZGVidWcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICB2YXIgaWQgPSBzZWxmLmNoYW5uZWxOYW1lICYmIHNlbGYuY2hhbm5lbE5hbWUuc3Vic3RyaW5nKDAsIDcpXG4gIGFyZ3NbMF0gPSAnWycgKyBpZCArICddICcgKyBhcmdzWzBdXG4gIGRlYnVnLmFwcGx5KG51bGwsIGFyZ3MpXG59XG5cbmZ1bmN0aW9uIGdldEJyb3dzZXJSVEMgKCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBudWxsXG4gIHZhciB3cnRjID0ge1xuICAgIFJUQ1BlZXJDb25uZWN0aW9uOiB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24gfHwgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uIHx8XG4gICAgICB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24sXG4gICAgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uOiB3aW5kb3cubW96UlRDU2Vzc2lvbkRlc2NyaXB0aW9uIHx8XG4gICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIHx8IHdpbmRvdy53ZWJraXRSVENTZXNzaW9uRGVzY3JpcHRpb24sXG4gICAgUlRDSWNlQ2FuZGlkYXRlOiB3aW5kb3cubW96UlRDSWNlQ2FuZGlkYXRlIHx8IHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgfHxcbiAgICAgIHdpbmRvdy53ZWJraXRSVENJY2VDYW5kaWRhdGVcbiAgfVxuICBpZiAoIXdydGMuUlRDUGVlckNvbm5lY3Rpb24pIHJldHVybiBudWxsXG4gIHJldHVybiB3cnRjXG59XG5cbmZ1bmN0aW9uIHNwZWVkSGFjayAob2JqKSB7XG4gIHZhciBzID0gb2JqLnNkcC5zcGxpdCgnYj1BUzozMCcpXG4gIGlmIChzLmxlbmd0aCA+IDEpIG9iai5zZHAgPSBzWzBdICsgJ2I9QVM6MTYzODQwMCcgKyBzWzFdXG59XG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyKSIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGVidWcnKTtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lXG4gICAgICAgICAgICAgICAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgID8gY2hyb21lLnN0b3JhZ2UubG9jYWxcbiAgICAgICAgICAgICAgICAgIDogbG9jYWxzdG9yYWdlKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuICAnbGlnaHRzZWFncmVlbicsXG4gICdmb3Jlc3RncmVlbicsXG4gICdnb2xkZW5yb2QnLFxuICAnZG9kZ2VyYmx1ZScsXG4gICdkYXJrb3JjaGlkJyxcbiAgJ2NyaW1zb24nXG5dO1xuXG4vKipcbiAqIEN1cnJlbnRseSBvbmx5IFdlYktpdC1iYXNlZCBXZWIgSW5zcGVjdG9ycywgRmlyZWZveCA+PSB2MzEsXG4gKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cbiAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cbiAqXG4gKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xuICovXG5cbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgcmV0dXJuICgnV2Via2l0QXBwZWFyYW5jZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB8fFxuICAgIC8vIGlzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcbiAgICAod2luZG93LmNvbnNvbGUgJiYgKGNvbnNvbGUuZmlyZWJ1ZyB8fCAoY29uc29sZS5leGNlcHRpb24gJiYgY29uc29sZS50YWJsZSkpKSB8fFxuICAgIC8vIGlzIGZpcmVmb3ggPj0gdjMxP1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICAgIChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncygpIHtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybiBhcmdzO1xuXG4gIHZhciBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcbiAgYXJncyA9IFthcmdzWzBdLCBjLCAnY29sb3I6IGluaGVyaXQnXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncywgMSkpO1xuXG4gIC8vIHRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG4gIC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cbiAgLy8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsYXN0QyA9IDA7XG4gIGFyZ3NbMF0ucmVwbGFjZSgvJVthLXolXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIGlmICgnJSUnID09PSBtYXRjaCkgcmV0dXJuO1xuICAgIGluZGV4Kys7XG4gICAgaWYgKCclYycgPT09IG1hdGNoKSB7XG4gICAgICAvLyB3ZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcbiAgICAgIC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG4gICAgICBsYXN0QyA9IGluZGV4O1xuICAgIH1cbiAgfSk7XG5cbiAgYXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xuICByZXR1cm4gYXJncztcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb2coKSB7XG4gIC8vIHRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG4gIC8vIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG4gIHJldHVybiAnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbnNvbGVcbiAgICAmJiBjb25zb2xlLmxvZ1xuICAgICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUubG9nLCBjb25zb2xlLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobnVsbCA9PSBuYW1lc3BhY2VzKSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLmRlYnVnID0gbmFtZXNwYWNlcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge31cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB2YXIgcjtcbiAgdHJ5IHtcbiAgICByID0gZXhwb3J0cy5zdG9yYWdlLmRlYnVnO1xuICB9IGNhdGNoKGUpIHt9XG4gIHJldHVybiByO1xufVxuXG4vKipcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgbG9jYWxTdG9yYWdlLmRlYnVnYCBpbml0aWFsbHkuXG4gKi9cblxuZXhwb3J0cy5lbmFibGUobG9hZCgpKTtcblxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBkZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXJjYXNlZCBsZXR0ZXIsIGkuZS4gXCJuXCIuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzID0ge307XG5cbi8qKlxuICogUHJldmlvdXNseSBhc3NpZ25lZCBjb2xvci5cbiAqL1xuXG52YXIgcHJldkNvbG9yID0gMDtcblxuLyoqXG4gKiBQcmV2aW91cyBsb2cgdGltZXN0YW1wLlxuICovXG5cbnZhciBwcmV2VGltZTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZWxlY3RDb2xvcigpIHtcbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW3ByZXZDb2xvcisrICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGVidWcobmFtZXNwYWNlKSB7XG5cbiAgLy8gZGVmaW5lIHRoZSBgZGlzYWJsZWRgIHZlcnNpb25cbiAgZnVuY3Rpb24gZGlzYWJsZWQoKSB7XG4gIH1cbiAgZGlzYWJsZWQuZW5hYmxlZCA9IGZhbHNlO1xuXG4gIC8vIGRlZmluZSB0aGUgYGVuYWJsZWRgIHZlcnNpb25cbiAgZnVuY3Rpb24gZW5hYmxlZCgpIHtcblxuICAgIHZhciBzZWxmID0gZW5hYmxlZDtcblxuICAgIC8vIHNldCBgZGlmZmAgdGltZXN0YW1wXG4gICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgcHJldlRpbWUgPSBjdXJyO1xuXG4gICAgLy8gYWRkIHRoZSBgY29sb3JgIGlmIG5vdCBzZXRcbiAgICBpZiAobnVsbCA9PSBzZWxmLnVzZUNvbG9ycykgc2VsZi51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICAgIGlmIChudWxsID09IHNlbGYuY29sb3IgJiYgc2VsZi51c2VDb2xvcnMpIHNlbGYuY29sb3IgPSBzZWxlY3RDb2xvcigpO1xuXG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gICAgYXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSkge1xuICAgICAgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJW9cbiAgICAgIGFyZ3MgPSBbJyVvJ10uY29uY2F0KGFyZ3MpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXolXSkvZywgZnVuY3Rpb24obWF0Y2gsIGZvcm1hdCkge1xuICAgICAgLy8gaWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICBpbmRleCsrO1xuICAgICAgdmFyIGZvcm1hdHRlciA9IGV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cbiAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGluZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuZm9ybWF0QXJncykge1xuICAgICAgYXJncyA9IGV4cG9ydHMuZm9ybWF0QXJncy5hcHBseShzZWxmLCBhcmdzKTtcbiAgICB9XG4gICAgdmFyIGxvZ0ZuID0gZW5hYmxlZC5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuICBlbmFibGVkLmVuYWJsZWQgPSB0cnVlO1xuXG4gIHZhciBmbiA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpID8gZW5hYmxlZCA6IGRpc2FibGVkO1xuXG4gIGZuLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblxuICByZXR1cm4gZm47XG59XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICBleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7XG5cbiAgdmFyIHNwbGl0ID0gKG5hbWVzcGFjZXMgfHwgJycpLnNwbGl0KC9bXFxzLF0rLyk7XG4gIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuIiwiLyoqXG4gKiBIZWxwZXJzLlxuICovXG5cbnZhciBzID0gMTAwMDtcbnZhciBtID0gcyAqIDYwO1xudmFyIGggPSBtICogNjA7XG52YXIgZCA9IGggKiAyNDtcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucyl7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIHZhbCkgcmV0dXJuIHBhcnNlKHZhbCk7XG4gIHJldHVybiBvcHRpb25zLmxvbmdcbiAgICA/IGxvbmcodmFsKVxuICAgIDogc2hvcnQodmFsKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICBzdHIgPSAnJyArIHN0cjtcbiAgaWYgKHN0ci5sZW5ndGggPiAxMDAwMCkgcmV0dXJuO1xuICB2YXIgbWF0Y2ggPSAvXigoPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKHN0cik7XG4gIGlmICghbWF0Y2gpIHJldHVybjtcbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2hvcnQobXMpIHtcbiAgaWYgKG1zID49IGQpIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gIGlmIChtcyA+PSBoKSByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICBpZiAobXMgPj0gbSkgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcbiAgaWYgKG1zID49IHMpIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb25nKG1zKSB7XG4gIHJldHVybiBwbHVyYWwobXMsIGQsICdkYXknKVxuICAgIHx8IHBsdXJhbChtcywgaCwgJ2hvdXInKVxuICAgIHx8IHBsdXJhbChtcywgbSwgJ21pbnV0ZScpXG4gICAgfHwgcGx1cmFsKG1zLCBzLCAnc2Vjb25kJylcbiAgICB8fCBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbiwgbmFtZSkge1xuICBpZiAobXMgPCBuKSByZXR1cm47XG4gIGlmIChtcyA8IG4gKiAxLjUpIHJldHVybiBNYXRoLmZsb29yKG1zIC8gbikgKyAnICcgKyBuYW1lO1xuICByZXR1cm4gTWF0aC5jZWlsKG1zIC8gbikgKyAnICcgKyBuYW1lICsgJ3MnO1xufVxuIiwidmFyIGhhdCA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdHMsIGJhc2UpIHtcbiAgICBpZiAoIWJhc2UpIGJhc2UgPSAxNjtcbiAgICBpZiAoYml0cyA9PT0gdW5kZWZpbmVkKSBiaXRzID0gMTI4O1xuICAgIGlmIChiaXRzIDw9IDApIHJldHVybiAnMCc7XG4gICAgXG4gICAgdmFyIGRpZ2l0cyA9IE1hdGgubG9nKE1hdGgucG93KDIsIGJpdHMpKSAvIE1hdGgubG9nKGJhc2UpO1xuICAgIGZvciAodmFyIGkgPSAyOyBkaWdpdHMgPT09IEluZmluaXR5OyBpICo9IDIpIHtcbiAgICAgICAgZGlnaXRzID0gTWF0aC5sb2coTWF0aC5wb3coMiwgYml0cyAvIGkpKSAvIE1hdGgubG9nKGJhc2UpICogaTtcbiAgICB9XG4gICAgXG4gICAgdmFyIHJlbSA9IGRpZ2l0cyAtIE1hdGguZmxvb3IoZGlnaXRzKTtcbiAgICBcbiAgICB2YXIgcmVzID0gJyc7XG4gICAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBNYXRoLmZsb29yKGRpZ2l0cyk7IGkrKykge1xuICAgICAgICB2YXIgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJhc2UpLnRvU3RyaW5nKGJhc2UpO1xuICAgICAgICByZXMgPSB4ICsgcmVzO1xuICAgIH1cbiAgICBcbiAgICBpZiAocmVtKSB7XG4gICAgICAgIHZhciBiID0gTWF0aC5wb3coYmFzZSwgcmVtKTtcbiAgICAgICAgdmFyIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBiKS50b1N0cmluZyhiYXNlKTtcbiAgICAgICAgcmVzID0geCArIHJlcztcbiAgICB9XG4gICAgXG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHJlcywgYmFzZSk7XG4gICAgaWYgKHBhcnNlZCAhPT0gSW5maW5pdHkgJiYgcGFyc2VkID49IE1hdGgucG93KDIsIGJpdHMpKSB7XG4gICAgICAgIHJldHVybiBoYXQoYml0cywgYmFzZSlcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gcmVzO1xufTtcblxuaGF0LnJhY2sgPSBmdW5jdGlvbiAoYml0cywgYmFzZSwgZXhwYW5kQnkpIHtcbiAgICB2YXIgZm4gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgaXRlcnMgPSAwO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoaXRlcnMgKysgPiAxMCkge1xuICAgICAgICAgICAgICAgIGlmIChleHBhbmRCeSkgYml0cyArPSBleHBhbmRCeTtcbiAgICAgICAgICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcigndG9vIG1hbnkgSUQgY29sbGlzaW9ucywgdXNlIG1vcmUgYml0cycpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBpZCA9IGhhdChiaXRzLCBiYXNlKTtcbiAgICAgICAgfSB3aGlsZSAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwoaGF0cywgaWQpKTtcbiAgICAgICAgXG4gICAgICAgIGhhdHNbaWRdID0gZGF0YTtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH07XG4gICAgdmFyIGhhdHMgPSBmbi5oYXRzID0ge307XG4gICAgXG4gICAgZm4uZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBmbi5oYXRzW2lkXTtcbiAgICB9O1xuICAgIFxuICAgIGZuLnNldCA9IGZ1bmN0aW9uIChpZCwgdmFsdWUpIHtcbiAgICAgICAgZm4uaGF0c1tpZF0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGZuO1xuICAgIH07XG4gICAgXG4gICAgZm4uYml0cyA9IGJpdHMgfHwgMTI4O1xuICAgIGZuLmJhc2UgPSBiYXNlIHx8IDE2O1xuICAgIHJldHVybiBmbjtcbn07XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzICAgICAgPSBpc1R5cGVkQXJyYXlcbmlzVHlwZWRBcnJheS5zdHJpY3QgPSBpc1N0cmljdFR5cGVkQXJyYXlcbmlzVHlwZWRBcnJheS5sb29zZSAgPSBpc0xvb3NlVHlwZWRBcnJheVxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG52YXIgbmFtZXMgPSB7XG4gICAgJ1tvYmplY3QgSW50OEFycmF5XSc6IHRydWVcbiAgLCAnW29iamVjdCBJbnQxNkFycmF5XSc6IHRydWVcbiAgLCAnW29iamVjdCBJbnQzMkFycmF5XSc6IHRydWVcbiAgLCAnW29iamVjdCBVaW50OEFycmF5XSc6IHRydWVcbiAgLCAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nOiB0cnVlXG4gICwgJ1tvYmplY3QgVWludDE2QXJyYXldJzogdHJ1ZVxuICAsICdbb2JqZWN0IFVpbnQzMkFycmF5XSc6IHRydWVcbiAgLCAnW29iamVjdCBGbG9hdDMyQXJyYXldJzogdHJ1ZVxuICAsICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nOiB0cnVlXG59XG5cbmZ1bmN0aW9uIGlzVHlwZWRBcnJheShhcnIpIHtcbiAgcmV0dXJuIChcbiAgICAgICBpc1N0cmljdFR5cGVkQXJyYXkoYXJyKVxuICAgIHx8IGlzTG9vc2VUeXBlZEFycmF5KGFycilcbiAgKVxufVxuXG5mdW5jdGlvbiBpc1N0cmljdFR5cGVkQXJyYXkoYXJyKSB7XG4gIHJldHVybiAoXG4gICAgICAgYXJyIGluc3RhbmNlb2YgSW50OEFycmF5XG4gICAgfHwgYXJyIGluc3RhbmNlb2YgSW50MTZBcnJheVxuICAgIHx8IGFyciBpbnN0YW5jZW9mIEludDMyQXJyYXlcbiAgICB8fCBhcnIgaW5zdGFuY2VvZiBVaW50OEFycmF5XG4gICAgfHwgYXJyIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXlcbiAgICB8fCBhcnIgaW5zdGFuY2VvZiBVaW50MTZBcnJheVxuICAgIHx8IGFyciBpbnN0YW5jZW9mIFVpbnQzMkFycmF5XG4gICAgfHwgYXJyIGluc3RhbmNlb2YgRmxvYXQzMkFycmF5XG4gICAgfHwgYXJyIGluc3RhbmNlb2YgRmxvYXQ2NEFycmF5XG4gIClcbn1cblxuZnVuY3Rpb24gaXNMb29zZVR5cGVkQXJyYXkoYXJyKSB7XG4gIHJldHVybiBuYW1lc1t0b1N0cmluZy5jYWxsKGFycildXG59XG4iLCIvLyBSZXR1cm5zIGEgd3JhcHBlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSB3cmFwcGVkIGNhbGxiYWNrXG4vLyBUaGUgd3JhcHBlciBmdW5jdGlvbiBzaG91bGQgZG8gc29tZSBzdHVmZiwgYW5kIHJldHVybiBhXG4vLyBwcmVzdW1hYmx5IGRpZmZlcmVudCBjYWxsYmFjayBmdW5jdGlvbi5cbi8vIFRoaXMgbWFrZXMgc3VyZSB0aGF0IG93biBwcm9wZXJ0aWVzIGFyZSByZXRhaW5lZCwgc28gdGhhdFxuLy8gZGVjb3JhdGlvbnMgYW5kIHN1Y2ggYXJlIG5vdCBsb3N0IGFsb25nIHRoZSB3YXkuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBweVxuZnVuY3Rpb24gd3JhcHB5IChmbiwgY2IpIHtcbiAgaWYgKGZuICYmIGNiKSByZXR1cm4gd3JhcHB5KGZuKShjYilcblxuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25lZWQgd3JhcHBlciBmdW5jdGlvbicpXG5cbiAgT2JqZWN0LmtleXMoZm4pLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICB3cmFwcGVyW2tdID0gZm5ba11cbiAgfSlcblxuICByZXR1cm4gd3JhcHBlclxuXG4gIGZ1bmN0aW9uIHdyYXBwZXIoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV1cbiAgICB9XG4gICAgdmFyIHJldCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgdmFyIGNiID0gYXJnc1thcmdzLmxlbmd0aC0xXVxuICAgIGlmICh0eXBlb2YgcmV0ID09PSAnZnVuY3Rpb24nICYmIHJldCAhPT0gY2IpIHtcbiAgICAgIE9iamVjdC5rZXlzKGNiKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIHJldFtrXSA9IGNiW2tdXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cbn1cbiIsInZhciB3cmFwcHkgPSByZXF1aXJlKCd3cmFwcHknKVxubW9kdWxlLmV4cG9ydHMgPSB3cmFwcHkob25jZSlcblxub25jZS5wcm90byA9IG9uY2UoZnVuY3Rpb24gKCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRnVuY3Rpb24ucHJvdG90eXBlLCAnb25jZScsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9uY2UodGhpcylcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KVxufSlcblxuZnVuY3Rpb24gb25jZSAoZm4pIHtcbiAgdmFyIGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGYuY2FsbGVkKSByZXR1cm4gZi52YWx1ZVxuICAgIGYuY2FsbGVkID0gdHJ1ZVxuICAgIHJldHVybiBmLnZhbHVlID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9XG4gIGYuY2FsbGVkID0gZmFsc2VcbiAgcmV0dXJuIGZcbn1cbiIsIihmdW5jdGlvbiAoQnVmZmVyKXtcbi8qKlxuICogQ29udmVydCBhIHR5cGVkIGFycmF5IHRvIGEgQnVmZmVyIHdpdGhvdXQgYSBjb3B5XG4gKlxuICogQXV0aG9yOiAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBMaWNlbnNlOiAgTUlUXG4gKlxuICogYG5wbSBpbnN0YWxsIHR5cGVkYXJyYXktdG8tYnVmZmVyYFxuICovXG5cbnZhciBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCdpcy10eXBlZGFycmF5Jykuc3RyaWN0XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFycikge1xuICAvLyBJZiBgQnVmZmVyYCBpcyB0aGUgYnJvd3NlciBgYnVmZmVyYCBtb2R1bGUsIGFuZCB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMsXG4gIC8vIHRoZW4gYXZvaWQgYSBjb3B5LiBPdGhlcndpc2UsIGNyZWF0ZSBhIGBCdWZmZXJgIHdpdGggYSBjb3B5LlxuICB2YXIgY29uc3RydWN0b3IgPSBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gQnVmZmVyLl9hdWdtZW50XG4gICAgOiBmdW5jdGlvbiAoYXJyKSB7IHJldHVybiBuZXcgQnVmZmVyKGFycikgfVxuXG4gIGlmIChhcnIgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgcmV0dXJuIGNvbnN0cnVjdG9yKGFycilcbiAgfSBlbHNlIGlmIChhcnIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBjb25zdHJ1Y3RvcihuZXcgVWludDhBcnJheShhcnIpKVxuICB9IGVsc2UgaWYgKGlzVHlwZWRBcnJheShhcnIpKSB7XG4gICAgLy8gVXNlIHRoZSB0eXBlZCBhcnJheSdzIHVuZGVybHlpbmcgQXJyYXlCdWZmZXIgdG8gYmFjayBuZXcgQnVmZmVyLiBUaGlzIHJlc3BlY3RzXG4gICAgLy8gdGhlIFwidmlld1wiIG9uIHRoZSBBcnJheUJ1ZmZlciwgaS5lLiBieXRlT2Zmc2V0IGFuZCBieXRlTGVuZ3RoLiBObyBjb3B5LlxuICAgIHJldHVybiBjb25zdHJ1Y3RvcihuZXcgVWludDhBcnJheShhcnIuYnVmZmVyLCBhcnIuYnl0ZU9mZnNldCwgYXJyLmJ5dGVMZW5ndGgpKVxuICB9IGVsc2Uge1xuICAgIC8vIFVuc3VwcG9ydGVkIHR5cGUsIGp1c3QgcGFzcyBpdCB0aHJvdWdoIHRvIHRoZSBgQnVmZmVyYCBjb25zdHJ1Y3Rvci5cbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihhcnIpXG4gIH1cbn1cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyKSIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gU29ydGVkQXJyYXlcbnZhciBzZWFyY2ggPSByZXF1aXJlKCdiaW5hcnktc2VhcmNoJylcblxuZnVuY3Rpb24gU29ydGVkQXJyYXkoY21wLCBhcnIpIHtcbiAgaWYgKHR5cGVvZiBjbXAgIT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjb21wYXJhdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpXG5cbiAgdGhpcy5hcnIgPSBhcnIgfHwgW11cbiAgdGhpcy5jbXAgPSBjbXBcbn1cblxuU29ydGVkQXJyYXkucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgdmFyIGluZGV4ID0gc2VhcmNoKHRoaXMuYXJyLCBlbGVtZW50LCB0aGlzLmNtcClcbiAgaWYgKGluZGV4IDwgMClcbiAgICBpbmRleCA9IH5pbmRleFxuXG4gIHRoaXMuYXJyLnNwbGljZShpbmRleCwgMCwgZWxlbWVudClcbn1cblxuU29ydGVkQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gIHZhciBpbmRleCA9IHNlYXJjaCh0aGlzLmFyciwgZWxlbWVudCwgdGhpcy5jbXApXG4gIHJldHVybiBpbmRleCA+PSAwXG4gICAgPyBpbmRleFxuICAgIDogLTFcbn1cblxuU29ydGVkQXJyYXkucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgdmFyIGluZGV4ID0gc2VhcmNoKHRoaXMuYXJyLCBlbGVtZW50LCB0aGlzLmNtcClcbiAgaWYgKGluZGV4IDwgMClcbiAgICByZXR1cm4gZmFsc2VcblxuICB0aGlzLmFyci5zcGxpY2UoaW5kZXgsIDEpXG4gIHJldHVybiB0cnVlXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGhheXN0YWNrLCBuZWVkbGUsIGNvbXBhcmF0b3IsIGxvdywgaGlnaCkge1xuICB2YXIgbWlkLCBjbXA7XG5cbiAgaWYobG93ID09PSB1bmRlZmluZWQpXG4gICAgbG93ID0gMDtcblxuICBlbHNlIHtcbiAgICBsb3cgPSBsb3d8MDtcbiAgICBpZihsb3cgPCAwIHx8IGxvdyA+PSBoYXlzdGFjay5sZW5ndGgpXG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcImludmFsaWQgbG93ZXIgYm91bmRcIik7XG4gIH1cblxuICBpZihoaWdoID09PSB1bmRlZmluZWQpXG4gICAgaGlnaCA9IGhheXN0YWNrLmxlbmd0aCAtIDE7XG5cbiAgZWxzZSB7XG4gICAgaGlnaCA9IGhpZ2h8MDtcbiAgICBpZihoaWdoIDwgbG93IHx8IGhpZ2ggPj0gaGF5c3RhY2subGVuZ3RoKVxuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJpbnZhbGlkIHVwcGVyIGJvdW5kXCIpO1xuICB9XG5cbiAgd2hpbGUobG93IDw9IGhpZ2gpIHtcbiAgICAvKiBOb3RlIHRoYXQgXCIobG93ICsgaGlnaCkgPj4+IDFcIiBtYXkgb3ZlcmZsb3csIGFuZCByZXN1bHRzIGluIGEgdHlwZWNhc3RcbiAgICAgKiB0byBkb3VibGUgKHdoaWNoIGdpdmVzIHRoZSB3cm9uZyByZXN1bHRzKS4gKi9cbiAgICBtaWQgPSBsb3cgKyAoaGlnaCAtIGxvdyA+PiAxKTtcbiAgICBjbXAgPSArY29tcGFyYXRvcihoYXlzdGFja1ttaWRdLCBuZWVkbGUpO1xuXG4gICAgLyogVG9vIGxvdy4gKi9cbiAgICBpZihjbXAgPCAwLjApIFxuICAgICAgbG93ICA9IG1pZCArIDE7XG5cbiAgICAvKiBUb28gaGlnaC4gKi9cbiAgICBlbHNlIGlmKGNtcCA+IDAuMClcbiAgICAgIGhpZ2ggPSBtaWQgLSAxO1xuICAgIFxuICAgIC8qIEtleSBmb3VuZC4gKi9cbiAgICBlbHNlXG4gICAgICByZXR1cm4gbWlkO1xuICB9XG5cbiAgLyogS2V5IG5vdCBmb3VuZC4gKi9cbiAgcmV0dXJuIH5sb3c7XG59XG4iLCJ2YXIgU29ydGVkQXJyYXkgPSByZXF1aXJlKCdzb3J0ZWQtY21wLWFycmF5Jyk7XG52YXIgQ29tcGFyYXRvciA9IHJlcXVpcmUoJy4vdnZ3ZWVudHJ5LmpzJykuQ29tcGFyYXRvcjtcbnZhciBWVndFRW50cnkgPSByZXF1aXJlKCcuL3Z2d2VlbnRyeS5qcycpO1xuXG4vKipcbiAqIFxcY2xhc3MgVlZ3RVxuICogXFxicmllZiBjbGFzcyB2ZXJzaW9uIHZlY3RvciB3aXRoIGV4Y2VwdGlvbiBrZWVwcyB0cmFjayBvZiBldmVudHMgaW4gYSBcbiAqIGNvbmNpc2Ugd2F5XG4gKiBcXHBhcmFtIGUgdGhlIGVudHJ5IGNob3NlbiBieSB0aGUgbG9jYWwgc2l0ZSAoMSBlbnRyeSA8LT4gMSBzaXRlKVxuICovXG5mdW5jdGlvbiBWVndFKGUpe1xuICAgIHRoaXMubG9jYWwgPSBuZXcgVlZ3RUVudHJ5KGUpO1xuICAgIHRoaXMudmVjdG9yID0gbmV3IFNvcnRlZEFycmF5KENvbXBhcmF0b3IpO1xuICAgIHRoaXMudmVjdG9yLmluc2VydCh0aGlzLmxvY2FsKTtcbn07XG5cbi8qIVxuICogXFxicmllZiBjbG9uZSBvZiB0aGlzIHZ2d2VcbiAqL1xuVlZ3RS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpe1xuICAgIHZhciBjbG9uZVZWd0UgPSBuZXcgVlZ3RSh0aGlzLmxvY2FsLmUpO1xuICAgIGZvciAodmFyIGk9MDsgaTx0aGlzLnZlY3Rvci5hcnIubGVuZ3RoOyArK2kpe1xuICAgICAgICBjbG9uZVZWd0UudmVjdG9yLmFycltpXSA9IG5ldyBWVndFRW50cnkodGhpcy52ZWN0b3IuYXJyW2ldLmUpO1xuICAgICAgICBjbG9uZVZWd0UudmVjdG9yLmFycltpXS52ID0gdGhpcy52ZWN0b3IuYXJyW2ldLnY7XG4gICAgICAgIGZvciAodmFyIGo9MDsgajx0aGlzLnZlY3Rvci5hcnJbaV0ueC5sZW5ndGg7ICsrail7XG4gICAgICAgICAgICBjbG9uZVZWd0UudmVjdG9yLmFycltpXS54LnB1c2godGhpcy52ZWN0b3IuYXJyW2ldLnhbal0pO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoY2xvbmVWVndFLnZlY3Rvci5hcnJbaV0uZSA9PT0gdGhpcy5sb2NhbC5lKXtcbiAgICAgICAgICAgIGNsb25lVlZ3RS5sb2NhbCA9IGNsb25lVlZ3RS52ZWN0b3IuYXJyW2ldO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIGNsb25lVlZ3RTtcbn07XG5cblZWd0UucHJvdG90eXBlLmZyb21KU09OID0gZnVuY3Rpb24ob2JqZWN0KXtcbiAgICBmb3IgKHZhciBpPTA7IGk8b2JqZWN0LnZlY3Rvci5hcnIubGVuZ3RoOyArK2kpe1xuICAgICAgICB0aGlzLnZlY3Rvci5hcnJbaV0gPSBuZXcgVlZ3RUVudHJ5KG9iamVjdC52ZWN0b3IuYXJyW2ldLmUpO1xuICAgICAgICB0aGlzLnZlY3Rvci5hcnJbaV0udiA9IG9iamVjdC52ZWN0b3IuYXJyW2ldLnY7XG4gICAgICAgIGZvciAodmFyIGo9MDsgajxvYmplY3QudmVjdG9yLmFycltpXS54Lmxlbmd0aDsgKytqKXtcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLmFycltpXS54LnB1c2gob2JqZWN0LnZlY3Rvci5hcnJbaV0ueFtqXSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChvYmplY3QudmVjdG9yLmFycltpXS5lID09PSBvYmplY3QubG9jYWwuZSl7XG4gICAgICAgICAgICB0aGlzLmxvY2FsID0gdGhpcy52ZWN0b3IuYXJyW2ldO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFxcYnJpZWYgaW5jcmVtZW50IHRoZSBlbnRyeSBvZiB0aGUgdmVjdG9yIG9uIGxvY2FsIHVwZGF0ZVxuICogXFxyZXR1cm4ge19lOiBlbnRyeSwgX2M6IGNvdW50ZXJ9IHVuaXF1ZWx5IGlkZW50aWZ5aW5nIHRoZSBvcGVyYXRpb25cbiAqL1xuVlZ3RS5wcm90b3R5cGUuaW5jcmVtZW50ID0gZnVuY3Rpb24oKXtcbiAgICB0aGlzLmxvY2FsLmluY3JlbWVudCgpO1xuICAgIHJldHVybiB7X2U6IHRoaXMubG9jYWwuZSwgX2M6dGhpcy5sb2NhbC52fTsgXG59O1xuXG5cbi8qKlxuICogXFxicmllZiBpbmNyZW1lbnQgZnJvbSBhIHJlbW90ZSBvcGVyYXRpb25cbiAqIFxccGFyYW0gZWMgdGhlIGVudHJ5IGFuZCBjbG9jayBvZiB0aGUgcmVjZWl2ZWQgZXZlbnQgdG8gYWRkIHN1cHBvc2VkbHkgcmR5XG4gKiB0aGUgdHlwZSBpcyB7X2U6IGVudHJ5LCBfYzogY291bnRlcn1cbiAqL1xuVlZ3RS5wcm90b3R5cGUuaW5jcmVtZW50RnJvbSA9IGZ1bmN0aW9uIChlYyl7XG4gICAgaWYgKCFlYyB8fCAoZWMgJiYgIWVjLl9lKSB8fCAoZWMgJiYgIWVjLl9jKSkge3JldHVybjt9XG4gICAgLy8gIzAgZmluZCB0aGUgZW50cnkgd2l0aGluIHRoZSBhcnJheSBvZiBWVndFbnRyaWVzXG4gICAgdmFyIGluZGV4ID0gdGhpcy52ZWN0b3IuaW5kZXhPZihlYy5fZSk7XG4gICAgaWYgKGluZGV4IDwgMCl7XG4gICAgICAgIC8vICMxIGlmIHRoZSBlbnRyeSBkb2VzIG5vdCBleGlzdCwgaW5pdGlhbGl6ZSBhbmQgaW5jcmVtZW50XG4gICAgICAgIHRoaXMudmVjdG9yLmluc2VydChuZXcgVlZ3RUVudHJ5KGVjLl9lKSk7XG4gICAgICAgIHRoaXMudmVjdG9yLmFyclt0aGlzLnZlY3Rvci5pbmRleE9mKGVjLl9lKV0uaW5jcmVtZW50RnJvbShlYy5fYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gIzIgb3RoZXJ3aXNlLCBvbmx5IGluY3JlbWVudFxuICAgICAgICB0aGlzLnZlY3Rvci5hcnJbaW5kZXhdLmluY3JlbWVudEZyb20oZWMuX2MpO1xuICAgIH07XG59O1xuXG5cbi8qKlxuICogXFxicmllZiBjaGVjayBpZiB0aGUgYXJndW1lbnQgYXJlIGNhdXNhbGx5IHJlYWR5IHJlZ2FyZHMgdG8gdGhpcyB2ZWN0b3JcbiAqIFxccGFyYW0gZWMgdGhlIHNpdGUgY2xvY2sgdGhhdCBoYXBwZW4tYmVmb3JlIHRoZSBjdXJyZW50IGV2ZW50XG4gKi9cblZWd0UucHJvdG90eXBlLmlzUmVhZHkgPSBmdW5jdGlvbihlYyl7XG4gICAgdmFyIHJlYWR5ID0gIWVjO1xuICAgIGlmICghcmVhZHkpe1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnZlY3Rvci5pbmRleE9mKGVjLl9lKTtcbiAgICAgICAgcmVhZHkgPSBpbmRleCA+PTAgJiYgZWMuX2MgPD0gdGhpcy52ZWN0b3IuYXJyW2luZGV4XS52ICYmXG4gICAgICAgICAgICB0aGlzLnZlY3Rvci5hcnJbaW5kZXhdLnguaW5kZXhPZihlYy5fYyk8MDtcbiAgICB9O1xuICAgIHJldHVybiByZWFkeTtcbn07XG5cbi8qKlxuICogXFxicmllZiBjaGVjayBpZiB0aGUgbWVzc2FnZSBjb250YWlucyBpbmZvcm1hdGlvbiBhbHJlYWR5IGRlbGl2ZXJlZFxuICogXFxwYXJhbSBlYyB0aGUgc2l0ZSBjbG9jayB0byBjaGVja1xuICovXG5WVndFLnByb3RvdHlwZS5pc0xvd2VyID0gZnVuY3Rpb24oZWMpe1xuICAgIHJldHVybiAoZWMgJiYgdGhpcy5pc1JlYWR5KGVjKSk7XG59O1xuXG4vKipcbiAqIFxcYnJpZWYgbWVyZ2UgdGhlIHZlcnNpb24gdmVjdG9yIGluIGFyZ3VtZW50IHdpdGggdGhpc1xuICogXFxwYXJhbSBvdGhlciB0aGUgb3RoZXIgdmVyc2lvbiB2ZWN0b3IgdG8gbWVyZ2VcbiAqL1xuVlZ3RS5wcm90b3R5cGUubWVyZ2UgPSBmdW5jdGlvbihvdGhlcil7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvdGhlci52ZWN0b3IuYXJyLmxlbmd0aDsgKytpKXtcbiAgICAgICAgdmFyIGVudHJ5ID0gb3RoZXIudmVjdG9yLmFycltpXTtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy52ZWN0b3IuaW5kZXhPZihlbnRyeSk7XG4gICAgICAgIGlmIChpbmRleCA8IDApe1xuICAgICAgICAgICAgLy8gIzEgZW50cnkgZG9lcyBub3QgZXhpc3QsIGZ1bGx5IGNvcHkgaXRcbiAgICAgICAgICAgIHZhciBuZXdFbnRyeSA9IG5ldyBWVndFRW50cnkoZW50cnkuZSk7XG4gICAgICAgICAgICBuZXdFbnRyeS52ID0gZW50cnkudjtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZW50cnkueC5sZW5ndGg7ICsrail7XG4gICAgICAgICAgICAgICAgbmV3RW50cnkueC5wdXNoKGVudHJ5Lnhbal0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLmluc2VydChuZXdFbnRyeSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8gIzIgb3RoZXJ3aXNlIG1lcmdlIHRoZSBlbnRyaWVzXG4gICAgICAgICAgICB2YXIgY3VyckVudHJ5ID0gdGhpcy52ZWN0b3IuYXJyW2ldO1xuICAgICAgICAgICAgLy8gIzJBIHJlbW92ZSB0aGUgZXhjZXB0aW9uIGZyb20gb3VyIHZlY3RvclxuICAgICAgICAgICAgdmFyIGogPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGo8Y3VyckVudHJ5LngubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBpZiAoY3VyckVudHJ5Lnhbal08ZW50cnkudiAmJlxuICAgICAgICAgICAgICAgICAgICBlbnRyeS54LmluZGV4T2YoY3VyckVudHJ5Lnhbal0pPDApe1xuICAgICAgICAgICAgICAgICAgICBjdXJyRW50cnkueC5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgKytqO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gIzJCIGFkZCB0aGUgbmV3IGV4Y2VwdGlvbnNcbiAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGo8ZW50cnkueC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS54W2pdID4gY3VyckVudHJ5LnYgJiZcbiAgICAgICAgICAgICAgICAgICAgY3VyckVudHJ5LnguaW5kZXhPZihlbnRyeS54W2pdKTwwKXtcbiAgICAgICAgICAgICAgICAgICAgY3VyckVudHJ5LngucHVzaChlbnRyeS54W2pdKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICsrajtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjdXJyRW50cnkudiA9IE1hdGgubWF4KGN1cnJFbnRyeS52LCBlbnRyeS52KTtcbiAgICAgICAgfTtcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBWVndFO1xuXG4iLCJcbi8qIVxuICBcXGJyaWVmIGNyZWF0ZSBhbiBlbnRyeSBvZiB0aGUgdmVyc2lvbiB2ZWN0b3Igd2l0aCBleGNlcHRpb25zIGNvbnRhaW5pbmcgdGhlXG4gIGluZGV4IG9mIHRoZSBlbnRyeSwgdGhlIHZhbHVlIHYgdGhhdCBjcmVhdGVzIGEgY29udGlndW91cyBpbnRlcnZhbFxuICBmcm9tIDAgdG8gdiwgYW4gYXJyYXkgb2YgaW50ZWdlcnMgdGhhdCBjb250YWluIHRoZSBvcGVyYXRpb25zIGxvd2VyIHRvIHYgdGhhdFxuICBoYXZlIG5vdCBiZWVuIHJlY2VpdmVkIHlldFxuICBcXHBhcmFtIGUgdGhlIGVudHJ5IGluIHRoZSBpbnRlcnZhbCB2ZXJzaW9uIHZlY3RvclxuKi9cbmZ1bmN0aW9uIFZWd0VFbnRyeShlKXtcbiAgICB0aGlzLmUgPSBlOyAgIFxuICAgIHRoaXMudiA9IDA7XG4gICAgdGhpcy54ID0gW107XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgbG9jYWwgY291bnRlciBpbmNyZW1lbnRlZFxuICovXG5WVndFRW50cnkucHJvdG90eXBlLmluY3JlbWVudCA9IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy52ICs9IDE7XG59O1xuXG4vKipcbiAqIFxcYnJpZWYgaW5jcmVtZW50IGZyb20gYSByZW1vdGUgb3BlcmF0aW9uXG4gKiBcXHBhcmFtIGMgdGhlIGNvdW50ZXIgb2YgdGhlIG9wZXJhdGlvbiB0byBhZGQgdG8gdGhpcyBcbiAqL1xuVlZ3RUVudHJ5LnByb3RvdHlwZS5pbmNyZW1lbnRGcm9tID0gZnVuY3Rpb24oYyl7XG4gICAgLy8gIzEgY2hlY2sgaWYgdGhlIGNvdW50ZXIgaXMgaW5jbHVkZWQgaW4gdGhlIGV4Y2VwdGlvbnNcbiAgICBpZiAoYyA8IHRoaXMudil7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMueC5pbmRleE9mKGMpO1xuICAgICAgICBpZiAoaW5kZXg+PTApeyAvLyB0aGUgZXhjZXB0aW9uIGlzIGZvdW5kXG4gICAgICAgICAgICB0aGlzLnguc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8vICMyIGlmIHRoZSB2YWx1ZSBpcyArMSBjb21wYXJlZCB0byB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgdmVjdG9yXG4gICAgaWYgKGMgPT0gKHRoaXMudiArIDEpKXtcbiAgICAgICAgdGhpcy52ICs9IDE7XG4gICAgfTtcbiAgICAvLyAjMyBvdGhlcndpc2UgZXhjZXB0aW9uIGFyZSBtYWRlXG4gICAgaWYgKGMgPiAodGhpcy52ICsgMSkpe1xuICAgICAgICBmb3IgKHZhciBpID0gKHRoaXMudiArIDEpOyBpPGM7ICsraSl7XG4gICAgICAgICAgICB0aGlzLngucHVzaChpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy52ID0gYztcbiAgICB9O1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGNvbXBhcmlzb24gZnVuY3Rpb24gYmV0d2VlbiB0d28gVlZ3RSBlbnRyaWVzXG4gKiBcXHBhcmFtIGEgdGhlIGZpcnN0IGVsZW1lbnRcbiAqIFxccGFyYW0gYiB0aGUgc2Vjb25kIGVsZW1lbnRcbiAqIFxccmV0dXJuIC0xIGlmIGEgPCBiLCAxIGlmIGEgPiBiLCAwIG90aGVyd2lzZVxuICovXG5mdW5jdGlvbiBDb21wYXJhdG9yIChhLCBiKXtcbiAgICB2YXIgYUVudHJ5ID0gKGEuZSkgfHwgYTtcbiAgICB2YXIgYkVudHJ5ID0gKGIuZSkgfHwgYjtcbiAgICBpZiAoYUVudHJ5IDwgYkVudHJ5KXsgcmV0dXJuIC0xOyB9O1xuICAgIGlmIChhRW50cnkgPiBiRW50cnkpeyByZXR1cm4gIDE7IH07XG4gICAgcmV0dXJuIDA7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZWd0VFbnRyeTtcbm1vZHVsZS5leHBvcnRzLkNvbXBhcmF0b3IgPSBDb21wYXJhdG9yO1xuIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzLWFycmF5JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxudmFyIGtNYXhMZW5ndGggPSAweDNmZmZmZmZmXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIE5vdGU6XG4gKlxuICogLSBJbXBsZW1lbnRhdGlvbiBtdXN0IHN1cHBvcnQgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMuXG4gKiAgIEZpcmVmb3ggNC0yOSBsYWNrZWQgc3VwcG9ydCwgZml4ZWQgaW4gRmlyZWZveCAzMCsuXG4gKiAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4LlxuICpcbiAqICAtIENocm9tZSA5LTEwIGlzIG1pc3NpbmcgdGhlIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24uXG4gKlxuICogIC0gSUUxMCBoYXMgYSBicm9rZW4gYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFycmF5cyBvZlxuICogICAgaW5jb3JyZWN0IGxlbmd0aCBpbiBzb21lIHNpdHVhdGlvbnMuXG4gKlxuICogV2UgZGV0ZWN0IHRoZXNlIGJ1Z2d5IGJyb3dzZXJzIGFuZCBzZXQgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYCB0byBgZmFsc2VgIHNvIHRoZXkgd2lsbFxuICogZ2V0IHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24sIHdoaWNoIGlzIHNsb3dlciBidXQgd2lsbCB3b3JrIGNvcnJlY3RseS5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSAoZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMClcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoYnVmKVxuICAgIGFyci5mb28gPSBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9XG4gICAgcmV0dXJuIDQyID09PSBhcnIuZm9vKCkgJiYgLy8gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWRcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAmJiAvLyBjaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgICAgICAgbmV3IFVpbnQ4QXJyYXkoMSkuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn0pKClcblxuLyoqXG4gKiBDbGFzczogQnVmZmVyXG4gKiA9PT09PT09PT09PT09XG4gKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBhcmUgYXVnbWVudGVkXG4gKiB3aXRoIGZ1bmN0aW9uIHByb3BlcnRpZXMgZm9yIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBBUEkgZnVuY3Rpb25zLiBXZSB1c2VcbiAqIGBVaW50OEFycmF5YCBzbyB0aGF0IHNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0IHJldHVybnNcbiAqIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIEJ5IGF1Z21lbnRpbmcgdGhlIGluc3RhbmNlcywgd2UgY2FuIGF2b2lkIG1vZGlmeWluZyB0aGUgYFVpbnQ4QXJyYXlgXG4gKiBwcm90b3R5cGUuXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlciAoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSlcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKVxuXG4gIHZhciB0eXBlID0gdHlwZW9mIHN1YmplY3RcblxuICAvLyBGaW5kIHRoZSBsZW5ndGhcbiAgdmFyIGxlbmd0aFxuICBpZiAodHlwZSA9PT0gJ251bWJlcicpXG4gICAgbGVuZ3RoID0gc3ViamVjdCA+IDAgPyBzdWJqZWN0ID4+PiAwIDogMFxuICBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgIGlmIChlbmNvZGluZyA9PT0gJ2Jhc2U2NCcpXG4gICAgICBzdWJqZWN0ID0gYmFzZTY0Y2xlYW4oc3ViamVjdClcbiAgICBsZW5ndGggPSBCdWZmZXIuYnl0ZUxlbmd0aChzdWJqZWN0LCBlbmNvZGluZylcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0JyAmJiBzdWJqZWN0ICE9PSBudWxsKSB7IC8vIGFzc3VtZSBvYmplY3QgaXMgYXJyYXktbGlrZVxuICAgIGlmIChzdWJqZWN0LnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkoc3ViamVjdC5kYXRhKSlcbiAgICAgIHN1YmplY3QgPSBzdWJqZWN0LmRhdGFcbiAgICBsZW5ndGggPSArc3ViamVjdC5sZW5ndGggPiAwID8gTWF0aC5mbG9vcigrc3ViamVjdC5sZW5ndGgpIDogMFxuICB9IGVsc2VcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtdXN0IHN0YXJ0IHdpdGggbnVtYmVyLCBidWZmZXIsIGFycmF5IG9yIHN0cmluZycpXG5cbiAgaWYgKHRoaXMubGVuZ3RoID4ga01heExlbmd0aClcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICdzaXplOiAweCcgKyBrTWF4TGVuZ3RoLnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuXG4gIHZhciBidWZcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUHJlZmVycmVkOiBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIGJ1ZiA9IEJ1ZmZlci5fYXVnbWVudChuZXcgVWludDhBcnJheShsZW5ndGgpKVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gVEhJUyBpbnN0YW5jZSBvZiBCdWZmZXIgKGNyZWF0ZWQgYnkgYG5ld2ApXG4gICAgYnVmID0gdGhpc1xuICAgIGJ1Zi5sZW5ndGggPSBsZW5ndGhcbiAgICBidWYuX2lzQnVmZmVyID0gdHJ1ZVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmIHR5cGVvZiBzdWJqZWN0LmJ5dGVMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgLy8gU3BlZWQgb3B0aW1pemF0aW9uIC0tIHVzZSBzZXQgaWYgd2UncmUgY29weWluZyBmcm9tIGEgdHlwZWQgYXJyYXlcbiAgICBidWYuX3NldChzdWJqZWN0KVxuICB9IGVsc2UgaWYgKGlzQXJyYXlpc2goc3ViamVjdCkpIHtcbiAgICAvLyBUcmVhdCBhcnJheS1pc2ggb2JqZWN0cyBhcyBhIGJ5dGUgYXJyYXlcbiAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXG4gICAgICAgIGJ1ZltpXSA9IHN1YmplY3QucmVhZFVJbnQ4KGkpXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKylcbiAgICAgICAgYnVmW2ldID0gKChzdWJqZWN0W2ldICUgMjU2KSArIDI1NikgJSAyNTZcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBidWYud3JpdGUoc3ViamVjdCwgMCwgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmICFub1plcm8pIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ1ZltpXSA9IDBcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIChiKSB7XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSlcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuICYmIGFbaV0gPT09IGJbaV07IGkrKykge31cbiAgaWYgKGkgIT09IGxlbikge1xuICAgIHggPSBhW2ldXG4gICAgeSA9IGJbaV1cbiAgfVxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICdyYXcnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gKGxpc3QsIHRvdGFsTGVuZ3RoKSB7XG4gIGlmICghaXNBcnJheShsaXN0KSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVXNhZ2U6IEJ1ZmZlci5jb25jYXQobGlzdFssIGxlbmd0aF0pJylcblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcigwKVxuICB9IGVsc2UgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGxpc3RbMF1cbiAgfVxuXG4gIHZhciBpXG4gIGlmICh0b3RhbExlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdG90YWxMZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvdGFsTGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIodG90YWxMZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgaXRlbS5jb3B5KGJ1ZiwgcG9zKVxuICAgIHBvcyArPSBpdGVtLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZcbn1cblxuQnVmZmVyLmJ5dGVMZW5ndGggPSBmdW5jdGlvbiAoc3RyLCBlbmNvZGluZykge1xuICB2YXIgcmV0XG4gIHN0ciA9IHN0ciArICcnXG4gIHN3aXRjaCAoZW5jb2RpbmcgfHwgJ3V0ZjgnKSB7XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAncmF3JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggKiAyXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoID4+PiAxXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IHV0ZjhUb0J5dGVzKHN0cikubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBiYXNlNjRUb0J5dGVzKHN0cikubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG4vLyBwcmUtc2V0IGZvciB2YWx1ZXMgdGhhdCBtYXkgZXhpc3QgaW4gdGhlIGZ1dHVyZVxuQnVmZmVyLnByb3RvdHlwZS5sZW5ndGggPSB1bmRlZmluZWRcbkJ1ZmZlci5wcm90b3R5cGUucGFyZW50ID0gdW5kZWZpbmVkXG5cbi8vIHRvU3RyaW5nKGVuY29kaW5nLCBzdGFydD0wLCBlbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA9PT0gSW5maW5pdHkgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG4gIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmIChlbmQgPD0gc3RhcnQpIHJldHVybiAnJ1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGJpbmFyeVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSlcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKGIpIHtcbiAgaWYoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5tYXRjaCgvLnsyfS9nKS5qb2luKCcgJylcbiAgICBpZiAodGhpcy5sZW5ndGggPiBtYXgpXG4gICAgICBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpXG59XG5cbi8vIGBnZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5nZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLnJlYWRVSW50OChvZmZzZXQpXG59XG5cbi8vIGBzZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2LCBvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLndyaXRlVUludDgodiwgb2Zmc2V0KVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhciBieXRlID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChpc05hTihieXRlKSkgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IGJ5dGVcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBiaW5hcnlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gdXRmMTZsZVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIFN1cHBvcnQgYm90aCAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpXG4gIC8vIGFuZCB0aGUgbGVnYWN5IChzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBpZiAoIWlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIH0gZWxzZSB7ICAvLyBsZWdhY3lcbiAgICB2YXIgc3dhcCA9IGVuY29kaW5nXG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBvZmZzZXQgPSBsZW5ndGhcbiAgICBsZW5ndGggPSBzd2FwXG4gIH1cblxuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKVxuXG4gIHZhciByZXRcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gYmluYXJ5V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSB1dGYxNmxlV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmVzID0gJydcbiAgdmFyIHRtcCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIGlmIChidWZbaV0gPD0gMHg3Rikge1xuICAgICAgcmVzICs9IGRlY29kZVV0ZjhDaGFyKHRtcCkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgICAgIHRtcCA9ICcnXG4gICAgfSBlbHNlIHtcbiAgICAgIHRtcCArPSAnJScgKyBidWZbaV0udG9TdHJpbmcoMTYpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcyArIGRlY29kZVV0ZjhDaGFyKHRtcClcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBiaW5hcnlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiBhc2NpaVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZClcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuO1xuICAgIGlmIChzdGFydCA8IDApXG4gICAgICBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMClcbiAgICAgIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydClcbiAgICBlbmQgPSBzdGFydFxuXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHJldHVybiBCdWZmZXIuX2F1Z21lbnQodGhpcy5zdWJhcnJheShzdGFydCwgZW5kKSlcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIHZhciBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQsIHRydWUpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgaSsrKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gICAgcmV0dXJuIG5ld0J1ZlxuICB9XG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKVxuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKVxuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpXG4gICAgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdidWZmZXIgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsdWUgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICB0aGlzW29mZnNldF0gPSB2YWx1ZVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCAyKTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSB2YWx1ZVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9IHZhbHVlXG4gIH0gZWxzZSBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDQpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0XSA9IHZhbHVlXG4gIH0gZWxzZSBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSB2YWx1ZVxuICB9IGVsc2Ugb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSB2YWx1ZVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9IHZhbHVlXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSB2YWx1ZVxuICB9IGVsc2Ugb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSB2YWx1ZVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIH0gZWxzZSBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gdmFsdWVcbiAgfSBlbHNlIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbHVlIGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFR5cGVFcnJvcignaW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRfc3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXNcblxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAoIXRhcmdldF9zdGFydCkgdGFyZ2V0X3N0YXJ0ID0gMFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHNvdXJjZS5sZW5ndGggPT09IDApIHJldHVyblxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKGVuZCA8IHN0YXJ0KSB0aHJvdyBuZXcgVHlwZUVycm9yKCdzb3VyY2VFbmQgPCBzb3VyY2VTdGFydCcpXG4gIGlmICh0YXJnZXRfc3RhcnQgPCAwIHx8IHRhcmdldF9zdGFydCA+PSB0YXJnZXQubGVuZ3RoKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHNvdXJjZS5sZW5ndGgpIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCB8fCBlbmQgPiBzb3VyY2UubGVuZ3RoKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKVxuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0IDwgZW5kIC0gc3RhcnQpXG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCArIHN0YXJ0XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG5cbiAgaWYgKGxlbiA8IDEwMDAgfHwgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRfc3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRhcmdldC5fc2V0KHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSwgdGFyZ2V0X3N0YXJ0KVxuICB9XG59XG5cbi8vIGZpbGwodmFsdWUsIHN0YXJ0PTAsIGVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gKHZhbHVlLCBzdGFydCwgZW5kKSB7XG4gIGlmICghdmFsdWUpIHZhbHVlID0gMFxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQpIGVuZCA9IHRoaXMubGVuZ3RoXG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmQgPCBzdGFydCcpXG5cbiAgLy8gRmlsbCAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdzdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDAgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuZCBvdXQgb2YgYm91bmRzJylcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIHRoaXNbaV0gPSB2YWx1ZVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYnl0ZXMgPSB1dGY4VG9CeXRlcyh2YWx1ZS50b1N0cmluZygpKVxuICAgIHZhciBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICB0aGlzW2ldID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYEFycmF5QnVmZmVyYCB3aXRoIHRoZSAqY29waWVkKiBtZW1vcnkgb2YgdGhlIGJ1ZmZlciBpbnN0YW5jZS5cbiAqIEFkZGVkIGluIE5vZGUgMC4xMi4gT25seSBhdmFpbGFibGUgaW4gYnJvd3NlcnMgdGhhdCBzdXBwb3J0IEFycmF5QnVmZmVyLlxuICovXG5CdWZmZXIucHJvdG90eXBlLnRvQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAgIHJldHVybiAobmV3IEJ1ZmZlcih0aGlzKSkuYnVmZmVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBidWYgPSBuZXcgVWludDhBcnJheSh0aGlzLmxlbmd0aClcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBidWYubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgYnVmW2ldID0gdGhpc1tpXVxuICAgICAgfVxuICAgICAgcmV0dXJuIGJ1Zi5idWZmZXJcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQnVmZmVyLnRvQXJyYXlCdWZmZXIgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXInKVxuICB9XG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIEJQID0gQnVmZmVyLnByb3RvdHlwZVxuXG4vKipcbiAqIEF1Z21lbnQgYSBVaW50OEFycmF5ICppbnN0YW5jZSogKG5vdCB0aGUgVWludDhBcnJheSBjbGFzcyEpIHdpdGggQnVmZmVyIG1ldGhvZHNcbiAqL1xuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuY29uc3RydWN0b3IgPSBCdWZmZXJcbiAgYXJyLl9pc0J1ZmZlciA9IHRydWVcblxuICAvLyBzYXZlIHJlZmVyZW5jZSB0byBvcmlnaW5hbCBVaW50OEFycmF5IGdldC9zZXQgbWV0aG9kcyBiZWZvcmUgb3ZlcndyaXRpbmdcbiAgYXJyLl9nZXQgPSBhcnIuZ2V0XG4gIGFyci5fc2V0ID0gYXJyLnNldFxuXG4gIC8vIGRlcHJlY2F0ZWQsIHdpbGwgYmUgcmVtb3ZlZCBpbiBub2RlIDAuMTMrXG4gIGFyci5nZXQgPSBCUC5nZXRcbiAgYXJyLnNldCA9IEJQLnNldFxuXG4gIGFyci53cml0ZSA9IEJQLndyaXRlXG4gIGFyci50b1N0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0xvY2FsZVN0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0pTT04gPSBCUC50b0pTT05cbiAgYXJyLmVxdWFscyA9IEJQLmVxdWFsc1xuICBhcnIuY29tcGFyZSA9IEJQLmNvbXBhcmVcbiAgYXJyLmNvcHkgPSBCUC5jb3B5XG4gIGFyci5zbGljZSA9IEJQLnNsaWNlXG4gIGFyci5yZWFkVUludDggPSBCUC5yZWFkVUludDhcbiAgYXJyLnJlYWRVSW50MTZMRSA9IEJQLnJlYWRVSW50MTZMRVxuICBhcnIucmVhZFVJbnQxNkJFID0gQlAucmVhZFVJbnQxNkJFXG4gIGFyci5yZWFkVUludDMyTEUgPSBCUC5yZWFkVUludDMyTEVcbiAgYXJyLnJlYWRVSW50MzJCRSA9IEJQLnJlYWRVSW50MzJCRVxuICBhcnIucmVhZEludDggPSBCUC5yZWFkSW50OFxuICBhcnIucmVhZEludDE2TEUgPSBCUC5yZWFkSW50MTZMRVxuICBhcnIucmVhZEludDE2QkUgPSBCUC5yZWFkSW50MTZCRVxuICBhcnIucmVhZEludDMyTEUgPSBCUC5yZWFkSW50MzJMRVxuICBhcnIucmVhZEludDMyQkUgPSBCUC5yZWFkSW50MzJCRVxuICBhcnIucmVhZEZsb2F0TEUgPSBCUC5yZWFkRmxvYXRMRVxuICBhcnIucmVhZEZsb2F0QkUgPSBCUC5yZWFkRmxvYXRCRVxuICBhcnIucmVhZERvdWJsZUxFID0gQlAucmVhZERvdWJsZUxFXG4gIGFyci5yZWFkRG91YmxlQkUgPSBCUC5yZWFkRG91YmxlQkVcbiAgYXJyLndyaXRlVUludDggPSBCUC53cml0ZVVJbnQ4XG4gIGFyci53cml0ZVVJbnQxNkxFID0gQlAud3JpdGVVSW50MTZMRVxuICBhcnIud3JpdGVVSW50MTZCRSA9IEJQLndyaXRlVUludDE2QkVcbiAgYXJyLndyaXRlVUludDMyTEUgPSBCUC53cml0ZVVJbnQzMkxFXG4gIGFyci53cml0ZVVJbnQzMkJFID0gQlAud3JpdGVVSW50MzJCRVxuICBhcnIud3JpdGVJbnQ4ID0gQlAud3JpdGVJbnQ4XG4gIGFyci53cml0ZUludDE2TEUgPSBCUC53cml0ZUludDE2TEVcbiAgYXJyLndyaXRlSW50MTZCRSA9IEJQLndyaXRlSW50MTZCRVxuICBhcnIud3JpdGVJbnQzMkxFID0gQlAud3JpdGVJbnQzMkxFXG4gIGFyci53cml0ZUludDMyQkUgPSBCUC53cml0ZUludDMyQkVcbiAgYXJyLndyaXRlRmxvYXRMRSA9IEJQLndyaXRlRmxvYXRMRVxuICBhcnIud3JpdGVGbG9hdEJFID0gQlAud3JpdGVGbG9hdEJFXG4gIGFyci53cml0ZURvdWJsZUxFID0gQlAud3JpdGVEb3VibGVMRVxuICBhcnIud3JpdGVEb3VibGVCRSA9IEJQLndyaXRlRG91YmxlQkVcbiAgYXJyLmZpbGwgPSBCUC5maWxsXG4gIGFyci5pbnNwZWN0ID0gQlAuaW5zcGVjdFxuICBhcnIudG9BcnJheUJ1ZmZlciA9IEJQLnRvQXJyYXlCdWZmZXJcblxuICByZXR1cm4gYXJyXG59XG5cbnZhciBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXitcXC8wLTlBLXpdL2dcblxuZnVuY3Rpb24gYmFzZTY0Y2xlYW4gKHN0cikge1xuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyaW5ndHJpbShzdHIpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiBpc0FycmF5aXNoIChzdWJqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5KHN1YmplY3QpIHx8IEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSB8fFxuICAgICAgc3ViamVjdCAmJiB0eXBlb2Ygc3ViamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIHR5cGVvZiBzdWJqZWN0Lmxlbmd0aCA9PT0gJ251bWJlcidcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIHZhciBiID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBpZiAoYiA8PSAweDdGKSB7XG4gICAgICBieXRlQXJyYXkucHVzaChiKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3RhcnQgPSBpXG4gICAgICBpZiAoYiA+PSAweEQ4MDAgJiYgYiA8PSAweERGRkYpIGkrK1xuICAgICAgdmFyIGggPSBlbmNvZGVVUklDb21wb25lbnQoc3RyLnNsaWNlKHN0YXJ0LCBpKzEpKS5zdWJzdHIoMSkuc3BsaXQoJyUnKVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBoLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGJ5dGVBcnJheS5wdXNoKHBhcnNlSW50KGhbal0sIDE2KSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoc3RyKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSlcbiAgICAgIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gZGVjb2RlVXRmOENoYXIgKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpIC8vIFVURiA4IGludmFsaWQgY2hhclxuICB9XG59XG4iLCJ2YXIgbG9va3VwID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXG47KGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuICB2YXIgQXJyID0gKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJylcbiAgICA/IFVpbnQ4QXJyYXlcbiAgICA6IEFycmF5XG5cblx0dmFyIFBMVVMgICA9ICcrJy5jaGFyQ29kZUF0KDApXG5cdHZhciBTTEFTSCAgPSAnLycuY2hhckNvZGVBdCgwKVxuXHR2YXIgTlVNQkVSID0gJzAnLmNoYXJDb2RlQXQoMClcblx0dmFyIExPV0VSICA9ICdhJy5jaGFyQ29kZUF0KDApXG5cdHZhciBVUFBFUiAgPSAnQScuY2hhckNvZGVBdCgwKVxuXG5cdGZ1bmN0aW9uIGRlY29kZSAoZWx0KSB7XG5cdFx0dmFyIGNvZGUgPSBlbHQuY2hhckNvZGVBdCgwKVxuXHRcdGlmIChjb2RlID09PSBQTFVTKVxuXHRcdFx0cmV0dXJuIDYyIC8vICcrJ1xuXHRcdGlmIChjb2RlID09PSBTTEFTSClcblx0XHRcdHJldHVybiA2MyAvLyAnLydcblx0XHRpZiAoY29kZSA8IE5VTUJFUilcblx0XHRcdHJldHVybiAtMSAvL25vIG1hdGNoXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIgKyAxMClcblx0XHRcdHJldHVybiBjb2RlIC0gTlVNQkVSICsgMjYgKyAyNlxuXHRcdGlmIChjb2RlIDwgVVBQRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gVVBQRVJcblx0XHRpZiAoY29kZSA8IExPV0VSICsgMjYpXG5cdFx0XHRyZXR1cm4gY29kZSAtIExPV0VSICsgMjZcblx0fVxuXG5cdGZ1bmN0aW9uIGI2NFRvQnl0ZUFycmF5IChiNjQpIHtcblx0XHR2YXIgaSwgaiwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuXG5cdFx0aWYgKGI2NC5sZW5ndGggJSA0ID4gMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0Jylcblx0XHR9XG5cblx0XHQvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuXHRcdC8vIGlmIHRoZXJlIGFyZSB0d28gcGxhY2Vob2xkZXJzLCB0aGFuIHRoZSB0d28gY2hhcmFjdGVycyBiZWZvcmUgaXRcblx0XHQvLyByZXByZXNlbnQgb25lIGJ5dGVcblx0XHQvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcblx0XHQvLyB0aGlzIGlzIGp1c3QgYSBjaGVhcCBoYWNrIHRvIG5vdCBkbyBpbmRleE9mIHR3aWNlXG5cdFx0dmFyIGxlbiA9IGI2NC5sZW5ndGhcblx0XHRwbGFjZUhvbGRlcnMgPSAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMikgPyAyIDogJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDEpID8gMSA6IDBcblxuXHRcdC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuXHRcdGFyciA9IG5ldyBBcnIoYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuXHRcdGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gYjY0Lmxlbmd0aCAtIDQgOiBiNjQubGVuZ3RoXG5cblx0XHR2YXIgTCA9IDBcblxuXHRcdGZ1bmN0aW9uIHB1c2ggKHYpIHtcblx0XHRcdGFycltMKytdID0gdlxuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGogPSAwOyBpIDwgbDsgaSArPSA0LCBqICs9IDMpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTgpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgMTIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPDwgNikgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMykpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDAwMCkgPj4gMTYpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDApID4+IDgpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fVxuXG5cdFx0aWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAyKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpID4+IDQpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTApIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgNCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA+PiAyKVxuXHRcdFx0cHVzaCgodG1wID4+IDgpICYgMHhGRilcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyXG5cdH1cblxuXHRmdW5jdGlvbiB1aW50OFRvQmFzZTY0ICh1aW50OCkge1xuXHRcdHZhciBpLFxuXHRcdFx0ZXh0cmFCeXRlcyA9IHVpbnQ4Lmxlbmd0aCAlIDMsIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG5cdFx0XHRvdXRwdXQgPSBcIlwiLFxuXHRcdFx0dGVtcCwgbGVuZ3RoXG5cblx0XHRmdW5jdGlvbiBlbmNvZGUgKG51bSkge1xuXHRcdFx0cmV0dXJuIGxvb2t1cC5jaGFyQXQobnVtKVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKG51bSA+PiAxOCAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiAxMiAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiA2ICYgMHgzRikgKyBlbmNvZGUobnVtICYgMHgzRilcblx0XHR9XG5cblx0XHQvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG5cdFx0Zm9yIChpID0gMCwgbGVuZ3RoID0gdWludDgubGVuZ3RoIC0gZXh0cmFCeXRlczsgaSA8IGxlbmd0aDsgaSArPSAzKSB7XG5cdFx0XHR0ZW1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuXHRcdFx0b3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCh0ZW1wKVxuXHRcdH1cblxuXHRcdC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcblx0XHRzd2l0Y2ggKGV4dHJhQnl0ZXMpIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0dGVtcCA9IHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAyKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9PSdcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0dGVtcCA9ICh1aW50OFt1aW50OC5sZW5ndGggLSAyXSA8PCA4KSArICh1aW50OFt1aW50OC5sZW5ndGggLSAxXSlcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDEwKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wID4+IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA8PCAyKSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSAnPSdcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0XG5cdH1cblxuXHRleHBvcnRzLnRvQnl0ZUFycmF5ID0gYjY0VG9CeXRlQXJyYXlcblx0ZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gdWludDhUb0Jhc2U2NFxufSh0eXBlb2YgZXhwb3J0cyA9PT0gJ3VuZGVmaW5lZCcgPyAodGhpcy5iYXNlNjRqcyA9IHt9KSA6IGV4cG9ydHMpKVxuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24oYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSxcbiAgICAgIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDEsXG4gICAgICBlTWF4ID0gKDEgPDwgZUxlbikgLSAxLFxuICAgICAgZUJpYXMgPSBlTWF4ID4+IDEsXG4gICAgICBuQml0cyA9IC03LFxuICAgICAgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwLFxuICAgICAgZCA9IGlzTEUgPyAtMSA6IDEsXG4gICAgICBzID0gYnVmZmVyW29mZnNldCArIGldO1xuXG4gIGkgKz0gZDtcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKTtcbiAgcyA+Pj0gKC1uQml0cyk7XG4gIG5CaXRzICs9IGVMZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpO1xuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpO1xuICBlID4+PSAoLW5CaXRzKTtcbiAgbkJpdHMgKz0gbUxlbjtcbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCk7XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzO1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSk7XG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICBlID0gZSAtIGVCaWFzO1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pO1xufTtcblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjLFxuICAgICAgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMSxcbiAgICAgIGVNYXggPSAoMSA8PCBlTGVuKSAtIDEsXG4gICAgICBlQmlhcyA9IGVNYXggPj4gMSxcbiAgICAgIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKSxcbiAgICAgIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKSxcbiAgICAgIGQgPSBpc0xFID8gMSA6IC0xLFxuICAgICAgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMDtcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKTtcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMDtcbiAgICBlID0gZU1heDtcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMik7XG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tO1xuICAgICAgYyAqPSAyO1xuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gYztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrKztcbiAgICAgIGMgLz0gMjtcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwO1xuICAgICAgZSA9IGVNYXg7XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xuICAgICAgZSA9IGUgKyBlQmlhcztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xuICAgICAgZSA9IDA7XG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCk7XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbTtcbiAgZUxlbiArPSBtTGVuO1xuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpO1xuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyODtcbn07XG4iLCJcbi8qKlxuICogaXNBcnJheVxuICovXG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiB0b1N0cmluZ1xuICovXG5cbnZhciBzdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFdoZXRoZXIgb3Igbm90IHRoZSBnaXZlbiBgdmFsYFxuICogaXMgYW4gYXJyYXkuXG4gKlxuICogZXhhbXBsZTpcbiAqXG4gKiAgICAgICAgaXNBcnJheShbXSk7XG4gKiAgICAgICAgLy8gPiB0cnVlXG4gKiAgICAgICAgaXNBcnJheShhcmd1bWVudHMpO1xuICogICAgICAgIC8vID4gZmFsc2VcbiAqICAgICAgICBpc0FycmF5KCcnKTtcbiAqICAgICAgICAvLyA+IGZhbHNlXG4gKlxuICogQHBhcmFtIHttaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtib29sfVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheSB8fCBmdW5jdGlvbiAodmFsKSB7XG4gIHJldHVybiAhISB2YWwgJiYgJ1tvYmplY3QgQXJyYXldJyA9PSBzdHIuY2FsbCh2YWwpO1xufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0gMSk7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKylcbiAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0gMSk7XG4gICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKVxuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG5cbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICB2YXIgbTtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2Uge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIWVtaXR0ZXIuX2V2ZW50cyB8fCAhZW1pdHRlci5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IDA7XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24oZW1pdHRlci5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSAxO1xuICBlbHNlXG4gICAgcmV0ID0gZW1pdHRlci5fZXZlbnRzW3R5cGVdLmxlbmd0aDtcbiAgcmV0dXJuIHJldDtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhbk11dGF0aW9uT2JzZXJ2ZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIHZhciBxdWV1ZSA9IFtdO1xuXG4gICAgaWYgKGNhbk11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgdmFyIGhpZGRlbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBxdWV1ZUxpc3QgPSBxdWV1ZS5zbGljZSgpO1xuICAgICAgICAgICAgcXVldWUubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHF1ZXVlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShoaWRkZW5EaXYsIHsgYXR0cmlidXRlczogdHJ1ZSB9KTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIGlmICghcXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaGlkZGVuRGl2LnNldEF0dHJpYnV0ZSgneWVzJywgJ25vJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2xpYi9fc3RyZWFtX2R1cGxleC5qc1wiKVxuIiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcbi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyBhIGR1cGxleCBzdHJlYW0gaXMganVzdCBhIHN0cmVhbSB0aGF0IGlzIGJvdGggcmVhZGFibGUgYW5kIHdyaXRhYmxlLlxuLy8gU2luY2UgSlMgZG9lc24ndCBoYXZlIG11bHRpcGxlIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UsIHRoaXMgY2xhc3Ncbi8vIHByb3RvdHlwYWxseSBpbmhlcml0cyBmcm9tIFJlYWRhYmxlLCBhbmQgdGhlbiBwYXJhc2l0aWNhbGx5IGZyb21cbi8vIFdyaXRhYmxlLlxuXG5tb2R1bGUuZXhwb3J0cyA9IER1cGxleDtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSBrZXlzLnB1c2goa2V5KTtcbiAgcmV0dXJuIGtleXM7XG59XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbnZhciBSZWFkYWJsZSA9IHJlcXVpcmUoJy4vX3N0cmVhbV9yZWFkYWJsZScpO1xudmFyIFdyaXRhYmxlID0gcmVxdWlyZSgnLi9fc3RyZWFtX3dyaXRhYmxlJyk7XG5cbnV0aWwuaW5oZXJpdHMoRHVwbGV4LCBSZWFkYWJsZSk7XG5cbmZvckVhY2gob2JqZWN0S2V5cyhXcml0YWJsZS5wcm90b3R5cGUpLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgaWYgKCFEdXBsZXgucHJvdG90eXBlW21ldGhvZF0pXG4gICAgRHVwbGV4LnByb3RvdHlwZVttZXRob2RdID0gV3JpdGFibGUucHJvdG90eXBlW21ldGhvZF07XG59KTtcblxuZnVuY3Rpb24gRHVwbGV4KG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIER1cGxleCkpXG4gICAgcmV0dXJuIG5ldyBEdXBsZXgob3B0aW9ucyk7XG5cbiAgUmVhZGFibGUuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgV3JpdGFibGUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlYWRhYmxlID09PSBmYWxzZSlcbiAgICB0aGlzLnJlYWRhYmxlID0gZmFsc2U7XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy53cml0YWJsZSA9PT0gZmFsc2UpXG4gICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuXG4gIHRoaXMuYWxsb3dIYWxmT3BlbiA9IHRydWU7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuYWxsb3dIYWxmT3BlbiA9PT0gZmFsc2UpXG4gICAgdGhpcy5hbGxvd0hhbGZPcGVuID0gZmFsc2U7XG5cbiAgdGhpcy5vbmNlKCdlbmQnLCBvbmVuZCk7XG59XG5cbi8vIHRoZSBuby1oYWxmLW9wZW4gZW5mb3JjZXJcbmZ1bmN0aW9uIG9uZW5kKCkge1xuICAvLyBpZiB3ZSBhbGxvdyBoYWxmLW9wZW4gc3RhdGUsIG9yIGlmIHRoZSB3cml0YWJsZSBzaWRlIGVuZGVkLFxuICAvLyB0aGVuIHdlJ3JlIG9rLlxuICBpZiAodGhpcy5hbGxvd0hhbGZPcGVuIHx8IHRoaXMuX3dyaXRhYmxlU3RhdGUuZW5kZWQpXG4gICAgcmV0dXJuO1xuXG4gIC8vIG5vIG1vcmUgZGF0YSBjYW4gYmUgd3JpdHRlbi5cbiAgLy8gQnV0IGFsbG93IG1vcmUgd3JpdGVzIHRvIGhhcHBlbiBpbiB0aGlzIHRpY2suXG4gIHByb2Nlc3MubmV4dFRpY2sodGhpcy5lbmQuYmluZCh0aGlzKSk7XG59XG5cbmZ1bmN0aW9uIGZvckVhY2ggKHhzLCBmKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZih4c1tpXSwgaSk7XG4gIH1cbn1cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoJ19wcm9jZXNzJykpIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIGEgcGFzc3Rocm91Z2ggc3RyZWFtLlxuLy8gYmFzaWNhbGx5IGp1c3QgdGhlIG1vc3QgbWluaW1hbCBzb3J0IG9mIFRyYW5zZm9ybSBzdHJlYW0uXG4vLyBFdmVyeSB3cml0dGVuIGNodW5rIGdldHMgb3V0cHV0IGFzLWlzLlxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhc3NUaHJvdWdoO1xuXG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9fc3RyZWFtX3RyYW5zZm9ybScpO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbnV0aWwuaW5oZXJpdHMoUGFzc1Rocm91Z2gsIFRyYW5zZm9ybSk7XG5cbmZ1bmN0aW9uIFBhc3NUaHJvdWdoKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBhc3NUaHJvdWdoKSlcbiAgICByZXR1cm4gbmV3IFBhc3NUaHJvdWdoKG9wdGlvbnMpO1xuXG4gIFRyYW5zZm9ybS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xufVxuXG5QYXNzVGhyb3VnaC5wcm90b3R5cGUuX3RyYW5zZm9ybSA9IGZ1bmN0aW9uKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgY2IobnVsbCwgY2h1bmspO1xufTtcbiIsIihmdW5jdGlvbiAocHJvY2Vzcyl7XG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFkYWJsZTtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXI7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxuUmVhZGFibGUuUmVhZGFibGVTdGF0ZSA9IFJlYWRhYmxlU3RhdGU7XG5cbnZhciBFRSA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbmlmICghRUUubGlzdGVuZXJDb3VudCkgRUUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJzKHR5cGUpLmxlbmd0aDtcbn07XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudmFyIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xudmFyIHV0aWwgPSByZXF1aXJlKCdjb3JlLXV0aWwtaXMnKTtcbnV0aWwuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbnZhciBTdHJpbmdEZWNvZGVyO1xuXG51dGlsLmluaGVyaXRzKFJlYWRhYmxlLCBTdHJlYW0pO1xuXG5mdW5jdGlvbiBSZWFkYWJsZVN0YXRlKG9wdGlvbnMsIHN0cmVhbSkge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAvLyB0aGUgcG9pbnQgYXQgd2hpY2ggaXQgc3RvcHMgY2FsbGluZyBfcmVhZCgpIHRvIGZpbGwgdGhlIGJ1ZmZlclxuICAvLyBOb3RlOiAwIGlzIGEgdmFsaWQgdmFsdWUsIG1lYW5zIFwiZG9uJ3QgY2FsbCBfcmVhZCBwcmVlbXB0aXZlbHkgZXZlclwiXG4gIHZhciBod20gPSBvcHRpb25zLmhpZ2hXYXRlck1hcms7XG4gIHRoaXMuaGlnaFdhdGVyTWFyayA9IChod20gfHwgaHdtID09PSAwKSA/IGh3bSA6IDE2ICogMTAyNDtcblxuICAvLyBjYXN0IHRvIGludHMuXG4gIHRoaXMuaGlnaFdhdGVyTWFyayA9IH5+dGhpcy5oaWdoV2F0ZXJNYXJrO1xuXG4gIHRoaXMuYnVmZmVyID0gW107XG4gIHRoaXMubGVuZ3RoID0gMDtcbiAgdGhpcy5waXBlcyA9IG51bGw7XG4gIHRoaXMucGlwZXNDb3VudCA9IDA7XG4gIHRoaXMuZmxvd2luZyA9IGZhbHNlO1xuICB0aGlzLmVuZGVkID0gZmFsc2U7XG4gIHRoaXMuZW5kRW1pdHRlZCA9IGZhbHNlO1xuICB0aGlzLnJlYWRpbmcgPSBmYWxzZTtcblxuICAvLyBJbiBzdHJlYW1zIHRoYXQgbmV2ZXIgaGF2ZSBhbnkgZGF0YSwgYW5kIGRvIHB1c2gobnVsbCkgcmlnaHQgYXdheSxcbiAgLy8gdGhlIGNvbnN1bWVyIGNhbiBtaXNzIHRoZSAnZW5kJyBldmVudCBpZiB0aGV5IGRvIHNvbWUgSS9PIGJlZm9yZVxuICAvLyBjb25zdW1pbmcgdGhlIHN0cmVhbS4gIFNvLCB3ZSBkb24ndCBlbWl0KCdlbmQnKSB1bnRpbCBzb21lIHJlYWRpbmdcbiAgLy8gaGFwcGVucy5cbiAgdGhpcy5jYWxsZWRSZWFkID0gZmFsc2U7XG5cbiAgLy8gYSBmbGFnIHRvIGJlIGFibGUgdG8gdGVsbCBpZiB0aGUgb253cml0ZSBjYiBpcyBjYWxsZWQgaW1tZWRpYXRlbHksXG4gIC8vIG9yIG9uIGEgbGF0ZXIgdGljay4gIFdlIHNldCB0aGlzIHRvIHRydWUgYXQgZmlyc3QsIGJlY3Vhc2UgYW55XG4gIC8vIGFjdGlvbnMgdGhhdCBzaG91bGRuJ3QgaGFwcGVuIHVudGlsIFwibGF0ZXJcIiBzaG91bGQgZ2VuZXJhbGx5IGFsc29cbiAgLy8gbm90IGhhcHBlbiBiZWZvcmUgdGhlIGZpcnN0IHdyaXRlIGNhbGwuXG4gIHRoaXMuc3luYyA9IHRydWU7XG5cbiAgLy8gd2hlbmV2ZXIgd2UgcmV0dXJuIG51bGwsIHRoZW4gd2Ugc2V0IGEgZmxhZyB0byBzYXlcbiAgLy8gdGhhdCB3ZSdyZSBhd2FpdGluZyBhICdyZWFkYWJsZScgZXZlbnQgZW1pc3Npb24uXG4gIHRoaXMubmVlZFJlYWRhYmxlID0gZmFsc2U7XG4gIHRoaXMuZW1pdHRlZFJlYWRhYmxlID0gZmFsc2U7XG4gIHRoaXMucmVhZGFibGVMaXN0ZW5pbmcgPSBmYWxzZTtcblxuXG4gIC8vIG9iamVjdCBzdHJlYW0gZmxhZy4gVXNlZCB0byBtYWtlIHJlYWQobikgaWdub3JlIG4gYW5kIHRvXG4gIC8vIG1ha2UgYWxsIHRoZSBidWZmZXIgbWVyZ2luZyBhbmQgbGVuZ3RoIGNoZWNrcyBnbyBhd2F5XG4gIHRoaXMub2JqZWN0TW9kZSA9ICEhb3B0aW9ucy5vYmplY3RNb2RlO1xuXG4gIC8vIENyeXB0byBpcyBraW5kIG9mIG9sZCBhbmQgY3J1c3R5LiAgSGlzdG9yaWNhbGx5LCBpdHMgZGVmYXVsdCBzdHJpbmdcbiAgLy8gZW5jb2RpbmcgaXMgJ2JpbmFyeScgc28gd2UgaGF2ZSB0byBtYWtlIHRoaXMgY29uZmlndXJhYmxlLlxuICAvLyBFdmVyeXRoaW5nIGVsc2UgaW4gdGhlIHVuaXZlcnNlIHVzZXMgJ3V0ZjgnLCB0aG91Z2guXG4gIHRoaXMuZGVmYXVsdEVuY29kaW5nID0gb3B0aW9ucy5kZWZhdWx0RW5jb2RpbmcgfHwgJ3V0ZjgnO1xuXG4gIC8vIHdoZW4gcGlwaW5nLCB3ZSBvbmx5IGNhcmUgYWJvdXQgJ3JlYWRhYmxlJyBldmVudHMgdGhhdCBoYXBwZW5cbiAgLy8gYWZ0ZXIgcmVhZCgpaW5nIGFsbCB0aGUgYnl0ZXMgYW5kIG5vdCBnZXR0aW5nIGFueSBwdXNoYmFjay5cbiAgdGhpcy5yYW5PdXQgPSBmYWxzZTtcblxuICAvLyB0aGUgbnVtYmVyIG9mIHdyaXRlcnMgdGhhdCBhcmUgYXdhaXRpbmcgYSBkcmFpbiBldmVudCBpbiAucGlwZSgpc1xuICB0aGlzLmF3YWl0RHJhaW4gPSAwO1xuXG4gIC8vIGlmIHRydWUsIGEgbWF5YmVSZWFkTW9yZSBoYXMgYmVlbiBzY2hlZHVsZWRcbiAgdGhpcy5yZWFkaW5nTW9yZSA9IGZhbHNlO1xuXG4gIHRoaXMuZGVjb2RlciA9IG51bGw7XG4gIHRoaXMuZW5jb2RpbmcgPSBudWxsO1xuICBpZiAob3B0aW9ucy5lbmNvZGluZykge1xuICAgIGlmICghU3RyaW5nRGVjb2RlcilcbiAgICAgIFN0cmluZ0RlY29kZXIgPSByZXF1aXJlKCdzdHJpbmdfZGVjb2Rlci8nKS5TdHJpbmdEZWNvZGVyO1xuICAgIHRoaXMuZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKG9wdGlvbnMuZW5jb2RpbmcpO1xuICAgIHRoaXMuZW5jb2RpbmcgPSBvcHRpb25zLmVuY29kaW5nO1xuICB9XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlYWRhYmxlKSlcbiAgICByZXR1cm4gbmV3IFJlYWRhYmxlKG9wdGlvbnMpO1xuXG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUgPSBuZXcgUmVhZGFibGVTdGF0ZShvcHRpb25zLCB0aGlzKTtcblxuICAvLyBsZWdhY3lcbiAgdGhpcy5yZWFkYWJsZSA9IHRydWU7XG5cbiAgU3RyZWFtLmNhbGwodGhpcyk7XG59XG5cbi8vIE1hbnVhbGx5IHNob3ZlIHNvbWV0aGluZyBpbnRvIHRoZSByZWFkKCkgYnVmZmVyLlxuLy8gVGhpcyByZXR1cm5zIHRydWUgaWYgdGhlIGhpZ2hXYXRlck1hcmsgaGFzIG5vdCBiZWVuIGhpdCB5ZXQsXG4vLyBzaW1pbGFyIHRvIGhvdyBXcml0YWJsZS53cml0ZSgpIHJldHVybnMgdHJ1ZSBpZiB5b3Ugc2hvdWxkXG4vLyB3cml0ZSgpIHNvbWUgbW9yZS5cblJlYWRhYmxlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oY2h1bmssIGVuY29kaW5nKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG5cbiAgaWYgKHR5cGVvZiBjaHVuayA9PT0gJ3N0cmluZycgJiYgIXN0YXRlLm9iamVjdE1vZGUpIHtcbiAgICBlbmNvZGluZyA9IGVuY29kaW5nIHx8IHN0YXRlLmRlZmF1bHRFbmNvZGluZztcbiAgICBpZiAoZW5jb2RpbmcgIT09IHN0YXRlLmVuY29kaW5nKSB7XG4gICAgICBjaHVuayA9IG5ldyBCdWZmZXIoY2h1bmssIGVuY29kaW5nKTtcbiAgICAgIGVuY29kaW5nID0gJyc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlYWRhYmxlQWRkQ2h1bmsodGhpcywgc3RhdGUsIGNodW5rLCBlbmNvZGluZywgZmFsc2UpO1xufTtcblxuLy8gVW5zaGlmdCBzaG91bGQgKmFsd2F5cyogYmUgc29tZXRoaW5nIGRpcmVjdGx5IG91dCBvZiByZWFkKClcblJlYWRhYmxlLnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24oY2h1bmspIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgcmV0dXJuIHJlYWRhYmxlQWRkQ2h1bmsodGhpcywgc3RhdGUsIGNodW5rLCAnJywgdHJ1ZSk7XG59O1xuXG5mdW5jdGlvbiByZWFkYWJsZUFkZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCBlbmNvZGluZywgYWRkVG9Gcm9udCkge1xuICB2YXIgZXIgPSBjaHVua0ludmFsaWQoc3RhdGUsIGNodW5rKTtcbiAgaWYgKGVyKSB7XG4gICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuICB9IGVsc2UgaWYgKGNodW5rID09PSBudWxsIHx8IGNodW5rID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGF0ZS5yZWFkaW5nID0gZmFsc2U7XG4gICAgaWYgKCFzdGF0ZS5lbmRlZClcbiAgICAgIG9uRW9mQ2h1bmsoc3RyZWFtLCBzdGF0ZSk7XG4gIH0gZWxzZSBpZiAoc3RhdGUub2JqZWN0TW9kZSB8fCBjaHVuayAmJiBjaHVuay5sZW5ndGggPiAwKSB7XG4gICAgaWYgKHN0YXRlLmVuZGVkICYmICFhZGRUb0Zyb250KSB7XG4gICAgICB2YXIgZSA9IG5ldyBFcnJvcignc3RyZWFtLnB1c2goKSBhZnRlciBFT0YnKTtcbiAgICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGUpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUuZW5kRW1pdHRlZCAmJiBhZGRUb0Zyb250KSB7XG4gICAgICB2YXIgZSA9IG5ldyBFcnJvcignc3RyZWFtLnVuc2hpZnQoKSBhZnRlciBlbmQgZXZlbnQnKTtcbiAgICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc3RhdGUuZGVjb2RlciAmJiAhYWRkVG9Gcm9udCAmJiAhZW5jb2RpbmcpXG4gICAgICAgIGNodW5rID0gc3RhdGUuZGVjb2Rlci53cml0ZShjaHVuayk7XG5cbiAgICAgIC8vIHVwZGF0ZSB0aGUgYnVmZmVyIGluZm8uXG4gICAgICBzdGF0ZS5sZW5ndGggKz0gc3RhdGUub2JqZWN0TW9kZSA/IDEgOiBjaHVuay5sZW5ndGg7XG4gICAgICBpZiAoYWRkVG9Gcm9udCkge1xuICAgICAgICBzdGF0ZS5idWZmZXIudW5zaGlmdChjaHVuayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5yZWFkaW5nID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLmJ1ZmZlci5wdXNoKGNodW5rKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLm5lZWRSZWFkYWJsZSlcbiAgICAgICAgZW1pdFJlYWRhYmxlKHN0cmVhbSk7XG5cbiAgICAgIG1heWJlUmVhZE1vcmUoc3RyZWFtLCBzdGF0ZSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCFhZGRUb0Zyb250KSB7XG4gICAgc3RhdGUucmVhZGluZyA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIG5lZWRNb3JlRGF0YShzdGF0ZSk7XG59XG5cblxuXG4vLyBpZiBpdCdzIHBhc3QgdGhlIGhpZ2ggd2F0ZXIgbWFyaywgd2UgY2FuIHB1c2ggaW4gc29tZSBtb3JlLlxuLy8gQWxzbywgaWYgd2UgaGF2ZSBubyBkYXRhIHlldCwgd2UgY2FuIHN0YW5kIHNvbWVcbi8vIG1vcmUgYnl0ZXMuICBUaGlzIGlzIHRvIHdvcmsgYXJvdW5kIGNhc2VzIHdoZXJlIGh3bT0wLFxuLy8gc3VjaCBhcyB0aGUgcmVwbC4gIEFsc28sIGlmIHRoZSBwdXNoKCkgdHJpZ2dlcmVkIGFcbi8vIHJlYWRhYmxlIGV2ZW50LCBhbmQgdGhlIHVzZXIgY2FsbGVkIHJlYWQobGFyZ2VOdW1iZXIpIHN1Y2ggdGhhdFxuLy8gbmVlZFJlYWRhYmxlIHdhcyBzZXQsIHRoZW4gd2Ugb3VnaHQgdG8gcHVzaCBtb3JlLCBzbyB0aGF0IGFub3RoZXJcbi8vICdyZWFkYWJsZScgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQuXG5mdW5jdGlvbiBuZWVkTW9yZURhdGEoc3RhdGUpIHtcbiAgcmV0dXJuICFzdGF0ZS5lbmRlZCAmJlxuICAgICAgICAgKHN0YXRlLm5lZWRSZWFkYWJsZSB8fFxuICAgICAgICAgIHN0YXRlLmxlbmd0aCA8IHN0YXRlLmhpZ2hXYXRlck1hcmsgfHxcbiAgICAgICAgICBzdGF0ZS5sZW5ndGggPT09IDApO1xufVxuXG4vLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cblJlYWRhYmxlLnByb3RvdHlwZS5zZXRFbmNvZGluZyA9IGZ1bmN0aW9uKGVuYykge1xuICBpZiAoIVN0cmluZ0RlY29kZXIpXG4gICAgU3RyaW5nRGVjb2RlciA9IHJlcXVpcmUoJ3N0cmluZ19kZWNvZGVyLycpLlN0cmluZ0RlY29kZXI7XG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUuZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKGVuYyk7XG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUuZW5jb2RpbmcgPSBlbmM7XG59O1xuXG4vLyBEb24ndCByYWlzZSB0aGUgaHdtID4gMTI4TUJcbnZhciBNQVhfSFdNID0gMHg4MDAwMDA7XG5mdW5jdGlvbiByb3VuZFVwVG9OZXh0UG93ZXJPZjIobikge1xuICBpZiAobiA+PSBNQVhfSFdNKSB7XG4gICAgbiA9IE1BWF9IV007XG4gIH0gZWxzZSB7XG4gICAgLy8gR2V0IHRoZSBuZXh0IGhpZ2hlc3QgcG93ZXIgb2YgMlxuICAgIG4tLTtcbiAgICBmb3IgKHZhciBwID0gMTsgcCA8IDMyOyBwIDw8PSAxKSBuIHw9IG4gPj4gcDtcbiAgICBuKys7XG4gIH1cbiAgcmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIGhvd011Y2hUb1JlYWQobiwgc3RhdGUpIHtcbiAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCAmJiBzdGF0ZS5lbmRlZClcbiAgICByZXR1cm4gMDtcblxuICBpZiAoc3RhdGUub2JqZWN0TW9kZSlcbiAgICByZXR1cm4gbiA9PT0gMCA/IDAgOiAxO1xuXG4gIGlmIChuID09PSBudWxsIHx8IGlzTmFOKG4pKSB7XG4gICAgLy8gb25seSBmbG93IG9uZSBidWZmZXIgYXQgYSB0aW1lXG4gICAgaWYgKHN0YXRlLmZsb3dpbmcgJiYgc3RhdGUuYnVmZmVyLmxlbmd0aClcbiAgICAgIHJldHVybiBzdGF0ZS5idWZmZXJbMF0ubGVuZ3RoO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBzdGF0ZS5sZW5ndGg7XG4gIH1cblxuICBpZiAobiA8PSAwKVxuICAgIHJldHVybiAwO1xuXG4gIC8vIElmIHdlJ3JlIGFza2luZyBmb3IgbW9yZSB0aGFuIHRoZSB0YXJnZXQgYnVmZmVyIGxldmVsLFxuICAvLyB0aGVuIHJhaXNlIHRoZSB3YXRlciBtYXJrLiAgQnVtcCB1cCB0byB0aGUgbmV4dCBoaWdoZXN0XG4gIC8vIHBvd2VyIG9mIDIsIHRvIHByZXZlbnQgaW5jcmVhc2luZyBpdCBleGNlc3NpdmVseSBpbiB0aW55XG4gIC8vIGFtb3VudHMuXG4gIGlmIChuID4gc3RhdGUuaGlnaFdhdGVyTWFyaylcbiAgICBzdGF0ZS5oaWdoV2F0ZXJNYXJrID0gcm91bmRVcFRvTmV4dFBvd2VyT2YyKG4pO1xuXG4gIC8vIGRvbid0IGhhdmUgdGhhdCBtdWNoLiAgcmV0dXJuIG51bGwsIHVubGVzcyB3ZSd2ZSBlbmRlZC5cbiAgaWYgKG4gPiBzdGF0ZS5sZW5ndGgpIHtcbiAgICBpZiAoIXN0YXRlLmVuZGVkKSB7XG4gICAgICBzdGF0ZS5uZWVkUmVhZGFibGUgPSB0cnVlO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlXG4gICAgICByZXR1cm4gc3RhdGUubGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIG47XG59XG5cbi8vIHlvdSBjYW4gb3ZlcnJpZGUgZWl0aGVyIHRoaXMgbWV0aG9kLCBvciB0aGUgYXN5bmMgX3JlYWQobikgYmVsb3cuXG5SZWFkYWJsZS5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uKG4pIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgc3RhdGUuY2FsbGVkUmVhZCA9IHRydWU7XG4gIHZhciBuT3JpZyA9IG47XG4gIHZhciByZXQ7XG5cbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuID4gMClcbiAgICBzdGF0ZS5lbWl0dGVkUmVhZGFibGUgPSBmYWxzZTtcblxuICAvLyBpZiB3ZSdyZSBkb2luZyByZWFkKDApIHRvIHRyaWdnZXIgYSByZWFkYWJsZSBldmVudCwgYnV0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhIGJ1bmNoIG9mIGRhdGEgaW4gdGhlIGJ1ZmZlciwgdGhlbiBqdXN0IHRyaWdnZXJcbiAgLy8gdGhlICdyZWFkYWJsZScgZXZlbnQgYW5kIG1vdmUgb24uXG4gIGlmIChuID09PSAwICYmXG4gICAgICBzdGF0ZS5uZWVkUmVhZGFibGUgJiZcbiAgICAgIChzdGF0ZS5sZW5ndGggPj0gc3RhdGUuaGlnaFdhdGVyTWFyayB8fCBzdGF0ZS5lbmRlZCkpIHtcbiAgICBlbWl0UmVhZGFibGUodGhpcyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBuID0gaG93TXVjaFRvUmVhZChuLCBzdGF0ZSk7XG5cbiAgLy8gaWYgd2UndmUgZW5kZWQsIGFuZCB3ZSdyZSBub3cgY2xlYXIsIHRoZW4gZmluaXNoIGl0IHVwLlxuICBpZiAobiA9PT0gMCAmJiBzdGF0ZS5lbmRlZCkge1xuICAgIHJldCA9IG51bGw7XG5cbiAgICAvLyBJbiBjYXNlcyB3aGVyZSB0aGUgZGVjb2RlciBkaWQgbm90IHJlY2VpdmUgZW5vdWdoIGRhdGFcbiAgICAvLyB0byBwcm9kdWNlIGEgZnVsbCBjaHVuaywgdGhlbiBpbW1lZGlhdGVseSByZWNlaXZlZCBhblxuICAgIC8vIEVPRiwgc3RhdGUuYnVmZmVyIHdpbGwgY29udGFpbiBbPEJ1ZmZlciA+LCA8QnVmZmVyIDAwIC4uLj5dLlxuICAgIC8vIGhvd011Y2hUb1JlYWQgd2lsbCBzZWUgdGhpcyBhbmQgY29lcmNlIHRoZSBhbW91bnQgdG9cbiAgICAvLyByZWFkIHRvIHplcm8gKGJlY2F1c2UgaXQncyBsb29raW5nIGF0IHRoZSBsZW5ndGggb2YgdGhlXG4gICAgLy8gZmlyc3QgPEJ1ZmZlciA+IGluIHN0YXRlLmJ1ZmZlciksIGFuZCB3ZSdsbCBlbmQgdXAgaGVyZS5cbiAgICAvL1xuICAgIC8vIFRoaXMgY2FuIG9ubHkgaGFwcGVuIHZpYSBzdGF0ZS5kZWNvZGVyIC0tIG5vIG90aGVyIHZlbnVlXG4gICAgLy8gZXhpc3RzIGZvciBwdXNoaW5nIGEgemVyby1sZW5ndGggY2h1bmsgaW50byBzdGF0ZS5idWZmZXJcbiAgICAvLyBhbmQgdHJpZ2dlcmluZyB0aGlzIGJlaGF2aW9yLiBJbiB0aGlzIGNhc2UsIHdlIHJldHVybiBvdXJcbiAgICAvLyByZW1haW5pbmcgZGF0YSBhbmQgZW5kIHRoZSBzdHJlYW0sIGlmIGFwcHJvcHJpYXRlLlxuICAgIGlmIChzdGF0ZS5sZW5ndGggPiAwICYmIHN0YXRlLmRlY29kZXIpIHtcbiAgICAgIHJldCA9IGZyb21MaXN0KG4sIHN0YXRlKTtcbiAgICAgIHN0YXRlLmxlbmd0aCAtPSByZXQubGVuZ3RoO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZS5sZW5ndGggPT09IDApXG4gICAgICBlbmRSZWFkYWJsZSh0aGlzKTtcblxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvLyBBbGwgdGhlIGFjdHVhbCBjaHVuayBnZW5lcmF0aW9uIGxvZ2ljIG5lZWRzIHRvIGJlXG4gIC8vICpiZWxvdyogdGhlIGNhbGwgdG8gX3JlYWQuICBUaGUgcmVhc29uIGlzIHRoYXQgaW4gY2VydGFpblxuICAvLyBzeW50aGV0aWMgc3RyZWFtIGNhc2VzLCBzdWNoIGFzIHBhc3N0aHJvdWdoIHN0cmVhbXMsIF9yZWFkXG4gIC8vIG1heSBiZSBhIGNvbXBsZXRlbHkgc3luY2hyb25vdXMgb3BlcmF0aW9uIHdoaWNoIG1heSBjaGFuZ2VcbiAgLy8gdGhlIHN0YXRlIG9mIHRoZSByZWFkIGJ1ZmZlciwgcHJvdmlkaW5nIGVub3VnaCBkYXRhIHdoZW5cbiAgLy8gYmVmb3JlIHRoZXJlIHdhcyAqbm90KiBlbm91Z2guXG4gIC8vXG4gIC8vIFNvLCB0aGUgc3RlcHMgYXJlOlxuICAvLyAxLiBGaWd1cmUgb3V0IHdoYXQgdGhlIHN0YXRlIG9mIHRoaW5ncyB3aWxsIGJlIGFmdGVyIHdlIGRvXG4gIC8vIGEgcmVhZCBmcm9tIHRoZSBidWZmZXIuXG4gIC8vXG4gIC8vIDIuIElmIHRoYXQgcmVzdWx0aW5nIHN0YXRlIHdpbGwgdHJpZ2dlciBhIF9yZWFkLCB0aGVuIGNhbGwgX3JlYWQuXG4gIC8vIE5vdGUgdGhhdCB0aGlzIG1heSBiZSBhc3luY2hyb25vdXMsIG9yIHN5bmNocm9ub3VzLiAgWWVzLCBpdCBpc1xuICAvLyBkZWVwbHkgdWdseSB0byB3cml0ZSBBUElzIHRoaXMgd2F5LCBidXQgdGhhdCBzdGlsbCBkb2Vzbid0IG1lYW5cbiAgLy8gdGhhdCB0aGUgUmVhZGFibGUgY2xhc3Mgc2hvdWxkIGJlaGF2ZSBpbXByb3Blcmx5LCBhcyBzdHJlYW1zIGFyZVxuICAvLyBkZXNpZ25lZCB0byBiZSBzeW5jL2FzeW5jIGFnbm9zdGljLlxuICAvLyBUYWtlIG5vdGUgaWYgdGhlIF9yZWFkIGNhbGwgaXMgc3luYyBvciBhc3luYyAoaWUsIGlmIHRoZSByZWFkIGNhbGxcbiAgLy8gaGFzIHJldHVybmVkIHlldCksIHNvIHRoYXQgd2Uga25vdyB3aGV0aGVyIG9yIG5vdCBpdCdzIHNhZmUgdG8gZW1pdFxuICAvLyAncmVhZGFibGUnIGV0Yy5cbiAgLy9cbiAgLy8gMy4gQWN0dWFsbHkgcHVsbCB0aGUgcmVxdWVzdGVkIGNodW5rcyBvdXQgb2YgdGhlIGJ1ZmZlciBhbmQgcmV0dXJuLlxuXG4gIC8vIGlmIHdlIG5lZWQgYSByZWFkYWJsZSBldmVudCwgdGhlbiB3ZSBuZWVkIHRvIGRvIHNvbWUgcmVhZGluZy5cbiAgdmFyIGRvUmVhZCA9IHN0YXRlLm5lZWRSZWFkYWJsZTtcblxuICAvLyBpZiB3ZSBjdXJyZW50bHkgaGF2ZSBsZXNzIHRoYW4gdGhlIGhpZ2hXYXRlck1hcmssIHRoZW4gYWxzbyByZWFkIHNvbWVcbiAgaWYgKHN0YXRlLmxlbmd0aCAtIG4gPD0gc3RhdGUuaGlnaFdhdGVyTWFyaylcbiAgICBkb1JlYWQgPSB0cnVlO1xuXG4gIC8vIGhvd2V2ZXIsIGlmIHdlJ3ZlIGVuZGVkLCB0aGVuIHRoZXJlJ3Mgbm8gcG9pbnQsIGFuZCBpZiB3ZSdyZSBhbHJlYWR5XG4gIC8vIHJlYWRpbmcsIHRoZW4gaXQncyB1bm5lY2Vzc2FyeS5cbiAgaWYgKHN0YXRlLmVuZGVkIHx8IHN0YXRlLnJlYWRpbmcpXG4gICAgZG9SZWFkID0gZmFsc2U7XG5cbiAgaWYgKGRvUmVhZCkge1xuICAgIHN0YXRlLnJlYWRpbmcgPSB0cnVlO1xuICAgIHN0YXRlLnN5bmMgPSB0cnVlO1xuICAgIC8vIGlmIHRoZSBsZW5ndGggaXMgY3VycmVudGx5IHplcm8sIHRoZW4gd2UgKm5lZWQqIGEgcmVhZGFibGUgZXZlbnQuXG4gICAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMClcbiAgICAgIHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG4gICAgLy8gY2FsbCBpbnRlcm5hbCByZWFkIG1ldGhvZFxuICAgIHRoaXMuX3JlYWQoc3RhdGUuaGlnaFdhdGVyTWFyayk7XG4gICAgc3RhdGUuc3luYyA9IGZhbHNlO1xuICB9XG5cbiAgLy8gSWYgX3JlYWQgY2FsbGVkIGl0cyBjYWxsYmFjayBzeW5jaHJvbm91c2x5LCB0aGVuIGByZWFkaW5nYFxuICAvLyB3aWxsIGJlIGZhbHNlLCBhbmQgd2UgbmVlZCB0byByZS1ldmFsdWF0ZSBob3cgbXVjaCBkYXRhIHdlXG4gIC8vIGNhbiByZXR1cm4gdG8gdGhlIHVzZXIuXG4gIGlmIChkb1JlYWQgJiYgIXN0YXRlLnJlYWRpbmcpXG4gICAgbiA9IGhvd011Y2hUb1JlYWQobk9yaWcsIHN0YXRlKTtcblxuICBpZiAobiA+IDApXG4gICAgcmV0ID0gZnJvbUxpc3Qobiwgc3RhdGUpO1xuICBlbHNlXG4gICAgcmV0ID0gbnVsbDtcblxuICBpZiAocmV0ID09PSBudWxsKSB7XG4gICAgc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICBuID0gMDtcbiAgfVxuXG4gIHN0YXRlLmxlbmd0aCAtPSBuO1xuXG4gIC8vIElmIHdlIGhhdmUgbm90aGluZyBpbiB0aGUgYnVmZmVyLCB0aGVuIHdlIHdhbnQgdG8ga25vd1xuICAvLyBhcyBzb29uIGFzIHdlICpkbyogZ2V0IHNvbWV0aGluZyBpbnRvIHRoZSBidWZmZXIuXG4gIGlmIChzdGF0ZS5sZW5ndGggPT09IDAgJiYgIXN0YXRlLmVuZGVkKVxuICAgIHN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG5cbiAgLy8gSWYgd2UgaGFwcGVuZWQgdG8gcmVhZCgpIGV4YWN0bHkgdGhlIHJlbWFpbmluZyBhbW91bnQgaW4gdGhlXG4gIC8vIGJ1ZmZlciwgYW5kIHRoZSBFT0YgaGFzIGJlZW4gc2VlbiBhdCB0aGlzIHBvaW50LCB0aGVuIG1ha2Ugc3VyZVxuICAvLyB0aGF0IHdlIGVtaXQgJ2VuZCcgb24gdGhlIHZlcnkgbmV4dCB0aWNrLlxuICBpZiAoc3RhdGUuZW5kZWQgJiYgIXN0YXRlLmVuZEVtaXR0ZWQgJiYgc3RhdGUubGVuZ3RoID09PSAwKVxuICAgIGVuZFJlYWRhYmxlKHRoaXMpO1xuXG4gIHJldHVybiByZXQ7XG59O1xuXG5mdW5jdGlvbiBjaHVua0ludmFsaWQoc3RhdGUsIGNodW5rKSB7XG4gIHZhciBlciA9IG51bGw7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGNodW5rKSAmJlxuICAgICAgJ3N0cmluZycgIT09IHR5cGVvZiBjaHVuayAmJlxuICAgICAgY2h1bmsgIT09IG51bGwgJiZcbiAgICAgIGNodW5rICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICFzdGF0ZS5vYmplY3RNb2RlKSB7XG4gICAgZXIgPSBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG5vbi1zdHJpbmcvYnVmZmVyIGNodW5rJyk7XG4gIH1cbiAgcmV0dXJuIGVyO1xufVxuXG5cbmZ1bmN0aW9uIG9uRW9mQ2h1bmsoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoc3RhdGUuZGVjb2RlciAmJiAhc3RhdGUuZW5kZWQpIHtcbiAgICB2YXIgY2h1bmsgPSBzdGF0ZS5kZWNvZGVyLmVuZCgpO1xuICAgIGlmIChjaHVuayAmJiBjaHVuay5sZW5ndGgpIHtcbiAgICAgIHN0YXRlLmJ1ZmZlci5wdXNoKGNodW5rKTtcbiAgICAgIHN0YXRlLmxlbmd0aCArPSBzdGF0ZS5vYmplY3RNb2RlID8gMSA6IGNodW5rLmxlbmd0aDtcbiAgICB9XG4gIH1cbiAgc3RhdGUuZW5kZWQgPSB0cnVlO1xuXG4gIC8vIGlmIHdlJ3ZlIGVuZGVkIGFuZCB3ZSBoYXZlIHNvbWUgZGF0YSBsZWZ0LCB0aGVuIGVtaXRcbiAgLy8gJ3JlYWRhYmxlJyBub3cgdG8gbWFrZSBzdXJlIGl0IGdldHMgcGlja2VkIHVwLlxuICBpZiAoc3RhdGUubGVuZ3RoID4gMClcbiAgICBlbWl0UmVhZGFibGUoc3RyZWFtKTtcbiAgZWxzZVxuICAgIGVuZFJlYWRhYmxlKHN0cmVhbSk7XG59XG5cbi8vIERvbid0IGVtaXQgcmVhZGFibGUgcmlnaHQgYXdheSBpbiBzeW5jIG1vZGUsIGJlY2F1c2UgdGhpcyBjYW4gdHJpZ2dlclxuLy8gYW5vdGhlciByZWFkKCkgY2FsbCA9PiBzdGFjayBvdmVyZmxvdy4gIFRoaXMgd2F5LCBpdCBtaWdodCB0cmlnZ2VyXG4vLyBhIG5leHRUaWNrIHJlY3Vyc2lvbiB3YXJuaW5nLCBidXQgdGhhdCdzIG5vdCBzbyBiYWQuXG5mdW5jdGlvbiBlbWl0UmVhZGFibGUoc3RyZWFtKSB7XG4gIHZhciBzdGF0ZSA9IHN0cmVhbS5fcmVhZGFibGVTdGF0ZTtcbiAgc3RhdGUubmVlZFJlYWRhYmxlID0gZmFsc2U7XG4gIGlmIChzdGF0ZS5lbWl0dGVkUmVhZGFibGUpXG4gICAgcmV0dXJuO1xuXG4gIHN0YXRlLmVtaXR0ZWRSZWFkYWJsZSA9IHRydWU7XG4gIGlmIChzdGF0ZS5zeW5jKVxuICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICBlbWl0UmVhZGFibGVfKHN0cmVhbSk7XG4gICAgfSk7XG4gIGVsc2VcbiAgICBlbWl0UmVhZGFibGVfKHN0cmVhbSk7XG59XG5cbmZ1bmN0aW9uIGVtaXRSZWFkYWJsZV8oc3RyZWFtKSB7XG4gIHN0cmVhbS5lbWl0KCdyZWFkYWJsZScpO1xufVxuXG5cbi8vIGF0IHRoaXMgcG9pbnQsIHRoZSB1c2VyIGhhcyBwcmVzdW1hYmx5IHNlZW4gdGhlICdyZWFkYWJsZScgZXZlbnQsXG4vLyBhbmQgY2FsbGVkIHJlYWQoKSB0byBjb25zdW1lIHNvbWUgZGF0YS4gIHRoYXQgbWF5IGhhdmUgdHJpZ2dlcmVkXG4vLyBpbiB0dXJuIGFub3RoZXIgX3JlYWQobikgY2FsbCwgaW4gd2hpY2ggY2FzZSByZWFkaW5nID0gdHJ1ZSBpZlxuLy8gaXQncyBpbiBwcm9ncmVzcy5cbi8vIEhvd2V2ZXIsIGlmIHdlJ3JlIG5vdCBlbmRlZCwgb3IgcmVhZGluZywgYW5kIHRoZSBsZW5ndGggPCBod20sXG4vLyB0aGVuIGdvIGFoZWFkIGFuZCB0cnkgdG8gcmVhZCBzb21lIG1vcmUgcHJlZW1wdGl2ZWx5LlxuZnVuY3Rpb24gbWF5YmVSZWFkTW9yZShzdHJlYW0sIHN0YXRlKSB7XG4gIGlmICghc3RhdGUucmVhZGluZ01vcmUpIHtcbiAgICBzdGF0ZS5yZWFkaW5nTW9yZSA9IHRydWU7XG4gICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgIG1heWJlUmVhZE1vcmVfKHN0cmVhbSwgc3RhdGUpO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1heWJlUmVhZE1vcmVfKHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIGxlbiA9IHN0YXRlLmxlbmd0aDtcbiAgd2hpbGUgKCFzdGF0ZS5yZWFkaW5nICYmICFzdGF0ZS5mbG93aW5nICYmICFzdGF0ZS5lbmRlZCAmJlxuICAgICAgICAgc3RhdGUubGVuZ3RoIDwgc3RhdGUuaGlnaFdhdGVyTWFyaykge1xuICAgIHN0cmVhbS5yZWFkKDApO1xuICAgIGlmIChsZW4gPT09IHN0YXRlLmxlbmd0aClcbiAgICAgIC8vIGRpZG4ndCBnZXQgYW55IGRhdGEsIHN0b3Agc3Bpbm5pbmcuXG4gICAgICBicmVhaztcbiAgICBlbHNlXG4gICAgICBsZW4gPSBzdGF0ZS5sZW5ndGg7XG4gIH1cbiAgc3RhdGUucmVhZGluZ01vcmUgPSBmYWxzZTtcbn1cblxuLy8gYWJzdHJhY3QgbWV0aG9kLiAgdG8gYmUgb3ZlcnJpZGRlbiBpbiBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbiBjbGFzc2VzLlxuLy8gY2FsbCBjYihlciwgZGF0YSkgd2hlcmUgZGF0YSBpcyA8PSBuIGluIGxlbmd0aC5cbi8vIGZvciB2aXJ0dWFsIChub24tc3RyaW5nLCBub24tYnVmZmVyKSBzdHJlYW1zLCBcImxlbmd0aFwiIGlzIHNvbWV3aGF0XG4vLyBhcmJpdHJhcnksIGFuZCBwZXJoYXBzIG5vdCB2ZXJ5IG1lYW5pbmdmdWwuXG5SZWFkYWJsZS5wcm90b3R5cGUuX3JlYWQgPSBmdW5jdGlvbihuKSB7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ25vdCBpbXBsZW1lbnRlZCcpKTtcbn07XG5cblJlYWRhYmxlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24oZGVzdCwgcGlwZU9wdHMpIHtcbiAgdmFyIHNyYyA9IHRoaXM7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG5cbiAgc3dpdGNoIChzdGF0ZS5waXBlc0NvdW50KSB7XG4gICAgY2FzZSAwOlxuICAgICAgc3RhdGUucGlwZXMgPSBkZXN0O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOlxuICAgICAgc3RhdGUucGlwZXMgPSBbc3RhdGUucGlwZXMsIGRlc3RdO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHN0YXRlLnBpcGVzLnB1c2goZGVzdCk7XG4gICAgICBicmVhaztcbiAgfVxuICBzdGF0ZS5waXBlc0NvdW50ICs9IDE7XG5cbiAgdmFyIGRvRW5kID0gKCFwaXBlT3B0cyB8fCBwaXBlT3B0cy5lbmQgIT09IGZhbHNlKSAmJlxuICAgICAgICAgICAgICBkZXN0ICE9PSBwcm9jZXNzLnN0ZG91dCAmJlxuICAgICAgICAgICAgICBkZXN0ICE9PSBwcm9jZXNzLnN0ZGVycjtcblxuICB2YXIgZW5kRm4gPSBkb0VuZCA/IG9uZW5kIDogY2xlYW51cDtcbiAgaWYgKHN0YXRlLmVuZEVtaXR0ZWQpXG4gICAgcHJvY2Vzcy5uZXh0VGljayhlbmRGbik7XG4gIGVsc2VcbiAgICBzcmMub25jZSgnZW5kJywgZW5kRm4pO1xuXG4gIGRlc3Qub24oJ3VucGlwZScsIG9udW5waXBlKTtcbiAgZnVuY3Rpb24gb251bnBpcGUocmVhZGFibGUpIHtcbiAgICBpZiAocmVhZGFibGUgIT09IHNyYykgcmV0dXJuO1xuICAgIGNsZWFudXAoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uZW5kKCkge1xuICAgIGRlc3QuZW5kKCk7XG4gIH1cblxuICAvLyB3aGVuIHRoZSBkZXN0IGRyYWlucywgaXQgcmVkdWNlcyB0aGUgYXdhaXREcmFpbiBjb3VudGVyXG4gIC8vIG9uIHRoZSBzb3VyY2UuICBUaGlzIHdvdWxkIGJlIG1vcmUgZWxlZ2FudCB3aXRoIGEgLm9uY2UoKVxuICAvLyBoYW5kbGVyIGluIGZsb3coKSwgYnV0IGFkZGluZyBhbmQgcmVtb3ZpbmcgcmVwZWF0ZWRseSBpc1xuICAvLyB0b28gc2xvdy5cbiAgdmFyIG9uZHJhaW4gPSBwaXBlT25EcmFpbihzcmMpO1xuICBkZXN0Lm9uKCdkcmFpbicsIG9uZHJhaW4pO1xuXG4gIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgLy8gY2xlYW51cCBldmVudCBoYW5kbGVycyBvbmNlIHRoZSBwaXBlIGlzIGJyb2tlblxuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZmluaXNoJywgb25maW5pc2gpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2RyYWluJywgb25kcmFpbik7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCd1bnBpcGUnLCBvbnVucGlwZSk7XG4gICAgc3JjLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCBvbmVuZCk7XG4gICAgc3JjLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCBjbGVhbnVwKTtcblxuICAgIC8vIGlmIHRoZSByZWFkZXIgaXMgd2FpdGluZyBmb3IgYSBkcmFpbiBldmVudCBmcm9tIHRoaXNcbiAgICAvLyBzcGVjaWZpYyB3cml0ZXIsIHRoZW4gaXQgd291bGQgY2F1c2UgaXQgdG8gbmV2ZXIgc3RhcnRcbiAgICAvLyBmbG93aW5nIGFnYWluLlxuICAgIC8vIFNvLCBpZiB0aGlzIGlzIGF3YWl0aW5nIGEgZHJhaW4sIHRoZW4gd2UganVzdCBjYWxsIGl0IG5vdy5cbiAgICAvLyBJZiB3ZSBkb24ndCBrbm93LCB0aGVuIGFzc3VtZSB0aGF0IHdlIGFyZSB3YWl0aW5nIGZvciBvbmUuXG4gICAgaWYgKCFkZXN0Ll93cml0YWJsZVN0YXRlIHx8IGRlc3QuX3dyaXRhYmxlU3RhdGUubmVlZERyYWluKVxuICAgICAgb25kcmFpbigpO1xuICB9XG5cbiAgLy8gaWYgdGhlIGRlc3QgaGFzIGFuIGVycm9yLCB0aGVuIHN0b3AgcGlwaW5nIGludG8gaXQuXG4gIC8vIGhvd2V2ZXIsIGRvbid0IHN1cHByZXNzIHRoZSB0aHJvd2luZyBiZWhhdmlvciBmb3IgdGhpcy5cbiAgZnVuY3Rpb24gb25lcnJvcihlcikge1xuICAgIHVucGlwZSgpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG4gICAgaWYgKEVFLmxpc3RlbmVyQ291bnQoZGVzdCwgJ2Vycm9yJykgPT09IDApXG4gICAgICBkZXN0LmVtaXQoJ2Vycm9yJywgZXIpO1xuICB9XG4gIC8vIFRoaXMgaXMgYSBicnV0YWxseSB1Z2x5IGhhY2sgdG8gbWFrZSBzdXJlIHRoYXQgb3VyIGVycm9yIGhhbmRsZXJcbiAgLy8gaXMgYXR0YWNoZWQgYmVmb3JlIGFueSB1c2VybGFuZCBvbmVzLiAgTkVWRVIgRE8gVEhJUy5cbiAgaWYgKCFkZXN0Ll9ldmVudHMgfHwgIWRlc3QuX2V2ZW50cy5lcnJvcilcbiAgICBkZXN0Lm9uKCdlcnJvcicsIG9uZXJyb3IpO1xuICBlbHNlIGlmIChpc0FycmF5KGRlc3QuX2V2ZW50cy5lcnJvcikpXG4gICAgZGVzdC5fZXZlbnRzLmVycm9yLnVuc2hpZnQob25lcnJvcik7XG4gIGVsc2VcbiAgICBkZXN0Ll9ldmVudHMuZXJyb3IgPSBbb25lcnJvciwgZGVzdC5fZXZlbnRzLmVycm9yXTtcblxuXG5cbiAgLy8gQm90aCBjbG9zZSBhbmQgZmluaXNoIHNob3VsZCB0cmlnZ2VyIHVucGlwZSwgYnV0IG9ubHkgb25jZS5cbiAgZnVuY3Rpb24gb25jbG9zZSgpIHtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdmaW5pc2gnLCBvbmZpbmlzaCk7XG4gICAgdW5waXBlKCk7XG4gIH1cbiAgZGVzdC5vbmNlKCdjbG9zZScsIG9uY2xvc2UpO1xuICBmdW5jdGlvbiBvbmZpbmlzaCgpIHtcbiAgICBkZXN0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgIHVucGlwZSgpO1xuICB9XG4gIGRlc3Qub25jZSgnZmluaXNoJywgb25maW5pc2gpO1xuXG4gIGZ1bmN0aW9uIHVucGlwZSgpIHtcbiAgICBzcmMudW5waXBlKGRlc3QpO1xuICB9XG5cbiAgLy8gdGVsbCB0aGUgZGVzdCB0aGF0IGl0J3MgYmVpbmcgcGlwZWQgdG9cbiAgZGVzdC5lbWl0KCdwaXBlJywgc3JjKTtcblxuICAvLyBzdGFydCB0aGUgZmxvdyBpZiBpdCBoYXNuJ3QgYmVlbiBzdGFydGVkIGFscmVhZHkuXG4gIGlmICghc3RhdGUuZmxvd2luZykge1xuICAgIC8vIHRoZSBoYW5kbGVyIHRoYXQgd2FpdHMgZm9yIHJlYWRhYmxlIGV2ZW50cyBhZnRlciBhbGxcbiAgICAvLyB0aGUgZGF0YSBnZXRzIHN1Y2tlZCBvdXQgaW4gZmxvdy5cbiAgICAvLyBUaGlzIHdvdWxkIGJlIGVhc2llciB0byBmb2xsb3cgd2l0aCBhIC5vbmNlKCkgaGFuZGxlclxuICAgIC8vIGluIGZsb3coKSwgYnV0IHRoYXQgaXMgdG9vIHNsb3cuXG4gICAgdGhpcy5vbigncmVhZGFibGUnLCBwaXBlT25SZWFkYWJsZSk7XG5cbiAgICBzdGF0ZS5mbG93aW5nID0gdHJ1ZTtcbiAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgZmxvdyhzcmMpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5mdW5jdGlvbiBwaXBlT25EcmFpbihzcmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBkZXN0ID0gdGhpcztcbiAgICB2YXIgc3RhdGUgPSBzcmMuX3JlYWRhYmxlU3RhdGU7XG4gICAgc3RhdGUuYXdhaXREcmFpbi0tO1xuICAgIGlmIChzdGF0ZS5hd2FpdERyYWluID09PSAwKVxuICAgICAgZmxvdyhzcmMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBmbG93KHNyYykge1xuICB2YXIgc3RhdGUgPSBzcmMuX3JlYWRhYmxlU3RhdGU7XG4gIHZhciBjaHVuaztcbiAgc3RhdGUuYXdhaXREcmFpbiA9IDA7XG5cbiAgZnVuY3Rpb24gd3JpdGUoZGVzdCwgaSwgbGlzdCkge1xuICAgIHZhciB3cml0dGVuID0gZGVzdC53cml0ZShjaHVuayk7XG4gICAgaWYgKGZhbHNlID09PSB3cml0dGVuKSB7XG4gICAgICBzdGF0ZS5hd2FpdERyYWluKys7XG4gICAgfVxuICB9XG5cbiAgd2hpbGUgKHN0YXRlLnBpcGVzQ291bnQgJiYgbnVsbCAhPT0gKGNodW5rID0gc3JjLnJlYWQoKSkpIHtcblxuICAgIGlmIChzdGF0ZS5waXBlc0NvdW50ID09PSAxKVxuICAgICAgd3JpdGUoc3RhdGUucGlwZXMsIDAsIG51bGwpO1xuICAgIGVsc2VcbiAgICAgIGZvckVhY2goc3RhdGUucGlwZXMsIHdyaXRlKTtcblxuICAgIHNyYy5lbWl0KCdkYXRhJywgY2h1bmspO1xuXG4gICAgLy8gaWYgYW55b25lIG5lZWRzIGEgZHJhaW4sIHRoZW4gd2UgaGF2ZSB0byB3YWl0IGZvciB0aGF0LlxuICAgIGlmIChzdGF0ZS5hd2FpdERyYWluID4gMClcbiAgICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGlmIGV2ZXJ5IGRlc3RpbmF0aW9uIHdhcyB1bnBpcGVkLCBlaXRoZXIgYmVmb3JlIGVudGVyaW5nIHRoaXNcbiAgLy8gZnVuY3Rpb24sIG9yIGluIHRoZSB3aGlsZSBsb29wLCB0aGVuIHN0b3AgZmxvd2luZy5cbiAgLy9cbiAgLy8gTkI6IFRoaXMgaXMgYSBwcmV0dHkgcmFyZSBlZGdlIGNhc2UuXG4gIGlmIChzdGF0ZS5waXBlc0NvdW50ID09PSAwKSB7XG4gICAgc3RhdGUuZmxvd2luZyA9IGZhbHNlO1xuXG4gICAgLy8gaWYgdGhlcmUgd2VyZSBkYXRhIGV2ZW50IGxpc3RlbmVycyBhZGRlZCwgdGhlbiBzd2l0Y2ggdG8gb2xkIG1vZGUuXG4gICAgaWYgKEVFLmxpc3RlbmVyQ291bnQoc3JjLCAnZGF0YScpID4gMClcbiAgICAgIGVtaXREYXRhRXZlbnRzKHNyYyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gYXQgdGhpcyBwb2ludCwgbm8gb25lIG5lZWRlZCBhIGRyYWluLCBzbyB3ZSBqdXN0IHJhbiBvdXQgb2YgZGF0YVxuICAvLyBvbiB0aGUgbmV4dCByZWFkYWJsZSBldmVudCwgc3RhcnQgaXQgb3ZlciBhZ2Fpbi5cbiAgc3RhdGUucmFuT3V0ID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcGlwZU9uUmVhZGFibGUoKSB7XG4gIGlmICh0aGlzLl9yZWFkYWJsZVN0YXRlLnJhbk91dCkge1xuICAgIHRoaXMuX3JlYWRhYmxlU3RhdGUucmFuT3V0ID0gZmFsc2U7XG4gICAgZmxvdyh0aGlzKTtcbiAgfVxufVxuXG5cblJlYWRhYmxlLnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbihkZXN0KSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3JlYWRhYmxlU3RhdGU7XG5cbiAgLy8gaWYgd2UncmUgbm90IHBpcGluZyBhbnl3aGVyZSwgdGhlbiBkbyBub3RoaW5nLlxuICBpZiAoc3RhdGUucGlwZXNDb3VudCA9PT0gMClcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBqdXN0IG9uZSBkZXN0aW5hdGlvbi4gIG1vc3QgY29tbW9uIGNhc2UuXG4gIGlmIChzdGF0ZS5waXBlc0NvdW50ID09PSAxKSB7XG4gICAgLy8gcGFzc2VkIGluIG9uZSwgYnV0IGl0J3Mgbm90IHRoZSByaWdodCBvbmUuXG4gICAgaWYgKGRlc3QgJiYgZGVzdCAhPT0gc3RhdGUucGlwZXMpXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmICghZGVzdClcbiAgICAgIGRlc3QgPSBzdGF0ZS5waXBlcztcblxuICAgIC8vIGdvdCBhIG1hdGNoLlxuICAgIHN0YXRlLnBpcGVzID0gbnVsbDtcbiAgICBzdGF0ZS5waXBlc0NvdW50ID0gMDtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdyZWFkYWJsZScsIHBpcGVPblJlYWRhYmxlKTtcbiAgICBzdGF0ZS5mbG93aW5nID0gZmFsc2U7XG4gICAgaWYgKGRlc3QpXG4gICAgICBkZXN0LmVtaXQoJ3VucGlwZScsIHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gc2xvdyBjYXNlLiBtdWx0aXBsZSBwaXBlIGRlc3RpbmF0aW9ucy5cblxuICBpZiAoIWRlc3QpIHtcbiAgICAvLyByZW1vdmUgYWxsLlxuICAgIHZhciBkZXN0cyA9IHN0YXRlLnBpcGVzO1xuICAgIHZhciBsZW4gPSBzdGF0ZS5waXBlc0NvdW50O1xuICAgIHN0YXRlLnBpcGVzID0gbnVsbDtcbiAgICBzdGF0ZS5waXBlc0NvdW50ID0gMDtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdyZWFkYWJsZScsIHBpcGVPblJlYWRhYmxlKTtcbiAgICBzdGF0ZS5mbG93aW5nID0gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgZGVzdHNbaV0uZW1pdCgndW5waXBlJywgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyB0cnkgdG8gZmluZCB0aGUgcmlnaHQgb25lLlxuICB2YXIgaSA9IGluZGV4T2Yoc3RhdGUucGlwZXMsIGRlc3QpO1xuICBpZiAoaSA9PT0gLTEpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgc3RhdGUucGlwZXMuc3BsaWNlKGksIDEpO1xuICBzdGF0ZS5waXBlc0NvdW50IC09IDE7XG4gIGlmIChzdGF0ZS5waXBlc0NvdW50ID09PSAxKVxuICAgIHN0YXRlLnBpcGVzID0gc3RhdGUucGlwZXNbMF07XG5cbiAgZGVzdC5lbWl0KCd1bnBpcGUnLCB0aGlzKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIHNldCB1cCBkYXRhIGV2ZW50cyBpZiB0aGV5IGFyZSBhc2tlZCBmb3Jcbi8vIEVuc3VyZSByZWFkYWJsZSBsaXN0ZW5lcnMgZXZlbnR1YWxseSBnZXQgc29tZXRoaW5nXG5SZWFkYWJsZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbihldiwgZm4pIHtcbiAgdmFyIHJlcyA9IFN0cmVhbS5wcm90b3R5cGUub24uY2FsbCh0aGlzLCBldiwgZm4pO1xuXG4gIGlmIChldiA9PT0gJ2RhdGEnICYmICF0aGlzLl9yZWFkYWJsZVN0YXRlLmZsb3dpbmcpXG4gICAgZW1pdERhdGFFdmVudHModGhpcyk7XG5cbiAgaWYgKGV2ID09PSAncmVhZGFibGUnICYmIHRoaXMucmVhZGFibGUpIHtcbiAgICB2YXIgc3RhdGUgPSB0aGlzLl9yZWFkYWJsZVN0YXRlO1xuICAgIGlmICghc3RhdGUucmVhZGFibGVMaXN0ZW5pbmcpIHtcbiAgICAgIHN0YXRlLnJlYWRhYmxlTGlzdGVuaW5nID0gdHJ1ZTtcbiAgICAgIHN0YXRlLmVtaXR0ZWRSZWFkYWJsZSA9IGZhbHNlO1xuICAgICAgc3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcbiAgICAgIGlmICghc3RhdGUucmVhZGluZykge1xuICAgICAgICB0aGlzLnJlYWQoMCk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlLmxlbmd0aCkge1xuICAgICAgICBlbWl0UmVhZGFibGUodGhpcywgc3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXM7XG59O1xuUmVhZGFibGUucHJvdG90eXBlLmFkZExpc3RlbmVyID0gUmVhZGFibGUucHJvdG90eXBlLm9uO1xuXG4vLyBwYXVzZSgpIGFuZCByZXN1bWUoKSBhcmUgcmVtbmFudHMgb2YgdGhlIGxlZ2FjeSByZWFkYWJsZSBzdHJlYW0gQVBJXG4vLyBJZiB0aGUgdXNlciB1c2VzIHRoZW0sIHRoZW4gc3dpdGNoIGludG8gb2xkIG1vZGUuXG5SZWFkYWJsZS5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24oKSB7XG4gIGVtaXREYXRhRXZlbnRzKHRoaXMpO1xuICB0aGlzLnJlYWQoMCk7XG4gIHRoaXMuZW1pdCgncmVzdW1lJyk7XG59O1xuXG5SZWFkYWJsZS5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgZW1pdERhdGFFdmVudHModGhpcywgdHJ1ZSk7XG4gIHRoaXMuZW1pdCgncGF1c2UnKTtcbn07XG5cbmZ1bmN0aW9uIGVtaXREYXRhRXZlbnRzKHN0cmVhbSwgc3RhcnRQYXVzZWQpIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuXG4gIGlmIChzdGF0ZS5mbG93aW5nKSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2lzYWFjcy9yZWFkYWJsZS1zdHJlYW0vaXNzdWVzLzE2XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc3dpdGNoIHRvIG9sZCBtb2RlIG5vdy4nKTtcbiAgfVxuXG4gIHZhciBwYXVzZWQgPSBzdGFydFBhdXNlZCB8fCBmYWxzZTtcbiAgdmFyIHJlYWRhYmxlID0gZmFsc2U7XG5cbiAgLy8gY29udmVydCB0byBhbiBvbGQtc3R5bGUgc3RyZWFtLlxuICBzdHJlYW0ucmVhZGFibGUgPSB0cnVlO1xuICBzdHJlYW0ucGlwZSA9IFN0cmVhbS5wcm90b3R5cGUucGlwZTtcbiAgc3RyZWFtLm9uID0gc3RyZWFtLmFkZExpc3RlbmVyID0gU3RyZWFtLnByb3RvdHlwZS5vbjtcblxuICBzdHJlYW0ub24oJ3JlYWRhYmxlJywgZnVuY3Rpb24oKSB7XG4gICAgcmVhZGFibGUgPSB0cnVlO1xuXG4gICAgdmFyIGM7XG4gICAgd2hpbGUgKCFwYXVzZWQgJiYgKG51bGwgIT09IChjID0gc3RyZWFtLnJlYWQoKSkpKVxuICAgICAgc3RyZWFtLmVtaXQoJ2RhdGEnLCBjKTtcblxuICAgIGlmIChjID09PSBudWxsKSB7XG4gICAgICByZWFkYWJsZSA9IGZhbHNlO1xuICAgICAgc3RyZWFtLl9yZWFkYWJsZVN0YXRlLm5lZWRSZWFkYWJsZSA9IHRydWU7XG4gICAgfVxuICB9KTtcblxuICBzdHJlYW0ucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICBwYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuZW1pdCgncGF1c2UnKTtcbiAgfTtcblxuICBzdHJlYW0ucmVzdW1lID0gZnVuY3Rpb24oKSB7XG4gICAgcGF1c2VkID0gZmFsc2U7XG4gICAgaWYgKHJlYWRhYmxlKVxuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgc3RyZWFtLmVtaXQoJ3JlYWRhYmxlJyk7XG4gICAgICB9KTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnJlYWQoMCk7XG4gICAgdGhpcy5lbWl0KCdyZXN1bWUnKTtcbiAgfTtcblxuICAvLyBub3cgbWFrZSBpdCBzdGFydCwganVzdCBpbiBjYXNlIGl0IGhhZG4ndCBhbHJlYWR5LlxuICBzdHJlYW0uZW1pdCgncmVhZGFibGUnKTtcbn1cblxuLy8gd3JhcCBhbiBvbGQtc3R5bGUgc3RyZWFtIGFzIHRoZSBhc3luYyBkYXRhIHNvdXJjZS5cbi8vIFRoaXMgaXMgKm5vdCogcGFydCBvZiB0aGUgcmVhZGFibGUgc3RyZWFtIGludGVyZmFjZS5cbi8vIEl0IGlzIGFuIHVnbHkgdW5mb3J0dW5hdGUgbWVzcyBvZiBoaXN0b3J5LlxuUmVhZGFibGUucHJvdG90eXBlLndyYXAgPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgdmFyIHN0YXRlID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgdmFyIHBhdXNlZCA9IGZhbHNlO1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgc3RyZWFtLm9uKCdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoc3RhdGUuZGVjb2RlciAmJiAhc3RhdGUuZW5kZWQpIHtcbiAgICAgIHZhciBjaHVuayA9IHN0YXRlLmRlY29kZXIuZW5kKCk7XG4gICAgICBpZiAoY2h1bmsgJiYgY2h1bmsubGVuZ3RoKVxuICAgICAgICBzZWxmLnB1c2goY2h1bmspO1xuICAgIH1cblxuICAgIHNlbGYucHVzaChudWxsKTtcbiAgfSk7XG5cbiAgc3RyZWFtLm9uKCdkYXRhJywgZnVuY3Rpb24oY2h1bmspIHtcbiAgICBpZiAoc3RhdGUuZGVjb2RlcilcbiAgICAgIGNodW5rID0gc3RhdGUuZGVjb2Rlci53cml0ZShjaHVuayk7XG5cbiAgICAvLyBkb24ndCBza2lwIG92ZXIgZmFsc3kgdmFsdWVzIGluIG9iamVjdE1vZGVcbiAgICAvL2lmIChzdGF0ZS5vYmplY3RNb2RlICYmIHV0aWwuaXNOdWxsT3JVbmRlZmluZWQoY2h1bmspKVxuICAgIGlmIChzdGF0ZS5vYmplY3RNb2RlICYmIChjaHVuayA9PT0gbnVsbCB8fCBjaHVuayA9PT0gdW5kZWZpbmVkKSlcbiAgICAgIHJldHVybjtcbiAgICBlbHNlIGlmICghc3RhdGUub2JqZWN0TW9kZSAmJiAoIWNodW5rIHx8ICFjaHVuay5sZW5ndGgpKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHJldCA9IHNlbGYucHVzaChjaHVuayk7XG4gICAgaWYgKCFyZXQpIHtcbiAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICBzdHJlYW0ucGF1c2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHByb3h5IGFsbCB0aGUgb3RoZXIgbWV0aG9kcy5cbiAgLy8gaW1wb3J0YW50IHdoZW4gd3JhcHBpbmcgZmlsdGVycyBhbmQgZHVwbGV4ZXMuXG4gIGZvciAodmFyIGkgaW4gc3RyZWFtKSB7XG4gICAgaWYgKHR5cGVvZiBzdHJlYW1baV0gPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgdHlwZW9mIHRoaXNbaV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzW2ldID0gZnVuY3Rpb24obWV0aG9kKSB7IHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHN0cmVhbVttZXRob2RdLmFwcGx5KHN0cmVhbSwgYXJndW1lbnRzKTtcbiAgICAgIH19KGkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByb3h5IGNlcnRhaW4gaW1wb3J0YW50IGV2ZW50cy5cbiAgdmFyIGV2ZW50cyA9IFsnZXJyb3InLCAnY2xvc2UnLCAnZGVzdHJveScsICdwYXVzZScsICdyZXN1bWUnXTtcbiAgZm9yRWFjaChldmVudHMsIGZ1bmN0aW9uKGV2KSB7XG4gICAgc3RyZWFtLm9uKGV2LCBzZWxmLmVtaXQuYmluZChzZWxmLCBldikpO1xuICB9KTtcblxuICAvLyB3aGVuIHdlIHRyeSB0byBjb25zdW1lIHNvbWUgbW9yZSBieXRlcywgc2ltcGx5IHVucGF1c2UgdGhlXG4gIC8vIHVuZGVybHlpbmcgc3RyZWFtLlxuICBzZWxmLl9yZWFkID0gZnVuY3Rpb24obikge1xuICAgIGlmIChwYXVzZWQpIHtcbiAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgc3RyZWFtLnJlc3VtZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gc2VsZjtcbn07XG5cblxuXG4vLyBleHBvc2VkIGZvciB0ZXN0aW5nIHB1cnBvc2VzIG9ubHkuXG5SZWFkYWJsZS5fZnJvbUxpc3QgPSBmcm9tTGlzdDtcblxuLy8gUGx1Y2sgb2ZmIG4gYnl0ZXMgZnJvbSBhbiBhcnJheSBvZiBidWZmZXJzLlxuLy8gTGVuZ3RoIGlzIHRoZSBjb21iaW5lZCBsZW5ndGhzIG9mIGFsbCB0aGUgYnVmZmVycyBpbiB0aGUgbGlzdC5cbmZ1bmN0aW9uIGZyb21MaXN0KG4sIHN0YXRlKSB7XG4gIHZhciBsaXN0ID0gc3RhdGUuYnVmZmVyO1xuICB2YXIgbGVuZ3RoID0gc3RhdGUubGVuZ3RoO1xuICB2YXIgc3RyaW5nTW9kZSA9ICEhc3RhdGUuZGVjb2RlcjtcbiAgdmFyIG9iamVjdE1vZGUgPSAhIXN0YXRlLm9iamVjdE1vZGU7XG4gIHZhciByZXQ7XG5cbiAgLy8gbm90aGluZyBpbiB0aGUgbGlzdCwgZGVmaW5pdGVseSBlbXB0eS5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGlmIChsZW5ndGggPT09IDApXG4gICAgcmV0ID0gbnVsbDtcbiAgZWxzZSBpZiAob2JqZWN0TW9kZSlcbiAgICByZXQgPSBsaXN0LnNoaWZ0KCk7XG4gIGVsc2UgaWYgKCFuIHx8IG4gPj0gbGVuZ3RoKSB7XG4gICAgLy8gcmVhZCBpdCBhbGwsIHRydW5jYXRlIHRoZSBhcnJheS5cbiAgICBpZiAoc3RyaW5nTW9kZSlcbiAgICAgIHJldCA9IGxpc3Quam9pbignJyk7XG4gICAgZWxzZVxuICAgICAgcmV0ID0gQnVmZmVyLmNvbmNhdChsaXN0LCBsZW5ndGgpO1xuICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyByZWFkIGp1c3Qgc29tZSBvZiBpdC5cbiAgICBpZiAobiA8IGxpc3RbMF0ubGVuZ3RoKSB7XG4gICAgICAvLyBqdXN0IHRha2UgYSBwYXJ0IG9mIHRoZSBmaXJzdCBsaXN0IGl0ZW0uXG4gICAgICAvLyBzbGljZSBpcyB0aGUgc2FtZSBmb3IgYnVmZmVycyBhbmQgc3RyaW5ncy5cbiAgICAgIHZhciBidWYgPSBsaXN0WzBdO1xuICAgICAgcmV0ID0gYnVmLnNsaWNlKDAsIG4pO1xuICAgICAgbGlzdFswXSA9IGJ1Zi5zbGljZShuKTtcbiAgICB9IGVsc2UgaWYgKG4gPT09IGxpc3RbMF0ubGVuZ3RoKSB7XG4gICAgICAvLyBmaXJzdCBsaXN0IGlzIGEgcGVyZmVjdCBtYXRjaFxuICAgICAgcmV0ID0gbGlzdC5zaGlmdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjb21wbGV4IGNhc2UuXG4gICAgICAvLyB3ZSBoYXZlIGVub3VnaCB0byBjb3ZlciBpdCwgYnV0IGl0IHNwYW5zIHBhc3QgdGhlIGZpcnN0IGJ1ZmZlci5cbiAgICAgIGlmIChzdHJpbmdNb2RlKVxuICAgICAgICByZXQgPSAnJztcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0ID0gbmV3IEJ1ZmZlcihuKTtcblxuICAgICAgdmFyIGMgPSAwO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGwgJiYgYyA8IG47IGkrKykge1xuICAgICAgICB2YXIgYnVmID0gbGlzdFswXTtcbiAgICAgICAgdmFyIGNweSA9IE1hdGgubWluKG4gLSBjLCBidWYubGVuZ3RoKTtcblxuICAgICAgICBpZiAoc3RyaW5nTW9kZSlcbiAgICAgICAgICByZXQgKz0gYnVmLnNsaWNlKDAsIGNweSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBidWYuY29weShyZXQsIGMsIDAsIGNweSk7XG5cbiAgICAgICAgaWYgKGNweSA8IGJ1Zi5sZW5ndGgpXG4gICAgICAgICAgbGlzdFswXSA9IGJ1Zi5zbGljZShjcHkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuXG4gICAgICAgIGMgKz0gY3B5O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIGVuZFJlYWRhYmxlKHN0cmVhbSkge1xuICB2YXIgc3RhdGUgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG5cbiAgLy8gSWYgd2UgZ2V0IGhlcmUgYmVmb3JlIGNvbnN1bWluZyBhbGwgdGhlIGJ5dGVzLCB0aGVuIHRoYXQgaXMgYVxuICAvLyBidWcgaW4gbm9kZS4gIFNob3VsZCBuZXZlciBoYXBwZW4uXG4gIGlmIChzdGF0ZS5sZW5ndGggPiAwKVxuICAgIHRocm93IG5ldyBFcnJvcignZW5kUmVhZGFibGUgY2FsbGVkIG9uIG5vbi1lbXB0eSBzdHJlYW0nKTtcblxuICBpZiAoIXN0YXRlLmVuZEVtaXR0ZWQgJiYgc3RhdGUuY2FsbGVkUmVhZCkge1xuICAgIHN0YXRlLmVuZGVkID0gdHJ1ZTtcbiAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gQ2hlY2sgdGhhdCB3ZSBkaWRuJ3QgZ2V0IG9uZSBsYXN0IHVuc2hpZnQuXG4gICAgICBpZiAoIXN0YXRlLmVuZEVtaXR0ZWQgJiYgc3RhdGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHN0YXRlLmVuZEVtaXR0ZWQgPSB0cnVlO1xuICAgICAgICBzdHJlYW0ucmVhZGFibGUgPSBmYWxzZTtcbiAgICAgICAgc3RyZWFtLmVtaXQoJ2VuZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvckVhY2ggKHhzLCBmKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZih4c1tpXSwgaSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5kZXhPZiAoeHMsIHgpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB4cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoeHNbaV0gPT09IHgpIHJldHVybiBpO1xuICB9XG4gIHJldHVybiAtMTtcbn1cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoJ19wcm9jZXNzJykpIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cblxuLy8gYSB0cmFuc2Zvcm0gc3RyZWFtIGlzIGEgcmVhZGFibGUvd3JpdGFibGUgc3RyZWFtIHdoZXJlIHlvdSBkb1xuLy8gc29tZXRoaW5nIHdpdGggdGhlIGRhdGEuICBTb21ldGltZXMgaXQncyBjYWxsZWQgYSBcImZpbHRlclwiLFxuLy8gYnV0IHRoYXQncyBub3QgYSBncmVhdCBuYW1lIGZvciBpdCwgc2luY2UgdGhhdCBpbXBsaWVzIGEgdGhpbmcgd2hlcmVcbi8vIHNvbWUgYml0cyBwYXNzIHRocm91Z2gsIGFuZCBvdGhlcnMgYXJlIHNpbXBseSBpZ25vcmVkLiAgKFRoYXQgd291bGRcbi8vIGJlIGEgdmFsaWQgZXhhbXBsZSBvZiBhIHRyYW5zZm9ybSwgb2YgY291cnNlLilcbi8vXG4vLyBXaGlsZSB0aGUgb3V0cHV0IGlzIGNhdXNhbGx5IHJlbGF0ZWQgdG8gdGhlIGlucHV0LCBpdCdzIG5vdCBhXG4vLyBuZWNlc3NhcmlseSBzeW1tZXRyaWMgb3Igc3luY2hyb25vdXMgdHJhbnNmb3JtYXRpb24uICBGb3IgZXhhbXBsZSxcbi8vIGEgemxpYiBzdHJlYW0gbWlnaHQgdGFrZSBtdWx0aXBsZSBwbGFpbi10ZXh0IHdyaXRlcygpLCBhbmQgdGhlblxuLy8gZW1pdCBhIHNpbmdsZSBjb21wcmVzc2VkIGNodW5rIHNvbWUgdGltZSBpbiB0aGUgZnV0dXJlLlxuLy9cbi8vIEhlcmUncyBob3cgdGhpcyB3b3Jrczpcbi8vXG4vLyBUaGUgVHJhbnNmb3JtIHN0cmVhbSBoYXMgYWxsIHRoZSBhc3BlY3RzIG9mIHRoZSByZWFkYWJsZSBhbmQgd3JpdGFibGVcbi8vIHN0cmVhbSBjbGFzc2VzLiAgV2hlbiB5b3Ugd3JpdGUoY2h1bmspLCB0aGF0IGNhbGxzIF93cml0ZShjaHVuayxjYilcbi8vIGludGVybmFsbHksIGFuZCByZXR1cm5zIGZhbHNlIGlmIHRoZXJlJ3MgYSBsb3Qgb2YgcGVuZGluZyB3cml0ZXNcbi8vIGJ1ZmZlcmVkIHVwLiAgV2hlbiB5b3UgY2FsbCByZWFkKCksIHRoYXQgY2FsbHMgX3JlYWQobikgdW50aWxcbi8vIHRoZXJlJ3MgZW5vdWdoIHBlbmRpbmcgcmVhZGFibGUgZGF0YSBidWZmZXJlZCB1cC5cbi8vXG4vLyBJbiBhIHRyYW5zZm9ybSBzdHJlYW0sIHRoZSB3cml0dGVuIGRhdGEgaXMgcGxhY2VkIGluIGEgYnVmZmVyLiAgV2hlblxuLy8gX3JlYWQobikgaXMgY2FsbGVkLCBpdCB0cmFuc2Zvcm1zIHRoZSBxdWV1ZWQgdXAgZGF0YSwgY2FsbGluZyB0aGVcbi8vIGJ1ZmZlcmVkIF93cml0ZSBjYidzIGFzIGl0IGNvbnN1bWVzIGNodW5rcy4gIElmIGNvbnN1bWluZyBhIHNpbmdsZVxuLy8gd3JpdHRlbiBjaHVuayB3b3VsZCByZXN1bHQgaW4gbXVsdGlwbGUgb3V0cHV0IGNodW5rcywgdGhlbiB0aGUgZmlyc3Rcbi8vIG91dHB1dHRlZCBiaXQgY2FsbHMgdGhlIHJlYWRjYiwgYW5kIHN1YnNlcXVlbnQgY2h1bmtzIGp1c3QgZ28gaW50b1xuLy8gdGhlIHJlYWQgYnVmZmVyLCBhbmQgd2lsbCBjYXVzZSBpdCB0byBlbWl0ICdyZWFkYWJsZScgaWYgbmVjZXNzYXJ5LlxuLy9cbi8vIFRoaXMgd2F5LCBiYWNrLXByZXNzdXJlIGlzIGFjdHVhbGx5IGRldGVybWluZWQgYnkgdGhlIHJlYWRpbmcgc2lkZSxcbi8vIHNpbmNlIF9yZWFkIGhhcyB0byBiZSBjYWxsZWQgdG8gc3RhcnQgcHJvY2Vzc2luZyBhIG5ldyBjaHVuay4gIEhvd2V2ZXIsXG4vLyBhIHBhdGhvbG9naWNhbCBpbmZsYXRlIHR5cGUgb2YgdHJhbnNmb3JtIGNhbiBjYXVzZSBleGNlc3NpdmUgYnVmZmVyaW5nXG4vLyBoZXJlLiAgRm9yIGV4YW1wbGUsIGltYWdpbmUgYSBzdHJlYW0gd2hlcmUgZXZlcnkgYnl0ZSBvZiBpbnB1dCBpc1xuLy8gaW50ZXJwcmV0ZWQgYXMgYW4gaW50ZWdlciBmcm9tIDAtMjU1LCBhbmQgdGhlbiByZXN1bHRzIGluIHRoYXQgbWFueVxuLy8gYnl0ZXMgb2Ygb3V0cHV0LiAgV3JpdGluZyB0aGUgNCBieXRlcyB7ZmYsZmYsZmYsZmZ9IHdvdWxkIHJlc3VsdCBpblxuLy8gMWtiIG9mIGRhdGEgYmVpbmcgb3V0cHV0LiAgSW4gdGhpcyBjYXNlLCB5b3UgY291bGQgd3JpdGUgYSB2ZXJ5IHNtYWxsXG4vLyBhbW91bnQgb2YgaW5wdXQsIGFuZCBlbmQgdXAgd2l0aCBhIHZlcnkgbGFyZ2UgYW1vdW50IG9mIG91dHB1dC4gIEluXG4vLyBzdWNoIGEgcGF0aG9sb2dpY2FsIGluZmxhdGluZyBtZWNoYW5pc20sIHRoZXJlJ2QgYmUgbm8gd2F5IHRvIHRlbGxcbi8vIHRoZSBzeXN0ZW0gdG8gc3RvcCBkb2luZyB0aGUgdHJhbnNmb3JtLiAgQSBzaW5nbGUgNE1CIHdyaXRlIGNvdWxkXG4vLyBjYXVzZSB0aGUgc3lzdGVtIHRvIHJ1biBvdXQgb2YgbWVtb3J5LlxuLy9cbi8vIEhvd2V2ZXIsIGV2ZW4gaW4gc3VjaCBhIHBhdGhvbG9naWNhbCBjYXNlLCBvbmx5IGEgc2luZ2xlIHdyaXR0ZW4gY2h1bmtcbi8vIHdvdWxkIGJlIGNvbnN1bWVkLCBhbmQgdGhlbiB0aGUgcmVzdCB3b3VsZCB3YWl0ICh1bi10cmFuc2Zvcm1lZCkgdW50aWxcbi8vIHRoZSByZXN1bHRzIG9mIHRoZSBwcmV2aW91cyB0cmFuc2Zvcm1lZCBjaHVuayB3ZXJlIGNvbnN1bWVkLlxuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zZm9ybTtcblxudmFyIER1cGxleCA9IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcblxuLyo8cmVwbGFjZW1lbnQ+Ki9cbnZhciB1dGlsID0gcmVxdWlyZSgnY29yZS11dGlsLWlzJyk7XG51dGlsLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG51dGlsLmluaGVyaXRzKFRyYW5zZm9ybSwgRHVwbGV4KTtcblxuXG5mdW5jdGlvbiBUcmFuc2Zvcm1TdGF0ZShvcHRpb25zLCBzdHJlYW0pIHtcbiAgdGhpcy5hZnRlclRyYW5zZm9ybSA9IGZ1bmN0aW9uKGVyLCBkYXRhKSB7XG4gICAgcmV0dXJuIGFmdGVyVHJhbnNmb3JtKHN0cmVhbSwgZXIsIGRhdGEpO1xuICB9O1xuXG4gIHRoaXMubmVlZFRyYW5zZm9ybSA9IGZhbHNlO1xuICB0aGlzLnRyYW5zZm9ybWluZyA9IGZhbHNlO1xuICB0aGlzLndyaXRlY2IgPSBudWxsO1xuICB0aGlzLndyaXRlY2h1bmsgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBhZnRlclRyYW5zZm9ybShzdHJlYW0sIGVyLCBkYXRhKSB7XG4gIHZhciB0cyA9IHN0cmVhbS5fdHJhbnNmb3JtU3RhdGU7XG4gIHRzLnRyYW5zZm9ybWluZyA9IGZhbHNlO1xuXG4gIHZhciBjYiA9IHRzLndyaXRlY2I7XG5cbiAgaWYgKCFjYilcbiAgICByZXR1cm4gc3RyZWFtLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCdubyB3cml0ZWNiIGluIFRyYW5zZm9ybSBjbGFzcycpKTtcblxuICB0cy53cml0ZWNodW5rID0gbnVsbDtcbiAgdHMud3JpdGVjYiA9IG51bGw7XG5cbiAgaWYgKGRhdGEgIT09IG51bGwgJiYgZGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgIHN0cmVhbS5wdXNoKGRhdGEpO1xuXG4gIGlmIChjYilcbiAgICBjYihlcik7XG5cbiAgdmFyIHJzID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuICBycy5yZWFkaW5nID0gZmFsc2U7XG4gIGlmIChycy5uZWVkUmVhZGFibGUgfHwgcnMubGVuZ3RoIDwgcnMuaGlnaFdhdGVyTWFyaykge1xuICAgIHN0cmVhbS5fcmVhZChycy5oaWdoV2F0ZXJNYXJrKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIFRyYW5zZm9ybShvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBUcmFuc2Zvcm0pKVxuICAgIHJldHVybiBuZXcgVHJhbnNmb3JtKG9wdGlvbnMpO1xuXG4gIER1cGxleC5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gIHZhciB0cyA9IHRoaXMuX3RyYW5zZm9ybVN0YXRlID0gbmV3IFRyYW5zZm9ybVN0YXRlKG9wdGlvbnMsIHRoaXMpO1xuXG4gIC8vIHdoZW4gdGhlIHdyaXRhYmxlIHNpZGUgZmluaXNoZXMsIHRoZW4gZmx1c2ggb3V0IGFueXRoaW5nIHJlbWFpbmluZy5cbiAgdmFyIHN0cmVhbSA9IHRoaXM7XG5cbiAgLy8gc3RhcnQgb3V0IGFza2luZyBmb3IgYSByZWFkYWJsZSBldmVudCBvbmNlIGRhdGEgaXMgdHJhbnNmb3JtZWQuXG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUubmVlZFJlYWRhYmxlID0gdHJ1ZTtcblxuICAvLyB3ZSBoYXZlIGltcGxlbWVudGVkIHRoZSBfcmVhZCBtZXRob2QsIGFuZCBkb25lIHRoZSBvdGhlciB0aGluZ3NcbiAgLy8gdGhhdCBSZWFkYWJsZSB3YW50cyBiZWZvcmUgdGhlIGZpcnN0IF9yZWFkIGNhbGwsIHNvIHVuc2V0IHRoZVxuICAvLyBzeW5jIGd1YXJkIGZsYWcuXG4gIHRoaXMuX3JlYWRhYmxlU3RhdGUuc3luYyA9IGZhbHNlO1xuXG4gIHRoaXMub25jZSgnZmluaXNoJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiB0aGlzLl9mbHVzaClcbiAgICAgIHRoaXMuX2ZsdXNoKGZ1bmN0aW9uKGVyKSB7XG4gICAgICAgIGRvbmUoc3RyZWFtLCBlcik7XG4gICAgICB9KTtcbiAgICBlbHNlXG4gICAgICBkb25lKHN0cmVhbSk7XG4gIH0pO1xufVxuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihjaHVuaywgZW5jb2RpbmcpIHtcbiAgdGhpcy5fdHJhbnNmb3JtU3RhdGUubmVlZFRyYW5zZm9ybSA9IGZhbHNlO1xuICByZXR1cm4gRHVwbGV4LnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgY2h1bmssIGVuY29kaW5nKTtcbn07XG5cbi8vIFRoaXMgaXMgdGhlIHBhcnQgd2hlcmUgeW91IGRvIHN0dWZmIVxuLy8gb3ZlcnJpZGUgdGhpcyBmdW5jdGlvbiBpbiBpbXBsZW1lbnRhdGlvbiBjbGFzc2VzLlxuLy8gJ2NodW5rJyBpcyBhbiBpbnB1dCBjaHVuay5cbi8vXG4vLyBDYWxsIGBwdXNoKG5ld0NodW5rKWAgdG8gcGFzcyBhbG9uZyB0cmFuc2Zvcm1lZCBvdXRwdXRcbi8vIHRvIHRoZSByZWFkYWJsZSBzaWRlLiAgWW91IG1heSBjYWxsICdwdXNoJyB6ZXJvIG9yIG1vcmUgdGltZXMuXG4vL1xuLy8gQ2FsbCBgY2IoZXJyKWAgd2hlbiB5b3UgYXJlIGRvbmUgd2l0aCB0aGlzIGNodW5rLiAgSWYgeW91IHBhc3Ncbi8vIGFuIGVycm9yLCB0aGVuIHRoYXQnbGwgcHV0IHRoZSBodXJ0IG9uIHRoZSB3aG9sZSBvcGVyYXRpb24uICBJZiB5b3Vcbi8vIG5ldmVyIGNhbGwgY2IoKSwgdGhlbiB5b3UnbGwgbmV2ZXIgZ2V0IGFub3RoZXIgY2h1bmsuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLl90cmFuc2Zvcm0gPSBmdW5jdGlvbihjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJyk7XG59O1xuXG5UcmFuc2Zvcm0ucHJvdG90eXBlLl93cml0ZSA9IGZ1bmN0aW9uKGNodW5rLCBlbmNvZGluZywgY2IpIHtcbiAgdmFyIHRzID0gdGhpcy5fdHJhbnNmb3JtU3RhdGU7XG4gIHRzLndyaXRlY2IgPSBjYjtcbiAgdHMud3JpdGVjaHVuayA9IGNodW5rO1xuICB0cy53cml0ZWVuY29kaW5nID0gZW5jb2Rpbmc7XG4gIGlmICghdHMudHJhbnNmb3JtaW5nKSB7XG4gICAgdmFyIHJzID0gdGhpcy5fcmVhZGFibGVTdGF0ZTtcbiAgICBpZiAodHMubmVlZFRyYW5zZm9ybSB8fFxuICAgICAgICBycy5uZWVkUmVhZGFibGUgfHxcbiAgICAgICAgcnMubGVuZ3RoIDwgcnMuaGlnaFdhdGVyTWFyaylcbiAgICAgIHRoaXMuX3JlYWQocnMuaGlnaFdhdGVyTWFyayk7XG4gIH1cbn07XG5cbi8vIERvZXNuJ3QgbWF0dGVyIHdoYXQgdGhlIGFyZ3MgYXJlIGhlcmUuXG4vLyBfdHJhbnNmb3JtIGRvZXMgYWxsIHRoZSB3b3JrLlxuLy8gVGhhdCB3ZSBnb3QgaGVyZSBtZWFucyB0aGF0IHRoZSByZWFkYWJsZSBzaWRlIHdhbnRzIG1vcmUgZGF0YS5cblRyYW5zZm9ybS5wcm90b3R5cGUuX3JlYWQgPSBmdW5jdGlvbihuKSB7XG4gIHZhciB0cyA9IHRoaXMuX3RyYW5zZm9ybVN0YXRlO1xuXG4gIGlmICh0cy53cml0ZWNodW5rICE9PSBudWxsICYmIHRzLndyaXRlY2IgJiYgIXRzLnRyYW5zZm9ybWluZykge1xuICAgIHRzLnRyYW5zZm9ybWluZyA9IHRydWU7XG4gICAgdGhpcy5fdHJhbnNmb3JtKHRzLndyaXRlY2h1bmssIHRzLndyaXRlZW5jb2RpbmcsIHRzLmFmdGVyVHJhbnNmb3JtKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBtYXJrIHRoYXQgd2UgbmVlZCBhIHRyYW5zZm9ybSwgc28gdGhhdCBhbnkgZGF0YSB0aGF0IGNvbWVzIGluXG4gICAgLy8gd2lsbCBnZXQgcHJvY2Vzc2VkLCBub3cgdGhhdCB3ZSd2ZSBhc2tlZCBmb3IgaXQuXG4gICAgdHMubmVlZFRyYW5zZm9ybSA9IHRydWU7XG4gIH1cbn07XG5cblxuZnVuY3Rpb24gZG9uZShzdHJlYW0sIGVyKSB7XG4gIGlmIChlcilcbiAgICByZXR1cm4gc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXIpO1xuXG4gIC8vIGlmIHRoZXJlJ3Mgbm90aGluZyBpbiB0aGUgd3JpdGUgYnVmZmVyLCB0aGVuIHRoYXQgbWVhbnNcbiAgLy8gdGhhdCBub3RoaW5nIG1vcmUgd2lsbCBldmVyIGJlIHByb3ZpZGVkXG4gIHZhciB3cyA9IHN0cmVhbS5fd3JpdGFibGVTdGF0ZTtcbiAgdmFyIHJzID0gc3RyZWFtLl9yZWFkYWJsZVN0YXRlO1xuICB2YXIgdHMgPSBzdHJlYW0uX3RyYW5zZm9ybVN0YXRlO1xuXG4gIGlmICh3cy5sZW5ndGgpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYWxsaW5nIHRyYW5zZm9ybSBkb25lIHdoZW4gd3MubGVuZ3RoICE9IDAnKTtcblxuICBpZiAodHMudHJhbnNmb3JtaW5nKVxuICAgIHRocm93IG5ldyBFcnJvcignY2FsbGluZyB0cmFuc2Zvcm0gZG9uZSB3aGVuIHN0aWxsIHRyYW5zZm9ybWluZycpO1xuXG4gIHJldHVybiBzdHJlYW0ucHVzaChudWxsKTtcbn1cbiIsIihmdW5jdGlvbiAocHJvY2Vzcyl7XG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gQSBiaXQgc2ltcGxlciB0aGFuIHJlYWRhYmxlIHN0cmVhbXMuXG4vLyBJbXBsZW1lbnQgYW4gYXN5bmMgLl93cml0ZShjaHVuaywgY2IpLCBhbmQgaXQnbGwgaGFuZGxlIGFsbFxuLy8gdGhlIGRyYWluIGV2ZW50IGVtaXNzaW9uIGFuZCBidWZmZXJpbmcuXG5cbm1vZHVsZS5leHBvcnRzID0gV3JpdGFibGU7XG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyO1xuLyo8L3JlcGxhY2VtZW50PiovXG5cbldyaXRhYmxlLldyaXRhYmxlU3RhdGUgPSBXcml0YWJsZVN0YXRlO1xuXG5cbi8qPHJlcGxhY2VtZW50PiovXG52YXIgdXRpbCA9IHJlcXVpcmUoJ2NvcmUtdXRpbC1pcycpO1xudXRpbC5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudmFyIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xuXG51dGlsLmluaGVyaXRzKFdyaXRhYmxlLCBTdHJlYW0pO1xuXG5mdW5jdGlvbiBXcml0ZVJlcShjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHRoaXMuY2h1bmsgPSBjaHVuaztcbiAgdGhpcy5lbmNvZGluZyA9IGVuY29kaW5nO1xuICB0aGlzLmNhbGxiYWNrID0gY2I7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RhdGUob3B0aW9ucywgc3RyZWFtKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIC8vIHRoZSBwb2ludCBhdCB3aGljaCB3cml0ZSgpIHN0YXJ0cyByZXR1cm5pbmcgZmFsc2VcbiAgLy8gTm90ZTogMCBpcyBhIHZhbGlkIHZhbHVlLCBtZWFucyB0aGF0IHdlIGFsd2F5cyByZXR1cm4gZmFsc2UgaWZcbiAgLy8gdGhlIGVudGlyZSBidWZmZXIgaXMgbm90IGZsdXNoZWQgaW1tZWRpYXRlbHkgb24gd3JpdGUoKVxuICB2YXIgaHdtID0gb3B0aW9ucy5oaWdoV2F0ZXJNYXJrO1xuICB0aGlzLmhpZ2hXYXRlck1hcmsgPSAoaHdtIHx8IGh3bSA9PT0gMCkgPyBod20gOiAxNiAqIDEwMjQ7XG5cbiAgLy8gb2JqZWN0IHN0cmVhbSBmbGFnIHRvIGluZGljYXRlIHdoZXRoZXIgb3Igbm90IHRoaXMgc3RyZWFtXG4gIC8vIGNvbnRhaW5zIGJ1ZmZlcnMgb3Igb2JqZWN0cy5cbiAgdGhpcy5vYmplY3RNb2RlID0gISFvcHRpb25zLm9iamVjdE1vZGU7XG5cbiAgLy8gY2FzdCB0byBpbnRzLlxuICB0aGlzLmhpZ2hXYXRlck1hcmsgPSB+fnRoaXMuaGlnaFdhdGVyTWFyaztcblxuICB0aGlzLm5lZWREcmFpbiA9IGZhbHNlO1xuICAvLyBhdCB0aGUgc3RhcnQgb2YgY2FsbGluZyBlbmQoKVxuICB0aGlzLmVuZGluZyA9IGZhbHNlO1xuICAvLyB3aGVuIGVuZCgpIGhhcyBiZWVuIGNhbGxlZCwgYW5kIHJldHVybmVkXG4gIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgLy8gd2hlbiAnZmluaXNoJyBpcyBlbWl0dGVkXG4gIHRoaXMuZmluaXNoZWQgPSBmYWxzZTtcblxuICAvLyBzaG91bGQgd2UgZGVjb2RlIHN0cmluZ3MgaW50byBidWZmZXJzIGJlZm9yZSBwYXNzaW5nIHRvIF93cml0ZT9cbiAgLy8gdGhpcyBpcyBoZXJlIHNvIHRoYXQgc29tZSBub2RlLWNvcmUgc3RyZWFtcyBjYW4gb3B0aW1pemUgc3RyaW5nXG4gIC8vIGhhbmRsaW5nIGF0IGEgbG93ZXIgbGV2ZWwuXG4gIHZhciBub0RlY29kZSA9IG9wdGlvbnMuZGVjb2RlU3RyaW5ncyA9PT0gZmFsc2U7XG4gIHRoaXMuZGVjb2RlU3RyaW5ncyA9ICFub0RlY29kZTtcblxuICAvLyBDcnlwdG8gaXMga2luZCBvZiBvbGQgYW5kIGNydXN0eS4gIEhpc3RvcmljYWxseSwgaXRzIGRlZmF1bHQgc3RyaW5nXG4gIC8vIGVuY29kaW5nIGlzICdiaW5hcnknIHNvIHdlIGhhdmUgdG8gbWFrZSB0aGlzIGNvbmZpZ3VyYWJsZS5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIGluIHRoZSB1bml2ZXJzZSB1c2VzICd1dGY4JywgdGhvdWdoLlxuICB0aGlzLmRlZmF1bHRFbmNvZGluZyA9IG9wdGlvbnMuZGVmYXVsdEVuY29kaW5nIHx8ICd1dGY4JztcblxuICAvLyBub3QgYW4gYWN0dWFsIGJ1ZmZlciB3ZSBrZWVwIHRyYWNrIG9mLCBidXQgYSBtZWFzdXJlbWVudFxuICAvLyBvZiBob3cgbXVjaCB3ZSdyZSB3YWl0aW5nIHRvIGdldCBwdXNoZWQgdG8gc29tZSB1bmRlcmx5aW5nXG4gIC8vIHNvY2tldCBvciBmaWxlLlxuICB0aGlzLmxlbmd0aCA9IDA7XG5cbiAgLy8gYSBmbGFnIHRvIHNlZSB3aGVuIHdlJ3JlIGluIHRoZSBtaWRkbGUgb2YgYSB3cml0ZS5cbiAgdGhpcy53cml0aW5nID0gZmFsc2U7XG5cbiAgLy8gYSBmbGFnIHRvIGJlIGFibGUgdG8gdGVsbCBpZiB0aGUgb253cml0ZSBjYiBpcyBjYWxsZWQgaW1tZWRpYXRlbHksXG4gIC8vIG9yIG9uIGEgbGF0ZXIgdGljay4gIFdlIHNldCB0aGlzIHRvIHRydWUgYXQgZmlyc3QsIGJlY3Vhc2UgYW55XG4gIC8vIGFjdGlvbnMgdGhhdCBzaG91bGRuJ3QgaGFwcGVuIHVudGlsIFwibGF0ZXJcIiBzaG91bGQgZ2VuZXJhbGx5IGFsc29cbiAgLy8gbm90IGhhcHBlbiBiZWZvcmUgdGhlIGZpcnN0IHdyaXRlIGNhbGwuXG4gIHRoaXMuc3luYyA9IHRydWU7XG5cbiAgLy8gYSBmbGFnIHRvIGtub3cgaWYgd2UncmUgcHJvY2Vzc2luZyBwcmV2aW91c2x5IGJ1ZmZlcmVkIGl0ZW1zLCB3aGljaFxuICAvLyBtYXkgY2FsbCB0aGUgX3dyaXRlKCkgY2FsbGJhY2sgaW4gdGhlIHNhbWUgdGljaywgc28gdGhhdCB3ZSBkb24ndFxuICAvLyBlbmQgdXAgaW4gYW4gb3ZlcmxhcHBlZCBvbndyaXRlIHNpdHVhdGlvbi5cbiAgdGhpcy5idWZmZXJQcm9jZXNzaW5nID0gZmFsc2U7XG5cbiAgLy8gdGhlIGNhbGxiYWNrIHRoYXQncyBwYXNzZWQgdG8gX3dyaXRlKGNodW5rLGNiKVxuICB0aGlzLm9ud3JpdGUgPSBmdW5jdGlvbihlcikge1xuICAgIG9ud3JpdGUoc3RyZWFtLCBlcik7XG4gIH07XG5cbiAgLy8gdGhlIGNhbGxiYWNrIHRoYXQgdGhlIHVzZXIgc3VwcGxpZXMgdG8gd3JpdGUoY2h1bmssZW5jb2RpbmcsY2IpXG4gIHRoaXMud3JpdGVjYiA9IG51bGw7XG5cbiAgLy8gdGhlIGFtb3VudCB0aGF0IGlzIGJlaW5nIHdyaXR0ZW4gd2hlbiBfd3JpdGUgaXMgY2FsbGVkLlxuICB0aGlzLndyaXRlbGVuID0gMDtcblxuICB0aGlzLmJ1ZmZlciA9IFtdO1xuXG4gIC8vIFRydWUgaWYgdGhlIGVycm9yIHdhcyBhbHJlYWR5IGVtaXR0ZWQgYW5kIHNob3VsZCBub3QgYmUgdGhyb3duIGFnYWluXG4gIHRoaXMuZXJyb3JFbWl0dGVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIFdyaXRhYmxlKG9wdGlvbnMpIHtcbiAgdmFyIER1cGxleCA9IHJlcXVpcmUoJy4vX3N0cmVhbV9kdXBsZXgnKTtcblxuICAvLyBXcml0YWJsZSBjdG9yIGlzIGFwcGxpZWQgdG8gRHVwbGV4ZXMsIHRob3VnaCB0aGV5J3JlIG5vdFxuICAvLyBpbnN0YW5jZW9mIFdyaXRhYmxlLCB0aGV5J3JlIGluc3RhbmNlb2YgUmVhZGFibGUuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBXcml0YWJsZSkgJiYgISh0aGlzIGluc3RhbmNlb2YgRHVwbGV4KSlcbiAgICByZXR1cm4gbmV3IFdyaXRhYmxlKG9wdGlvbnMpO1xuXG4gIHRoaXMuX3dyaXRhYmxlU3RhdGUgPSBuZXcgV3JpdGFibGVTdGF0ZShvcHRpb25zLCB0aGlzKTtcblxuICAvLyBsZWdhY3kuXG4gIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuXG4gIFN0cmVhbS5jYWxsKHRoaXMpO1xufVxuXG4vLyBPdGhlcndpc2UgcGVvcGxlIGNhbiBwaXBlIFdyaXRhYmxlIHN0cmVhbXMsIHdoaWNoIGlzIGp1c3Qgd3JvbmcuXG5Xcml0YWJsZS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCdDYW5ub3QgcGlwZS4gTm90IHJlYWRhYmxlLicpKTtcbn07XG5cblxuZnVuY3Rpb24gd3JpdGVBZnRlckVuZChzdHJlYW0sIHN0YXRlLCBjYikge1xuICB2YXIgZXIgPSBuZXcgRXJyb3IoJ3dyaXRlIGFmdGVyIGVuZCcpO1xuICAvLyBUT0RPOiBkZWZlciBlcnJvciBldmVudHMgY29uc2lzdGVudGx5IGV2ZXJ5d2hlcmUsIG5vdCBqdXN0IHRoZSBjYlxuICBzdHJlYW0uZW1pdCgnZXJyb3InLCBlcik7XG4gIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgY2IoZXIpO1xuICB9KTtcbn1cblxuLy8gSWYgd2UgZ2V0IHNvbWV0aGluZyB0aGF0IGlzIG5vdCBhIGJ1ZmZlciwgc3RyaW5nLCBudWxsLCBvciB1bmRlZmluZWQsXG4vLyBhbmQgd2UncmUgbm90IGluIG9iamVjdE1vZGUsIHRoZW4gdGhhdCdzIGFuIGVycm9yLlxuLy8gT3RoZXJ3aXNlIHN0cmVhbSBjaHVua3MgYXJlIGFsbCBjb25zaWRlcmVkIHRvIGJlIG9mIGxlbmd0aD0xLCBhbmQgdGhlXG4vLyB3YXRlcm1hcmtzIGRldGVybWluZSBob3cgbWFueSBvYmplY3RzIHRvIGtlZXAgaW4gdGhlIGJ1ZmZlciwgcmF0aGVyIHRoYW5cbi8vIGhvdyBtYW55IGJ5dGVzIG9yIGNoYXJhY3RlcnMuXG5mdW5jdGlvbiB2YWxpZENodW5rKHN0cmVhbSwgc3RhdGUsIGNodW5rLCBjYikge1xuICB2YXIgdmFsaWQgPSB0cnVlO1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihjaHVuaykgJiZcbiAgICAgICdzdHJpbmcnICE9PSB0eXBlb2YgY2h1bmsgJiZcbiAgICAgIGNodW5rICE9PSBudWxsICYmXG4gICAgICBjaHVuayAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAhc3RhdGUub2JqZWN0TW9kZSkge1xuICAgIHZhciBlciA9IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbm9uLXN0cmluZy9idWZmZXIgY2h1bmsnKTtcbiAgICBzdHJlYW0uZW1pdCgnZXJyb3InLCBlcik7XG4gICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgIGNiKGVyKTtcbiAgICB9KTtcbiAgICB2YWxpZCA9IGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWxpZDtcbn1cblxuV3JpdGFibGUucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24oY2h1bmssIGVuY29kaW5nLCBjYikge1xuICB2YXIgc3RhdGUgPSB0aGlzLl93cml0YWJsZVN0YXRlO1xuICB2YXIgcmV0ID0gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gZW5jb2Rpbmc7XG4gICAgZW5jb2RpbmcgPSBudWxsO1xuICB9XG5cbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihjaHVuaykpXG4gICAgZW5jb2RpbmcgPSAnYnVmZmVyJztcbiAgZWxzZSBpZiAoIWVuY29kaW5nKVxuICAgIGVuY29kaW5nID0gc3RhdGUuZGVmYXVsdEVuY29kaW5nO1xuXG4gIGlmICh0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpXG4gICAgY2IgPSBmdW5jdGlvbigpIHt9O1xuXG4gIGlmIChzdGF0ZS5lbmRlZClcbiAgICB3cml0ZUFmdGVyRW5kKHRoaXMsIHN0YXRlLCBjYik7XG4gIGVsc2UgaWYgKHZhbGlkQ2h1bmsodGhpcywgc3RhdGUsIGNodW5rLCBjYikpXG4gICAgcmV0ID0gd3JpdGVPckJ1ZmZlcih0aGlzLCBzdGF0ZSwgY2h1bmssIGVuY29kaW5nLCBjYik7XG5cbiAgcmV0dXJuIHJldDtcbn07XG5cbmZ1bmN0aW9uIGRlY29kZUNodW5rKHN0YXRlLCBjaHVuaywgZW5jb2RpbmcpIHtcbiAgaWYgKCFzdGF0ZS5vYmplY3RNb2RlICYmXG4gICAgICBzdGF0ZS5kZWNvZGVTdHJpbmdzICE9PSBmYWxzZSAmJlxuICAgICAgdHlwZW9mIGNodW5rID09PSAnc3RyaW5nJykge1xuICAgIGNodW5rID0gbmV3IEJ1ZmZlcihjaHVuaywgZW5jb2RpbmcpO1xuICB9XG4gIHJldHVybiBjaHVuaztcbn1cblxuLy8gaWYgd2UncmUgYWxyZWFkeSB3cml0aW5nIHNvbWV0aGluZywgdGhlbiBqdXN0IHB1dCB0aGlzXG4vLyBpbiB0aGUgcXVldWUsIGFuZCB3YWl0IG91ciB0dXJuLiAgT3RoZXJ3aXNlLCBjYWxsIF93cml0ZVxuLy8gSWYgd2UgcmV0dXJuIGZhbHNlLCB0aGVuIHdlIG5lZWQgYSBkcmFpbiBldmVudCwgc28gc2V0IHRoYXQgZmxhZy5cbmZ1bmN0aW9uIHdyaXRlT3JCdWZmZXIoc3RyZWFtLCBzdGF0ZSwgY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBjaHVuayA9IGRlY29kZUNodW5rKHN0YXRlLCBjaHVuaywgZW5jb2RpbmcpO1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKGNodW5rKSlcbiAgICBlbmNvZGluZyA9ICdidWZmZXInO1xuICB2YXIgbGVuID0gc3RhdGUub2JqZWN0TW9kZSA/IDEgOiBjaHVuay5sZW5ndGg7XG5cbiAgc3RhdGUubGVuZ3RoICs9IGxlbjtcblxuICB2YXIgcmV0ID0gc3RhdGUubGVuZ3RoIDwgc3RhdGUuaGlnaFdhdGVyTWFyaztcbiAgLy8gd2UgbXVzdCBlbnN1cmUgdGhhdCBwcmV2aW91cyBuZWVkRHJhaW4gd2lsbCBub3QgYmUgcmVzZXQgdG8gZmFsc2UuXG4gIGlmICghcmV0KVxuICAgIHN0YXRlLm5lZWREcmFpbiA9IHRydWU7XG5cbiAgaWYgKHN0YXRlLndyaXRpbmcpXG4gICAgc3RhdGUuYnVmZmVyLnB1c2gobmV3IFdyaXRlUmVxKGNodW5rLCBlbmNvZGluZywgY2IpKTtcbiAgZWxzZVxuICAgIGRvV3JpdGUoc3RyZWFtLCBzdGF0ZSwgbGVuLCBjaHVuaywgZW5jb2RpbmcsIGNiKTtcblxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBkb1dyaXRlKHN0cmVhbSwgc3RhdGUsIGxlbiwgY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBzdGF0ZS53cml0ZWxlbiA9IGxlbjtcbiAgc3RhdGUud3JpdGVjYiA9IGNiO1xuICBzdGF0ZS53cml0aW5nID0gdHJ1ZTtcbiAgc3RhdGUuc3luYyA9IHRydWU7XG4gIHN0cmVhbS5fd3JpdGUoY2h1bmssIGVuY29kaW5nLCBzdGF0ZS5vbndyaXRlKTtcbiAgc3RhdGUuc3luYyA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBvbndyaXRlRXJyb3Ioc3RyZWFtLCBzdGF0ZSwgc3luYywgZXIsIGNiKSB7XG4gIGlmIChzeW5jKVxuICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICBjYihlcik7XG4gICAgfSk7XG4gIGVsc2VcbiAgICBjYihlcik7XG5cbiAgc3RyZWFtLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCA9IHRydWU7XG4gIHN0cmVhbS5lbWl0KCdlcnJvcicsIGVyKTtcbn1cblxuZnVuY3Rpb24gb253cml0ZVN0YXRlVXBkYXRlKHN0YXRlKSB7XG4gIHN0YXRlLndyaXRpbmcgPSBmYWxzZTtcbiAgc3RhdGUud3JpdGVjYiA9IG51bGw7XG4gIHN0YXRlLmxlbmd0aCAtPSBzdGF0ZS53cml0ZWxlbjtcbiAgc3RhdGUud3JpdGVsZW4gPSAwO1xufVxuXG5mdW5jdGlvbiBvbndyaXRlKHN0cmVhbSwgZXIpIHtcbiAgdmFyIHN0YXRlID0gc3RyZWFtLl93cml0YWJsZVN0YXRlO1xuICB2YXIgc3luYyA9IHN0YXRlLnN5bmM7XG4gIHZhciBjYiA9IHN0YXRlLndyaXRlY2I7XG5cbiAgb253cml0ZVN0YXRlVXBkYXRlKHN0YXRlKTtcblxuICBpZiAoZXIpXG4gICAgb253cml0ZUVycm9yKHN0cmVhbSwgc3RhdGUsIHN5bmMsIGVyLCBjYik7XG4gIGVsc2Uge1xuICAgIC8vIENoZWNrIGlmIHdlJ3JlIGFjdHVhbGx5IHJlYWR5IHRvIGZpbmlzaCwgYnV0IGRvbid0IGVtaXQgeWV0XG4gICAgdmFyIGZpbmlzaGVkID0gbmVlZEZpbmlzaChzdHJlYW0sIHN0YXRlKTtcblxuICAgIGlmICghZmluaXNoZWQgJiYgIXN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgJiYgc3RhdGUuYnVmZmVyLmxlbmd0aClcbiAgICAgIGNsZWFyQnVmZmVyKHN0cmVhbSwgc3RhdGUpO1xuXG4gICAgaWYgKHN5bmMpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGFmdGVyV3JpdGUoc3RyZWFtLCBzdGF0ZSwgZmluaXNoZWQsIGNiKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZnRlcldyaXRlKHN0cmVhbSwgc3RhdGUsIGZpbmlzaGVkLCBjYik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFmdGVyV3JpdGUoc3RyZWFtLCBzdGF0ZSwgZmluaXNoZWQsIGNiKSB7XG4gIGlmICghZmluaXNoZWQpXG4gICAgb253cml0ZURyYWluKHN0cmVhbSwgc3RhdGUpO1xuICBjYigpO1xuICBpZiAoZmluaXNoZWQpXG4gICAgZmluaXNoTWF5YmUoc3RyZWFtLCBzdGF0ZSk7XG59XG5cbi8vIE11c3QgZm9yY2UgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIG9uIG5leHRUaWNrLCBzbyB0aGF0IHdlIGRvbid0XG4vLyBlbWl0ICdkcmFpbicgYmVmb3JlIHRoZSB3cml0ZSgpIGNvbnN1bWVyIGdldHMgdGhlICdmYWxzZScgcmV0dXJuXG4vLyB2YWx1ZSwgYW5kIGhhcyBhIGNoYW5jZSB0byBhdHRhY2ggYSAnZHJhaW4nIGxpc3RlbmVyLlxuZnVuY3Rpb24gb253cml0ZURyYWluKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCAmJiBzdGF0ZS5uZWVkRHJhaW4pIHtcbiAgICBzdGF0ZS5uZWVkRHJhaW4gPSBmYWxzZTtcbiAgICBzdHJlYW0uZW1pdCgnZHJhaW4nKTtcbiAgfVxufVxuXG5cbi8vIGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGluIHRoZSBidWZmZXIgd2FpdGluZywgdGhlbiBwcm9jZXNzIGl0XG5mdW5jdGlvbiBjbGVhckJ1ZmZlcihzdHJlYW0sIHN0YXRlKSB7XG4gIHN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgPSB0cnVlO1xuXG4gIGZvciAodmFyIGMgPSAwOyBjIDwgc3RhdGUuYnVmZmVyLmxlbmd0aDsgYysrKSB7XG4gICAgdmFyIGVudHJ5ID0gc3RhdGUuYnVmZmVyW2NdO1xuICAgIHZhciBjaHVuayA9IGVudHJ5LmNodW5rO1xuICAgIHZhciBlbmNvZGluZyA9IGVudHJ5LmVuY29kaW5nO1xuICAgIHZhciBjYiA9IGVudHJ5LmNhbGxiYWNrO1xuICAgIHZhciBsZW4gPSBzdGF0ZS5vYmplY3RNb2RlID8gMSA6IGNodW5rLmxlbmd0aDtcblxuICAgIGRvV3JpdGUoc3RyZWFtLCBzdGF0ZSwgbGVuLCBjaHVuaywgZW5jb2RpbmcsIGNiKTtcblxuICAgIC8vIGlmIHdlIGRpZG4ndCBjYWxsIHRoZSBvbndyaXRlIGltbWVkaWF0ZWx5LCB0aGVuXG4gICAgLy8gaXQgbWVhbnMgdGhhdCB3ZSBuZWVkIHRvIHdhaXQgdW50aWwgaXQgZG9lcy5cbiAgICAvLyBhbHNvLCB0aGF0IG1lYW5zIHRoYXQgdGhlIGNodW5rIGFuZCBjYiBhcmUgY3VycmVudGx5XG4gICAgLy8gYmVpbmcgcHJvY2Vzc2VkLCBzbyBtb3ZlIHRoZSBidWZmZXIgY291bnRlciBwYXN0IHRoZW0uXG4gICAgaWYgKHN0YXRlLndyaXRpbmcpIHtcbiAgICAgIGMrKztcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRlLmJ1ZmZlclByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgaWYgKGMgPCBzdGF0ZS5idWZmZXIubGVuZ3RoKVxuICAgIHN0YXRlLmJ1ZmZlciA9IHN0YXRlLmJ1ZmZlci5zbGljZShjKTtcbiAgZWxzZVxuICAgIHN0YXRlLmJ1ZmZlci5sZW5ndGggPSAwO1xufVxuXG5Xcml0YWJsZS5wcm90b3R5cGUuX3dyaXRlID0gZnVuY3Rpb24oY2h1bmssIGVuY29kaW5nLCBjYikge1xuICBjYihuZXcgRXJyb3IoJ25vdCBpbXBsZW1lbnRlZCcpKTtcbn07XG5cbldyaXRhYmxlLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbihjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX3dyaXRhYmxlU3RhdGU7XG5cbiAgaWYgKHR5cGVvZiBjaHVuayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gY2h1bms7XG4gICAgY2h1bmsgPSBudWxsO1xuICAgIGVuY29kaW5nID0gbnVsbDtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IGVuY29kaW5nO1xuICAgIGVuY29kaW5nID0gbnVsbDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgY2h1bmsgIT09ICd1bmRlZmluZWQnICYmIGNodW5rICE9PSBudWxsKVxuICAgIHRoaXMud3JpdGUoY2h1bmssIGVuY29kaW5nKTtcblxuICAvLyBpZ25vcmUgdW5uZWNlc3NhcnkgZW5kKCkgY2FsbHMuXG4gIGlmICghc3RhdGUuZW5kaW5nICYmICFzdGF0ZS5maW5pc2hlZClcbiAgICBlbmRXcml0YWJsZSh0aGlzLCBzdGF0ZSwgY2IpO1xufTtcblxuXG5mdW5jdGlvbiBuZWVkRmluaXNoKHN0cmVhbSwgc3RhdGUpIHtcbiAgcmV0dXJuIChzdGF0ZS5lbmRpbmcgJiZcbiAgICAgICAgICBzdGF0ZS5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgICAhc3RhdGUuZmluaXNoZWQgJiZcbiAgICAgICAgICAhc3RhdGUud3JpdGluZyk7XG59XG5cbmZ1bmN0aW9uIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIG5lZWQgPSBuZWVkRmluaXNoKHN0cmVhbSwgc3RhdGUpO1xuICBpZiAobmVlZCkge1xuICAgIHN0YXRlLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICBzdHJlYW0uZW1pdCgnZmluaXNoJyk7XG4gIH1cbiAgcmV0dXJuIG5lZWQ7XG59XG5cbmZ1bmN0aW9uIGVuZFdyaXRhYmxlKHN0cmVhbSwgc3RhdGUsIGNiKSB7XG4gIHN0YXRlLmVuZGluZyA9IHRydWU7XG4gIGZpbmlzaE1heWJlKHN0cmVhbSwgc3RhdGUpO1xuICBpZiAoY2IpIHtcbiAgICBpZiAoc3RhdGUuZmluaXNoZWQpXG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGNiKTtcbiAgICBlbHNlXG4gICAgICBzdHJlYW0ub25jZSgnZmluaXNoJywgY2IpO1xuICB9XG4gIHN0YXRlLmVuZGVkID0gdHJ1ZTtcbn1cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoJ19wcm9jZXNzJykpIiwiKGZ1bmN0aW9uIChCdWZmZXIpe1xuLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5mdW5jdGlvbiBpc0FycmF5KGFyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyKTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHJlKSAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuZXhwb3J0cy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gaXNEYXRlKGQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGQpICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcblxuZnVuY3Rpb24gaXNFcnJvcihlKSB7XG4gIHJldHVybiBpc09iamVjdChlKSAmJlxuICAgICAgKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5mdW5jdGlvbiBpc0J1ZmZlcihhcmcpIHtcbiAgcmV0dXJuIEJ1ZmZlci5pc0J1ZmZlcihhcmcpO1xufVxuZXhwb3J0cy5pc0J1ZmZlciA9IGlzQnVmZmVyO1xuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIpIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9saWIvX3N0cmVhbV9wYXNzdGhyb3VnaC5qc1wiKVxuIiwidmFyIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpOyAvLyBoYWNrIHRvIGZpeCBhIGNpcmN1bGFyIGRlcGVuZGVuY3kgaXNzdWUgd2hlbiB1c2VkIHdpdGggYnJvd3NlcmlmeVxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV9yZWFkYWJsZS5qcycpO1xuZXhwb3J0cy5TdHJlYW0gPSBTdHJlYW07XG5leHBvcnRzLlJlYWRhYmxlID0gZXhwb3J0cztcbmV4cG9ydHMuV3JpdGFibGUgPSByZXF1aXJlKCcuL2xpYi9fc3RyZWFtX3dyaXRhYmxlLmpzJyk7XG5leHBvcnRzLkR1cGxleCA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fZHVwbGV4LmpzJyk7XG5leHBvcnRzLlRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vbGliL19zdHJlYW1fdHJhbnNmb3JtLmpzJyk7XG5leHBvcnRzLlBhc3NUaHJvdWdoID0gcmVxdWlyZSgnLi9saWIvX3N0cmVhbV9wYXNzdGhyb3VnaC5qcycpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9saWIvX3N0cmVhbV90cmFuc2Zvcm0uanNcIilcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vbGliL19zdHJlYW1fd3JpdGFibGUuanNcIilcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmVhbTtcblxudmFyIEVFID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuaW5oZXJpdHMoU3RyZWFtLCBFRSk7XG5TdHJlYW0uUmVhZGFibGUgPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0vcmVhZGFibGUuanMnKTtcblN0cmVhbS5Xcml0YWJsZSA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS93cml0YWJsZS5qcycpO1xuU3RyZWFtLkR1cGxleCA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS9kdXBsZXguanMnKTtcblN0cmVhbS5UcmFuc2Zvcm0gPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0vdHJhbnNmb3JtLmpzJyk7XG5TdHJlYW0uUGFzc1Rocm91Z2ggPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0vcGFzc3Rocm91Z2guanMnKTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC40LnhcblN0cmVhbS5TdHJlYW0gPSBTdHJlYW07XG5cblxuXG4vLyBvbGQtc3R5bGUgc3RyZWFtcy4gIE5vdGUgdGhhdCB0aGUgcGlwZSBtZXRob2QgKHRoZSBvbmx5IHJlbGV2YW50XG4vLyBwYXJ0IG9mIHRoaXMgY2xhc3MpIGlzIG92ZXJyaWRkZW4gaW4gdGhlIFJlYWRhYmxlIGNsYXNzLlxuXG5mdW5jdGlvbiBTdHJlYW0oKSB7XG4gIEVFLmNhbGwodGhpcyk7XG59XG5cblN0cmVhbS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uKGRlc3QsIG9wdGlvbnMpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXM7XG5cbiAgZnVuY3Rpb24gb25kYXRhKGNodW5rKSB7XG4gICAgaWYgKGRlc3Qud3JpdGFibGUpIHtcbiAgICAgIGlmIChmYWxzZSA9PT0gZGVzdC53cml0ZShjaHVuaykgJiYgc291cmNlLnBhdXNlKSB7XG4gICAgICAgIHNvdXJjZS5wYXVzZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNvdXJjZS5vbignZGF0YScsIG9uZGF0YSk7XG5cbiAgZnVuY3Rpb24gb25kcmFpbigpIHtcbiAgICBpZiAoc291cmNlLnJlYWRhYmxlICYmIHNvdXJjZS5yZXN1bWUpIHtcbiAgICAgIHNvdXJjZS5yZXN1bWUoKTtcbiAgICB9XG4gIH1cblxuICBkZXN0Lm9uKCdkcmFpbicsIG9uZHJhaW4pO1xuXG4gIC8vIElmIHRoZSAnZW5kJyBvcHRpb24gaXMgbm90IHN1cHBsaWVkLCBkZXN0LmVuZCgpIHdpbGwgYmUgY2FsbGVkIHdoZW5cbiAgLy8gc291cmNlIGdldHMgdGhlICdlbmQnIG9yICdjbG9zZScgZXZlbnRzLiAgT25seSBkZXN0LmVuZCgpIG9uY2UuXG4gIGlmICghZGVzdC5faXNTdGRpbyAmJiAoIW9wdGlvbnMgfHwgb3B0aW9ucy5lbmQgIT09IGZhbHNlKSkge1xuICAgIHNvdXJjZS5vbignZW5kJywgb25lbmQpO1xuICAgIHNvdXJjZS5vbignY2xvc2UnLCBvbmNsb3NlKTtcbiAgfVxuXG4gIHZhciBkaWRPbkVuZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBvbmVuZCgpIHtcbiAgICBpZiAoZGlkT25FbmQpIHJldHVybjtcbiAgICBkaWRPbkVuZCA9IHRydWU7XG5cbiAgICBkZXN0LmVuZCgpO1xuICB9XG5cblxuICBmdW5jdGlvbiBvbmNsb3NlKCkge1xuICAgIGlmIChkaWRPbkVuZCkgcmV0dXJuO1xuICAgIGRpZE9uRW5kID0gdHJ1ZTtcblxuICAgIGlmICh0eXBlb2YgZGVzdC5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSBkZXN0LmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8vIGRvbid0IGxlYXZlIGRhbmdsaW5nIHBpcGVzIHdoZW4gdGhlcmUgYXJlIGVycm9ycy5cbiAgZnVuY3Rpb24gb25lcnJvcihlcikge1xuICAgIGNsZWFudXAoKTtcbiAgICBpZiAoRUUubGlzdGVuZXJDb3VudCh0aGlzLCAnZXJyb3InKSA9PT0gMCkge1xuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCBzdHJlYW0gZXJyb3IgaW4gcGlwZS5cbiAgICB9XG4gIH1cblxuICBzb3VyY2Uub24oJ2Vycm9yJywgb25lcnJvcik7XG4gIGRlc3Qub24oJ2Vycm9yJywgb25lcnJvcik7XG5cbiAgLy8gcmVtb3ZlIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIHRoYXQgd2VyZSBhZGRlZC5cbiAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2RhdGEnLCBvbmRhdGEpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2RyYWluJywgb25kcmFpbik7XG5cbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIG9uZW5kKTtcbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG5cbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcblxuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignZW5kJywgY2xlYW51cCk7XG4gICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIGNsZWFudXApO1xuXG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBjbGVhbnVwKTtcbiAgfVxuXG4gIHNvdXJjZS5vbignZW5kJywgY2xlYW51cCk7XG4gIHNvdXJjZS5vbignY2xvc2UnLCBjbGVhbnVwKTtcblxuICBkZXN0Lm9uKCdjbG9zZScsIGNsZWFudXApO1xuXG4gIGRlc3QuZW1pdCgncGlwZScsIHNvdXJjZSk7XG5cbiAgLy8gQWxsb3cgZm9yIHVuaXgtbGlrZSB1c2FnZTogQS5waXBlKEIpLnBpcGUoQylcbiAgcmV0dXJuIGRlc3Q7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXI7XG5cbnZhciBpc0J1ZmZlckVuY29kaW5nID0gQnVmZmVyLmlzRW5jb2RpbmdcbiAgfHwgZnVuY3Rpb24oZW5jb2RpbmcpIHtcbiAgICAgICBzd2l0Y2ggKGVuY29kaW5nICYmIGVuY29kaW5nLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgIGNhc2UgJ2hleCc6IGNhc2UgJ3V0ZjgnOiBjYXNlICd1dGYtOCc6IGNhc2UgJ2FzY2lpJzogY2FzZSAnYmluYXJ5JzogY2FzZSAnYmFzZTY0JzogY2FzZSAndWNzMic6IGNhc2UgJ3Vjcy0yJzogY2FzZSAndXRmMTZsZSc6IGNhc2UgJ3V0Zi0xNmxlJzogY2FzZSAncmF3JzogcmV0dXJuIHRydWU7XG4gICAgICAgICBkZWZhdWx0OiByZXR1cm4gZmFsc2U7XG4gICAgICAgfVxuICAgICB9XG5cblxuZnVuY3Rpb24gYXNzZXJ0RW5jb2RpbmcoZW5jb2RpbmcpIHtcbiAgaWYgKGVuY29kaW5nICYmICFpc0J1ZmZlckVuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKTtcbiAgfVxufVxuXG4vLyBTdHJpbmdEZWNvZGVyIHByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgZWZmaWNpZW50bHkgc3BsaXR0aW5nIGEgc2VyaWVzIG9mXG4vLyBidWZmZXJzIGludG8gYSBzZXJpZXMgb2YgSlMgc3RyaW5ncyB3aXRob3V0IGJyZWFraW5nIGFwYXJ0IG11bHRpLWJ5dGVcbi8vIGNoYXJhY3RlcnMuIENFU1UtOCBpcyBoYW5kbGVkIGFzIHBhcnQgb2YgdGhlIFVURi04IGVuY29kaW5nLlxuLy9cbi8vIEBUT0RPIEhhbmRsaW5nIGFsbCBlbmNvZGluZ3MgaW5zaWRlIGEgc2luZ2xlIG9iamVjdCBtYWtlcyBpdCB2ZXJ5IGRpZmZpY3VsdFxuLy8gdG8gcmVhc29uIGFib3V0IHRoaXMgY29kZSwgc28gaXQgc2hvdWxkIGJlIHNwbGl0IHVwIGluIHRoZSBmdXR1cmUuXG4vLyBAVE9ETyBUaGVyZSBzaG91bGQgYmUgYSB1dGY4LXN0cmljdCBlbmNvZGluZyB0aGF0IHJlamVjdHMgaW52YWxpZCBVVEYtOCBjb2RlXG4vLyBwb2ludHMgYXMgdXNlZCBieSBDRVNVLTguXG52YXIgU3RyaW5nRGVjb2RlciA9IGV4cG9ydHMuU3RyaW5nRGVjb2RlciA9IGZ1bmN0aW9uKGVuY29kaW5nKSB7XG4gIHRoaXMuZW5jb2RpbmcgPSAoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1stX10vLCAnJyk7XG4gIGFzc2VydEVuY29kaW5nKGVuY29kaW5nKTtcbiAgc3dpdGNoICh0aGlzLmVuY29kaW5nKSB7XG4gICAgY2FzZSAndXRmOCc6XG4gICAgICAvLyBDRVNVLTggcmVwcmVzZW50cyBlYWNoIG9mIFN1cnJvZ2F0ZSBQYWlyIGJ5IDMtYnl0ZXNcbiAgICAgIHRoaXMuc3Vycm9nYXRlU2l6ZSA9IDM7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIC8vIFVURi0xNiByZXByZXNlbnRzIGVhY2ggb2YgU3Vycm9nYXRlIFBhaXIgYnkgMi1ieXRlc1xuICAgICAgdGhpcy5zdXJyb2dhdGVTaXplID0gMjtcbiAgICAgIHRoaXMuZGV0ZWN0SW5jb21wbGV0ZUNoYXIgPSB1dGYxNkRldGVjdEluY29tcGxldGVDaGFyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIC8vIEJhc2UtNjQgc3RvcmVzIDMgYnl0ZXMgaW4gNCBjaGFycywgYW5kIHBhZHMgdGhlIHJlbWFpbmRlci5cbiAgICAgIHRoaXMuc3Vycm9nYXRlU2l6ZSA9IDM7XG4gICAgICB0aGlzLmRldGVjdEluY29tcGxldGVDaGFyID0gYmFzZTY0RGV0ZWN0SW5jb21wbGV0ZUNoYXI7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpcy53cml0ZSA9IHBhc3NUaHJvdWdoV3JpdGU7XG4gICAgICByZXR1cm47XG4gIH1cblxuICAvLyBFbm91Z2ggc3BhY2UgdG8gc3RvcmUgYWxsIGJ5dGVzIG9mIGEgc2luZ2xlIGNoYXJhY3Rlci4gVVRGLTggbmVlZHMgNFxuICAvLyBieXRlcywgYnV0IENFU1UtOCBtYXkgcmVxdWlyZSB1cCB0byA2ICgzIGJ5dGVzIHBlciBzdXJyb2dhdGUpLlxuICB0aGlzLmNoYXJCdWZmZXIgPSBuZXcgQnVmZmVyKDYpO1xuICAvLyBOdW1iZXIgb2YgYnl0ZXMgcmVjZWl2ZWQgZm9yIHRoZSBjdXJyZW50IGluY29tcGxldGUgbXVsdGktYnl0ZSBjaGFyYWN0ZXIuXG4gIHRoaXMuY2hhclJlY2VpdmVkID0gMDtcbiAgLy8gTnVtYmVyIG9mIGJ5dGVzIGV4cGVjdGVkIGZvciB0aGUgY3VycmVudCBpbmNvbXBsZXRlIG11bHRpLWJ5dGUgY2hhcmFjdGVyLlxuICB0aGlzLmNoYXJMZW5ndGggPSAwO1xufTtcblxuXG4vLyB3cml0ZSBkZWNvZGVzIHRoZSBnaXZlbiBidWZmZXIgYW5kIHJldHVybnMgaXQgYXMgSlMgc3RyaW5nIHRoYXQgaXNcbi8vIGd1YXJhbnRlZWQgdG8gbm90IGNvbnRhaW4gYW55IHBhcnRpYWwgbXVsdGktYnl0ZSBjaGFyYWN0ZXJzLiBBbnkgcGFydGlhbFxuLy8gY2hhcmFjdGVyIGZvdW5kIGF0IHRoZSBlbmQgb2YgdGhlIGJ1ZmZlciBpcyBidWZmZXJlZCB1cCwgYW5kIHdpbGwgYmVcbi8vIHJldHVybmVkIHdoZW4gY2FsbGluZyB3cml0ZSBhZ2FpbiB3aXRoIHRoZSByZW1haW5pbmcgYnl0ZXMuXG4vL1xuLy8gTm90ZTogQ29udmVydGluZyBhIEJ1ZmZlciBjb250YWluaW5nIGFuIG9ycGhhbiBzdXJyb2dhdGUgdG8gYSBTdHJpbmdcbi8vIGN1cnJlbnRseSB3b3JrcywgYnV0IGNvbnZlcnRpbmcgYSBTdHJpbmcgdG8gYSBCdWZmZXIgKHZpYSBgbmV3IEJ1ZmZlcmAsIG9yXG4vLyBCdWZmZXIjd3JpdGUpIHdpbGwgcmVwbGFjZSBpbmNvbXBsZXRlIHN1cnJvZ2F0ZXMgd2l0aCB0aGUgdW5pY29kZVxuLy8gcmVwbGFjZW1lbnQgY2hhcmFjdGVyLiBTZWUgaHR0cHM6Ly9jb2RlcmV2aWV3LmNocm9taXVtLm9yZy8xMjExNzMwMDkvIC5cblN0cmluZ0RlY29kZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gIHZhciBjaGFyU3RyID0gJyc7XG4gIC8vIGlmIG91ciBsYXN0IHdyaXRlIGVuZGVkIHdpdGggYW4gaW5jb21wbGV0ZSBtdWx0aWJ5dGUgY2hhcmFjdGVyXG4gIHdoaWxlICh0aGlzLmNoYXJMZW5ndGgpIHtcbiAgICAvLyBkZXRlcm1pbmUgaG93IG1hbnkgcmVtYWluaW5nIGJ5dGVzIHRoaXMgYnVmZmVyIGhhcyB0byBvZmZlciBmb3IgdGhpcyBjaGFyXG4gICAgdmFyIGF2YWlsYWJsZSA9IChidWZmZXIubGVuZ3RoID49IHRoaXMuY2hhckxlbmd0aCAtIHRoaXMuY2hhclJlY2VpdmVkKSA/XG4gICAgICAgIHRoaXMuY2hhckxlbmd0aCAtIHRoaXMuY2hhclJlY2VpdmVkIDpcbiAgICAgICAgYnVmZmVyLmxlbmd0aDtcblxuICAgIC8vIGFkZCB0aGUgbmV3IGJ5dGVzIHRvIHRoZSBjaGFyIGJ1ZmZlclxuICAgIGJ1ZmZlci5jb3B5KHRoaXMuY2hhckJ1ZmZlciwgdGhpcy5jaGFyUmVjZWl2ZWQsIDAsIGF2YWlsYWJsZSk7XG4gICAgdGhpcy5jaGFyUmVjZWl2ZWQgKz0gYXZhaWxhYmxlO1xuXG4gICAgaWYgKHRoaXMuY2hhclJlY2VpdmVkIDwgdGhpcy5jaGFyTGVuZ3RoKSB7XG4gICAgICAvLyBzdGlsbCBub3QgZW5vdWdoIGNoYXJzIGluIHRoaXMgYnVmZmVyPyB3YWl0IGZvciBtb3JlIC4uLlxuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBieXRlcyBiZWxvbmdpbmcgdG8gdGhlIGN1cnJlbnQgY2hhcmFjdGVyIGZyb20gdGhlIGJ1ZmZlclxuICAgIGJ1ZmZlciA9IGJ1ZmZlci5zbGljZShhdmFpbGFibGUsIGJ1ZmZlci5sZW5ndGgpO1xuXG4gICAgLy8gZ2V0IHRoZSBjaGFyYWN0ZXIgdGhhdCB3YXMgc3BsaXRcbiAgICBjaGFyU3RyID0gdGhpcy5jaGFyQnVmZmVyLnNsaWNlKDAsIHRoaXMuY2hhckxlbmd0aCkudG9TdHJpbmcodGhpcy5lbmNvZGluZyk7XG5cbiAgICAvLyBDRVNVLTg6IGxlYWQgc3Vycm9nYXRlIChEODAwLURCRkYpIGlzIGFsc28gdGhlIGluY29tcGxldGUgY2hhcmFjdGVyXG4gICAgdmFyIGNoYXJDb2RlID0gY2hhclN0ci5jaGFyQ29kZUF0KGNoYXJTdHIubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGNoYXJDb2RlID49IDB4RDgwMCAmJiBjaGFyQ29kZSA8PSAweERCRkYpIHtcbiAgICAgIHRoaXMuY2hhckxlbmd0aCArPSB0aGlzLnN1cnJvZ2F0ZVNpemU7XG4gICAgICBjaGFyU3RyID0gJyc7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdGhpcy5jaGFyUmVjZWl2ZWQgPSB0aGlzLmNoYXJMZW5ndGggPSAwO1xuXG4gICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgYnl0ZXMgaW4gdGhpcyBidWZmZXIsIGp1c3QgZW1pdCBvdXIgY2hhclxuICAgIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gY2hhclN0cjtcbiAgICB9XG4gICAgYnJlYWs7XG4gIH1cblxuICAvLyBkZXRlcm1pbmUgYW5kIHNldCBjaGFyTGVuZ3RoIC8gY2hhclJlY2VpdmVkXG4gIHRoaXMuZGV0ZWN0SW5jb21wbGV0ZUNoYXIoYnVmZmVyKTtcblxuICB2YXIgZW5kID0gYnVmZmVyLmxlbmd0aDtcbiAgaWYgKHRoaXMuY2hhckxlbmd0aCkge1xuICAgIC8vIGJ1ZmZlciB0aGUgaW5jb21wbGV0ZSBjaGFyYWN0ZXIgYnl0ZXMgd2UgZ290XG4gICAgYnVmZmVyLmNvcHkodGhpcy5jaGFyQnVmZmVyLCAwLCBidWZmZXIubGVuZ3RoIC0gdGhpcy5jaGFyUmVjZWl2ZWQsIGVuZCk7XG4gICAgZW5kIC09IHRoaXMuY2hhclJlY2VpdmVkO1xuICB9XG5cbiAgY2hhclN0ciArPSBidWZmZXIudG9TdHJpbmcodGhpcy5lbmNvZGluZywgMCwgZW5kKTtcblxuICB2YXIgZW5kID0gY2hhclN0ci5sZW5ndGggLSAxO1xuICB2YXIgY2hhckNvZGUgPSBjaGFyU3RyLmNoYXJDb2RlQXQoZW5kKTtcbiAgLy8gQ0VTVS04OiBsZWFkIHN1cnJvZ2F0ZSAoRDgwMC1EQkZGKSBpcyBhbHNvIHRoZSBpbmNvbXBsZXRlIGNoYXJhY3RlclxuICBpZiAoY2hhckNvZGUgPj0gMHhEODAwICYmIGNoYXJDb2RlIDw9IDB4REJGRikge1xuICAgIHZhciBzaXplID0gdGhpcy5zdXJyb2dhdGVTaXplO1xuICAgIHRoaXMuY2hhckxlbmd0aCArPSBzaXplO1xuICAgIHRoaXMuY2hhclJlY2VpdmVkICs9IHNpemU7XG4gICAgdGhpcy5jaGFyQnVmZmVyLmNvcHkodGhpcy5jaGFyQnVmZmVyLCBzaXplLCAwLCBzaXplKTtcbiAgICBidWZmZXIuY29weSh0aGlzLmNoYXJCdWZmZXIsIDAsIDAsIHNpemUpO1xuICAgIHJldHVybiBjaGFyU3RyLnN1YnN0cmluZygwLCBlbmQpO1xuICB9XG5cbiAgLy8gb3IganVzdCBlbWl0IHRoZSBjaGFyU3RyXG4gIHJldHVybiBjaGFyU3RyO1xufTtcblxuLy8gZGV0ZWN0SW5jb21wbGV0ZUNoYXIgZGV0ZXJtaW5lcyBpZiB0aGVyZSBpcyBhbiBpbmNvbXBsZXRlIFVURi04IGNoYXJhY3RlciBhdFxuLy8gdGhlIGVuZCBvZiB0aGUgZ2l2ZW4gYnVmZmVyLiBJZiBzbywgaXQgc2V0cyB0aGlzLmNoYXJMZW5ndGggdG8gdGhlIGJ5dGVcbi8vIGxlbmd0aCB0aGF0IGNoYXJhY3RlciwgYW5kIHNldHMgdGhpcy5jaGFyUmVjZWl2ZWQgdG8gdGhlIG51bWJlciBvZiBieXRlc1xuLy8gdGhhdCBhcmUgYXZhaWxhYmxlIGZvciB0aGlzIGNoYXJhY3Rlci5cblN0cmluZ0RlY29kZXIucHJvdG90eXBlLmRldGVjdEluY29tcGxldGVDaGFyID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gIC8vIGRldGVybWluZSBob3cgbWFueSBieXRlcyB3ZSBoYXZlIHRvIGNoZWNrIGF0IHRoZSBlbmQgb2YgdGhpcyBidWZmZXJcbiAgdmFyIGkgPSAoYnVmZmVyLmxlbmd0aCA+PSAzKSA/IDMgOiBidWZmZXIubGVuZ3RoO1xuXG4gIC8vIEZpZ3VyZSBvdXQgaWYgb25lIG9mIHRoZSBsYXN0IGkgYnl0ZXMgb2Ygb3VyIGJ1ZmZlciBhbm5vdW5jZXMgYW5cbiAgLy8gaW5jb21wbGV0ZSBjaGFyLlxuICBmb3IgKDsgaSA+IDA7IGktLSkge1xuICAgIHZhciBjID0gYnVmZmVyW2J1ZmZlci5sZW5ndGggLSBpXTtcblxuICAgIC8vIFNlZSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1VURi04I0Rlc2NyaXB0aW9uXG5cbiAgICAvLyAxMTBYWFhYWFxuICAgIGlmIChpID09IDEgJiYgYyA+PiA1ID09IDB4MDYpIHtcbiAgICAgIHRoaXMuY2hhckxlbmd0aCA9IDI7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyAxMTEwWFhYWFxuICAgIGlmIChpIDw9IDIgJiYgYyA+PiA0ID09IDB4MEUpIHtcbiAgICAgIHRoaXMuY2hhckxlbmd0aCA9IDM7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyAxMTExMFhYWFxuICAgIGlmIChpIDw9IDMgJiYgYyA+PiAzID09IDB4MUUpIHtcbiAgICAgIHRoaXMuY2hhckxlbmd0aCA9IDQ7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgdGhpcy5jaGFyUmVjZWl2ZWQgPSBpO1xufTtcblxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gIHZhciByZXMgPSAnJztcbiAgaWYgKGJ1ZmZlciAmJiBidWZmZXIubGVuZ3RoKVxuICAgIHJlcyA9IHRoaXMud3JpdGUoYnVmZmVyKTtcblxuICBpZiAodGhpcy5jaGFyUmVjZWl2ZWQpIHtcbiAgICB2YXIgY3IgPSB0aGlzLmNoYXJSZWNlaXZlZDtcbiAgICB2YXIgYnVmID0gdGhpcy5jaGFyQnVmZmVyO1xuICAgIHZhciBlbmMgPSB0aGlzLmVuY29kaW5nO1xuICAgIHJlcyArPSBidWYuc2xpY2UoMCwgY3IpLnRvU3RyaW5nKGVuYyk7XG4gIH1cblxuICByZXR1cm4gcmVzO1xufTtcblxuZnVuY3Rpb24gcGFzc1Rocm91Z2hXcml0ZShidWZmZXIpIHtcbiAgcmV0dXJuIGJ1ZmZlci50b1N0cmluZyh0aGlzLmVuY29kaW5nKTtcbn1cblxuZnVuY3Rpb24gdXRmMTZEZXRlY3RJbmNvbXBsZXRlQ2hhcihidWZmZXIpIHtcbiAgdGhpcy5jaGFyUmVjZWl2ZWQgPSBidWZmZXIubGVuZ3RoICUgMjtcbiAgdGhpcy5jaGFyTGVuZ3RoID0gdGhpcy5jaGFyUmVjZWl2ZWQgPyAyIDogMDtcbn1cblxuZnVuY3Rpb24gYmFzZTY0RGV0ZWN0SW5jb21wbGV0ZUNoYXIoYnVmZmVyKSB7XG4gIHRoaXMuY2hhclJlY2VpdmVkID0gYnVmZmVyLmxlbmd0aCAlIDM7XG4gIHRoaXMuY2hhckxlbmd0aCA9IHRoaXMuY2hhclJlY2VpdmVkID8gMyA6IDA7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQnVmZmVyKGFyZykge1xuICByZXR1cm4gYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnXG4gICAgJiYgdHlwZW9mIGFyZy5jb3B5ID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5maWxsID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5yZWFkVUludDggPT09ICdmdW5jdGlvbic7XG59IiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCl7XG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcbiAgaWYgKCFpc1N0cmluZyhmKSkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iamVjdHMucHVzaChpbnNwZWN0KGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG4gIH1cblxuICB2YXIgaSA9IDE7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBzdHIgPSBTdHJpbmcoZikucmVwbGFjZShmb3JtYXRSZWdFeHAsIGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcbiAgICBpZiAoaSA+PSBsZW4pIHJldHVybiB4O1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclZCc6IHJldHVybiBOdW1iZXIoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVqJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnc1tpKytdKTtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSk7XG4gIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG4gICAgaWYgKGlzTnVsbCh4KSB8fCAhaXNPYmplY3QoeCkpIHtcbiAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG4gIC8vIEFsbG93IGZvciBkZXByZWNhdGluZyB0aGluZ3MgaW4gdGhlIHByb2Nlc3Mgb2Ygc3RhcnRpbmcgdXAuXG4gIGlmIChpc1VuZGVmaW5lZChnbG9iYWwucHJvY2VzcykpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZXByZWNhdGUoZm4sIG1zZykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKHByb2Nlc3Mubm9EZXByZWNhdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59O1xuXG5cbnZhciBkZWJ1Z3MgPSB7fTtcbnZhciBkZWJ1Z0Vudmlyb247XG5leHBvcnRzLmRlYnVnbG9nID0gZnVuY3Rpb24oc2V0KSB7XG4gIGlmIChpc1VuZGVmaW5lZChkZWJ1Z0Vudmlyb24pKVxuICAgIGRlYnVnRW52aXJvbiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJyc7XG4gIHNldCA9IHNldC50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWRlYnVnc1tzZXRdKSB7XG4gICAgaWYgKG5ldyBSZWdFeHAoJ1xcXFxiJyArIHNldCArICdcXFxcYicsICdpJykudGVzdChkZWJ1Z0Vudmlyb24pKSB7XG4gICAgICB2YXIgcGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignJXMgJWQ6ICVzJywgc2V0LCBwaWQsIG1zZyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJ1Z3Nbc2V0XTtcbn07XG5cblxuLyoqXG4gKiBFY2hvcyB0aGUgdmFsdWUgb2YgYSB2YWx1ZS4gVHJ5cyB0byBwcmludCB0aGUgdmFsdWUgb3V0XG4gKiBpbiB0aGUgYmVzdCB3YXkgcG9zc2libGUgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcHJpbnQgb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgdGhhdCBhbHRlcnMgdGhlIG91dHB1dC5cbiAqL1xuLyogbGVnYWN5OiBvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMqL1xuZnVuY3Rpb24gaW5zcGVjdChvYmosIG9wdHMpIHtcbiAgLy8gZGVmYXVsdCBvcHRpb25zXG4gIHZhciBjdHggPSB7XG4gICAgc2VlbjogW10sXG4gICAgc3R5bGl6ZTogc3R5bGl6ZU5vQ29sb3JcbiAgfTtcbiAgLy8gbGVnYWN5Li4uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIGN0eC5kZXB0aCA9IGFyZ3VtZW50c1syXTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNCkgY3R4LmNvbG9ycyA9IGFyZ3VtZW50c1szXTtcbiAgaWYgKGlzQm9vbGVhbihvcHRzKSkge1xuICAgIC8vIGxlZ2FjeS4uLlxuICAgIGN0eC5zaG93SGlkZGVuID0gb3B0cztcbiAgfSBlbHNlIGlmIChvcHRzKSB7XG4gICAgLy8gZ290IGFuIFwib3B0aW9uc1wiIG9iamVjdFxuICAgIGV4cG9ydHMuX2V4dGVuZChjdHgsIG9wdHMpO1xuICB9XG4gIC8vIHNldCBkZWZhdWx0IG9wdGlvbnNcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5zaG93SGlkZGVuKSkgY3R4LnNob3dIaWRkZW4gPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5kZXB0aCkpIGN0eC5kZXB0aCA9IDI7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY29sb3JzKSkgY3R4LmNvbG9ycyA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmN1c3RvbUluc3BlY3QpKSBjdHguY3VzdG9tSW5zcGVjdCA9IHRydWU7XG4gIGlmIChjdHguY29sb3JzKSBjdHguc3R5bGl6ZSA9IHN0eWxpemVXaXRoQ29sb3I7XG4gIHJldHVybiBmb3JtYXRWYWx1ZShjdHgsIG9iaiwgY3R4LmRlcHRoKTtcbn1cbmV4cG9ydHMuaW5zcGVjdCA9IGluc3BlY3Q7XG5cblxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5pbnNwZWN0LmNvbG9ycyA9IHtcbiAgJ2JvbGQnIDogWzEsIDIyXSxcbiAgJ2l0YWxpYycgOiBbMywgMjNdLFxuICAndW5kZXJsaW5lJyA6IFs0LCAyNF0sXG4gICdpbnZlcnNlJyA6IFs3LCAyN10sXG4gICd3aGl0ZScgOiBbMzcsIDM5XSxcbiAgJ2dyZXknIDogWzkwLCAzOV0sXG4gICdibGFjaycgOiBbMzAsIDM5XSxcbiAgJ2JsdWUnIDogWzM0LCAzOV0sXG4gICdjeWFuJyA6IFszNiwgMzldLFxuICAnZ3JlZW4nIDogWzMyLCAzOV0sXG4gICdtYWdlbnRhJyA6IFszNSwgMzldLFxuICAncmVkJyA6IFszMSwgMzldLFxuICAneWVsbG93JyA6IFszMywgMzldXG59O1xuXG4vLyBEb24ndCB1c2UgJ2JsdWUnIG5vdCB2aXNpYmxlIG9uIGNtZC5leGVcbmluc3BlY3Quc3R5bGVzID0ge1xuICAnc3BlY2lhbCc6ICdjeWFuJyxcbiAgJ251bWJlcic6ICd5ZWxsb3cnLFxuICAnYm9vbGVhbic6ICd5ZWxsb3cnLFxuICAndW5kZWZpbmVkJzogJ2dyZXknLFxuICAnbnVsbCc6ICdib2xkJyxcbiAgJ3N0cmluZyc6ICdncmVlbicsXG4gICdkYXRlJzogJ21hZ2VudGEnLFxuICAvLyBcIm5hbWVcIjogaW50ZW50aW9uYWxseSBub3Qgc3R5bGluZ1xuICAncmVnZXhwJzogJ3JlZCdcbn07XG5cblxuZnVuY3Rpb24gc3R5bGl6ZVdpdGhDb2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICB2YXIgc3R5bGUgPSBpbnNwZWN0LnN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIHJldHVybiAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzBdICsgJ20nICsgc3RyICtcbiAgICAgICAgICAgJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVsxXSArICdtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cblxuZnVuY3Rpb24gc3R5bGl6ZU5vQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5mdW5jdGlvbiBhcnJheVRvSGFzaChhcnJheSkge1xuICB2YXIgaGFzaCA9IHt9O1xuXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24odmFsLCBpZHgpIHtcbiAgICBoYXNoW3ZhbF0gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gaGFzaDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMpIHtcbiAgLy8gUHJvdmlkZSBhIGhvb2sgZm9yIHVzZXItc3BlY2lmaWVkIGluc3BlY3QgZnVuY3Rpb25zLlxuICAvLyBDaGVjayB0aGF0IHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIGFuIGluc3BlY3QgZnVuY3Rpb24gb24gaXRcbiAgaWYgKGN0eC5jdXN0b21JbnNwZWN0ICYmXG4gICAgICB2YWx1ZSAmJlxuICAgICAgaXNGdW5jdGlvbih2YWx1ZS5pbnNwZWN0KSAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcbiAgICBpZiAoIWlzU3RyaW5nKHJldCkpIHtcbiAgICAgIHJldCA9IGZvcm1hdFZhbHVlKGN0eCwgcmV0LCByZWN1cnNlVGltZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcbiAgdmFyIHByaW1pdGl2ZSA9IGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKTtcbiAgaWYgKHByaW1pdGl2ZSkge1xuICAgIHJldHVybiBwcmltaXRpdmU7XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICB2YXIgdmlzaWJsZUtleXMgPSBhcnJheVRvSGFzaChrZXlzKTtcblxuICBpZiAoY3R4LnNob3dIaWRkZW4pIHtcbiAgICBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpO1xuICB9XG5cbiAgLy8gSUUgZG9lc24ndCBtYWtlIGVycm9yIGZpZWxkcyBub24tZW51bWVyYWJsZVxuICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZHd3NTJzYnQodj12cy45NCkuYXNweFxuICBpZiAoaXNFcnJvcih2YWx1ZSlcbiAgICAgICYmIChrZXlzLmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwIHx8IGtleXMuaW5kZXhPZignZGVzY3JpcHRpb24nKSA+PSAwKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBTb21lIHR5cGUgb2Ygb2JqZWN0IHdpdGhvdXQgcHJvcGVydGllcyBjYW4gYmUgc2hvcnRjdXR0ZWQuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgdmFyIG4gPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbiArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ3VuZGVmaW5lZCcsICd1bmRlZmluZWQnKTtcbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICAvLyBGb3Igc29tZSByZWFzb24gdHlwZW9mIG51bGwgaXMgXCJvYmplY3RcIiwgc28gc3BlY2lhbCBjYXNlIGhlcmUuXG4gIGlmIChpc051bGwodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnbnVsbCcsICdudWxsJyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAgU3RyaW5nKGkpLCB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIGlmICgha2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpIHtcbiAgdmFyIG5hbWUsIHN0ciwgZGVzYztcbiAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIGtleSkgfHwgeyB2YWx1ZTogdmFsdWVba2V5XSB9O1xuICBpZiAoZGVzYy5nZXQpIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyL1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICghaGFzT3duUHJvcGVydHkodmlzaWJsZUtleXMsIGtleSkpIHtcbiAgICBuYW1lID0gJ1snICsga2V5ICsgJ10nO1xuICB9XG4gIGlmICghc3RyKSB7XG4gICAgaWYgKGN0eC5zZWVuLmluZGV4T2YoZGVzYy52YWx1ZSkgPCAwKSB7XG4gICAgICBpZiAoaXNOdWxsKHJlY3Vyc2VUaW1lcykpIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgcmVjdXJzZVRpbWVzIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RyLmluZGV4T2YoJ1xcbicpID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgc3RyID0gc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnN1YnN0cigyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSAnXFxuJyArIHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxLCBuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cblxuZnVuY3Rpb24gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpIHtcbiAgdmFyIG51bUxpbmVzRXN0ID0gMDtcbiAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICtcbiAgICAgICAgICAgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gaXNPYmplY3QocmUpICYmIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gaXNPYmplY3QoZCkgJiYgb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGUpICYmXG4gICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGwgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3ltYm9sJyB8fCAgLy8gRVM2IHN5bWJvbFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSByZXF1aXJlKCcuL3N1cHBvcnQvaXNCdWZmZXInKTtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5cbmZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuLnRvU3RyaW5nKDEwKSA6IG4udG9TdHJpbmcoMTApO1xufVxuXG5cbnZhciBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJyxcbiAgICAgICAgICAgICAgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbi8vIDI2IEZlYiAxNjoxOTozNFxuZnVuY3Rpb24gdGltZXN0YW1wKCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHZhciB0aW1lID0gW3BhZChkLmdldEhvdXJzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRNaW51dGVzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRTZWNvbmRzKCkpXS5qb2luKCc6Jyk7XG4gIHJldHVybiBbZC5nZXREYXRlKCksIG1vbnRoc1tkLmdldE1vbnRoKCldLCB0aW1lXS5qb2luKCcgJyk7XG59XG5cblxuLy8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJyVzIC0gJXMnLCB0aW1lc3RhbXAoKSwgZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKSk7XG59O1xuXG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyLlxuICpcbiAqIFRoZSBGdW5jdGlvbi5wcm90b3R5cGUuaW5oZXJpdHMgZnJvbSBsYW5nLmpzIHJld3JpdHRlbiBhcyBhIHN0YW5kYWxvbmVcbiAqIGZ1bmN0aW9uIChub3Qgb24gRnVuY3Rpb24ucHJvdG90eXBlKS4gTk9URTogSWYgdGhpcyBmaWxlIGlzIHRvIGJlIGxvYWRlZFxuICogZHVyaW5nIGJvb3RzdHJhcHBpbmcgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXdyaXR0ZW4gdXNpbmcgc29tZSBuYXRpdmVcbiAqIGZ1bmN0aW9ucyBhcyBwcm90b3R5cGUgc2V0dXAgdXNpbmcgbm9ybWFsIEphdmFTY3JpcHQgZG9lcyBub3Qgd29yayBhc1xuICogZXhwZWN0ZWQgZHVyaW5nIGJvb3RzdHJhcHBpbmcgKHNlZSBtaXJyb3IuanMgaW4gcjExNDkwMykuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB3aGljaCBuZWVkcyB0byBpbmhlcml0IHRoZVxuICogICAgIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBpbmhlcml0IHByb3RvdHlwZSBmcm9tLlxuICovXG5leHBvcnRzLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuZXhwb3J0cy5fZXh0ZW5kID0gZnVuY3Rpb24ob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCAhaXNPYmplY3QoYWRkKSkgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn07XG5cbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIl19
