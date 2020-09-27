import { parseCookies } from 'nookies'

import 'firebase/auth';
import verifyCookie from '../utils/verifyCookie';

export async function getServerSideProps(context) {
    var propsObject = {
      authenticated: false,
      usermail: ""
    }

    const cookies = parseCookies(context)

    if(cookies.user){
      const authentication = await verifyCookie(cookies.user);
      propsObject.authenticated = authentication ? authentication.authenticated : false;
      propsObject.usermail = authentication ? authentication.usermail : "";
    } 

    return {
      props: propsObject, // will be passed to the page component as props
    }

  }



const User = (props) => (
    <div>   
      {props.authenticated ? "Welcome user " + props.usermail : "You are a guest"}
    </div>
  )

  export default User