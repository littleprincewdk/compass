/**
 * Created by wudengke on 2017/4/18.
 */
$(function(){
    'use strict';

    var $Compass=$('#compass');
    var $ShowError=$('#show-error');
    var settings={
        radius:100,
        space:30,               //每隔多少秒针作为一个分针
        secondLength:8,
        secondWidth:1,
        secondColor:'#2f54c4',
        minuteLength:15,
        minuteWidth:1,
        minuteColor:'#000',
        figureRadius:150,
        figureFont:'16px Arial',
        figureColor:'#2f54c4',
    };
    var compassWidth=$Compass.width(),
        compassHeight=$Compass.height();
    $Compass[0].width=compassWidth;
    $Compass[0].height=compassHeight;
    var context=$Compass[0].getContext('2d');

    init();

    function init(){
        drawPlate();
        getLocation();
    }
    function drawPlate(){
        context.translate(compassWidth/2,compassHeight/2);
        context.save();

        drawSecond();
        drawMinute();
        drawFigure();

        context.restore();
    }
    function drawMinute(){
        context.save();

        context.strokeStyle=settings.minuteColor;
        context.lineWidth=settings.minuteWidth;
        for(var i=0;i<360;i+=settings.space){
            context.save();

            context.rotate(i*Math.PI/180);
            context.beginPath();
            context.moveTo(settings.radius,0);
            context.lineTo(settings.radius+settings.minuteLength,0);
            context.stroke();

            context.restore();
        }

        context.restore();
    }
    function drawSecond(){
        context.save();

        context.strokeStyle=settings.secondColor;
        context.lineWidth=settings.secondWidth;
        for(var i=0;i<360;i+=2){
            if(i%settings.space!==0){
                context.save();

                context.rotate(i*Math.PI/180);
                context.beginPath();
                context.moveTo(settings.radius,0);
                context.lineTo(settings.radius+settings.secondLength,0);
                context.stroke();

                context.restore();
            }
        }

        context.restore();
    }
    function drawFigure(){
        context.save();

        context.font=settings.figureFont;
        context.fillStyle=settings.figureColor;
        context.textAlign='center';
        context.textBaseline='middle';
        for(var i=0;i<360;i+=settings.space){
            context.save();
            var angle=i*Math.PI/180;
            context.fillText(i+'',Math.cos(angle)*settings.figureRadius,Math.sin(angle)*settings.figureRadius);

            context.restore();
        }

        context.restore();
    }
    function getLocation()
    {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(repaint,showError);
        } else {
            alert('该浏览器不支持获取地理位置。');
        }
    }
    function showError(error){
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert('用户拒绝对获取地理位置的请求。');
                break;
            case error.POSITION_UNAVAILABLE:
                alert('位置信息是不可用的。');
                break;
            case error.TIMEOUT:
                alert('请求用户地理位置超时。');
                break;
            case error.UNKNOWN_ERROR:
                alert('未知错误。');
                break;
        }
    }
    function repaint(position){
        $ShowError.html(position.coords.heading)
    }
});