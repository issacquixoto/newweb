$(document).ready(function () {
    //加点
    var characterPoint = {
        body: 3,
        sta: 3,
        int: 3,
        feel: 3,
        will: 3
    };
    //剩余点数
    var overCharacterPoint;
    //种族修正
    var raceCorrection = {};
    //额外修正
    var otherRaceCorrection = {};
    //加点合计
    var totalCharacterPoint = {};
    //所选种族
    var changeRace;
    //种族等级数据
    var raceRank = {
        a1: {
            point: 26,
            correction: {
                body: 2,
                sta: 2,
                int: 0,
                feel: 0,
                will: 1
            }
        },
        a2: {
            point: 26,
            correction: {
                body: 0,
                sta: 0,
                int: 2,
                feel: 0,
                will: 1
            }
        },
        b1: {
            point: 24,
            correction: {
                body: 0,
                sta: 0,
                int: 1,
                feel: 0,
                will: 2
            }
        },
        b2: {
            point: 24,
            correction: {
                body: 1,
                sta: 1,
                int: 0,
                feel: 1,
                will: 0
            }
        },
        b3: {
            point: 24,
            correction: {
                body: 1,
                sta: 1,
                int: 0,
                feel: 0,
                will: 0
                //自选一项+1
            }
        },
        b4: {
            point: 24,
            correction: {
                body: 1,
                sta: 0,
                int: 0,
                feel: 2,
                will: 0
            }
        },
        c1: {
            point: 22,
            correction: {
                body: -1,
                sta: -1,
                int: 1,
                feel: 0,
                will: 1
            }
        },
        c2: {
            point: 22,
            correction: {
                body: 0,
                sta: 0,
                int: 1,
                feel: 1,
                will: -1
            }
        },
        c3: {
            point: 22,
            correction: {
                body: 0,
                sta: 0,
                int: 0,
                feel: 0,
                will: 0
            }
            //自选合计+2并自选一项-1 或自选一项+1
        },
        c4: {
            point: 22,
            correction: {
                body: 1,
                sta: 1,
                int: -1,
                feel: 1,
                will: -1
            }
        },
        d1: {
            point: 20,
            correction: {
                body: 0,
                sta: 0,
                int: 0,
                feel: 0,
                will: 0
            }
        },
        d2: {
            point: 20,
            correction: {
                body: -1,
                sta: -1,
                int: -1,
                feel: 2,
                will: -1
            }
        }
    };

    //选择种族
    $('#characterRace').on('change', function () {
        resetCharacterPoint();

        //导入种族点数
        changeRace = $(characterRace).find("option:selected").val();
        $('#racePoint').text(raceRank[changeRace].point);

        //导入种族修正
        raceCorrection = raceRank[changeRace].correction;

        //消除警报
        $('.error').css('display', 'none');

        //清除种族特殊修正radio选择
        cleanChoose();

        //额外修正开关控制
        $('#otherRaceCorrection > div').css('display', 'none');
        if (changeRace === 'c3') {
            $('#otherRaceCorrection .c3Choose').css('display', 'block');
        }
        else if (changeRace === 'b3') {
            $('#otherRaceCorrection .other01').css('display', 'block');
        }

        OverCharacterPoint();
        refreshValue();
    });

    //加属性点
    $('#characterPoint input[value="+"]').on('click', function () {
        var addPoint = $(this).attr('class');
        //属性点点不够的警报
        if (overCharacterPoint <= 0) {
            $('.error_04').css('display', 'block');
            return
        }
        //未选种族则默认为吸血鬼
        if (changeRace === undefined) {
            changeRace = 'a1';
            raceCorrection = raceRank.a1.correction;
        }
        if (characterPoint[addPoint] < 6) {
            ++characterPoint[addPoint];
            $('.error_01').css('display', 'none');
            $('.error_02').css('display', 'none');

            OverCharacterPoint();
            refreshValue();
        }
        else {
            $('.' + addPoint + 'Point .error_02').css('display', 'inline-block')
        }
    });

    //减属性点
    $('#characterPoint input[value="-"]').on('click', function () {
        var minusPoint = $(this).attr('class');
        //消除点数用完的警报
        $('.error_04').css('display', 'none');
        //未选种族则默认为吸血鬼
        if (changeRace === undefined) {
            changeRace = 'a1';
            raceCorrection = raceRank.a1.correction;
        }
        if (characterPoint[minusPoint] > 3) {
            --characterPoint[minusPoint];
            $('.error_01').css('display', 'none');
            $('.error_02').css('display', 'none');

            OverCharacterPoint();
            refreshValue();
        }
        else {
            $('.' + minusPoint + 'Point .error_01').css('display', 'inline-block')
        }
    });

    //C3选项
    $('#otherRaceCorrection input').on('change', function () {
        var name = $(this).attr('name');
        var other = $('input[name="' + name + '"]:checked').val();

        if (name === 'c3Choose' && other === 'add1') {
            $('#otherRaceCorrection > div').css('display', 'none');
            $('#otherRaceCorrection .other01').css('display', 'inline-block');
        }
        if (name === 'c3Choose' && other === 'add3') {
            $('#otherRaceCorrection > div').css('display', 'inline-block');
        }

        $('#otherRaceCorrection .c3Choose').css('display', 'block');
        cleanChoose();
        refreshValue();
    });

    //额外修正选项
    $('#otherRaceCorrection select').on('change', function () {
        var name = $(this).attr('name');
        var other = $(this).val();
        var otherName = otherRaceCorrection[name];

        if (name === 'other01' || name === 'other02') {
            if (otherRaceCorrection[other] === undefined) {
                otherRaceCorrection[other] = 1;
            }
            else {
                ++otherRaceCorrection[other];
            }
            if (otherName !== undefined && otherRaceCorrection[other] !== undefined) {
                --otherRaceCorrection[otherName];
            }
        }
        if (name === 'other03') {
            if (otherRaceCorrection[other] === undefined) {
                otherRaceCorrection[other] = -1;
            }
            else {
                --otherRaceCorrection[other];
            }
            if (otherName !== undefined && otherRaceCorrection[other] !== undefined) {
                ++otherRaceCorrection[otherName];
            }
        }

        otherRaceCorrection[name] = other;

        OverCharacterPoint();
        refreshValue();
    });

    //重置属性点数
    function resetCharacterPoint() {
        characterPoint = {
            'body': 3,
            'sta': 3,
            'int': 3,
            'feel': 3,
            'will': 3
        }
    }

    //清除种族特殊修正radio选择
    function cleanChoose() {
        $("#otherRaceCorrection option:first").prop("selected", 'selected');
        otherRaceCorrection = {};
    }

    //计算剩余属性点数
    function OverCharacterPoint() {
        var addCharacterPoint = 0;
        $.each(characterPoint, function (key, val) {
            addCharacterPoint = addCharacterPoint + val
        });
        overCharacterPoint = raceRank[changeRace].point - addCharacterPoint;
        $('#overRacePoint').text(overCharacterPoint);
    }

    //刷新页面数据
    function refreshValue() {
        //属性数值
        $.each(characterPoint, function (key, val) {
            $('.' + key + 'Point .point').html(val);

            if (otherRaceCorrection[key] === undefined) {
                $('.' + key + 'Point .amend').html(raceCorrection[key]);
                totalCharacterPoint[key] = raceCorrection[key] + val;
            }
            else {
                $('.' + key + 'Point .amend').html(raceCorrection[key] + otherRaceCorrection[key]);
                totalCharacterPoint[key] = raceCorrection[key] + otherRaceCorrection[key] + val;
            }
            $('.' + key + 'Point .total').html(totalCharacterPoint[key]);
        });
        //副属性数值
        var subPoint = $('#subCharacterPoint');
        var dpRecover = Math.ceil((totalCharacterPoint.int + totalCharacterPoint.feel) / 3);
        if (dpRecover < 2) {
            dpRecover = 2
        }
        subPoint.find('.hp .value').html(10 + (totalCharacterPoint.sta * 4));
        subPoint.find('.mp .value').html(totalCharacterPoint.will * 4);
        subPoint.find('.dp .value').html(10 + totalCharacterPoint.body + totalCharacterPoint.sta + totalCharacterPoint.will);
        subPoint.find('.dpRecover .value').html(dpRecover);
        subPoint.find('.dpRecover .value').html('2');
    }
});