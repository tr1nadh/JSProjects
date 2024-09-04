document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('task-form');

    form.addEventListener('submit', function(event) {

        event.preventDefault();

        const task = document.getElementById('task').value;

        if (task === '') {
            alert("Add task");
            return;
        }

        addTask(task);
    })
});

let noOfAddedTasks = 0;

function addTask(task) {
    if (noOfAddedTasks === 0) document.getElementById('noTasksSpan').style.display = 'none';

    noOfAddedTasks++;
    document.getElementById('no-of-tasks').innerHTML = "No of tasks: " + noOfAddedTasks;

    const taskList = document.getElementById('task-list');

    const newDiv = document.createElement("div");
    newDiv.className = 'alert alert-primary text-start';
    newDiv.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-primary align-end';
    deleteButton.innerHTML = 'X';
    deleteButton.addEventListener('click', deleteTask)

    newDiv.appendChild(deleteButton);

    taskList.appendChild(newDiv);

    document.getElementById('task').value = '';
}

function deleteTask(event) {
    decreaseTaskCount();
    
    const taskItem = event.target.parentElement;

    taskItem.remove();
}

function decreaseTaskCount() {
    noOfAddedTasks--;
    document.getElementById('no-of-tasks').innerHTML = "No of tasks: " + noOfAddedTasks;
}

function clearAllTasks() {
    noOfAddedTasks = 0;
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const noOfTasks = document.createElement('p');
    noOfTasks.innerHTML = 'No of tasks: ' + noOfAddedTasks;
    noOfTasks.id = 'no-of-tasks';
    taskList.appendChild(noOfTasks);

    const newDiv = document.createElement("div");
    newDiv.className = 'alert alert-primary';
    newDiv.id = 'noTasksSpan';
    newDiv.textContent = 'No tasks';
    document.getElementById('task-list').appendChild(newDiv);
}