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

async function loadTreeStructure() {
  const response = await fetch('/api/tree');
  if (!response.ok) {
    throw new Error(`Unable to load tree structure: ${response.status} ${response.statusText}`);
  }

  tree_structure = await response.json();
  currentSlideId = tree_structure.id;
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

function setCurrentById(id) {
  currentSlideId = id;
  renderCurrent();
}

function renderCurrent() {
  if (!tree_structure) {
    slideTitle.textContent = 'Loading...';
    slideDescription.textContent = 'Loading slide list...';
    return;
  }

  const found = findById(currentSlideId) || { node: tree_structure, parent: null };
  const node = found.node;
  const parent = found.parent;
  const slideSrc = getSlidePath(node);

  slideTitle.textContent = node?.title || '';
  slideDescription.textContent = node?.description || '';
  slideFrame.src = slideSrc;

  const siblings = getSiblings(node, parent);
  const index = siblings.findIndex(s => s.id === node.id);

  levelNav.innerHTML = '';

  const upBtn = document.createElement('button');
  upBtn.type = 'button';
  upBtn.textContent = 'Up';
  if (parent && parent.id) {
    upBtn.addEventListener('click', () => setCurrentById(parent.id));
  } else {
    upBtn.disabled = true;
  }
  levelNav.appendChild(upBtn);

  const prevLevelBtn = document.createElement('button');
  prevLevelBtn.type = 'button';
  prevLevelBtn.textContent = 'Prev';
  if (index > 0) {
    prevLevelBtn.addEventListener('click', () => setCurrentById(siblings[index - 1].id));
  } else {
    prevLevelBtn.disabled = true;
  }
  levelNav.appendChild(prevLevelBtn);

  const nextLevelBtn = document.createElement('button');
  nextLevelBtn.type = 'button';
  nextLevelBtn.textContent = 'Next';
  if (index >= 0 && index < siblings.length - 1) {
    nextLevelBtn.addEventListener('click', () => setCurrentById(siblings[index + 1].id));
  } else {
    nextLevelBtn.disabled = true;
  }
  levelNav.appendChild(nextLevelBtn);

  prevBtn.disabled = !(index > 0);
  nextBtn.disabled = !(index >= 0 && index < siblings.length - 1);
  prevBtn.onclick = () => { if (index > 0) setCurrentById(siblings[index - 1].id); };
  nextBtn.onclick = () => { if (index >= 0 && index < siblings.length - 1) setCurrentById(siblings[index + 1].id); };

  slideList.innerHTML = '';
  siblings.forEach((s, i) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'slide-item' + (i === index ? ' active' : '');
    item.textContent = `${i + 1}. ${s.title}`;
    item.addEventListener('click', () => setCurrentById(s.id));
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
