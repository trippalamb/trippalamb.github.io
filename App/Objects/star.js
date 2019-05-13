class Star{
    constructor(id, x, y, mass){
        this.id = id;
        this.x = x;
        this.y = y;
        this.mass = mass/5;
        this.r = 10.0 * Math.sqrt(mass / Math.PI);
    }

    setMass(mass){
      this.mass = mass/5;
      this.r = 10.0 * Math.sqrt(mass / Math.PI);
    }

}
