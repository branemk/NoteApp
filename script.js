
var inputText = $("#input");
var notes = $("#notes");
var toggleAll = $("#selectAll");
var AllActiveCompleteButtonsContainer = $("#buttons-All-Active-Completed-Container");

inputText.keypress(function (e) {
    if (enterIsPressed(e)) {
        addNote(inputText.val());
        inputText.val("");
    }
});


notes.click(function (event) {

    switch (event.target.className) {

        case "deletebutton fa fa-trash-o":

            Notes.deleteNote(parseInt(event.target.id));
            break;
        case "checkbox":
            console.log(event.target.value);
            Notes.toogleCompleted(parseInt(event.target.value));
            break;


    }

    

});

notes.focusout(function (event) {
    // ************************************************************
    //     Save editet note when focus is out from note span.    
    // ************************************************************
    if (event.target.nodeName === "SPAN") {
        var span = event.target;
        Notes.editNote(span.id, span.textContent);
    }
});

notes.keypress(function (event) {
    // ************************************************************
    //     Clear focus when enter is pressed on note span.    
    // ************************************************************
    if (enterIsPressed(event) && event.target.nodeName === "SPAN") {

        event.preventDefault();
        event.target.blur();

    }
});

AllActiveCompleteButtonsContainer.click(function (event) {
    switch (event.target.id) {
        case "showAll":
            resetActiveClass(event.target);
            Notes.showAll();
            break;
        case "ShowActive":
            resetActiveClass(event.target);  
            Notes.showActive();    
            break;
        case "ShowCompleted":
            resetActiveClass(event.target);  
            Notes.showCompleted();    
            break;
    }
});

toggleAll.click(function (event) {
    
    if ($(event.target).is(":checked")) {
        Notes.toggleAll(true);
    } else {
        Notes.toggleAll(false);  
    } 
});


function addNote(value) {
    Notes.addNote(value);

}

function enterIsPressed(event) {
    return event.which === 13 ? true : false;
}

function resetActiveClass(target) {
       $(".activeButton").removeClass("activeButton");
            $(target).addClass("activeButton");
}