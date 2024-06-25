import * as FrontStyles from "./styles.js";
import * as Api from "./api.js";


let mainInnerText = "";

function loginPageLoaded() {
    console.log("The dom is ready");

    FrontStyles.managePasswordElement();

    const formSubmit = document.getElementById("submit_field");
    const usernameField = document.getElementById("username_field");
    const passwordField = document.getElementById("password_field");
    if (formSubmit) {
        formSubmit.addEventListener("submit", async function (event) {
            event.preventDefault();
            //client try to log
            const result = await Api.getToken(
                usernameField.value,
                passwordField.value
            );
            console.log("result :", result);
            let token = String;
            mainInnerText = document.querySelector("main").innerHTML;
            if (result.success) {
                token = result.token;
            } else {
                usernameField.value = "";
                passwordField.value = "";
                console.warn("Error on login");
                alert("oopsie, error on login");
                // showInterfaceIdentifyLogin();
                return null;
            }

            const buttonUnlog = document.getElementById('button_unlogged');
            buttonUnlog.style.display = 'block';
        

            const datas = await Api.getData(token);
            datas.birthdate = await Api.getUserBirthdate(token);
            datas.userCreationDate = await Api.getUserCreation(token);

            datas.maxProjectDone = await Api.getProjectDone(token);
            const xps = Api.getXps(datas.transaction);
            FrontStyles.showStatsPage(datas, xps);

            document.getElementById("button_unlogged").addEventListener("click", logout)
        });
    } else {
        console.error("Formsubmit is undefined");
    }

    if (window.location.hostname == "127.0.0.1") {
        document.getElementById("username_field").value = "kcastel";
        document.getElementById("password_field").value = "@Kevastele1";
        document.getElementById("submit_data").click();
        console.log("Click automatized");
    } else {
        console.log("host name:", window.location.hostname);
    }
}

function logout() {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = mainInnerText;

    const buttonUnlog = document.getElementById('button_unlogged');
    buttonUnlog.style.display = 'none';
}
// function hideInterfaceWrongIdentify(interfaceIdentifyLogin, main){
//     console.log("test!!!");
//     main.removeChild(interfaceIdentifyLogin);
//     interfaceIdentifyLogin.remove();
// }

// function showInterfaceIdentifyLogin(){
//     const interfaceIdentifiyLogin = document.createElement("div");
//     interfaceIdentifiyLogin.style.zIndex = 0;
//     interfaceIdentifiyLogin.style.backgroundColor = "red";
//     interfaceIdentifiyLogin.style.width = "70%";
//     interfaceIdentifiyLogin.style.height = "50%";
//     interfaceIdentifiyLogin.style.marginTop = "400px"
//     interfaceIdentifiyLogin.style.position = "absolute";
//     interfaceIdentifiyLogin.style.display = "flex";
//     interfaceIdentifiyLogin.style.flexDirection = "column";

//     const main = document.querySelector("main");
//     main.appendChild(interfaceIdentifiyLogin);

//     const buttonHideInterfaceIdentifyWrong = document.createElement("button");
//     buttonHideInterfaceIdentifyWrong.innerText = "Test";

//     interfaceIdentifiyLogin.appendChild(buttonHideInterfaceIdentifyWrong);
//     buttonHideInterfaceIdentifyWrong.addEventListener("click", 
//         hideInterfaceWrongIdentify,
//         interfaceIdentifiyLogin,
//         main
//     )
// }


document.addEventListener("DOMContentLoaded", loginPageLoaded());