/*eslint-disable*/


var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var CartSchema = mongoose.Schema({
        cartRestr_id : {type : Number, require : true}
        ,cartTable_id : {type : Number, require : true}
        ,cartMenu_id : {type: Number, require: true}
        ,selectedOptions : {type: Array}
//        ,optionName : {type: Array}
//        ,subName : {type : Array}
//        ,optionPrice : {type : Array}
//        ,optionIndex : {type : Array}
        ,optionAmount : {type: Number}
        ,menuPrice : {type: Number}
        ,total : {type: Number}
    });
    
    CartSchema.static('findByTable_id', function(id, callback) {
		return this.find({cartTable_id : id}, callback);
	});
    
    CartSchema.static('findByRestr_id', function(id, callback) {
		return this.find({cartRestr_id : id}, callback);
	});
    
    console.log('CartSchema 정의함.');

    return CartSchema;

}

module.exports = Schema;
