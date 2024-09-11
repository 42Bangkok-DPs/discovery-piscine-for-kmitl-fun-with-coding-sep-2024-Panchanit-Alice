// โหลดรายการ TO DO จากคุกกี้เมื่อหน้าเว็บถูกเปิดขึ้น
window.onload = function() {
    loadTasks();
};

// ฟังก์ชันสร้างงานใหม่
document.getElementById('new-task').onclick = function() {
    var task = prompt('Enter a new TO DO:'); // แสดงหน้าต่างให้ผู้ใช้กรอกงานใหม่
    if (task && task.trim() !== "") { // ถ้าผู้ใช้กรอกข้อมูล
        addTask(task);
        saveTasks(); // บันทึกลงคุกกี้
    }
};

// ฟังก์ชันเพิ่มงานใน DOM
function addTask(taskText) {
    var taskDiv = document.createElement('div'); // สร้าง <div> สำหรับงานใหม่
    taskDiv.textContent = taskText; // ใส่เนื้อหาของงาน
    taskDiv.onclick = function() {
        var confirmDelete = confirm('Do you want to remove this TO DO?');
        if (confirmDelete) {
            taskDiv.remove(); // ลบงานออกจาก DOM
            saveTasks(); // อัปเดตคุกกี้หลังลบ
        }
    };
    var list = document.getElementById('ft_list'); 
    list.insertBefore(taskDiv, list.firstChild); // ใส่งานใหม่ไว้ด้านบนสุด
}

// ฟังก์ชันบันทึกรายการงานลงคุกกี้
function saveTasks() {
    var tasks = [];
    var taskDivs = document.getElementById('ft_list').children;
    for (var i = 0; i < taskDivs.length; i++) {
        tasks.push(taskDivs[i].textContent); // เก็บงานแต่ละงานใน array
    }
    document.cookie = "tasks=" + JSON.stringify(tasks) + ";path=/"; // บันทึกลงคุกกี้
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
