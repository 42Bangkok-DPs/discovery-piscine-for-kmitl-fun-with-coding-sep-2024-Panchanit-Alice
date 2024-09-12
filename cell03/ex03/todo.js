document.addEventListener('DOMContentLoaded', function () {
    function addTask(taskText) {
        var taskDiv = document.createElement('div');
        taskDiv.textContent = taskText;
        taskDiv.addEventListener('click', function () {
            if (confirm('Do you want to remove this TO DO?')) {
                taskDiv.remove();
                saveTasks();
            }
        });
        document.getElementById('ft_list').prepend(taskDiv);
    }

    function saveTasks() {
        var tasks = [];
        var taskDivs = document.getElementById('ft_list').children;
        for (var i = 0; i < taskDivs.length; i++) {
            tasks.push(taskDivs[i].textContent);
        }

        var cookieValue = "tasks=" + JSON.stringify(tasks) + ";path=/";

        console.log("Saving cookie:", cookieValue);
        document.cookie = cookieValue;
    }

    function loadTasks() {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.startsWith('tasks=')) {
                var tasks = JSON.parse(cookie.substring(6));
                for (var j = tasks.length - 1; j >= 0; j--) {
                    addTask(tasks[j]);
                }
            }
        }
    }
    loadTasks();
    document.getElementById('new-task').addEventListener('click', function () {
        var task = prompt('Enter a new TO DO:');
        if (task && task.trim() !== "") {
            addTask(task);
            saveTasks();
        }
    });
});
