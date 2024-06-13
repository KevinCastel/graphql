//Manage front-end side

let themeLight = "light";


export function showStatsPage(datas = Object) {
    const mainElement = document.querySelector("main");
    //Manage stuffs that already exists on the dom
    mainElement.innerText = "";
    const header = document.querySelector("header");
    header.querySelector("h1").innerText = `Welcome Mr.${datas.lastName} ${datas.firstName}`;
    header.querySelector("h2").innerText = `${datas.mail}`;
    const chart = drawChart();

    //Create new stuffs that are in deed on the dom
    //Manage div parent for organizing sub-contents
    const divTop = document.createElement("div");
    divTop.classList.add("class-grid")
    divTop.id = "grid-top";

    const divBottom = document.createElement("div");
    divBottom.classList.add("class-grid")
    divBottom.style.backgroundColor = "red";
    divTop.style.backgroundColor = "blue";

    mainElement.appendChild(divTop);
    mainElement.appendChild(divBottom);

    //Manage sub-content
    const divFlex = document.createElement("div");
    divFlex.classList.add("grid-flex");
    let title = document.createElement("h2");
    title.innerText = "Graph";
    divTop.appendChild(title);
    // divFlex.appendChild(chart);
    divTop.appendChild(divFlex);

    drawChart();
}


export function setThemeLight() {
    switch (themeLight) {
        case "light":
            themeLight = "dark";
            document.querySelector("main").style.backgroundColor = "hsla(50%,50%,50%)";
            break;
        default: //dark
            document.querySelector("main").style.backgroundColor = black;
            break;
    }
}

export function drawChart(data) {
    console.log("Drawing SVG");
    const main = document.querySelector("main");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "500");
    svg.setAttribute("height", "200");

    const datas = [3, 23, 12, 23, 42, 32, 43]
    datas.forEach((value, index) => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", 50 * (index + 1));
        rect.setAttribute("y", 200 - value);
        rect.setAttribute("width", "40");
        rect.setAttribute("height", value);
        rect.setAttribute("fill", `hsl(${Math.random() * 300}, 100%, 70%)`);
        svg.appendChild(rect);

    })

    document.getElementById("grid-top").appendChild(svg);

}



// export function getMailElement(mail=String) {
//     const header = document.querySelector("header");
//     const mailStatic = document.createElement("h2");
//     mailStatic.style.height = "100%";
//     mailStatic.style.width = "100%";
//     mailStatic.style.color= "red"
//     mailStatic.style.flexDirection = "rox";
//     mailStatic.innerText = mail;
//     header.appendChild(mailStatic);
//     return mail;
//     }
// document.addEventListener('DOMContentLoaded', function(){

//     const blue = document.querySelector("header");
//     const red = document.createElement("h2");
//     red.className = "choubidou";
//     red.innerText = "choubidoubidou d'amour"

//     blue.appendChild(red)
//         red.style.height = "100%";
//      red.style.width = "100%";
//      red.style.color= "red";

// });


export function managePasswordElement() {
    let buttonPasswordVisibility;
    buttonPasswordVisibility = document.getElementById("password_visibility_field")
    //Event listener for style elements
    if (buttonPasswordVisibility) {
        buttonPasswordVisibility.addEventListener("click", setPasswordVisibility, buttonPasswordVisibility)
    } else {
        console.warn("'password_visibility_field' doesn't exist yet.");
        return;
    }
}

//Called for showing or hiding chars of password
export function setPasswordVisibility(buttonPasswordVisibility) {
    const inputPassword = document.getElementById("password_field");
    if (inputPassword === undefined) {
        console.warn("'inputPassword' is undefined.");
    }
    const typeInput = inputPassword.type;
    let className = ".gg-eye-alt";
    if (typeInput == "password") {
        className = ".gg-eye"
    }
    const query = document.querySelectorAll(className);
    if (query.length == 0) {
        console.warn("No element was found :", query, " with the class name:", className);
        return;
    }
    switch (typeInput) {
        case "text":
            inputPassword.type = "password"
            query[0].className = "gg-eye";
            break;
        default: //password
            inputPassword.type = "text"
            query[0].className = "gg-eye-alt";
            break;
    }
}

