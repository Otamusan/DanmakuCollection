export class SoundEffect {
        private audio: HTMLAudioElement;
        constructor(source: string) {
            this.audio = new Audio(source);
        }

        public play() {
            this.audio.play();
        }

        public setVolume(volume: number) {
            this.audio.volume = volume;
        }

        public getVolume(): number {
            return this.audio.volume;
        }
    }