//EASY

let btns=["#box1","#box2","#box3","#box4"];

let gameSeq=[];
let userSeq=[];

let started=false;
let ongoing=false;
let ended=false;
let level=0;

let highScore=0;    //difference
let p=document.querySelector("p");
p.innerText=`Your High Score: ${highScore}`;

let h2=document.querySelector("h2");

document.addEventListener("keydown",function(event){
    if(started==false && event.key=="Enter"){
        console.log("game is started");
        started=true;
        ended=false;
        levelUp();
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
    ongoing=true;
    pressOrNot();   //off
    h2.innerText=`Level ${level}`;

    let randIndex=Math.floor(Math.random()*4);
    let randColor=btns[randIndex];
    gameSeq.push(randColor); 
    let index=0;
    let id=setInterval(function(){
        if(index==gameSeq.length){
            ongoing=false;
            pressOrNot();   //on
            clearInterval(id);
        }
        if(index<gameSeq.length){
            let randBtn=document.querySelector(`${gameSeq[index]}`);
            gameFlash(randBtn);
        }
        index++;
    },600);

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
        levelUp();
    }
}

let allBtns=document.querySelectorAll(".btn");
function pressOrNot(){      //difference
    for(let btn of allBtns){
        if(ended==true || ongoing==true){
            btn.removeEventListener("click",btnPress);
            console.log("Press OFF");
        }
        else if(started==true && ongoing==false){
            btn.addEventListener("click",btnPress);
            console.log("Press ON");
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
    pressOrNot();   //off

    let body=document.querySelector("body");
    body.classList.add("red");
    setTimeout(function(){
        body.classList.remove("red");
    },500)
}