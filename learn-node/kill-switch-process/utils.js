// 17:40:43 - 29 January 2025
exports.getHumanReadableTimestamp = () => {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();

    return `${hours}:${minutes}:${seconds} - ${day} ${month} ${year}`;
};
