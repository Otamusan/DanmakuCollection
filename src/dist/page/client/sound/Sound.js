"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sound;
(function (Sound) {
    class SoundEffect {
        constructor(source) {
            this.source = source;
        }
        play(volume) {
            let audio = new Audio(this.source);
            audio.volume = volume;
            audio.play();
        }
    }
    Sound.SoundEffect = SoundEffect;
})(Sound = exports.Sound || (exports.Sound = {}));
//# sourceMappingURL=Sound.js.map