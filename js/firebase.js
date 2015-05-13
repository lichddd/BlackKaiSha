
var FireBase = function(){
    function hi(){//私有函数，外部无法访问  
        alert(name + " : Hi!");//私有变量，内部可以直接访问  
    }  
    this.hiGlobal = function(){  
        alert(globalName + " : Hello!");//全局变量，内部可以直接访问  
    }  
    this.sayHello = function(){//public函数，外部可访问  
        hi();//私有函数，内部可以直接访问  
        this.hiGlobal();//公有函数，内部访问也要加上 this.  
    }  
    
	var myDataRef = new Firebase('https://blcakkaisha.firebaseio.com');
//	var verinfo = myDataRef.child('ver');
	
	
	
	this.pushDM=function  (addtstr,namestr,desstr,errfunc,scssfunc) {
		myDataRef.child('blackkaisha').push(
			{
			  addr: addtstr,
			  name: namestr,
			  des:desstr
			},
			function(error) {
			  if (error) {
			    console.log('发送弹幕失败');
			  } else {
			    console.log('发送弹幕成功');
			  }
			}
		);
	}
	
	
	
	this.getDM=function (id,onReturn) {
		myDataRef.child('blackkaisha').orderByChild("addr").once('value', function (dataSnapshot) {
  		// code to handle new value
  			console.log('读取弹幕danmu'+id);
  			
  			
  			dataSnapshot.exists()==true?console.log('弹幕数据存在'):console.error('弹幕数据不存在');
  			var list=[];
  			dataSnapshot.forEach(function (data) {
  				list.push(data.val());
//				console.log(data.val().time+':'+data.val().text);
  			})
  			onReturn(list);

  			
		}, function (err) {
			console.log('读取弹幕失败');
		  // code to handle read error
		});
	}
	

    
 
    
};  
  
var _firebase=new FireBase();