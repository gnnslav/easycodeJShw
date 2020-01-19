const containerPosts = document.querySelector(".container-posts");
const url = "https://jsonplaceholder.typicode.com/posts";
const form = document.forms.addPost;
const inputTitle = form.elements.title;
const inputText = form.elements.body;
form.addEventListener("submit", onFormSubmit);
containerPosts.addEventListener("click", containerBtnHandler);

const httpService = {
  getPost: async function () {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
  delPost: async function (id) {
    const response = await fetch(url + "/" + id);
    const data = await response.json();
    return data;
  },
  postPost: async function (data) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const json = await response.json();
    return json;
  },
  putPost: async function (id, data) {
    const response = await fetch(url + "/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const json = await response.json();
    return json;
  }
};
// function postsService(url, method, data) {
//     return fetch(url, {
//             method: method,
//             headers: {
//                 "Content-type": "application/json; charset=UTF-8"
//             },
//             body: data
//         })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//         })
//         .catch(err => console.log(err));
// }

// postsService(url, 'GET')
//     .then(post => renderPosts(post));
httpService.getPost().then(post => renderPosts(post));

function renderPosts(response) {
  const postList = response;
  const fragment = document.createDocumentFragment();
  postList.forEach(function (post) {
    const li = templateItem(post);
    fragment.appendChild(li);
  });
  containerPosts.appendChild(fragment);
}

function templateItem(item) {
  const fragment = document.createDocumentFragment();
  const li = document.createElement("li");
  li.classList.add("card", "mt-3");
  li.id = item.id;

  li.innerHTML = `<h5 class = "card-title">${item.title}</h5>
                    <p class = "card-body">${item.body}</p>
                    <div>
                        <button class="btn btn-primary update">UPDATE</button>
                        <button class="btn btn-danger del">DELETE</button>
                    </div>`;
  fragment.appendChild(li);
  return li;
}

function createNewPost(title, body) {
  const postObj = {
    id: Math.random()
      .toString()
      .replace(".", ""),
    title,
    body
  };
  return postObj;
}

// function onFormSubmit(e) {
//     e.preventDefault();

//     const titleValue = inputTitle.value;
//     const textValue = inputText.value;

//     if (!titleValue || !textValue) {
//         return;
//     }
//     const newPostObj = createNewPost(
//         titleValue,
//         textValue
//     );
//     postsService(url, 'POST', JSON.stringify(newPostObj))
//         .then(post => {
//             const newPost = templateItem(post);
//             containerPosts.insertAdjacentElement("afterbegin", newPost);
//         });
//     form.reset();
// }
function onFormSubmit(e) {
  e.preventDefault();

  const titleValue = inputTitle.value;
  const textValue = inputText.value;

  if (!titleValue || !textValue) {
    return;
  }
  const newPostObj = createNewPost(titleValue, textValue);

  httpService.postPost(newPostObj).then(post => {
    const newPost = templateItem(post);
    containerPosts.insertAdjacentElement("afterbegin", newPost);
  });
  form.reset();
}
// function onDelete(id) {
//     const el = document.getElementById(id);
//     postsService(url + '/' + id, 'DELETE')
//         .then(post => {
//             el.remove(post);
//         });
// }
function onDelete(id) {
  const el = document.getElementById(id);
  httpService.delPost(id).then(post => el.remove(post));
}
// function updatePost(id) {

//     const el = document.getElementById(id);
//     const inputTitle = el.querySelector('#inputTitle');
//     const inputText = el.querySelector('#inputBody');

//     if (!inputTitle || !inputText) {
//         return;
//     }
//     const chengedPostObj = createNewPost(
//         inputTitle.value,
//         inputText.value
//     );

//     postsService(url + '/' + id, 'PUT', JSON.stringify(chengedPostObj))
//         .then(post => {
//             const newPost = templateItem(post);
//             containerPosts.replaceChild(newPost, el);
//         });

// }
function updatePost(id) {
  const el = document.getElementById(id);
  const inputTitle = el.querySelector("#inputTitle");
  const inputText = el.querySelector("#inputBody");

  if (!inputTitle || !inputText || !inputTitle.value || !inputText.value) {
    return;
  }
  const changedPostObj = createNewPost(inputTitle.value, inputText.value);

  httpService.putPost(id, changedPostObj).then(post => {
    const newPost = templateItem(post);
    containerPosts.replaceChild(newPost, el);
  });

}

function createInput(el) {
  if (el.querySelector("input")) {
    return;
  }
  const div = document.createElement("div");
  div.classList.add('pb-2');
  div.innerHTML = `<input type="text" id="inputTitle" placeholder="Post title">
                    <input type="text" id="inputBody" placeholder="Post text">`;
  el.lastChild.insertAdjacentElement("afterbegin", div);
}

function containerBtnHandler(e) {
  const parent = e.target.parentNode;
  const id = parent.parentNode.id;
  if (e.target.classList.contains("del")) {
    onDelete(id);
  }
  if (e.target.classList.contains("card-body")) {
    createInput(parent);
  }
  if (e.target.classList.contains("update")) {
    updatePost(id);
  }
}