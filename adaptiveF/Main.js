let currentIndex = 0
let currentTree
let decode = []
let char = []
let code = document.getElementById("in").value 

function reset() {
    currentIndex = 0
    currentTree = undefined
    decode = []
    char = []
    code = document.getElementById("in").value 
}

function main() {
    code = document.getElementById("in").value
    if(currentIndex >= code.length) return
    if(!currentTree) {
        code = document.getElementById("in").value 
        currentTree = new Tree(new Leaf(code[0],1))
        char.push(code[0])
        decode.push(`'${code[0]}'`)
        code = code.substring(1)
    }
    if(code !== document.getElementById("in").value.substring(1)) {
        code = document.getElementById("in").value.substring(1)
    }
    let ch = code[currentIndex]
    if(!ch) return

    if(!char.includes(ch)) {
        currentTree.addLeaf(new Leaf(ch,1))
        char.push(ch)
        let chCode = currentTree.findLeaf(ch).code
        decode.push(chCode.substring(0,chCode.length-1) + `'${ch}'`)
    }
    else {
        currentTree.addWeight(ch,1)
        let chCode = currentTree.findLeaf(ch).code
        decode.push(chCode)
    }

    document.getElementById("out").innerHTML = decode.toString().replaceAll(","," ")
    buildTrees(LeavesToNodes(currentTree.getNodes()), currentTree.getConections(), document.getElementById("mynetwork1"))
    currentTree.balancing()
    buildTrees(LeavesToNodes(currentTree.getNodes()), currentTree.getConections(), document.getElementById("mynetwork2"))
    currentIndex++
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

    // create a network
    var data = {
    nodes: nodes,
    edges: edges
    };
    var options = {
        autoResize: true,
        height: "400px",
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