/*eslint-disable*/




var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var TableSchema = mongoose.Schema({
		table_id : {type : Number, require : true}
        ,tableRestr_id : {type : Number, require : true}
        ,tableAmountRemaining : {type : Number, default:0, require : true}
        ,tableAmountDone : {type : Number, default:0, require : true}
        ,tableLink : {type : Number, default:0, require : true}
        ,tableStatus : {type : Number, default:1, require : true}
        ,tableSeatTotal : {type : Number, default:4, require : true}
        ,tableUseCnt : {type : Number, default:0, require : true} // count ->cnt 1019
        ,tableOrderCnt : {type : Number, default:0, require : true}
	});
        
    TableSchema.index({table_id:1,tableRestr_id:1},{unique:true});
    	// 모델 객체에서 사용할 수 있는 메소드 정의
	TableSchema.static('findBytable_id', function(id, callback) {
		return this.find({table_id : tableNum}, callback);
	});
    
    TableSchema.static('findByStatus', function(status, callback) {
		return this.find({tableStatus : status}, callback);
	});
    
    TableSchema.static('findByrestr_id', function(id,callback) {
		return this.find({tableRestr_id : id}, callback);
	});
    
    TableSchema.static('findBySeatTotal', function(n, callback) {
		return this.find({tableSeatTotal : n }, callback);
	});
	
	
    console.log('TableSchema 정의함.');

    return TableSchema;

}

module.exports = Schema;
