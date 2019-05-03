function mainGravityGame(){
    

    class Star{
        constructor(x, y, r, mass){
            this.x = x;
            this.y = y;
            this.r = r;
            this.mass = mass;
        }
    
    }

            
    var svg;
    var comets = [];
    var stars = [];
    var time = 0;
    var lastTime = getTick();
    var dt = 0;
    var refresh = 16;
    var speed = 0.25
    
    
    
    init();
    setInterval(draw, refresh);
    
    function init(){
        //Width and height
	    var width = 1200;
	    var height = 800;
        //Create SVG element
	    svg = d3.select("#svg")
				    .append("svg")
				    .attr("width", width)
				    .attr("height", height);
        comets.push(new Comet(75,75, "red"));
        stars.push(new Star(300,200, 6, 1));
        stars.push(new Star(400,275, 8, 2));
        
        svg.selectAll("circle")
           .data(stars)
           .enter()
           .append("circle")
           .attr("class", "star")
           .attr("cx", function(d) {
		       return d.x;
		   })
		   .attr("cy", function(d) {
		       return d.y;
		   })
           .attr("r", function(d) {
               return d.r;
           })
           .style("fill", function(d){
               return "blue";
           });

        svg.on('click', function(){
            var coords = d3.mouse(this);
            comets.push(new Comet(coords[0],coords[1], "red"));
            svg.selectAll("circle.comet")
               .data(comets)
               .enter()
               .append("circle")
               .attr("class", "comet")
               .attr("cx", function(d) {
		           return d.state.px.val;
		       })
		       .attr("cy", function(d) {
		           return d.state.py.val;
		       })
		       .attr("r", 4)
               .style("fill", function(d){
                   return d.color;
               })
        });
    }
	
    
    
    function draw(){

        for(var i=0;i<comets.length; i++){
          comets[i].state.propagate(speed*refresh, stars)
        }

        svg.selectAll("circle.comet").remove();
        svg.selectAll("circle.comet")
           .data(comets)
           .enter()
           .append("circle")
           .attr("class", "comet")
           .attr("cx", function(d) {
		       return d.state.px.val;
		   })
		   .attr("cy", function(d) {
		       return d.state.py.val;
		   })
		   .attr("r", 4)
           .style("fill", function(d){
               return d.color;
           })
    }

    function getTick(){
        return Date.now();
    }

}
