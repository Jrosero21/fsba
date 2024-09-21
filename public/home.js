function Home(){
  return (
    <div className="d-flex justify-content-center">
      <Card
        txtcolor="black"
        header="BadBank Landing Module"
        title="Welcome to the bank"
        text="Please login or create an account to utilize our services"
        body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
      />
    </div>
  );
}
