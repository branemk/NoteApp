var Notes = (function () {

    var notes = [];
    notes = JSON.parse(localStorage.Notes || "[]");
    // ************************************************************
    //     Show notes if they are saved localy    
    // ************************************************************

    if (notes.length > 0) {
        showNotes();
    }



    function addNote(newNote) {
        notes.push({
            text: newNote,
            completed: false
        });
        showNotes();
        saveLocaly();
    }

    function showNotes() {
        $("#notes").empty();

        for (var i = 0; i < notes.length; i++) {
            var notediv = $("<div>").addClass("note");

            var noteSpan = $("<span>", {
                id: i,
                class: notes[i].completed ? "completed" : null
            });

            var deleteButton = $("<i>", {
                id: i + "deletebutton",
                class: "deletebutton",


            });

            var checkBox = $("<input>", {
                id: "checkbox" + i,
                type: "checkbox",
                class: "checkbox",
                value: i,
                checked: notes[i].completed ? true : false
            });



            deleteButton.addClass("fa fa-trash-o");

            noteSpan.text(notes[i].text);
            noteSpan.addClass("notespan");
            noteSpan.attr("contenteditable", "true");
            notediv.append(checkBox);

            notediv.append(noteSpan);

            notediv.append(deleteButton);
            $("#notes").append(notediv);

        }
    }

    function deleteNote(notePosition) {
        notes.splice(notePosition, 1);
        saveLocaly();
        showNotes();
    }

    function toogleCompleted(notePosition) {
        console.log(notePosition);
        notes[notePosition].completed = notes[notePosition].completed ? false : true;
        saveLocaly();

        $("#" + notePosition).toggleClass("completed");


    }

    function editNote(notePosition, noteValue) {
        console.log(notePosition + "   " + noteValue);

        notes[notePosition].text = noteValue;
        saveLocaly();
        showNotes();
    }

    function saveLocaly() {
        localStorage.Notes = JSON.stringify(notes);

    }
    return {
        addNote: addNote,
        showNotes: showNotes,
        deleteNote: deleteNote,
        toogleCompleted: toogleCompleted,
        editNote: editNote
    };
})();