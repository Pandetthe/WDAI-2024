export default class Zombie {
    constructor(sprite, position, speed, scale) {
        this.sprite = sprite;
        this.elapsedFrames = 0;
        this.currentFrame = 0;
        this.speed = speed;
        this.scale = scale;
        this.position = position;
        this.width = this.sprite.width * this.scale;
        this.height = this.sprite.height * this.scale;
    }

    update(context, delta) {
        this.position.x -= this.speed * delta / 13;
        this.elapsedFrames++;
        if (this.elapsedFrames >= 10 / this.speed) {
            this.elapsedFrames = 0;
            this.currentFrame = (this.currentFrame + 1) % this.sprite.frames; 
        }
        this.sprite.draw(context, this.position, this.currentFrame, this.scale);
        if (this.position.x + this.width < 0) return true;
        return false;
    }
}