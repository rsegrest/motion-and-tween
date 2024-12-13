class Vector {
    constructor(x,y) {
      if (x) { this.x = x; } else { this.x = 0; }
      if (y) { this.y = y; } else { this.y = 0; }
    }
    toString() {
      return `Vector[${this.x},${this.y}]`;
    }
    add(vector) {
        if (this.x && vector.x) { this.x += vector.x; }
        if (this.y && vector.y) { this.y += vector.y; }
    }
}