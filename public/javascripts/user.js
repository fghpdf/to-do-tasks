$(document).ready(function () {
    $("button#completeTask").click(function () {
        var statusText = $(this).parent().parent().parent().parent().parent().children().eq(2).text();
        var statusId = statusText.substring(3);
        location.href = "/user/completeTask?statusId=" + statusId;
    });

    //修改任务.ui.animated.inverted.yellow.button
    $("button#updateTask").click(function() {
        var taskId = $(this).parent().parent().parent().children().eq(0).text();
        location.href = "/user/updateTask?taskId=" + taskId;
    });

    //删除任务
    $("button#deleteTask").click(function() {
        var taskId = $(this).parent().parent().parent().children().eq(0).text();
        location.href = "/user/deleteTask?taskId=" + taskId;
    });

    $('.special.cards .image').dimmer({
        on: 'hover'
    });

    $('.message .close')
        .on('click', function() {
            $(this)
                .closest('.message')
                .transition('fade')
            ;
        })
    ;

    $('#totalProgress').progress();
    $('#sevenProgress').progress();
    $('#todayProgress').progress();

    //时间选择器
    new Kalendae.Input('startDate', {
        mode: 'single',
        months: 1
    });

    new Kalendae.Input('endDate', {
        mode: 'single',
        months: 1
    });


});