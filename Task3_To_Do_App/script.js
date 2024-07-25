document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const completedTasksList = document.getElementById('completedTasks');
    
    
    document.addEventListener('keydown', handleKeyPress);

    function handleKeyPress(event) {
        // Check if the key pressed is Enter (keyCode 13) or (key "Enter")
        if (event.key === 'Enter' || event.keyCode === 13) {
          // Trigger the button click
          addTaskBtn.click();
        }
    }
    

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Done';
        completeButton.className = 'complete-btn';
        completeButton.addEventListener('click', function() {
            completeTask(li);
        });

        li.appendChild(completeButton);
        taskList.appendChild(li);
    }

    function completeTask(taskItem) {
        taskItem.classList.add('completed');
        const completeButton = taskItem.querySelector('.complete-btn');
        completeButton.remove();

        completedTasksList.appendChild(taskItem);

        let completedTasksHeader = document.getElementById('completedTasksHeader');
        if (!completedTasksHeader) {
            completedTasksHeader = document.createElement('h2');
            completedTasksHeader.id = 'completedTasksHeader';
            completedTasksHeader.textContent = 'Completed Tasks';
            completedTasksList.parentNode.insertBefore(completedTasksHeader, completedTasksList);
        }
    }
});
