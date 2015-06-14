(function () {

  upset = {
    setup: function () {
      upset.getData();
    },

    // SELECT * FROM html WHERE url="http://brooklynbeta.org/about" and xpath="//div[@id='people']/ul"
    // query: "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fbrooklynbeta.org%2Fabout%22%20and%20xpath%3D%22%2F%2Fdiv%5B%40id%3D'people'%5D%2Ful%22&format=json",
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
      upset.card.end();
      upset.card.patternLine();
      upset.card.patternLine();
      upset.card.symbolLine();
      upset.card.patternLine();
      upset.card.patternLine();
      upset.card.end();

      var cards = data,
          $grid = $('.grid');

      $(cards).each(function() {
        $grid.append(upset.card.createCard(this));
      });

    },

    createCard: function(card) {
      var $card = $("<card>"),
          paperWidth = 150,
          paperHeight = 250,
          r = Raphael(0, 0, paperWidth, paperHeight);

      var cardBacking = r.rect(0, 0, paperWidth, paperHeight, 15)
                     .attr({
                      fill: "hsb(0, 0, 0)",
                      stroke: "none",
                      opacity: 0.1
                     });

      var symbol = r.rect((paperWidth / 2), (paperHeight / 2), 10, 10, 0)
                    .attr({
                      fill: upset.utils.colour(card.colour),
                      stroke: "none",
                      opacity: 1
                     });
      return $card.append(r.canvas);
    },

    end: function(){
      console.log("+-------+");
    },

    patternLine: function(){
      console.log("|xxxxxxx|")
    },

    symbolLine: function(){
      console.log("|xx ◊ xx|")
    }

  };



  upset.utils = upset.utils || {};
  upset.utils = {
    pattern: function (pattern) {
      switch (pattern) {
        case "solid":
          console.log("this is solid");
          break
        case "stripe":
          console.log("this is striped");
          break
        case "empty":
          console.log("this is empty");
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