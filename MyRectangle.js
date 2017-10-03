function MyRectangle(scene, args) { //first 2 args: coordinates of top left vertex
	CGFobject.call(this,scene);		  //second 2 args: coordinates of bottom right vertex
	this.args = args;
	this.initBuffers();
};

MyRectangle.prototype = Object.create(CGFobject.prototype);
MyRectangle.prototype.constructor=MyRectangle;

MyRectangle.prototype.initBuffers = function () {

	var coords = this.args.split(" ");

	this.vertices = [
            coords[0], coords[3], 0, //1
            coords[2], coords[3], 0,  //2
            coords[0], coords[1], 0,  //3
            coords[2], coords[1], 0   //4
			];

	this.indices = [
            0, 1, 2, 
			3, 2, 1
        ];

    this.normals = [
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0
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