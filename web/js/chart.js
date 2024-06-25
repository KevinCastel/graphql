const scaleValue = 10000;

export function drawChart(datas, mainElement = HTMLElement) {
    console.log("Drawing SVG");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.backgroundColor = "antiquewhite"; // Ajout d'une couleur de fond pour vérifier la visibilité

    const svgheight = 400;  // La hauteur totale du SVG
    const svgwidth = 600;
    const barwidth = 10;

    svg.setAttribute("width", svgwidth.toString());
    svg.setAttribute("height", svgheight.toString());

    const svgTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
    svgTitle.setAttribute("x", "50");
    svgTitle.setAttribute("y", "20");
    svgTitle.setAttribute("fill", "black");
    svgTitle.textContent = "Graphique des ratios d'XP données par des exercices";
    svg.appendChild(svgTitle);

    // Créer un groupe pour les rectangles
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

    datas.forEach((value, index) => {
        // console.log("value:", value);
        const amount = value.amount / 40
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", ((svgwidth - (datas.length * barwidth)) / 2 + barwidth * index).toString()); // Positionnement horizontal de la barre
        rect.setAttribute("y", (svgheight - amount).toString()); // Positionnement vertical de la barre
        rect.setAttribute("width", barwidth.toString()); // Largeur fixe de la barre
        rect.setAttribute("height", amount.toString()); // Hauteur basée sur la valeur des données
        rect.setAttribute("fill", `hsl(${Math.random() * 300}, 100%, 70%)`); // Couleur aléatoire pour chaque barre
        g.appendChild(rect); // Ajouter la barre au groupe
    });

    svg.appendChild(g); // Ajouter le groupe au SVG
    document.getElementById("grid-flex").appendChild(svg); // Ajouter le SVG au conteneur
}

//draw progress bar for audits ratio
export function drawProgressBar(totalUp = Number, totalDown = Number, mainElement = HTMLElement) {
     // for normalizing value
    const colorMaxReceived = "rgb(50,50,50)";
    const svgWidth = (totalUp + totalDown) / scaleValue;
    const svgHeight = svgWidth / 6;

    const divSVGProgressBar = document.createElement("div");
    divSVGProgressBar.style.width = "100%";
    divSVGProgressBar.style.height = "100%";
    divSVGProgressBar.style.display = "flex";
    divSVGProgressBar.style.flexDirection = "column";
    divSVGProgressBar.style.justifyContent = "center";
    divSVGProgressBar.style.alignItems = "center";
    divSVGProgressBar.style.marginBottom = "20px";

    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("width", svgWidth.toString());
    svgElement.setAttribute("height", svgHeight);
    svgElement.style.backgroundColor = "gray";

    const gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");

    const rectMaxValueReceived = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectMaxValueReceived.setAttribute("x", "0");
    rectMaxValueReceived.setAttribute("y", "0");
    rectMaxValueReceived.setAttribute("width", (totalUp / scaleValue).toString());
    rectMaxValueReceived.setAttribute("height", svgHeight);
    rectMaxValueReceived.setAttribute("fill", colorMaxReceived);

    const rectMinValueReceived = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectMinValueReceived.setAttribute("x", (totalUp / scaleValue).toString());
    rectMinValueReceived.setAttribute("y", "0");
    rectMinValueReceived.setAttribute("width", (totalDown / scaleValue).toString());
    rectMinValueReceived.setAttribute("height", svgHeight);
    rectMinValueReceived.setAttribute("fill", "white");

    


    gElement.appendChild(rectMaxValueReceived);
    gElement.appendChild(rectMinValueReceived);
    svgElement.appendChild(gElement);
    divSVGProgressBar.id = "svg_container";

    divSVGProgressBar.appendChild(svgElement);

    
    const valuesInformationContainer = document.createElement("div");
    valuesInformationContainer.style.width = "400px";
    valuesInformationContainer.style.height = "auto";
    valuesInformationContainer.style.display = "flex";
    valuesInformationContainer.style.flexDirection = "row";
    valuesInformationContainer.style.paddingLeft = "70px";
    

    const divInfoAuditMin = document.createElement("div");

    const infoAuditMax = document.createElement("h4");
    infoAuditMax.innerText = "Max Received";
    infoAuditMax.style.width = "auto";
    infoAuditMax.style.height = "auto";
    infoAuditMax.style.color = rectMaxValueReceived;

    valuesInformationContainer.appendChild(infoAuditMax);

    const infoAuditMin = document.createElement("h4");
    infoAuditMin.innerText = "Min Received";
    infoAuditMin.style.width = "auto";
    infoAuditMin.style.height = "auto";
    infoAuditMin.style.marginLeft = "70px";
    infoAuditMin.style.color = "white";
    valuesInformationContainer.appendChild(infoAuditMin);
    

    const valueMaxReceived = document.createElementNS("http://www.w3.org/2000/svg", "text");
    valueMaxReceived.textContent = totalUp;
    valueMaxReceived.setAttribute("x",
            (((totalUp/scaleValue)/2)-(valueMaxReceived.textContent.length*4)).toString());
    valueMaxReceived.setAttribute("y", (svgHeight/2).toString());
    valueMaxReceived.setAttribute("fill", "white");

    svgElement.appendChild(valueMaxReceived);

    divSVGProgressBar.appendChild(valuesInformationContainer);

    mainElement.appendChild(divSVGProgressBar);

    const positionValueMinReceived = (totalUp/scaleValue)+((totalDown/scaleValue)/2)

    const valueMinReceived = document.createElementNS("http://www.w3.org/2000/svg", "text");
    valueMinReceived.textContent = totalDown;
    valueMinReceived.setAttribute("x",positionValueMinReceived.toString());
    valueMinReceived.setAttribute("y", (svgHeight/2).toString());
    valueMinReceived.setAttribute("fill", colorMaxReceived);

    svgElement.appendChild(valueMinReceived);

    divSVGProgressBar.appendChild(valuesInformationContainer);

    mainElement.appendChild(divSVGProgressBar);

}


