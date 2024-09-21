function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [balance, setBalance] = React.useState(0); // State to hold the balance
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    // Fetch the current balance when the component mounts
    if (user && user.email) {
      fetch(`/account/findOne/${user.email}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.balance !== undefined) {
            setBalance(data.balance); // Set the user's current balance
          }
        })
        .catch(err => {
          console.log('Error fetching balance:', err);
          setStatus('Error fetching balance');
        });
    }
  }, [user]);

  function WithdrawForm(props) {
    const [amount, setAmount] = React.useState('');

    function handle() {
      fetch(`/account/update/${user.email}/-${amount}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.value && data.value.balance !== undefined) {
            props.setStatus(`Withdrawal successful! New Balance: $${data.value.balance.toFixed(2)}`);
            props.setShow(false);
            setBalance(data.value.balance); // Update the balance after withdrawal
          } else {
            props.setStatus('Withdrawal failed');
          }
        })
        .catch(err => {
          console.log('Error during withdrawal:', err);
          props.setStatus('Withdrawal failed');
        });
    }
    

    return (
      <>
        <div className="d-flex justify-content-between">
          <label>Current Balance:</label>
          <strong>${balance.toFixed(2)}</strong> {/* Display the current balance */}
        </div>
        <br />
        Amount<br />
        <input
          type="number"
          className="form-control"
          placeholder="Enter amount"
          value={amount}
          onChange={e => setAmount(e.currentTarget.value)}
        /><br />
        <button type="submit" className="btn btn-light" onClick={handle}>
          Withdraw
        </button>
      </>
    );
  }

  function WithdrawMsg(props) {
    return (
      <>
        <h5>Success</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => {
            props.setShow(true);
            props.setStatus('');
          }}
        >
          Withdraw again
        </button>
      </>
    );
  }

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? <WithdrawForm setShow={setShow} setStatus={setStatus} /> : <WithdrawMsg setShow={setShow} setStatus={setStatus} />}
    />
  );
}
