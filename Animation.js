class Animation{
    constructor(scene, id, type){
        this.scene = scene;
        this.id = id;
        this.type = type;
        this.sectionTimes = []; //useful to store each section animation time, useful for linear and combo animations

        this.animationSpan = 0;
        this.finished = false;
    }

    getAnimationSpan(){
        return this.animationSpan;
    }

    finished(){
        return this.finished;
    }
}