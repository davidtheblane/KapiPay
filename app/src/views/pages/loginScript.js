const form = document.getElementById('login-form')
const axiosInstance = require("../services/api.login.service");

form.addEventListener('submit', async (event) => {
  console.log("chegou no event listener")
  event.preventDefault()
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

