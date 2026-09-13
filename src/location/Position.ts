import type { Vector } from "es-vector-math";

export class Position {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `Position[${this.x},${this.y}]`;
    }
    addVector(vector: Vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
}
export default Position;
