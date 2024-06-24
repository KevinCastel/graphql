//Manage front-end side

import * as Chart from "./chart.js";

let themeLight = "light";

function showPersonalInformation(datas = Object, mainElement = HTMLElement, divInfosUser = HTMLDivElement) {
    //Create new stuffs that are indeed on the dom
    //create div and manage-it for user works informations

    const personalInfos = document.createElement("div");
    personalInfos.id = "personal-infos";
    personalInfos.style.width = "100%";
    personalInfos.style.height = "fit-content";

    const divTabs = getDivTabs();

    personalInfos.appendChild(divTabs.TopDiv.div);
    personalInfos.appendChild(divTabs.BottomDiv.div);
    personalInfos.style.backgroundColor = "rgb(120,120,120, 0.5)";

    divInfosUser.appendChild(personalInfos);
    // divInfosUser.style.backgroundColor = "red";

    mainElement.appendChild(divInfosUser);

    const phoneNumber = document.createElement("h3");
    phoneNumber.innerText = datas.phone;
    phoneNumber.style.textAlign = "center";
    const addressLocation = document.createElement("h3");
    addressLocation.innerText = datas.addressCity;

    divTabs.BottomDiv.children.LeftDiv.appendChild(phoneNumber);
    divTabs.TopDiv.children.LeftDiv.appendChild(addressLocation);

    //Manage div parent for organizing sub-contents

    const inscriptionDate = document.createElement("h3");
    inscriptionDate.innerText = datas.userCreationDate;
    divTabs.TopDiv.children.RightDiv.appendChild(inscriptionDate);
    const birthday = document.createElement("h3");
    birthday.innerText = datas.birthdate;

    divTabs.BottomDiv.children.RightDiv.appendChild(birthday)

    const divTop = document.createElement("div");
    divTop.classList.add("class-grid")
    divTop.id = "grid-top";

    const divBottom = document.createElement("div");
    divBottom.classList.add("class-grid");
    divBottom.id = "grid-bottom";
    divBottom.style.backgroundColor = "red";
    mainElement.appendChild(divTop);
    mainElement.appendChild(divBottom);

    const divFlex = document.createElement("div");
    divFlex.classList.add("grid-flex");
    divFlex.id = "grid-flex";

    let title = document.createElement("h2");
    title.innerText = "Graph";

    divTop.appendChild(title);
    // divFlex.appendChild(chart);
    divTop.appendChild(divFlex);
}

function showWorkInformation(datas = Object, mainElement = HTMLElement, divInfosUser = HTMLDivElement) {
    const workInfos = document.createElement("div");
    workInfos.id = "work-infos";
    workInfos.backgroundColor = "red";
    workInfos.style.width = "100%";
    workInfos.style.height = "fit-content";

    const tabDivs = getDivTabs();
    workInfos.appendChild(tabDivs.TopDiv.div);
    workInfos.appendChild(tabDivs.BottomDiv.div);
    workInfos.style.backgroundColor = "rgb(120,120,120, 0.5)";

    const auditRatioInfo = document.createElement("h3");
    auditRatioInfo.innerText = `Audit Ratio : ${datas.auditRatio}`;
    auditRatioInfo.style.width = "100%";
    auditRatioInfo.style.textAlign = "left";

    tabDivs.TopDiv.children.RightDiv.appendChild(auditRatioInfo);

    const maxProjetDone = document.createElement("h3");
    maxProjetDone.innerText = `Projects done : ${datas.maxProjectDone}`

    tabDivs.TopDiv.children.LeftDiv.appendChild(maxProjetDone)

    const campusLocation = document.createElement("h3");
    campusLocation.innerText = `Campus ${datas.campusLocation}`;
    campusLocation.style.width = "100%";
    campusLocation.style.textAlign = "left";

    tabDivs.BottomDiv.children.RightDiv.appendChild(campusLocation);

    divInfosUser.appendChild(workInfos);
}




export function showStatsPage(datas = Array, xps = Array) {
    const mainElement = document.querySelector("main");

    const divInfosUser = document.createElement("div");
    divInfosUser.id = "infosUser";
    divInfosUser.style.height = "100px";
    divInfosUser.style.width = "100%";
    divInfosUser.style.display = "flex";
    divInfosUser.style.flexDirection = "row";
    divInfosUser.style.alignItems = "center";

    //Manage stuffs that already exists on the dom
    mainElement.innerText = "";
    const header = document.querySelector("header");
    header.querySelector("h1").innerText = `Welcome Mr.${datas.lastName} ${datas.firstName}`;
    header.querySelector("h2").innerText = `${datas.mail}`;

    showWorkInformation(datas, mainElement, divInfosUser);
    showPersonalInformation(datas, mainElement, divInfosUser);

    //Manage sub-content
    Chart.drawChart(xps, mainElement);


    ShowProgressBarContent(mainElement, datas);
}

