// (function(){
  var leftArrow   = 37;
  var rightArrow  = 39;
  var space       = 32;

  var width = ($('body').width() + 200).toString();

  var timeStart = new Date();
  var points = 0;
  var $points = $('<span>', {class: 'points', text: points});
  $('body').append($points);

  var highscore = 0;
  var $highscore = $('<span>', {class: 'points highscore', text: highscore});
  $('body').append($highscore);

  window.setInterval(function(){
    var now = new Date();
    points = now - timeStart;
    $points.text(points);

    if(points > highscore) {
      highscore = points;
      $highscore.text(highscore);
    }
  }, 10);

  // var $playerTemplate = $('<div>', {class: 'player', height: '100px', width: '100px'});
  var $playerTemplate = '<div class= "player" style="height:100px; width: 100px;">';
  var $vanTemplate = '<div class= "van" style="height:100px; width: 100px;">';
  var $copTemplate = '<div class= "cop" style="height:100px; width: 100px;">';
  var $taxiTemplate = '<div class= "taxi" style="height:100px; width: 100px;">';

  var $player = $($playerTemplate);
  $('body').append($player);
  $player.css('left', width / 2);

  var checkOffRight = function() {
    if(parseInt($player.css('left')) > width - 200) {
      $player.stop(true);
      $player.css('left', "10");
    }
  };

  var checkOffLeft = function() {
    if(parseInt($player.css('left')) < 200) {
      $player.stop(true);
      $player.css('left', (parseInt(width) - 200).toString());
    }
  };

  // PLAYER CONTROL CODE -----------------------------
  $(document).keydown(function(event){




    if(event.keyCode === 37) {
      $player.stop(true);
      $player.animate({left: "-=100"}, {duration: 100, complete: checkOffLeft});
    }
    if(event.keyCode === 39) {
      $player.stop(true);
      $player.animate({left: "+=100"}, {duration: 100, complete: checkOffRight});
    }

  });

  var Enemy = function() {
    this.$el = $($vanTemplate);
    $('body').append(this.$el);
    this.speed = Math.random() * 10000 + 4000;
    this.move();
  };

  Enemy.prototype.move = function() {

    this.$el.animate({left: "+=" + width}, {duration: this.speed,
      step: checkEnemyCollision.bind(this.$el),
      complete: function(){ this.remove();}});

  };

  var Friendly = function() {
    this.vehicles = [$copTemplate, $taxiTemplate];
    var vehicle = Math.floor(Math.random() * 2);

    this.$el = $(this.vehicles[vehicle]);
    $('body').append(this.$el);
    this.speed = Math.random() * 10000 + 4000;
    this.move();
  };

  Friendly.prototype.move = function() {
    this.$el.animate({left: "+=" + width}, {duration: this.speed,
      step: checkFriendlyCollision.bind(this.$el),
      complete: function(){ this.remove();}
    });
  };


  var checkEnemyCollision = function() {
    if(Math.abs(parseInt(this.css('left')) - parseInt($player.css('left'))) < 100) {
      $('body').toggleClass('alertEnemy');
      timeStart = new Date();
    }
  };
  var checkFriendlyCollision = function() {
    if(Math.abs(parseInt(this.css('left')) - parseInt($player.css('left'))) < 100) {
      $('body').toggleClass('alertFriendly');
      $('.van').remove();
    }
  };




  var enemySpawn = function() {
    var enemySpawnRate = Math.random() * 5000 + 3000;
    new Enemy();
    window.setTimeout(function(){enemySpawn()}, enemySpawnRate);
  };
  enemySpawn();

  var friendlySpawn = function() {
    var friendlySpawnRate = Math.random() * 5000 + 3000;
    new Friendly();
    window.setTimeout(function(){friendlySpawn();}, friendlySpawnRate);
  };

  friendlySpawn();


  // -----------------------------

  // factory for vans
  //  produces a new van
  //  randomly generates:
  //    speed
  // randomly call the factory in some changing random interval
// }());
