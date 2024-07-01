//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약에 유저가 랜던번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호 Down!!!
//랜던번호가 > 유저번호 Up!!
//새게임 New Game 버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
//시도횟수 
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다.

let enteredNumber = document.getElementById("enteredNumber");
let answerNumber = document.getElementById("answer");
let randomNumber = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-text");
let resetButton = document.getElementById("result-button");
let attempts = document.getElementById("attempts-area");
let resultImgArea = document.querySelector(".main-img");
let historyList = document.getElementById("historyList");
let chances = 3;
let numberOfAttempts = 0;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

console.log(playButton);
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);

// input에 있는 value를 없에준다. "focus"란 커서가 오게될때 
userInput.addEventListener("focus", function () {
    userInput.value = ""
})

// Random Number
function pickRandomNumber() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log("정답", randomNumber);
    answerNumber.textContent = `정답 : ${randomNumber}`;
}

// To start the game
function play() {
    let userValue = userInput.value;
    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = "1과 100사이 숫자를 입력해 주세요";
        resultArea.style.color = "#071952";
        return;
    }

    if (history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다 다른 숫자를 입력해 주세요";
        resultArea.style.color = "#E76F51";
        return;
    }
    numberOfAttempts++;
    chances--;

    attempts.textContent = `시도 횟수 : ${numberOfAttempts}번`;
    chanceArea.textContent = `남은 기회 : ${chances}번`;


// To check about up!!! Down!!! correct!!  
    if (userValue < randomNumber) {

        resultImgArea.src = "./gif-img/up-img.webp";
        resultArea.textContent = "위로 !!!";
        resultArea.style.color = "red";
        console.log("Up!!! ");

    } else if (userValue > randomNumber) {

        resultImgArea.src = "./gif-img/down-img.webp";
        resultArea.textContent = "아래로 !!!";
        resultArea.style.color = "#088395";
        console.log("Down");
    } else {
        resultImgArea.src = "./gif-img/goodjob-img.webp";
        resultArea.textContent = "와우~ 맞췄습니다.";
        resultArea.style.color = "black";
        gameOver = true;
        console.log("맞췄습니다.");
    }

    history.push(userValue);
    console.log(history)
    enteredNumber.style.color = "#DA7297";
    enteredNumber.innerHTML = ` ${history}`;
    if (chances < 1) {
        gameOver = true;

    } 
    if (gameOver == true) {
        playButton.disabled = true;
       
        
    } 
    if (chances === 0) {
        chanceArea.disabled = true;
        resultImgArea.src = "./gif-img/monkey.gif"
        resultArea.innerHTML = "Game Over";
        resultArea.style.color = "#FF76CE ";
    }
}

function reset() {
    pickRandomNumber();
    resultImgArea.src = "./gif-img/tambourine.gif";
    resultArea.textContent = "숫자를 맞쳐 보세요!!!";
    resultArea.style.color = "#071952"
    playButton.disabled = false;

    // clear user input window user input 창이 깨끗하게 정리되고
    userInput.value = "";
    numberOfAttempts = 0;
    chances = 3;
    history = [];
    attempts.textContent = `시도 횟수 : ${numberOfAttempts}번`;
    chanceArea.textContent = `남은 찬스 : ${chances}번`;
    enteredNumber.textContent = `${history}`;

    
    gameOver=false;
    // 새로운 번호가 생성되고



}

pickRandomNumber();