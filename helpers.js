export function getDataInString(data) {
    if (Array.isArray(data) && data.length > 0) {
        return data.reduce((acc, cur) => {
            return acc + getRenderItem(cur);
        }, "");
    }
    return getRenderItem({ ...data, single: true });
}

function getRenderItem({ title, body, id, single }) {
    let length = single ? body.length : 30;
    return `
        <div class="card">
            <h4 class="card-heading" data-id="${id}">${title}</h4>
            <p class="card-text">${truncateString(body, length)}</p>
        </div>
    `;
}

function truncateString(str, num) {
    if (num >= str.length) return str;
    if (num <= 3) {
        return `${str.slice(0, num).trim()}...`;
    }
    return `${str.slice(0, num - 3).trim()}...`;
}

export async function getData(path, id) {
    try {
        const route = id ? `${path}/${id}` : path;
        const data = await fetch(route);

        return await data.json();
    } catch (err) {
        return err;
    }
}

export function clearHTML() {
    const cardContainer = document.getElementById("card-container");
    if (!cardContainer) return;

    cardContainer.innerHTML = "";
}

export function setHTML(html) {
    const cardContainer = document.getElementById("card-container");
    if (!cardContainer) return;

    cardContainer.innerHTML = html;
}

export function toggleLoader() {
    document.getElementById("loader")?.classList.toggle("hide");
}
