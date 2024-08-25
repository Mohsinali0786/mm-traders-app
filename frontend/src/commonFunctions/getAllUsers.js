export async function GetAllUsers(e) {
    const response = await fetch("https://mm-traders-backend-app.vercel.app/api/getUser", {
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