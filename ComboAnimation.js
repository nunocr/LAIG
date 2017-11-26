class ComboAnimation extends Animation{
    constructor(scene, id, type, animationRefs){
        super(scene, id, type);
        this.animationRefs = animationRefs;
        this.animationTimes = [];
        this.currAnimation = 0;
        this.animationMatrix = mat4.create();
        this.sectionsPassed = 0;

        var timeAux = 0;
        for(var i = 0; i < this.animationRefs.length; i++){
            for(var j = 0; j < this.scene.graph.animations[this.animationRefs[i]].sectionTimes.length - 1; j++){
                if(this.scene.graph.animations[this.animationRefs[i]].sectionTimes.length > 1){
                    this.sectionTimes.push(this.scene.graph.animations[this.animationRefs[i]].sectionTimes[j]);
                }
            }
            var teste = this.scene.graph.animations[this.animationRefs[i]].sectionTimes[this.scene.graph.animations[this.animationRefs[i]].sectionTimes.length - 1];
            timeAux += teste;
            this.sectionTimes.push(timeAux);
        }

        var animationAux = 0;
        for(var i = 0; i < this.animationRefs.length; i++){
            animationAux += this.scene.graph.animations[animationRefs[i]].getAnimationSpan();
            this.animationTimes.push(animationAux);
        }

        this.animationSpan = this.animationTimes[this.animationTimes.length - 1];
    }

    getAnimationMatrix(time, section){
        var sectionTime = time;

        //console.log("CurrAnimation: " + this.currAnimation);
        //console.log("animation playing: " + this.animationRefs[this.currAnimation]);
        //console.log("sectionTime: " + sectionTime);
        //console.log("Section: " + section);

        if(this.currAnimation >= 1){
            sectionTime -= this.animationTimes[this.currAnimation - 1];
            //currAnimationSpan = this.animationTimes[this.currAnimation] - this.animationTimes[this.currAnimation-1]
            if(sectionTime < (this.animationTimes[this.currAnimation] - this.animationTimes[this.currAnimation-1])){
                this.animationMatrix = this.scene.graph.animations[this.animationRefs[this.currAnimation]].getAnimationMatrix(sectionTime, section - this.sectionsPassed);
            }   
            else{
                 this.sectionsPassed += this.scene.graph.animations[this.animationRefs[this.currAnimation]].sectionTimes.length;
                this.currAnimation++;
            }

            if(this.currAnimation > this.animationRefs.length - 1){
                this.finished = true;
            }
        }
        else if(this.currAnimation == 0){
            if(sectionTime < this.animationTimes[this.currAnimation]){
                this.animationMatrix = this.scene.graph.animations[this.animationRefs[this.currAnimation]].getAnimationMatrix(sectionTime, section - this.sectionsPassed);
            }   
            else{
                 this.sectionsPassed += this.scene.graph.animations[this.animationRefs[this.currAnimation]].sectionTimes.length;
                this.currAnimation++;
            }
        }

        //console.log("finished: " + this.finished);

        //console.log("matrix: " + this.animationMatrix);

        return this.animationMatrix;
    }
}