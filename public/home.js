function Home() {
  return (
    <>
      <div className="d-flex justify-content-center flex-column align-items-center">
        {/* Center the title above both the card and the link */}
        <h1 className="pageTitle"> Welcome to the bank </h1>

        {/* Container for the card and the link */}
        <div className="d-flex justify-content-between align-items-center" style={{ width: '80%' }}>
          <Card
            txtcolor="black"
            header="BadBank Landing Module"
            title="Welcome to the bank"
            text="Please login or create an account to utilize our services"
            body={(<img src="bank.png" className="img-fluid" alt="Responsive image" />)}
            headerClass="bg-white"
            className="card-border"
          />
          <Link to="/CreateAccount" className="create-account-link">Create an account today!</Link>
        </div>
      </div>
    </>
  );
}