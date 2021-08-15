document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "http://localhost:3000/dogs";
  const tBody = document.getElementById("table-body");
  const inputName = document.querySelector('input[name="name"]');
  const inputBreed = document.querySelector('input[name="breed"]');
  const inputSex = document.querySelector('input[name="sex"]');
  const form = document.getElementById('dog-form');
  const inputId = document.createElement('input');
  inputId.setAttribute('type','hidden');

  //render
  function renderAllDogs() {
    getAllDogs()
      .then((data) => {
        data.forEach((el) => {
          const tr = document.createElement("tr");
          const td1 = document.createElement("td");
          const td2 = document.createElement("td");
          const td3 = document.createElement("td");
          const td4 = document.createElement("td");
          td1.innerText = el.name;
          td2.innerText = el.breed;
          td3.innerText = el.sex;
          const button = document.createElement("button");
          button.setAttribute("id", el.id);
          button.innerText = "Edit Dog";
          td4.append(button);
          tr.append(td1, td2, td3, td4);
          tBody.appendChild(tr);
          button.addEventListener("click", () => {
            inputName.setAttribute('value',el.name);
            inputBreed.setAttribute('value',el.breed);
            inputSex.setAttribute('value',el.sex);
            inputId.setAttribute('id',el.id);
            inputId.value = el.id;
            form.insertBefore(inputId, inputSex);
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function editDogForm(id, name, breed, sex) {
    const inputName = document.querySelector('input[name="name"]');
    const inputBreed = document.querySelector('input[name="breed"]');
    const inputSex = document.querySelector('input[name="sex"]');
    inputName.value = name;
    inputBreed.value = breed;
    inputSex.value = sex;
  }

  //fetches
  function getAllDogs() {
    return fetch(baseURL).then((resp) => resp.json());
  }

  renderAllDogs();
});
