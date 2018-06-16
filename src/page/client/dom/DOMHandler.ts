export class DOMHandler {
    public static createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K] {
        return document.createElement<K>(tagName, options);
    }

    public static getElementByID<T extends HTMLElement>(document: Document, id: string): T {
        return document.getElementById(id) as T;
    }

    //DOMのElementを作成する
    public static createElementByJS<T extends HTMLElement>(name: string, option: Object, ...child: Array<any>): T {
        var element: Element = document.createElement(name);
        if (option) {
            for (var opt in option) {
                if (option.hasOwnProperty(opt)) {
                    element.setAttribute(opt, option[opt]);
                }
            }
        }
        child.forEach(subelement => {
            if (typeof subelement == "string") {
                element.appendChild(document.createTextNode(subelement))
            } else {
                element.appendChild(subelement);
            }
        });
        return element as T;
    }

}