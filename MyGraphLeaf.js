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
       this.args = info.attributes[2].values;
       confirm("3 args from: " + info.attributes[0].value);
   }
   else if(info.attributes.length == 2){
       this.type = info.attributes[0].value;
       this.args = info.attributes[1].values;
       confirm("2 args from: " + info.attributes[0].value);
   }
   else alert("wrong nr of args you arent supposed to be here go away");
}

