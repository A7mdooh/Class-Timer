// تحديث الساعة الرقمية بالتنسيق 12 ساعة
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // تحويل الساعة إلى 12 ساعة

    document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    setTimeout(updateClock, 1000);
}

// تحميل بيانات المدرسة من schoolData.js
function loadSchoolInfo() {
    document.getElementById("school-name").textContent = schoolData.schoolName;
    document.getElementById("manager-name").textContent = schoolData.managerName;
    document.getElementById("assistant-manager-name").textContent = schoolData.assistantManagerName;
}

// تحميل بيانات الأحداث من eventsData.js
function loadEvents() {
    const selectedDay = document.getElementById("day-select").value;
    const matchingEvents = eventsData.filter(event => event.day === selectedDay);
    updateEventsTable(matchingEvents);
}



// تحميل الأحداث بناءً على اليوم المحدد من قائمة الأيام
function loadEvents() {
    const selectedDay = document.getElementById("day-select").value;
    // ملاحظة: يجب تضمين مكتبة JavaScript مثل SheetJS لقراءة ملفات Excel في المتصفح مباشرة

    fetch("events.xlsx").then(response => {
        // هنا يجب عليك معالجة البيانات باستخدام مكتبة Excel لتحليل الأحداث في يوم معين
        // مثال على حدث ثابت للتوضيح
        const exampleEvents = [
            { name: "حصة رياضيات", start: "09:00 AM", end: "10:00 AM", teacher: "الأستاذ علي", class: "الصف الخامس" },
            { name: "حصة علوم", start: "10:15 AM", end: "11:15 AM", teacher: "الأستاذة فاطمة", class: "الصف السادس" }
        ];

        updateEventsTable(exampleEvents);
    }).catch(error => {
        console.error("خطأ في تحميل ملف الأحداث:", error);
        updateEventsTable([]);
    });
}

// تحديث الجدول بالأحداث المستوردة
function updateEventsTable(events) {
    const tableBody = document.querySelector("#events-table tbody");
    tableBody.innerHTML = "";

    if (events.length > 0) {
        events.forEach(event => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${event.name}</td>
                <td>${event.start}</td>
                <td>${event.end}</td>
                <td>${event.teacher}</td>
                <td>${event.class}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="5">لا توجد أحداث بالوقت الحالي</td>`;
        tableBody.appendChild(row);
    }
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    updateClock();          // تشغيل الساعة الرقمية
    loadSchoolInfo();       // تحميل بيانات المدرسة
    loadEvents();           // تحميل الأحداث
    document.getElementById("day-select").addEventListener("change", loadEvents); // تحديث الأحداث عند تغيير اليوم
    document.getElementById("exit-button").addEventListener("click", () => window.close()); // زر إنهاء التطبيق
});
