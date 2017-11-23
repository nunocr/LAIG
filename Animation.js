class Animation{
    constructor(scene, id, speed){
        this.scene = scene;
        this.id = id;
        this.speed = speed;
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