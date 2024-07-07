export class Sprite {
    constructor(img, imageWidth, imageHeight) {
        this.img = img
        this.imageWidth = imageWidth
        this.imageHeight = imageHeight

        this.pos = [0, 0] // center
        this.scale = [1.0, 1.0] // scaling factors for the x and y axes
        this.rotation = 0 // rotation in radians
        this.color = [0, 0, 0]
    }

    static async create(src) {
        const img = await Sprite.loadImage(src)
        return new Sprite(img, img.width, img.height)
    }

    static loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = src
        })
    }

    draw(ctx) {
        const [x, y] = this.pos
        const [scaleX, scaleY] = this.scale

        // Normalize dimensions so that the largest side is 1 unit at a scale of 1
        let normalizedWidth, normalizedHeight
        if (this.imageWidth >= this.imageHeight) {
            normalizedWidth = 1
            normalizedHeight = this.imageHeight / this.imageWidth
        } else {
            normalizedHeight = 1
            normalizedWidth = this.imageWidth / this.imageHeight
        }

        // Apply 2D scaling
        const scaledWidth = normalizedWidth * scaleX
        const scaledHeight = normalizedHeight * scaleY

        // Create an off-screen canvas
        const offscreenCanvas = document.createElement('canvas')
        offscreenCanvas.width = this.imageWidth
        offscreenCanvas.height = this.imageHeight
        const offscreenCtx = offscreenCanvas.getContext('2d')

        // Draw the image onto the off-screen canvas
        offscreenCtx.drawImage(this.img, 0, 0, this.imageWidth, this.imageHeight)

        // Set the global composite operation to 'source-in'
        offscreenCtx.globalCompositeOperation = 'source-in'

        // Set the fill style to the desired color and fill the canvas
        const [r, g, b] = this.color
        offscreenCtx.fillStyle = `rgb(${r}, ${g}, ${b}, 0.2)`
        offscreenCtx.fillRect(0, 0, this.imageWidth, this.imageHeight)

        // Save the current canvas state
        ctx.save()

        // Move the canvas origin to the sprite's center position
        ctx.translate(x, y)

        // Apply rotation
        ctx.rotate(this.rotation)

        // Apply 2D scaling
        ctx.scale(scaleX, scaleY)

        // Flip the canvas vertically
        ctx.scale(1, -1)

        // Draw the image with the transformed canvas
        ctx.drawImage(offscreenCanvas, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight)

        // Restore the canvas state
        ctx.restore()
    }
}
