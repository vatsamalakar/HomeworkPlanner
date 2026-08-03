/* =========================
   StudyFlow Calendar System
   ========================= */



let calendar;





function loadCalendar(){


    const calendarElement =
    document.getElementById(
        "calendarBox"
    );



    if(!calendarElement)
    return;





    calendar =
    new FullCalendar.Calendar(
        calendarElement,
        {


        initialView:
        "dayGridMonth",



        height:
        650,



        headerToolbar:{


            left:
            "prev,next today",


            center:
            "title",


            right:
            "dayGridMonth,timeGridWeek"

        },





        events:
        getCalendarEvents(),




        eventClick:function(info){


            alert(

            info.event.title

            );


        }



        }



    );



    calendar.render();


}







function getCalendarEvents(){


    const homework =
    getHomework();



    return homework.map(task=>{


        let color;



        if(task.priority==="Low"){

            color="#22c55e";

        }


        else if(task.priority==="Medium"){

            color="#eab308";

        }


        else if(task.priority==="High"){

            color="#f97316";

        }


        else{

            color="#ef4444";

        }





        return{


            title:
            task.title,


            start:
            task.date,


            backgroundColor:
            color,


            borderColor:
            color



        };


    });



}








function refreshCalendar(){


    if(calendar){


        calendar.removeAllEvents();


        calendar.addEventSource(
            getCalendarEvents()
        );


    }


}







document.addEventListener(
"DOMContentLoaded",
()=>{


    loadCalendar();


});