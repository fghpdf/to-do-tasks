$(document).ready(function() {
    // 初始化
    //-------

    // 获取元素
    var $timeRange = $('#timeRange');
    var $datetimepickerStart = $('#datetimepickerStart');
    var $datetimepickerEnd = $('#datetimepickerEnd');
    var $timeLabels = $('[data-value = "time"]');

    // 前端补零函数
    var fillZero = function(number) {
        return number.toString().length < 2 ? '0' + number : number;
    };


    // 获取一年中的第几周
    function getWeek() {
        var time,week,checkDate = new Date();
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        time = checkDate.getTime();
        checkDate.setMonth(0);
        checkDate.setDate(1);
        week=Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
        return week;
    }

    // 时间范围选择
    //-------------

    // 初始化时间范围选择的选中项
    if(window.dateStart != null && window.dateEnd != null) {
        $timeRange.children().eq(4).attr('selected', 'selected');
        $timeLabels.show();
        $datetimepickerStart.show();
        $datetimepickerEnd.show();
    } else if(window.week != null) {
        $timeRange.children().eq(2).attr('selected', 'selected');
    } else if(window.month != null) {
        $timeRange.children().eq(3).attr('selected', 'selected');
    } else if(window.date != null){
        $timeRange.children().eq(1).attr('selected', 'selected');
    } else {
        $timeRange.children().eq(0).attr('selected', 'selected');
    }

    // 监听时间范围选择框的值
    $timeRange.on('change', function() {
        var val = $timeRange.val();
        // 如果选择到 **自定义时间**，则显示日期选择框
        if(val === 'custom') {
            $timeLabels.show();
            $datetimepickerStart.show();
            $datetimepickerEnd.show();
        } else {
            switch(val) {
                case 'today':
                    window.location.href = window.url + '/feedBack?' + '&date=' + (new Date()).getDate();
                    break;
                case 'week':
                    window.location.href = window.url + '/feedBack?' + '&week=' + getWeek();
                    break;
                case 'month':
                    window.location.href = window.url + '/feedBack?' + '&month=' + ((new Date()).getMonth() + 1);
                    break;
            }
            $timeLabels.hide();
            $datetimepickerStart.hide();
            $datetimepickerEnd.hide();
        }
    });

    // 日期选择
    //---------

    // 获取当前日期
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var initValueStart;
    var initValueEnd;

    // 初始化日期选择框的值为当前时间
    if(window.dateStart === null) {
        initValueStart = '' + year + '-' + fillZero(month) + '-' + fillZero(date);
    } else {
        var dateStart = new Date(window.dateStart);
        initValueStart = '' + dateStart.getFullYear() + '-' + fillZero(dateStart.getMonth()+1) + '-' + fillZero(dateStart.getDate());
    }
    if(window.dateEnd  === null) {
        initValueEnd = '' + year + '-' + fillZero(month) + '-' + fillZero(date);
    } else {
        var dateEnd = new Date(window.dateEnd);
        initValueEnd = '' + dateEnd.getFullYear() + '-' + fillZero(dateEnd.getMonth()+1) + '-' + fillZero(dateEnd.getDate()-1);
    }

    $datetimepickerStart.val(initValueStart);
    $datetimepickerEnd.val(initValueEnd);

    // 实例化日期选择器
    $datetimepickerStart.datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView: 2,
        maxView: 3,
        endDate: new Date()
    });
    $datetimepickerEnd.datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView: 2,
        maxView: 3,
        endDate: new Date()
    });

    // 监听日期选择的值
    $datetimepickerEnd.on('change', function() {
        var valueStart = $datetimepickerStart.val();
        var valueEnd = $datetimepickerEnd.val();
        var dateStart = new Date(valueStart);

        var dateEnd = new Date(valueEnd);
        dateEnd.setDate(dateEnd.getDate() + 1);

        var url = window.url;

        window.location.href = url + '/feedBack?dateStart=' + dateStart +
            '&dateEnd=' + dateEnd;
    });

    $('.ui.dropdown').dropdown();
    $('.message .close').on('click', function () {
        $(this)
            .closest('.message')
            .transition('fade')
        ;
    });

});