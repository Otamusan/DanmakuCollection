export class SoundEffect {
    constructor(source) {
        this.audio = new Audio(source);
    }
    play() {
        this.audio.play();
    }
    setVolume(volume) {
        this.audio.volume = volume;
    }
    getVolume() {
        return this.audio.volume;
    }
}
//# sourceMappingURL=SoundEffect.js.map