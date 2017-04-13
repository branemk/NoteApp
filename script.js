
var inputText = $("#input");
var notes = $("#notes");


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



function addNote(value) {
    Notes.addNote(value);

}

function enterIsPressed(event) {
    return event.which === 13 ? true : false;
}