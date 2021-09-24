const authenticate = () => {
  const validateEmail = (event) => {
    const input = event.currentTarget;
    const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/gm;
    const emailTest = regex.test(input.value);

    if (!emailTest)
      console.log('email não valido')
    else {
      console.log('email valido')
    }
  }



  const inputEmail = document.querySelector('#email');
  const inputPassword = document.querySelector('#password')
  const submitButton = document.querySelector('#submit')
  const inputToken = document.querySelector('#token')

  inputEmail.addEventListener('input', validateEmail)



  if (submitButton) {
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();

      submitButton.textContent = "...Loading"


      fetch('http://localhost:5050/auth/authenticate', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDc2YzBhZDdlY2Y5NzgwYWU3ZTExYiIsImlhdCI6MTYzMjA3MTA0MywiZXhwIjoxNjMyMTU3NDQzfQ.ClvaE35eMyeuhOiSH-aViGGqxQMf8REF-UjymYqj0co"
        },
        body: JSON.stringify({
          "email": inputEmail.value,
          "password": inputPassword.value
        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data.token)
      })
    })
  }

}

window.onload = authenticate;

