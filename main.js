(function () {

  var fake = [{"pattern":"solid","colour":"purple","number":"two","shape":"tilde"},{"pattern":"stripe","colour":"purple","number":"three","shape":"oval"},{"pattern":"empty","colour":"green","number":"one","shape":"diamond"},{"pattern":"stripe","colour":"red","number":"two","shape":"diamond"},{"pattern":"solid","colour":"red","number":"two","shape":"tilde"},{"pattern":"stripe","colour":"purple","number":"two","shape":"diamond"},{"pattern":"stripe","colour":"red","number":"three","shape":"diamond"},{"pattern":"solid","colour":"green","number":"one","shape":"tilde"},{"pattern":"empty","colour":"purple","number":"one","shape":"oval"},{"pattern":"empty","colour":"red","number":"three","shape":"oval"},{"pattern":"stripe","colour":"green","number":"three","shape":"diamond"},{"pattern":"empty","colour":"red","number":"one","shape":"tilde"}],
    selected = [];

  upset = {
    setup: function () {
      upset.login();
      // upset.draw(fake);
    },

    queryURL: "http://10.0.1.81:9292/grid",
    postURL: "http://10.0.1.81:9292/guess",
    loginURL: "http://10.0.1.81:9292/login",
    meURL: "http://10.0.1.81:9292/me",

    login: function () {
      $.post(upset.loginURL, {
        user_name: 'foo'
      }).done(function () {
        upset.getData();
      });
    },

    guess: function () {
      $.post(upset.postURL, {
        index1: selected[0],
        index2: selected[1],
        index3: selected[2]
      }).done(function () {
        selected = [];
        upset.getData();
      });
    },

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
      var cards = data,
          $grid = $('.grid');

          $grid.empty();

      $(cards).each(function() {
        $grid.append(upset.card.createCard(this));
      });

    },

    createCard: function(card) {
      var $card = $("<card>"),
          imageName = upset.dimensions.shape(card) + "-" + upset.dimensions.pattern(card) + "-fff.png";

      for (var i = upset.dimensions.number(card); i > 0; i--) {
        $card.append("<img src='railsset-icons/" + imageName + "' style='background: "+ upset.dimensions.colour(card) + "'/>")
      };

      

      $card.on("click", function() {
        var $this = $(this);

        if ($this.hasClass("selected") == true) {
          $this.removeClass("selected");
          selected.pop($this.index());
          console.log(selected);
        } else {
          $this.addClass("selected");
          selected.push($this.index());
          console.log(selected);

          if (selected.length == 3) {
            upset.guess()
          }

        };
      });

      return $card.append(card);
    }

  };

  upset.dimensions = upset.dimensions || {};
  upset.dimensions = {

    pattern: function (card) {
      switch (card.pattern) {
        case "solid":
          return "solid"
          break
        case "stripe":
          return "pattern"
          break
        case "empty":
          return "outline"
          break
      };
    },

    shape: function(card){
      switch (card.shape) {
        case "oval":
          return "fire"
          break
        case "diamond":
          return "ruby"
          break
        case "tilde":
          return "boat"
          break
      };
    },   

    number: function(card){
      switch (card.number) {
        case "one":
          return 1
          break
        case "two":
          return 2
          break
        case "three":
          return 3
          break
      };
    },

    colour: function(card){
      switch (card.colour) {
        case "green":
          colour = "229, 148, 37";
          break;
        case "red":
          colour = "217, 52, 147";
          break;
        case "purple":
          colour = "52, 69, 147";
          break;
      };
      return "rgb(" + colour + ")"
    }

  };

  $(function () {upset.setup();});
})();