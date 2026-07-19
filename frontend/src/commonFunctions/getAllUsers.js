const localURL="http://localhost:5000/api/"
const remoteURL="https://mm-traders-backend-app.vercel.app/api/"
export async function GetAllUsers(e) {
    const response = await fetch(`${remoteURL}getUser`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    });
    let res = await response.json();
    if (res && res.success) {
        // console.log("Get Data from api", res);
        return res
    }
    else {
        alert('Error')
    }
}        
export async function GetAllParties(userId) {
    const response = await fetch(`${localURL}getAllParties/${userId}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    });
    let res = await response.json();
    if (res && res.success) {
        // console.log("Get Data from api", res);
        return res
    }
    else {
        alert('Error')
    }
}        