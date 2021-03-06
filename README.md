# jquery-crate

<i>Keywords: jQuery plugin, distributed, decentralized, collaborative editor </i>

The project aims to create a very easy-to-integrate distributed collaborative
editor directly inside your web pages.


# Usage

## Import
```html
<!-- #1 include style dependencies in the header //-->
<link rel='stylesheet' href='path/to/bootstrap.min.css' />
<link rel='stylesheet' href='path/to/font-awesome.min.css' />
```

```html
<!-- #1 include jquery, bootstrap, zeroclipboard, and the crate plugin //-->
<script src='path/to/jquery.min.js'></script>
<script src='path/to/bootstrap.min.js'></script>
<script src='path/to/ZeroclipBoard.min.js'></script>

<script src='path/to/jquery-crate.min.js'></script>
```

## Instantiate
```html
<!-- #2 create the division that will host the distributed editor //-->
<div id='myDistributedEditor'></div>
```

```javascript
// #3A instantiate a new distributed editor into the targeted division.
// options {
//   signalingOptions: configure the signaling service to join or share the
//     document. {address: http://example.of.signaling.service.address,
//                session: the-session-unique-identifier,
//                connect: true|false }
//   webRTCOptions: configure the STUN/TURN server to establish WebRTC
//     connections.
//   styleOptions: change the default styling options of the editor.
//   name: the name of the document
//   importFromJSON: the json object containing the aformentionned options plus
//     the saved sequence. If any of the other above options are specified, the
//     option in the json object are erased by them.

$('#myDistributedEditor').cratify( options );
```

## Access

```javascript
var editor = $('myDistributedEditor').cratify(args)[0];

// #4 access to the header object
editor.header.prepend( newMenuButton1 );
editor.header.append( newMenuButton2 );

// #5 access to the underlying model of the distributed document
var uid = editor.model.uid;
var broadcast = editor.model.broadcast;
// etc.
```

# Project

The project [CRATE](https://github.com/Chat-Wane/CRATE) uses cratify to create
its distributed editors.

# Contribute

Developers are very welcome to contribute!

Do not hesitate to request features or to report bugs!

