var myGamePiece;
var myObstacles = [];

function startGame()
{
	myGamePiece = new component( 30 , 30 , 'red' , 10 , 120 );
	myGameArea.start();
}


var myGameArea = {
	canvas: document.createElement( 'canvas' ) ,
	start: function()
	{
		this.canvas.height = 270;
		this.canvas.width = 480;
		this.context = this.canvas.getContext( '2d' );
		document.body.insertBefore( this.canvas , document.body.childNodes[0] );
		this.frameNum = 0;
		this.interval = setInterval( updateGameArea , 20 );
	} ,
	clear: function() { this.context.clearRect( 0 , 0 , this.canvas.width , this.canvas.height ); } ,
	stop: function() { clearInterval( this.interval ); }
};


function component( width , height , color , x , y )
{
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.update = function()
	{
		var ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect( this.x , this.y , this.width , this.height );
	}

	this.newPos = function()
	{
		this.x += this.speedX;
		this.y += this.speedY;
	}

	this.crashWith = function( otherObj )
	{
		var myLeft = this.x;
		var myRight = this.x + ( this.width) ;
		var myTop = this.y ;
		var myBottom = this.y + ( this.height );

		var otherLeft = otherObj.x;
		var otherRight = otherObj.x + ( otherObj.width );
		var otherTop = otherObj.y;
		var otherBottom = otherObj.y + ( otherObj.height );

		var crash = true;

		if( ( myBottom < otherTop ) ||  ( myTop > otherBottom ) || ( myRight < otherLeft ) || ( myLeft > otherRight ) )
		{
			crash = false;
		}
		return crash;
	}
}

function updateGameArea()
{
	var x;
	var height;
	var gap;
	var minHeight;
	var maxHeight;
	var minGap;
	var maxGap;
	for( i = 0 ; i < myObstacles.length ; i++ )
	{
		if( myGamePiece.crashWith( myObstacles[i] ) )
		{
			myGameArea.stop();
			return;
		}
	}

	myGameArea.clear();
	myGameArea.frameNum++;

	if( (myGameArea.frameNum==1) || (everyInterval(150) ) )
	{
		x = myGameArea.canvas.width;
		minHeight = 20;
		maxHeight = 200;
		height = Math.floor( Math.random()*( maxHeight-minHeight+1) + minHeight );
		minGap = 50;
		maxGap = 200;

		gap = Math.floor( Math.random()*(maxGap-minGap+1)+minGap);
		myObstacles.push( new component( 10 , height , 'green' , x , 0 ) );
		myObstacles.push( new component( 10 , x-height-gap , 'green' , x , height+gap ) );
	}

	for( i = 0 ; i < myObstacles.length ; i++ )
	{
		myObstacles[i].x--;
		myObstacles[i].update();
	}
	myGamePiece.newPos();
	myGamePiece.update();
}

function everyInterval( n ) 
{
	if( (myGameArea.frameNum / n) % 1 == 0 ) { return true; }
	return false;
}

function moveUp() { myGamePiece.speedY = -1; }
function moveDown() { myGamePiece.speedY = 1; }
function moveLeft() { myGamePiece.speedX = -1; }
function moveRight() { myGamePiece.speedX = 1; }

function clearMove()
{
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
}



















