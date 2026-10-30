const btnEl = document.getElementById("btn")
const galleryEl = document.getElementById("gallery")
const errorMessageEl = document.getElementById("errorMessage")

async function fetchImage() {
    const inputValue = document.getElementById("input").value;
    if (inputValue > 10 || inputValue < 1) {
        errorMessageEl.style.display = "block";
        errorMessageEl.innerText = "Number shout be between 0 and 11"
        return
    }

    let urls = "";

    try {
        btnEl.style.display = "none";
        const loading = `<img src="spinner.svg">`
        galleryEl.innerHTML = loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random()) * 1000}&client_id=DsHp1dsIP2mZ3eYMbx4WsLdyc8Rloy-SGmkBWdGTSoE`).then((res) => res.json().then((data) => {
            if (data) {
                data.forEach((pic) => {
                    urls += `
                    <img src="${pic.urls.small}" alt="image"/>
                    `
                    galleryEl.style.display = "block";
                    galleryEl.innerHTML = urls;
                    btnEl.style.display = "block";
                    errorMessageEl.style.display = "none";
                })
            }
        })
        );

    } catch (error) {
        console.log(error);
        errorMessageEl.style.display = "block";
        errorMessageEl.innerText = "An error happened , try again later!"
        btnEl.style.display = "block";
    }


}

btnEl.addEventListener("click", fetchImage)