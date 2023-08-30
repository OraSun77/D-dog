var interval;
window.onload = function () {
    var time_range = [5, 10]
    var timerDisplay = document.getElementById("timer");
    var aimButton = document.getElementById("selectedNumber");
    var confirmButton = document.getElementById("confirm");
    var aim_time = new Date(new Date().getTime() + (Math.floor(Math.random() * (time_range[1] - time_range[0])) + time_range[0]) * 1000)
    aimButton.innerText = get_time(aim_time)
    var mask = 0
    var table = document.getElementById('resultTable');
    var tbody = table.getElementsByTagName('tbody')[0];
    var element = document.querySelector('#resultTable');
    var returnButton = document.getElementById('return-button')
    interval = setInterval(function () {
        var now_time = new Date()
        if ((now_time >= aim_time) && (mask === 0)) {
            confirmButton.classList.add("active")
            confirmButton.innerText = '我要抢票'
        }
        timerDisplay.innerText = get_time();

    }, 10)
    confirmButton.addEventListener('click', function () {
        if (confirmButton.classList.contains("active")) {
            var choose_time = new Date()
            confirmButton.classList.remove("active")
            confirmButton.innerText = "结束抢票"
            mask = 1
            // clearInterval(interval);
            //10000 火热 50000基本不能
            var array = make_array(person_num)
            var time_diff = choose_time - aim_time
            var rank_ = findInsertPosition(array, time_diff) + 1
            if (rank_ <= ticket_num) {
                confirm("恭喜你，抢到啦！")
                write_in_json()
            } else {
                confirm("票票卖光了，下次继续努力！")
            }
            var display_list = [1, 2, 3, ticket_num, rank_ - 1, rank_, rank_ + 1].sort(function (a, b) {
                return a - b;
            });
            var display_form = []
            for (var x of display_list) {
                var sub_obj = {}
                if (x === rank_) {
                    sub_obj['名次'] = x
                    sub_obj['获取时间'] = get_time_milliseconds(choose_time)
                    sub_obj['标签'] = 1
                } else {
                    var other_time = aim_time.getTime() + array[x - 1]
                    sub_obj['名次'] = x
                    sub_obj['获取时间'] = get_time_milliseconds(new Date(other_time))
                    sub_obj['标签'] = 0
                }
                display_form.push(sub_obj)
            }
            //填写表格
            for (var i = 0; i < display_form.length; i++) {
                var row = document.createElement('tr');
                if (display_form[i]['标签'] === 1) {
                    row.classList.add('highlighted-row');
                }
                for (var key in display_form[i]) {
                    if (key === "标签") {
                    } else {
                        var cell = document.createElement('td');
                        cell.textContent = display_form[i][key];
                        row.appendChild(cell);
                    }
                }
                tbody.appendChild(row);
            }
            console.log(display_form)
        }
    })
    returnButton.addEventListener('click', function () {
        window.location.href = "/828"
    })
}

function make_array(person_num) {
    var array = []
    for (var i = 0; i < person_num; i++) {
        array.push(generateRandomNumber())
    }
    array.sort(function (a, b) {
        return a - b;
    });
    return array
}

function write_in_json() {
    var date_now = new Date()
    var result_json = {
        'ticket grabbing simulator': {
            // 'hit dx': {
            date: date_now.toLocaleDateString() + " " + date_now.toLocaleTimeString(),
            value: {[level_name]: {amount: 1, status: 0}}
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

function get_time(currentTime = new Date()) {
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

// 将小时数、分钟数、秒数转换为两位数格式
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return hours + ":" + minutes + ":" + seconds
}

function get_time_milliseconds(currentTime = new Date()) {
    var milliseconds = currentTime.getMilliseconds();
    ;
    return get_time(currentTime) + "." + milliseconds
}

function generateRandomNumber() {
    var random = Math.random();
    var number;

    var random = Math.random();

    if (random < 0.2) { // 80% 的概率范围
        return parseFloat((Math.random() * 2).toFixed(3)) * 1000;
    } else if (random < 0.5) { // 10% 的概率范围
        return parseFloat((Math.random() * 3 + 2).toFixed(3)) * 1000;
    } else if (random < 0.8) { // 7.5% 的概率范围
        return parseFloat((Math.random() * 5 + 5).toFixed(3)) * 1000;
    } else { // 2.5% 的概率范围
        return parseFloat((Math.random() * 15 + 25).toFixed(3)) * 1000;
    }
}

function findInsertPosition(a, x) {
    let left = 0;
    let right = a.length;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        if (a[mid] < x) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
}