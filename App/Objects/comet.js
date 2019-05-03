var gravConst = 1;

class Comet {
  constructor(x, y, color){
    this.color = color;
    this.state = new State(x, y);
    //this.rkf = new RKF();
  }

}

class State{
  constructor(x,y){
    this.px = new Field(x);
    this.py = new Field(y);
    this.vx = new Field(0.1);
    this.vy = new Field(0.1);
    this.ax = new Field(0.0);
    this.ay = new Field(0.0);
  }

  propagate(dt, stars){
    var accGrav = this.calcGrav(stars);
    var accDrag = this.calcDrag();
     
    this.px.val += this.vx.val*dt + .5*this.ax.val*dt*dt;
    this.py.val += this.vy.val*dt + .5*this.ay.val*dt*dt;
    this.vx.val += this.ax.val*dt;
    this.vy.val += this.ay.val*dt;
    this.ax.val = accGrav.x + accDrag.x;
    this.ay.val = accGrav.y + accDrag.y;

  }

  calcDrag(){
    var acc = {};
    var vel = [this.vx.val, this.vy.val];
    var velUnit = unit(vel);
    var mag = magnitude(vel);
    var temp = velUnit.multiply(-mag*mag*.0005);
    acc.x = temp[0];
    acc.y = temp[1];
    return acc;
  }

  calcGrav(stars){
    var acc = {};
    acc.x = 0;
    acc.y = 0;
    
    for(var i = 0; i < stars.length; i++){
        var xDiff = stars[i].x - this.px.val;
        var yDiff = stars[i].y - this.py.val;
        var distance = magnitude([xDiff, yDiff]);
        var magAcc = gravConst * stars[i].mass / distance;
        var distanceUnit = unit([xDiff, yDiff]);
        acc.x += magAcc * distanceUnit[0];
        acc.y += magAcc * distanceUnit[1];
    }

    return acc;
  }
}

//so that I can pass by reference
class Field{
  constructor(val){
    this.val = val;
  }
}
