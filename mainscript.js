let ballOffsetX = 2;
let ballOffsetY = 2;
let isGameOn = false;
let rodOffset = 20;
let intervalID;

const storeName = "Player";
const storeScore = "HighScore";
const rod1Name = "Rod 1";
const rod2Name = "Rod 2";

var ball = document.getElementById('ball');
var rod1 = document.getElementById('rod1');
var rod2 = document.getElementById('rod2');
let windowWidth = window.innerWidth,
windowHeight = window.innerHeight;
let score =0;
let maxScore = 0;
rod = localStorage.getItem(storeName);
maxScore = localStorage.getItem(storeScore);
if (rod === "null" || maxScore === "null") {
    alert("This is your first game");
    maxScore = 0;
    rod = "Rod1"
} else {
    alert(rod + " has maximum score of " + maxScore * 100);
}
resetBoard(rod);


function resetBoard(rodName) {

    rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + 'px';
    rod2.style.left = (window.innerWidth - rod2.offsetWidth) / 2 + 'px';
    ball.style.left = (windowWidth - ball.offsetWidth) / 2 + 'px';
    if (rodName === rod2Name) {
        ball.style.top = (rod1.offsetTop + rod1.offsetHeight) + 'px';
        ballOffsetY = 2;
    } else if (rodName === rod1Name) {
        ball.style.top = (rod2.offsetTop - rod2.offsetHeight) + 'px';
        ballOffsetX = -2;
    }
    score = 0;
    isGameOn = false;

}



function store(rod, score) {

    if (score > maxScore) {
        maxScore = score;
        localStorage.setItem(storeName, rod);
        localStorage.setItem(storeScore, maxScore);
    }
    clearInterval(intervalID);
    resetBoard(rod);
    alert(rod + " wins with a score of " + (score * 100) + ". Max score is: " + (maxScore * 100));

}


window.addEventListener('keydown', function(){
    let rodOffset = 20;
    let rodRect = rod1.getBoundingClientRect();

    if(event.code === "Enter"){
        if(!isGameOn){
            isGameOn = true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY = ballRect.y;
            let ballDia = ballRect.width;
            let rod1Height = rod1.offsetHeight;
            let rod2Height = rod2.offsetHeight;
            let rod1Width = rod1.offsetWidth;
            let rod2Width = rod2.offsetWidth;

            intervalID = setInterval(function () {
                // Move ball 
                ballX += ballOffsetX;
                ballY += ballOffsetY;

                rod1X = rod1.getBoundingClientRect().x;
                rod2X = rod2.getBoundingClientRect().x;

                ball.style.left = ballX + 'px';
                ball.style.top = ballY + 'px';


                if ((ballX + ballDia) > windowWidth || ballX < 0) {
                    ballOffsetX = -ballOffsetX; // Reverses the direction
                }

                // It specifies the center of the ball on the viewport
                let ballPos = ballX + ballDia / 2;

                // Check for Rod 1
                if (ballY <= rod1Height) {
                    ballOffsetY = -ballOffsetY; // Reverses the direction
                    score++;

                    // Check if the game ends
                    if ((ballPos < rod1X) || (ballPos > (rod1X + rod1Width))) {
                        store(rod2Name, score);
                    }
                }

                // Check for Rod 2
                else if ((ballY + ballDia) >= (windowHeight - rod2Height)) {
                    ballOffsetY = -ballOffsetY; // Reverses the direction
                    score++;

                    // Check if the game ends
                    if ((ballPos < rod2X) || (ballPos > (rod2X + rod2Width))) {
                        store(rod1Name, score);
                    }
                }

            }, 10);

        }
    }
    if (event.code === "KeyD" && ((rodRect.x + rodRect.width) < window.innerWidth)) {
        rod1.style.left = (rodRect.x) + rodOffset + 'px';
        rod2.style.left = rod1.style.left;
    } 
    else if (event.code === "KeyA" && (rodRect.x > 0)) {
        rod1.style.left = (rodRect.x) - rodOffset + 'px';
        rod2.style.left = rod1.style.left;
    }
});


