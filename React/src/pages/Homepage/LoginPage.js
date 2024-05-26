import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";



export default function LoginPage() {


    return <div>

        <GoogleLogin
            onSuccess={res => {
                console.log(res);
                console.log(res);
                // Send the token and additional user information to your backend
                fetch('http://localhost:5026/auth/google', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Token: res.credential || "-1",

                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('User data stored:', data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    </div>

}