import * as FrontStyles from "./styles.js";
import * as Api from "./api.js";



function loginPageLoaded() {
    console.log("The dom is ready");

    FrontStyles.managePasswordElement();

    const formSubmit = document.getElementById("submit_field");
    if (formSubmit) {
        formSubmit.addEventListener("submit", async function (event) {
            event.preventDefault();
            //client try to log
            const token = await Api.getToken(
                document.getElementById("username_field").value,
                document.getElementById("password_field").value
            );
            
            const datas = await Api.getDatasMember(token);
            FrontStyles.showStatsPage(datas);
        })
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


document.addEventListener("DOMContentLoaded", loginPageLoaded());