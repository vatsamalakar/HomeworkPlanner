/* =========================
   StudyFlow Pomodoro Timer
   ========================= */


let timer;

let timeLeft = 25 * 60;

let running = false;

let mode = "Focus";





function updateTimerDisplay(){


    let minutes =
    Math.floor(timeLeft / 60);



    let seconds =
    timeLeft % 60;




    document.getElementById(
        "timerDisplay"
    ).innerText =


    `${minutes}:${seconds
    .toString()
    .padStart(2,"0")}`;


}







function startTimer(){


    if(running)
    return;



    running=true;



    timer =
    setInterval(()=>{


        timeLeft--;



        updateTimerDisplay();



        if(timeLeft <= 0){


            finishSession();


        }



    },1000);



}







function pauseTimer(){


    running=false;


    clearInterval(timer);


}








function resetTimer(){


    pauseTimer();



    timeLeft =
    mode==="Focus"
    ?
    25*60
    :
    5*60;



    updateTimerDisplay();



}








function finishSession(){


    pauseTimer();




    if(mode==="Focus"){


        addStudyTime();



        alert(
        "Focus complete! Take a break ☕"
        );



        mode="Break";


        timeLeft=
        5*60;



    }


    else{


        alert(
        "Break finished! Back to work 🚀"
        );


        mode="Focus";


        timeLeft=
        25*60;


    }





    document.getElementById(
        "timerMode"
    ).innerText =
    mode +
    " Session";



    updateTimerDisplay();



}









function addStudyTime(){


    let stats =
    getStats();



    if(!stats.minutes){


        stats.minutes=0;


    }



    if(!stats.xp){


        stats.xp=0;


    }




    stats.minutes +=25;



    stats.xp +=50;




    saveStats(stats);




    updateStats();



}








function updateStats(){


    let stats =
    getStats();




    document.getElementById(
        "focusMinutes"
    ).innerText =



    `${stats.minutes || 0} minutes`;





    document.getElementById(
        "xpCount"
    ).innerText =



    `${stats.xp || 0} XP`;



}








document.addEventListener(
"DOMContentLoaded",
()=>{


    updateTimerDisplay();


    updateStats();


});