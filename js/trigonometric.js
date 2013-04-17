var distance = function (x1, y1, x2, y2) {
	var dx = x2 - x1;
	var dy = y2 - y1;
	return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};
var angle = function (x1, y1, x2, y2) {
	var dx = x2 - x1;
	var dy = y2 - y1;
	return Math.atan2(dy, dx) * 180 / Math.PI;
};

var stage = new createjs.Stage('main');
var stageWidth = stage.canvas.width;
var stageHeight = stage.canvas.height;

var centerX = stageWidth / 2;
var centerY = stageHeight / 2;

var circle = new createjs.Shape();
var circleRadius = 50;
circle.graphics.beginStroke('#999').drawCircle(centerX, centerY, circleRadius * 2);

console.dir(circle)

stage.addChild(circle);

stage.update();


// var box = $('#box');
// var boxWidth = parseInt(box.css('width'), 10);
// var boxHeight = parseInt(box.css('height'), 10);

// var graph = $('#graph');
// var graphWidth = parseInt(graph.css('width'), 10);
// var graphHeight = parseInt(graph.css('height'), 10);

// var button = $('#button');
// var centerX = Math.ceil(graphWidth / 2);
// var centerY = Math.ceil(graphHeight / 2);
// var boxLtX = centerX + boxWidth / 2;
// var boxLtY = centerY + boxHeight / 2;
// var defaultDist = distance(centerX, centerY, boxLtX, boxLtY);
// var defaultAngle = angle(centerX, centerY, boxLtX, boxLtY);

// var boxX = centerX - Math.ceil(boxWidth / 2);
// var boxY = centerY - Math.ceil(boxHeight / 2);

// box.css({'left': boxX, 'top': boxY});

// button.on('mousedown', function (e) {
// 	console.log('mousedown');
// 	e.preventDefault();

// 	var sx = e.clientX;
// 	var sy = e.clientY;
// 	button
// 	.on('mousemove', function (e) {
// 		console.log('mousemove');
// 		var mx = e.clientX;
// 		var my = e.clientY;

// 		var newDist = distance(centerX, centerY, mx, my);
// 		var scale = newDist / defaultDist;
// 		var newAngle = angle(centerX, centerY, mx, my) + defaultAngle;

// 		console.log('defaultDist: ', defaultDist);
// 		console.log('newDist: ', newDist);
// 		console.log('scale: ', scale);
// 		console.log('angle: ', newAngle);

// 		box.transform('rotate(' + newAngle + 'deg) scale(' + scale +  ')');

// 	})
// 	.on('mouseup', function (e) {
// 		console.log('mouseup');
// 		button
// 		.off('mousemove')
// 		.off('mouseup')
// 		.off('mouseout');
// 	})
// 	.on('mouseout', function (e) {
// 		console.log('mouseup');
// 		button
// 		.off('mousemove')
// 		.off('mouseup')
// 		.off('mouseout');
// 	});
// });