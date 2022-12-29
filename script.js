const container = document.querySelector("#container");
const input = document.querySelector("#newSize");
let gradient = 0;
resize(16);
resetListener();

function resize(size) {
    document.getElementById("container").style.columns = `${size}`;
    for(let i= 0; i < size*size; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.textContent="";
        box.gradient = 0;
        container.appendChild(box);
    }
    resetListener();
}

function clear(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function resetListener() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.addEventListener("mouseenter", () => {
            box.gradient += 0.1;
            box.style.backgroundColor = `rgba(0,0,0,${box.gradient})`;
        });
    });
}


input.addEventListener("click", ()=> {
   let size = parseInt(prompt("Enter the size you want the grid to be in terms of boxes. Do not enter a number larger than 100: "));
    if(size > 100) {
        document.querySelector("#info").textContent = "Sorry, that is too large.";
    } else {
        clear(container);
        resize(size);
    }
});