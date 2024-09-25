import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";

function Login(){
  const [show, setShow]     = React.useState(true);
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
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
    </div>
    </div>
    </div>
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setUser } = React.useContext(UserContext);

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

  function handleGoogleSignIn() {
    const auth = getAuth(); // Assuming Firebase has already been initialized
    const provider = new GoogleAuthProvider();
  
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser({ email: user.email }); // Store user data in your context or state
        props.setShow(false);
        props.setStatus('Login successful');
      })
      .catch((error) => {
        console.log('Google Sign-In Error:', error);
        props.setStatus('Google Sign-In failed: ' + error.message);
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
        <button type="button" className="btn btn-google" onClick={handleGoogleSignIn}>Google Sign in</button>
      </div>
    </>
  );
}
