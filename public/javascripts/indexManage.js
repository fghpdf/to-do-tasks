$(document).ready(function() {
    // 基于准备好的dom，初始化echarts图表
    var myChart = echarts.init(document.getElementById('main'));

    var option = {
        title: {
            text: '空净产品销量',
            subtext: '纯属虚构',
            x: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['净水器', '空气净化器', '去污器']
        },
        dataRange: {
            min: 0,
            max: 2500,
            x: 'left',
            y: 'bottom',
            text: ['高', '低'],           // 文本，默认为数值文本
            calculable: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center',
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: [
            {
                name: '净水器',
                type: 'map',
                mapType: 'china',
                roam: false,
                itemStyle: {
                    normal: {label: {show: true}},
                    emphasis: {label: {show: true}}
                },
                data: [
                    {name: '北京', value: Math.round(Math.random() * 1000)},
                    {name: '天津', value: Math.round(Math.random() * 1000)},
                    {name: '上海', value: Math.round(Math.random() * 1000)},
                    {name: '重庆', value: Math.round(Math.random() * 1000)},
                    {name: '河北', value: Math.round(Math.random() * 1000)},
                    {name: '河南', value: Math.round(Math.random() * 1000)},
                    {name: '云南', value: Math.round(Math.random() * 1000)},
                    {name: '辽宁', value: Math.round(Math.random() * 1000)},
                    {name: '黑龙江', value: Math.round(Math.random() * 1000)},
                    {name: '湖南', value: Math.round(Math.random() * 1000)},
                    {name: '安徽', value: Math.round(Math.random() * 1000)},
                    {name: '山东', value: Math.round(Math.random() * 1000)},
                    {name: '新疆', value: Math.round(Math.random() * 1000)},
                    {name: '江苏', value: Math.round(Math.random() * 1000)},
                    {name: '浙江', value: Math.round(Math.random() * 1000)},
                    {name: '江西', value: Math.round(Math.random() * 1000)},
                    {name: '湖北', value: Math.round(Math.random() * 1000)},
                    {name: '广西', value: Math.round(Math.random() * 1000)},
                    {name: '甘肃', value: Math.round(Math.random() * 1000)},
                    {name: '山西', value: Math.round(Math.random() * 1000)},
                    {name: '内蒙古', value: Math.round(Math.random() * 1000)},
                    {name: '陕西', value: Math.round(Math.random() * 1000)},
                    {name: '吉林', value: Math.round(Math.random() * 1000)},
                    {name: '福建', value: Math.round(Math.random() * 1000)},
                    {name: '贵州', value: Math.round(Math.random() * 1000)},
                    {name: '广东', value: Math.round(Math.random() * 1000)},
                    {name: '青海', value: Math.round(Math.random() * 1000)},
                    {name: '西藏', value: Math.round(Math.random() * 1000)},
                    {name: '四川', value: Math.round(Math.random() * 1000)},
                    {name: '宁夏', value: Math.round(Math.random() * 1000)},
                    {name: '海南', value: Math.round(Math.random() * 1000)},
                    {name: '台湾', value: Math.round(Math.random() * 1000)},
                    {name: '香港', value: Math.round(Math.random() * 1000)},
                    {name: '澳门', value: Math.round(Math.random() * 1000)}
                ]
            },
            {
                name: '空气净化器',
                type: 'map',
                mapType: 'china',
                itemStyle: {
                    normal: {label: {show: true}},
                    emphasis: {label: {show: true}}
                },
                data: [
                    {name: '北京', value: Math.round(Math.random() * 1000)},
                    {name: '天津', value: Math.round(Math.random() * 1000)},
                    {name: '上海', value: Math.round(Math.random() * 1000)},
                    {name: '重庆', value: Math.round(Math.random() * 1000)},
                    {name: '河北', value: Math.round(Math.random() * 1000)},
                    {name: '安徽', value: Math.round(Math.random() * 1000)},
                    {name: '新疆', value: Math.round(Math.random() * 1000)},
                    {name: '浙江', value: Math.round(Math.random() * 1000)},
                    {name: '江西', value: Math.round(Math.random() * 1000)},
                    {name: '山西', value: Math.round(Math.random() * 1000)},
                    {name: '内蒙古', value: Math.round(Math.random() * 1000)},
                    {name: '吉林', value: Math.round(Math.random() * 1000)},
                    {name: '福建', value: Math.round(Math.random() * 1000)},
                    {name: '广东', value: Math.round(Math.random() * 1000)},
                    {name: '西藏', value: Math.round(Math.random() * 1000)},
                    {name: '四川', value: Math.round(Math.random() * 1000)},
                    {name: '宁夏', value: Math.round(Math.random() * 1000)},
                    {name: '香港', value: Math.round(Math.random() * 1000)},
                    {name: '澳门', value: Math.round(Math.random() * 1000)}
                ]
            },
            {
                name: '去污器',
                type: 'map',
                mapType: 'china',
                itemStyle: {
                    normal: {label: {show: true}},
                    emphasis: {label: {show: true}}
                },
                data: [
                    {name: '北京', value: Math.round(Math.random() * 1000)},
                    {name: '天津', value: Math.round(Math.random() * 1000)},
                    {name: '上海', value: Math.round(Math.random() * 1000)},
                    {name: '广东', value: Math.round(Math.random() * 1000)},
                    {name: '台湾', value: Math.round(Math.random() * 1000)},
                    {name: '香港', value: Math.round(Math.random() * 1000)},
                    {name: '澳门', value: Math.round(Math.random() * 1000)}
                ]
            }
        ]
    };

    // 为echarts对象加载数据
    myChart.setOption(option);

    // 当 window 尺寸改变的时候，图表尺寸也改变
    $(window).resize(function() {
        myChart.resize();
    });


    //地理方向编码
    var $table = $("#rankTable");
    var tableRows = $("#rankTable tr").length - 1;
    for(var num = 2; num <= tableRows; num++) {
        //获取经纬度的值
        var mobileLocation = $table.children().children().eq(num).children().eq(4).text();
        codeLatLng(mobileLocation, num);
    }
    function codeLatLng(input, num) {
        var geocoderResult;
        //地址和经纬度之间进行转换服务
        geocoder = new qq.maps.Geocoder();
        //获取输入框的经纬度
        //var input = document.getElementById("latLng").value;
        var latlngStr = input.split(",", 2);
        var lat = parseFloat(latlngStr[0]);
        var lng = parseFloat(latlngStr[1]);
        var latLng = new qq.maps.LatLng(lat, lng);
        //对指定经纬度进行解析
        geocoder.getAddress(latLng);
        //设置服务请求成功的回调函数
        geocoder.setComplete(function(result) {
            var province = result.detail.addressComponents.province;
            var city = result.detail.addressComponents.city;
            var district = result.detail.addressComponents.district;
            //去除直辖市重复的名字
            if(province === city) {
                geocoderResult = city + district;
            } else {
                geocoderResult = province + city + district;
            }
            //改变经纬度的值
            $table.children().children().eq(num).children().eq(4).text(geocoderResult);
        });
        //若服务请求失败，则运行以下函数
        geocoder.setError(function() {
            geocoderResult = "出错了，请输入正确的经纬度！！！";
            $table.children().children().eq(num).children().eq(4).text(geocoderResult);
        });
    }

    $('.ui.dropdown').dropdown();
    $('.message .close').on('click', function () {
        $(this)
            .closest('.message')
            .transition('fade')
        ;
    });
});