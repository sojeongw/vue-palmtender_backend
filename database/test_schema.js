/*eslint-disable*/




var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var ModSchema = mongoose.Schema({
		 optionMenu_id : {type : Number, require : true, unique :true}
        ,options : {type:Array, require : true}
	});
    
    // 값이 유효한지 확인하는 함수 정의
	var validatePresenceOf = function(value) {
		return value && value.length;
	};
    
    console.log('ModSchema 정의함.');

    return ModSchema;

}

module.exports = Schema;
