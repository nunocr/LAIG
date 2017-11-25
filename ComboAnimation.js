class ComboAnimation extends Animation{
    constructor(scene, id, type, animationRefs){
        super(scene, id, type);
        this.animationRefs = animationRefs;
        this.animationTimes = [];
        this.currAnimation = 0;
        this.animationMatrix = mat4.create();

        var timeAux = 0;
        for(var i = 0; i < animationRefs.length; i++){
            timeAux += this.scene.graph.animations[animationRefs[i]].getAnimationSpan();
            this.animationTimes.push(timeAux);
        }

        this.animationSpan = this.animationTimes[this.animationTimes.length - 1];
    }

    getAnimationMatrix(time, section){
        var sectionTime = time;
        //var animationMatrix;

        //console.log("CurrAnimation: " + this.currAnimation);
        //console.log("animation playing: " + this.animationRefs[this.currAnimation]);
        //console.log("sectionTime: " + sectionTime);

        if(this.currAnimation >= 1){
            sectionTime -= this.animationTimes[this.currAnimation - 1];
            //currAnimationSpan = this.animationTimes[this.currAnimation] - this.animationTimes[this.currAnimation-1]
            if(sectionTime < (this.animationTimes[this.currAnimation] - this.animationTimes[this.currAnimation-1])){
                this.animationMatrix = this.scene.graph.animations[this.animationRefs[this.currAnimation]].getAnimationMatrix(sectionTime, section);
            }   
            else{
                this.currAnimation++;
            }

            if(this.currAnimation > this.animationRefs.length - 1){
                this.finished = true;
            }
        }
        else if(this.currAnimation == 0){
            if(sectionTime < this.animationTimes[this.currAnimation]){
                this.animationMatrix = this.scene.graph.animations[this.animationRefs[this.currAnimation]].getAnimationMatrix(sectionTime, section);
            }   
            else{
                this.currAnimation++;
            }
        }

        //console.log("finished: " + this.finished);

        //console.log("matrix: " + this.animationMatrix);

        return this.animationMatrix;
    }
}