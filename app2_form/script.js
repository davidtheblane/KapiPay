function getUserList() {
  fetch('http://localhost:5050/auth/user/')
    .then((response) => response.json())

    .then((data) => {
      const userArray = data.user;

      userArray.map((item) => {
        const li = document.createElement('li');

        li.setAttribute('id', item._id)

        li.innerHTML = `${item.name} : ${item.email}`;

        list.appendChild(li)

      })
    })
  const list = document.querySelector('#fill_list')
}

