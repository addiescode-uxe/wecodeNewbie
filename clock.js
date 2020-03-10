const clockText = document.querySelector('.clock-text');

function getTime() {
    const currentDate = new Date();
    const minutes = currentDate.getMinutes();
    const hours = currentDate.getHours();
    const seconds = currentDate.getSeconds();

    clockText.innerText = `${hours} : ${minutes < 10 ? `0${minutes}` : minutes}: ${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);//1초마다 반복되는 명령
}

init();