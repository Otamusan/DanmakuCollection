export class DivManager {
    private divIDList: Map<string, HTMLDivElement>;
    private document: Document;
    constructor(document: Document) {
        this.divIDList = new Map<string, HTMLDivElement>();
        this.document = document;
    }

    public initDocument() {
        this.document.body.childNodes.forEach((div) => {
            if (div.nodeName == "DIV" && div instanceof HTMLDivElement && div.id != null) {
                this.divIDList.set(div.id, div);
                this.document.body.removeChild(div);
            }
        })
    }

    public getDiv(ID: string): HTMLDivElement {
        return this.divIDList.get(ID);
    }

    public getDivCopy(ID: string): HTMLDivElement {
        return Object.assign(this.divIDList.get(ID));
    }
}