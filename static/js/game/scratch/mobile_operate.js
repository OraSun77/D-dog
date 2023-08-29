items_len = 20
result_list = []
for (var i = 1; i < items_len + 1; i++) {
    var str_ = '#can' + i
    var can = document.querySelector(str_)
    var data_choose = read_probability();
    result_list.push(data_choose.name)
    get_information(can, data_choose)
}

function get_scratch_result() {
    var new_dict = {'现金': 0}
    for (var i = 0; i < result_list.length; i++) {
        if (result_list[i].includes("元")) {
            var num = extractNumberBeforeYuan(result_list[i])
            new_dict['现金'] += Number(num)
        } else if (result_list[i] === "加油呀") {
        } else {
            if (!(result_list[i] in Object.keys(new_dict))) {
                new_dict[result_list[i]] = 1
            } else {
                new_dict[result_list[i]] += 1
            }
        }
    }
    Object.keys(new_dict).map(key => {
        var old_value = new_dict[key]
        new_dict[key] = {amount: old_value, status: 0}
    })

    var result_message = ''
    Object.entries(new_dict).forEach(([key, value]) => {
        str_ = key + ":" + value["amount"] + ",\n"
        result_message += str_
    });

    write_in_json(new_dict)
    console.log(result_message)
    if (confirm("您获得了以下奖励\n" + result_message)) {
        if (str_.includes('再来一次')) {
            var amount = new_dict['再来一次']["amount"] * 10
            window.location.href = "/purchase_and_return?purchase=" + amount;
        } else {
            window.location.href = "/828";
        }
    }
}

function write_in_json(data) {
    var date_now = new Date()
    var result_json = {
        'birthday scratch card': {
            // 'hit dx': {
            date: date_now.toLocaleDateString() + " " + date_now.toLocaleTimeString(),
            value: data
        }
    }
    fetch('/write_in_history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(result_json)
    })
        .then(response => response.json())
        .then(data => {
            // 在这里处理后端返回的数据
        })
        .catch(error => {
            // 处理错误
        });
}

function extractNumberBeforeYuan(str) {
    // 使用正则表达式提取数字
    var regex = /^(\d+(?:\.\d+)?)元/;
    var match = str.match(regex);

    if (match) {
        // 匹配到数字，返回提取到的结果
        return match[1];
    } else {
        // 未匹配到数字，返回空字符串或其他默认值
        return str;
    }
}

function get_information(can, data_choose) {
    can.width = 50;
    can.height = 25;

    //联系上下文
    var ctx = can.getContext("2d");
    //设置文字
    ctx.font = "600 12px 微软雅黑";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillStyle = data_choose.color;
    ctx.fillText(data_choose.name, can.width / 2, can.height / 2);
    //将背景转换为canvas特有的base64格式
    var dataUrl = can.toDataURL("image/png", 1);
    //将背景图片设置为canvas画布的背景
    can.style.backgroundImage = "url(" + dataUrl + ")";
    //给画布添加遮罩层
    ctx.fillStyle = "#eaa80b";
    ctx.fillRect(0, 0, can.width, can.height);
    //设置点击事件
    var isScratching = false;

    can.addEventListener('mousedown', startScratch);
    can.addEventListener('touchstart', startScratch);
    document.addEventListener('mouseup', stopScratch);
    document.addEventListener('touchend', stopScratch);

    function startScratch(event) {
        isScratching = true;
        if (event.type === 'mousedown') {
            can.addEventListener('mousemove', scratch);
        } else if (event.type === 'touchstart') {
            can.addEventListener('touchmove', scratch);
        }
        ctx.globalCompositeOperation = 'destination-out';
    }

    function scratch(event) {
        event.preventDefault();
        if (isScratching) {
            var r = 10
            var x, y
            if (event.type === 'mousemove') {
                x = event.clientX - can.getBoundingClientRect().left;
                y = event.clientY - can.getBoundingClientRect().top;
            } else if (event.type === 'touchmove') {
                x = event.touches[0].clientX - can.getBoundingClientRect().left;
                y = event.touches[0].clientY - can.getBoundingClientRect().top;
            }
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, false);
            ctx.fill();

            var data = ctx.getImageData(0, 0, can.width, can.height).data;

            for (var i = 0, j = 0; i < data.length; i += 4) {
                if (data[i] && data[i + 1] && data[i + 2] && data[i + 3]) {
                    j++;
                }
            }
            //当图层被擦除剩余70%时触发
            if (j <= can.width * can.height * 0.3) {
                ctx.clearRect(0, 0, can.width, can.height);
            }
        }
    }

    // 停止刮奖
    function stopScratch(event) {
        isScratching = false;
        if (event.type === 'mouseup') {
            can.removeEventListener('mousemove', scratch);
        } else if (event.type === 'touchend') {
            can.removeEventListener('touchmove', scratch);
        }
    }
}

function weightedRandom(arr) {
    var totalWeight = 0;
    for (var key in arr) {
        totalWeight += arr[key];
    }

    var randomNum = Math.random() * totalWeight;
    var cumulativeWeight = 0;

    for (var key in arr) {
        cumulativeWeight += arr[key];
        if (randomNum <= cumulativeWeight) {
            return key;
        }
    }
}

function read_probability() {
    try {
        var jsonData = filter_json;
        var json_awards = jsonData.information.awards
        var color_list = jsonData.color
        var awards = {}
        for (var i = 0; i < Object.keys(json_awards).length; i++) {
            name = Object.keys(json_awards)[i]
            awards[name] = json_awards[name][0]
        }
        var choose_one = weightedRandom(awards)
        return {'name': choose_one, 'color': color_list[json_awards[choose_one][1]]}
    } catch (error) {
        console.error('Error:', error);
        return null; // 或者返回其他默认值
    }
}

function checkCondition() {
    var json_awards = filter_json.information.chance - 10
    var new_chance = json_awards - 10
    // 条件判断
    if (new_chance < 0) {
        alert("次数不足,剩余" + json_awards + "个金币");
    } else if (new_chance >= 0) {
        alert("已消耗10金币，剩余" + new_chance + "个金币");
        window.location.href = "/scratch"; // 如果a等于1，则跳转链接
    }
}