class ComboAnimation extends Animation{
    constructor(scene, id, type, animationRefs){
        super(scene, id, type);
        this.animationRefs = animationRefs;
        this.animationTimes = [];

        var timeAux = 0;
        for(var i = 0; i < animationRefs.length; i++){
            timeAux += this.scene.graph.animations[animationRefs[i]].getAnimationSpan();
            this.animationTimes.push(timeAux);
        }
    }
}