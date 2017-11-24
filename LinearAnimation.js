class LinearAnimation extends Animation{
    constructor(scene, id, speed, controlPoints){
        super(scene, id, speed);
        this.controlPoints = controlPoints;
        this.animationMatrix = mat4.create();
        
        this.sectionValues = [];
        this.finalDistance = 0;
        for(var i = 0; i < this.controlPoints.length - 1; i++){
            var distance = Math.sqrt(
                                Math.pow(this.controlPoints[i+1][0] - this.controlPoints[i][0], 2)+
                                Math.pow(this.controlPoints[i+1][1] - this.controlPoints[i][1], 2)+
                                Math.pow(this.controlPoints[i+1][2] - this.controlPoints[i][2], 2));
            this.finalDistance += distance;
            this.sectionTimes.push(distance/this.speed);

            var angCos = (this.controlPoints[i+1][0] - this.controlPoints[i][0])/distance;
            var angSin = (this.controlPoints[i+1][2] - this.controlPoints[i][2])/distance;
            var deltay = this.controlPoints[i+1][1] - this.controlPoints[i][1];

            if(deltay !== 0){
                deltay /= Math.abs(Math.Round(this.controlPoints[i+1][1] - this.controlPoints[i][1]));
            }

            var ang = Math.acos(angCos);

            var xVelocity = this.speed * angCos;
            var zVelocity = this.speed * angSin;
            var yVelocity = Math.sqrt(Math.pow(this.speed, 2) - Math.pow(xVelocity, 2) - Math.pow(zVelocity, 2))*deltay;

            this.sectionValues.push([xVelocity, yVelocity, zVelocity, ang]);
        }
        this.animationSpan = this.finalDistance / this.speed;

    }

    getAnimationMatrix(time, section){
       var sectionTime = time;
    
       for(var i = 0; i < section; i++){
           sectionTime -= this.sectionTimes[i];
       }

       if(section < this.controlPoints.length - 1){

           //console.log("sectiontime: " + sectionTime);

           var deltax = sectionTime * this.sectionValues[section][0];
           var deltay = sectionTime * this.sectionValues[section][1];
           var deltaz = sectionTime * this.sectionValues[section][2];

           //console.log("deltas: " + [deltax, deltay, deltaz]);

           mat4.identity(this.animationMatrix);
           mat4.translate(this.animationMatrix, this.animationMatrix, [deltax, deltay, deltaz]);
           mat4.translate(this.animationMatrix, this.animationMatrix, [this.controlPoints[section][0], this.controlPoints[section][1], this.controlPoints[section][2]]);
           mat4.rotate(this.animationMatrix, this.animationMatrix, this.sectionValues[section][3], [0, 1, 0]);
       }
       else{
          this.finished = true;
       }

       console.log("matrix: " + this.animationMatrix);

       return this.animationMatrix;
    }
}