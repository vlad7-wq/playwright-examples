
export function getCurrentDate() {
    const date = new Date();
    const options = { month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const year = date.getFullYear();
    const finalFormattedDate = `${formattedDate}, ${year}`;
    return finalFormattedDate;
}