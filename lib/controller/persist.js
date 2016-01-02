var MDocumentStore = require('./documentstore.js');

function Persist(buttonView, editorView){
	var self = this;

	 buttonView.button.click(function(){
	 	var db = new MDocumentStore("localhost", "5001");
		var doc = editorView.div.html();
		var docId = "default.txt";

		db.init(function(err) {
			if(err) return console.trace(err);
			db.putDocument(docId,doc,function(err) {
				if(err) return console.trace(err);
				db._getIndex(function(err,index) {
					console.log(err);
					console.log(index);
				});
				//~ db.getDocument(docId,function(err,doc) {
					//~ if(err || !doc) return console.trace(err);
					//~ console.log(doc);
				//~ });
				
			});
		});
	 });
};

module.exports = Persist;