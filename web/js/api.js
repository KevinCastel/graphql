//Dedicate to api stuffs here

const urlS = "https://zone01normandie.org/api/auth/signin"
const urlM = ""

//get token
export async function getToken(username = String, password = String) {
    console.log("Try to cnt");
    try {
        const response = await fetch(urlS, {
            method: "post",
            headers: {
                "Authorization": `Basic ${btoa(username + ":" + password)}`,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error has occurred for logging :", username, " password:", password);
        throw error;
    }

}

export async function getDatasMember(token = String) {
    try {
        const response = await fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                query: `{
                    user {
                        firstName
                        lastName
                        email
                        xps{
                            amount
                        }
                    },
                    transaction {
                        type
                        createdAt
                        path
                    }
                }`
            })
        });

        const resp = await response.json();
        const datas = resp.data.user[0];

        console.log("data user", resp.data.user[0]);
        return await {
            "firstName": datas.firstName,
            "lastName": datas.lastName,
            "mail": datas.email,
            "xps": datas.xps.amount,
            "transaction":  datas.transaction
        };
    } catch (error) {
        console.error("An error has occurred for getting first name and second name");
        throw error;
    }
}

async function getData() {
    fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${tokenJWT}`
        },
        body: json.stringify({
            query: `
            query {
                user {
                firstName
                lastName
                }
                transaction{
                id
                }
            }`
        })
    })
        .then(rep => rep.json())
        .then(data => {
            console.log("data1:", data);
            infoUser = data.data.user[0];
            infoAll = data.data.transaction;
        })
        .catch(error => {
            console.log("tu es moche", error);
        })
}

// export function getNameMember(token) {
//     console.log("token from getNameMember :", token);
//     let name = "";
//     // let lastName = "";
//     console.log("object");
//     fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
//         method: "post",
//         headers: {
//             "Authorization": `Bearer ${ token }`
//         },
//         body: JSON.stringify({
//             query: `{
//             user{
//                 firstName
//                 lastName
//             }
//         }`
//         })
//     }
//     )
//         .then(res => res.json())
//         .then(data => {
//             console.log("data1: ", data);
//             name = data.data.user[0];
//             console.log("name :", name);

//         })
//         .then(res => console.log("here:", res.data))
// }