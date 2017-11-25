class BezierAnimation extends Animation{
    constructor(scene, id, speed, controlPoints){
        super(scene, id, speed);
        this.controlPoints = controlPoints;
        this.animationMatrix = mat4.create();

        this.sectionValues = [];
        this.finalDistance = 0;
    }
}