// keypress -> game starts 
// btnflash + level 1 starts
// gameseq which is given by game
// userseq which user presses
// we check userseq and gameseq aligns or not 
// if matches level up 
// else end game 
let gameSeq=[];
let userSeq=[];
let btns=["red","yellow","green","purple"];
let started=false;
let level=0;
let highestscore=0;
let h3=document.querySelector("h3");
let h2=document.querySelector("h2");
function btnflash(){
    btnflash.classList.add("flash");
    setTimeout(function (){
        btnflash.classList.remove("flash");
    },1000);
}

document.addEventListener("keypress",function () {
   if(started==false){
    console.log("game started");
    started=true;
    levelup();
   }
});
function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function (){
        btn.classList.remove("userFlash");
    },250);
}
function levelup(){
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;

    let randIdx=Math.floor(Math.random() * 3);
    let randColr=btns[randIdx];
    let randbtn=document.querySelector(`.${randColr}`);
    // console.log(randColr);
    // console.log(randIdx);
    // console.log(randbtn);
    gameSeq.push(randColr);
    console.log(gameSeq);
    gameflash(randbtn);
}

function checkAns(idx){
    // console.log("currlevel:",level);
    // let idx=level-1;
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
           setTimeout(levelup,1000);
        }
    }
    else{
        h2.innerHTML=`Game over! Your SCORE was <b>${level}</b> </br>Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        if(level>highestscore){
            highestscore=level;
            h3.innerText=`highestscore=${level}`;
        }
        reset();
    }
}

function btnPress() {
   
    let btn=this;
    userFlash(btn);
    usercolor=btn.getAttribute("id");
    console.log(usercolor);
    userSeq.push(usercolor);
    checkAns(userSeq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;

}