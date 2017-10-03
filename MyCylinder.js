 function MyCylinder(scene, args) {
 	CGFobject.call(this,scene);
	
/*
<LEAF type="cylinder" args="ff ff ff ii ii" /> <!--​ ​height,​ ​bottom​ ​radius,​ ​top​ ​radius, 
sections​ ​along​ ​height​ ​(stacks),​ ​parts​ ​per​ ​section​ ​(slices)​ ​--> 
*/
    this.height = args[0];
    this.botRadius = args[1];
	this.topRadius = args[2];
	this.stacks = args[3];
	this.slices = args[4];
	this.heightIncrement = this.height/this.stacks;

	this.minS = 0.0;
	this.maxS = 1.0;
	this.minT = 0.0;
	this.maxT = 1.0;
	this.texelLengthS = (this.maxS - this.minS) / this.slices;
	this.texelLengthT = (this.maxT - this.minT) / this.stacks;
	

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
 	
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

	var stack_h = 1 / this.stacks;

	//BASE INFERIOR
	//gerar os vertices da base
	for(i = 0; i < this.slices; i++){
		this.vertices.push(
		Math.sin(this.botRadius * i * Math.PI*2/this.slices),
		Math.cos(this.botRadius * i * Math.PI*2/this.slices),
		0);
		this.normals.push(0,0,-1);
	}

	//gerar os triangulos da base
	for(i = 0; i < this.slices - 2; i++){
		//poligono de n lado é decomposto em n-2 triangulos
		this.indices.push(0,i+1,i+2);
	}


	this.texelLengthS = (this.maxS - this.minS) / this.slices;
	this.texelLengthT = (this.maxT - this.minT) / this.stacks;
	
var sCoord = this.maxS;

	//CORPO
	//gerar os vertices das faces
	for(i = 0; i < this.stacks + 1; i++){
var tCoord = this.maxT;
		for(j = 0; j < this.slices; j++){
			
		
			this.vertices.push(
			Math.sin(j*Math.PI*2/this.slices),
			Math.cos(j*Math.PI*2/this.slices),
			i*stack_h
			);

			this.normals.push(
			Math.sin(j*Math.PI*2/this.slices),
			Math.cos(j*Math.PI*2/this.slices),
			0);

			this.texCoords.push(sCoord, tCoord);
			tCoord -= this.texelLengthT;	
		}
		var sCoord = this.maxS;
	}

	//gerar triagulos das faces
	for(i = 0; i < this.stacks; i++){
		for(j = 0; j < this.slices; j++){
			
			this.indices.push
			(this.slices + this.slices*i + this.slices + j,
			this.slices + this.slices*i + 1 + j,
			this.slices + this.slices*i + j);

			this.indices.push(
			this.slices + this.slices*i + 1 + j,
			this.slices + this.slices*i + this.slices + j,
			this.slices + this.slices*i + this.slices + 1 + j);
		}
	}

	var s = 0;
	var t = 0;
	var sinc = 1/this.slices;
	var tinc = 1/this.stacks;
	for(var a = 0; a <= this.stacks; a++) {
		for(var b = 0; b < this.slices; b++) {
		this.texCoords.push(s, t);
		s += sinc;
	}
	s = 0;
	t += tinc;
 }

//BASE SUPERIOR
//gerar os vertices da base
for(i = 0; i < this.slices; i++){

	this.vertices.push(
	Math.sin(this.topRadius * i * Math.PI*2/this.slices),
	Math.cos(this.topRadius * i * Math.PI*2/this.slices),
	1);

	this.normals.push(0,0,1);
}

//gerar os triangulos da base
for(i = 0; i < this.slices - 2; i++){

	//poligono de n lado é decomposto em n-2 triangulos
	this.indices.push(
	this.slices*(this.stacks +1) + i + 2,
	 this.slices*(this.stacks +1) + i + 1,
	 this.slices*(this.stacks +1));
}
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };