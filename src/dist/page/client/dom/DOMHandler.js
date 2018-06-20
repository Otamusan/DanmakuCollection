"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DOMHandler {
    static createElement(tagName, options) {
        return document.createElement(tagName, options);
    }
    static getElementByID(element, id) {
        /*element.childNodes.forEach((elt) => {
            //console.log(elt)
            if (elt instanceof HTMLElement) {
                
                if (elt.hasChildNodes) {
                   node = this.getElementByID<T>(elt, id);
                }

                if ((elt as HTMLElement).id == id) {
                    node = elt as T;
                    //console.log(elt);
                }
                
            }
        });*/
        for (let i = 0; i < element.childNodes.length; i++) {
            let elt = element.childNodes.item(i);
            if (elt instanceof HTMLElement) {
                if (elt.id == id) {
                    return elt;
                }
                else {
                    if (elt.hasChildNodes) {
                        let par = this.getElementByID(elt, id);
                        if (par != null) {
                            return par;
                        }
                    }
                }
            }
        }
        return null;
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
exports.DOMHandler = DOMHandler;
//# sourceMappingURL=DOMHandler.js.map