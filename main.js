(function () {

  upset = {
    setup: function () {
      upset.getData();
    },

    queryURL: "http://10.0.1.81:9292/grid",
    postURL: "http://10.0.1.81:9292/guess",

    getData: function () {
      $.ajax({
         url: upset.queryURL,
         dataType: 'jsonp',
         jsonp: 'callback',
         jsonpCallback: 'upset.draw'
      });
    },

    draw: function(data){
      upset.card.display(data);
    }

  };

  upset.card = upset.card || {};
  upset.card = {
    display: function(data){
      console.log("drawing a card");

      var cards = data,
          $grid = $('.grid');

      $(cards).each(function() {
        $grid.append(upset.card.createCard(this));
      });

    },

    createCard: function(card) {
      card.width = 150;
      card.height = 250;
      card.r = Raphael(0, 0, card.width, card.height);

      var cardBacking = card.r.rect(0, 0, card.width, card.height, 15)
                     .attr({
                      fill: "hsb(0, 0, 0)",
                      stroke: "none",
                      opacity: 0.1
                     });

      upset.utils.pattern(card);

      var symbol = card.r.rect(upset.utils.centrePoint(card.width), upset.utils.centrePoint(card.height), 10, 10, 0)
                    .attr({
                      fill: upset.utils.colour(card.colour),
                      stroke: "none",
                      opacity: 1
                     });

      var oval = card.r.ellipse(upset.utils.centrePoint(card.width), upset.utils.centrePoint(card.height), 30, 50)
                  .attr({
                    fill: upset.utils.colour(card.colour),
                    stroke: "none",
                    opacity: 1
                   });

      console.log(card.r);

      var $card = $("<card>");
      return $card.append(card.r.canvas);
    }

  };



  upset.utils = upset.utils || {};
  upset.utils = {
    centrePoint: function (value) {
      return (value / 2)
    },

    pattern: function (card) {
      switch (card.pattern) {
        case "solid":
          var solid = card.r.rect(0, 0, card.width, card.height, 15)
               .attr({
                fill: upset.utils.colour(card.colour),
                stroke: "none",
                opacity: 0.5
               });
          break
        case "stripe":
          var loop = 10;
          for (var i = 0; i < loop; i++) {
            card.r.path("M" + i + "0 " + 100 + " L" + 100 + " " + i + "0")
                  .attr({
                    stroke: upset.utils.colour(card.colour),
                    "stroke-width": 2,
                    opacity: 0.5
                  });
          };
          break
        case "empty":
          // empty needs no love
          break
      };
    },

    shape: function(shape){
      switch (shape) {
        case "oval":
          console.log("this is an oval");
          break
        case "diamond":
          console.log("this is a diamond");
          break
        case "tilde":
          console.log("this is a tilde");
          break
      };
    },   

    number: function(number){
      switch (number) {
        case "one":
          console.log("There is one symbol");
          break
        case "two":
          console.log("there are two symbols");
          break
        case "three":
          console.log("there are three symbols");
          break
      };
    },

    colour: function(colour){
      switch (colour) {
        case "green":
          colour = "120";
          break;
        case "red":
          colour = "0";
          break;
        case "purple":
          colour = "290";
          break;
      };
      return "hsb(" + colour + ", 90, 100)"
    }

  };

  $(function () {upset.setup();});
})();