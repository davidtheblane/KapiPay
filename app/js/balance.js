const button = document.querySelector('#view_balance')
const divSaldo = document.querySelector('#saldo')
// const token = document.cookie.split("=")[1]


function balance() {

  button.addEventListener('click', () => {
    button.textContent = "...Carregando"
    fetch('http://localhost:5050/account/balance', {
      method: "get",
      headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDc2YzBhZDdlY2Y5NzgwYWU3ZTExYiIsImlhdCI6MTYzMjY5NjgwNSwiZXhwIjoxNjMyNzgzMjA1fQ.4PSxI8EMN_FstWdD6MrGO4wpwiuqUSEuuBaKhjILXVU`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const h5 = document.createElement('h5');
        // h5.setAttribute('id', id)

        h5.innerHTML += `Total R$ ${data.total},00`;

        divSaldo.appendChild(h5)
        console.log(data.total)
        button.textContent = "Seu saldo"
      })

  })

}

window.onload = balance
