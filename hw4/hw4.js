const tasks = [{
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title: "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title: "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  }
];
// const STATE = {
//   SHOW_ALL: 0,
//   SHOW_UNCOMPLETED: 1
// };
(function (arrOfTasks) {
  let itemBgColor = "#007bff4f";
  const objOfTasks = arrOfTasks.reduce((accumulator, task) => {
    accumulator[task._id] = task;
    return accumulator;
  }, {});
  const sortedTasks = sortItem(arrOfTasks);
  const container = document.querySelector(".container .list-group");
  const form = document.forms.addTask;
  const inputTitle = form.elements.title;
  const inputBody = form.elements.body;
  const containerBtn = document.querySelector(".container-btn");
  const conteinerMsg = document.querySelector(".conteiner-msg");

  templateTasks(sortedTasks);
  form.addEventListener("submit", onFormSubmit);
  container.addEventListener("click", containerTaskHandler);
  containerBtn.addEventListener("click", containerBtnHandler);
  emptyArrMsg(Object.values(objOfTasks));

  // function renderTasks(state) {
  //   const taskList = Object.values(objOfTasks)
  //     .sort(function (a, b) {
  //       if (a.completed < b.completed) {
  //         return -1;
  //       }
  //       if (a.completed > b.completed) {
  //         return 1;
  //       }
  //     })
  //     .filter(task => (state ? !task.completed : task));
  //   emptyArrMsg(taskList);
  //   templateTasks(taskList);
  // }

  function emptyArrMsg(arr) {
    if (arr.length == 0) {
      conteinerMsg.innerHTML = "";
      renderMsg("Массив с задачами пустой");
    }
  }

  function sortItem(obj) {
    const arr = Object.values(obj);
    return arr.sort(function (a, b) {
      if (a.completed < b.completed) {
        return -1;
      }
      if (a.completed > b.completed) {
        return 1;
      }
    });
  }

  function filterItem(obj) {
    const arr = Object.values(obj);
    return arr.filter(
      task => !task.completed
    );
  }

  function templateTasks(taskList) {
    container.innerHTML = "";
    const fragment = document.createDocumentFragment();
    taskList.forEach(function (task) {
      const li = templateLi(task);
      if (task.completed) {
        li.style.backgroundColor = itemBgColor;
      }
      fragment.appendChild(li);
    });
    container.appendChild(fragment);
  }

  function templateLi({
    _id,
    title,
    body
  }) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );
    li.setAttribute("data-task-id", _id);

    const span = document.createElement("span");
    span.textContent = title;

    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-danger", "ml-2", "delete-btn");
    delBtn.textContent = "DELETE";

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("btn", "btn-primary", "ml-auto", "complete-btn");
    doneBtn.textContent = "DONE";

    const text = document.createElement("p");
    text.classList.add("mt-2", "w-100");
    text.textContent = body;

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(delBtn);
    li.appendChild(text);

    return li;
  }

  function renderMsg(text) {
    const fragment = document.createDocumentFragment();
    const div = document.createElement("div");

    const span = document.createElement("span");
    span.textContent = text;

    div.appendChild(span);
    fragment.appendChild(div);
    conteinerMsg.appendChild(fragment);
  }

  function onFormSubmit(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      conteinerMsg.innerHTML = "";
      const text = "Введите данные";
      renderMsg(text);
      return;
    }
    conteinerMsg.innerHTML = "";
    const task = createNewTask(titleValue, bodyValue);
    const listItem = templateLi(task);
    container.insertAdjacentElement("afterbegin", listItem);
    arrOfTasks.push(task);
    form.reset();
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: Math.random()
        .toString()
        .replace(".", "5d2ca9e2")
    };
    objOfTasks[newTask._id] = newTask;
    return {
      ...newTask
    };
  }

  function delTask(id) {
    delete objOfTasks[id];
  }

  function completedTasks(id, el) {
    if (!objOfTasks[id].completed) {
      objOfTasks[id].completed = true;
      el.style.backgroundColor = itemBgColor;
    } else {
      objOfTasks[id].completed = false;
      el.style.backgroundColor = "";
    }
  }

  function containerTaskHandler(e) {
    const parent = e.target.closest("[data-task-id]");
    const id = parent.dataset.taskId;
    if (e.target.classList.contains("complete-btn")) {
      completedTasks(id, parent);
    }
    if (e.target.classList.contains("delete-btn")) {
      delTask(id);
      parent.remove();
    }
  }

  function containerBtnHandler(e) {
    emptyArrMsg(Object.values(objOfTasks));
    if (e.target.classList.contains("all-tasks")) {

      const sortItems = sortItem(objOfTasks);
      templateTasks(sortItems);
    }
    if (e.target.classList.contains("completed-tasks")) {
      const unCompletedTasks = filterItem(objOfTasks);
      templateTasks(unCompletedTasks);
    }
  }

  // function containerBtnHandler(e) {
  //   if (e.target.classList.contains("all-tasks")) {
  //     renderTasks(STATE.SHOW_ALL);
  //   }
  //   if (e.target.classList.contains("completed-tasks")) {
  //     renderTasks(STATE.SHOW_UNCOMPLETED);
  //   }
  // }
})(tasks);