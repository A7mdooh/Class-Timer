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

// تحديث الأحداث بناءً على اليوم المحدد من المستخدم والوقت الحالي
function loadEventsForSelectedDay() {
    const now = new Date();
    const selectedDay = document.getElementById("day-select").value;
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    // تصفية الأحداث بناءً على اليوم والوقت الحالي
    const matchingEvents = eventsData.filter(event => {
        return event.day === selectedDay && currentTime >= event.start && currentTime < event.end;
    });

    // تحديث الجدول بالأحداث المتوافقة
    updateEventsTable(matchingEvents);
}

// تحديث الجدول بالأحداث
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
        row.innerHTML = `<td colspan="5">لا توجد أحداث متوافقة مع اليوم والوقت الحالي</td>`;
        tableBody.appendChild(row);
    }
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    updateClock();          // تشغيل الساعة الرقمية
    loadSchoolInfo();       // تحميل بيانات المدرسة
    loadEventsForSelectedDay(); // تحميل الأحداث المتوافقة مع اليوم الحالي

    // تحديث الأحداث عند تغيير اليوم من القائمة
    document.getElementById("day-select").addEventListener("change", loadEventsForSelectedDay);
});
