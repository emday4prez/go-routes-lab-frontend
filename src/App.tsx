import './App.css'

import { useAuth } from "react-oidc-context";

    function App() {
      const auth = useAuth();

   

      if (auth.isLoading) {
        return <div>Loading...</div>;
      }

      if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
      }
const callApi = async (endpoint: string) => {
  try {
    const token = auth.user?.access_token;
    const response = await fetch(`http://localhost:8080/api/${endpoint}`, {
      headers: {
        // This is the magic line
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    alert(`Success from /${endpoint}: ${JSON.stringify(data)}`);
  } catch (err: any) {
    console.error(`API call to /${endpoint} failed:`, err);
    alert(`API call to /${endpoint} failed: ${err.message}`);
  }
}

      if (auth.isAuthenticated) {
        return (
    <div>
    <pre> Hello: {auth.user?.profile.email} </pre>
    <button onClick={() => auth.signoutRedirect()}>Sign out</button>
    <hr />
    <button onClick={() => callApi('public')}>Call Public API</button>
    <button onClick={() => callApi('me')}>Call Protected API</button>
  </div>
        );
      }

      return (
        <div>
          <button onClick={() => auth.signinRedirect()}>Sign in</button>
          
          {/* This button will also work now */}
          <button onClick={() => auth.signoutRedirect()}>Sign out</button>
        </div>
      );
    }


    

    export default App;
