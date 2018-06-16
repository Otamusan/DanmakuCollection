export class StateTree {
    public parentState: StateTree;
    public currentSubState: StateTree;
    constructor(parentState?: StateTree) {
        this.currentSubState = null
        if (parentState == undefined) {
            this.parentState = null;
        } else {
            this.parentState = parentState;
        }
    }

    public onSystemUpdate() {
        if (this.currentSubState != null) {
            this.currentSubState.onSystemUpdate();
            return;
        }
        this.onUpdate();
    }

    //オーバーライド用
    public onUpdate() {

    }

    //子ステートへ移行
    public transitionSubState(subState: StateTree) {
        this.currentSubState = subState;
        this.currentSubState.onTransitionedParentState(this);
    }

    //親ステートから移行されたときに呼び出される
    public onTransitionedParentState(parentState: StateTree) {
    }

    //親ステートへ戻る
    public returnParentState() {
        this.parentState.currentSubState = null;
        this.parentState.onReturnedFromSubState(this);
    }

    //子ステートから戻ってきたときに呼び出される
    public onReturnedFromSubState(subState: StateTree) {
    }
}