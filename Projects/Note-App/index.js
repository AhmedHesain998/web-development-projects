const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

/* ---------- Storage ---------- */

function getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes));
}

/* ---------- Note operations ---------- */

function updateNote(id, content) {
    const notes = getNotes();
    const target = notes.find((note) => note.id === id);
    if (!target) return;
    target.content = content;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id !== id);
    saveNotes(notes);
    element.remove();
}

/* ---------- DOM creation ---------- */

function createNoteEl(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Empty Note";
    element.value = content;

    element.addEventListener("dblclick", () => {
        if (confirm("Do you want to delete this note?")) {
            deleteNote(id, element);
        }
    });

    element.addEventListener("input", () => {
        updateNote(id, element.value);
    });

    return element;
}

/* ---------- Actions ---------- */

function addNote() {
    const notes = getNotes();
    const noteObj = {
        id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
        content: ""
    };

    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    appEl.insertBefore(noteEl, btnEl);   // ✅ insert before the button

    notes.push(noteObj);
    saveNotes(notes);
}

function displayNotes() {
    const notes = getNotes();
    notes.forEach((note) => {
        const noteEl = createNoteEl(note.id, note.content);
        appEl.insertBefore(noteEl, btnEl);  // ✅ insert before the button
    });
}

/* ---------- Init ---------- */

btnEl.addEventListener("click", addNote);
displayNotes();   // ✅ run AFTER the listener is registered