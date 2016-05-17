$(document).ready(function () {

    var appId = getUrlParam('appId');
    $("button#addImages").click(function() {
        var appId = $(this).parent().parent().children().eq(0).text();
        $.ajax({
            data: {
                appId: appId
            },
            url:'/appManage/getAppId',
            type: 'POST',
            success: function(data) {
                if(data.success) {
                    location.href = '/appManage/imagesAdd?appId=' + data.appId;
                } else {
                    alert("appId错误");
                }
            },
            error: function() {
                alert("出现错误");
            }
        });
    });

    //通过js改变form的action的值，预设的值在span里预存
    //启动页
    var startAdd = $("#startAddUpload").uploadFile({
        url: "/appManage/startAdd/" + appId,
        fileName: "startImages",
        autoSubmit:false,
        multiple:true,
        showPreview:true,
        previewHeight: "100px",
        previewWidth: "100px",
        sequential:true,
        sequentialCount:1,
        uploadStr: "上传图片",
        dragDropStr: "<span><b>仅可以选择一张图片</b></span>",
        abortStr: "取消",
        cancelStr: "取消",
        uploadButtonClass: "ui blue button",
        cancelButtonClass: "ui yellow button"
    });
    $("#startAddButton").click(function () {
        startAdd.startUpload();
    });

    $("button#addStart").click(function() {
        var appId = $(this).parent().parent().children().eq(0).text();
        $.ajax({
            data: {
                appId: appId
            },
            url:'/appManage/getAppId',
            type: 'POST',
            success: function(data) {
                if(data.success) {
                    location.href = '/appManage/startAdd?appId=' + data.appId;
                } else {
                    alert("appId错误");
                }
            },
            error: function() {
                alert("出现错误");
            }
        });
    });

    //引导页
    var guideAdd = $("#guideAddUpload").uploadFile({
        url: "/appManage/guideAdd/" + appId,
        fileName: "guideImages",
        autoSubmit: false,
        multiple: true,
        showPreview: true,
        previewHeight: "100px",
        previewWidth: "100px",
        sequential: true,
        sequentialCount: 1,
        uploadStr: "上传图片",
        dragDropStr: "<span><b>拖动文件到此处</b></span>",
        abortStr: "取消",
        cancelStr: "取消",
        uploadButtonClass: "ui blue button",
        cancelButtonClass: "ui yellow button"
    });
    $("#guideAddButton").click(function () {
        guideAdd.startUpload();
    });

    $("button#addGuide").click(function() {
        var appId = $(this).parent().parent().children().eq(0).text();
        $.ajax({
            data: {
                appId: appId
            },
            url:'/appManage/getAppId',
            type: 'POST',
            success: function(data) {
                if(data.success) {
                    location.href = '/appManage/guideAdd?appId=' + data.appId;
                } else {
                    alert("appId错误");
                }
            },
            error: function() {
                alert("出现错误");
            }
        });
    });

    //轮播页
    var carouselAdd = $("#carouselAddUpload").uploadFile({
        url: "/appManage/carouselAdd/" + appId,
        fileName: "carouselImages",
        autoSubmit: false,
        multiple: true,
        showPreview: true,
        previewHeight: "100px",
        previewWidth: "100px",
        uploadStr: "上传图片",
        dragDropStr: "<span><b>拖动文件到此处</b></span>",
        abortStr: "取消",
        cancelStr: "取消",
        uploadButtonClass: "ui blue button",
        cancelButtonClass: "ui yellow button"
    });
    $("#carouselAddButton").click(function () {
        carouselAdd.startUpload();
    });

    $("button#addCarousel").click(function() {
        var appId = $(this).parent().parent().children().eq(0).text();
        $.ajax({
            data: {
                appId: appId
            },
            url:'/appManage/getAppId',
            type: 'POST',
            success: function(data) {
                if(data.success) {
                    location.href = '/appManage/carouselAdd?appId=' + data.appId;
                } else {
                    alert("appId错误");
                }
            },
            error: function() {
                alert("出现错误");
            }
        });
    });

    //查看详情
    $("button#queryDetail").click(function() {
        var appId = $(this).parent().parent().children().eq(0).text();
        $.ajax({
            data: {
                appId: appId
            },
            url:'/appManage/getAppId',
            type:'POST',
            success: function(data) {
                if (data.success) {
                    location.href = '/appManage/queryDetail?appId=' + data.appId;
                } else {
                    alert("appId获取失败");
                }
            },
            error: function() {
                alert("出现错误");
            }
        });
    });

    $('.ui.dropdown').dropdown();
    $('.message .close').on('click', function () {
        $(this)
            .closest('.message')
            .transition('fade')
        ;
    });

    //获得url里参数的值，name就是参数
    function getUrlParam(name) {

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);

        if (r != null) {

            return unescape(r[2]);

        }

        return null;
    }

    //文件上传预览
    $("#startImages").change(function() {
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $("#preview");

        if(fileObj && fileObj.files && fileObj.files[0]){
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img.attr('src',dataURL);
        }else{
            dataURL = $file.val();

            // $img.css("filter",'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale,src="' + dataURL + '")');

            // var imgObj = document.getElementById("preview");
            // imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=/"" + dataURL + "/")";
            // imgObj.style.width = "48px";
            // imgObj.style.height = "48px";

            var imgObj = document.getElementById("preview");
            // 两个坑:
            // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
            // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;

        }
    });

    //文件上传预览
    $("#guideImages").change(function() {
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $imgList = $("#preview");

        if(fileObj && fileObj.files && fileObj.files[0]){
            $imgList.empty();
            for(var num = 0; num < fileObj.files.length; num++){
                dataURL =  windowURL.createObjectURL(fileObj.files[num]);
                $imgList.append("" +
                    "<div class='ui basic segment'>" +
                    "<div class='ui top attached label' >引导页" + (num + 1)+ "</div>" +
                    "<img class='ui rounded bordered image' name='preview' " +
                    "src='" + dataURL  + "'></div>");
            }
        }else{
            dataURL = $file.val();

            // $img.css("filter",'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale,src="' + dataURL + '")');

            // var imgObj = document.getElementById("preview");
            // imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=/"" + dataURL + "/")";
            // imgObj.style.width = "48px";
            // imgObj.style.height = "48px";

            var imgObj = document.getElementById("preview");
            // 两个坑:
            // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
            // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;

        }
    });

    //文件上传预览
    $("#carouselImages").change(function() {
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $imgList = $("#preview");

        if(fileObj && fileObj.files && fileObj.files[0]){
            $imgList.empty();
            for(var num = 0; num < fileObj.files.length; num++){
                dataURL =  windowURL.createObjectURL(fileObj.files[num]);
                $imgList.append("" +
                    "<div class='ui basic segment'>" +
                    "<div class='ui top attached label' >引导页" + (num + 1)+ "</div>" +
                    "<img class='ui rounded bordered image' name='preview' " +
                    "src='" + dataURL  + "'></div>");
            }
        }else{
            dataURL = $file.val();

            // $img.css("filter",'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale,src="' + dataURL + '")');

            // var imgObj = document.getElementById("preview");
            // imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=/"" + dataURL + "/")";
            // imgObj.style.width = "48px";
            // imgObj.style.height = "48px";

            var imgObj = document.getElementById("preview");
            // 两个坑:
            // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
            // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;

        }
    });
});