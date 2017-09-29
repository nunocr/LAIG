function MyRectangle(scene, args) { //first 2 args: coordinates of top left vertex
	CGFobject.call(this,scene);		  //second 2 args: coordinates of bottom right vertex

	this.initBuffers();
};

MyRectangle.prototype = Object.create(CGFobject.prototype);
MyRectangle.prototype.constructor=MyRectangle;

MyRectangle.prototype.initBuffers = function () {
	this.vertices = [
            args[0], args[3], 0, //1
            args[2], args[3], 0,  //2
            args[0], args[1], 0,  //3
            args[2], args[1], 0   //4
			];

	this.indices = [
            0, 1, 2, 
			3, 2, 1
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};




/*
	
	3____________________4
	I					I
	I					I
	I		 0, 0		I
	I					I
	I					I
	_____________________
	1					2





*/