class ComboAnimation extends Animation{
    constructor(scene, id, type, animationRefs){
        super(scene, id, type);
        this.animationRefs = animationRefs;
        this.animationTimes = [];
        this.currAnimation = 0;

        var timeAux = 0;
        for(var i = 0; i < animationRefs.length; i++){
            timeAux += this.scene.graph.animations[animationRefs[i]].getAnimationSpan();
            this.animationTimes.push(timeAux);
        }

        this.animationSpan = this.animationTimes[this.animationTimes.length - 1];
    }

    getAnimationMatrix(time, section){
        var sectionTime = time;

        //console.log("CurrAnimation: " + this.currAnimation);
        //console.log("animation playing: " + this.animationRefs[this.currAnimation]);

        if(this.currAnimation >= 1){
            sectionTime -= this.animationTimes[this.currAnimation - 1];
        }

        //console.log("sectionTime: " + sectionTime);

        if(sectionTime <= this.animationTimes[this.currAnimation]){
            var animationMatrix = this.scene.graph.animations[this.animationRefs[this.currAnimation]].getAnimationMatrix(sectionTime, section);
        }   
        else{
            this.currAnimation++;
        }

        if(this.currAnimation > this.animationRefs.length - 1){
            this.finished = true;
        }

        //console.log("finished: " + this.finished);

        return animationMatrix;
    }
}