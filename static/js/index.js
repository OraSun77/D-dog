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

