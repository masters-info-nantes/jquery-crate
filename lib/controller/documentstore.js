//var ipfsAPI = require('ipfs-api');


var DocumentStore = function (serverIp,serverPort) {
	this.serverIp = serverIp;
	this.serverPort = serverPort;
	
	this._ipfs = ipfsAPI(this.serverIp, this.serverPort);
};

/* PRIVATE FUNCTIONS */

DocumentStore.prototype._getIndexHash = function (callback) {
	this._ipfs.name.resolve(this._peerId,function(err,res) {
		if(err || !res) return callback(err);
		_indexHash = res.Path;
		callback(undefined,_indexHash);
	});
};

DocumentStore.prototype._getIndex = function (callback) {
	//~ console.log('_getIndex start ok');
	_this = this;
	_this._getIndexHash(function (err,indexHash) {
		if(err || !indexHash) return callback(err);
		//~ console.log('_getIndex _getIndexHash ok');
		_this._ipfs.cat(indexHash,function(err,indexRes) {
			if(err || !indexRes) {
				console.log("> "+(""+err));
				console.log("> "+(""+err).indexOf('this dag node is a directory'));
				console.log("> "+((""+err).indexOf('this dag node is a directory') > 0));
				if((""+err).indexOf('this dag node is a directory') > 0) {
					var notValidIndex = true;
				} else {
					return callback(err);
				}
			} else {
				//~ console.log('_getIndex _ipfs.cat ok');
				try {
					index = JSON.parse(indexRes._readableState.buffer.toString('utf-8'));
					if(typeof index['index'] === 'undefined') {
						var notValidIndex = true;
					}
				} catch(parseErr) {
					var parseError = true;
				}
			}
			console.log('_getIndex try-catch ok '+parseError+'/'+notValidIndex+' => '+(parseError || notValidIndex));
			if(parseError || notValidIndex) {
				// no index existing, so create one
				_this._addDocument(JSON.stringify({'index':''}),function(err,fileHash) {
					if(err || !fileHash) return callback(err);
					//~ console.log('_getIndex _addDocument ok');
					_this._ipfs.name.publish(fileHash,function(err,publishRes) {
						if(err || !publishRes) return callback(err);
						//~ console.log('_getIndex _ipfs.name.publish ok');
						callback(undefined,{'index':''});
					});
				});
			} else {
				callback(undefined,index);
			}
		});
	});
};

DocumentStore.prototype._addDocument = function(fileContent,callback) {
	console.log('_addDocument start ok '+fileContent);
	_this._ipfs.add(new Buffer(fileContent),function(err,res) {
		console.log('_addDocument _ipfs.add '+err);
		if(err || !res) return callback(err);
		console.log('_addDocument _ipfs.add ok');
		var fileHash = res[0].Hash;
		_this._ipfs.pin.add(fileHash,function(err,res) {
			console.log('_addDocument _ipfs.pin.add');
			if(err || !res) return callback(err);
			console.log('_addDocument _ipfs.pin.add ok');
			callback(undefined,fileHash);
		});
	});
};

DocumentStore.prototype._removeDocument = function(hashFile,callback) {
	var _this = this;
	_this._ipfs.pin.remove(hashFile,function(err,res) {
		if(err || !res) return callback(err);
		callback();
	});
};

DocumentStore.prototype._updateIndex = function (newIndex,callback) {
	//~ console.log("_updateIndex start ok => "+newIndex);
	var _this = this;
	_this._getIndexHash(function(err,previousIndexHash) {
		//~ console.log("_updateIndex _getIndexHash => "+err+'/'+previousIndexHash);
		if(err || !previousIndexHash) return callback(err);
		//~ console.log("_updateIndex _getIndexHash ok");
		_this._addDocument(newIndex,function(err,newIndexHash) {
			//~ console.log('_updateIndex _addDocument => '+err+'/'+newIndexHash);
			if(err || !newIndexHash) return callback(err);
			//~ console.log("_updateIndex _addDocument ok");
		
			_this._ipfs.name.publish(newIndexHash,function(err,res) {
				console.log("_updateIndex _ipfs.name.publish => "+err+'/'+JSON.stringify(res));
				if(err || !res) return callback(err);
				console.log("_updateIndex _ipfs.name.publish ok");
				if(typeof newIndexHash !== 'undefined') {
					_this._removeDocument(previousIndexHash,function(err,res) {
						//~ console.log("_updateIndex _removeDocument ok");
						callback(err);
					});
				} else {
					callback();
				}
			});
		});
	});
};

/* PUBLIC FUNCTIONS */

DocumentStore.prototype.init = function (callback) {
	var _this = this;
	_this._ipfs.id(function(err,res) {
		if(err || !res) return callback(err);
		_this._peerId = res.ID;
		callback();
	});
};

DocumentStore.prototype.getDocument = function (fileId,callback) {
	var _this = this;
	_this._getIndex(function(err,index) {
		if(err || !index) return callback(err);
		console.log("getDocument _getIndex > "+JSON.stringify(index));
		if(typeof index[fileId] !== 'undefined') {
			_this._ipfs.cat(index[fileId],function(err,res) {
				if(err || !res) return callback(err);
				callback(undefined,res._readableState.buffer.toString('utf-8'));
			});
		} else {
			callback('File not exists.');
		}
	});
};

DocumentStore.prototype.removeDocument = function (fileId,callback) {
	var _this = this;
	_this._getIndex(function(index) {
		if(typeof index[fileId] !== 'undefined') {
			_this._removeDocument(index[fileId],function() {
				delete index[fileId];
				callback();
			});
		} else {
			callback('File not exists.');
		}
	});
};

DocumentStore.prototype.putDocument = function (fileId, newContent, callback) {
	//~ console.log('put start ok');
	var _this = this;
	_this._getIndex(function(err,index) {
		if(err || !index) return callback(err);
		//~ console.log('put _getIndex ok');
		_this._addDocument(newContent,function(err,newFileHash) {
			if(err || !newFileHash) return callback(err);
			//~ console.log('put _addDocument ok');
			var previousFileHash = index[fileId];
			index[fileId] = newFileHash;
			_this._updateIndex(JSON.stringify(index),function(err) {
				if(err) return callback(err);
				//~ console.log('put _updateIndex ok');
				if(typeof previousFileHash !== 'undefined') {
					//~ console.log('put previousfile');
					_this._removeDocument(previousFileHash,function(err) {
						if(err) return callback(err);
						//~ console.log('put _removeDocument ok');
						callback();
					});
				} else {
					//~ console.log('put no previousfile');
					callback();
				}
			});
		});
	});
};
