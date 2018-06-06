export class DivManager {
    constructor(document) {
        this.divIDList = new Map();
        this.document = document;
    }
    initDocument() {
        this.document.body.childNodes.forEach((div) => {
            if (div.nodeName == "DIV" && div instanceof HTMLDivElement && div.id != null) {
                this.divIDList.set(div.id, div);
                this.document.body.removeChild(div);
            }
        });
    }
    getDiv(ID) {
        return this.divIDList.get(ID);
    }
    getDivCopy(ID) {
        return Object.assign(this.divIDList.get(ID));
    }
}
//# sourceMappingURL=DivManager.js.map