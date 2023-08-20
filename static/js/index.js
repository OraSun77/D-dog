function showWarning3() {
    alert('？只有我能揍！');
}

function showWarning2() {
    alert('？还没做呢！天天就知道抓抓抓！');
}

function showPopup(chance) {
    confirm("你当前有" + chance + "枚金币！");
}

window.onload = function () {
    var gif = document.getElementById("coins_gif");
    var image = document.querySelector(".music_picture");
    var audio = document.getElementById("audio");
    var isRotating = false;
    gif.addEventListener("click", showPopup.bind(null, chance));
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

