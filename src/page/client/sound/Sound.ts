export namespace Sound {
    export class SoundEffect {
        private source: string;
        private volume: number;
        constructor(source: string) {
            this.source = source;
        }

        public play(volume: number) {
            let audio = new Audio(this.source);
            audio.volume = volume;
            audio.play();
        }
    }
    export namespace Sounds {
    }
}