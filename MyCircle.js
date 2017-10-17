/**
 * MyCircle
 * @constructor
 */
 function MyCircle(scene, slices) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;

 	this.initBuffers();
 };

 MyCircle.prototype = Object.create(CGFobject.prototype);
 MyCircle.prototype.constructor = MyCircle;

 MyCircle.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

	var angulo = 2*Math.PI/this.slices;
	var currRad = this.botRad;
	var radiusInc = (this.topRad - this.botRad)/this.stacks;

 	this.vertices = [
 	
 	];

 	this.indices = [

 	];

 	this.normals = [

 	];

 	this.texCoords = [

 	];


 	for (i = 0; i < this.slices; i++){
 	    this.vertices.push(Math.cos(i*angulo), Math.sin(i*angulo), 0);
 	    this.normals.push(0,0,1);
 	    this.texCoords.push((-Math.cos(i*angulo)+1)/2,(Math.sin(i*angulo)+1)/2);
 	}

 	for (j = 0; j < this.slices-2; j++){
		this.indices.push(0,j+1,j+2);
	}

	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

MyCircle.prototype.scaleTex = function(ampS, ampT){
	
}