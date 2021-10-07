const login = {
  init: async () => {
    document.getElementById('btn_login').addEventListener('click', login.validate)
  },

  validate: async () => {
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;

    let validate = true;
    if (email.length < 6) {
      validate = false
    }
    if (password.length < 5) {
      validate = false
    }
    if (!validate) {
      alert('verifique os campos')
    } else {
      login.send()
    }
  },

  send: async () => {
    const data = {
      email: document.getElementsByName('email')[0].value,
      password: document.getElementsByName('password')[0].value
    }

    const response = await fetch("login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      alert('login invalido')
    } else {
      alert('login feito')
    }


    console.log(response)
  }
}

document.addEventListener('DOMContentLoaded', login.init)


// const form = document.getElementById('form-login')
// const axiosInstance = require("../services/api.login.service");

// console.log("AMIGO ESTOU AQUI...")

// form.addEventListener('submit', async (event) => {
//   event.preventDefault()
//   console.log("chegou no event listener")

//   const loginData = {
//     email: event.target.email.value,
//     password: event.target.password.value,
//   }
//   try {
//     const doLogin = await axiosInstance.post(`/login`, { email, password });
//     console.log(doLogin)

//     console.log(loginData)
//   } catch (error) {
//     console.log(error.message)
//   }
// })
