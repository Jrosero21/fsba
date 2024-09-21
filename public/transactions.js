function Transactions() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [balance, setBalance] = React.useState(0);
    const [transactionType, setTransactionType] = React.useState('Deposit');
    const [amount, setAmount] = React.useState('');
    const { user } = React.useContext(UserContext);
  
    React.useEffect(() => {
      if (user && user.email) {
        fetch(`/account/findOne/${user.email}`)
          .then(response => response.json())
          .then(data => {
            if (data && data.balance !== undefined) {
              setBalance(data.balance);
            } else {
              console.log('Balance not found or is undefined');
              setStatus('Error fetching balance');
            }
          })
          .catch(err => {
            console.log('Error fetching balance:', err);
            setStatus('Error fetching balance');
          });
      }
    }, [user]);
  
    function handleTransaction() {
        const parsedAmount = parseFloat(amount);
      
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
          setStatus(`${transactionType} failed: Invalid amount`);
          return;
        }
      
        const transactionAmount = transactionType === 'Withdraw' ? -parsedAmount : parsedAmount;
      
        console.log(`Sending transaction: ${transactionType} of ${transactionAmount}`);
      
        fetch(`/account/update/${user.email}/${transactionAmount}`)
          .then(response => response.json())
          .then(data => {
            console.log('Server response:', data);
            if (data && data.value && data.value.balance !== undefined) {
              setStatus(`${transactionType} successful! New Balance: $${data.value.balance.toFixed(2)}`);
              setShow(false);
              setBalance(data.value.balance);
            } else {
              setStatus(`${transactionType} failed`);
            }
          })
          .catch(err => {
            console.log(`Error during ${transactionType.toLowerCase()}:`, err);
            setStatus(`${transactionType} failed`);
          });
      }
  
    return (
      <Card
        bgcolor="primary"
        header="Transactions"
        status={status}
        body={show ? (
          <>
            <div className="d-flex justify-content-between">
              <label>Current Balance:</label>
              <strong>${balance ? balance.toFixed(2) : '0.00'}</strong> {/* Handle undefined/null balances */}
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="transactionType">Transaction Type</label>
              <select
                id="transactionType"
                className="form-control"
                value={transactionType}
                onChange={e => setTransactionType(e.currentTarget.value)}
              >
                <option value="Deposit">Deposit</option>
                <option value="Withdraw">Withdraw</option>
              </select>
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
            <button type="submit" className="btn btn-light" onClick={handleTransaction}>
              {transactionType}
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <p>{status}</p>
            <button
              type="submit"
              className="btn btn-light"
              onClick={() => {
                setShow(true);
                setStatus('');
              }}
            >
              Perform another {transactionType}
            </button>
          </>
        )}
      />
    );
  }
  
    

  