//create the colors legend for the progress bar container
function DrawColorLegendContainer(color = "black", divColorRule = HTMLDivElement) {
    const width = "15";
    const divColorRect = document.createElement("div");
    divColorRect.style.width = width.toString() + "px";
    divColorRect.style.height = width.toString() + "px";
    divColorRect.style.backgroundColor = color;
    divColorRect.style.marginLeft = "20px";

    divColorRule.appendChild(divColorRect);
}

//create the label legend for the progress bar container
function DrawColorMeaning(divColorsRules = HTMLDivElement, divColorRule = HTMLDivElement, text = String) {
    const divColorMeaning = document.createElement("div");
    divColorMeaning.style.width = "100%";
    divColorMeaning.style.height = "100%";

    const colorMeaning = document.createElement("h3");
    colorMeaning.style.width = "100%";
    colorMeaning.style.height = "100%";
    colorMeaning.innerText = "- " + text;
    colorMeaning.style.display = "flex";
    colorMeaning.style.alignItems = "center";
    divColorRule.appendChild(colorMeaning);

    colorMeaning.style.marginLeft = "2%";

    divColorMeaning.style.display = "flex";
    divColorMeaning.style.alignItems = "center";
    divColorMeaning.style.justifyContent = "center";

    divColorsRules.appendChild(divColorRule);
}

export function createLegendProgressBar(divLegends) {
    const valueNormalized = 10000;
    const marginTitle = "2%";
    const divTitle = document.createElement("div");
    divTitle.style.width = "auto";
    divTitle.style.height = "auto";
    divTitle.style.marginTop = marginTitle;
    divTitle.style.marginLeft = marginTitle;
    divTitle.style.borderBottom = "2px dotted";

    const title = document.createElement("h3");
    title.innerText = "Audits Ratio - Legend";
    title.style.width = "auto";

    const divColorsRules = document.createElement("div");
    divColorsRules.style.width = "100%";
    divColorsRules.style.height = "60%";
    divColorsRules.style.backgroundColor = "rgb(140,140,140)";

    const divFirstColorRule = document.createElement("div");
    divFirstColorRule.style.width = "100%";
    divFirstColorRule.style.height = "50%";
    divFirstColorRule.style.display = "flex";
    divFirstColorRule.style.alignItems = "center";
    // divFirstColorRule.style.flexDirection = "row";

    DrawColorLegendContainer("rgb(50,50,50)", divFirstColorRule);
    DrawColorMeaning(divColorsRules, divFirstColorRule, "Represent the lowest value received as audit ratio");

    const secondDivColor = document.createElement("div");
    secondDivColor.style.width = "100%";
    secondDivColor.style.height = "50%";
    secondDivColor.style.display = "flex";
    secondDivColor.style.alignItems = "center";

    DrawColorLegendContainer("white", secondDivColor);
    DrawColorMeaning(divColorsRules, secondDivColor, "Represent the lowest value received as audit ratio");
    
    const subTitleContainer = document.createElement("div");
    subTitleContainer.style.width = "100%";
    subTitleContainer.style.height = "100%";
    subTitleContainer.style.display = "flex";
    // subTitleContainer.style.alignItems = "center";
    subTitleContainer.style.justifyContent = "center";

    const subTitle = document.createElement("h4");
    subTitle.innerText = `*The value is normalized with ${scaleValue}`;
    subTitle.style.color = "rgb(60,60,60)";
    subTitle.style.width = "auto";
    subTitle.style.height = "auto";
    subTitle.style.textAlign = "center";

    subTitleContainer.appendChild(subTitle);
    divColorsRules.appendChild(subTitleContainer);

    // const divSecondColorRule = document.createElement("div");
    // divSecondColorRule.style.width = "100%";
    // divSecondColorRule.style.height = "50%";
    // divSecondColorRule.style.backgroundColor = "purple";

    // divColorsRules.appendChild(divSecondColorRule);

    divTitle.appendChild(title);
    divLegends.appendChild(divTitle);
    divLegends.appendChild(divColorsRules);
}