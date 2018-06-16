"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StateTree {
    constructor(parentState) {
        this.currentSubState = null;
        if (parentState == undefined) {
            this.parentState = null;
        }
        else {
            this.parentState = parentState;
        }
    }
    onSystemUpdate() {
        if (this.currentSubState != null) {
            this.currentSubState.onSystemUpdate();
            return;
        }
        this.onUpdate();
    }
    //オーバーライド用
    onUpdate() {
    }
    //子ステートへ移行
    transitionSubState(subState) {
        this.currentSubState = subState;
        this.currentSubState.onTransitionedParentState(this);
    }
    //親ステートから移行されたときに呼び出される
    onTransitionedParentState(parentState) {
    }
    //親ステートへ戻る
    returnParentState() {
        this.parentState.currentSubState = null;
        this.parentState.onReturnedFromSubState(this);
    }
    //子ステートから戻ってきたときに呼び出される
    onReturnedFromSubState(subState) {
    }
}
exports.StateTree = StateTree;
//# sourceMappingURL=StateTree.js.map