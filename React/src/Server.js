const SERVER_ADDRESS = "http://localhost:5026";




export const BYPASS_SERVER = false;

export async function getQuestions(amt) {

    var questions = [];

    var response = await fetch(locate("questions/get" +  amt), {

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
function locate(mapping) {

    return SERVER_ADDRESS + "/" + mapping;

}