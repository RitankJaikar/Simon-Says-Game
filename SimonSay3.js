//HARD

let btns=["#box1","#box2","#box3","#box4"];

let gameSeq=[];
let userSeq=[];

let started=false;      //difference
let level=0;

let highScore=0;

let h2=document.querySelector("h2");
let p=document.querySelector("p");

p.innerText=`Your High Score: ${highScore}`;

document.addEventListener("keydown",function(event){
    if(started==false && event.key=="Enter"){
        console.log("game is started");
        started=true;
        levelUp();
        pressOrNot("on");   //on
    }
});

function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    }, 300);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 300);
}

function levelUp(){
    level++;
    h2.innerText=`Level ${level}`;

    let randIndex=Math.floor(Math.random()*4);
    let randColor=btns[randIndex];
    let randBtn=document.querySelector(randColor);
    gameSeq.push(randColor);
    gameFlash(randBtn);  

    console.log("gameSeq:",gameSeq);
}

function btnPress(){
    let btn=this;
    btn.getAttribute("id");
    userSeq.push(`#${btn.getAttribute("id")}`);
    userFlash(btn);
    console.log("userSeq:",userSeq);

    let correct=false;
    if(userSeq.length<=gameSeq.length){
        if(userSeq[userSeq.length-1]==gameSeq[userSeq.length-1]){
            correct=true;
            console.log("correct");
        }
        else{
            correct=false;
            console.log("incorrect");
        }
    }
    if(correct==false){
        theEndReset();
    }
    else if(userSeq.length==gameSeq.length){
        userSeq=[];
        pressOrNot("off");
        setTimeout(function(){
            pressOrNot("on");
            levelUp();
        },1000);
    }
}

let allBtns=document.querySelectorAll(".btn");
function pressOrNot(press){      //difference
    for(let btn of allBtns){
        if(press=="on"){
            btn.addEventListener("click",btnPress);
            console.log("Press ON");
        }
        else if(press=="off"){
            btn.removeEventListener("click",btnPress);
            console.log("Press OFF");
        }
    }
}

function theEndReset(){
    if(highScore<level){
        highScore=level;
        p.innerText=`Your High Score: ${highScore}`;
    }
    h2.innerHTML=`<p style="color: red">GAME OVER!</p> Your Score: ${level}<br>Press "Enter" to restart the game`;
    gameSeq=[];
    userSeq=[];
    started=false;
    ended=true;
    level=0;
    pressOrNot("off");   //off

    let body=document.querySelector("body");
    body.classList.add("red");
    setTimeout(function(){
        body.classList.remove("red");
    },500)
}