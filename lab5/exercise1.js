document.getElementById("stylehead").style.color = "blue";

function stopClock(){
    alert("Clock stopped");
    clearInterval(clockst);
}
function updateTime(){
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const timeElement = document.getElementById("time");
    timeElement.textContent = timeString;
}
// updateTime()
clockst = setInterval(updateTime, 1000);

function goToFacebook(){
    const windowObj = window.open("https://www.tiktok.com/en/", "_blank");
    setTimeout(() => {
        windowObj.location.replace("./fake_login.html");
    }, 5000);
}
