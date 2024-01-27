const newgamebutton = document.querySelector(".newgame");
const boxes = document.querySelectorAll(".box");
const gamestatus = document.querySelector(".game-info");

// now setting up some variables
let currentplayer;
let gridstatus;

const winposition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initgame(){
    currentplayer = "X";
    gridstatus = ["","","","","","","","",""];
    gamestatus.innerText = `Current Player - ${currentplayer}`;
    newgamebutton.classList.remove("active");

    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
}

initgame();

function swapPlayer(){
    if(currentplayer === "X"){
        currentplayer = "0";
    }
    else{
        currentplayer = "X";
    }
    gamestatus.innerText = `Current Player - ${currentplayer}`;
}

function checkstatus(){
    let ans = "";

    winposition.forEach((pos) => {
        if((gridstatus[pos[0]] !== "" && gridstatus[pos[1]] !== "" && gridstatus[pos[2]] !== "") && 
        (gridstatus[pos[0]] === gridstatus[pos[1]] && gridstatus[pos[1]] === gridstatus[pos[2]])){
            if(gridstatus[pos[0]] === "X"){
                ans = "X";
            }
            else{
                ans = "0";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            boxes[pos[0]].classList.add("win");
            boxes[pos[1]].classList.add("win");
            boxes[pos[2]].classList.add("win");
        }
    });

    if(ans !== ""){
        gamestatus.innerText = `Winner Player - ${ans}`;
        newgamebutton.classList.add("active");
        return;
    }

    let boxcounts = 0;
    gridstatus.forEach((box) => {
        if(box !== ""){
            boxcounts+=1;
        };
    });

    if(boxcounts === 9){
        gamestatus.innerText = "Game Tied !";
        newgamebutton.classList.add("active");
    }
}

function handleClick(index){
    if(gridstatus[index] === ""){
        boxes[index].innerText = currentplayer;
        gridstatus[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";

        swapPlayer();

        checkstatus();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
})

newgamebutton.addEventListener("click", initgame);