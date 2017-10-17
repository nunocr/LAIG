function MyRectangle(scene, args) { //first 2 args: coordinates of top left vertex
	CGFobject.call(this,scene);		  //second 2 args: coordinates of bottom right vertex
	this.args = args;

    this.minS = 0;
    this.maxS = 1;
    this.minT = 0;
    this.maxT = 1;
	
	this.initBuffers();
};

MyRectangle.prototype = Object.create(CGFobject.prototype);
MyRectangle.prototype.constructor=MyRectangle;

MyRectangle.prototype.initBuffers = function () {

	var coords = this.args.split(" ");
	this.dx = coords[2] - coords[0];
	this.dy = coords[1] - coords[3];

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
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
    	];

    this.texCoords = [
		coords[0], coords[3], //1
        coords[2], coords[3],  //2
        coords[0], coords[1],  //3
        coords[2], coords[1]
    ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyRectangle.prototype.scaleTex = function(ampS, ampT){
	this.texCoords = [    
		0, 0,
		this.dx/ampS, 0,
		0, this.dy/ampT,
		this.dx/ampS, this.dy/ampT
    ];
	this.updateTexCoordsGLBuffers();
}


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