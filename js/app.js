class Task{
	constructor(name) {
		this.name = name;
		this.isComplete = false;
	}

	completed() {
		this.isComplete = !this.isComplete;
	}
}

class TaskList{
	constructor(name, element){
		this.name = name;
		this.element = element;
		this.tasks = [];
	}

	addTask(task) {
		this.tasks.push(task);
		this.renderTasks();
	}

	removeTask(i) {
		this.tasks.splice(i,1);
		this.renderTasks();
	}

	renderTasks() {
		let tasks = this.tasks.map((task) => `
			<li class="task">
				<input type="checkbox" class="task__complete-button">
				<span class="task__name">${task.name}</span>
				<a href="#" class="task__remove-button">X</a>
			</li>
		`);
		this.element.innerHTML = tasks.reduce((a,b) => a + b);
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

// Eliminar tareas desde el DOM
function removeDOMTask(e){
	if (e.target.tagName === 'A') {
		console.dir('e');

	}
	// if (e.key === 'Enter') {
	// 	const task = new Task(this.value);
	// 	inbox.addTask(task);
	// 	this.value = null;
	// 	console.dir(this);
	// }
}
tasksContainerElement.addEventListener('click', removeDOMTask);
