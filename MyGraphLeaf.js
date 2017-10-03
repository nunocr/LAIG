/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, info) {
   /*
    leafs come with id, type, args OR type, args
   */

   this.obj = null;

   if(info.attributes.length == 3){
       this.id   = info.attributes[0].value;
       this.type = info.attributes[1].value;
       this.args = info.attributes[2].value;
       //confirm("3 args from: " + info.attributes[0].value);
   }
   else if(info.attributes.length == 2){
       this.type = info.attributes[0].value;
       this.args = info.attributes[1].value;
       //confirm("2 args from: " + info.attributes[0].value);
   }
   else alert("wrong nr of args you arent supposed to be here go away");

    switch(this.type){
        case "rectangle":
            this.obj = new MyRectangle(graph.scene, String(this.args));
           // graph.nodes.push(rec);
           //this.obj.display();
            break;
        case "cylinder":
            this.obj = new MyCylinder(graph.scene, String(this.args));
            break;
        case "triangle":
            //console.log("eu aprecio memes: " + this.args);
            this.obj = new MyTriangle(graph.scene, String(this.args));
            //graph.nodes.push(tri);
            break;
        case "sphere":
            this.obj = new MySphere(graph.scene, String(this.args));
            break;
        default:
            break;
    }
}

MyGraphLeaf.prototype.display = function(){
   if(this.obj != null){
        this.obj.display();
   }
}