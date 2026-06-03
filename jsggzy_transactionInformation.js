// left tree
var param = {
    "token": "",
    "pn": 0,
    "rn": "10",
    "sdt": "",
    "edt": "",
    "wd": "",
    "inc_wd": "",
    "exc_wd": "",
    "fields": "title",
    "cnum": "001",
    "sort": '{"infodatepx":"0"}',
    "ssort": "title",
    "cl": 200,
    "terminal": "",
    "condition": null,
    "time": null,
    "highlights": "title",
    "statistics": null,
    "unionCondition": null,
    "accuracy": "",
    "noParticiple": "1",
    "searchRange": null,
    'isBusiness': "1"
};

var categorynumall = "003";
var flag = 0;

var params = {
    pageIndex: 0,
    pageSize: 10,
    keyword: '',
    startDate: '',
    endDate: '',
    xxtype: '',
    timeRange: '',
    dataSource: '省平台',
    tradeSource: '',
    tradeType: ''
};


(function (win, $) {

    // 只初始化一个 Chosen 下拉框
    $('#tradeSource').chosen({
        width: '298px',
        disable_search_threshold: 10,
        nosearch: true
    });

    // 页面初始化默认加载 省平台 选项
    function initTradeSourceOptions() {
        var $select = $('#tradeSource');
        $select.empty();
        $select.append('<option value="">不限</option>');
        var defaultList = [
            "省级", "南京市", "无锡市", "徐州市", "常州市", "苏州市",
            "南通市", "连云港市", "淮安市", "盐城市", "扬州市",
            "镇江市", "泰州市", "宿迁市"
        ];
        $.each(defaultList, function (i, val) {
            $select.append('<option value="' + val + '">' + val + '</option>');
        });
        $select.val('').trigger('chosen:updated');
    }
    initTradeSourceOptions();


    function getTime(initToday) {
        var initToday = initToday;
        var initYear = initToday.getFullYear().toString();
        var initMonth = (initToday.getMonth() + 1).toString();
        var initDate = initToday.getDate().toString();
        return initYear + "-" + initMonth + "-" + initDate;
    }


    function init() {
        initLaydate();
        bindEvents();
        params.startDate = getdate(0) + " 00:00:00";
        params.endDate = getdate(0) + " 23:59:59";
    }


    function initLaydate() {
        layui.use(['laydate'], function () {
            var laydate = layui.laydate;
            laydate.render({
                elem: '#date-range',
                theme: '#287FE5',
                format: 'yyyy-MM-dd',
                range: ['#startDate', '#endDate'],
                rangeLinked: true,
                min: getdate(90),
                max: getdate(0),
                done: function (value, date) {
                    params.startDate = value.split(' - ')[0] + " 00:00:00";
                    params.endDate = value.split(' - ')[1] + " 23:59:59";

                    if (value == '') {
                        params.startDate = getdate(params.timeRange) + " 00:00:00";
                        params.endDate = getdate(0) + " 23:59:59";
                    }
                    getjyinfolist(0, 10);
                }
            });
        });

        $('#endDate').on('click', function () {
            $('#startDate').trigger('click');
        });
    }


    function bindEvents() {
        $('#searchBtn').on('click', function () {
            var keyword = $('#searchInput').val().trim();
            params.keyword = keyword;
            params.pageIndex = 1;
            getjyinfolist(0, 10);
        });

        $('#searchInput').on('keypress', function (e) {
            if (e.which === 13) {
                $('#searchBtn').trigger('click');
            }
        });


        $('.time-buttons, .source-buttons, .type-buttons').on('click', 'button', function () {
            var $btn = $(this);
            var $buttonGroup = $btn.closest('[data-type]');
            var type = $buttonGroup.data('type');
            var value = $btn.data('value');

            $buttonGroup.find('button').removeClass('active');
            $btn.addClass('active');

            // ====================== 核心：数据源切换 ======================
            if (type === 'dataSource') {
                params.dataSource = value;
                var $select = $('#tradeSource');
                $select.empty();
                $select.append('<option value="">不限</option>');

                if ($btn.text().trim() === '省平台') {
					  //$('#col-area').text('所属区域');
                    var list = [
                        "省级", "南京市", "无锡市", "徐州市", "常州市", "苏州市",
                        "南通市", "连云港市", "淮安市", "盐城市", "扬州市",
                        "镇江市", "泰州市", "宿迁市"
                    ];
                    $.each(list, function (i, val) {
                        $select.append('<option value="' + val + '">' + val + '</option>');
                    });
					//交易类型隐藏
					$("#jytypefl").show();
					//信息类型 展示招标公告+中标公告+其他公告
					 params.xxtype = '';
					 $("#xxtypefl").hide();
					 
					 
                } else {
                    $select.append('<option value="JSTCC江苏招标电子交易平台系统">JSTCC江苏招标电子交易平台系统</option>');
                    $select.append('<option value="中招联合招标采购网">中招联合招标采购网</option>');
					
					//$('#col-area').text('来源平台名称');
					//交易类型隐藏
					$("#jytypefl").hide();
					//信息类型 展示招标公告+中标公告+其他公告
					 params.xxtype = '';
					 $("#xxtypefl").show();
					 
					 $("#xxtype").html("");
                     $("#xxtype").append('<button class="type-btn active" data-value="">不限</button>');
					$("#xxtype").append('<button class="type-btn" data-value="招标公告">' + '招标公告' + '</button>');
					$("#xxtype").append('<button class="type-btn" data-value="中标公告">' + '中标公告' + '</button>');
					$("#xxtype").append('<button class="type-btn" data-value="其他公告">' + '其他公告' + '</button>');
					
                }

                $select.val('').trigger('chosen:updated');
                params.tradeSource = '';
                getjyinfolist(0, 10);
                return;
            }

            params[type] = value;

            if (type == 'tradeType') {
                params.xxtype = '';
                var ywtype = params.tradeType; // 修复：ywtype 未定义BUG
                if (ywtype) {
                    $("#xxtypefl").show();
                    $.ajax({
                        url: "/js/xxtypelist.json",
                        type: "get",
                        dataType: "json",
                        cache: false,
                        success: function (msg) {
                            $("#xxtype").html("");
                            $("#xxtype").append('<button class="type-btn active" data-value="">不限</button>');
                            if (ywtype == "003001") {
                                for (var i = 0; i < msg.jsgc.length; i++) {
                                    $("#xxtype").append('<button class="type-btn" data-value="' + msg.jsgc[i].categorynum + '">' + msg.jsgc[i].categoryname + '</button>');
                                }
                            } else if (ywtype == "003002") {
                                for (var i = 0; i < msg.jtgc.length; i++) {
                                    $("#xxtype").append('<button class="type-btn" data-value="' + msg.jtgc[i].categorynum + '">' + msg.jtgc[i].categoryname + '</button>');
                                }
                            } else if (ywtype == "003003") {
                                for (var i = 0; i < msg.slgc.length; i++) {
                                    $("#xxtype").append('<button class="type-btn" data-value="' + msg.slgc[i].categorynum + '">' + msg.slgc[i].categoryname + '</button>');
                                }
                            } else if (ywtype == "003013") {
                                for (var i = 0; i < msg.tdky.length; i++) {
                                    $("#xxtype").append('<button class="type-btn" data-value="' + msg.tdky[i].categorynum + '">' + msg.tdky[i].categoryname + '</button>');
                                }
                            } else if (ywtype == "003004") {
                                for (var i = 0; i < msg.zfcg.length; i++) {
                                    $("#xxtype").append('<button class="type-btn" data-value="' + msg.zfcg[i].categorynum + '">' + msg.zfcg[i].categoryname + '</button>');
                                }
                            } else if (ywtype == "003006") {
                                for (var i = 0; i < msg.gycq.length; i++) {
                                    $("#xxtype").append('<button class="type-btn" data-value="' + msg.gycq[i].categorynum + '">' + msg.gycq[i].categoryname + '</button>');
                                }
                            }
							
                        }
                    });
                } else {
                    $("#xxtypefl").hide();
                    $("#xxtype").html("");
                    $("#xxtype").append('<button class="type-btn active" data-value="">不限</button>');
                }
            } else if (type == 'timeRange') {
                if (value) {
                    params.startDate = getdate(value) + " 00:00:00";
                    params.endDate = getdate(0) + " 23:59:59";
                }
            }

            getjyinfolist(0, 10);
        });

        // 只用一个下拉事件
        $('#tradeSource').on('change', function () {
            params.tradeSource = $(this).val();
            getjyinfolist(0, 10);
        });
    }


    init();

    var jytype = window.location.href.split("type=")[1];

    if (jytype) {
        $("#xxtypefl").show();
        $.ajax({
            url: "/js/xxtypelist.json",
            type: "get",
            dataType: "json",
            cache: false,
            success: function (msg) {
                $("#xxtype").html("");
                $("#xxtype").append('<button class="type-btn active" data-value="">不限</button>');
                var ywtype = params.tradeType; // 修复：ywtype 未定义BUG
                
				
				 if (ywtype == "003001") {
                                for (var i = 0; i < msg.jsgc.length; i++) {
                                    $("#xxtype").append('<button class="type-btn" data-value="' + msg.jsgc[i].categorynum + '">' + msg.jsgc[i].categoryname + '</button>');
                                }
                            } else if (ywtype == "003002") {
                                for (var i = 0; i < msg.jtgc.length; i++) {
                                    $("#xxtype").append('<button class="type-btn" data-value="' + msg.jtgc[i].categorynum + '">' + msg.jtgc[i].categoryname + '</button>');
                                }
                            } else if (ywtype == "003003") {
                                for (var i = 0; i < msg.slgc.length; i++) {
                                    $("#xxtype").append('<button class="type-btn" data-value="' + msg.slgc[i].categorynum + '">' + msg.slgc[i].categoryname + '</button>');
                                }
                            } else if (ywtype == "003013") {
                                for (var i = 0; i < msg.tdky.length; i++) {
                                    $("#xxtype").append('<button class="type-btn" data-value="' + msg.tdky[i].categorynum + '">' + msg.tdky[i].categoryname + '</button>');
                                }
                            } else if (ywtype == "003004") {
                                for (var i = 0; i < msg.zfcg.length; i++) {
                                    $("#xxtype").append('<button class="type-btn" data-value="' + msg.zfcg[i].categorynum + '">' + msg.zfcg[i].categoryname + '</button>');
                                }
                            } else if (ywtype == "003006") {
                                for (var i = 0; i < msg.gycq.length; i++) {
                                    $("#xxtype").append('<button class="type-btn" data-value="' + msg.gycq[i].categorynum + '">' + msg.gycq[i].categoryname + '</button>');
                                }
                            }
							
							
                getjyinfolist(0, 10);
            }
        });
    } else {
        $("#xxtypefl").hide();
        $("#xxtype").html("");
        $("#xxtype").append('<button class="type-btn active" data-value="">不限</button>');
        getjyinfolist(0, 10);
    }

}(this, jQuery));


