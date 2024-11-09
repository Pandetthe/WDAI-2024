export default class Sprite {
    constructor(imageSrc, frames = 1, width = null, height = null) {
        this.loaded = false;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
            if (this.width == null) this.width = this.image.width / frames;
            if (this.height == null) this.height = this.image.height;
         };
        this.image.src = imageSrc;
        this.frames = frames; 
    }

    draw(context, position, frame = 0, scale = 1) {
        if (!this.loaded) return;
        frame = frame % this.frames
        context.drawImage(this.image, frame * this.image.width / this.frames, 0, this.image.width / this.frames,
            this.image.height, position.x, position.y,
            this.width * scale, this.height * scale);
    }
}