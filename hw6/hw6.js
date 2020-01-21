const containerPosts = document.querySelector(".container-posts");
const url = "https://jsonplaceholder.typicode.com/posts";
const headers = {
  "Content-type": "application/json; charset=UTF-8"
};
const form = document.forms.addPost;
form.addEventListener("submit", onFormSubmit);
containerPosts.addEventListener("click", containerBtnHandler);

const http = {
  getPosts: async function (cb) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      cb(data);
    } catch (err) {
      throw new Error('error' + response.statusText);
    }
  },
  deletePost: async function (id) {
    try {
      const response = await fetch(`${url}/${id}`);
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error('error' + response.statusText);
    }
  },
  createPost: async function (data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: headers
      });
      const json = await response.json();
      return json;
    } catch (err) {
      throw new Error('error' + response.statusText);
    }
  },
  putPost: async function (id, data) {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: headers
      });
      const json = await response.json();
      return json;
    } catch (err) {
      throw new Error('error' + response.statusText);
    }
  }
};

http.getPosts(renderPosts);

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

function newPostTemplate(title, body) {
  const postObj = {
    id: Math.random()
      .toString()
      .replace(".", ""),
    title,
    body
  };
  return postObj;
}

function validatePost(inputTitle, inputText) {
  if (!inputTitle || !inputText || !inputTitle.value || !inputText.value) {
    return;
  }
  const newPostObj = newPostTemplate(inputTitle.value, inputText.value);
  return newPostObj;
}

function onFormSubmit(e) {
  e.preventDefault();
  const inputTitle = form.elements.title;
  const inputText = form.elements.body;
  const newPostObj = validatePost(inputTitle, inputText);

  http.createPost(newPostObj).then(post => {
    const newPost = templateItem(post);
    containerPosts.insertAdjacentElement("afterbegin", newPost);
  });
  form.reset();
}

function onDelete(id) {
  const el = document.getElementById(id);
  http.deletePost(id).then(post => el.remove(post));
}

function updatePost(id) {
  const el = document.getElementById(id);
  const inputTitle = el.querySelector("#inputTitle");
  const inputText = el.querySelector("#inputBody");
  const changedPostObj = validatePost(inputTitle, inputText);

  if (!changedPostObj) {
    return;
  }
  http.putPost(id, changedPostObj).then(post => {
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