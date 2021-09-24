const register = () => {
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

  const inputName = document.querySelector('#name')
  const inputEmail = document.querySelector('#email');
  const inputPassword = document.querySelector('#password')
  const submitButton = document.querySelector('#submit')

  inputEmail.addEventListener('input', validateEmail)



  if (submitButton) {
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();

      submitButton.textContent = "...Loading"


      //email para teste dessa pagina: "francisco5.bernardo@uol.com.br"
      //password: "12345"

      fetch('http://localhost:5050/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name": inputName.value,
          "email": inputEmail.value,
          "password": inputPassword.value
        })
      })

        .then((res) => {
          return res.json();
        })

        .then((data) => {
          const userToken = data.token
          console.log(userToken)
          alert("Conta criada com sucesso!")
        })
        .catch((error) => console.log({ error: error.message }))


    })
  }

}

window.onload = register;

