/* =========================
   StudyFlow Main Application
   ========================= */



// =========================
// PAGE NAVIGATION
// =========================


function showPage(pageName){


    const pages =
    document.querySelectorAll(".page");



    pages.forEach(page=>{


        page.classList.remove(
            "active"
        );


    });



    const selected =
    document.getElementById(
        pageName
    );



    if(selected){


        selected.classList.add(
            "active"
        );


    }



    updateTitle(pageName);


}






// =========================
// UPDATE PAGE TITLE
// =========================


function updateTitle(page){


    const title =
    document.getElementById(
        "pageTitle"
    );



    const titles = {


        dashboard:
        "Dashboard",


        homework:
        "Homework Manager",


        calendar:
        "Calendar",


        timer:
        "Pomodoro Timer",


        ai:
        "AI Homework Helper",


        settings:
        "Settings"


    };



    title.innerText =
    titles[page] || "StudyFlow";


}







// =========================
// DASHBOARD COUNTERS
// =========================


function updateDashboard(){



    const homework =
    getHomework();



    const total =
    homework.length;



    const completed =
    homework.filter(
        task =>
        task.completed
    ).length;



    const taskElement =
    document.getElementById(
        "taskCount"
    );



    const completeElement =
    document.getElementById(
        "completedCount"
    );



    if(taskElement){


        taskElement.innerText =
        total;


    }



    if(completeElement){


        completeElement.innerText =
        completed;


    }



}







// =========================
// DARK MODE
// =========================


const themeButton =
document.getElementById(
    "themeToggle"
);





function loadTheme(){


    const settings =
    getSettings();



    if(
        settings.theme === "light"
    ){


        document.body.classList.add(
            "light"
        );


        themeButton.innerText =
        "☀️";


    }


}







function toggleTheme(){


    document.body.classList.toggle(
        "light"
    );



    const isLight =
    document.body.classList.contains(
        "light"
    );



    themeButton.innerText =
    isLight ? "☀️" : "🌙";



    saveSettings({

        theme:
        isLight ?
        "light" :
        "dark"

    });


}






if(themeButton){


    themeButton.addEventListener(
        "click",
        toggleTheme
    );


}







// =========================
// GREETING
// =========================


function updateGreeting(){


    const hour =
    new Date().getHours();



    let greeting;



    if(hour < 12){

        greeting =
        "Good Morning ☀️";

    }

    else if(hour < 18){

        greeting =
        "Good Afternoon 🌤️";

    }

    else{

        greeting =
        "Good Evening 🌙";

    }



    const welcome =
    document.querySelector(
        ".welcome h1"
    );



    if(welcome){


        welcome.innerText =
        greeting +
        ", Welcome to StudyFlow 🚀";


    }


}







// =========================
// START APP
// =========================


document.addEventListener(
"DOMContentLoaded",
()=>{


    loadTheme();


    updateDashboard();


    updateGreeting();


});