
/*
 * 설정
 */
/*eslint-disable*/

module.exports = {
	server_port: 4000,
	db_url: 'mongodb://localhost:27017/local',
	db_schemas: [
	    {file:'./user_schema', collection:'users', schemaName:'UserSchema', modelName:'userModel'},
        {file:'./cart_schema', collection:'carts', schemaName:'CartSchema', modelName:'cartModel'},
        {file:'./restaurant_schema', collection:'restaurants', schemaName:'restrSchema', modelName:'restrModel'},
        {file:'./restrCategory_schema', collection:'restrcategorys', schemaName:'restrCategorySchema', modelName:'restrCategoryModel'},
        {file:'./table_schema', collection:'tables', schemaName:'tableSchema', modelName:'tableModel'},
        {file:'./menu_schema', collection:'menus', schemaName:'menuSchema', modelName:'menuModel'},
        {file:'./menuCategory_schema', collection:'menucategorys', schemaName:'menuCategorySchema', modelName:'menuCategoryModel'},
        {file:'./order_schema', collection:'orders', schemaName:'OrdersSchema', modelName:'orderModel'},
        {file:'./option_schema', collection:'options', schemaName:'optionSchema', modelName:'optionModel'},
        {file:'./optionSelected_schema', collection:'optionselecteds', schemaName:'oprionSelectedSchema', modelName:'optionSelectedModel'},
        {file:'./review_schema', collection:'reviews', schemaName:'reviewSchema', modelName:'reviewModel'},
        {file:'./bookmark_schema', collection:'bookmarks', schemaName:'BookmarkSchema', modelName:'bookmarkModel'},
        {file:'./test_schema', collection:'modbustest', schemaName:'ModSchema', modelName:'ModModel'}

	],
	route_info: [
        
	],
	facebook: {		// passport facebook
		clientID: '623350768022240',
		clientSecret: '6e2dfa8081e169a19bd3e6ad53c4a960',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	}
}