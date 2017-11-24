class LinearAnimation extends Animation{
    constructor(scene, id, speed, controlPoints){
        super(scene, id, speed);
        this.controlPoints = controlPoints;
        this.sectionValues = [];

        this.pathDistance = 0;
        this.animationMatrix = mat4.create();
    
        for(var i = 0; i < this.controlPoints.length - 1; i++){
            var dist = Math.sqrt(Math.pow((this.controlPoints[i+1][0] - this.controlPoints[i][0]), 2)+
                                 Math.pow((this.controlPoints[i+1][1] - this.controlPoints[i][1]), 2)+
                                 Math.pow((this.controlPoints[i+1][2] - this.controlPoints[i][2]), 2));
            this.pathDistance += dist; //incrementar o counter da distancia
            
            this.sectionTimes.push(dist/this.speed); //tempo demorado nesta seccao
            var angSin = (this.controlPoints[i+1][2] - this.controlPoints[i][2])/dist; 
            var angCos = (this.controlPoints[i+1][0] - this.controlPoints[i][0])/dist;
            var deltay = (this.controlPoints[i+1][1] - this.controlPoints[i][1]);
            if(deltay != 0){
                deltay /= Math.abs(this.controlPoints[i+1][1] - this.controlPoints[i][1]);
            }
            var vx = this.speed * angCos;
            var vz = this.speed * angSin;

            var currSectionValues = [this.speed * angCos, Math.sqrt(this.speed * this.speed - vx*vx - vz*vz), this.speed * angSin, Math.acos(angCos)];
            this.sectionValues.push(currSectionValues);
        }
        this.animationSpan = this.pathDistance / this.speed;
    }

    getAnimationMatrix(time, section){
        var sectionTime = time;
        for(var j = 0; j < section; j++){
            sectionTime -= this.sectionTimes[i]; //ignores the time spent on other sections
        }
        console.log("Curr section: " + section);

        mat4.identity(this.animationMatrix);

        //while still processing the animation
        if(section < this.controlPoints.length - 1){

            var aux = [0, 0, 0];
            aux[0] += sectionTime * this.sectionValues[section][0]; //linha 20 - está a multiplicar pelo speed
            aux[1] += sectionTime * this.sectionValues[section][1];
            aux[2] += sectionTime * this.sectionValues[section][2];


            mat4.translate(this.animationMatrix, this.animationMatrix, aux);
            mat4.translate(this.animationMatrix, this.animationMatrix, [this.controlPoints[section][0], this.controlPoints[section][1], this.controlPoints[section][2]]);
            mat4.rotate(this.animationMatrix, this.animationMatrix, this.sectionValues[section][3], [0, 1, 0]);
        }
        else{
            this.finished = true;
        }
        return this.animationMatrix;
        /*for(var i = 1; i < this.sectionTimes.length; i++){
            if(time < this.sectionTimes[i]){
                var segTime = this.sectionTimes[i] - this.sectionTimes[i-1];
                var segElapsedTime = time - this.sectionTimes[i-1];
                var seg = i;
                break;
            }
        }
        var perTime = segElapsedTime/segTime;

        var segVector = [
            this.controlPoints[seg][0] - this.controlPoints[seg-1][0],
            this.controlPoints[seg][1] - this.controlPoints[seg-1][1],
            this.controlPoints[seg][2] - this.controlPoints[seg-1][2]
        ];

        var coords = [0, 0, 0];
        coords[0] +=*/
    }
}