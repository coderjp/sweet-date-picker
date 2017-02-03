let isTouch = ()  => {
    return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
};

let supportsTouch = () => {
    return 'ontouchstart' in window;
};

export {
    isTouch,
    supportsTouch
};