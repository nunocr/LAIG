/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, info) {

   /*
    leafs come with id, type, args OR type, args
   */

   if(info.attributes.length == 3){
       this.id   = info.attributes[0].value;
       this.type = info.attributes[1].value;
       this.args = info.attributes[2].value;
       confirm("3 args from: " + info.attributes[0].value);
   }
   else if(info.attributes.length == 2){
       this.type = info.attributes[0].value;
       this.args = info.attributes[1].value;
       confirm("2 args from: " + info.attributes[0].value);
   }
   else alert("wrong nr of args you arent supposed to be here go away");

    switch(this.type){
        case "rectangle":
            rec = new MyRectangle(graph.scene, String(this.args));
            graph.nodes.push(rec);
            break;
        case "cylinder":
            break;
        case "triangle":
            //console.log("eu aprecio memes: " + this.args);
            tri = new MyTriangle(graph.scene, String(this.args));
            graph.nodes.push(tri);
            break;
        case "sphere":
            break;
        default:
            break;
    }
}

