/* 
 * Snake Clone
 * ----------..
 * coded by Alessio Delmonti
 * released with MIT License
 *   TODO LIST
       Introduce levels
        TODO: Introduce wall obstacles
        TODO: Game over when snake slithers into itself
        TODO: add multiple wall obstacles
        TODO: Track/store high scores
 */

var DEF_WIDTH = 400,
DEF_HEIGHT = 400,
DEF_COLOR = "#fff",
DEF_BORDER = 10,
S_DIM = 10,
offset = S_DIM,
H_COLOR = "red",
i = 0,
temp=false,
count_t= 0,
posx = 0,
posy = 0,
status = 1,
direction = "",
speed = 100,
score,
c,
pause=false,
sn = new Array;
sn[0] = new Array(2);

var arena = {

    width: DEF_WIDTH,
    height: DEF_HEIGHT,
    color: DEF_COLOR,
    border: DEF_BORDER

}

var snake = {
    dim: S_DIM,
    h_color: H_COLOR,
    t_color: "#000",
    sn: sn,//posx, posy),

    getinfo: function(){
        $('#debug').html("hX/sn00: "+sn[0][0]+"<br>hY/sn01: "+sn[0][1]+"<br>status: "+status+"<br>PEZZI: "+count_t+"<br> score:"+score);
    },
    head: function(){
        sn[0][0] = posx;
        sn[0][1] = posy;
    },

    follow: function(){
        for(i=sn.length-1; i>0; i--){
            sn[i][0] = sn[i-1][0];
            sn[i][1] = sn[i-1][1];            
        }
    },
    onemore: function(){
        sn[count_t]= new Array(2);
        sn[count_t][0] = sn[count_t-1][0];
        sn[count_t][1] = sn[count_t-1][1];
        count_t++;
    }

    
}

/*
 *levels will built with
 *an array{ positions
 **/
/*
var levels = {

   name: name,
   create : function(level){
       for(var i=0; i<level.lenght; i++){
           $('#grid').html()
       }
   }
}
*/
var goodies = {
    
    xy: function(){
        var x; 
        for(i=0; i<=2; i++){
            x = Math.floor(Math.random() * (DEF_WIDTH - offset + 1)) + offset;
            while(x%offset!=0){
                x++;
            }
            c[i] = x;
        }

    },
    onemore: function(){
       $('#grid').append('<div style="width:10px;height:10px;background-color:green;position:absolute;top:'+c[0]+'px;left:'+c[1]+'px;"></div>');
    },
    getInfo: function(){
      
      $('#debug').append("<br>gy/c0:"+c[0]+"<br>gx/c1:"+c[1]);
    }

}

var gameFunc = {
    gameOver: function(){clearInterval(timer);status = 0;},

    checkOver: function() {
            if((sn[0][0] > DEF_WIDTH-offset || sn[0][0] == 0) || (sn[0][1] > DEF_HEIGHT-offset || sn[0][1] == 0)){
                gameFunc.gameOver();
                alert('game over');
                return false;
            }
            else{status=1;return 1;}
    },
    pause: function(){
         if(pause==false){
            pause = true;
            clearInterval(timer);
         }
         else{
             pause = false;
             setTimeout("timer=setInterval('move()', "+speed+")", 1);
         }
    },

    eat: function(){
        if((sn[0][0] == c[1]) && (c[0] == sn[0][1])){
            snake.onemore();
            score++;
            goodies.xy();
            goodies.onemore();
        }
    }
}


function start(){
   init();
   build_grid();
   setTimeout("timer=setInterval('move()', "+speed+")", 1);
   goodies.xy();
   refresh();
}

function init(){
    posx = 10;
    posy = 10;
    sn[1] = new Array(2);
    sn[2] = new Array(2);
    pause = false;
    count_t= 3;
    score = 0;
    c = new Array(2);
}

function build_grid(){
    $('#arena').html('<div id="grid" style="width:'+arena.width+'px;height:'+arena.height+';border:'+arena.border+'px solid #000;"></div>');
}

function refresh(){
    
    snake.follow();
    snake.head();
    $('#grid').html('<div id="sn_part" style="z-index:999;width:'+snake.dim+'px;height:'+snake.dim+'px;position:absolute;top:'+sn[0][1]+'px;left:'+sn[0][0]+'px;background-color:'+snake.h_color+';border:1px solid #000;"></div>');
    for(i=sn.length-1; i>0; i--){
        $('#grid').append('<div class="sn_part" style="width:'+snake.dim+'px;height:'+snake.dim+'px;position:absolute;top:'+sn[i][1]+'px;left:'+sn[i][0]+'px;background-color:'+snake.t_color+';border:1px solid #000;"></div>');
    }
    snake.getinfo();
    goodies.getInfo();
    goodies.onemore();
}

function getkey(e){
if(status==0){return;}
  if(e.keyCode == "40")
      {
         if(direction!="top" && direction!="down" && pause==false){
         direction = "down";
         move();
         }
      }
  else if(e.keyCode == "38")
      {
         if(direction!="down" && direction!="top" && pause==false){
         direction = "top";
         move();
         }
      }
  else if(e.keyCode == "39")
      {
         if(direction!="right" && direction!="left" && pause==false){
         direction = "left";
         move();
         }
      }
  else if(e.keyCode == "37" && direction!="right" && pause==false)
      {
         if(direction!="left" && pause==false){
         direction = "right";
         move();
         }
      }
  else if(e.keyCode == "80") //p
      {
      gameFunc.pause();
      }
  else if(e.keyCode == "107") //+
      {
      speed+=10;
      setTimeout("timer=setInterval('move()', "+speed+")", 1);
      }
  else if(e.keyCode == "188") //<
      {
        snake.onemore();
        score++;
        goodies.xy();
        goodies.onemore();
      }
  /*
  else if(e.keyCode == "32") //space bar
      {
      snake.onemore();
      }
  */
   }

function move(){
    if(pause==true && status==0){return;}
    if(gameFunc.checkOver()==false){return;}
    gameFunc.eat();
    switch(direction)
    {
        case "down":
            posy+=offset;
            refresh();
            break;
        case "top":
            posy-=offset;
            refresh();
            break;
        case "left":
            posx+=offset;
            refresh();
            break;
        case "right":
            posx-=offset;            
            refresh();
            break;
        default:
            gameFunc.checkOver();
            break;
    }
}

function dump(arr,level) {
var dumped_text = "";
if(!level) level = 0;

var level_padding = "";
for(var j=0;j<level+1;j++) level_padding += "    ";

if(typeof(arr) == 'object') {
 for(var item in arr) {
  var value = arr[item];

  if(typeof(value) == 'object') { //If it is an array,
   dumped_text += level_padding + "'" + item + "' ...\n";
   dumped_text += dump(value,level+1);
  } else {
   dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
  }
 }
} else { //Stings/Chars/Numbers etc.
 dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
}
return dumped_text;
}

$(function(){
    start();
});