function getjyinfolist(pageIndex, pageSize) {
    flag = 1;
 var conditionList = [];
    var unionConditionList = [];
    var conditionCate = {};
    var conditionCode = {};
    var conditionSource = {};
    var conditionTiltle = {};
    var conditionBdmc = {};
	
	var conditioncategoryNum1 = {};
	var conditioncategoryNum2 = {};
	var conditioncategoryNum3 = {};
	var conditioncategoryNum4 = {};
	var conditioncategoryNum5 = {};
	var conditioncategoryNum6 = {};
	
    param.condition = null;
    param.unionCondition = null;
	if(params.xxtype == '招标公告'){
		
			conditioncategoryNum1["fieldName"]='categorynum';
	        conditioncategoryNum1["isLike"]=true;
	        conditioncategoryNum1["likeType"]=2;
	        conditioncategoryNum1["equal"]='003001001';
	        unionConditionList.push(conditioncategoryNum1);
            conditioncategoryNum2["fieldName"]='categorynum';
	        conditioncategoryNum2["isLike"]=true;
	        conditioncategoryNum2["likeType"]=2;
	        conditioncategoryNum2["equal"]='003002001';
	        unionConditionList.push(conditioncategoryNum2);
            conditioncategoryNum3["fieldName"]='categorynum';
	        conditioncategoryNum3["isLike"]=true;
	        conditioncategoryNum3["likeType"]=2;
	        conditioncategoryNum3["equal"]='003003001';
	        unionConditionList.push(conditioncategoryNum3);
			conditioncategoryNum4["fieldName"]='categorynum';
	        conditioncategoryNum4["isLike"]=true;
	        conditioncategoryNum4["likeType"]=2;
	        conditioncategoryNum4["equal"]='003004002';
	        unionConditionList.push(conditioncategoryNum4);
			conditioncategoryNum5["fieldName"]='categorynum';
	        conditioncategoryNum5["isLike"]=true;
	        conditioncategoryNum5["likeType"]=2;
	        conditioncategoryNum5["equal"]='003004001';
	        unionConditionList.push(conditioncategoryNum5);
			conditioncategoryNum6["fieldName"]='categorynum';
	        conditioncategoryNum6["isLike"]=true;
	        conditioncategoryNum6["likeType"]=2;
	        conditioncategoryNum6["equal"]='003006001';
	        unionConditionList.push(conditioncategoryNum6);
			
		
		
	}else if(params.xxtype == '中标公告'){
		
			conditioncategoryNum1["fieldName"]='categorynum';
	        conditioncategoryNum1["isLike"]=true;
	        conditioncategoryNum1["likeType"]=2;
	        conditioncategoryNum1["equal"]='003001008';
	        unionConditionList.push(conditioncategoryNum1);
            conditioncategoryNum2["fieldName"]='categorynum';
	        conditioncategoryNum2["isLike"]=true;
	        conditioncategoryNum2["likeType"]=2;
	        conditioncategoryNum2["equal"]='003002004';
	        unionConditionList.push(conditioncategoryNum2);
            conditioncategoryNum3["fieldName"]='categorynum';
	        conditioncategoryNum3["isLike"]=true;
	        conditioncategoryNum3["likeType"]=2;
	        conditioncategoryNum3["equal"]='003003004';
	        unionConditionList.push(conditioncategoryNum3);
			conditioncategoryNum4["fieldName"]='categorynum';
	        conditioncategoryNum4["isLike"]=true;
	        conditioncategoryNum4["likeType"]=2;
	        conditioncategoryNum4["equal"]='003004002';
	        unionConditionList.push(conditioncategoryNum4);
			conditioncategoryNum5["fieldName"]='categorynum';
	        conditioncategoryNum5["isLike"]=true;
	        conditioncategoryNum5["likeType"]=2;
	        conditioncategoryNum5["equal"]='003005004';
	        unionConditionList.push(conditioncategoryNum5);
			conditioncategoryNum6["fieldName"]='categorynum';
	        conditioncategoryNum6["isLike"]=true;
	        conditioncategoryNum6["likeType"]=2;
	        conditioncategoryNum6["equal"]='003006004';
	        unionConditionList.push(conditioncategoryNum6);
			
		
		
	}else if(params.xxtype == '其他公告'){
		
			conditioncategoryNum1["fieldName"]='categorynum';
	        conditioncategoryNum1["isLike"]=true;
	        conditioncategoryNum1["likeType"]=2;
	        conditioncategoryNum1["equal"]='003001003';
	        unionConditionList.push(conditioncategoryNum1);
            conditioncategoryNum2["fieldName"]='categorynum';
	        conditioncategoryNum2["isLike"]=true;
	        conditioncategoryNum2["likeType"]=2;
	        conditioncategoryNum2["equal"]='003001006';
	        unionConditionList.push(conditioncategoryNum2);
            conditioncategoryNum3["fieldName"]='categorynum';
	        conditioncategoryNum3["isLike"]=true;
	        conditioncategoryNum3["likeType"]=2;
	        conditioncategoryNum3["equal"]='003001005';
	        unionConditionList.push(conditioncategoryNum3);
			conditioncategoryNum4["fieldName"]='categorynum';
	        conditioncategoryNum4["isLike"]=true;
	        conditioncategoryNum4["likeType"]=2;
	        conditioncategoryNum4["equal"]='003001007';
	        unionConditionList.push(conditioncategoryNum4);
			conditioncategoryNum5["fieldName"]='categorynum';
	        conditioncategoryNum5["isLike"]=true;
	        conditioncategoryNum5["likeType"]=2;
	        conditioncategoryNum5["equal"]='003002002';
	        unionConditionList.push(conditioncategoryNum5);
			conditioncategoryNum6["fieldName"]='categorynum';
	        conditioncategoryNum6["isLike"]=true;
	        conditioncategoryNum6["likeType"]=2;
	        conditioncategoryNum6["equal"]='003002003';
	        unionConditionList.push(conditioncategoryNum6);
			conditioncategoryNum7["fieldName"]='categorynum';
	        conditioncategoryNum7["isLike"]=true;
	        conditioncategoryNum7["likeType"]=2;
	        conditioncategoryNum7["equal"]='003003002';
	        unionConditionList.push(conditioncategoryNum7);
			conditioncategoryNum8["fieldName"]='categorynum';
	        conditioncategoryNum8["isLike"]=true;
	        conditioncategoryNum8["likeType"]=2;
	        conditioncategoryNum8["equal"]='003003003';
	        unionConditionList.push(conditioncategoryNum8);
			
		
		
	}
	
	
	
	else if (params.tradeType && params.xxtype == '') {
        categorynumall = params.tradeType;
		
		 if (categorynumall) {
        conditionCate["fieldName"] = 'categorynum';
        conditionCate["isLike"] = true;
        conditionCate["likeType"] = 2;
        conditionCate["equal"] = categorynumall;
        conditionList.push(conditionCate);
       }
	
		
    } else if (params.tradeType && params.xxtype) {
        categorynumall = params.xxtype;
		 if (categorynumall) {
        conditionCate["fieldName"] = 'categorynum';
        conditionCate["isLike"] = true;
        conditionCate["likeType"] = 2;
        conditionCate["equal"] = categorynumall;
        conditionList.push(conditionCate);
         }
	
    }

    if (categorynumall.substring(0, 6) == "003010") {
        param.cnum = "004";
    } else {
        param.cnum = "001";
    }

   

    if (params.tradeSource) {
        conditionSource["fieldName"] = 'fieldvalue';
        conditionSource["isLike"] = true;
        conditionSource["likeType"] = 2;
        conditionSource["equal"] = params.tradeSource;
        conditionList.push(conditionSource);
    }

    var conditionSource1 = {};
	var conditionSource2 = {};
	var conditionSource3 = {};
	var conditionSource4 = {};
	var conditionSource5 = {};
	var conditionSource6 = {};
	var conditionSource7 = {};
	var conditionSource8 = {};
	var conditionSource9 = {};
	var conditionSource10 = {};
	var conditionSource11 = {};
	var conditionSource12 = {};
	var conditionSource13 = {};
	var conditionSource14 = {};
	if (params.tradeSource=='' && params.dataSource=='省平台') {
		
        conditionSource1["fieldName"] = 'fieldvalue';
        conditionSource1["isLike"] = true;
        conditionSource1["likeType"] = 2;
        conditionSource1["equal"] = '省级';
        unionConditionList.push(conditionSource1);

		conditionSource2["fieldName"] = 'fieldvalue';
        conditionSource2["isLike"] = true;
        conditionSource2["likeType"] = 2;
        conditionSource2["equal"] = '南京市';
        unionConditionList.push(conditionSource2);
		
		conditionSource3["fieldName"] = 'fieldvalue';
        conditionSource3["isLike"] = true;
        conditionSource3["likeType"] = 2;
        conditionSource3["equal"] = '无锡市';
        unionConditionList.push(conditionSource3);
		
		conditionSource4["fieldName"] = 'fieldvalue';
        conditionSource4["isLike"] = true;
        conditionSource4["likeType"] = 2;
        conditionSource4["equal"] = '徐州市';
        unionConditionList.push(conditionSource4);
		
		conditionSource5["fieldName"] = 'fieldvalue';
        conditionSource5["isLike"] = true;
        conditionSource5["likeType"] = 2;
        conditionSource5["equal"] = '常州市';
        unionConditionList.push(conditionSource5);
		
		conditionSource6["fieldName"] = 'fieldvalue';
        conditionSource6["isLike"] = true;
        conditionSource6["likeType"] = 2;
        conditionSource6["equal"] = '苏州市';
        unionConditionList.push(conditionSource6);
		
		conditionSource7["fieldName"] = 'fieldvalue';
        conditionSource7["isLike"] = true;
        conditionSource7["likeType"] = 2;
        conditionSource7["equal"] = '南通市';
        unionConditionList.push(conditionSource7);
		
		conditionSource8["fieldName"] = 'fieldvalue';
        conditionSource8["isLike"] = true;
        conditionSource8["likeType"] = 2;
        conditionSource8["equal"] = '连云港市';
        unionConditionList.push(conditionSource8);
		
		conditionSource9["fieldName"] = 'fieldvalue';
        conditionSource9["isLike"] = true;
        conditionSource9["likeType"] = 2;
        conditionSource9["equal"] = '淮安市';
        unionConditionList.push(conditionSource9);
		
		conditionSource10["fieldName"] = 'fieldvalue';
        conditionSource10["isLike"] = true;
        conditionSource10["likeType"] = 2;
        conditionSource10["equal"] = '盐城市';
        unionConditionList.push(conditionSource10);
		
		conditionSource11["fieldName"] = 'fieldvalue';
        conditionSource11["isLike"] = true;
        conditionSource11["likeType"] = 2;
        conditionSource11["equal"] = '扬州市';
        unionConditionList.push(conditionSource11);
		
		conditionSource12["fieldName"] = 'fieldvalue';
        conditionSource12["isLike"] = true;
        conditionSource12["likeType"] = 2;
        conditionSource12["equal"] = '镇江市';
        unionConditionList.push(conditionSource12);
		
		conditionSource13["fieldName"] = 'fieldvalue';
        conditionSource13["isLike"] = true;
        conditionSource13["likeType"] = 2;
        conditionSource13["equal"] = '泰州市';
        unionConditionList.push(conditionSource13);
		
		conditionSource14["fieldName"] = 'fieldvalue';
        conditionSource14["isLike"] = true;
        conditionSource14["likeType"] = 2;
        conditionSource14["equal"] = '宿迁市';
        unionConditionList.push(conditionSource14);
    }

	if (params.tradeSource=='' && params.dataSource=='其他平台') {
		
        conditionSource1["fieldName"] = 'zhuanzai';
        conditionSource1["isLike"] = true;
        conditionSource1["likeType"] = 2;
        conditionSource1["equal"] = '其他平台';
        conditionList.push(conditionSource1);
		
    }


   

   

    if (['003001011', '003001012', '003001013', '003002007', '003002008', '003002009', '003003006', '003003007', '003003008'].indexOf(categorynumall) !== -1) {
        if (params.keyword) {
            conditionTiltle["fieldName"] = 'titlenew';
            conditionTiltle["isLike"] = true;
            conditionTiltle["likeType"] = 0;
            conditionTiltle["equal"] = params.keyword;
            unionConditionList.push(conditionTiltle);

            conditionBdmc["fieldName"] = 'bdmc';
            conditionBdmc["isLike"] = true;
            conditionBdmc["likeType"] = 0;
            conditionBdmc["equal"] = params.keyword;
            unionConditionList.push(conditionBdmc);
        }
    } else {
        if (params.keyword) {
            conditionTiltle["fieldName"] = 'titlenew';
            conditionTiltle["isLike"] = true;
            conditionTiltle["likeType"] = 0;
            conditionTiltle["equal"] = params.keyword;
            conditionList.push(conditionTiltle);
        }
    }

    var timeList = [];
    var conditionDate = {};
    conditionDate["fieldName"] = 'infodatepx';
    conditionDate["startTime"] = params.startDate;
    conditionDate["endTime"] = params.endDate;
    timeList.push(conditionDate);

    param.condition = conditionList;
    param.unionCondition = unionConditionList;
    param.time = timeList;

    param.pn = pageIndex * pageSize;
    param.rn = pageSize;

    if (flag == 1) {
        $.ajax({
            url: "/inteligentsearch/rest/esinteligentsearch/getFullTextDataNew",
            type: "post",
            data: JSON.stringify(param),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var data = msg.result;
                for (var i = 0; i < msg.result.records.length; i++) {
                    msg.result.records[i].index = pageIndex * pageSize + i + 1;
                    msg.result.records[i].title = msg.result.records[i].title.replace(/<\/?em[^>]*>/gi, "");
                    if (!msg.result.records[i].author) msg.result.records[i].author = "其他";
                    if (!msg.result.records[i].zhuanzai) msg.result.records[i].zhuanzai = "江苏省";
                    msg.result.records[i].infodatepx = msg.result.records[i].infodatepx.split(' ')[0];
                }
                renderList(msg.result.records, pageIndex, pageSize);
                renderPager(pageIndex, pageSize, data.totalcount);
            }
        });
    }
}


