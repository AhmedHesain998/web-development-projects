const btnEl = document.getElementById("btn")

const emojiNameEl = document.getElementById("emoji-name")


const emoji = [];

async function getEmoji() {
    let response = await fetch("https://emoji-api.com/emojis?access_key=523fd83c712a9e1c8627200d2856e583247803f8")
    data = await response.json()
    console.log(data)

    for (let i = 0; i < 1500; i++) {
        emoji.push({
            emojiName: data[i].character,
            emojiCode: data[i].unicodeName
        }
        )
    }
}

getEmoji()

btnEl.addEventListener("click", () => {
    const randomNumber = Math.floor(Math.random() * emoji.length);
    btnEl.innerText = emoji[randomNumber].emojiName;
    emojiNameEl.innerText = emoji[randomNumber].emojiCode;
})