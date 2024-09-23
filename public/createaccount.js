function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

return (
  <div className="container">
      <div className="row align-items-start">
        {/* Left-side image */}
        <div className="col-md-4 text-center"> {/* Center the image horizontally */}
          <h1 className="createTitle">Start banking today!</h1>
          <img src="createaccount.png" className="createAccount left-image" alt="create account" />
        </div>
    <div className="d-flex justify-content-center align-items-center">
      <Card
      bgcolor="light"
        txtcolor="black"
        header="Create Your Account"
        status={status}
        body={show ? 
          <CreateForm setShow={setShow}/> : 
          <CreateMsg setShow={setShow}/>}
        headerClass="bg-black"
        className="card-border"
      />
    </div>
    </div>
    </div>
  );
}

function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState('');
  const { setUser } = React.useContext(UserContext);

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regular expression to check if name contains only letters and spaces
  const nameRegex = /^[A-Za-z\s]+$/;

  function validateForm() {
    if (!nameRegex.test(name)) {
      setStatus("Error: Name must only contain letters and spaces.");
      return false;
    }
    if (!emailRegex.test(email)) {
      setStatus("Error: Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setStatus("Error: Password must be at least 6 characters.");
      return false;
    }
    setStatus(''); // Clear any previous error messages
    return true;
  }

  function handle() {
    if (!validateForm()) return; // Stop if form validation fails
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      setUser(data); // Automatically log in the user
      props.setShow(false);
    })();
  }

  return (
    <>
      Name<br />
      <input type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={e => setName(e.currentTarget.value)} /><br />

      Email address<br />
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

      <button type="submit"
        className="btn btn-success"
        onClick={handle}>Create Account</button>

      {/* Display status message */}
      {status && <div className="alert alert-danger mt-3">{status}</div>}
    </>
  );
}
