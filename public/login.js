import { auth, provider, signInWithPopup } from "./firebase-auth";

function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      txtcolor="black"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
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
    // Implement Google Sign-In logic here using Firebase
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser({ email: user.email }); // Set user in context
        props.setShow(false);
        props.setStatus('');
      })
      .catch((error) => {
        console.log('Google Sign-In Error:', error);
        props.setStatus('Google Sign-In failed');
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

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn" onClick={handleLogin}>Login</button>
        <button type="button" className="btn btn-primary ml-2" onClick={handleGoogleSignIn}>Sign in with Google</button>
      </div>
    </>
  );
}
