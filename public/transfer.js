function Transfer() {
  const [recipientEmail, setRecipientEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [status, setStatus] = React.useState('');
  const { user, setUser } = React.useContext(UserContext);
  const [balance, setBalance] = React.useState(user.balance);

  React.useEffect(() => {
    // Fetch the current balance when the component mounts
    if (user && user.email) {
      fetch(`/account/findOne/${user.email}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.balance !== undefined) {
            setBalance(data.balance); // Set the user's current balance
            setUser({...user, balance: data.balance}); // Update the user context with the new balance
          }
        })
        .catch(err => {
          console.log('Error fetching balance:', err);
          setStatus('Error fetching balance');
        });
    }
  }, [user.email]);

  function handleTransfer() {
    if (!recipientEmail || !amount) {
      setStatus('Please enter a valid email and amount.');
      return;
    }

    const transferAmount = parseFloat(amount);
    if (user.balance >= transferAmount) {
      fetch(`/account/findOne/${recipientEmail}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.email) {
            fetch(`/account/update/${user.email}/-${transferAmount}`)
              .then(() => fetch(`/account/update/${recipientEmail}/${transferAmount}`))
              .then(() => {
                setStatus(`Successfully transferred $${amount} to ${recipientEmail}.`);
                const newBalance = user.balance - transferAmount;
                setBalance(newBalance);
                setUser({ ...user, balance: newBalance }); // Update user balance in context
              })
              .catch(err => setStatus('Transfer failed.'));
          } else {
            setStatus('Recipient email not found.');
          }
        })
        .catch(err => setStatus('Error finding recipient.'));
    } else {
      setStatus('Insufficient funds.');
    }
  }

  return (
    <Card
      bgcolor="light"
      txtcolor="black"
      header="Transfer Funds"
      status={status}
      body={
        <>
          <div className="d-flex justify-content-between">
            <label>Current Balance:</label>
            <strong>${balance.toFixed(2)}</strong> {/* Display the current balance */}
          </div>
          <br />
          Recipient Email<br />
          <input
            type="input"
            className="form-control"
            placeholder="Enter recipient email"
            value={recipientEmail}
            onChange={e => setRecipientEmail(e.currentTarget.value)}
          /><br />
          
          Amount<br />
          <input
            type="number"
            className="form-control"
            placeholder="Enter amount"
            value={amount}
            onChange={e => setAmount(e.currentTarget.value)}
          /><br />

          <button type="submit" className="btn btn-light" onClick={handleTransfer}>
            Transfer
          </button>
        </>
      }
    />
  );
}

  
  