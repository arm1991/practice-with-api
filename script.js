import {
    getData,
    getDataInString,
    setHTML,
    clearHTML,
    toggleLoader,
} from "./helpers.js";

const PATH = "https://jsonplaceholder.typicode.com/posts";

async function handleFetchButtonClick(e) {
    try {
        clearHTML();
        toggleLoader();

        const data = await getData(PATH);
        renderData(data);
        setHeadingEvents();
    } catch (err) {
        console.error(err.message);
    } finally {
        toggleLoader();
    }
}

async function handleItemClick(id) {
    try {
        clearHTML();
        toggleLoader();

        const data = await getData(PATH, id);
        renderData(data);
    } catch (err) {
        console.error(err.message);
    } finally {
        toggleLoader();
    }
}

function renderData(data) {
    setHTML(getDataInString(data));
}

function setHeadingEvents() {
    document
        .getElementById("card-container")
        ?.addEventListener("click", (e) => {
            if (e.target.classList.contains("card-heading")) {
                handleItemClick(e.target.dataset.id);
            }
        });
}

document
    .getElementById("fetch-data__button")
    ?.addEventListener("click", handleFetchButtonClick);
