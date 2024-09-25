function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div className="container">
      <div className="row align-items-start">
        {/* Left-side image */}
        <div className="col-md-4 text-center"> {/* Center the image horizontally */}
          <h1 className="createTitle">Welcome back!</h1>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Card
            bgcolor="light"
            txtcolor="black"
            header="Login"
            status={status}
            body={show ? 
              <LoginForm setShow={setShow} setStatus={setStatus} /> : 
              <LoginMsg setShow={setShow} setStatus={setStatus} />}
          />
        </div>
      </div>
    </div>
  )
}

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}>
        Authenticate again
      </button>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    // Load the Google Identity Services script dynamically
    const initializeGoogleSignIn = () => {
      google.accounts.id.initialize({
        client_id: '1051340692593-4gb4ct59vibm12akm8stdt72o6eqlhoo',
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById('google-login-button'), // Add the Google button dynamically
        { theme: 'outline', size: 'large' }
      );
      google.accounts.id.prompt(); // Optionally prompt the sign-in button to appear immediately
    };

    // Add Google Identity Services script dynamically
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn; // Initialize Google Sign-In when the script loads
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up the script on component unmount
    };
  }, []);

  function handleCredentialResponse(response) {
    const token = response.credential;
    console.log('Google OAuth Token:', token);

    // You can now use this token to authenticate the user
    setUser({ email: 'google_user_email@example.com', token });  // Example usage, replace with actual data
    props.setStatus('Successfully signed in with Google!');
    props.setShow(false);
  }

  function handleLogin() {
    fetch(`/account/login/${email}/${password}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          setUser(data); // Set the logged-in user in the context
          props.setStatus('');
          props.setShow(false);
          console.log('JSON:', data);
        } catch (err) {
          props.setStatus(text);
          console.log('err:', text);
        }
      });
  }

  return (
    <>
      Email<br />
      <input type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)} /><br />

      Password<br />
      <input type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={e => setPassword(e.currentTarget.value)} /><br />

      <div className="d-flex button-container">
        <button type="submit" className="btn" onClick={handleLogin}>Login</button>
      </div>

      {/* Google Sign-In Button */}
      <div id="google-login-button"></div>
    </>
  );
}

export default Login;
