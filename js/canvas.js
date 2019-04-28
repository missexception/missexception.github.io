var canvasWidth = 600
canvasWidth=window.innerHeight
// if(window.innerWidth&&window.innerHeight){
// 	if(window.innerHeight>window.innerWidth){
// 		canvasWidth=window.innerWidth
// 	}else{
// 		canvasWidth=window.innerHeight
// 	}
// }
var canvasHeight = canvasWidth

var isMousDown = false
var lastLoc = {x:0, y:0}  //初始化上一次点击的x,y坐标

var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")

canvas.height = canvasHeight
canvas.width = canvasWidth


function windowToCanvas(x, y){
	var bbox = canvas.getBoundingClientRect()
	return{x:Math.round(x - bbox.left), y:Math.round(y - bbox.top)}
}//获取鼠标点击在canvas的x,y坐标

canvas.onmousedown = function(e){
	e.preventDefault();	  //防止被默认值修改
	isMouseDown = true
	lastLoc = windowToCanvas(e.clientX, e.clientY)  //上一次鼠标点击的x,y坐标
	//alert(loc.x + "," + loc.y)
};
canvas.onmouseup = function(e){
	e.preventDefault();
	isMouseDown = false
	//console.log("mouse up")
};

canvas.onmouseout = function(e){
	e.preventDefault();
	isMouseDown = false
	//console.log("mouse out")
};

canvas.onmousemove = function(e){
	e.preventDefault();
	if (isMouseDown)
	{
		var curloc = windowToCanvas(e.clientX, e.clientY);  //获取当前x,y坐标
		
		context.beginPath()
		context.moveTo(lastLoc.x, lastLoc.y);
		context.lineTo(curloc.x, curloc.y);
		context.closePath()
		
		context.strokeStyle = "black"
		context.lineWidth = 25
		context.lineCap = "round"
		context.lineJoin = "round"
		context.stroke();
		//console.log("mouse move")
		
		lastLoc = curloc;
		}
};

drawGrid()
function clean(){
	context.clearRect(0, 0, canvasHeight, canvasWidth)
	drawGrid()
}


function drawGrid(){
	
	//context.save()和context.restore()保证后面的操作不会影响田字格
	context.save()
	
	context.strokeStyle = "rgb(230, 11, 9)"
	
	//田字格四边
	context.beginPath()
	context.moveTo(0, 0)
	context.lineTo(canvasHeight, 0)
	context.lineTo(canvasHeight, canvasWidth)
	context.lineTo(0, canvasWidth)
	context.closePath()
	//田字格四边
	context.lineWidth = 5
	context.stroke()
	
	context.beginPath()
	//对角线
	context.moveTo(0, 0)
	context.lineTo(canvasHeight, canvasWidth)
	
	context.moveTo(canvasHeight, 0)
	context.lineTo(0, canvasWidth)
	//对角线
	
	//中间线条
	context.moveTo(0, canvasHeight/2)
	context.lineTo(canvasWidth, canvasHeight/2)
	
	context.moveTo(canvasWidth/2, 0)
	context.lineTo(canvasWidth/2, canvasHeight)
	//中间线条
	context.lineWidth = 1
	context.stroke()
	
	context.restore()
}  