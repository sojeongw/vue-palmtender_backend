/*eslint-disable*/




var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var MenuCategotySchema = mongoose.Schema({
        menuCategory_id : {type : Number, require : true, unique : true}
        ,menuCategoryName : {type: String, defaul:""}
		      
    });
    
    MenuCategotySchema.static('findByCategory_id', function(id, callback) {
		return this.find({menuCategory_id : id}, callback);
	});
    
    
    console.log('MenuCategotySchema 정의함.');

    return MenuCategotySchema;

}

module.exports = Schema;
