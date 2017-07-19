$(document).ready(function () {

    //默认设计角度
    var angle = 0;
    //默认移速
    var moveSpeed = 15;
    //控制部分，按键按下后，对应按键div添加hover的class
    $(document).keydown(function (event) {
        switch (event.keyCode) {
            case 37:
                $('#key .left').addClass('hover');
                break;
            case 38:
                $('#key .up').addClass('hover');
                break;
            case 39:
                $('#key .right').addClass('hover');
                break;
            case 40:
                $('#key .down').addClass('hover');
                break;
            case 90:
                $('#key .keyz').addClass('hover');
                break;
            case 88:
                $('#key .keyx').addClass('hover');
                break
        }
    });
    //按键按下后，对应按键div移除hover的class
    $(document).keyup(function (event) {
        switch (event.keyCode) {
            case 37:
                $('#key .left').removeClass('hover');
                break;
            case 38:
                $('#key .up').removeClass('hover');
                break;
            case 39:
                $('#key .right').removeClass('hover');
                break;
            case 40:
                $('#key .down').removeClass('hover');
                break;
            case 90:
                $('#key .keyz').removeClass('hover');
                break;
            case 88:
                $('#key .keyx').removeClass('hover');
                break
        }
    });
    //每0.1秒自动检定
    setInterval(function () {
        //如果按键div有hover的class，则执行系下一步函数
        if ($('#key .left').hasClass('hover')) {
            fun_moveLeft();
        }
        if ($('#key .up').hasClass('hover')) {
            fun_moveUp();
        }
        if ($('#key .right').hasClass('hover')) {
            fun_moveRight();
        }
        if ($('#key .down').hasClass('hover')) {
            fun_moveDown();
        }
        //自方子弹移动函数
        bulletFly();

        //获取角色坐标
        var player = $('#player1');
        //获取敌方坐标
        var enemy = $('#enemy .brick');

        $('#enemy-bullet >div').each(function () {
            var bullet = $(this);
            collision(bullet, player);
        });

        $('#My-bullet >div').each(function () {
            var bullet = $(this);
            collision(bullet, enemy);
        });


    }, 100);
    //自机射击检定
    setInterval(function () {
        //旋转角度
        angle += 25;
        //判定点
        var triggerClass = $('#key .keyz');
        //子弹发射点
        var startpoint = $('#enemy .brick');
        //子弹发射类型
        var bulletclass = $('#enemy-bullet');
        //子弹速度
        var speed = 15;
        rotatingarrageB(triggerClass,angle,startpoint,bulletclass,speed);
    }, 100);

    //检测数值
    $(document).keypress(function () {
        $('#keydown').text($('#player1').css('top'));
        $('#keyup').text($('#player1').css('left'));
    });
    $(document).keyup(function () {
    });

    //移动函数，获取坐标后向目的地移动10px
    function fun_moveLeft() {
        var direction = 'left';
        var positionLeft = parseInt(keyCodeMatch('#player1', direction));
        if (positionLeft <= 0) {
            $('#player1').css(direction, (positionLeft) + 'px');
        }
        else {
            $('#player1').css(direction, (positionLeft - moveSpeed) + 'px');
        }
    }

    function fun_moveUp() {
        var direction = 'top';
        var positionTop = parseInt(keyCodeMatch('#player1', direction));
        if (positionTop <= 0) {
            $('#player1').css(direction, positionTop + 'px');
        }
        else {
            $('#player1').css(direction, (positionTop - moveSpeed) + 'px');
        }
    }

    function fun_moveRight() {
        var direction = 'left';
        var bodyright = $('#gbody').width() - 10;
        var positionLeft = parseInt(keyCodeMatch('#player1', direction));
        if (positionLeft >= bodyright) {
            $('#player1').css(direction, (positionLeft) + 'px');
        }
        else {
            $('#player1').css(direction, (positionLeft + moveSpeed) + 'px');
        }
    }

    function fun_moveDown() {
        var direction = 'top';
        var bodyBotton = $('#gbody').height() - 10;
        var positionTop = parseInt(keyCodeMatch('#player1', direction));
        if (positionTop >= bodyBotton) {
            $('#player1').css(direction, positionTop + 'px');
        }
        else {
            $('#player1').css(direction, (positionTop + moveSpeed) + 'px');
        }
    }

    //转为数字函数
    function keyCodeMatch(a, b) {
        var str = $(a).css(b);
        var reg = /\d+/;
        var num = str.match(reg)[0];
        return num;
    }

    //自方子弹移动函数,按照子弹向量方向移动。
    function bulletFly() {
        $('#My-bullet >div').each(function () {
            var positionTop = parseInt(keyCodeMatch(this, 'top'));
            var positionLeft = parseInt(keyCodeMatch(this, 'left'));
            var a = positionTop + parseInt($(this).attr('top'));
            var b = positionLeft + parseInt($(this).attr('left'));
            if (positionTop <= 10 || positionTop >= 600) {
                $(this).remove();
            }
            else if (positionLeft <= 10 || positionLeft >= 790) {
                $(this).remove();
            }
            else {
                $(this).css({
                    'top': a + 'px',
                    'left': b + 'px'
                })
            }
        });
        $('#enemy-bullet >div').each(function () {
            var positionTop = parseInt(keyCodeMatch(this, 'top'));
            var positionLeft = parseInt(keyCodeMatch(this, 'left'));
            var a = positionTop + parseInt($(this).attr('top'));
            var b = positionLeft + parseInt($(this).attr('left'));
            if (positionTop <= 10 || positionTop >= 600) {
                $(this).remove();
            }
            else if (positionLeft <= 10 || positionLeft >= 790) {
                $(this).remove();
            }
            else {
                $(this).css({
                    'top': a + 'px',
                    'left': b + 'px'
                })
            }
        });
    }

    //获得坐标并输出obj
    function getCoordinate(classname) {
        var x = {
            t: parseInt(keyCodeMatch(classname, 'top')),
            h: parseInt(keyCodeMatch(classname, 'top')) + parseInt(keyCodeMatch(classname, 'height')),
            l: parseInt(keyCodeMatch(classname, 'left')),
            w: parseInt(keyCodeMatch(classname, 'left')) + parseInt(keyCodeMatch(classname, 'width'))
        };
        return x;
    }

    //碰撞检定。第一层，为了减少计算量分为了两层。先检定Y轴，如果在范围内则进入下一层，如果不在则跳过。
    function collision(bullet, enemy) {
        var x = getCoordinate(enemy);
        var y = getCoordinate(bullet);

        if (y.t >= x.t && y.t <= x.h) {
            collisionSecond(bullet, enemy, x, y);
        }
        else if (y.h >= x.t && y.h <= x.h) {
            collisionSecond(bullet, enemy, x, y);
        }
    }

    //碰撞检定。第二层，检定X轴，如果在范围内则进入下一层，如果不在则跳过。
    function collisionSecond(bullet, enemy, x, y) {
        if (y.l >= x.l && y.l <= x.w) {
            bulletHit(bullet, enemy);
        }
        else if (y.w >= x.l && y.w <= x.w) {
            bulletHit(bullet, enemy);
        }
    }

    //子弹碰撞后发动的函数，1）移除子弹；2）获取目标生命值，如果大于1则HP-1，否则移除目标；3）如果HP小于5，目标改为红色。
    function bulletHit(bullet, enemy) {
        bullet.remove();
        var hp = enemy.attr('hp');
        if (hp > 1) {
            enemy.attr('hp', hp - 1);
        }
        else {
            enemy.remove();
        }
        if (hp < 5) {
            enemy.css('background', 'red')
        }
    }

    //旋转子弹*4
    function rotatingarrageB(triggerClass,angle,startpoint,bulletclass,speed) {
        if (triggerClass.hasClass('hover')) {
            var playerLeft = startpoint.css('left');
            var playerTop = startpoint.css('top');

            var angle2 = angle +90;
            var angle3 = angle +180;
            var angle4 = angle -90;

            var a = (Math.sin(angle*Math.PI/180)*speed).toFixed(8);
            var b = (-Math.cos(angle*Math.PI/180)*speed).toFixed(8);
            var c = (Math.sin(angle2*Math.PI/180)*speed).toFixed(8);
            var d = (-Math.cos(angle2*Math.PI/180)*speed).toFixed(8);
            var e = (Math.sin(angle3*Math.PI/180)*speed).toFixed(8);
            var f = (-Math.cos(angle3*Math.PI/180)*speed).toFixed(8);
            var g = (Math.sin(angle4*Math.PI/180)*speed).toFixed(8);
            var h = (-Math.cos(angle4*Math.PI/180)*speed).toFixed(8);

            var bulletDiv = "<div class='bullet' style='left:" + playerLeft + ";top:" + playerTop + "' top='" + b + "' left='" + a + "'></div>";
            var bulletDiv2 = "<div class='bullet' style='left:" + playerLeft + ";top:" + playerTop + "' top='" + d + "' left='" + c + "'></div>";
            var bulletDiv3 = "<div class='bullet' style='left:" + playerLeft + ";top:" + playerTop + "' top='" + f + "' left='" + e + "'></div>";
            var bulletDiv4 = "<div class='bullet' style='left:" + playerLeft + ";top:" + playerTop + "' top='" + h + "' left='" + g + "'></div>";

            bulletclass.append(bulletDiv);
            bulletclass.append(bulletDiv2);
            bulletclass.append(bulletDiv3);
            bulletclass.append(bulletDiv4);
        }
    }
});