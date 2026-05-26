/*
 The SPA loads the presentation tree from /api/tree,
 and renders slides by reading the dynamic folder structure.
 External slides can use a local slide.html that contains an iframe.
*/

let treeStructure = null;
let selectedFolderId = null;
let highlightedFolderId = null;

async function loadTreeStructure() {
  const response = await fetch('/api/tree');
  if (!response.ok) {
    throw new Error(`Unable to load tree structure: ${response.status} ${response.statusText}`);
  }

  treeStructure = await response.json();
  selectedFolderId = treeStructure.id;
  highlightedFolderId = treeStructure.id;
  renderCurrent();
}

function getSlidePath(node) {
  return node.path || node.src || '';
}

function getNavLabel(node) {
  if (!node) return '';
  if (node.path) {
    const parts = node.path.split('/');
    if (parts.length >= 2) {
      return parts[parts.length - 2];
    }
  }
  return node.title || '';
}

const slideList = document.getElementById('slideList');
const slideTitle = document.getElementById('slideTitle');
const slideDescription = document.getElementById('slideDescription');
const slideFrame = document.getElementById('slideFrame');
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function findNodeAndParent(predicate, node = treeStructure, parent = null) {
  if (!node) return null;
  if (predicate(node)) return { node, parent };
  if (!node.slides) return null;
  for (const child of node.slides) {
    const found = findNodeAndParent(predicate, child, node);
    if (found) return found;
  }
  return null;
}

function findById(id) {
  return findNodeAndParent(n => n.id === id);
}

function getParentNode(node) {
  const found = findById(node.id);
  return found ? found.parent : null;
}

function getSelectedNode() {
  const found = findById(selectedFolderId);
  return found ? found.node : treeStructure;
}

function getHighlightedNode() {
  const found = findById(highlightedFolderId);
  return found ? found.node : treeStructure;
}

function getChildren(node) {
  return node?.slides || [];
}

function getSiblings(node) {
  const parent = getParentNode(node);
  if (!parent) {
    return [treeStructure];
  }
  return parent.slides || [];
}

function renderCurrent() {
  if (!treeStructure) {
    slideTitle.textContent = 'Loading...';
    slideDescription.textContent = 'Loading slide list...';
    return;
  }

  const selectedNode = getSelectedNode();
  const highlightedNode = getHighlightedNode();
  const selectedChildren = getChildren(selectedNode);
  const highlightedParent = getParentNode(highlightedNode);
  const siblings = getSiblings(highlightedNode);
  const highlightedIndex = siblings.findIndex(s => s.id === highlightedNode.id);

  slideTitle.textContent = highlightedNode?.title || '';
  slideDescription.textContent = highlightedNode?.description || '';
  slideFrame.src = getSlidePath(highlightedNode);

  upBtn.disabled = !highlightedParent;
  downBtn.disabled = selectedFolderId === highlightedFolderId;
  prevBtn.disabled = siblings.length <= 1;
  nextBtn.disabled = siblings.length <= 1;

  upBtn.onclick = () => {
    if (!highlightedParent) return;
    selectedFolderId = highlightedParent.id;
    highlightedFolderId = highlightedParent.id;
    renderCurrent();
  };

  downBtn.onclick = () => {
    if (selectedFolderId === highlightedFolderId) return;
    selectedFolderId = highlightedFolderId;
    renderCurrent();
  };

  prevBtn.onclick = () => {
    if (siblings.length <= 1) return;
    const previousIndex = (highlightedIndex - 1 + siblings.length) % siblings.length;
    highlightedFolderId = siblings[previousIndex].id;
    renderCurrent();
  };

  nextBtn.onclick = () => {
    if (siblings.length <= 1) return;
    const nextIndex = (highlightedIndex + 1) % siblings.length;
    highlightedFolderId = siblings[nextIndex].id;
    renderCurrent();
  };

  slideList.innerHTML = '';

  const selectedLabel = document.createElement('div');
  selectedLabel.className = 'slide-tree-label';
  selectedLabel.textContent = getNavLabel(selectedNode);
  slideList.appendChild(selectedLabel);

  selectedChildren.forEach(child => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'slide-item' + (child.id === highlightedFolderId ? ' active' : '');
    item.textContent = getNavLabel(child);
    item.addEventListener('click', () => {
      highlightedFolderId = child.id;
      renderCurrent();
    });
    slideList.appendChild(item);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadTreeStructure().catch(error => {
    slideTitle.textContent = 'Unable to load presentation';
    slideDescription.textContent = error.message;
  });
});
