/**
 * Created by Al Mahdi on 8/2/2016.
 */

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");


canvas.width = 400;
canvas.height = 400;
//ctx.translate(0,500);
ctx.transform(1, 0, 0, -1, 0, canvas.height)

var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
//declare parameters
var gameSpeed = 250; // fps
var x = 0,
    y = 0,
    startPoint = 50,
    cX = 50,
    cHeight = 100,
    cWidth = 70,
    oX = 250,
    oHeight = 150, // oHeight
    oWidth = 70;
    x0 = cX,
    y0 = cHeight,
    angle = 1.047198, // 60° (in rad)
    initialSpeed = 0,
    t = 0,
    g = 9.8,
    eRopeLength = 40;



ctx.clearRect(0, 0, canvas.width, canvas.height);
/*ctx.strokeStyle="red";
ctx.moveTo(cX,0);
ctx.lineTo(cX, cY);
ctx.lineTo(cX + 70, cY);
ctx.stroke();*/

ctx.fillRect(cX, 0, cWidth, cHeight);
ctx.fillRect(oX, 0, oWidth, oHeight);
ctx.fillStyle = "red";
ctx.fillRect(cX, cHeight, 20, 20);

/*ctx.moveTo(oX, 0);
ctx.lineTo(oX, oHeight);
ctx.lineTo(oX + oWidth, oHeight);
ctx.stroke();*/

var launch = false,
    cross = false,
    next = false,
    stopGame = false;

var noX = 0,
    noHeight = 0,
    noWidth = 0;

function start () {
    if (launch){
        t = t + 0.04;
        x = x0 + initialSpeed * Math.cos(angle) * t;
        y = y0 + (initialSpeed * Math.sin(angle) * t - ((1/2) * g * t * t)) ;
    }


    if (!cross && x+20 >= oX) {
        if (y+20 < oHeight) {
            stopGame = true;
            alert("Game Over!");
        }else{
            cross = true; //crossed
            console.log('crossed! ')
        }
    }


    if (cross && (x < oX || x > oX + oWidth) && y < oHeight - 50) {
        stopGame = true;
        alert("Game Overrrr!");
    }

    if (cross && (x > oX && x < oX + oWidth) && y < oHeight){
        //alert("Success!");
        //stopGame = true;
        //score++
        launch = false;
        buildNewTower();
        //nextLevel();

        oX = oX - 1;
        noX = noX - 1;
        cX = cX -1;
        x = x - 1;

        ctx.fillStyle = "black";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(noX, 0, noWidth, noHeight);
        if (oX == startPoint){
            console.log("reeaaaaaaached");
            x0 = oX;
            y0 = oHeight;
            x = x0;
            y = y0;
            t = 0;
            cX = oX;
            cWidth = oWidth;
            cHeight = oHeight;
            oX = noX;
            oWidth = noWidth;
            oHeight = noHeight;
            //stopGame = false;
            cross = false;

        }
    }


    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(cX, 0, cWidth, cHeight);
    ctx.fillRect(oX, 0, oWidth, oHeight);
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, 20, 20);

    if ( !stopGame){
        setTimeout(start, 1000 / gameSpeed);
    }

}



function buildNewTower() {
    if(next){

        noX = Math.floor((Math.random() * 200) + oX + oWidth + 10);
        noWidth = Math.floor((Math.random() * 300) + 20);
        noHeight = Math.floor((Math.random() * (oHeight + 100)) + 20);
        ctx.fillStyle = "black";
        ctx.fillRect(noX, 0, noWidth, noHeight);
        next = false;

    }


}

function nextLevel(){

    oX = oX - 1;
    noX = noX - 1;
    cX = cX -1;
    x = x - 1;

    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(noX, 0, noWidth, noHeight);
    ctx.fillRect(cX, 0, cWidth, cHeight);
    ctx.fillRect(oX, 0, oWidth, oHeight);
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, 20, 20);
    if (oX > startPoint){
        setTimeout(nextLevel, 1000 / gameSpeed);
    }else if (oX == startPoint){
        console.log("reeaaaaaaached");
        x0 = oX;
        y0 = oHeight;
        x = 0;
        y = 0;
        t = 0;
        cX = oX;
        cWidth = oWidth;
        cHeight = oHeight;
        oX = noX;
        oWidth = noWidth;
        oHeight = noHeight;
        stopGame = false;
        cross = false;
        console.log(cX);
        ctx.fillStyle = "black";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(noX, 0, noWidth, noHeight);
        ctx.fillRect(cX, 0, cWidth, cHeight);
        ctx.fillRect(oX, 0, oWidth, oHeight);
        ctx.fillStyle = "red";
        ctx.fillRect(cX, cHeight, 20, 20);

    }


}





function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

$('#canvas').on('mousedown', function(ev) {
    var pos = getMousePos(canvas, ev);
    if (pos.x > x0 && pos.x < x0 + 20 && pos.y > canvas.height - y0 - 20 && pos.y < canvas.height - y0){
        console.log('mouse down on : ' + pos.x + ', ' + pos.y);
        var mouseUp = false;
        var mX = pos.x - x0;
        var mY = pos.y - (canvas.height - y0 - 20);
        var dist = 0;
        var ang = 0;
        console.log(mX + ', ' + mY);
        $('#canvas').on('mousemove', function(es){
           if(!mouseUp){
               console.log('mouse is moving .. ' + getMousePos(canvas, es).x);
               x = getMousePos(canvas, es).x - mX;
               y = canvas.height - getMousePos(canvas, es).y - mY;
               x0 = x;
               y0=y;
               console.log("cX: " + cX);
               dist = Math.sqrt(Math.pow((x - cX),2) + Math.pow((y - cHeight),2));
               console.log("distance: " + dist);
               initialSpeed = 15 * Math.log(dist);
               console.log("speed: " + initialSpeed);

               angle = Math.atan2(y - cHeight, x - cX) + Math.PI;
               console.log("angle= " + angle);

               ctx.fillStyle = "black";
               ctx.clearRect(0, 0, canvas.width, canvas.height);
               ctx.fillRect(cX, 0, cWidth, cHeight);
               ctx.fillRect(oX, 0, oWidth, oHeight);
               ctx.fillStyle = "red";
               ctx.fillRect(x, y, 20, 20);


           }
        });
        $('#canvas').on('mouseup', function(){
            console.log('mouse is up !');
            mouseUp = true;
            launch = true;
            next = true;
            start();
        });




    }

})


//start();