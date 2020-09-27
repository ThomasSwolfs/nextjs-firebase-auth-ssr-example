import { serialize } from 'cookie'
import getFirebaseAdmin from '../../firebase/admin';


export default async function auth(req, res) {
  const admin = await getFirebaseAdmin();
  
    const expiresIn = 5 * 60 * 1000;
    if (req.method === 'POST') {
      var idToken = req.body.token;

      const cookie = await admin.auth().verifyIdToken(idToken)
      .then((decodedIdToken) => {
          // Only process if the user just signed in in the last 5 minutes.
      if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
          // Create session cookie and set it.
          return admin.auth().createSessionCookie(idToken, {expiresIn});
          }
          // A user that was not recently signed in is trying to set a session cookie.
        // To guard against ID token theft, require re-authentication.
          res.status(401).send('Recent sign in required!');
      });

    if(cookie) {
      console.log("secure:" + process.env.NEXT_PUBLIC_SECURE_COOKIE);
        const options = {maxAge: expiresIn, httpOnly: true, secure: process.env.NEXT_PUBLIC_SECURE_COOKIE === "true", path: '/'};
        res.setHeader('Set-Cookie', serialize('user', cookie, options));
        res.status(200).end(JSON.stringify({ response: 'Succesfull logged in' }))
    } else {
      res.status(401).send('Invalid authentication');
    }
      
    } 
  }
  