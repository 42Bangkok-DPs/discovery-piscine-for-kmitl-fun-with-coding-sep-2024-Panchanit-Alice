$(document).ready(function () {
    function addTask(taskText) {
        var taskDiv = $('<div>').text(taskText);
        taskDiv.click(function () {
            if (confirm('Do you want to remove this TO DO?')) {
                taskDiv.remove();
                saveTasks();
            }
        });
        $('#ft_list').prepend(taskDiv); // ใส่ div ที่สร้างใหม่ไว้ด้านบน
    }

    function saveTasks() {
        var tasks = [];
        $('#ft_list > div').each(function () {
            tasks.unshift($(this).text()); // เพิ่มรายการใหม่ไว้ที่ต้น array
        });

        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        var cookieValue = "tasks=" + JSON.stringify(tasks) + ";path=/;expires=" + expirationDate.toUTCString();

        console.log("Saving cookie:", cookieValue);
        document.cookie = cookieValue;
    }

    function loadTasks() {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.startsWith('tasks=')) {
                var tasks = JSON.parse(cookie.substring(6));
                for (var j = 0; j < tasks.length; j++) {
                    addTask(tasks[j]); // แสดงจากรายการแรกไปหลังสุด
                }
            }
        }
    }

    loadTasks();

    $('#new-task').click(function () {
        var task = prompt('Enter a new TO DO:'); 
        if (task && task.trim() !== "") { 
            addTask(task);
            saveTasks();
        }
    });
});
