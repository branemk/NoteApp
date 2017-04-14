var Notes = (function () {

    var notes = [];
    notes = JSON.parse(localStorage.Notes || "[]");
    // ************************************************************
    //     Show notes if they are saved localy    
    // ************************************************************

    if (notes.length > 0) {
        showNotes(getActiveButton());
    }



    function addNote(newNote) {
        notes.push({
            text: newNote,
            completed: false
        });
        showNotes(getActiveButton());
        saveLocaly();
    }

    function showNotes(completedValue) {
        $("#notes").empty();

        for (var i = notes.length - 1; i >= 0; i--) {
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

            // ***************************************************************
            //     We are showing only completed, active(not completed) or
            //         all notes based on passed completedValue value    
            // ***************************************************************    
            if (notes[i].completed === completedValue || completedValue === "All") {


                deleteButton.addClass("fa fa-trash-o");

                noteSpan.text(notes[i].text);
                noteSpan.addClass("notespan");
                noteSpan.attr("contenteditable", "true");
                notediv.append(checkBox);

                notediv.append(noteSpan);

                notediv.append(deleteButton);
                $("#notes").append(notediv);

            }
            // ***************************************************************
            //     We are seting All button(checkbox) every time because
            //      we want button to be checked based on how many
            //        notes are completed or not completed.
            // ***************************************************************  
            setAllButtonValue();

        }
    }

    function deleteNote(notePosition) {
        notes.splice(notePosition, 1);
        saveLocaly();
        showNotes(getActiveButton());
    }

    function toogleCompleted(notePosition) {

        notes[notePosition].completed = notes[notePosition].completed ? false : true;
        saveLocaly();

        $("#" + notePosition).toggleClass("completed");
        showNotes(getActiveButton());
        


    }

    function toggleAll(value) {

        notes.forEach(function (element) {
            element.completed = value;
        }, this);

        showNotes(getActiveButton());
        saveLocaly();
    }

    function editNote(notePosition, noteValue) {


        notes[notePosition].text = noteValue;
        saveLocaly();
        showNotes(getActiveButton());
    }

    function saveLocaly() {
        localStorage.Notes = JSON.stringify(notes);

    }

    function setAllButtonValue() {

        var checkedCheckboxs = getCheckedNotes();

        if (checkedCheckboxs === notes.length) {
            $("#selectAll").prop("checked", true);
        } else {
            $("#selectAll").prop("checked", false);
        }
    }

    function getCheckedNotes() {
        var completedNumber = 0;
        notes.forEach(function (element) {
            if (element.completed) {
                completedNumber++;
            }

        });
        return completedNumber;
    }

    function showCompleted() {
        showNotes(getActiveButton());
    }

    function showActive() {
        showNotes(getActiveButton());
    }

    function showAll() {
        showNotes(getActiveButton());
    }

    function getActiveButton() {
        var activeButtonid = $(".activeButton").attr("id");
        var returnValue;
        switch (activeButtonid) {
            case "showAll":
                returnValue = "All";
                break;
            case "ShowActive":
                returnValue = false;
                break;
            case "ShowCompleted":
                returnValue = true;
                break;
        }
        return returnValue;
    }
    return {
        addNote: addNote,
        showNotes: showNotes,
        deleteNote: deleteNote,
        toogleCompleted: toogleCompleted,
        editNote: editNote,
        toggleAll: toggleAll,
        showCompleted: showCompleted,
        showActive: showActive,
        showAll: showAll

    };
})();