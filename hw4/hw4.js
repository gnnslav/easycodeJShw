const tasks = [{
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
        body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095c1288e0',
        completed: false,
        body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
        _id: '5d2ca9e2e03d40b3232496aa7',
        completed: true,
        body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095564788e0',
        completed: false,
        body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
];

(function (arrOfTasks) {

    const objOfTasks = arrOfTasks.reduce((accumulator, task) => {
        accumulator[task._id] = task;
        return accumulator;
    }, {});
    const container = document.querySelector('.container .list-group');
    const form = document.forms.addTask;
    const inputTitle = form.elements.title;
    const inputBody = form.elements.body;

    renderAllTasks(objOfTasks);
    form.addEventListener('submit', onFormSubmit);
    container.addEventListener('click', onDelete);

    function renderAllTasks(taskList) {
        if (!taskList) {
            const error = '!!!!!!!!!!!!!!!!!!!!!!!!';
        }
        const fragment = document.createDocumentFragment();

        Object.values(taskList).forEach(function (task) {
            const li = templateLi(task);
            fragment.appendChild(li);
        });
        container.appendChild(fragment);
    }

    function templateLi({
        _id,
        title,
        body
    }) {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');

        const span = document.createElement('span');
        span.textContent = title;

        const delBtn = document.createElement('button');
        delBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

        const text = document.createElement('p');
        text.classList.add('mt-2', 'w-100');
        text.textContent = body;

        li.appendChild(span);
        li.appendChild(delBtn);
        li.appendChild(text);

        return li;
    }

    function onFormSubmit(e) {
        e.preventDefault();
        const titleValue = inputTitle.value;
        const bodyValue = inputBody.value;

        if (!titleValue || !bodyValue) {
            console.error('!!!!!!!');
            return;
        }
        const task = createNewTask(titleValue, bodyValue);
        /*jshint -W087 */
        //debugger;
        const listItem = templateLi(task);
        container.insertAdjacentElement('beforebegin', listItem);
        form.reset();
    }

    function createNewTask(title, body) {
        const newTask = {
            title,
            body,
            completed: false,
            _id: '1'
        };
        console.log(newTask);
        objOfTasks[newTask._id] = newTask;
        return {
            ...newTask
        };
    }

    function onDelete(e) {
        console.log(1);
        if (e.target.classList.contains('delete-btn')) { 

        }
    }
})(tasks);