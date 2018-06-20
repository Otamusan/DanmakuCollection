export class DOMHandler {
    public static createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K] {
        return document.createElement<K>(tagName, options);
    }

    public static getElementByID<T extends HTMLElement>(element: HTMLElement, id: string): T {
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
            if (elt instanceof HTMLElement){
                if ((elt as HTMLElement).id==id){
                    return elt as T
                }else{
                    if (elt.hasChildNodes){
                        let par = this.getElementByID<T>(elt,id);
                        if (par != null){
                            return par;
                        }
                    }
                }
            }
        }
        return null;
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