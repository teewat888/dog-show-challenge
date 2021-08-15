document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "http://localhost:3000/dogs";
  const tBody = document.getElementById("table-body");
  const inputName = document.querySelector('input[name="name"]');
  const inputBreed = document.querySelector('input[name="breed"]');
  const inputSex = document.querySelector('input[name="sex"]');
  const form = document.getElementById("dog-form");
  const inputId = document.createElement("input");
  const submit = document.querySelector('input[type="submit');
  inputId.setAttribute("type", "hidden");

  //render
  function renderAllDogs() {
    getAllDogs()
      .then((data) => {
          console.log("data ",data);
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
          button.addEventListener("click", (e) => {
            inputName.setAttribute("value", el.name);
            inputName.value = el.name;
            inputBreed.setAttribute("value", el.breed);
            inputBreed.value = el.breed;
            inputSex.setAttribute("value", el.sex);
            inputSex.value = el.sex;
            inputId.setAttribute("id", el.id);
            inputId.value = el.id;
            form.insertBefore(inputId, inputSex);
            console.log("e -->",e);
          });
          td4.append(button);
          tr.append(td1, td2, td3, td4);
          tBody.appendChild(tr);
          
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

  function editDog(id, name, breed, sex) {
    const confObj = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        breed: `${breed}`,
        sex: `${sex}`,
      }),
    };
    return fetch(baseURL + `/${id}`, confObj).then((resp) => resp.json());
  }
  function clearTags() {
    while (tBody.firstChild) {
      tBody.removeChild(tBody.firstChild);
    }
  }

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    //console.log("input ID: ",inputId.value);
    if (inputId.value !== "") {
      //console.log("get in here");
      editDog(inputId.value, inputName.value, inputBreed.value, inputSex.value)
        .then((data) => {
          console.log("data: ", data);
          inputId.value = '';
          inputName.value = '';
          inputBreed.value = '';
          inputSex.value = '';
          clearTags();
          renderAllDogs();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });

  renderAllDogs();
});
