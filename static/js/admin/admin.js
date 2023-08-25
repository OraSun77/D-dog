const coin_purchase = document.getElementById('coin_purchase')
const windows_of_coin_purchase = document.getElementById('windows_of_coin_purchase')
const closeButton = document.getElementById('exit-button')
const returnButton = document.getElementById('return-button')
window.onload = function () {
    coin_purchase.addEventListener('click', function () {
        console.log(1)
        windows_of_coin_purchase.style.display = 'block';
    });
    closeButton.addEventListener('click', function () {
        windows_of_coin_purchase.style.display = 'none';
    });
    returnButton.addEventListener('click', function () {
        window.location.href = "/828"
    })
}
