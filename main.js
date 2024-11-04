// الحصول على الوقت الحالي ووقت النهاية بعد ساعة واحدة
function createTestEvent() {
    const now = new Date();
    const startHours = String(now.getHours() % 12 || 12).padStart(2, '0');
    const startMinutes = String(now.getMinutes()).padStart(2, '0');
    const startAmPm = now.getHours() >= 12 ? 'PM' : 'AM';
    const start = `${startHours}:${startMinutes} ${startAmPm}`;

    const end = new Date(now.getTime() + 60 * 60 * 1000); // إضافة ساعة واحدة
    const endHours = String(end.getHours() % 12 || 12).padStart(2, '0');
    const endMinutes = String(end.getMinutes()).padStart(2, '0');
    const endAmPm = end.getHours() >= 12 ? 'PM' : 'AM';
    const endStr = `${endHours}:${endMinutes} ${endAmPm}`;

    // إنشاء حدث تجريبي لمدة ساعة
    return {
        day: "اليوم الحالي",
        name: "حدث تجريبي",
        start: start,
        end: endStr,
        teacher: "الأستاذة تجريب",
        class: "تجريبي"
    };
}

// إضافة الحدث التجريبي إلى مصفوفة الأحداث
const testEvent = createTestEvent();
eventsData.push(testEvent);

// عرض محتويات الأحداث في وحدة التحكم للتأكد من وجود الحدث التجريبي
console.log("محتويات eventsData:", eventsData);

// دالة لعرض البيانات في الجدول
function updateEventsTable(events) {
    const tableBody = document.querySelector("#events-table tbody");
    tableBody.innerHTML = ""; // مسح محتوى الجدول السابق

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

// عرض البيانات عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    console.log("يتم استدعاء updateEventsTable مع البيانات التالية:", eventsData);
    updateEventsTable(eventsData);
});
