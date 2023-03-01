// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert

document.addEventListener('DOMContentLoaded', showBtn);

function showBtn () {

    const canvas = document.getElementById("gradient");
    const ctx = canvas.getContext("2d");

    let gradient = ctx.createLinearGradient(0, 20, 0, 0);

    gradient.addColorStop(0, 'rgb(198, 198, 255, 0)');
    gradient.addColorStop(.5, 'rgb(198, 198, 255, .3)');
    gradient.addColorStop(1, 'rgb(198, 198, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 100);

    document.querySelector(".button").addEventListener('click', showScreen);

}

function showScreen(){

    const scrWidth = window.screen.width;
    const scrHeight = window.screen.height;
    window.alert(`Размер вашего экрана: ${scrWidth} х ${scrHeight} px`);
}