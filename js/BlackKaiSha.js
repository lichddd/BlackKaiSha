

var d=new Date();

var table;


function timeFormatter(value, row) {
		d.setHours(0,0,0,0);
		d.setMilliseconds(value*1000);
		
        return (d.getHours().toString().length>1?d.getHours():'0'+d.getHours())+':'
        +(d.getMinutes().toString().length>1?d.getMinutes():'0'+d.getMinutes())+':'
        +(d.getSeconds().toString().length>1?d.getSeconds():'0'+d.getSeconds());
    }

function countFormatter(value, row) {

		
        return '<span class="badge countSpan" data-html="true" data-toggle="tooltip"  title="'+row.des+'">'+value+'</span>';
    }
function creatTable (arr) {
	
	table=$("#my_table").bootstrapTable({
                    data: arr
                }).on('all.bs.table', function (e, name, args) {
                $('[data-toggle="tooltip"]').tooltip();
            }).on('click-row.bs.table', function (e, row, $element) {
               $('[data-toggle="tooltip"]').tooltip();
            }).on('dbl-click-row.bs.table', function (e, row, $element) {
               $('[data-toggle="tooltip"]').tooltip();
            }).on('sort.bs.table', function (e, name, order) {
                $('[data-toggle="tooltip"]').tooltip();
            }).on('check.bs.table', function (e, row) {
                $('[data-toggle="tooltip"]').tooltip();
            }).on('uncheck.bs.table', function (e, row) {
               $('[data-toggle="tooltip"]').tooltip();
            }).on('check-all.bs.table', function (e) {
                $('[data-toggle="tooltip"]').tooltip();
            }).on('uncheck-all.bs.table', function (e) {
                $('[data-toggle="tooltip"]').tooltip();
            }).on('load-success.bs.table', function (e, data) {
                $('[data-toggle="tooltip"]').tooltip();
            }).on('load-error.bs.table', function (e, status) {
                $('[data-toggle="tooltip"]').tooltip();
            }).on('column-switch.bs.table', function (e, field, checked) {
                $('[data-toggle="tooltip"]').tooltip();
            }).on('page-change.bs.table', function (e, size, number) {
                $('[data-toggle="tooltip"]').tooltip();
            }).on('search.bs.table', function (e, text) {
                $('[data-toggle="tooltip"]').tooltip();
            });
}





function createChart (arr,arr2) {
	var myChart = echarts.init(document.getElementById('mapDIV'));

// 过渡---------------------
myChart.showLoading({
    text: '正在努力的读取数据中...',    //loading话术
});

// ajax getting data...............

// ajax callback
myChart.hideLoading();

// 图表使用-------------------
option = {
  	backgroundColor: '#1b1b1b',
    color: ['gold','aqua','lime'],
    title : {
        text: '辣鸡公司分布',
        x:'center'
    },
    tooltip : {
        trigger: 'item'
    },

    dataRange: {
        min : 0,
        max : 500,
        calculable : true,
        color: ['maroon','purple','red','orange','yellow','lightgreen'],
        textStyle:{
            color:'#fff'
        }
    },
    toolbox: {
        show : true,
        orient : 'vertical',
        x: 'right',
        y: 'center',
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    series : [
        {

            itemStyle:{
                normal:{
                    borderColor:'rgba(100,149,237,1)',
                    borderWidth:0.5,
                    areaStyle:{
                        color: '#1b1b1b'
                    },
                  	label:{show:true,
                    textStyle:{
                        color:'#fff'
                    }}
                },
                emphasis:{label:{show:true,
                    textStyle:{
                        color:'#fff'
                    }}}
            },
          
          
            name: '辣鸡公司数量',
            type: 'map',
            mapType: 'china',
            hoverable: true,
            roam:true,
            data : [],
            markPoint : {
                symbolSize: 5,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                itemStyle: {
                    normal: {
                        borderColor: '#87cefa',
                        borderWidth: 1,            // 标注边线线宽，单位px，默认为1
                        label: {
                            show: false
                        }
                    },
                    emphasis: {
                        borderColor: '#1e90ff',
                        borderWidth: 5,
                        label: {
                            show: false
                        }
                    }
                },
                data : 
//              [
//                  {name: "海门", value: 9},
//                  {name: "鄂尔多斯", value: 12},
//                  {name: "招远", value: 12},
//                  {name: "舟山", value: 12}
//                  
//              ]
                arr
            },
            geoCoord: city_position
        },
        {
            name: 'Top5',
            type: 'map',
            mapType: 'china',
            data:[],
            markPoint : {
                symbol:'emptyCircle',
                symbolSize : function (v){
                    return 10 + v/100
                },
                effect : {
                    show: true,
                    shadowBlur : 0
                },
                itemStyle:{
                    normal:{
                        label:{show:false}
                    }
                },
                data : 
//              [
//                  {name: "廊坊", value: 193},
//                  {name: "菏泽", value: 194},
//                  {name: "合肥", value: 229},
//                  {name: "武汉", value: 273},
//                  {name: "大庆", value: 279}
//              ]
				arr2
            }
        }
    ]
};
                    
                    
                    
                    
myChart.setOption(option);
}



$().ready(function () {

		
$('[data-toggle="tooltip"]').tooltip();

//	  $('#inputDM').keypress(function (e) {
//      if (e.keyCode == 13) {
//        
//        var text = $('#inputDM').val();
//        var time = danmakunowtime;
//        _firebase.pushDM('',time,text);
//        $(event.target).prop('value','');
//        showdanmuOnInput(text);
//      }
//    });
      $('#commitbtn').on('click',function (event) {
      	if ($('#inputaddr').val().length >0 &&$('#inputname').val().length >0) {
//        var addr = $('#inputaddr1').val()+" "+$('#inputaddr2').val();
			
          var addr = $('#inputaddr').val();
          var name = $('#inputname').val();
          var des = $('#inputdes').val();
          _firebase.pushDM(addr,name,des);
        }
      });
      
      
      
	_my_progress.progress();
	_firebase.getDM("",function (list) {
		var dict=new Array();
		
		for (var i in list) {
			if (dict[list[i].addr+'@#@'+list[i].name]) {
				dict[list[i].addr+'@#@'+list[i].name].count+=1;
				dict[list[i].addr+'@#@'+list[i].name].des+=('</br>'+list[i].des);
			}
			else
			{
				dict[list[i].addr+'@#@'+list[i].name]={name:list[i].name,addr:list[i].addr,des:list[i].des,count:1};
			}
		}
		
		var arr=[];
		var arr2=[];
		
		for (var i in dict) {
			arr.push(dict[i]);
		}
		
		
		
		
		arr.sort(function(a,b)
{
return b.count - a.count;
});
		
		
		console.log(list);
		console.log(dict);
		creatTable(arr);
		
		
		
		var dict2=new Array();
		var arr2=[];
		
		console.log(arr);
		for (var i = 0; i < arr.length; i++) {
			console.log(arr[i]);
			if (dict2[arr[i].addr]) {
				dict2[arr[i].addr].value+=1;

			}
			else
			{
				dict2[arr[i].addr]={name:arr[i].addr,value:1};

			}
		}
		
		console.log(dict2);
		for (var i in dict2) {
			arr2.push(dict2[i]);
		}
		
		arr2.sort(function(a,b)
		{
		return b.value - a.value;
		});
		
		
		var arr3=[];

		for (var i = 0; i < arr2.length; i++) {
			arr3.push(arr2[i]);
			if (i==4) {
				break;
			}
		}
		
		createChart (arr2,arr3);

		_my_progress.finish();

	});
	

	
	

	

});