function ShowProgressBarContent(mainElement, datas) {
    const divAuditsRatio = document.createElement("div");
    divAuditsRatio.style.width = "100%";
    divAuditsRatio.style.height = "150px";
    divAuditsRatio.style.display = "flex";
    divAuditsRatio.style.flexDirection = "row";

    const divProgressBar = document.createElement("div");
    divProgressBar.style.width = "100%";
    divProgressBar.style.height = "100%";
    divProgressBar.id = "progress_bar_container";
    divProgressBar.style.display = "flex";
    divProgressBar.style.alignItems = "center";
    divProgressBar.style.flexDirection = "column";
    divProgressBar.style.backgroundColor = "rgba(120, 120, 120)";
    divProgressBar.style.borderLeft = "2px dotted"
    divProgressBar.style.borderTop = "2px solid"

    const legendContainer = document.createElement("div");
    legendContainer.style.width = "100%";
    legendContainer.style.height = "100%";
    legendContainer.style.backgroundColor = "rgba(120, 120, 120)";
    legendContainer.style.borderTop = "2px solid";

    Chart.createLegendProgressBar(legendContainer);

    const divTitle = document.createElement("div");
    divTitle.style.width = "auto";
    divTitle.style.height = "auto";
    
    const titleProgressBar = document.createElement("h3");
    titleProgressBar.innerText = "Audits Ratio - Progress bar of audits ratio received";

    divTitle.style.marginLeft = "2%";
    divTitle.style.marginTop = "2%";
    divTitle.style.borderBottom = "2px dotted";

    divTitle.appendChild(titleProgressBar);
    divProgressBar.appendChild(divTitle);

    divAuditsRatio.appendChild(legendContainer);
    divAuditsRatio.appendChild(divProgressBar);
    mainElement.appendChild(divAuditsRatio);

    Chart.drawProgressBar(datas.totalUp, datas.totalDown, divProgressBar);
}

//Called for building tab of div like that
/*
            _________
            |   |   |
            _________
            |   |   |
            _________
*/
function getDivTabs() {
    const tabs = {
        TopDiv: {
            "children": {
                LeftDiv: document.createElement("div"),
                RightDiv: document.createElement("div")
            },
            "div": document.createElement("div")
        },
        BottomDiv: {
            "children": {
                LeftDiv: document.createElement("div"),
                RightDiv: document.createElement("div")
            },
            "div": document.createElement("div")
        },
    };

    //Manage parent main divs: 'bottom' and 'top'
    tabs.TopDiv.div.style.height = "100%";
    tabs.TopDiv.div.style.width = "100%";
    tabs.TopDiv.div.style.display = "flex";
    tabs.TopDiv.div.style.flexDirection = "row";

    tabs.BottomDiv.div.style.height = "100%";
    tabs.BottomDiv.div.style.width = "100%";
    tabs.BottomDiv.div.style.display = "flex";
    tabs.BottomDiv.div.style.flexDirection = "row";

    tabs.TopDiv.div.appendChild(tabs.TopDiv.children.LeftDiv);
    tabs.TopDiv.div.appendChild(tabs.TopDiv.children.RightDiv);

    //Manage children divs of 'bottom' and 'top'
    tabs.TopDiv.children.LeftDiv.style.width = "100%";
    tabs.TopDiv.children.LeftDiv.style.height = "35px";
    tabs.TopDiv.children.LeftDiv.style.flexWrap = "wrap";
    tabs.TopDiv.children.LeftDiv.style.display = "flex";
    tabs.TopDiv.children.LeftDiv.style.justifyContent = "center"
    tabs.TopDiv.children.LeftDiv.style.alignContent = "center"

    tabs.TopDiv.children.RightDiv.style.width = "100%";
    tabs.TopDiv.children.RightDiv.style.height = "35px";
    tabs.TopDiv.children.RightDiv.style.flexWrap = "wrap";
    tabs.TopDiv.children.RightDiv.style.display = "flex";
    tabs.TopDiv.children.RightDiv.style.justifyContent = "center";
    tabs.TopDiv.children.RightDiv.style.alignItems = "center";

    tabs.BottomDiv.children.LeftDiv.style.width = "100%";
    tabs.BottomDiv.children.LeftDiv.style.height = "35px";
    // tabs.BottomDiv.children.LeftDiv.style.backgroundColor = "green";
    tabs.BottomDiv.children.LeftDiv.style.justifyContent = "center";
    tabs.BottomDiv.children.LeftDiv.style.alignContent = "center";
    tabs.BottomDiv.children.LeftDiv.style.flexWrap = "wrap";

    tabs.BottomDiv.children.RightDiv.style.width = "100%";
    tabs.BottomDiv.children.RightDiv.style.height = "35px";
    // tabs.BottomDiv.children.RightDiv.style.backgroundColor = "yellow";
    tabs.BottomDiv.children.RightDiv.style.display = "flex";
    tabs.BottomDiv.children.RightDiv.style.justifyContent = "center";
    tabs.BottomDiv.children.RightDiv.style.alignContent = "center";
    tabs.BottomDiv.children.RightDiv.style.flexWrap = "wrap";

    // tabs.BottomDiv.children.

    tabs.BottomDiv.div.appendChild(tabs.BottomDiv.children.LeftDiv);
    tabs.BottomDiv.div.appendChild(tabs.BottomDiv.children.RightDiv);
    return tabs
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

