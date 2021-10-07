const form = document.getElementById('form-login')
const axiosInstance = require("../services/api.login.service");

console.log("AMIGO ESTOU AQUI...")

form.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log("chegou no event listener")
  return
  const loginData = {
    email: event.target.email.value,
    password: event.target.password.value,
  }
  try {
    const doLogin = await axiosInstance.post(`/login`, { email, password });
    console.log(doLogin)

    console.log(loginData)
  } catch (error) {
    console.log(error.message)
  }
})
