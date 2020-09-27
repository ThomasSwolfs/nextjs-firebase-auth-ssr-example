
import getFirebase from '../firebase/firebase';

const firebase = getFirebase();

    async function signIn(email, password) {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (response) => {
              if(response && response.user){
                return await postUserToken(await response.user.getIdToken());
              }
              return null;
            });
    };

    async function postUserToken(token) {
        var path = "/api/auth";
        var url = process.env.NEXT_PUBLIC_BASE_API_URL + path;
        var data = { token: token }
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }

    
    export default signIn;