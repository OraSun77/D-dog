function showWarning3() {
    alert('？只有我能揍！');
}

function showWarning2() {
    alert('？还没做呢！天天就知道抓抓抓！');
}

function showPopup(chance) {
    confirm("你当前有" + chance + "枚金币！");
}

function checkCondition() {
    var new_chance = chance - 10
    // 条件判断
    if (new_chance < 0) {
        alert("次数不足,剩余" + chance + "个金币");
    } else if (new_chance >= 0) {
        alert("已消耗10金币，剩余" + new_chance + "个金币");
        window.location.href = "/mobile"; // 如果a等于1，则跳转链接
    }
}

window.onload = function () {
    var gif = document.getElementById("coins_gif");
    var gif2 = document.getElementById("coins_gif2");
    var image = document.querySelector(".music_picture");
    var audio = document.getElementById("audio");
    var isRotating = false;
    // 获取按钮和弹窗元素
    var popupButton = document.getElementById('popupButton');
    var popup = document.getElementById('popup');
    var closeButton = document.getElementById('exit-button');
    var deleteButton = document.getElementById('delete_button');
    var dataContainer = document.getElementById('dataContainer');

    // 点击按钮时显示弹窗
    popupButton.addEventListener('click', function () {
        // 这里可以发送请求向后端获取数据，并在弹窗中展示
        // 假设后端返回以下数据
        var xhr = new XMLHttpRequest();

        xhr.open('GET', '/push_history', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var dataFromBackend = JSON.parse(xhr.responseText);
                    var key_list = Object.keys(dataFromBackend)
                    var html_combine = "<thead><tr><th>项目</th><th>时间</th><th>奖励</th><th>数量</th></tr></thead><tbody>"
                    for (var i = 0; i < key_list.length; i++) {
                        var data = dataFromBackend[key_list[i]]
                        var data_keys = Object.keys(data)
                        for (var j = 0; j < data_keys.length; j++) {
                            var t = data_keys.length - j - 1
                            var data_values = Object.keys(data[data_keys[t]])
                            for (var k = 0; k < data_values.length; k++) {
                                html_combine += "<tr><th>"
                                if (k === 0) {
                                    html_combine += key_list[i];
                                }
                                html_combine += "</th><th>"
                                if (k === 0) {
                                    html_combine += data_keys[t]
                                }
                                html_combine += "</th><th>" + data_values[k] + "</th><th>" + data[data_keys[t]][data_values[k]] + "</th>"
                                html_combine += "</tr>"
                            }
                        }
                    }
                    html_combine += "</tbody>"
                    dataContainer.innerHTML = html_combine
                    // 显示弹窗
                    popup.style.display = 'block';
                } else {
                    console.error('请求失败', xhr.status);
                }
            }
        };
        xhr.send();
    });

    // 点击关闭按钮时隐藏弹窗
    closeButton.addEventListener('click', function () {
        popup.style.display = 'none';
    });
    deleteButton.addEventListener('click', function () {
        if (confirm("确定删除历史记录吗？")) {
            fetch("/clear_history")
                .then(response => response.json())
                .then(data => {
                    // 处理后端接口返回的数据
                    console.log(data);
                    dataContainer.innerHTML = "<thead><tr><th>项目</th><th>时间</th><th>奖励</th><th>数量</th></tr></thead><tbody>"
                })
                .catch(error => {
                    console.error(error);
                });
        }
    })
    gif.addEventListener("click", showPopup.bind(null, chance));
    gif2.addEventListener("click", showPopup.bind(null, chance));
    image.addEventListener("click", function () {
        if (!isRotating) {
            audio.play(); // 播放音乐
            image.classList.add("playing"); // 添加播放状态的样式
            image.classList.add('rotate');
            isRotating = true;
        } else {
            audio.pause(); // 暂停音乐
            image.classList.remove("playing"); // 移除播放状态的样式
            image.classList.remove('rotate');
            isRotating = false;
        }
    });
};

