class Star{
    constructor(x, y, mass){
        this.x = x;
        this.y = y;
        this.mass = mass/5;
        this.r = 10.0 * Math.sqrt(mass / Math.PI);
    }

}
