export const revertValueAsync = (setter, seconds) => {
    setInterval(() => {
        setter(false);
    }, seconds * 1000);
}