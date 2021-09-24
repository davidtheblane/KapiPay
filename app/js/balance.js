const button = document.querySelector('#view_balance')
const divSaldo = document.querySelector('#saldo')


function balance() {

  button.addEventListener('click', () => {
    button.textContent = "...Carregando"
    fetch('http://localhost:5050/balance')
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
