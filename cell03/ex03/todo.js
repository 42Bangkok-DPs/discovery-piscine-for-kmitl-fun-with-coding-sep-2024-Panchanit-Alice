$(document).ready(function () {
    // ฟังก์ชันเพิ่มงานใน DOM
    function addTask(taskText) {
        var taskDiv = $('<div>').text(taskText); // สร้าง <div> สำหรับงานใหม่
        taskDiv.click(function () {
            if (confirm('Do you want to remove this TO DO?')) {
                taskDiv.remove(); // ลบงานออกจาก DOM
                saveTasks(); // อัปเดตคุกกี้หลังลบ
            }
        });
        $('#ft_list').prepend(taskDiv); // ใส่งานใหม่ไว้ด้านบนสุด
    }

    // ฟังก์ชันบันทึกรายการงานลงคุกกี้
    function saveTasks() {
        var tasks = [];
        $('#ft_list > div').each(function () {
            tasks.push($(this).text()); // เก็บงานแต่ละงานใน array
        });

        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // ตั้งค่าวันหมดอายุ
        var cookieValue = "tasks=" + JSON.stringify(tasks) + ";path=/;expires=" + expirationDate.toUTCString();

        console.log("Saving cookie:", cookieValue); // ตรวจสอบการบันทึกคุกกี้
        document.cookie = cookieValue; // บันทึกคุกกี้พร้อมวันหมดอายุ
    }

    // ฟังก์ชันโหลดรายการงานจากคุกกี้เมื่อเปิดหน้าเว็บ
    function loadTasks() {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.startsWith('tasks=')) {
                var tasks = JSON.parse(cookie.substring(6)); // ดึงค่าจากคุกกี้
                for (var j = 0; j < tasks.length; j++) {
                    addTask(tasks[j]); // เรียกฟังก์ชันเพิ่มงาน
                }
            }
        }
    }

    // โหลดรายการ TO DO จากคุกกี้เมื่อหน้าเว็บถูกเปิดขึ้น
    loadTasks();

    // ฟังก์ชันสร้างงานใหม่
    $('#new-task').click(function () {
        var task = prompt('Enter a new TO DO:'); // แสดงหน้าต่างให้ผู้ใช้กรอกงานใหม่
        if (task && task.trim() !== "") { // ถ้าผู้ใช้กรอกข้อมูล
            addTask(task);
            saveTasks(); // บันทึกลงคุกกี้
        }
    });
});
