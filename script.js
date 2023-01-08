const container = document.querySelector("#container");
const form = document.querySelector("#form");
let input = document.querySelector("#input");
const clearBtn = document.querySelector("#clear");
const colorPicker = document.querySelector("#colorpicker");
let currColor = '#000000'; //stored in hex form
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
            box.style.backgroundColor = hexToRGBA(currColor, box.gradient);
        });
    });
}

function hexToRGBA(hex, gradient) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    return "rgba(" + r + ", " + g + ", " + b + ", " + gradient + ")";
}

form.addEventListener("submit", e => {
    e.preventDefault();
   let size = document.querySelector('input[name=input]').value;
   if(size === "") {
    document.querySelector("#info").textContent = "Sorry, please enter a number.";
   } else if(size <= 0) {
        document.querySelector("#info").textContent = "Sorry, please enter a positive number.";
    } else if(size > 100) {
        document.querySelector("#info").textContent = "Sorry, that is too large.";
    } else {
        console.log(size);
        currsize = size;
        clear(container);
        resize(size);
    }
});

clearBtn.addEventListener("click", () => {
    clear(container);
    resize(currsize);
})

colorPicker.addEventListener("change", (e) => {
    currColor = e.target.value;
    resetListener();
})


