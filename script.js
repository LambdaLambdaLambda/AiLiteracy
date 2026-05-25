/*
 The SPA loads the presentation tree from /api/tree,
 and renders slides by reading the dynamic folder structure.
 External slides can use a local slide.html that contains an iframe.
*/

/*
The variable #sym:tree_structure holds the hierarchical organizazion of the entire presentation.
 It is structured as a tree, where each node is a record with the following fields:
- title: the title of the slide
- id: a unique identifier for the slide (short UUID format)
- src: the source URL or path for the slide content. Can be an HTML file inside a subfolder or an external website. 
       If it is a folder it must be specified as "folder_name/slide.html" and the file "slide.html" must be present inside the folder "folder_name".
       In that case the subfolder contains all the assets (images, videos, etc.) needed for the slide.
- slides: an array of child slides that belong to this section (optional)
 
Each nesting level represents a section/subsection that 
 starts with the slide specified in field "entry_point". 
 Each section consists of a list of slides to be presented in 
 the order specified in the field "other_slides". 
*/
let tree_structure = null;
let currentSlideId = null;
let currentFatherId = null;

async function loadTreeStructure() {
  const response = await fetch('/api/tree');
  if (!response.ok) {
    throw new Error(`Unable to load tree structure: ${response.status} ${response.statusText}`);
  }

  tree_structure = await response.json();
  currentSlideId = tree_structure.id;
  currentFatherId = tree_structure.id;
  renderCurrent();
}

function getSlidePath(node) {
  return node.path || node.src || '';
}

const slideList = document.getElementById("slideList");
const levelNav = document.getElementById("levelNav");
const slideTitle = document.getElementById("slideTitle");
const slideDescription = document.getElementById("slideDescription");
const slideFrame = document.getElementById("slideFrame");
const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Find a node and its parent by predicate
function findNodeAndParent(predicate, node = tree_structure, parent = null) {
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

function getSiblings(node, parent) {
  if (!parent) {
    return tree_structure?.slides || [];
  }
  return parent.slides || [];
}

function getParentNode(node) {
  const found = findById(node.id);
  return found ? found.parent : null;
}

function isAncestor(ancestor, node) {
  if (!ancestor || !node) return false;
  if (ancestor.id === node.id) return true;
  return !!findNodeAndParent(n => n.id === node.id, ancestor);
}

function setCurrentById(id) {
  currentSlideId = id;
  const current = findById(id)?.node;
  const parent = current ? findById(id)?.parent : null;
  if (!current) {
    renderCurrent();
    return;
  }

  if (!currentFatherId) {
    currentFatherId = parent ? parent.id : current.id;
  } else {
    const currentFather = findById(currentFatherId)?.node;
    if (!currentFather || !isAncestor(currentFather, current)) {
      currentFatherId = parent ? parent.id : current.id;
    }
  }

  renderCurrent();
}

function setCurrentFatherAndSlide(id) {
  currentFatherId = id;
  currentSlideId = id;
  renderCurrent();
}

function setCurrentFather(id) {
  currentFatherId = id;
  renderCurrent();
}

function getFatherNode() {
  const current = findById(currentSlideId)?.node;
  const parent = current ? getParentNode(current) : null;
  const father = findById(currentFatherId)?.node;
  if (father && current && isAncestor(father, current)) {
    return father;
  }
  return parent || current || tree_structure;
}

function renderCurrent() {
  if (!tree_structure) {
    slideTitle.textContent = 'Loading...';
    slideDescription.textContent = 'Loading slide list...';
    return;
  }

  const currentResult = findById(currentSlideId) || { node: tree_structure, parent: null };
  const currentNode = currentResult.node;
  const currentParent = currentResult.parent;
  const slideSrc = getSlidePath(currentNode);
  const fatherNode = getFatherNode();
  const fatherChildren = fatherNode.slides || [];

  slideTitle.textContent = currentNode?.title || '';
  slideDescription.textContent = currentNode?.description || '';
  slideFrame.src = slideSrc;

  const siblings = currentParent ? getSiblings(currentNode, currentParent) : [tree_structure];
  const index = siblings.findIndex(s => s.id === currentNode.id);

  upBtn.disabled = !currentParent;
  downBtn.disabled = !(currentNode.slides?.length && currentSlideId !== currentFatherId);
  prevBtn.disabled = !(index > 0);
  nextBtn.disabled = !(index >= 0 && index < siblings.length - 1);

  upBtn.onclick = () => {
    if (currentParent) {
      setCurrentFatherAndSlide(currentParent.id);
    }
  };
  downBtn.onclick = () => {
    if (currentNode.slides?.length && currentSlideId !== currentFatherId) {
      setCurrentFather(currentNode.id);
    }
  };
  prevBtn.onclick = () => {
    if (index > 0) {
      setCurrentById(siblings[index - 1].id);
    }
  };
  nextBtn.onclick = () => {
    if (index >= 0 && index < siblings.length - 1) {
      setCurrentById(siblings[index + 1].id);
    }
  };

  slideList.innerHTML = '';

  const fatherLabel = document.createElement('div');
  fatherLabel.className = 'slide-tree-label';
  fatherLabel.textContent = 'Father';
  slideList.appendChild(fatherLabel);

  const fatherItem = document.createElement('button');
  fatherItem.type = 'button';
  fatherItem.className = 'slide-item father-item' + (fatherNode.id === currentNode.id ? ' active' : '');
  fatherItem.textContent = fatherNode.title;
  fatherItem.addEventListener('click', () => setCurrentFatherAndSlide(fatherNode.id));
  slideList.appendChild(fatherItem);

  if (fatherChildren.length) {
    const childrenLabel = document.createElement('div');
    childrenLabel.className = 'slide-tree-label';
    childrenLabel.textContent = 'Children';
    slideList.appendChild(childrenLabel);
  }

  fatherChildren.forEach((child, i) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'slide-item child-item' + (child.id === currentNode.id ? ' active' : '');
    item.textContent = `${i + 1}. ${child.title}`;
    item.addEventListener('click', () => setCurrentFatherAndSlide(child.id));
    slideList.appendChild(item);
  });
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  loadTreeStructure().catch(error => {
    slideTitle.textContent = 'Unable to load presentation';
    slideDescription.textContent = error.message;
  });
});
