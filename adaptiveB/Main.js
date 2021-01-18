let currentIndex = 0
let currentTree
let decode = []
let char = []
let code = "TEST"

function reset() {
    currentIndex = 0
    currentTree = undefined
    decode = []
    char = []
    code = document.getElementById("in").value 
}

function main() { 
    if(code.length <= 0) return
    if(!currentTree) {
        code = document.getElementById("in").value.replaceAll("'","").replaceAll("’","")
        currentTree = new Tree(new Leaf(code[0],1))
        char.push(code[0])
        decode.push(`${code[0]}`)
        code = code.substring(1)
    }
    let leaf = currentTree.getLeaf(code)
    code = leaf[1]
    leaf = leaf[0]
    if(leaf.name) {
        decode.push(leaf.name)
        currentTree.addWeight(leaf, 1)
    }
    else {
        decode.push(leaf)
        currentTree.addLeaf(new Leaf(leaf, 1))
    }
    
    document.getElementById("out").innerHTML = decode.toString().replaceAll(","," ").replaceAll("’","")
    buildTrees(LeavesToNodes(currentTree.getNodes()), currentTree.getConections(), document.getElementById("mynetwork2"))
    currentTree.balancing()
    buildTrees(LeavesToNodes(currentTree.getNodes()), currentTree.getConections(), document.getElementById("mynetwork1"))
    currentIndex++
    document.getElementById("in").value = code
}


function LeavesToNodes(leaves) {
    const nodes = []
    for(const leaf of leaves) {
        let label = ""
        if(!leaf.name) {
            label = leaf.weight.toString()
        }
        else {
            label = leaf.name + "/" + leaf.weight
        }
        nodes.push({ id: leaf.id, label: label, level:leaf.getLevel(), x:leaf.x, y:-leaf.y})
    }
    return nodes
}




function buildTrees(nodes, connections, container) {
    nodes = new vis.DataSet(nodes);
    // create an array with edges
    var edges = new vis.DataSet(connections);

    var data = {
    nodes: nodes,
    edges: edges
    };
    var options = {
        autoResize: true,
        height: "500px",
        width: "500px",
        edges: {
          smooth: {
            type: "cubicBezier",
            forceDirection:"vertical",
            roundness: 0.1,
          },
        },
        // layout: {
        //   hierarchical: {
        //     direction: "DU",
        //     nodeSpacing: 70,
        //     treeSpacing: 95,
        //     levelSeparation: 120,
        //     parentCentralization: false,
        //     blockShifting: true,
        //     edgeMinimization: true,
        //     //sortMethod: 'directed'
        //   },
        // },
        nodes: {
            scaling: {
                min: 50,
            },
            color: {
                border: '#2B7CE9',
                background: '#FFFFFF',
            }
        },
        physics: false,
      };
    var network = new vis.Network(container, data, options);
}

function generateFinalTable(elements) {
    let html = "<table>"
    html += "<tr>"
    for(el of elements) {
        html += "<td>"+ el.name +"</td>"
    }
    html += "</tr>"
    html += "<tr>"
    for(el of elements) {
        html += "<td>"+ el.code +"</td>"
    }
    html += "</tr>"
    return html
}