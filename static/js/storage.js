/* =========================
   StudyFlow Local Storage
   Browser Database System
   ========================= */


/*
    This file replaces a database.

    Everything is saved inside
    the user's browser using
    localStorage.
*/





// =========================
// STORAGE KEYS
// =========================


const STORAGE_KEYS = {

    homework:
    "studyflow_homework",


    settings:
    "studyflow_settings",


    stats:
    "studyflow_stats",


    notes:
    "studyflow_notes"


};







// =========================
// GENERIC STORAGE FUNCTIONS
// =========================



function saveData(key, data){

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}



function getData(key){


    const data =
    localStorage.getItem(key);



    if(!data){

        return [];

    }


    return JSON.parse(data);

}







// =========================
// HOMEWORK STORAGE
// =========================



function saveHomework(homework){


    saveData(
        STORAGE_KEYS.homework,
        homework
    );


}





function getHomework(){


    return getData(
        STORAGE_KEYS.homework
    );


}







// ADD HOMEWORK


function addHomework(task){


    let homework =
    getHomework();



    task.id =
    Date.now();



    task.completed =
    false;



    homework.push(task);



    saveHomework(homework);


}







// DELETE HOMEWORK


function deleteHomework(id){


    let homework =
    getHomework();



    homework =
    homework.filter(
        task =>
        task.id !== id
    );



    saveHomework(homework);


}







// COMPLETE HOMEWORK


function completeHomework(id){


    let homework =
    getHomework();



    homework =
    homework.map(task=>{


        if(task.id === id){


            task.completed =
            !task.completed;


        }


        return task;


    });



    saveHomework(homework);


}









// =========================
// SETTINGS
// =========================



function saveSettings(settings){


    saveData(
        STORAGE_KEYS.settings,
        settings
    );


}



function getSettings(){


    return getData(
        STORAGE_KEYS.settings
    );


}







// =========================
// STUDY STATISTICS
// =========================



function saveStats(stats){


    saveData(
        STORAGE_KEYS.stats,
        stats
    );


}



function getStats(){


    return getData(
        STORAGE_KEYS.stats
    );


}







// =========================
// NOTES
// =========================



function saveNotes(notes){


    saveData(
        STORAGE_KEYS.notes,
        notes
    );


}




function getNotes(){


    return getData(
        STORAGE_KEYS.notes
    );


}







// =========================
// RESET APP
// =========================



function clearAllData(){


    localStorage.clear();


    console.log(
        "StudyFlow data deleted"
    );


}