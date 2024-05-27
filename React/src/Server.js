


const SERVER_ADDRESS = "http://localhost:5026";




export async function getQuestions(amt) {

    var questions = [];

    var response = await fetch(locate("questions/get" + amt), {

    })
        .then(data => {

            if (data.status === 401) {
                console.log("User does not exist");

                return null;

            }
            return data.json();
        })
        .then(user => {
            return user;

        }).catch(err => {

            return null
        });
    if (response == null) {
        return null;

    }

    else {
        questions = response;
    }

    console.log(questions);
    return questions;


}


export async function googleLogin(token) {
    try {
        const response = await fetch('http://localhost:5026/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Token: token || "-1",
            })
        });

        const data = await response.json();
        return null;
    } catch (error) {
        console.error('Error:', error);
    }
}
function locate(mapping) {

    return SERVER_ADDRESS + "/" + mapping;

}