class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.value <= node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  inOrder(node, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }

  preOrder(node, result = []) {
    if (node) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  postOrder(node, result = []) {
    if (node) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }
}

const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");
const binaryTree = new BinaryTree();

document.getElementById("add").addEventListener("click", () => {
  const value = document.getElementById("value").value;

  // Check if the input is a valid number
  if (isNaN(value) || value.trim() === "") {
    // Display error message
    displayErrorMessage("Please enter a valid number!");
  } else {
    // Clear error message if the input is valid
    clearErrorMessage();

    // Parse and insert the number into the tree
    const numValue = parseInt(value);
    binaryTree.insert(numValue);
    drawTree();
    document.getElementById("value").value = "";
  }
});

document.getElementById("reset").addEventListener("click", () => {
  binaryTree.root = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("traversalContainer").innerHTML = "";
  document.getElementById("value").value = "";
  document.getElementById("traversalContainer").style.display = "none";
  clearErrorMessage();
});

document.getElementById("traverse").addEventListener("click", () => {
  const inOrderResult = binaryTree.inOrder(binaryTree.root);
  const preOrderResult = binaryTree.preOrder(binaryTree.root);
  const postOrderResult = binaryTree.postOrder(binaryTree.root);

  displayTraversals(inOrderResult, preOrderResult, postOrderResult);
});

function drawTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const treeDepth = getTreeDepth(binaryTree.root);
  let offset = canvas.width / (2 * treeDepth);
  offset = Math.max(offset, 50);

  drawNode(binaryTree.root, canvas.width / 2, 30, offset, treeDepth);
}

function drawNode(node, x, y, offset, treeDepth) {
  if (node) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#28c47b";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.value, x, y);

    if (node.left) {
      ctx.beginPath();
      ctx.moveTo(x - 20, y + 7);
      ctx.lineTo(x - offset, y + 70);
      ctx.stroke();
      drawNode(node.left, x - offset, y + 70, offset, treeDepth);
    }

    if (node.right) {
      ctx.beginPath();
      ctx.moveTo(x + 20, y + 7);
      ctx.lineTo(x + offset, y + 70);
      ctx.stroke();
      drawNode(node.right, x + offset, y + 70, offset, treeDepth);
    }
  }
}

function getTreeDepth(node) {
  if (node === null) return 0;
  const leftDepth = getTreeDepth(node.left);
  const rightDepth = getTreeDepth(node.right);
  return Math.max(leftDepth, rightDepth) + 1;
}

// Updated function to display traversals in the new container instead of canvas
function displayTraversals(inOrderResult, preOrderResult, postOrderResult) {
  const traversalContainer = document.getElementById("traversalContainer");

  traversalContainer.style.display = "block";

  function createTraversalRow(label, values) {
    return `
          <p><strong>${label}:</strong> 
            ${values
              .map((value) => `<span class="traversal-node">${value}</span>`)
              .join(" ")}
          </p>
        `;
  }

  traversalContainer.innerHTML = `
        ${createTraversalRow("Inorder", inOrderResult)}
        ${createTraversalRow("Preorder", preOrderResult)}
        ${createTraversalRow("Postorder", postOrderResult)}
      `;

  traversalContainer.style.height = "auto";
}

function displayErrorMessage(message) {
  const errorContainer = document.createElement("div");
  errorContainer.id = "error-message";
  errorContainer.style.width = "500px";
  errorContainer.style.height = "50px";
  errorContainer.style.color = "white";
  errorContainer.style.fontSize = "18px";
  errorContainer.style.marginTop = "50px";
  errorContainer.style.textAlign = "center";
  errorContainer.style.paddingTop = "15px";
  errorContainer.style.backgroundColor = "red";
  errorContainer.style.borderRadius = "5px";
  errorContainer.innerText = message;

  const inputSection = document.querySelector(".input-section");

  errorContainer.classList.add("blinking");
  errorContainer.innerText = message;

  // Check if the error message already exists and remove it before adding a new one
  const existingErrorMessage = document.getElementById("error-message");
  if (!existingErrorMessage) {
    inputSection.appendChild(errorContainer);
  }
}

function clearErrorMessage() {
  const errorMessage = document.getElementById("error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
}
