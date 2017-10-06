/**
 * MyTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 //args="2 0 12 12 0 2 0 0 0" />

function MyTriangle(scene, args) {
	CGFobject.call(this,scene);

	this.args = args.split(" ");
	for(var i = 0; i < this.args.length; i++){
		this.args[i] = parseFloat(this.args[i]);
	}


	this.args = args;
	this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor=MyTriangle;

MyTriangle.prototype.initBuffers = function () {

	var coords = this.args.split(" ");
	

	this.vertices = [
            coords[0], coords[1], coords[2],
            coords[3], coords[4], coords[5],
            coords[6], coords[7], coords[8],
			];

	this.indices = [
            0, 1, 2
        ];

    this.normals = [
    		0, 1, 0,
    		0, 1, 0,
    		0, 1, 0
    	];


	this.texCoords = [
			0, 0,
			0, 1,
			1, 1
		];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};