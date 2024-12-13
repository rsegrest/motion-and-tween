class Position {
    constructor(x,y) {
        if (x) { this.x = x; } else { this.x = null; }
        if (y) { this.y = y; } else { this.y = null; }
    }
    toString() {
        return `Position[${this.x},${this.y}]`;
    }
    addVector(vector) {
        if (this.x && vector.x) { this.x += vector.x; }
        if (this.y && vector.y) { this.y += vector.y; }
    }
}
