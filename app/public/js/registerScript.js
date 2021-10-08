const register = {
  init: async () => {
    document.getElementById('btn_register').addEventListener('click', register.validate)
  },

  validate: async () => {
    const name = document.getElementsByName('name')[0].value
    const email = document.getElementsByName('email')[0].value
    const password = document.getElementsByName('password')[0].value

    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let validate = true;
    let message = ''

    if (name.length < 3) {
      message = 'Escreva seu nome corretamente'
      validate = false
    }
    if (!regexEmail.test(email)) {
      message = 'Email inválido'
      validate = false
    }
    if (password.length < 5) {
      message = 'Senha deve ter mais de 5 caracteres'
      validate = false
    }
    if (!validate) {
      alert(message)
    } else {
      register.send()
    }
  },


  send: async () => {
    const data = {
      name: document.getElementsByName('name')[0].value,
      email: document.getElementsByName('email')[0].value,
      password: document.getElementsByName('password')[0].value
    }

    const response = await fetch("register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      alert("Não foi possível criar sua conta")
    } else {
      alert('Conta criada com sucesso')
    }

    console.log(response)
  }
}

window.onload = register.init()