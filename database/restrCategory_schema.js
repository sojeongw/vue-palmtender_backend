/*eslint-disable*/




var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var RestrCategotySchema = mongoose.Schema({
        restrCategory_id : {type : Number, require : true, unique : true}
        ,restrCategoryName : {type: String, default:""}
		      
    });
    
    
     RestrCategotySchema.static('findByCategory_id', function(id,callback) {
		return this.find({restrCategory_id : id}, callback);
	});
    
    
    console.log('RestrCategotySchema 정의함.');

    return RestrCategotySchema;

}

module.exports = Schema;
