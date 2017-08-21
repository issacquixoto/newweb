$(document).ready(function () {
    //赋值

    //种族加点
    var characterPoint = {
        body: 3,
        sta: 3,
        int: 3,
        feel: 3,
        will: 3
    };
    //技能加点
    var skillPoint = {
        // skill0: {
        //     name: '',
        //     level: 0
        // }
    };
    //剩余种族点数
    var overCharacterPoint;
    //剩余技能点数
    var overSkillPoint;
    //种族修正
    var raceCorrection = {};
    //额外种族修正
    var otherRaceCorrection = {};
    //种族加点合计
    var totalCharacterPoint = {};
    //所选种族
    var changeRace;
    //所选技能
    var changeSkill;
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
    //技能等级数据
    var skillRank = {
        a: 50,
        b: 42,
        c: 34,
        d: 26
    };
    //技能库
    var skills = {
        shooting: {
            main: '射击'
        },
        barrage: {
            main: '弹幕'
        },
        avoid: {
            main: '回避'
        },
        chaseShooting: {
            main: '追击'
        },
        shootingWeapons: {
            main: '射击武器'
        },
        meleeWeapon: {
            main: '近战武器'
        },
        movement: {
            main: '运动',
            flight: '飞行',
            groundMovement: '地面运动',
            swimming: '游泳'
        },
        perception: {
            main: '感知',
            vision: '目视',
            hearing: '聆听',
            smell: '嗅味',
            touch: '触摸',
            fantasy: '感知神秘'
        },
        resistance: {
            main: '抵抗'
        },
        shouting: {
            main: '呼喊'
        },
        song: {
            main: '歌唱'
        },
        instrument: {
            main: '乐器'
        },
        dance: {
            main: '舞蹈'
        },
        painting: {
            main: '绘画'
        },
        carving: {
            main: '雕刻'
        },
        doll: {
            main: '人偶'
        },
        literature: {
            main: '文学'
        },
        tricks: {
            main: '戏法'
        },
        divination: {
            main: '占卜'
        },
        imagination: {
            main: '想象'
        },
        life: {
            main: '生活',
            foodCollection: '食物采集',
            cook: '料理',
            housekeeping: '家务',
            hunting: '狩猎',
            farming: '农耕'
        },
        work: {
            main: '工作',
            woodwork: '木工',
            masonry: '石工',
            forged: '锻造',
            tailor: '裁缝',
            pottery: '陶艺'
        },
        gardener: {
            main: '园艺师'
        },
        ninja: {
            main: '忍术',
            secret: '隐密',
            change: '变装',
            hide: '隐匿',
            trace: '追迹'
        },
        thieves: {
            main: '盗贼',
            trap: '陷阱',
            cipher: '暗号',
            unlock: '开锁',
            engraved: '印'
        },
        chemistry: {
            main: '化学'
        },
        physics: {
            main: '物理学'
        },
        psychology: {
            main: '心理学'
        },
        fantasyKnowledge: {
            main: '幻想知识',
            magic: '魔法知识',
            godSurgery: '神术·阴阳术知识',
            attribute: '属性知识',
            monster: '妖怪知识',
            heritage: '传承·神话知识'
        },
        natureKnowledge: {
            main: '自然知识',
            animal: '动物知识',
            plant: '植物知识',
            insect: '昆虫知识',
            meteorological: '气象知识',
            geographical: '地理知识'
        },
        anecdoteKnowledge: {
            main: '逸闻知识'
        },
        historyKnowledge: {
            main: '历史知识'
        },
        martialArtsKnowledge: {
            main: '武术知识'
        },
        areaKnowledge: {
            main: '地区知识'
        },
        documentKnowledge: {
            main: '文献检索'
        },
        japaneseKnowledge: {
            main: '日语'
        },
        englishKnowledge: {
            main: '英语'
        },
        runesKnowledge: {
            main: '符文'
        },
        ancientWritings: {
            main: '古文'
        },
        medical: {
            main: '医术',
            knowledge: '医学知识',
            pharmacy: '药学',
            firstAid: '急救',
            surgery: '手术',
            veterinary: '兽医'
        },
        talk: {
            main: '交涉',
            lying: '说谎',
            business: '商业',
            breakLies: '识破谎言',
            etiquette: '礼仪规范',
            winOver: '笼络',
            report: '报道',
            gaze: '凝视'
        }
    };

    //种族触发

    //选择种族等级
    $('#characterRace').on('change', function () {
        resetCharacterPoint();

        //导入种族点数
        changeRace = $(this).find("option:selected").val();

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

        //影响技能的种族
        //付丧神
        //从战斗和感知以外的技能中选择一个和自己本体的用途有关的技能。免费获得3级，作成人物时可支付消费升到5级。（例如是乐器的话可以是〈唱歌〉或〈乐器：「自己的本体」〉、和自己有关的书籍知识等）

        if (changeRace === 'c3') {
            createSkill('skill0');
        }
        else {
            $('#skillPoint .skill0').remove()
        }

        OverCharacterPoint();
        refreshValue();
    });
    //加种族属性点
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
    //减种族属性点
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
    //种族C3选项
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
    //种族额外修正选项
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

    //技能触发
    createSkill('skill0');
    createSkill('skill1');
    //选择技能等级
    $('#skillRank').on('change', function () {
        //导入技能点数
        changeSkill = $(this).find("option:selected").val();

        OverSkillPoint();
        refreshSkillValue();
    });
    //选择技能
    $('#skillPoint').on('change', '.chooseSkill select', function () {
        var skillNumber = $(this).attr('name');
        var skillName = $(this).val();
        var subSkillSelect = skills[skillName];
        var subSkillOption;

        //未选等级则默认
        if (changeSkill === undefined) {
            changeSkill = 'a';
        }

        //导入副职业
        $.each(subSkillSelect, function (key, val) {
            var a;
            if (key === 'main') {
                a = '<option value="' + key + '" selected="selected">' + val + '</option>';
            }
            else {
                a = '<option value="' + key + '">' + val + '</option>';
            }
            subSkillOption = subSkillOption + a;
        });

        $('tr.' + skillNumber + ' .chooseSubSkill select').attr('disabled', false).html(subSkillOption);

        //清除错误
        $('.error').css('display', 'none');
        if (skillNumber === 'skill0') {
            skillPoint.skill0 = {
                name: skillName,
                level: 3
            };
        }
        else {
            skillPoint[skillNumber] = {
                name: skillName,
                level: 0
            };
        }
        OverSkillPoint();
        refreshSkillValue();
    });
    //加技能点
    $('#skillPoint').on('click', 'input[value="+"]', function () {
        var addSkill = $(this).attr('class');
        $('.error').css('display', 'none');

        if (addSkill === 'skill0') {
            if (skillPoint.skill0 === undefined) {
                $('tr.' + addSkill + ' .error_11').css('display', 'inline-block');
                return;
            }
            else if (skillPoint[addSkill].level >= 5) {
                $('tr.' + addSkill + ' .error_12').css('display', 'inline-block');
                return;
            }
            else if (overSkillPoint - skillSeries2(skillPoint[addSkill].level + 1) < 0) {
                $('.error_14').css('display', 'inline-block');
                return;
            }
            else {
                ++skillPoint[addSkill].level;
            }
        }
        else {
            if (skillPoint[addSkill] === undefined) {
                $('tr.' + addSkill + ' .error_11').css('display', 'inline-block');
                return;
            }
            else if (skillPoint[addSkill].level >= 4){
                $('tr.' + addSkill + ' .error_12').css('display', 'inline-block');
                return;
            }
            else if (overSkillPoint - skillSeries2(skillPoint[addSkill].level + 1) < 0) {
                $('.error_14').css('display', 'inline-block');
                return;
            }
            else {
                ++skillPoint[addSkill].level;
            }
        }

        OverSkillPoint();
        refreshSkillValue();
    });
    //减技能点
    $('#skillPoint').on('click', 'input[value = "-"]', function () {
        var minusSkill = $(this).attr('class');
        $('.error').css('display', 'none');

        if (minusSkill === 'skill0') {
            if (skillPoint.skill0 === undefined) {
                $('tr.' + minusSkill + ' .error_11').css('display', 'inline-block');
                return;
            }
            else if (skillPoint[minusSkill].level <= 3) {
                $('tr.' + minusSkill + ' .error_12').css('display', 'inline-block');
                return;
            }
            else {
                --skillPoint[minusSkill].level;
            }
        }
        else {
            if (skillPoint[minusSkill] === undefined) {
                $('tr.' + minusSkill + ' .error_11').css('display', 'inline-block');
                return;
            }
            else if (skillPoint[minusSkill].level <= 0) {
                $('tr.' + minusSkill + ' .error_12').css('display', 'inline-block');
                return;
            }
            else {
                --skillPoint[minusSkill].level;
            }
        }

        OverSkillPoint();
        refreshSkillValue();
    });
    //添加技能
    $('#createSkill').on('click', function () {
        var lastSkill = $('#skillPoint tr:nth-last-of-type(2)').attr('class');
        lastSkill = lastSkill.replace(/skill/, '');
        ++lastSkill;
        lastSkill = 'skill' + lastSkill;
        createSkill(lastSkill);
    });

    //函数

    //重置种族属性点数
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

    //计算剩余种族属性点数
    function OverCharacterPoint() {
        var addCharacterPoint = 0;
        $.each(characterPoint, function (key, val) {
            addCharacterPoint = addCharacterPoint + val
        });
        overCharacterPoint = raceRank[changeRace].point - addCharacterPoint;
        $('#overRacePoint').text(overCharacterPoint);
    }

    //计算剩余种族技能点数
    function OverSkillPoint() {
        var addSkillPoint = 0;
        $.each(skillPoint, function (key, val) {
            addSkillPoint = addSkillPoint + skillSeries(val.level);
        });
        overSkillPoint = skillRank[changeSkill] - addSkillPoint;
        $('#overskillPoint').text(overSkillPoint);
    }

    //添加技能
    function createSkill(skillNumber) {
        var skillSelect;

        $.each(skills, function (key, val) {
            var a = '<option value="' + key + '">' + val.main + '</option>';
            skillSelect = skillSelect + a;
        });
        if (skillNumber === 'skill0') {
            $('#skillPoint').prepend(
                '<tr class="' + skillNumber + '" style="background: #7fffd4">' +
                '<td class="chooseSkill"><select name="' + skillNumber + '" autocomplete="off">' +
                '<option>付丧神赠送技能</option>' + skillSelect +
                '</select></td>' +
                '<td class="chooseSubSkill"><select name="' + skillNumber + '" autocomplete="off" disabled="disabled"></select></td>' +
                '<td class="minus"><input class="' + skillNumber + '" type="button" value="-"></td>' +
                '<td class="skillLevel">3</td>' +
                '<td class="add"><input class="' + skillNumber + '" type="button" value="+"></td>' +
                '<td><div class="error error_11">请先选择技能</div><div class="error error_12">付丧神赠送技能等级不能低于3级或超过5级</div></td>' +
                '</tr>'
            );
        }
        else {
            $('#skillPoint .createSkill').before(
                '<tr class="' + skillNumber + '">' +
                '<td class="chooseSkill"><select name="' + skillNumber + '" autocomplete="off">' +
                '<option></option>' + skillSelect +
                '</select></td>' +
                '<td class="chooseSubSkill"><select name="' + skillNumber + '" autocomplete="off" disabled="disabled"></select></td>' +
                '<td class="minus"><input class="' + skillNumber + '" type="button" value="-"></td>' +
                '<td class="skillLevel">0</td>' +
                '<td class="add"><input class="' + skillNumber + '" type="button" value="+"></td>' +
                '<td><div class="error error_11">请先选择技能</div><div class="error error_12">新建角色技能等级不能低于0级或超过4级</div></td>' +
                '</tr>'
            );
        }
    }

    //刷新页面数据
    function refreshValue() {
        $('#raceRankPoint').text(raceRank[changeRace].point);
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

    //刷新技能数据
    function refreshSkillValue() {
        $('#skillRankPoint').text(skillRank[changeSkill]);
        //技能等级
        $.each(skillPoint, function (key, val) {
            $('tr.' + key + ' .skillLevel').html(val.level)
        });
    }

    //技能等级费点
    function skillSeries(Num) {
        var a = 0;
        Num = Math.floor(Num);

        for (var i = 0; i <= Num; i++) {
            if (i > 5) {
                a = a + 5;
            }
            else {
                a = a + i;
            }
        }
        return a;
    }

    //技能每级费点
    function skillSeries2(Num) {
        var a = 0;
        if (Num > 5) {
            a = 5;
        }
        else {
            a = Num;
        }
        return a;
    }
});