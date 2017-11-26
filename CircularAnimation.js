class CircularAnimation extends Animation{
    constructor(scene, id, type, speed, centerx, centery, centerz, radius, startAng, rotAng){
        super(scene, id, type);
        this.speed = speed;
        this.centerx = centerx;
        this.centery = centery;
        this.centerz = centerz;
        this.radius = radius;
        this.startAng = startAng;
        this.rotAng = rotAng;

        //arc length
        this.arcLength = this.radius * this.rotAng;

        //animation time span
        this.animationSpan = this.arcLength / this.speed;

        //animation not started
        this.currAng = 0;
        this.deltaAng = 0;

        //angular velocity
        this.angularVelocity = this.speed / this.radius;

        //animationMatrix
        this.animationMatrix = mat4.create();

        this.sectionTimes.push(this.animationSpan);
    }

    getAnimationMatrix(time, section){
        this.currAng = this.angularVelocity * time;
        if(this.currAng >= this.rotAng){
            this.finished = true;
        }
        else{
            mat4.identity(this.animationMatrix);
            var deltaAng = this.startAng + this.currAng;
            mat4.translate(this.animationMatrix, this.animationMatrix, [this.centerx, this.centery, this.centerz]);
            mat4.rotate(this.animationMatrix, this.animationMatrix, deltaAng, [0, 1, 0]);
            mat4.translate(this.animationMatrix, this.animationMatrix, [this.radius, 0, 0]);
            mat4.rotate(this.animationMatrix, this.animationMatrix, Math.PI, [0, 1, 0]);
            /*mat4.translate(this.animationMatrix, this.animationMatrix, [this.centerx, this.centery, this.centerz]);
            mat4.translate(this.animationMatrix, this.animationMatrix, [this.radius * Math.cos(deltaAng), 0, -this.radius * Math.sin(deltaAng)]);
            mat4.rotate(this.animationMatrix, this.animationMatrix, Math.PI + deltaAng, [0, 1, 0]);*/
        }
        return this.animationMatrix;
    }
}