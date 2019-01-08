/*eslint-disable*/





var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var OptionSchema = mongoose.Schema({
        optionMenu_id : {type : Number, require : true, unique :true}
        ,options : {type: Array, require : true}
        
	});
    
    
    	// 모델 객체에서 사용할 수 있는 메소드 정의
	OptionSchema.static('findByMenu_id', function(id, callback) {
		return this.find({optionMenu_id : id}, callback);
	});
    
    OptionSchema.static('findAll', function(callback) {
		return this.find({}, callback);
	});
	
    console.log('OptionSchema 정의함.');

    return OptionSchema;

}

module.exports = Schema;
