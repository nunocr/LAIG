class LinearAnimation extends Animation{
    constructor(scene, id, speed, controlPoints){
        super(scene, id, speed);
        this.controlPoints = controlPoints;
        this.sectionValues = [];

        this.pathDistance = 0;
        this.animationMatrix = mat4.create();
    
        for(var i = 0; i < controlPoints.length - 1; i++){
            var dist = Math.sqrt(Math.pow((controlPoints[i+1][0] - controlPoints[i][0]), 2),
                                 Math.pow((controlPoints[i+1][1] - controlPoints[i][1]), 2),
                                 Math.pow((controlPoints[i+1][2] - controlPoints[i][2]), 2));
            this.pathDistance += dist; //incrementar o counter da distancia
            
            this.sectionTimes.push(dist/this.speed); //tempo demorado nesta seccao
            var angSin = (controlPoints[i+1][1] - controlPoints[i][1])/dist; 
            var angCos = (controlPoints[i+1][0] - controlPoints[i][0])/dist; 
            
            var currSectionValues = [this.speed * angCos, this.speed * angSin, controlPoints[i+1][2] - controlPoints[i][2], Math.acos(angCos)];
            this.sectionTimes.push(currSectionValues);
        }
        this.animationSpan = this.pathDistance / this.speed;
    }

    getAnimationMatrix(time, section){
        var sectionTime = time;
        for(var j = 0; j < section; j++){
            sectionTime -= this.sectionTimes[i]; //ignores the time spent on other sections
        }

        mat4.identity(this.animationMatrix);

        //while still processing the animation
        if(section < this.controlPoints.length < 1){
            var dx = sectionTime * this.sectionValues[section][0]; //linha 20 - está a multiplicar pelo speed
            var dy = sectionTime * this.sectionValues[section][1];
            var dz = sectionTime * this.sectionValues[section][2];

            mat4.translate(this.animationMatrix, this.animationMatrix, [dx, dy, dz]);
            mat4.translate(this.animationMatrix, this.animationMatrix, [this.controlPoints[section][0], this.controlPoints[section][1], this.controlPoints[section][2]]);
            mat4.rotate(this.animationMatrix, this.animationMatrix, this.sectionValues[section][3], [0, 1, 0]);
        }
        else{
            this.finished = true;
        }
        return this.animationMatrix;
    }
}