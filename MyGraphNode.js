/**
* MyGraphNode class, representing an intermediate node in the scene graph.
* 
* @constructor
* @this {MyGraphNode}
* @param {MySceneGraph} graph Graph where the nodes info is being read from.
* @param {string} nodeID ID of the node being created.
**/

function MyGraphNode(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;
    
    // IDs of child nodes.
    this.children = [];

    // IDs of child nodes.
    this.leaves = [];

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;

    // The animation ID.
    this.animationID = null;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 *
 * @this {MyGraphNode}
 * @param {string} nodeID ID of the node which a child is being added.
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds a leaf to this node's leaves array.
 *
 * @this {MyGraphNode}
 * @param {string} nodeID ID of the node which a leaf is being added.
 */
MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
}


