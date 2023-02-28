//@ts-nocheck
let count = 0;
let addBtn = document.getElementById("add-button");
let removeBtn = document.getElementById("delete-button");

addBtn.ontouchstart = (e) => {
    e.preventDefault();
    document.getElementById("counter").innerText = count++;
}

addBtn.onclick = (e) => {
    e.preventDefault();
    document.getElementById("counter").innerText = count++;
}

addBtn.ontouchmove = (e) => {
    e.preventDefault();
}

addBtn.ontouchend = (e) => {
    e.preventDefault();
}

removeBtn.ontouchstart = (e) => {
    e.preventDefault();
    if (count == 0) return;
    document.getElementById("counter").innerText = count--;;
}

removeBtn.onclick = (e) => {
    e.preventDefault();
    if (count == 0) return;
    document.getElementById("counter").innerText = count--;;
}

removeBtn.ontouchmove = (e) => {
    e.preventDefault();
}

removeBtn.ontouchend = (e) => {
    e.preventDefault();
}