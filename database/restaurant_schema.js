/*eslint-disable*/




var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var RestaurantSchema = mongoose.Schema({
		restr_id : {type : Number, unique : true, require : true}
        ,restrOwner_id : {type : String, default:""}
        ,restrClerk_id : {type : String, default:""}
        ,restrCategory_id : {type : Number, default:""}
        ,restrName : {type : String, default:""}
        ,restrInfo : {type : String, default:""}
        ,restrAddr : {type : String, default:""}
        ,restrTel : {type : String, default:""}
        ,restrHours : {type : String, default:""}
        ,restrParking : {type : Number, default:""}
        ,restrLat : {type : Number, default:""}
        ,restrLng : {type : Number, default:""}
        ,restrSeatNum : {type : Number, default:""}
        ,restrRegist : {type : String, default:""}
        ,restrResgistPicture : {type : String, default:""}
        ,restrEtc : {type : String, default:""}
	});
    
    
    	// 모델 객체에서 사용할 수 있는 메소드 정의
	RestaurantSchema.static('findByOwner_id', function(id, callback) {
		return this.find({restrOwner_id : id}, callback);
	});
    
    RestaurantSchema.static('findByName', function(name, callback) {
		return this.find({restrName : name}, callback);
	});
    
    RestaurantSchema.static('findByRestr_id', function(id,callback) {
		return this.find({restr_id : id}, callback);
	});
    
     RestaurantSchema.static('findByLatLng', function(Lat, Lng,callback) {
		return this.find({$and:[{restrLat : {$gte: Lat-10, $lte:Lat+10}}, {restrLng : {$gte: Lng-10, $lte:Lng+10}}]}, callback);//10을 범위에 맞춰서 수정
	});
    
	
    console.log('RestaurantSchema 정의함.');

    return RestaurantSchema;

}

module.exports = Schema;