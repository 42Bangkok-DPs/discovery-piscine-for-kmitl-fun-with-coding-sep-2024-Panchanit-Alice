document.addEventListener('DOMContentLoaded', function () {
    function addTask(taskText) {
        var taskDiv = document.createElement('div'); // สร้าง <div> สำหรับงานใหม่
        taskDiv.textContent = taskText; // เพิ่มข้อความงานลงใน <div>
        taskDiv.addEventListener('click', function () {
            if (confirm('Do you want to remove this TO DO?')) {
                taskDiv.remove(); // ลบงานออกจาก DOM
                saveTasks(); // บันทึกคุกกี้ใหม่หลังจากลบงาน
            }
        });
        document.getElementById('ft_list').prepend(taskDiv); // ใส่ div ที่สร้างใหม่ไว้ด้านบน
    }

    function saveTasks() {
        var tasks = [];
        var taskDivs = document.getElementById('ft_list').children;
        for (var i = 0; i < taskDivs.length; i++) {
            tasks.push(taskDivs[i].textContent); // เพิ่มข้อความของ div แต่ละอันไว้ใน array ลำดับจากบนลงล่าง
        }

        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // ตั้งวันหมดอายุ
        var cookieValue = "tasks=" + JSON.stringify(tasks) + ";path=/;expires=" + expirationDate.toUTCString();

        console.log("Saving cookie:", cookieValue);
        document.cookie = cookieValue; // บันทึกคุกกี้พร้อมวันหมดอายุ
    }

    function loadTasks() {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.startsWith('tasks=')) {
                var tasks = JSON.parse(cookie.substring(6)); // ดึงรายการจากคุกกี้
                for (var j = tasks.length - 1; j >= 0; j--) { // วนรายการจากหลังไปหน้า
                    addTask(tasks[j]); // เพิ่มงานใหม่จากคุกกี้ เริ่มจากรายการสุดท้าย
                }
            }
        }
    }

    // โหลดงานจากคุกกี้เมื่อเปิดหน้าเว็บ
    loadTasks();

    // เมื่อผู้ใช้คลิกปุ่มสร้างงานใหม่
    document.getElementById('new-task').addEventListener('click', function () {
        var task = prompt('Enter a new TO DO:');
        if (task && task.trim() !== "") {
            addTask(task); // เพิ่มงานใหม่
            saveTasks(); // บันทึกงานใหม่ลงคุกกี้
        }
    });
});
