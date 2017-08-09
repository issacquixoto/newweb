$(document).ready(function () {
    var characterPoint = {
        'body': 3,
        'sta': 3,
        'int': 3,
        'feel': 3,
        'will': 3
    };
    var overCharacterPoint;
    var changeRace;
    var raceRank = {
        'a1': 26,
        'a2': 26,
        'b1': 24,
        'b2': 24,
        'b3': 24,
        'b4': 24,
        'c1': 22,
        'c2': 22,
        'c3': 22,
        'c4': 22,
        'd1': 20,
        'd2': 20
    };

    //选择种族
    $('#characterRace').on('change', function () {
        resetCharacterPoint();

        //导入种族点数
        changeRace = $(characterRace).find("option:selected").val();
        $('#racePoint').text(raceRank[changeRace]);

        OverCharacterPoint();
        refreshValue();
    });

    //按加
    $('#characterPoint input[value="+"]').on('click', function () {
        var addPoint = $(this).attr('class');
        //属性点点不够的警报
        if (overCharacterPoint <= 0) {
            $('.error_04').css('display', 'block');
            return
        }
        //未选种族则默认为吸血鬼
        if (changeRace === undefined) {
            changeRace = 'a1'
        }
        if (characterPoint[addPoint] < 6) {
            ++characterPoint[addPoint];
            OverCharacterPoint();
            refreshValue();
            $('.error_01').css('display', 'none');
        }
        else {
            $('.' + addPoint + 'Point .error_02').css('display', 'inline-block')
        }
    });

    //按减
    $('#characterPoint input[value="-"]').on('click', function () {
        var minusPoint = $(this).attr('class');
        //消除点数用完的警报
        $('.error_04').css('display', 'none');
        //未选种族则默认为吸血鬼
        if (changeRace === undefined) {
            changeRace = 'a1'
        }
        if (characterPoint[minusPoint] > 3) {
            --characterPoint[minusPoint];
            OverCharacterPoint();
            refreshValue();
            $('.error_02').css('display', 'none');
        }
        else {
            $('.' + minusPoint + 'Point .error_01').css('display', 'inline-block')
        }
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

    //计算剩余属性点数
    function OverCharacterPoint() {
        var addCharacterPoint = 0;
        $.each(characterPoint, function (key, val) {
            addCharacterPoint = addCharacterPoint + val
        });
        overCharacterPoint = raceRank[changeRace] - addCharacterPoint
        $('#overRacePoint').text(overCharacterPoint);
    }

    //刷新页面数据
    function refreshValue() {
        $.each(characterPoint, function (key, val) {
            $('.' + key + 'Point .point').html(val);
        });
    }
});