function renderList(data, pageindex, pagesize) {
    var M = Mustache;
    if (['003001011', '003001012', '003001013', '003002007', '003002008', '003002009', '003003006', '003003007', '003003008'].indexOf(categorynumall) !== -1) {
        $('#bdmc').removeClass('hidden');
        $("#showList").html(M.render($("#showList-tmpl").html(), { items: data }));
    } else {
        $('#bdmc').addClass('hidden');
        $("#showList").html(M.render($("#showList-tmpl").html(), { items: data }));
    }
}


function renderPager(pageindex, pagesize, total) {
    if ($('#pager').pagination()) {
        $('#pager').pagination('destroy');
    }
    $("#pager").pagination({
        pageIndex: pageindex,
        pageSize: pagesize,
        total: total,
        showJump: true,
        firstBtnText: '首页',
        lastBtnText: '尾页',
        jumpBtnText: 'Go',
        prevBtnText: '<',
        nextBtnText: '>',
        pageBtnCount: 10,
        showFirstLastBtn: true,
        showInfo: true,
        showPageSizes: false,
        infoFormat: '共<span>' + total + '</span>条'
    });

    $("#pager").on("pageClicked jumpClicked pageSizeChanged", function (event, data) {
        getjyinfolist(data.pageIndex, data.pageSize);
    });
}


function tzjydetail(categorynum, linurl) {
    window.open(linurl);
}


function getdate(day) {
    var myDate = new Date();
    if (day == 30) {
        myDate.setMonth(myDate.getMonth() - 1);
    } else if (day == 180) {
        myDate.setMonth(myDate.getMonth() - 3);
    } else {
        myDate.setDate(myDate.getDate() - day);
    }
    var month = myDate.getMonth() + 1;
    if (month.toString().length == 1) month = "0" + month;
    var date = myDate.getDate();
    if (date.toString().length == 1) date = "0" + date;
    return myDate.getFullYear() + "-" + month + "-" + date;
}