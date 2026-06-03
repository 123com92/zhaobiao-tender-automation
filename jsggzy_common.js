
// 写入江苏政务头、尾部
document.writeln('<script src="//www.jszwfw.gov.cn/script/14/2412171610178864.js"></script>');
document.writeln('<script src="//www.jszwfw.gov.cn/script/12/2009091010398361.js"></script>');



  
  
(function($) {
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
    if (!window.Util) {
        window.Util = {};
    }
    $.extend(Util, {
        /**
         * 获取数组中的最大值
         * @arr Array 数据源
         * @key String 获取数据的key
         */
        getMax: function(arr, key) {
            var max = 0
              , len = arr.length;
            for (var i = 0; i < len; i++) {
                var item = arr[i][key];
                if (max < item) {max = item;}
            }
            return max;
        }
    });
    var Include = function(cfg) {
        this.cfg = cfg;

        this._init();
    };

    Include.prototype = {
        constructor: Include,

        _init: function() {
            var c = this.cfg;

            if (c.async !== false) {c.async = true;}

            this.$container = $('#' + c.id);
        },

        fetch: function() {
            var c = this.cfg
              , self = this;

            return $.ajax({
                url: c.src,
                type: 'GET',
                dataType: 'html',
                async: c.async,
                success: function(html) {
                    self.$container.html(html);

                    c.onload && c.onload(html);
                }
            });
        }
    };

    // 需要引入的代码片段 ★头尾是js加载的，头尾的js要写在回调函数里★
    var includes = [{
        id: 'head',
        src: '/_include/header.inc.html',
        onload: function() {
            $('.ewb-city-items a').hover(function() {
                $('.ewb-county-items[data-name=' + $(this).data('name') + ']').show().siblings().hide();
            });
            // 搜索
            $('#ewb-search-all').click(function() {
                $('#ewb-search-hide').show();
            });
            $('#ewb-search-cancel').click(function() {
                $('#ewb-search-hide').hide();
                $('#lanmu option:first').prop('selected', true);
                $('#diqu option:first').prop('selected', true);
                $('#xmlx option:first').prop('selected', true);
                $('#keyword').val('');
                $('#datepickerfrom').val('');
                $('#datepickerto').val('');
            });
            // 全部交易分类展开收起
            var $category = $('.ewb-category')
              , $categoryList = $('.ewb-category-list')
              , pathname = window.location.pathname.split('/');
            //console.log(pathname);
            if (pathname == 'index.html' || pathname == '') {
                $category.off();
                $categoryList.show();
            } else {
                $category.on('click', function(e) {
                    //e.preventDefault();
                    $categoryList.slideToggle();
                });
            }

            $(document).click(function(e) {
                //console.log($(e.target).parents());
                var eTarget = $(e.target).parents().hasClass('ewb-search-ico');
                var eTarget2 = $(e.target).parents().hasClass('ui-corner-all');
                if (!eTarget) {
                    $('#ewb-search-hide').hide();
                }
                if (eTarget2) {
                    $('#ewb-search-hide').show();
                }
            });

            function getTime(initToday) {
                var initToday = initToday;
                var initYear = initToday.getFullYear().toString();
                var initMonth = (initToday.getMonth() + 1).toString();
                var initDate = initToday.getDate().toString();
                var initFormat = initYear + '-' + initMonth + '-' + initDate;
                return initFormat;
            }

            // 开始结束日期的id
            var $startId = $('#datepickerfrom');
            var $endId = $('#datepickerto');
			var myDate=new Date();
		myDate.setMonth(myDate.getMonth()-3);
		var month = myDate.getMonth()+1;
		if(month.toString().length == 1){
			month = "0" + month;
		}
		var date = myDate.getDate();
		if(date.toString().length == 1){
			date = "0"+date;
		}
		var startDate =  myDate.getFullYear() + "-" + month + "-" + date;
    startDate=startDate.replace(new RegExp("-","gm"),"/");
            //日期选择
            $('.inp-date').datetimepicker({
                minView: 'month',
                format: 'yyyy-mm-dd',
                language: 'zh-CN',
                autoclose: true,
                escape: false,
				 startDate: new Date(new Date(startDate).getTime()),
		endDate: new Date()
            });

            //结束日期不能小于开始日期

            $startId.on('changeDate', function(ev) {
                var time = getTime(ev.date);
                $(ev.target).html(time);

                $endId.datetimepicker('setStartDate', time);
                $startId.datetimepicker('hide');
                if ($endId.val() == '') {
                    $endId.datetimepicker('show');
                }
            });

            $endId.on('changeDate', function(ev) {
                var time = getTime(ev.date);
                $(ev.target).html(time);

                $startId.datetimepicker('setEndDate', time);
                $endId.datetimepicker('hide');
            });

            $('#lanmu').change(function(event) {
                var lanmu = document.getElementById('lanmu').value;
                if (lanmu != '003' && lanmu != '') {
                    if (lanmu) {
                        document.getElementById('diqu').disabled = true;
                        document.getElementById('xmlx').disabled = true;
                    }
                    $('#xmlx option:first').prop('selected', true);
                    $('#diqu option:first').prop('selected', true);
                } else {
                    document.getElementById('diqu').disabled = false;
                    document.getElementById('xmlx').disabled = false;
                }
            });

            var aaa = window.location.href.split('/')[3];
            $('.nav-item').removeClass('active');
            if (aaa == 'jyxx') {
                $('#jyxx').addClass('active');
            } else if (aaa == 'ztxx') {
                $('#ztxx').addClass('active');
            } else if (aaa == 'pbzj') {
                $('#zjxx').addClass('active');
            } else if (aaa == 'xyxx' || aaa == '036') {
                $('#xyxx').addClass('active');
            } else if (aaa == 'yphccg') {
                $('#yphccg').addClass('active');
            } else if (aaa == 'gywm') {
                $('#gywm').addClass('active');
            } else if (aaa == 'datacenter') {
                $('#sjzx').addClass('active');
            } else if (aaa == 'xwdt') {
                $('#xwdt').addClass('active');
            } 
			else if (aaa == 'zcfg') {
                $('#zcfg').addClass('active');
            } 
			else if (aaa == '') {
                $('#index').addClass('active');
            } 
			

            dynamicLoadJs('/js/jquery.placeholder.min.js', function() {
                var inputTips = new inputPlaceholder({
                    dom: '.input-tipsnew'
                });
            });
            // 回到顶部
            $('#back-to-top').click(function() {
                $('body,html').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });

            $('#ewb-input-btn').click(function() {
                var title = $('#key').val();
                if (title) {
         var starttime = getdate(180)+" 00:00:00";
		 var endtime = getdate(0)+" 23:59:59";

		

        var  tj = '?wd=' + title + '&sdt=' + starttime + '&edt=' + endtime;
        window.open('/search/fullsearch.html' + tj);
                } else {
                    alert('关键词不能为空！');
                }
            });
        }
    }, 
		{
        id: 'foot',
        src: '/_include/footer.inc.html',
        onload: function() {
            //底部下拉框
            
    
            
        }
    }, 
	{
        id: 'head2',
        src: '/pagehead2.html',
        onload: function() {
            var mySwiper = new Swiper('#nav-swiper',{
                loop: false,
                slidesPerView: 'auto',
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            });
            mySwiper.slideTo(9);
        }
    }];

    $.each(includes, function(i, cfg) {
        if ($('#' + cfg.id).length) {
            new Include(cfg).fetch();
        }
    });

    $('.ewb-city-items a').hover(function() {
        $('.ewb-county-items[data-name=' + $(this).data('name') + ']').show().siblings().hide();
    });
    // 搜索
    $('#ewb-search-all').click(function() {
        $('#ewb-search-hide').show();
    });
    $('#ewb-search-cancel').click(function() {
        $('#ewb-search-hide').hide();
        $('#lanmu option:first').prop('selected', true);
        $('#diqu option:first').prop('selected', true);
        $('#xmlx option:first').prop('selected', true);
        $('#keyword').val('');
        $('#datepickerfrom').val('');
        $('#datepickerto').val('');
    });
    // 全部交易分类展开收起
    var $category = $('.ewb-category')
      , $categoryList = $('.ewb-category-list')
      , pathname = window.location.pathname.split('/')[1];
    //console.log(pathname);
    if (pathname == 'index.html' || pathname == '') {
        $category.off();
        $categoryList.show();
    } else {
        $category.on('click', function(e) {
            e.preventDefault();
            $categoryList.slideToggle();
        });
    }

    $(document).click(function(e) {
        //console.log($(e.target).parents());
        var eTarget = $(e.target).parents().hasClass('ewb-search-ico');
        var eTarget2 = $(e.target).parents().hasClass('ui-corner-all');
        if (!eTarget) {
            $('#ewb-search-hide').hide();
        }
        if (eTarget2) {
            $('#ewb-search-hide').show();
        }
    });

    function getTime(initToday) {
        var initToday = initToday;
        var initYear = initToday.getFullYear().toString();
        var initMonth = (initToday.getMonth() + 1).toString();
        var initDate = initToday.getDate().toString();
        var initFormat = initYear + '-' + initMonth + '-' + initDate;
        return initFormat;
    }

    // 开始结束日期的id
    var $startId = $('#datepickerfrom');
    var $endId = $('#datepickerto');

    var myDate=new Date();
		myDate.setMonth(myDate.getMonth()-3);
		var month = myDate.getMonth()+1;
		if(month.toString().length == 1){
			month = "0" + month;
		}
		var date = myDate.getDate();
		if(date.toString().length == 1){
			date = "0"+date;
		}
		var startDate =  myDate.getFullYear() + "-" + month + "-" + date;
    startDate=startDate.replace(new RegExp("-","gm"),"/");
			console.log(startDate)
            //日期选择
            $('.inp-date').datetimepicker({
                minView: 'month',
                format: 'yyyy-mm-dd',
                language: 'zh-CN',
                autoclose: true,
                escape: false,
				 startDate: new Date(new Date(startDate).getTime()),
		endDate: new Date()
            });

    //结束日期不能小于开始日期

    $startId.on('changeDate', function(ev) {
        var time = getTime(ev.date);
        $(ev.target).html(time);

        $endId.datetimepicker('setStartDate', time);
        $startId.datetimepicker('hide');
        if ($endId.val() == '') {
            $endId.datetimepicker('show');
        }
    });

    $endId.on('changeDate', function(ev) {
        var time = getTime(ev.date);
        $(ev.target).html(time);

        $startId.datetimepicker('setEndDate', time);
        $endId.datetimepicker('hide');
    });

    $('#lanmu').change(function(event) {
        var lanmu = document.getElementById('lanmu').value;
        if (lanmu != '003' && lanmu != '') {
            if (lanmu) {
                document.getElementById('diqu').disabled = true;
                document.getElementById('xmlx').disabled = true;
            }
            $('#xmlx option:first').prop('selected', true);
            $('#diqu option:first').prop('selected', true);
        } else {
            document.getElementById('diqu').disabled = false;
            document.getElementById('xmlx').disabled = false;
        }
    });

    /* var aaa = window.location.href.split("/")[3];
	$(".ewb-nav-name").removeClass("current");
	if (aaa == "jyxx") {
		$("#jyxx").addClass("current");
	} else if (aaa == "ztxx") {
		$("#ztxx").addClass("current");
	} else if (aaa == "pbzj") {
		$("#pbzj").addClass("current");
	} else if (aaa == "xyxx") {
		$("#xyxx").addClass("current");
	} else if (aaa == "zcfg") {
		$("#zfcg").addClass("current");
	} else if (aaa == "gywm") {
		$("#gywm").addClass("current");
	} else if (aaa == "") {
		$("#pagehome").addClass("current");
	} */

    dynamicLoadJs('/js/jquery.placeholder.min.js', function() {
        var inputTips = new inputPlaceholder({
            dom: '.input-tipsnew'
        });
    });
    // 回到顶部
    $('#back-to-top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
}
)(jQuery);

function change2() {
    $('#ewb-search-ok').attr('style', 'font-size:20px;margin-left:138px;margin-top:10px;');
}
function change3() {
    $('#ewb-search-ok').attr('style', 'font-size:16px;margin-left:138px;margin-top:10px');
}
function change4() {
    $('#ewb-search-cancel').attr('style', 'font-size:20px;margin-top:10px;');
}
function change5() {
    $('#ewb-search-cancel').attr('style', 'font-size:16px;margin-top:10px;');
}
function searchall() {
    var lanmu = document.getElementById('lanmu').value;
    var diqu = encodeURIComponent(document.getElementById('diqu').value);
    var xmlx = document.getElementById('xmlx').value;
    var keyword = document.getElementById('keyword').value;
    var starttime = document.getElementById('datepickerfrom').value;
    var endtime = document.getElementById('datepickerto').value;

    var starttime2 = starttime.replace(new RegExp('-','gm'), '/');
    var endtime2 = endtime.replace(new RegExp('-','gm'), '/');

    //starttime = starttime.replace(new RegExp("-","gm"),"");
    //endtime = endtime.replace(new RegExp("-","gm"),"");

   if (keyword=='') {
        alert('关键词不能为空！');
    }else{

   if (starttime) {
        starttime += ' 00:00:00';
    }
    if (endtime) {
        endtime += ' 23:59:59';
    }
       //近3个月数据
    if (starttime=='' && endtime=='') {
       
         starttime = getdate(180)+" 00:00:00";
		 endtime = getdate(0)+" 23:59:59";

		
    }


	   

    var starttimeHaoMiao = new Date(starttime2).getTime();
    var endtimeHaoMiao = new Date(endtime2).getTime();
    var nowtimeHaoMiao = new Date().getTime();
    if (starttimeHaoMiao > nowtimeHaoMiao || endtimeHaoMiao > nowtimeHaoMiao) {
        alert('开始或结束时间不能大于当前时间！');
    } else if (starttimeHaoMiao > endtimeHaoMiao) {
        alert('开始时间不能大于结束时间！');
    } else {
        if (xmlx) {
            lanmu = xmlx;
        }
        tiaojian = '?wd=' + keyword + '&lanmu=' + lanmu + '&diqu=' + diqu + '&sdt=' + starttime + '&edt=' + endtime;
        window.open('/search/fullsearch.html' + tiaojian);
    }
    

    

	   
	}


	
 
}






function getdate(day){
	if(day==30){
		var myDate=new Date();
		myDate.setMonth(myDate.getMonth()-1);
		var month = myDate.getMonth()+1;
		if(month.toString().length == 1){
			month = "0" + month;
		}
		var date = myDate.getDate();
		if(date.toString().length == 1){
			date = "0"+date;
		}
		return myDate.getFullYear() + "-" + month + "-" + date;
	}else if(day==180){
		var myDate=new Date();
		myDate.setMonth(myDate.getMonth()-3);
		var month = myDate.getMonth()+1;
		if(month.toString().length == 1){
			month = "0" + month;
		}
		var date = myDate.getDate();
		if(date.toString().length == 1){
			date = "0"+date;
		}
		return myDate.getFullYear() + "-" + month + "-" + date;
	}else{
		var myDate=new Date();
		myDate.setDate(myDate.getDate()-day);
		var month = myDate.getMonth()+1;
		if(month.toString().length == 1){
			month = "0" + month;
		}
		var date = myDate.getDate();
		if(date.toString().length == 1){
			date = "0" + date;
		}
		return myDate.getFullYear() + "-" + month + "-" + date;
	}
}





$('#ewb-input-btn').click(function() {
    var title = $('#key').val();
    if (title) {
        window.open('/search/fullsearch.html?wd=' + title);
    } else {
        alert('关键词不能为空！');
    }
});

function dynamicLoadJs(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if (typeof callback === 'function') {
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                callback();
                script.onload = script.onreadystatechange = null;
            }
        }
        ;
    }
    head.appendChild(script);
}




// 调整头尾显示的位置
setTimeout(function() {
    $('.top-new').css({
        'position': 'absolute',
        'top': '0'
    });
    $('.ewb-header').css({
        'padding-top': '140px',
        'height': '260px'
    });

    // 修复第三方头部组件样式冲突
    var $firstChild = $('body > :first-child');
    $firstChild.find('*').css({
        'box-sizing': 'content-box'
    });
    $firstChild.find('a').css({
        'color': '#333',
        'text-decoration': 'none'
    });

}, 1000);