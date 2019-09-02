class Task{
	constructor(name, isComplete = false) {
		this.name = name;
		this.isComplete = isComplete;
	}

	complete() {
		this.isComplete = !this.isComplete;
	}
}

class Pomodoro{

	constructor(pomodoroMin, freeMin) {
	  this.pomodoroMin = pomodoroMin;
	  this.freeMin = freeMin;
	}
	//iniciar conteo
	start() {
		this.runPomodoroTime();
	}
	//detener conteo
	stop(){

	}
	//contar cantidad de pomodoros
	runPomodoroTime(){
		this.countDown(this.pomodoroMin);
		setTimeout(() => {
	  	this.runFreeTime();
		  // alert(this.pomodoroMin);
		}, this.pomodoroMin * 60000);
	}

	runFreeTime(){
		setTimeout(() => {
	  	this.runPomodoroTime()
		  // alert(this.freeMin);
		}, this.freeMin * 60000);
		this.countDown(this.freeMin);
	}

	countDown(min){
		let ms = min * 60000;
		let myCountDown = setInterval(() => {
		ms -= 1000;
	  		let minutes = Math.floor(ms/(1000*60)),
		  		seconds = Math.floor((ms%(1000*60))/1000);
	  		document.body.innerHTML = `${minutes}:${seconds}`
  			if (ms === 0) {
  				clearInterval(myCountDown);
  			}
		}, 1000);
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
		console.log(task);
		this.saveTasks(this.tasks);
		this.renderTasks();
	}

	removeTask(i) {
		this.tasks.splice(i,1);
		this.saveTasks(this.tasks);
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
 		localStorage.setItem("@todopo:tasks", JSON.stringify(tasks));
	}

	loadTasks(){
		const tasks = JSON.parse(localStorage.getItem("@todopo:tasks"));
		if (tasks) {
			this.tasks = tasks.map((task) => new Task(task.name, task.isComplete));
			this.renderTasks();
		}
	}
}

const addTaskElement = document.getElementById('add-task');
const tasksContainerElement = document.getElementById('tasks-container');

const inbox = new TaskList('inbox', tasksContainerElement);
const pomodoro = new Pomodoro(0.4,0.2);

pomodoro.start();
inbox.loadTasks();

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