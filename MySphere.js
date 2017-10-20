/**
 * Creates an instance of MySphere
 * 
 * @constructor
 * @this {MySphere}
 * @param {CGFScene} scene Scene to place this object in.
 * @param {Array} args Array containing the information needed to draw a MySphere.  
 */
 function MySphere(scene, args) {
 	CGFobject.call(this,scene);

	args = args.split(" ");

 	this.radius = parseFloat(args[0]);
	this.stacks = parseFloat(args[1]);
	this.slices = parseFloat(args[2]);

 	this.initBuffers();
 };

 MySphere.prototype = Object.create(CGFobject.prototype);
 MySphere.prototype.constructor = MySphere;

 /**
 * Initializes the MySphere buffers.
 *
 * @this {MySphere}
 */
 MySphere.prototype.initBuffers = function() {

	var stepAng = 2*Math.PI / this.slices; //step in radians
	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();
	this.texCoords = new Array();
	//var depth = 1.0/this.stacks;
	var radius = Math.PI / this.stacks; //Radius
	var currtRadius;

 	for (var i = 0; i <this.stacks; i++){
		currtRadius = i * radius;
		for (var j = 0; j < this.slices; j++){
			//vertices and normals
			this.vertices.push(this.radius * Math.sin(currtRadius) * Math.cos(j*stepAng), this.radius * Math.sin(currtRadius) * Math.sin(j*stepAng), this.radius * Math.cos(currtRadius));
			this.normals.push(this.radius * Math.sin(currtRadius) * Math.cos(j*stepAng), this.radius * Math.sin(currtRadius) * Math.sin(j*stepAng), this.radius * Math.cos(currtRadius));

			this.vertices.push(this.radius * Math.sin(currtRadius + radius) * Math.cos(j*stepAng), this.radius * Math.sin(currtRadius + radius) * Math.sin(j*stepAng), this.radius * Math.cos(radius * (i+1)));
			this.normals.push(this.radius * Math.sin(currtRadius + radius) * Math.cos(j*stepAng), this.radius * Math.sin(currtRadius + radius) * Math.sin(j*stepAng), this.radius * Math.cos(radius * (i+1))); //Normals in line with the vertexes

			this.texCoords.push(((i + 1)/this.stacks) * (Math.cos(j*stepAng)/2 + 0.5), (i + 1)/this.stacks) * (1- (Math.sin(j*stepAng)/2 + 0.5));
			this.texCoords.push(((i + 1)/this.stacks) * (Math.cos(j*stepAng)/2 + 0.5), (i + 2)/this.stacks) * (1- (Math.sin(j*stepAng)/2 + 0.5));


      		this.indices.push((i*2*this.slices)+(2*j)+0);
			this.indices.push((i*2*this.slices)+(2*j)+1);
      		this.indices.push((i*2*this.slices)+(((2*j)+3)% (this.slices * 2)));

      		this.indices.push((i*2*this.slices)+(((2*j)+2) % (this.slices * 2)));	
			this.indices.push((i*2*this.slices)+(((2*j)+0) % (this.slices * 2))); //This doesn't need integer division
      		this.indices.push((i*2*this.slices)+(((2*j)+3) % (this.slices * 2)));

		}
 	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

/**
* Scales the texture bound on MySphere. Overrides the same function in MyGraphLeaf.
*
* @this {MySphere}
* @param {number} ampS Amplification factor on the S coordinate in the ST coordinate system.
* @param {number} ampT Amplification factor on the T coordinate in the ST coordinate system.
*/
MySphere.prototype.scaleTex = function(ampS, ampT){
	
}