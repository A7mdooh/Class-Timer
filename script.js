// إعداد الصوت لبداية ونهاية الحدث
let startSound = new Audio('start_sound.mp3');
let endSound = new Audio('end_sound.mp3');

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

// تحويل وقت الحدث إلى كائن تاريخ لمقارنته بسهولة
function parseTimeString(timeStr) {
    const now = new Date();
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    now.setHours(hours, minutes, 0, 0);
    return now;
}

// تحميل وعرض الأحداث المتوافقة مع اليوم والوقت الحالي
function loadCurrentEvents() {
    const now = new Date();
    const currentDay = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"][now.getDay()];
    
    const matchingEvents = eventsData.filter(event => {
        return event.day === currentDay &&
               now >= parseTimeString(event.start) &&
               now < parseTimeString(event.end);
    });

    updateEventsTable(matchingEvents);

    if (matchingEvents.length > 0) {
        playStartSound();
        const eventEndTime = parseTimeString(matchingEvents[0].end);
        const timeUntilEnd = eventEndTime - now;
        
        setTimeout(() => {
            playEndSound();
            loadCurrentEvents(); // تحميل الحدث التالي بعد انتهاء الحالي
        }, timeUntilEnd);
    }
}

// تشغيل الصوت لبداية الحدث
function playStartSound() {
    startSound.play();
}

// تشغيل الصوت لنهاية الحدث
function playEndSound() {
    endSound.play();
}

// تحديث الجدول بالأحداث الحالية
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
    loadCurrentEvents();    // تحميل الأحداث الحالية
    setInterval(loadCurrentEvents, 60000); // تحديث الأحداث كل دقيقة
});
