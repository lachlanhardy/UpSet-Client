(function () {

  upset = {
    setup: function () {
      var base = upset.utils.random(100);
      while (base--) {
          // upset.diagonal(base);
      }
      upset.getData();
    },

    // SELECT * FROM html WHERE url="http://brooklynbeta.org/about" and xpath="//div[@id='people']/ul"
    // query: "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fbrooklynbeta.org%2Fabout%22%20and%20xpath%3D%22%2F%2Fdiv%5B%40id%3D'people'%5D%2Ful%22&format=json",
    queryURL: "http://10.0.1.81:9292/grid",
    postURL: "http://10.0.1.81:9292/guess",

    getData: function () {
      console.log("we should get some data here");
      // $.ajax({
      //    url: upset.queryURL,
      //    dataType: 'jsonp',
      //    jsonp: 'callback',
      //    jsonpCallback: 'upset.draw'
      // });
      upset.draw();
    },

    draw: function(data){
      upset.card.display();
    },

    shapes: function(){

    },

    patterns: function(){

    },    

    numbers: function(){

    },

    colours: function(){

    }

  };

  upset.card = upset.card || {};
  upset.card = {
    display: function(){
      console.log("drawing a card");
      upset.card.end();
      upset.card.patternLine();
      upset.card.patternLine();
      upset.card.symbolLine();
      upset.card.patternLine();
      upset.card.patternLine();
      upset.card.end();

      $card = $(".card");

      var things = function() {
        var paperWidth = $card.width(),
            paperHeight = $card.height(),
            r = Raphael(0, 0, paperWidth, paperHeight);

        var cards = r.rect(0, 0, paperWidth, paperHeight, 15)
                       .attr({
                        fill: "hsb(" + Math.random() + "," + Math.random() + "," + Math.random() + ")",
                        stroke: "none",
                        opacity: Math.random()
                       });
        console.log(r);

        return r.canvas
      };
      $card.each(function() {
        $(this).append(things);
      });


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
    random: function (multiplier) {
      return Math.floor(Math.random() * multiplier + 1);
    },

    randomX: function () {
      return paperWidth - upset.utils.random(paperWidth);
    },

    randomY: function () {
      return paperHeight - upset.utils.random(paperHeight);
    }
  };

  $(function () {upset.setup();});
})();