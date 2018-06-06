export class DOMHandler {
    static createElement(tagName, options) {
        return document.createElement(tagName, options);
    }
    static getElementByID(document, id) {
        return document.getElementById(id);
    }
    //DOMのElementを作成する
    static createElementByJS(name, option, ...child) {
        var element = document.createElement(name);
        if (option) {
            for (var opt in option) {
                if (option.hasOwnProperty(opt)) {
                    element.setAttribute(opt, option[opt]);
                }
            }
        }
        child.forEach(subelement => {
            if (typeof subelement == "string") {
                element.appendChild(document.createTextNode(subelement));
            }
            else {
                element.appendChild(subelement);
            }
        });
        return element;
    }
}
//# sourceMappingURL=DOMHandler.js.map