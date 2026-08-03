/* =========================
   StudyFlow Homework Manager
   ========================= */



function loadHomework(){


    const list =
    document.getElementById(
        "homeworkList"
    );


    if(!list)
    return;



    list.innerHTML="";



    const homework =
    getHomework();




    if(homework.length === 0){


        list.innerHTML = `

        <div class="empty">

        No homework yet 🎉

        </div>

        `;


        return;

    }






    homework.forEach(task=>{


        const card =
        document.createElement(
            "div"
        );



        card.className =
        "homework-card";



        card.innerHTML = `


        <div>


        <h2>
        ${task.title}
        </h2>



        <p>
        📚 ${task.subject}
        </p>



        <p>
        📅 ${task.date}
        </p>




        <span class="priority ${task.priority}">

        ${task.priority}

        </span>



        </div>





        <div>


        <button onclick="toggleHomework(${task.id})">

        ${
        task.completed
        ?
        "Undo"
        :
        "Complete"
        }

        </button>





        <button onclick="removeHomework(${task.id})">

        Delete

        </button>



        </div>



        `;




        if(task.completed){


            card.classList.add(
                "done"
            );


        }




        list.appendChild(card);



    });



}









function createHomework(){


    const title =
    document.getElementById(
        "taskTitle"
    ).value;




    const subject =
    document.getElementById(
        "taskSubject"
    ).value;




    const date =
    document.getElementById(
        "taskDate"
    ).value;




    const priority =
    document.getElementById(
        "taskPriority"
    ).value;







    if(
        !title ||
        !subject ||
        !date
    ){


        alert(
        "Please fill all fields!"
        );


        return;


    }






    addHomework({

        title:title,

        subject:subject,

        date:date,

        priority:priority

    });






    document.getElementById(
        "taskTitle"
    ).value="";



    document.getElementById(
        "taskSubject"
    ).value="";



    document.getElementById(
        "taskDate"
    ).value="";






    loadHomework();


    updateDashboard();



    if(typeof refreshCalendar === "function"){

        refreshCalendar();

    }


}









function toggleHomework(id){


    completeHomework(id);


    loadHomework();


    updateDashboard();



    refreshCalendar();


}








function removeHomework(id){


    deleteHomework(id);


    loadHomework();


    updateDashboard();



    refreshCalendar();


}









document.addEventListener(
"DOMContentLoaded",
()=>{


    loadHomework();


});