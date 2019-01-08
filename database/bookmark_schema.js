/*eslint-disable*/




var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var BookmarkSchema = mongoose.Schema({
        bookmark_id : {type : Number, require : true}
        ,bookmarkRestr_id : {type: Number, require: true}
    });
    
    
    BookmarkSchema.index({bookmark_id:1,bookmarkRestr_id:1},{unique:true})
    
    BookmarkSchema.static('findBybookmark_id', function(id, callback) {
		return this.find({bookmark_id : id}, callback);
	});
    
    BookmarkSchema.static('findByRestr_id', function(id, callback) {
		return this.find({bookmarkRestr_id : id}, callback);
	});
    
    console.log('BookmarkSchema 정의함.');

    return BookmarkSchema;

}

module.exports = Schema;
