function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

return (
    <div className="d-flex justify-content-center align-items-center">
      <Card
        bgcolor="primary"
        header="Create Your Account"
        status={status}
        body={show ? 
          <CreateForm setShow={setShow}/> : 
          <CreateMsg setShow={setShow}/>}
        headerClass="bg-black"
        className="card-border"
      />
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
  const { setUser } = React.useContext(UserContext);

  function handle() {
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
    </>
  );
}
