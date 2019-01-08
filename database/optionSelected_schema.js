/*eslint-disable*/




var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var OptionSelectedSchema = mongoose.Schema({
        OptionSelectedOrder_id : {type : Number, require : true, unique : true}
        ,optionSelectedmenu_id : {type : Number, default:""}
        ,optionSelectedValue : [{type : Number, default:""}]
        
		      
    });
    
    OptionSelectedSchema.static('findByOrders_id', function(id, callback) {
		return this.find({OptionSelectedOrders_id : id}, callback);
	});
    
    
    
    console.log('OptionSelectedSchema 정의함.');

    return OptionSelectedSchema;

}

module.exports = Schema;
