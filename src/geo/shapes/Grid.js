import { Rectangle } from '../shapes/Rectangle.js'
import { Polygon } from '../shapes/Polygon.js'

export class Grid {
    constructor(pos, size, rows, cols) {
        this.pos = pos
        this.size = size
        this.rows = rows
        this.cols = cols
    }

    static withRect(rect, rows, cols) {
        return new Grid(rect.pos, rect.size, rows, cols)
    }

    get cellCount() {
        return this.rows * this.cols
    }

    get cellSize() {
        return [this.size[0] / this.cols, this.size[1] / this.rows]
    }

    rects() {
        let [cellWidth, cellHeight] = this.cellSize

        let grid = []
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                grid.push(this.#generateCell(i, j, cellWidth, cellHeight))
            }
        }
        return grid
    }

    centers() {
        let [cellWidth, cellHeight] = this.cellSize

        let centers = []
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let x = this.pos[0] + j * cellWidth + cellWidth / 2
                let y = this.pos[1] + i * cellHeight + cellHeight / 2
                centers.push([x, y])
            }
        }
        return centers
    }

    cells() {
        let [cellWidth, cellHeight] = this.cellSize

        let cells = []
        let index = 0
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let x = this.pos[0] + j * cellWidth
                let y = this.pos[1] + i * cellHeight
                cells.push({
                    row: i,
                    col: j,
                    index: index++,
                    t: index / this.cellCount,
                    pos: [x, y],
                    size: [cellWidth, cellHeight],
                    center: [x + cellWidth / 2, y + cellHeight / 2],
                    rect: this.#generateCell(i, j, cellWidth, cellHeight),
                })
            }
        }
        return cells
    }

    rectTriangles() {
        let triangles = []
        let [cellWidth, cellHeight] = this.cellSize

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let [x, y] = [this.pos[0] + j * cellWidth, this.pos[1] + i * cellHeight]

                // Define two triangles within each cell
                let tri1 = new Polygon([
                    [x, y],
                    [x + cellWidth, y],
                    [x, y + cellHeight],
                ])
                let tri2 = new Polygon([
                    [x + cellWidth, y],
                    [x + cellWidth, y + cellHeight],
                    [x, y + cellHeight],
                ])

                triangles.push(tri1, tri2)
            }
        }
        return triangles
    }

    #generateCell(row, col, cellWidth, cellHeight) {
        let x = this.pos[0] + col * cellWidth
        let y = this.pos[1] + row * cellHeight
        return new Rectangle([x, y], [cellWidth, cellHeight])
    }
}

export function grid(pos, size, rows, cols) {
    return new Grid(pos, size, rows, cols)
}
