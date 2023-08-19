function showWarning3() {
    alert('？只有我能揍！');
}

function showWarning2() {
    alert('？还没做呢！天天就知道抓抓抓！');
}

function showPopup(chance) {
    alert("你当前有" + chance + "枚金币！");
}

window.onload = function () {
    var gif = document.getElementById("coins_gif");
    gif.addEventListener("click", showPopup.bind(null, chance));
};