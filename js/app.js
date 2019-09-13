class Task{
	constructor(name, isComplete = false) {
		this.name = name;
		this.isComplete = isComplete;
		this.count = 0;
	}

	complete() {
		this.isComplete = !this.isComplete;
	}
}

class Pomodoro{

	constructor(pomodoroMin, freeMin, element) {
		this.ms = 0;
		this.element = element;
		this.count = 0;
		this.countTask = 0;
	  	this.pomodoroMin = pomodoroMin;
  		this.freeMin = freeMin;
	}
	//iniciar conteo
	start(countTask) {
		this.runPomodoroTime();
		element.value++
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
		this.count++;  
		console.log(this.count);
		}, this.pomodoroMin * 60000);
	}

	runFreeTime(){
		this.countDown(this.freeMin);
		setTimeout(() => {
	  	this.runPomodoroTime()
		  // alert(this.freeMin);
		}, this.freeMin * 60000);
	}

	countDown(min){
		this.ms = min * 60000;
		let myCountDown = setInterval(() => {
		this.ms -= 1000;
  			if (this.ms<=0) {
  				clearInterval(myCountDown);
  			}
	  		let minutes = Math.floor(this.ms/(1000*60)),
		  		seconds = Math.floor((this.ms%(1000*60))/1000);
	  		this.element.innerHTML = `${minutes}:${seconds}`
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
		let tasks = this.tasks.map((task,key) => `
			<li class="task">
				<input type="checkbox" ${task.isComplete? 'checked' : ''} class="task__complete-button" name="task__complete-button">
				<span class="task__name">${task.name}</span>
				<input type="button" class="task__start-button" name="task__start-button" value="Start">
				<span class="task__count" name="task__count" id="task__count_${key}">${task.count}</span>
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
const pomodoroTimeElement = document.getElementById('pomodoro-time');
const inbox = new TaskList('inbox', tasksContainerElement);
const pomodoro = new Pomodoro(0.4,0.2,pomodoroTimeElement);

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
	console.log(taskItem);
	return tasksItems.indexOf(taskItem);
}

function getElementTask(e) {
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
	if (
		e.target.tagName === 'INPUT' 
		&& e.target.type === 'checkbox' 
		&& e.target.name === 'task__complete-button'
	) {
		inbox.tasks[getIndexTask(e)].complete();
		inbox.saveTasks(inbox.tasks);
	}
}
tasksContainerElement.addEventListener('click', completeDOMTask);

function runDOMPomodoro(e){
	if (
		e.target.tagName === 'INPUT' 
		&& e.target.type === 'button' 
		&& e.target.name === 'task__start-button'
	) {
		pomodoro.start();
	}
}
tasksContainerElement.addEventListener('click', runDOMPomodoro);