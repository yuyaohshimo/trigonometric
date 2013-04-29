(function (w) {
	/**
	 * Functions
	 */

	/**
	 * Objects
	 */
	var Canvas = function (canvas) {
		var self = this;
		self.stage = new createjs.Stage(canvas);
		self.width = self.stage.canvas.width;
		self.height = self.stage.canvas.height;
		self.centerX = self.width / 2;
		self.centerY = self.height / 2;
	};

	var Bg = function () {
		var self = this;
		self.shape = new createjs.Shape();
		self.draw = function (stageWidth, stageHeight) {
			self.shape.graphics
			.beginStroke('#bbb')
			.moveTo(stageWidth / 2, 0)
			.lineTo(stageWidth / 2, stageHeight)
			.beginStroke('#bbb')
			.moveTo(0, stageHeight / 2)
			.lineTo(stageWidth, stageHeight / 2);
		};
	};

	var Circle = function () {
		var self = this;
		self.shape = new createjs.Shape();
		self.draw = function (radius, x, y) {
			self.radius = radius;
			self.x = x;
			self.y = y;
			self.shape.graphics
			.beginStroke('#999')
			.drawCircle(self.x, self.y, radius);
		};
		self.getPosition = function (axis, degree, radius) {
			if (!radius) {
				radius = self.radius;
			}
			var angle = (degree - 90) * Math.PI / 180;
			var obj = {
				x: self.x + Math.cos(angle) * radius,
				y: self.y + Math.sin(angle) * radius
			};
			return obj[axis];
		};
		self.getAngle = function (x, y) {
			var dx = x - self.x;
			var dy = y - self.y;
			return Math.atan2(dy, dx) * 100 / Math.PI;
		};
	};

	var Moon = function () {
		var self = this;
		self.shape = new createjs.Shape();
		self.draw = function (radius, x, y) {
			self.radius = radius;
			self.x = x;
			self.y = y;
			self.shape.graphics
			.beginFill('#acff18')
			.drawCircle(self.x, self.y, radius)
			.endFill();
		};
		self.animation = function (stage, parent) {
			var degree = 0;
			var timer = setInterval(function () {
				self.shape.x = parent.getPosition('x', degree) - self.x;
				self.shape.y = parent.getPosition('y', degree) - self.y;
				stage.update();
				degree++;
			}, 10);
		};
		self.drag = function (stage, parent) {
			var self = this;
			self.shape.onPress = function (e) {
				console.log('mouse press')
				e.onMouseMove = function (e) {
					console.dir(e)
					console.dir(parent)
					var mx = e.stageX;
					var my = e.stageY;

					var newRadius = self.getDistance(parent.x, parent.y, mx, my);
					var scale = newRadius / parent.radius;

					var angle = parent.getAngle(mx, my);
					

					console.log('scale: ', scale);
					console.log('angle: ', angle);


					parent.shape.scaleX = parent.shape.scaleY = scale;
					parent.shape.regX = parent.shape.x = parent.x;
					parent.shape.regY = parent.shape.y = parent.y;

					self.shape.x = parent.getPosition('x', angle, newRadius) - self.x;
					self.shape.y = parent.getPosition('y', angle, newRadius) - self.y;

					stage.update();

					// var scale = 

					console.log('mouse move');
				};
				e.onMouseUp = function (e) {
					console.log('mouse up');
				};
			};
			// self.shape.onClick('mousedown', function (e) {
			// 	console.log('mousedown');

			// 	console.dir(e)

			// 	e.target
			// 	.addEventListener('mousemove', function (e) {
			// 		console.log('mousemove');

			// 	})
			// });
		};
		self.getDistance = function (x1, y1, x2, y2) {
			var dx = x2 - x1;
			var dy = y2 - y1;
			return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
		};
	};

	var canvas = new Canvas('main');

	// bg
	var bg = new Bg();
	bg.draw(canvas.width, canvas.height);

	// circle
	var circle = new Circle();
	circle.draw(100, canvas.centerX, canvas.centerY);

	// moon
	var moon = new Moon();
	moon.draw(15, circle.getPosition('x', 30), circle.getPosition('y', 30));
	// moon.animation(canvas.stage, circle);
	moon.drag(canvas.stage, circle);

	canvas.stage.addChild(bg.shape);
	canvas.stage.addChild(circle.shape);
	canvas.stage.addChild(moon.shape);
	canvas.stage.update();

})(window);



// // var i = 0;
// // var testTimer = setInterval(function () {
// // 	if (i > 360) {
// // 		i = 0;
// // 	}
// // 	var _moonPos = getPosition(i, circleRadius);
// // 	moon.x = _moonPos.x - moonPos.x;
// // 	moon.y = _moonPos.y - moonPos.y;

// // 	stage.update();

// // 	i++;
// // }, 10);


// console.dir(circle)

// stage.addChild(circle);

// stage.update();


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