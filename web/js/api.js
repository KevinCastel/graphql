//Dedicate to api stuffs here

const urlS = "https://zone01normandie.org/api/auth/signin"
const urlD = "https://zone01normandie.org/api/graphql-engine/v1/graphql"

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


export async function getData(token = String) {
    try {
        const response = await fetch(urlD, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                query: `{
                    user {
                        id
                            login
                            attrs
                            totalUp
                            totalDown
                            auditRatio
                            campus
                       },
                        transaction {
                            id
                            type
                            createdAt
                            amount
                            objectId
                            userId
                            createdAt
                            path
                        }
                }`
            })
        });

        const resp = await response.json();
        const datas = resp;

        let campusCopy = [...datas.data.user[0].campus];
        campusCopy[0] = campusCopy[0].toUpperCase();
        datas.data.user[0].campus = campusCopy.join("");
        console.log("datas :", datas.data.user[0].campus);
        return await {
            "firstName": datas.data.user[0].attrs.firstName,
            "lastName": datas.data.user[0].attrs.lastName,
            "mail": datas.data.user[0].attrs.email,
            "phone": datas.data.user[0].attrs.Phone,
            "addressCity": datas.data.user[0].attrs.addressCity,
            "totalUp": datas.data.user[0].totalUp,
            "totalDown": datas.data.user[0].totalDown,
            "transaction": datas.data.transaction,
            "auditRatio": Math.ceil(datas.data.user[0].auditRatio),
            "campusLocation": datas.data.user[0].campus
        };
    } catch (error) {
        console.error("An error has occurred for getting first name and second name");
        throw error;
    }
}

export async function getGrade(token = String) {
    try {
        const response = await fetch(urlD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    query: `{
                        progress (where : { grade: { _neq: 0}}){
                            grade
                        }
                    }`}
            )
        });
        const resp = await response.json();
        console.log("grade :", resp.data.progress);
    } catch (error) {
        console.error("An error has occurred :", error);
        throw error;
    }
}

export async function getProjectDone(token = String) {
    try {
        const response = await fetch(urlD, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                query: `{
                        transaction(where: {
                            type: { _eq: "xp" }, 
                                _and: [
                                    { path: { _like: "/rouen/div%" } },
                                    { path: { _nlike: "%/piscine-js/%" } }
                                    { path : { _nlike: "%checkpoint%"}}
                                    { path: { _nlike: "%/piscine-js" } }
                                ]
                            }) {
                                id
                            }
                        }`
            })
        });

        const resp = await response.json();
        const maxProjectDone = resp.data.transaction.length;

        return maxProjectDone;
    } catch (error) {
        console.error("An error has occurred for getting first name and second name");
        throw error;
    }
}


// export async function getProjectsDone(token = String) {
//     let projectNumber = 0;
//     try {
//         const response = await fetch(urlD, {
//             method: "post",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//                 query: `{
//                     object {
//                         type
//                     }
//                 }`
//             })
//         });
//         let maxProjectsDone = 0;
//         const resp = await response.json();
//         const valuesGroup = Object.values(resp.data)
//         valuesGroup.filter(values => {
//             const value = Object.values(Object.values(values));
//             const projects = value.filter(v => {
//                 if (v.type === "project") {
//                     return value;
//                 }
//             })
//             console.log("projects :", projects);
//             maxProjectsDone = projects.length;
//         });
//     } catch (error) {
//         console.error("An error has occurred :", error);
//         throw error;
//     }
//     return projectNumber;
// }

//get 
export async function getUserCreation(token = String) {
    let userCreationDate = "";
    try {
        const response = await fetch(urlD, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                query: `{
                    user {
                        createdAt
                    }
                }`
            })
        });
        const resp = await response.json();
        userCreationDate = formatDate(resp.data.user[0].createdAt);
    } catch (error) {
        console.error("An error has occurred for getting first name and second name");
        throw error;
    }
    return userCreationDate;
}

export async function getUserBirthdate(token = String) {
    let birthdate = "";
    try {
        const response = await fetch(urlD, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                query: `{
                    user {
                        id
                            attrs
                       },
                }`
            })
        });
        const resp = await response.json();
        birthdate = resp.data.user[0].attrs.dateOfBirth;
        birthdate = formatDate(birthdate);
    } catch (error) {
        console.error("An error has occurred :", error);
        throw error;
    }
    return birthdate;
}

function formatDate(originalDate = String) {
    let newDate = "";
    for (let i = 0; i < originalDate.length; i++) {
        let character = originalDate[i];
        if (character == "T") {
            return newDate;
        }
        if (character == "-") {
            character = " ";
        }
        newDate += character;
    }
    return newDate
}

/*
query : {
    transition (where: { path : { _like: "%/div%" }}){
    }

}
*/ 

export function getXps(datas = Object) {
    // console.log(typeof(datas));
    let result = []
    datas.forEach(element => {
        // console.log("type:",element.type);
        if (element.type == "xp") {
            if (element.path.includes("div")) {
                result.push(element)
            }
        }
    });
    return result
}

// export function getNameMember(token) {
//     console.log("token from getNameMember :", token);
//     let name = "";
//     // let lastName = "";
//     console.log("object");
//     fetch(urlD, {
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