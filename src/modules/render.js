let render = (selector) => {
    const attributes = selector.split('.');
    const elementName = attributes.shift();
    const element = document.createElement(elementName);

    for (let className of attributes) {
        element.classList.add(className);
    }

    return element;
};

export default render;