function mainGravityGame(){

  var svg;
  var comets = [];
  var stars = [];
  var time = 0;
  var lastTime = getTick();
  var dt = 0;
  var refresh = 16;
  var speed = 0.25;

  init();
  setInterval(draw, refresh);

  function init(){
    initCanvas();
    initHTML();
  }

  function initHTML(){
	  
    $("#btn-clearComets").on("click", function(){
	    comets = [];
    });
	  
	  $("#btn-clearStars").on("click", function(){
	    stars = [];
    });
	  
    $(".btn-cursor").on("click", function(){
      $(".btn-cursor").removeClass("rounded-outline");
      $(this).addClass("rounded-outline");
      switch($(this).attr("id")) {
        case "btn-createComet" :
          //svg.unbind('click');
          svg.on('click', createComet);
          break;
        case "btn-createStar" :
          //svg.unbind('click');
          svg.on('click', createStar);
          break;
        case "btn-selectStar" :
          console.log("curson button not supported");
          break;
        default:
          console.log("curson button not supported");
      }
    })
  }

  function initCanvas(){
    //Width and height
	  var width = 1200;
	  var height = 800;
    //Create SVG element
	  svg = d3.select("#svg")
		        .append("svg")
		        .attr("width", width)
		        .attr("height", height);
    comets.push(new Comet(75,75, "red"));
    stars.push(new Star(300, 200, 1));
    stars.push(new Star(400, 275, 2));

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

       svg.on('click', createComet);
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

    function createComet(){
      var coords = d3.mouse(this);
      comets.push(new Comet(coords[0],coords[1], $('#txt-color').val()));
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
         });
    }

    function createStar(){
      var coords = d3.mouse(this);
      stars.push(new Star(coords[0], coords[1], $('#txt-mass').val()));
      svg.selectAll("circle.star")
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
         .attr("r", function(d){
           return d.r;
         })
         .style("fill", function(d){
           return "blue";
         })
         .on("mouseover", handleMouseOver)
         .on("mouseout", handleMouseOut);
    }
	
    // Create Event Handlers for mouse
    function handleMouseOver(d, i) {  // Add interactivity

      // Use D3 to select element, change color and size
      d3.select(this).attr({
        fill: "orange",
        r: d.r * 2
      });
      
    }

    function handleMouseOut(d, i) {
      // Use D3 to select element, change color back to normal
      d3.select(this).attr({
        fill: "black",
        r: d.r / 2
      });

    }
}
