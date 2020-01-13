const containerUsers = document.querySelector(".container-users");
const formSection = document.querySelector(".form-section");
const titleHw = document.querySelector(".title-hw");
const url = "https://jsonplaceholder.typicode.com/users";
showLoader();
const form = document.forms.addUser;
const inputName = form.elements.name;
const inputUsername = form.elements.username;
const inputEmail = form.elements.email;
const inputPhone = form.elements.phone;
const inputWebsite = form.elements.website;

form.addEventListener("submit", onFormSubmit);
containerUsers.addEventListener("click", containerHandler);

function getUser(url, cb) {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener("load", () => {
      if (Math.floor(xhr.status / 100) !== 2) {
        cb(`Error.status code: ${xhr.status}`, xhr);
        return;
      }
      const response = JSON.parse(xhr.responseText);
      console.log(response);
      cb(response);
    });
    xhr.addEventListener("error", () => console.log(error));
    xhr.send();
  } catch (error) {
    cb(error);
  }
}

function renderUsers(response) {
  removeLoader();
  const userList = response;
  const fragment = document.createDocumentFragment();
  userList.forEach(function (user) {
    const li = templateItem(user);
    fragment.appendChild(li);
  });
  containerUsers.appendChild(fragment);
}

function containerHandler(e) {
  if (e.target.classList.contains("card-title")) {
    const child = e.target.nextElementSibling;
    child.classList.toggle("d-block");
  }
}

getUser(url, renderUsers);

function createUser(url, body, cb) {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.addEventListener("load", () => {
      if (Math.floor(xhr.status / 100) !== 2) {
        cb(`Error.status code: ${xhr.status}`, xhr);
        return;
      }
      const response = JSON.parse(xhr.responseText);
      cb(response);
    });
    xhr.addEventListener("error", () => {
      cb(`Error.status code: ${xhr.status}`, xhr);
    });
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.addEventListener("error", () => console.log(error));

    xhr.send(JSON.stringify(body));
  } catch (error) {
    cb(error);
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  const nameValue = inputName.value;
  const usernameValue = inputUsername.value;
  const emailValue = inputEmail.value;
  const phoneValue = inputPhone.value;
  const websiteValue = inputWebsite.value;
  const newUserObj = createNewUser(
    nameValue,
    usernameValue,
    emailValue,
    phoneValue,
    websiteValue
  );

  if (
    !nameValue ||
    !usernameValue ||
    !emailValue ||
    !phoneValue ||
    !websiteValue
  ) {
    return;
  }
  createUser(url, newUserObj, response => {
    const userNewCard = templateItem(response);
    containerUsers.insertAdjacentElement("afterbegin", userNewCard);
  });
  form.reset();
}

function convertToStr(obj) {
  const str = [];
  Object.entries(obj).map(item => {
    str.push(item.join(": "));
  });
  return str.splice(0, 3).join("; ");
}

function templateItem(item) {
  const fragment = document.createDocumentFragment();
  const li = document.createElement("li");
  li.classList.add("card", "mt-3");

  const userName = document.createElement("h5");
  userName.classList.add("card-title");
  userName.textContent = item.username;

  const divContainer = document.createElement("div");
  divContainer.classList.add("card", "d-none");
  ////////////////
  const listItem = document.createElement("ul");
  listItem.classList.add("list-group");

  if (item.address && item.company) {
    const address = convertToStr(item.address);
    const company = convertToStr(item.company);
    listItem.innerHTML = `<li class="list-group-item p-2">${item.name}</li>
                          <li class="list-group-item p-2">${item.email}</li>
                          <li class="list-group-item p-2">${address}</li>
                          <li class="list-group-item p-2">${item.phone}</li>
                          <li class="list-group-item p-2">${item.website}</li>
                          <li class="list-group-item p-2">${company}</li>`;
  } else {
    listItem.innerHTML = `<li class="list-group-item p-2">${item.name}</li>
                          <li class="list-group-item p-2">${item.email}</li>
                          <li class="list-group-item p-2">${item.phone}</li>
                          <li class="list-group-item p-2">${item.website}</li>`;
  }

  divContainer.appendChild(listItem);

  li.appendChild(userName);
  li.appendChild(divContainer);
  fragment.appendChild(li);
  return li;
}

function createNewUser(
  name,
  username,
  email,
  phone,
  website,
  address,
  company
) {
  const userObj = {
    id: Math.random()
      .toString()
      .replace(".", ""),
    name,
    username,
    email,
    phone,
    website,
    address,
    company
  };
  return userObj;
}

function showLoader() {
  const loader = document.querySelector(".loader");
  const div = document.createElement("div");
  div.classList.add("progress");
  div.innerHTML = `<div class="progress-bar progress-bar-striped progress-bar-danger active" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>`;
  loader.appendChild(div);
  titleHw.classList.add("d-none");
  formSection.classList.add("d-none");
  containerUsers.classList.add("d-none");
}


function removeLoader() {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.remove();
  }
  titleHw.classList.add("d-block");
  formSection.classList.add("d-block");
  containerUsers.classList.add("d-block");
}