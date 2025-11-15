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

      if (auth.isAuthenticated) {
        return (
          <div>
            <pre> Hello: {auth.user?.profile.email} </pre>
            <pre> ID Token: {auth.user?.id_token} </pre>
            <pre> Access Token: {auth.user?.access_token} </pre>
            <pre> Refresh Token: {auth.user?.refresh_token} </pre>

            {/* Use the built-in signoutRedirect */}
            <button onClick={() => auth.signoutRedirect()}>Sign out</button>
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
