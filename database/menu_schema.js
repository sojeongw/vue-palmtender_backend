/*eslint-disable*/




var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var MenuSchema = mongoose.Schema({
		menu_id: {type : Number,  unique: true, require : true}
        , menuRestr_id : {type : Number, default:""}
        , menuCategory_id : {type : Number, default:""}
        , menuName : {type : String, default:""}
        , menuPrice : {type : Number, default:""}
        , menuIngredients : {type : String, default:""}
        , menuAllergy : {type : String, default:""}
        , menuInfo : {type : String, default:""}
        , menuPhoto : {rype : String, default:""}
      
    });
    
    
    	// 모델 객체에서 사용할 수 있는 메소드 정의
	MenuSchema.static('findByRestr_id', function(id, callback) {
		return this.find({menuRestr_id : id}, callback);
	});
    
    
    MenuSchema.static('findAll', function(callback) {
		return this.find({}, callback);
	});
	
    console.log('MenuSchema 정의함.');

    return MenuSchema;

}

module.exports = Schema;
