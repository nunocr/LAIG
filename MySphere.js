function MySphere(scene, args) {
 	CGFobject.call(this,scene);

 	args = args.split(" ");
	
	this.radius = parseFloat(args[0]);
	this.slices = parseFloat(args[1]);
	this.stacks = parseFloat(args[2]);
	this.minS = 0.0;
	this.maxS = 1.0;
	this.minT = 0.0;
	this.maxT = 1.0;

	this.texelLengthS = (this.maxS - this.minS) / this.slices;
	this.texelLengthT = (this.maxT - this.minT) / this.stacks;

 	this.initBuffers();
 };

 MySphere.prototype = Object.create(CGFobject.prototype);
 MySphere.prototype.constructor = MySphere;

 MySphere.prototype.initBuffers = function() {
 	
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

	this.sCoord = this.maxS;

	//base
   for(i = 0; i < this.slices; i++){
   	this.vertices.push(this.radius * Math.sin(i*Math.PI*2/this.slices), 0, this.radius * Math.cos(i*Math.PI*2/this.slices));
   	this.normals.push(0,1,0);
   }

	for(i = 0; i < this.slices -2; i++){
		this.indices.push(0, i+1, i +2);
	}




	//corpo
for(i = 0; i < this.stacks; i++){

	this.tCoord = this.minT;

	for(j = 0; j < this.slices; j++){
		this.vertices.push(this.radius * Math.sin(j*Math.PI*2/this.slices) * Math.cos(i*Math.PI/2/this.stacks), -this.radius * Math.sin(i*Math.PI/2/this.stacks), this.radius * Math.cos(j*Math.PI*2/this.slices)*Math.cos(i*Math.PI/2/this.stacks));
		this.normals.push(this.radius * Math.sin(j*Math.PI*2/this.slices)*Math.cos(i*Math.PI/2/this.stacks), -this.radius * Math.sin(i*Math.PI/2/this.stacks), this.radius * Math.cos(j*Math.PI*2/this.slices)*Math.cos(i*Math.PI/2/this.stacks));
		this.texCoords.push(this.sCoord, this.tCoord);
		this.tCoord += this.texelLengthT;
	}
	this.sCoord -= this.texelLengthS;
}

this.vertices.push(0,-1,0);
this.normals.push(0,-1,0);

for(i = 0; i < this.stacks - 1; i++){
	for(j = 0; j < this.slices; j++){

		if(j == this.slices - 1){
		this.indices.push(this.slices+ this.slices*i,this.slices + j + this.slices*i,this.slices + this.slices + this.slices*i);
		this.indices.push(this.slices + j+ this.slices*i,this.slices + this.slices + j+ this.slices*i,this.slices + this.slices+ this.slices*i);	

		}

		else{
		this.indices.push(this.slices + 1 + j+ this.slices*i,this.slices + j+ this.slices*i,this.slices + this.slices + 1 + j+ this.slices*i);
		this.indices.push(this.slices + j+ this.slices*i,this.slices + this.slices + j+ this.slices*i,this.slices + this.slices + 1 + j+ this.slices*i);	
		}
	}
}

for(i = 0; i < this.slices; i++){
this.indices.push(this.vertices.length/3 - 1,this.vertices.length/3 - 1 - i,this.vertices.length/3 - 2 - i);
}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers(); 
 };