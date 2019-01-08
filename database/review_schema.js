/*eslint-disable*/


var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var ReviewSchema = mongoose.Schema({
        review_id : {type : Number, require : true, unique : true}
        ,reviewUser_id : {type : String, default:""}
        ,reviewRestr_id : {type : Number, default:""}
        ,reviewDate : {type : Date, default:Date.now} // time -> date 1019
        ,reviewRating : {type : Number, default:""}
        ,reviewContents : {type : String, default:""}
    });
    
     ReviewSchema.static('findByUsers_id', function(id,callback) {
		return this.find({reviewUsers_id : id}, callback);
	});
    
    ReviewSchema.static('findByRestr_id', function(id,callback) {
		return this.find({reviewRestr_id : id}, callback);
	});
    
    ReviewSchema.static('findByReview_id', function(id,callback) {
		return this.find({review_id : id}, callback);
	});
    
    console.log('ReviewSchema 정의함.');

    return ReviewSchema;

}

module.exports = Schema;
