/*eslint-disable*/




var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var OrdersSchema = mongoose.Schema({
		order_id : {type : Number , require : true, unique : true}
        ,orderMenu_id : {type : Number, default:""}
        ,orderRestr_id : {type : Number, default:""}
        ,orderTable_id : {type : Number, default:""}
        ,orderTime : {type : Date, default: Date.now}
        ,orderEA : {type : Number, default:""}
        ,orderMemo : {type : String, default:""}
        ,orderCheck : {type : Boolean, default:0}
        ,orderTableUseCnt : {type : Number, default:0} // count -> cnt
        ,orderPrice : {type : Number, default:0}
        ,orderOption : {type : Array}
        
	});
    
    OrdersSchema.static('findByRestr_id', function(id, callback) {
		return this.find({ordersRestr_id : id}, callback);
	});
    
    OrdersSchema.static('findByTable_id', function(restr, table, callback) {
		return this.find({$and:[{ordersTable_id : table}, {ordersRestr_id : restr}]}, callback);
	});
    
	
    console.log('OrdersSchema 정의함.');

    return OrdersSchema;

}

module.exports = Schema;
