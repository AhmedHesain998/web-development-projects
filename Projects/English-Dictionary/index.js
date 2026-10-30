const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");

const audioBtnEl = document.getElementById("audio-btn");
const audioPlayerEl = document.getElementById("audio-player");

async function fetchAPI(word) {
    try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none";
        audioBtnEl.style.display = "none";
        infoTextEl.innerText = `Searching the meaning of "${word}"...`;

        // --- 1. Get definition from Datamuse ---
        const url = `https://api.datamuse.com/words?sp=${encodeURIComponent(word)}&md=d&qe=sp&max=1`;
        const result = await fetch(url).then((res) => res.json());

        if (!result.length || !result[0].defs || !result[0].defs.length) {
            throw new Error("No definition found");
        }

        const rawDef = result[0].defs[0];
        const firstSpace = rawDef.indexOf(" ");
        const definition = rawDef.slice(firstSpace + 1);

        // --- 2. Show definition immediately ---
        infoTextEl.style.display = "none";
        meaningContainerEl.style.display = "block";
        titleEl.innerText = result[0].word;
        meaningEl.innerText = definition;

        // --- 3. Fetch audio in the background (don't await it) ---
        loadAudio(word);

    } catch (error) {
        console.error("API Error:", error);
        meaningContainerEl.style.display = "none";
        infoTextEl.style.display = "block";
        infoTextEl.innerText = `Couldn't find a definition for "${word}".`;
    }
}

async function loadAudio(word) {
    audioBtnEl.style.display = "none";
    audioPlayerEl.src = "";

    try {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;
        const res = await fetch(url);
        if (!res.ok) return; // silently give up if audio API is down

        const data = await res.json();

        // Find the first available audio URL across all phonetics
        const phonetics = data[0]?.phonetics || [];
        const audioUrl = phonetics.find((p) => p.audio)?.audio;

        if (!audioUrl) return;

        audioPlayerEl.src = audioUrl;

        audioBtnEl.style.display = "inline-block";
        audioBtnEl.onclick = () => audioPlayerEl.play();

    } catch (err) {
        // Audio is optional — swallow the error so the app keeps working
        console.warn("Audio unavailable:", err);
    }
}
inputEl.addEventListener("keyup", (e) => {
    if (e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value)
    }
});