/*eslint-disable*/



module.exports = function(router, app) {
    console.log('global_router 호출 됨');
    
    router.use(function(req, res, next) {
        // log each request to the console
        console.log("글로벌 라우터에서 받은 req - method:"+req.method+" , url: "+req.url+" , host : "+req.host);
        //console.log("글로벌 라우터 요청 headers : ");
        //console.log(req);
        console.log("글로벌 라우터 요청 query : ");
        console.log(req.query);
        console.log("글로벌 라우터 요청 body : ");
        console.log(req.body);
        // continue doing what we were doing and go to the route
       next();
    });
    
    //테스트
    router.route('/test').get(function(req, res) {
        console.log('test 호출됨.');
        var restr_id = req.body.restr_id || req.query.restr_id;
        var table_id = req.body.table_id || req.query.table_id;
        var database = req.app.get('database');

        database.cartModel.remove({cartRestr_id : parseInt(restr_id), cartTable_id : parseInt(table_id)}, function(err, data){
            if (err) {
                        res.json("찾기실패");
                      return done(err);
            }
            res.json("삭제완료");
        });
//        database.tableModel.where({$and:[{table_id : 1}, {tableRestr_id:1}]})
//                             .update({tableAmountRemaining : 0}, function(err, data){
//            if(err){
//                callback(err, null);
//                return;
//            }
//        
//        });
          

//         
//            function Price(callback){
//                 database.optionModel.find({optionMenu_id: 1},function(err, data){
//                            if (err) {
//                                res.json("찾기실패");
//                              return done(err);
//                          }
//                     var price = 0;
//                     for(var j=0 ; j<data[0].optionPrice.length; j++){
//                         price = price+parseInt(data[0].optionPrice[j]);
//                     }
//                    console.log(1);
//                    callback(price);
//                 });
//             }
//             
//             Price(function(data){
//                console.log(2);
//
//                 console.log(data);
//                 
//             });

//        var database = req.app.get('database');        
//        var test =1;
//        var test2 = 2;
//        database.restrModel.aggregate([
//            {$match:
//                {$or:[{restr_id : test}, {restr_id : test2},{restr_id : 3}]}
//            },
////            {$lookup:
////                {
////                     from:'restrcategorys',
////                     localField: 'restrCategory_id',
////                     foreignField: 'restrCategory_id',
////                     as:'category',
////                }             
////            },
//            //{$unwind: "$category"},
//            {$lookup:
//                {
//                    from:'tables',
//                    localField: 'restr_id',
//                    foreignField: 'tableRestr_id',
//                    as:'table',
//                    
//                }
//            },
//            //{$unwind: "$table"},
//        
////            {$project : 
////             {_id:0, restr_id : 1, seat:{$sum:"$table.tableStatus"}}
////            }
//            
//            
//        ]).exec(function(err, data){
//            //console.log(data);
//            res.json(data);
//
//        });
//        
//       
       
 
    });
    
    
    
    //지도테스트
    router.route('/map_test').get(function(req, res) {
        console.log('map_test 호출됨.');
        res.render('map_test.ejs', {message : {}});
    });
    
    
    
    
    //메인페이지 요청
    router.route('/otdr').get(function(req,res){
        console.log('/otdr 호출됨.');

        var lat = req.body.lat || req.query.lat;//위도
        var lng = req.body.lng || req.query.lng;//경도
        var database = req.app.get('database');
        console.log(req.query);
        //console.log("lat:"+lat+", lng:"+lng)
        database.restrModel.aggregate([//식당 테이블
            {$match:
                {$and:[
                    {restrLat:{$gte : parseFloat(lat)-0.0055,$lte : parseFloat(lat)+0.0055}},//위도와 경도 일치하는 식당 match
                    {restrLng:{$gte : parseFloat(lng)-0.0055,$lte : parseFloat(lng)+0.0055}}
                ]}
            },
            {$lookup://카테고리 조인
             {
                 from:'restrcategorys',
                 localField: 'restrCategory_id',
                 foreignField: 'restrCategory_id',
                 as:'category'                 
             }
            },
            {$unwind: "$category"},
            {$lookup://테이블 조인
             {
                 from:'tables',
                 localField: 'restr_id',
                 foreignField: 'tableRestr_id',
                 as:'table'                 
             }
            },
            {$project://응답 보낼목록
                {_id:0,restr_id:1,restrName:1,restrInfo:1,restrAddr:1,restrTel:1,restrHour:1,restrParking:1,restrLat:1,restrLng:1,restrSeatNum:1,
                 restrEtc:1,restrCategoryName:"$category.restrCategoryName",restrCategory_id:1,restrRegistPicture:1,usableTable:{$sum:"$table.tableStatus"}}
                
            }
            
        ]).exec(function(err, data){
            if (err) {
                res.json("찾기실패");
		        return;
		    }
            //console.log(data);
            res.json(data);//응답 전송

        });
        
    });
    
    //카테고리
    router.route('/rCategory').get(function(req,res){//요청파라미터없음
        console.log('rCategory 호출됨.');

        var database = req.app.get('database');
        database.restrCategoryModel.find({},function(err, data){
                    if (err) {
                        res.json("찾기실패");
		              return done(err);
		          }
            //res.json(data);
            res.json({test:1});

        });
        
    });
    
    
    //검색
    router.route('/search').get(function(req,res){
        console.log('/search 호출됨.');

        var lat = req.body.lat || req.query.lat;
        var lng = req.body.lng || req.query.lng;
        var category = req.body.category || req.query.category;
        var database = req.app.get('database');
        console.log("lat:"+lat+", lng:"+lng+", category: "+category);
        
        if(!category){
            database.restrModel.aggregate([
                {$match:
                    {restrLat:{$gte : parseFloat(lat)-0.005,$lte : parseFloat(lat)+0.005},restrLng :{$gte : parseFloat(lng)-0.005,$lte : parseFloat(lng)+0.005} }
                },
                
                {$lookup:
                     {
                         from:'restrcategorys',
                         localField: 'restrCategory_id',
                         foreignField: 'restrCategory_id',
                         as:'category'                 
                     }
                },
                {$unwind: "$category"},
                {$lookup:
                     {
                         from:'tables',
                         localField: 'restr_id',
                         foreignField: 'tableRestr_id',
                         as:'table'                 
                     }
                },
                {$project:
                    {_id:0,restr_id:1,restrName:1,restrInfo:1,restrAddr:1,restrTel:1,restrHour:1,restrParking:1,restrLat:1,restrLng:1,restrSeatNum:1,restrEtc:1,restrCategoryName:"$category.restrCategoryName",usableTable:{$sum:"$table.tableStatus"},restrRegistPicture:1}
                
                }
                
            ]).exec(function(err, data){
                if (err) {
                    res.json("찾기실패");
                  //return done(err);
                }
                //console.log(data);
                res.json(data);

            });
        }
        else{
            database.restrModel.aggregate([
                {$match:
                    {restrLat:{$gte : parseFloat(lat)-0.005,$lte : parseFloat(lat)+0.005},restrLng :{$gte : parseFloat(lng)-0.005,$lte : parseFloat(lng)+0.005}, restrCategory_id : parseInt(category) }
                },
                
                {$lookup:
                     {
                         from:'restrcategorys',
                         localField: 'restrCategory_id',
                         foreignField: 'restrCategory_id',
                         as:'category'                 
                     }
                },
                {$unwind: "$category"},
                {$lookup:
                     {
                         from:'tables',
                         localField: 'restr_id',
                         foreignField: 'tableRestr_id',
                         as:'table'                 
                     }
                },
                {$project:
                    {_id:0,restr_id:1,restrName:1,restrInfo:1,restrAddr:1,restrTel:1,restrHour:1,restrParking:1,restrLat:1,restrLng:1,restrSeatNum:1,restrEtc:1,restrCategoryName:"$category.restrCategoryName",usableTable:{$sum:"$table.tableStatus"},restrRegistPicture:1}
                
                }
            ]).exec(function(err, data){
                if (err) {
                    res.json("찾기실패");
                  //return done(err);
                }
                //console.log(data);
                res.json(data);

            });
            
        }
        
       
        
        
        
    });
    
    //식당선택
    router.route('/detail').get(function(req,res){
        console.log('/detail 호출됨.');
        var id = req.body.restr_id || req.query.restr_id; 

        var database = req.app.get('database');
       //console.log("restr_id : " + id);
        console.log(req.query);


        database.restrModel.aggregate([
            {$match:
                {restr_id : parseInt(id)}
            },
            {$lookup:
                 {
                     from:'restrcategorys',
                     localField: 'restrCategory_id',
                     foreignField: 'restrCategory_id',
                     as:'category'                 
                 }
            },
            {$unwind: "$category"},
            {$lookup:
                {
                    from:'tables',
                    localField: 'restr_id',
                    foreignField: 'tableRestr_id',
                    as:'table',
                    
                }
            },
            {$lookup:
                {
                    from:'reviews',
                    localField: 'restr_id',
                    foreignField:'reviewRestr_id',
                    as:'review'
                }
                
            },
            {$lookup:
                {
                    from:'menus',
                    localField: 'restr_id',
                    foreignField:'menuRestr_id',
                    as:'menu'
                }
                
            },
           
            {$project:
                {_id:0,restr_id:1,restrName:1,restrInfo:1,restrAddr:1,restrTel:1,restrHour:1,restrParking:1,restrLat:1,restrLng:1,restrSeatNum:1,restrEtc:1,restrCategoryName:"$category.restrCategoryName",restrRegistPicture:1,table:1,review:{$slice:["$review",5]}, menu:1}
                
            }
            
        ]).exec(function(err, data){
            if (err) {
                res.json("찾기실패");
		        return;
		    }
            //console.log(data);
            res.json(data);
            //res.json(req.query);

        });
        
    });
    
    //리뷰더보기
    router.route('/review_r').get(function(req,res){
        console.log('/review_r 호출됨.');
        var id = req.body.restr_id || req.query.restr_id; 
        
        var database = req.app.get('database');
        database.reviewModel.aggregate([
            {$match:
                {
                    reviewRestr_id : parseInt(id)
                }
                
            }
        ]).exec(function(err, data){
            if (err) {
                res.json("찾기실패");
		        return;
		    }
            //console.log(data);
            res.json(data);

        });
        
        
        
    });
    
    //리뷰쓰기
    router.route('/review_w').get(function(req,res){
        console.log('/review_w 호출됨.');
        var id = req.body.review_id || req.query.review_id;
        var user_id = req.body.user_id || req.query.user_id;
        var restr_id = req.body.restr_id || req.query.restr_id;
        var rating = req.body.rating || req.query.rating;
        var contents = req.body.contents || req.query.contents; 
        var database = req.app.get('database');
        
        var newreview = database.reviewModel({review_id : id, reviewUser_id : user_id, reviewRestr_id : restr_id, reviewRating : rating,
                                                  reviewContents : contents});
          
        newreview.save(function(err) {
		      if (err) {
		        		throw err;
		      }
		        		
		      console.log("리뷰 데이터 추가함.");
        });
          
          res.json(newreview+"리뷰데이터 추가함");
    });
    
    
    
    
    
    
    
    //NFC 태그
    router.route('/menu').get(function(req,res){
        console.log('/menu 호출됨.');
        var restr_id = req.body.restr_id || req.query.restr_id;
        var table_id = req.body.table_id || req.query.table_id;
        var database = req.app.get('database');
        var retag = req.body.retag || req.query.retag;
        
         database.tableModel.find({$and:[{table_id : table_id}, {tableRestr_id:restr_id}]},function(err, data){
                    if (err) {
                        res.json("찾기실패");
		              return done(err);
		          }
             //console.log(data);
            console.log("테이블상태 : "+data[0].tableStatus)
             if(data[0].tableStatus || parseInt(retag)){
               // console.log("ㅁㄴㅇㄻㄴㅇㄹ")

                 if(data[0].tableStatus){
                     database.tableModel.where({$and:[{table_id : table_id}, {tableRestr_id:restr_id}]}).update({tableStatus: 0,tableUseCnt: data[0].tableUseCnt+1}, function(err, data){
                        if(err){
                            callback(err, null);
                            return;
                        }
                    });

                 }
                 
                 
                 
                  database.menuModel.aggregate([
            
                        {$match:
                            {
                                menuRestr_id : parseInt(restr_id)

                            }
                        },
                      {$lookup:
                        {
                            from:'menucategorys',
                            localField: 'menuCategory_id',
                            foreignField: 'menuCategory_id',
                            as:'category'
                        }
                          
                      },
                       {$unwind: "$category"},
                      {$project:
                        {
                            _id:0,menu_id:1,menuCategory_id:"$category.menuCategory_id",menuName:1,menuInfo:1,menuPrice:1,menuPhoto:1
                        }
                          
                      }
                    ]).exec(function(err, data){
                        if (err) {
                            res.json("찾기실패");
                            return;
                        }
                        //console.log(data);
                        res.json(data);

                    });
                 
                 
                 
             }
             else{
                 res.json(1);
             }
                
        });
   
    });
    
    //메뉴 선택
    router.route('/menu-detail').get(function(req,res){
        console.log('/menu-detail 호출됨.');
        var id = req.body.menu_id || req.query.menu_id;
        var database = req.app.get('database');

        database.menuModel.aggregate([
            {$match:
                {menu_id : parseInt(id)}
            }            
        ]).exec(function(err, data){
            if (err) {
                res.json("찾기실패");
                return;
            }
            //console.log(data);
            res.json(data);

        });
        
    });
    //메뉴 옵션 불러오기
    router.route('/menu-option').get(function(req,res){
        console.log('/menu-option 호출됨.');
        var id = req.body.menu_id || req.query.menu_id;
        var database = req.app.get('database');

        database.optionModel.aggregate([
            {$match:
                {optionMenu_id : parseInt(id)}
            }            
        ]).exec(function(err, data){
            if (err) {
                res.json("찾기실패");
                return;
            }
            //console.log(data);
            res.json(data);

        });
        
    });
    
    
    //장바구니 담기
//    router.route('/cart-push').get(function(req,res){
//        console.log('/cart-push 호출됨.');
//        var restr_id = req.body.restr_id || req.query.restr_id;
//        var table_id = req.body.table_id || req.query.table_id;
//        var menu_id = req.body.menu_id || req.query.menu_id;
//        var optionName = req.body.optionName || req.query.optionName;
//        var subName = req.body.subName || req.query.subName;
//        var optionPrice = req.body.optionPrice || req.query.optionPrice;
//        var optionIndex = req.body.optionIndex || req.query.optionIndex;
//        var optionAmount = req.body.optionAmount || req.query.optionAmount;
//        var menuPrice = req.body.menuPrice || req.query.menuPrice;
//        var total = req.body.total || req.query.total;
//       
//        console.log(selectedOptions[0]);
//        var database = req.app.get('database');
//        
//        var newcart = database.cartModel({cartRestr_id : restr_id, cartTable_id : table_id, optionName : optionName,
//                                          subName: subName, optionPrice : optionPrice, optionIndex:optionIndex,
//                                        cartMenu_id : menu_id, optionAmount: optionAmount, menuPrice: menuPrice, total : total});
//          
//        newcart.save(function(err) {
//		      if (err) {
//		        		throw err;
//		      }
//		        		
//		      console.log("장바구니 추가함.");
//        });
//          
//          res.json(newcart+"장바구니 추가함");
//    });
//    
    
     router.route('/cart-push').post(function(req,res){
        console.log('/cart-push 호출됨.');
        var restr_id = req.body.restr_id || req.query.restr_id;
        var table_id = req.body.table_id || req.query.table_id;
        var menu_id = req.body.menu_id || req.query.menu_id;
//        var optionName = req.body.optionName || req.query.optionName;
//        var subName = req.body.subName || req.query.subName;
//        var optionPrice = req.body.optionPrice || req.query.optionPrice;
//        var optionIndex = req.body.optionIndex || req.query.optionIndex;
         var selectedOptions = req.body.selectedOptions || req.query.selectedOptions;
        var optionAmount = req.body.optionAmount || req.query.optionAmount;
        var menuPrice = req.body.menuPrice || req.query.menuPrice;
        var total = req.body.total || req.query.total;
       
        //console.log(selectedOptions[0]);
        var database = req.app.get('database');
        
        var newcart = database.cartModel({cartRestr_id : restr_id, cartTable_id : table_id, selectedOptions: selectedOptions,
                                        cartMenu_id : menu_id, optionAmount: optionAmount, menuPrice: menuPrice, total : total});
          
        
            //console.log("selected options: "+ selectedOptions)
        
        newcart.save(function(err) {
		      if (err) {
		        		throw err;
		      }
		        		
		      console.log("장바구니 추가함.");
        });
          
          res.json(newcart+"장바구니 추가함");
    });
    
    //장바구니 조회
    router.route('/cart-check').get(function(req,res){
        console.log('/cart-check 호출됨.');
        var restr_id = req.body.restr_id || req.query.restr_id;
        var table_id = req.body.table_id || req.query.table_id;
        var database = req.app.get('database');

        
        database.cartModel.aggregate([
            
            {$match:
                {
                    cartRestr_id : parseInt(restr_id), cartTable_id : parseInt(table_id)

                }
            },
            {$lookup:
                        {
                            from:'menus',
                            localField: 'cartMenu_id',
                            foreignField: 'menu_id',
                            as:'menu'
                        }
            },
            {$unwind: "$menu"},

            {$project:
                     {
                     _id:1, cartRestr_id:1, cartTable_id:1,cartMenu_id:1, menuPrice:1, menuName:"$menu.menuName", selectedOptions:1

                    }
                
            }
        ]).exec(function(err, data){
            if (err) {
                res.json("찾기실패");
                return;
            }
            console.log(data);
            res.json(data);

        });
    });
    
    //장바구니 삭제
    router.route('/cart-delete').get(function(req,res){
        console.log('/cart-delete 호출됨.');
        var restr_id = req.body.restr_id || req.query.restr_id;
        var table_id = req.body.table_id || req.query.table_id;
        var menu_id = req.body.menu_id || req.query.menu_id;
        var database = req.app.get('database');

        database.cartModel.remove({cartRestr_id : parseInt(restr_id), cartTable_id : parseInt(table_id), cartMenu_id : parseInt(menu_id)}, function(err, data){
            if (err) {
                        res.json("찾기실패");
                      return done(err);
            }
            res.json("삭제완료");
        })
    });
    
    
    //주문요청
    router.route('/order').post(function(req,res){
        console.log("주문요청");        
        
        var menu_id = req.body.menu_id || req.query.menu_id;
        var restr_id = req.body.restr_id || req.query.restr_id;
        var table_id = req.body.table_id || req.query.table_id;
        var ea = req.body.ea || req.query.ea;
        var memo = req.body.memo || req.query.memo;
        var price = req.body.price || req.query.price;
        var options = req.body.options || req.query.options;
        var database = req.app.get('database');
        console.log("rid:"+restr_id+", tid:"+table_id+", mid:"+menu_id);
        
        
            database.cartModel.remove({cartRestr_id : parseInt(restr_id), cartTable_id : parseInt(table_id)}, function(err, data){
                if (err) {
                            res.json("찾기실패");
                          return done(err);
                }
                console.log("장바구니 삭제완료");
            });
  
            database.tableModel.find({tableRestr_id : restr_id, table_id : table_id}, function(err,data){
                if (err) {
                        res.json("찾기실패");
                      return done(err);
                  }
                var tus = data[0].tableUseCnt;
                console.log(tus);
                database.tableModel.where({tableRestr_id : restr_id, table_id : table_id})//테이블 스키마 주문횟수, 결제필요금액 업데이트
                    .update({tableOrderCnt : data[0].tableOrderCnt+1, 
                             tableAmountRemaining : data[0].tableAmountRemaining + price}, function(err, data){
                        if(err){
                            console.log(err);
                            return;
                        }
                        console.log(table_id + "번 테이블 업데이트");
                });


                database.orderModel.count(function(err, data){
                    if (err) {
                            res.json("찾기실패");
                          return done(err);
                      }
                    
                    var neworder = database.orderModel(
                        {order_id : data+1, orderMenu_id : menu_id, orderRestr_id : restr_id, 
                         orderTable_id : table_id, orderEA : ea, orderMemo : memo, orderCheck : 0, 
                         orderTableUseCnt : tus, orderPrice : price, orderOption : options}
                    );
                    console.log(neworder)
                    neworder.save(function(err) {
                          if (err) {
                                    throw err;
                          }

                          console.log("주문 데이터 추가함.");
                        res.json("주문완료");
                    });


                });


            });

        
        
         
        
    });
    
//    router.route('/order').get(function(req,res){
//        console.log("주문요청");        
//        
//        var menu_id = req.body.menu_id || req.query.menu_id;
//        var restr_id = req.body.restr_id || req.query.restr_id;
//        var table_id = req.body.table_id || req.query.table_id;
//        var ea = req.body.ea || req.query.ea;
//        var memo = req.body.memo || req.query.memo;
//        var price = req.body.price || req.query.price;
//        var options = req.body.options || req.query.options;
//
//        var database = req.app.get('database');
//    
//        database.tableModel.find({tableRestr_id : restr_id, table_id : table_id}, function(err,data){
//            if (err) {
//                    res.json("찾기실패");
//                  return done(err);
//              }
//            var tus = data[0].tableUseCnt;
//            console.log(tus);
//            console.log(i);
//            database.tableModel.where({tableRestr_id : data[0].tableRestr_id, table_id : data[0].table_id})//테이블 스키마 주문횟수, 결제필요금액 업데이트
//                .update({tableOrderCnt : data[0].tableOrderCnt+1, 
//                         tableAmountRemaining : data[0].tableAmountRemaining +price}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                    }
//                    console.log(table_id + "번 테이블 업데이트");
//            });
//
//
//            database.orderModel.count(function(err, data){
//                if (err) {
//                        res.json("찾기실패");
//                      return done(err);
//                  }
//
//                var neworder = database.orderModel({order_id : data+1, orderMenu_id : menu_id, orderRestr_id : restr_id, orderTable_id :table_id, orderEA : ea, orderMemo : memo, orderCheck : 0, orderTableUseCnt : tus, orderPrice : price, orderOption : options[0]});
//
//                neworder.save(function(err) {
//                      if (err) {
//                                throw err;
//                      }
//
//                      console.log("주문 데이터 추가함.");
//                        res.json("주문완료");
//                });
//
//
//            });
//
//
//        });
//
//        
//        
//         
//        
//    });
//  
    
    //결제요청
    router.route('/paypage').get(function(req,res){
        console.log("paypage 요청");
        var table_id = req.body.table_id||req.query.table_id;
        var restr_id = req.body.restr_id||req.query.restr_id;
        var database = req.app.get('database');

        
        database.tableModel.find({tableRestr_id : restr_id, table_id : table_id}, function(err,data){
                if (err) {
                        res.json("찾기실패");
                      return done(err);
                      
                  }
            console.log("tableUseCnt : "+data[0].tableUseCnt);

            database.orderModel.aggregate([
                {$match:
                    {
                        orderTableUseCnt : parseInt(data[0].tableUseCnt), orderRestr_id: parseInt(restr_id), orderTable_id:parseInt(table_id)
                    }

                },
                {$lookup:
                        {
                            from:'menus',
                            localField: 'orderMenu_id',
                            foreignField: 'menu_id',
                            as:'menu'
                        }                
                },
                {$unwind: "$menu"},
                {$project:
                    {
                        _id : 0,orderEA : 1, orderMemo: 1, orderPrice:1, orderOption:1, menuName: "$menu.menuName"
                        , menuPrice: "$menu.menuPrice"
                    }
                }
            ]).exec(function(err, data){
                if (err) {
                    res.json("찾기실패");
                    return;
                }
                console.log(data);
                res.json(data);

            });
        });
        
    });
    
    //결제 진행
    router.route('/pay').post(function(req,res){
        var table_id = req.body.table_id||req.query.table_id;
        var restr_id = req.body.restr_id||req.query.restr_id;
        //var payment = req.body.payment||req.query.payment;
        var database = req.app.get('database');
        
        
        database.cartModel.remove({cartRestr_id : parseInt(restr_id), cartTable_id : parseInt(table_id)}, function(err, data){
            if (err) {
                        res.json("찾기실패");
                      return done(err);
            }
            console.log("장바구니 삭제완료");
        });
        
        database.tableModel.where({$and:[{table_id : table_id}, {tableRestr_id:restr_id}]})
                     .update({tableAmountRemaining : 0, tableAmountDone : 0, tableStatus:1, tableOrderCnt : 0}, function(err, data){
                    if(err){
                        callback(err, null);
                        return;
                    }
            res.json("결제완료");
        });

        
//        database.tableModel.find({tableRestr_id : restr_id, table_id : table_id}, function(err,data){
//                if (err) {
//                        res.json("찾기실패");
//                      return done(err);
//                  }
//             
////                if(data[0].tableAmountRemaining - payment == 0){//완료되는 결제면 테이블 상태 사용가능으로 전환
////                            database.tableModel.where({$and:[{table_id : table_id}, {tableRestr_id:restr_id}]})
////                                        .update({tableStatus:1}, function(err, data){
////                                    if(err){
////                                        callback(err, null);
////                                        return;
////                                    }
////                            });
////                }
//            
//            
////                if(data[0].tableAmountRemaining - payment >= 0){//결제금액 테이블스키마에서 처리
////                         database.tableModel.where({$and:[{table_id : table_id}, {tableRestr_id:restr_id}]})
////                             .update({tableAmountRemaining : data[0].tableAmountRemaining - payment, tableAmountDone : data[0].tableAmountDone+payment}, function(err, data){
////                            if(err){
////                                callback(err, null);
////                                return;
////                            }
////                             
////                                                 
////
////                        });
////                }else if(data[0].tableAmountRemaining - payment < 0){
////                    res.json("결제금액 초과")
////                }
//        });
//        
    });
    
    //점주페이지 요청
    router.route('/owner').get(function(req,res){
        
        
        
    });
    
    //주문정보
    router.route('/or').get(function(req,res){
        
        
        
    });
    
    //테이블세팅
    router.route('/tableset').get(function(req,res){
        
        
        
    });
    
    //테이블세팅
    router.route('/table').get(function(req,res){
        
        
        
    });
    
//    //메뉴스키마
//      router.route('/menuschema/insert').get(function(req, res) {
//        console.log('menuschema/insert 호출됨');
//        /* /?menu_id=[메뉴id]&menuRestr_id=[식당아이디]&menuCategory_id=[카테고리아이디]&menuName=[메뉴명]&menuPrice=[메뉴가격]&menuIngredients=[성분1,성분2]&menuAllergy=[알러지1,알러지2]&menuInfo=[메뉴설명]&menuPhoto=[메뉴사진] 입력*/
//        var menu_id = req.body.menu_id || req.query.menu_id;
//        var restr_id = req.body.menuRestr_id || req.query.menuRestr_id;
//        var category_id = req.body.menuCategory_id || req.query.menuCategory_id;
//        var name = req.body.menuName || req.query.menuName;
//        var price = req.body.menuPrice || req.query.menuPrice;
//        var ingredients = req.body.menuIngredients || req.query.menuIngredients;
//        var allergy = req.body.menuAllergy || req.query.menuAllergy;
//        var info = req.body.menuInfo || req.query.menuInfo;
//        var photo = req.body.menuPhoto || req.query.menuPhoto;
//        var database = req.app.get('database');
//        var newmenu = database.menuModel({menu_id : menu_id, menuRestr_id : restr_id, menuCategory_id : category_id, menuName : name, menuPrice: price, menuIngredients: ingredients, menuAllergy: allergy, menuInfo: info, menuPhoto: photo});
//          
//        newmenu.save(function(err) {
//		      if (err) {
//		        		throw err;
//		      }
//		        		
//		      console.log("메뉴 데이터 추가함.");
//        });
//          
//          res.json(newmenu+"메뉴데이터 추가함");
//
//    });
//    
//     router.route('/menuschema/update').get(function(req, res) {
//        console.log('menuschema/update 호출됨');
//        /*  /?menu_id = [menu_id]&colunmname=[컬럼이름]&value=[바꿀데이터] */
//         var database = req.app.get('database');
//         var menu_id = req.body.menu_id || req.query.menu_id;
//         var value = req.body.value || req.query.value;
//         var colunmname = req.body.colunmname || req.query.colunmname;
//         switch(colunmname){
//             case "menuRestr_id":
//                 database.menuModel.where({menu_id : menu_id}).update({menuRestr_id: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                    }
//                     res.json(data + "수정완료");
//                });
//                 break;
//                 
//             case "menuCategory_id":
//                 database.menuModel.where({menu_id : menu_id}).update({menuCategory_id: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                    }
//                     res.json(data + "수정완료");
//                });
//                 break;
//                 
//             case "menuName":
//                 database.menuModel.where({menu_id : menu_id}).update({menuName: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                    }
//                     res.json(data + "수정완료");
//                });
//                 break;
//                 
//             case "menuPrice":
//                 database.menuModel.where({menu_id : menu_id}).update({menuPrice: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                    }
//                     res.json(data + "수정완료");
//                });
//                 break;
//                 
//             case "menuIngredients":
//                 database.menuModel.where({menu_id : menu_id}).update({menuIngredients: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                    }
//                     res.json(data + "수정완료");
//                });
//                 break;
//                 
//             case "menuAllergy":
//                 database.menuModel.where({menu_id : menu_id}).update({menuAllergy: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                    }
//                     res.json(data + "수정완료");
//                });
//                 break;
//                 
//             case "menuInfo":
//                 database.menuModel.where({menu_id : menu_id}).update({menuInfo: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                    }
//                     res.json(data + "수정완료");
//                });
//                 break;
//                 
//             case "menuPhoto":
//                 database.menuModel.where({menu_id : menu_id}).update({menuPhoto: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                    }
//                     res.json(data + "수정완료");
//                });
//                 break;
//         }
//    });
//    
//     router.route('/menuschema/remove').get(function(req, res) {
//        console.log('menuschema/remove 호출됨');
//          /*  /?colunmname=[컬럼이름]&value=[검색데이터] */
//        var colunmname = req.body.colunmname || req.query.colunmname;
//        var value = req.body.value || req.query.value;
//        var database = req.app.get('database');
//         /*database.menuModel.remove({menu_id: data}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                        }
//                  res.json("지우기성공");
//                });
//           */     
//         
//         
//         switch(colunmname){
//             case "menu_id":
//                database.menuModel.remove({menu_id: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                        }
//                    res.json(data+"지우기성공");
//                    });
//                
//                 break;
//                 
//             case "menuRestr_id":
//                database.menuModel.remove({menuRestr_id: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                        }
//                    res.json(data+"지우기성공");
//
//                    });
//                 break;
//                 
//             case "menuCategory_id":
//                 database.menuModel.remove({menuCategory_id: value}, function(err, data){
//                    if(err){
//                            callback(err, null);
//                            return;
//                        }
//                     res.json(data+"지우기성공");
//                    });
//                 
//                 break;
//                 
//             case "menuName":
//                 database.menuModel.remove({menuName: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                        }
//                     res.json(data+"지우기성공");
//                    });
//                 break;
//                 
//             case "menuPrice":
//                database.menuModel.remove({menuPrice: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                        }
//                    res.json(data+"지우기성공");
//                    });
//                 break;
//                 
//             case "menuIngredients":
//                 database.menuModel.remove({menuIngredients: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                        }
//                     res.json(data+"지우기성공");
//                    });
//                 break;
//                 
//             case "menuAllergy":
//                 database.menuModel.remove({menuAllergy: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                        }
//                     res.json(data+"지우기성공");
//                    });
//                 break;
//                 
//             case "menuInfo":
//                 database.menuModel.remove({menuInfo: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                        }
//                     res.json(data+"지우기성공");
//                    });
//                 break;
//                 
//             case "menuPhoto":
//                database.menuModel.remove({menuPhoto: value}, function(err, data){
//                    if(err){
//                        callback(err, null);
//                        return;
//                        }
//                    res.json(data+"지우기성공");
//                    });
//                 break;
//         }
//
//    });
//    
//     router.route('/menuschema/find').get(function(req, res) {
//        console.log('menuschema/find 호출됨');
//         /* /?colunmname=[검색할컴럼명]&value=[해당컬럼값]*/
//        var colunmname = req.body.colunmname || req.query.colunmname;
//        var value = req.body.value || req.query.value;
//        var database = req.app.get('database');
//        var testd;
//        switch(colunmname){
//            case "menu_id":
//                database.menuModel.findOne({menu_id : value},function(err, data){
//                    if (err) {
//                        res.json("찾기실패");
//		              return done(err);
//		          }
//                //var text= data._doc.menuName;
//                //colsole.log(text);
//                //res.json({menuName : data._doc.menuName});
//                    res.json(data);
//                });
//                
//                break;
//                
//             case "menuRestr_id":
//                database.menuModel.find({menuRestr_id : value},function(err, data){
//                    if (err) {
//                        res.json("찾기실패");
//		              return done(err);
//		          }
//            
//                res.json(data);
//                });
//                 break;
//                 
//             case "menuCategory_id":
//                 database.menuModel.find({menuCategory_id : value},function(err, data){
//                    if (err) {
//                        res.json("찾기실패");
//		              return done(err);
//		          }
//            
//                res.json(data);
//                });
//                 
//                 break;
//                 
//             case "menuName":
//                 database.menuModel.find({menuName : value},function(err, data){
//                    if (err) {
//                        res.json("찾기실패");
//		              return done(err);
//		          }
//            
//                res.json(data);
//                });
//                 break;
//                 
//             case "menuPrice":
//                 database.menuModel.find({menuPrice : value},function(err, data){
//                    if (err) {
//                        res.json("찾기실패");
//		              return done(err);
//		          }
//            
//                res.json(data);
//                });
//                 break;
//                 
//             case "menuIngredients":
//                database.menuModel.find({menuIngredients : value},function(err, data){
//                    if (err) {
//                        res.json("찾기실패");
//		              return done(err);
//		          }
//            
//                res.json(data);
//                });
//                 break;
//                 
//             case "menuAllergy":
//                 database.menuModel.find({menuAllergy : value},function(err, data){
//                    if (err) {
//                        res.json("찾기실패");
//		              return done(err);
//		          }
//            
//                res.json(data);
//                });
//                 break;
//                 
//             case "menuInfo":
//                 database.menuModel.find({menuInfo : value},function(err, data){
//                    if (err) {
//                        res.json("찾기실패");
//		              return done(err);
//		          }
//            
//                res.json(data);
//                });
//                 break;
//                 
//             case "menuPhoto":
//                database.menuModel.find({menuPhoto : value},function(err, data){
//                    if (err) {
//                        res.json("찾기실패");
//		              return done(err);
//		          }
//            
//                res.json(data);
//                });
//                 break;
//         }
//         
//    });
//    
//
//    

    
};