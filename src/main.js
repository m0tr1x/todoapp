// Иммутабельные данные
let tasks = [];

// Получаем элементы DOM
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const filterSelect = document.getElementById('filter-tasks');

// Чистая функция для добавления задачи
const addTask = (taskText) => {
    return [...tasks, { text: taskText, completed: false }];
};

// Чистая функция для изменения статуса задачи
const toggleTaskCompletion = (index) => {
    return tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
    );
};

// Чистая функция для удаления задачи
const deleteTask = (index) => {
    return tasks.filter((_, i) => i !== index);
};

// Чистая функция для фильтрации задач
const filterTasks = (filter) => {
    if (filter === 'completed') {
        return tasks.filter((task) => task.completed);
    }
    if (filter === 'incomplete') {
        return tasks.filter((task) => !task.completed);
    }
    return tasks;
};

// Функция для рендеринга задач
const renderTasks = (tasksToRender) => {
    taskList.innerHTML = ''; // Очистить список перед рендером
    tasksToRender.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.toggle('completed', task.completed);

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        const toggleButton = document.createElement('button');
        toggleButton.textContent = task.completed ? 'Отменить' : 'Выполнено';
        toggleButton.onclick = () => {
            tasks = toggleTaskCompletion(index);
            renderTasks(filterTasks(filterSelect.value));
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.onclick = () => {
            tasks = deleteTask(index);
            renderTasks(filterTasks(filterSelect.value));
        };

        taskElement.appendChild(taskText);
        taskElement.appendChild(toggleButton);
        taskElement.appendChild(deleteButton);
        taskList.appendChild(taskElement);
    });
};

// Обработчик нажатия на кнопку добавления задачи
addTaskButton.onclick = () => {
    const newTaskText = newTaskInput.value.trim();
    if (newTaskText) {
        tasks = addTask(newTaskText);
        newTaskInput.value = ''; // Очистить поле ввода
        renderTasks(filterTasks(filterSelect.value));
    }
};

// Обработчик фильтрации задач
filterSelect.onchange = () => {
    renderTasks(filterTasks(filterSelect.value));
};

// Первоначальный рендер
renderTasks(tasks);
