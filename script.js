const container = document.querySelector("#container");
const form = document.querySelector("#form");
let input = document.querySelector("#input");
const clearBtn = document.querySelector("#clear");
let gradient = 0;
let currsize = 16;
resize(currsize);
resetListener();

function resize(size) {
    let paddingSize = `${450/(2*size)}px`;
    document.getElementById("container").style.columns = `${size}`;
    for(let i= 0; i < size*size; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.textContent="";
        box.gradient = 0;
        box.style.padding = paddingSize;
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


form.addEventListener("submit", e => {
    e.preventDefault();
   let size = document.querySelector('input[name=input]').value;
    if(size > 100) {
        document.querySelector("#info").textContent = "Sorry, that is too large.";
    } else {
        currsize = size;
        clear(container);
        resize(size);
        input.value = "";
    }
});

clearBtn.addEventListener("click", () => {
    clear(container);
    resize(currsize);
})
