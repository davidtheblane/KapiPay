// const init = () => {
//   const validateEmail = (event) => {
//     const input = event.currentTarget;
//     const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/gm;
//     const emailTest = regex.test(input.value);

//     if (!emailTest)
//       console.log('email não valido')
//     else {
//       console.log('email valido')
//     }
//   }

//   const validatePassword = (event) => {
//     const input = event.currentTarget;

//     if (input.value.length < 8) {
//       console.log("Senha deve ser maior que 8 caracteres")
//     } else {
//       console.log("Senha Válida")
//     }
//   }

//   const inputEmail = document.querySelector('#email');
//   const inputPassword = document.querySelector('#password')
//   const submitButton = document.querySelector('#submit')

//   inputEmail.addEventListener('input', validateEmail)
//   inputPassword.addEventListener('input', validatePassword)


//   if (submitButton) {
//     submitButton.addEventListener('click', (event) => {
//       event.preventDefault();

//       submitButton.textContent = "...Loading"


//       fetch('https://reqres.in/api/login', {
//         method: 'POST',
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           "email": inputEmail.value,
//           "password": inputPassword.value
//         })
//       }).then((response) => {
//         return response.json();
//       }).then((data) => {
//         console.log(data)
//       })
//     })
//   }

// }

// window.onload = init;


