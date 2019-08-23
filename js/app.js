class Task{
	constructor(name) {
		this.name = name;
		this.isComplete = false;
	}

	complete() {
		this.isComplete = !this.isComplete;
	}
}

class TaskList{
	constructor(name, element){
		this.name = name;
		this.element = element;
		this.tasks = [];
		// this.tasks = this.loadTasks();
		// this.renderTasks();
	}

	addTask(task) {
		this.tasks.push(task);
		// this.saveTasks(this.tasks);
		this.renderTasks();
	}

	removeTask(i) {
		this.tasks.splice(i,1);
		// this.saveTasks(this.tasks);
		this.renderTasks();
	}

	renderTasks() {

		let tasks = this.tasks.map((task) => `
			<li class="task">
				<input type="checkbox" ${task.isComplete? 'checked' : ''} class="task__complete-button">
				<span class="task__name">${task.name}</span>
				<a href="#" class="task__remove-button">X</a>
			</li>
		`);
		this.element.innerHTML = tasks.reduce((a,b) => a + b, '');
	}

	saveTasks(tasks){
		localStorage.setItem("@todopo:tasks", tasks);
		// localStorage.setItem("@todopo:tasks", JSON.stringify(tasks));
	}

	loadTasks(tasks){
		return localStorage.getItem("@todopo:tasks");
		// localStorage.getItem("@todopo:tasks", JSON.stringify(tasks));
	}
}

const addTaskElement = document.getElementById('add-task');
const tasksContainerElement = document.getElementById('tasks-container');

const inbox = new TaskList('inbox', tasksContainerElement);


// Añadir tareas desde el DOM
function addDOMTask(e){
	if (e.key === 'Enter') {
		const task = new Task(this.value);
		inbox.addTask(task);
		this.value = null;
	}
}
addTaskElement.addEventListener('keyup', addDOMTask);

function getIndexTask(e) {
	let taskItem = e.target.parentElement,
		tasksItems = [...inbox.element.querySelectorAll('li')];
	return tasksItems.indexOf(taskItem);
}

// Eliminar tareas desde el DOM
function removeDOMTask(e){
	if (e.target.tagName === 'A') {
		inbox.removeTask(getIndexTask(e));
	}
}
tasksContainerElement.addEventListener('click', removeDOMTask);

// Completar tareas desde el DOM
function completeDOMTask(e){
	if (e.target.tagName === 'INPUT') {
		inbox.tasks[getIndexTask(e)].complete();
	}
		console.table(inbox.tasks);
}
tasksContainerElement.addEventListener('click', completeDOMTask);