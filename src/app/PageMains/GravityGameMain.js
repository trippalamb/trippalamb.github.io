function mainGravityGame(){

  var svg;
  var comets = [];
  var stars = [];
  var cometID = 0;
  var starID = 0;
  var time = 0;
  var lastTime = getTick();
  var dt = 0;
  var refresh = 16;
  var speed = 0.25;
  var selectedStarID = -1;

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
      svg.selectAll("circle.star").remove();
    });

    $(".btn-cursor").on("click", function(){
      $(".btn-cursor").removeClass("rounded-outline");
      $(this).addClass("rounded-outline");
      switch($(this).attr("id")) {
        case "btn-createComet" :
          //svg.unbind('click');
          svg.on('click', createComet);
          $("#txt-mass").parent().addClass("hidden");
          $("#txt-color").parent().removeClass("hidden");
          break;
        case "btn-createStar" :
          //svg.unbind('click');
          svg.on('click', createStar);
          $("#txt-mass").parent().removeClass("hidden");
          $("#txt-color").parent().addClass("hidden");
          break;
        case "btn-selectStar" :
          addStarClick();
          svg.on('click', function(){
            return 0;
          })
          $("#txt-mass").parent().removeClass("hidden");
          $("#txt-color").parent().addClass("hidden");

          $("#txt-mass").on("change", function(){
            console.log("yo");
            stars[selectedStarID].setMass(parseInt($("#txt-mass").val()));
            $("#star-"+selectedStarID).attr("r", stars[selectedStarID].r);

          });
          break;
        default:
          console.log("curson button not supported");
      }
    })

    $(window).on("resize", function(){
      svg.attr("width", $(window).width())
         .attr("height", $(window).height());
    })

    $("#about-close").on("click", function(){
      $("#about-container").addClass("hidden");
      $("svg").removeClass("blur");

    });

    $("#about-open").on("click", function(){
      $("#about-container").removeClass("hidden");
      $("svg").addClass("blur");
    });
  }

  function initCanvas(){
    //Width and height
	  var width = $(window).width();
	  var height = $(window).height();
    //Create SVG element
	  svg = d3.select("svg")
		        .attr("width", width)
		        .attr("height", height);
    comets.push(new Comet(cometID++, 75, 75, "red"));
    stars.push(new Star(starID++, 300, 200, 1));
    stars.push(new Star(starID++, 400, 275, 2));

    svg.selectAll("circle")
       .data(stars)
       .enter()
       .append("circle")
       .attr("class", "star")
       .attr("id", function(d){
         return "star-"+ d.id
       })
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
       })
       //.on("mouseover", handleMouseOver)
       //.on("mouseout", handleMouseOut);

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
           .attr("id", function(d){
             return "comet-"+ d.id
           })
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
      comets.push(new Comet(cometID++, coords[0],coords[1], $('#txt-color').val()));
      svg.selectAll("circle.comet")
         .data(comets)
         .enter()
         .append("circle")
         .attr("class", "comet")
         .attr("id", function(d){
           return "comet-"+ d.id
         })
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

    function addStarClick(){
      svg.selectAll("circle.star")
         .data(stars)
         .on("click", function(d){
           $("#txt-mass").parent().removeClass("hidden");
           $("#txt-color").parent().addClass("hidden");
           $("#txt-mass").val(d.mass*5);
           selectedStarID = d.id;
           d3.select(".star").style("stroke", "white");
           d3.select("#star-"+d.id).style("stroke", "black").style("stoke-width", "10px");
         })
    }

    function createStar(){
      var coords = d3.mouse(this);
      stars.push(new Star(starID++, coords[0], coords[1], $('#txt-mass').val()));
      svg.selectAll("circle.star")
         .data(stars)
         .enter()
         .append("circle")
         .attr("id", "star-" + starID++)
         .attr("class", "star")
         .attr("id", function(d){
           return "star-"+ d.id
         })
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
         });
         //.on("mouseover", handleMouseOver)
         //.on("mouseout", handleMouseOut);
    }

    // Create Event Handlers for mouse
    /*function handleMouseOver(d, i) {  // Add interactivity

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

    }*/
}
