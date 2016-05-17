$(document).ready(function() {
    $('.ui.dropdown').dropdown();
    $('.message .close').on('click', function () {
        $(this)
            .closest('.message')
            .transition('fade')
        ;
    });

    <!--地理位置反向编码-->
    var $table = $("table.ui.small.celled.blue.table");
    var tableRows = $("table tr").length - 1;
    for(var num = 1; num <= tableRows; num++) {
        //获取经纬度的值
        var mobileLocation = $table.children().children().eq(num).children().eq(5).text();
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
            $table.children().children().eq(num).children().eq(5).text(geocoderResult);
        });
        //若服务请求失败，则运行以下函数
        geocoder.setError(function() {
            geocoderResult = "出错了，请输入正确的经纬度！！！";
            $table.children().children().eq(num).children().eq(5).text(geocoderResult);
        });
    }

});
function getRankType() {
    var $input = $("#rankType");
    var rankType = $input.val();
    location.href = "/rankManage/rankTypeAdd?rankType=" + rankType;
}