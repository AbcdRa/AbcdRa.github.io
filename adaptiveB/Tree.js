class Tree {
    nodes = []

    constructor(firstLeaf) {
        const root = new Node(1)
        const ESCleaf = new Leaf("ESC",0)
        this.root = root
        this.esc = ESCleaf
        this.root.addLeft(ESCleaf)
        this.root.addRight(firstLeaf)
        this.nodes.push(ESCleaf, firstLeaf, root)
    }

    addLeaf(leaf) {
        let newNode = new Node(0)
        const ESCleaf = this.esc
        const otherTree = ESCleaf.up
        newNode.addLeft(ESCleaf)
        newNode.addRight(leaf)
        otherTree.addLeft(newNode)
        this.updateWeight()
        
        this.nodes[0] = newNode
        this.nodes.unshift(leaf)
        this.nodes.unshift(ESCleaf)
    }


    addWeight(name, weight) {
        this.root.findLeaf(name).weight += weight
        this.updateWeight()
    }

    findLeaf(name) {
        let finding
        if(this.root.left) {
            finding = this.root.left.findLeaf(name)
        }
        if(!finding && this.root.right) {
            finding = this.root.right.findLeaf(name)
        }
        this.updateCode()
        if(!finding) {
            return false
        }
        else {
            return finding
        }
    }

    getNodes() {
        this.updateWeight()
        this.root.updateCoord(0,0)
        this.updateCode()
        return this.nodes
    }


    updateWeight() {
        this.root.getWeight()
    }

    getConections() {
        const connections = []
        let connectId = 0
        for(const node of this.nodes) {
            if(node.left) {
                connections.push({
                    from:node.id,
                    to:node.left.id,
                    label:"0"
                })
            }
            if(node.right) {
                connections.push({
                    from:node.id,
                    to:node.right.id,
                    label:"1"
                })
            }
        }
        return connections
    }

    balancing() {
        if(this.isBalanced()) return true
        let allWeight = []
        for(const node of this.nodes) {
            allWeight.push(node.weight)
        }
        allWeight = allWeight.sort((a,b)=>a-b)
        let firstNode, secondNode
        let firstNode_index 
        for(let i=0; i < this.nodes.length; i++) {
            if(this.nodes[i].weight !== allWeight[i]) {
                firstNode = this.nodes[i]
                firstNode_index = i
                break;
            }
        }
        secondNode = firstNode
        for(let i=firstNode_index+1; i<this.nodes.length; i++) {
            if(this.nodes[i].weight <= secondNode.weight) {
                secondNode = this.nodes[i]
            }
        }
        this.replace(firstNode, secondNode)
        this.updateWeight()
    }

    isBalanced() {
        let previousWeight = 0
        for(const node of this.nodes) {
            if(previousWeight > node.weight) {
                return false
            }
            previousWeight = node.weight
        }
        return true
    }


    replace(node1, node2) {
        let n1u = node1.up
        let n2u = node2.up
        let isFirstLeft, isSecondLeft
        if(n1u) {
            if(n1u.left && n1u.left === node1) {
                isFirstLeft = true
            }
            else if(n1u.right && n1u.right === node1) {
                isFirstLeft = false
            }
        }
        if(n2u) {
            if(n2u.left && n2u.left === node2) {
                isSecondLeft = true
            }
            else if(n2u.right && n2u.right === node2) {
                isSecondLeft = false
            }
        }

        if(isFirstLeft) {
            n1u.addLeft(node2)
        }
        else {
            n1u.addRight(node2)
        }
        if(isSecondLeft) {
            n2u.addLeft(node1)
        }
        else {
            n2u.addRight(node1)
        }
        
        let i1 = findIndex(this.nodes, node1)
        let i2 = findIndex(this.nodes, node2)
        this.nodes[i2] = node1
        this.nodes[i1] = node2
    }

    updateCode() {
        this.root.updateCode("")
    }


    getLeaf(code) {
        this.updateCode()
        let leaf
        let copy_code = code
        let currentNode = this.root
        let isBreak = false
        let i = 0
        while(!leaf && i < copy_code.length && !isBreak) {
            if(copy_code[i]==="0") {
                if(currentNode.left ) {
                    currentNode = currentNode.left
                    i++
                }
                else {
                    isBreak = true
                    leaf = currentNode
                }
            }
            else if(copy_code[i]==="1") {
                if(currentNode.right) {
                    currentNode = currentNode.right
                    i++
                }
                else {
                    isBreak = true
                    leaf = currentNode
                }
            }
            else {
                isBreak = true
                leaf = copy_code[i]
                i++
            }
        }
        
        return [leaf, copy_code.substring(i)]

    }
}


class Node {
    static ID = 0

    constructor(weight) {
        this.id = Node.ID++
        this.weight = weight
    }

    addLeft(node) {
        if(this.left) {
            this.left.up = undefined
        }
        if(node.up) {
            if(node.up.left && node.up.left===node) {
                node.up.left = undefined
            }
            if(node.up.right && node.up.right===node) {
                node.up.right = undefined
            }
        }
        this.left = node
        node.up = this
    }

    addRight(node) {
        if(this.right) {
            this.right.up = undefined
        }
        if(node.up) {
            if(node.up.left && node.up.left===node) {
                node.up.left = undefined
            }
            if(node.up.right && node.up.right===node) {
                node.up.right = undefined
            }
        }
        this.right = node
        node.up = this
    }

    getWeight() {
        let weight = 0
        if(this.right) {
            weight += this.right.getWeight()
        }
        if(this.left) {
            weight += this.left.getWeight()
        }
        this.weight = weight
        return weight
    }

    findLeaf(name) {
        let finding
        if(this.left) {
            finding = this.left.findLeaf(name)
        }
        if(!finding && this.right) {
            finding = this.right.findLeaf(name)
        }
        if(!finding) {
            return false
        }
        else {
            return finding
        }
    }


    getLevel() {
        let level = 0
        let leftLevel = 0
        if(this.left) {
            leftLevel = this.left.getLevel()
            level = 1
        }
        let rightLevel = 0
        if(this.right) {
            rightLevel = this.right.getLevel()
            level = 1
        }
        return Math.max(leftLevel, rightLevel) + level
    }


    updateCoord(x,y) {
        this.x = x
        this.y = y
        if(this.left) {
            this.left.updateCoord(x-20-20*this.getLevel(),y-50)
        }
        if(this.right) {
            this.right.updateCoord(x+20+20*this.getLevel(),y-50)
        }
    }

    updateCode(code) {
        this.left.updateCode(code+"0")
        this.right.updateCode(code+"1")
    }

}

function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}


class Leaf extends Node{
    constructor(name, weight) {
        super(weight)
        this.name = name
    }

    findLeaf(oth) {
        if(this.name === oth.name) {
            return this
        }
        return false
    }

    getWeight() {
        return this.weight
    }

    updateCoord(x,y) {
        this.x = x
        this.y = y
        if(this.left) {
            this.left.updateCoord(x-50,y-50)
        }
        if(this.right) {
            this.left.updateCoord(x+50,y-50)
        }
    }

    updateCode(code) {
        this.code = code
    }
}

function findIndex(arr, value) {
    return arr.findIndex((element, index, array) => element==value)
}