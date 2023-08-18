items_len = 20
//设置中奖信息
var data = [
    {name: '董小狗', color: 'rgba(0, 0, 0, 1)'},
    {name: '董大狗', color: 'rgba(0, 0, 0, .9)'},
    {name: '董小鸡', color: 'rgba(0, 255, 0, 1)'},
    {name: '董小猪', color: 'rgba(255, 0, 0, 1)'},
    {name: '董大猪', color: 'hotpink'},
    {name: '董大鸭', color: 'darkgreen'}
];

for (var i = 1; i < items_len + 1; i++) {
    var str_ = '#can' + i
    var can = document.querySelector(str_)
    get_information(can, data)
}

function get_information(can, data) {
    can.width = 50;
    can.height = 25;

    //联系上下文
    var ctx = can.getContext("2d");

    //获得index值
    var index = Math.floor(Math.random() * data.length);
    //获得对象
    var dataIndex = data[index];
    //设置文字
    ctx.font = "800 15px 微软雅黑";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillStyle = dataIndex.color;
    ctx.fillText(dataIndex.name, can.width / 2, can.height / 2);
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
