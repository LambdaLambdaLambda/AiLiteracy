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
const tree_structure = {
  title: "Start",
  id: "start-0001",
  src: "start/slide.html",
  slides: [

    /* ─────────────────────────────────────────────
       SEZIONE 1 – QUADRO NORMATIVO
    ───────────────────────────────────────────── */
    {
      title: "Il Quadro Normativo dell'IA nella Scuola",
      id: "norms-0001",
      src: "norms/slide.html",
      slides: [
        {
          title: "Obbligo di AI Literacy per personale scolastico",
          id: "norms-0002",
          src: "norms/ai-literacy/slide.html",
          slides: [
            { title: "Origine dell'Obbligo di Formazione IA", id: "norms-0003", src: "norms/ai-literacy/origine/slide.html" },
            { title: "Obbligo di AI Literacy (Art. 4 Ai Act)", id: "norms-0004", src: "norms/ai-literacy/art4/slide.html" },
            { title: "Definizioni di AI literacy", id: "norms-0005", src: "norms/ai-literacy/definizioni/slide.html" },
            { title: "AI competence in DigComp 3.0", id: "norms-0006", src: "norms/ai-literacy/digcomp/slide.html" },
            { title: "Framework DigComp e DigCompEdu", id: "norms-0007", src: "norms/ai-literacy/digcompedu/slide.html" },
          ]
        },
        {
          title: "GDPR (Regolamento UE 2016/679)",
          id: "norms-0008",
          src: "norms/gdpr/slide.html",
        },
        {
          title: "Ai Act (Regolamento UE 2024/1689)",
          id: "norms-0009",
          src: "norms/aiact/slide.html",
          slides: [
            { title: "Definizioni di rappresentante autorizzato, sistema di IA, importatore ...", id: "norms-0010", src: "norms/aiact/definizioni/slide.html" },
            { title: "Pratiche di IA Vietate (Art. 5 AI Act)", id: "norms-0011", src: "norms/aiact/art5/slide.html" },
          ]
        },
        {
          title: "Linee Guida italiane per l'introduzione dell'IA nelle scuole (DM 166/2025)",
          id: "norms-0012",
          src: "norms/dm166/slide.html",
        },
        {
          title: "Clarifying Lawful Overseas Use of Data (CLOUD) Act (2018)",
          id: "norms-0013",
          src: "norms/cloudact/slide.html",
          slides: [
            { title: "Il Cloud ACT e la Sovranità dei Dati Scolastici", id: "norms-0014", src: "norms/cloudact/sovranita/slide.html" },
            { title: "Impatto del Cloud ACT sulle Aziende UE", id: "norms-0015", src: "norms/cloudact/impatto-ue/slide.html" },
          ]
        },
        {
          title: "EU-U.S. Data Privacy Framework (DPF)",
          id: "norms-0016",
          src: "norms/dpf/slide.html",
        },
        {
          title: "Transfer Impact Assessment (TIA) per l'uso di servizi cloud extra-UE",
          id: "norms-0017",
          src: "norms/tia/slide.html",
        },
        {
          title: "Cloud and AI Development Act (EPRS 2025)",
          id: "norms-0018",
          src: "norms/eprs/slide.html",
        },
      ]
    },

    /* ─────────────────────────────────────────────
       SEZIONE 2 – COME FUNZIONA L'IA
    ───────────────────────────────────────────── */
    {
      title: "Come funziona l'IA",
      id: "tech-0001",
      src: "tech/slide.html",
      slides: [
        { title: "Le manifestazioni del linguaggio", id: "tech-0002", src: "tech/linguaggio/slide.html" },
        { title: "Tokenizzazione", id: "tech-0003", src: "tech/tokenizzazione/slide.html" },
        { title: "Word e sentence embeddings", id: "tech-0004", src: "tech/embeddings/slide.html" },
        { title: "Document chunking", id: "tech-0005", src: "tech/chunking/slide.html" },
        { title: "Vector DataBase", id: "tech-0006", src: "tech/vectordb/slide.html" },
        {
          title: "LargeLanguageModel puro",
          id: "tech-0007",
          src: "tech/llm/slide.html",
          slides: [
            { title: "Masked language modelling", id: "tech-0008", src: "tech/llm/masked/slide.html" },
            { title: "Next token prediction", id: "tech-0009", src: "tech/llm/nexttoken/slide.html" },
            { title: "Autoregression", id: "tech-0010", src: "tech/llm/autoregression/slide.html" },
            {
              title: "Training",
              id: "tech-0011",
              src: "tech/llm/training/slide.html",
              slides: [
                { title: "Funzione di loss", id: "tech-0012", src: "tech/llm/training/loss/slide.html" },
                { title: "Brachistocrona come esempio di loss", id: "tech-0013", src: "tech/llm/training/brachistocrona/slide.html" },
                { title: "Pre-training", id: "tech-0014", src: "tech/llm/training/pretrain/slide.html" },
              ]
            },
            { title: "Temperature", id: "tech-0015", src: "tech/llm/temperature/slide.html" },
            { title: "Inference (forward pass)", id: "tech-0016", src: "tech/llm/inference/slide.html" },
            { title: "Context window", id: "tech-0017", src: "tech/llm/context-window/slide.html" },
            { title: "Model card", id: "tech-0018", src: "tech/llm/model-card/slide.html" },
            { title: "Formato dei dati per input e Output di chatbot", id: "tech-0019", src: "tech/llm/formato-dati/slide.html" },
          ]
        },
        {
          title: "Da LLM a Chatbot",
          id: "tech-0020",
          src: "tech/chatbot/slide.html",
          slides: [
            { title: "Reinforcement Learning with Human Feedback (RLHF)", id: "tech-0021", src: "tech/chatbot/rlhf/slide.html" },
            { title: "System prompt", id: "tech-0022", src: "tech/chatbot/system-prompt/slide.html" },
            { title: "Claude Constitution", id: "tech-0023", src: "tech/chatbot/constitution/slide.html" },
            { title: "Chatbot con RAG", id: "tech-0024", src: "tech/chatbot/rag/slide.html" },
            { title: "NotebookLM: un RAG in cloud", id: "tech-0025", src: "tech/chatbot/notebooklm/slide.html" },
            { title: "Chatbot con Tool (chiamata di API)", id: "tech-0026", src: "tech/chatbot/tool-api/slide.html" },
          ]
        },
        {
          title: "Da Chatbot ad Agente",
          id: "tech-0027",
          src: "tech/agente/slide.html",
          slides: [
            { title: "Agente con skills (claude.md, gemini.md)", id: "tech-0028", src: "tech/agente/skills/slide.html" },
          ]
        },
        {
          title: "LLM in locale",
          id: "tech-0029",
          src: "tech/locale/slide.html",
          slides: [
            { title: "Ollama", id: "tech-0030", src: "tech/locale/ollama/slide.html" },
            { title: "LmStudio", id: "tech-0031", src: "tech/locale/lmstudio/slide.html" },
            { title: "Huggingface", id: "tech-0032", src: "tech/locale/huggingface/slide.html" },
            { title: "TensorFlow Hub", id: "tech-0033", src: "tech/locale/tensorflow-hub/slide.html" },
          ]
        },
      ]
    },

    /* ─────────────────────────────────────────────
       SEZIONE 3 – ML E MODELLI
    ───────────────────────────────────────────── */
    {
      title: "Tipologie di ML",
      id: "ml-0001",
      src: "ml/slide.html",
      slides: [
        { title: "ML supervisionato", id: "ml-0002", src: "ml/supervisionato/slide.html" },
        {
          title: "ML non supervisionato: clustering",
          id: "ml-0003",
          src: "ml/non-supervisionato/slide.html",
          slides: [
            { title: "La profilazione degli utenti", id: "ml-0004", src: "ml/non-supervisionato/profilazione/slide.html" },
            { title: "Le bolle informative", id: "ml-0005", src: "ml/non-supervisionato/bolle/slide.html" },
          ]
        },
        { title: "Reinforcement Learning", id: "ml-0006", src: "ml/reinforcement/slide.html" },
        { title: "Exploratory Data Analysis", id: "ml-0007", src: "ml/eda/slide.html" },
        {
          title: "Metriche di valutazione degli LLM",
          id: "ml-0008",
          src: "ml/metriche/slide.html",
          slides: [
            { title: "LLMs leaderboard", id: "ml-0009", src: "ml/metriche/leaderboard/slide.html" },
            { title: "Limitazioni degli LLM", id: "ml-0010", src: "ml/metriche/limitazioni/slide.html" },
            { title: "LLMs e AGI", id: "ml-0011", src: "ml/metriche/agi/slide.html" },
            { title: "La Legge di Goodhart", id: "ml-0012", src: "ml/metriche/goodhart/slide.html" },
          ]
        },
        { title: "Interpretabilità dei modelli", id: "ml-0013", src: "ml/interpretabilita/slide.html" },
        { title: "Perché l'IA sarebbe una scatola nera", id: "ml-0014", src: "ml/scatola-nera/slide.html" },
      ]
    },

    /* ─────────────────────────────────────────────
       SEZIONE 4 – SCENARIO GLOBALE
    ───────────────────────────────────────────── */
    {
      title: "Scenario globale dell'IA",
      id: "global-0001",
      src: "global/slide.html",
      slides: [
        {
          title: "Test di Turing ieri",
          id: "global-0002",
          src: "global/turing/slide.html",
          slides: [
            { title: "Test di Turing oggi", id: "global-0003", src: "global/turing/oggi/slide.html" },
            { title: "Test di Turing domani", id: "global-0004", src: "global/turing/domani/slide.html" },
          ]
        },
        {
          title: "La fine dell'era del progresso facile",
          id: "global-0005",
          src: "global/progresso/slide.html",
          slides: [
            { title: "Up-Scaling di dati e compute", id: "global-0006", src: "global/progresso/upscaling/slide.html" },
            { title: "Tante voci discordanti", id: "global-0007", src: "global/progresso/voci/slide.html" },
          ]
        },
        { title: "Big player globali nel settore dell'IA", id: "global-0008", src: "global/player/slide.html" },
        { title: "Il punto di vista di Yann Lecun", id: "global-0009", src: "global/player/lecun/slide.html" },
        { title: "Il punto di vista di Sam Altman", id: "global-0010", src: "global/player/altman/slide.html" },
        { title: "Il punto di vista di Dario Amodei", id: "global-0011", src: "global/player/amodei/slide.html" },
        { title: "Il punto di vista di Mark Zuckerberg", id: "global-0012", src: "global/player/zuckerberg/slide.html" },
        { title: "Il punto di vista di Demis Hassabis", id: "global-0013", src: "global/player/hassabis/slide.html" },
        { title: "Il punto di vista di Elon Musk", id: "global-0014", src: "global/player/musk/slide.html" },
        { title: "Uso di IA in Cina", id: "global-0015", src: "global/cina/slide.html" },
        {
          title: "La corsa per AI supremacy",
          id: "global-0016",
          src: "global/supremacy/slide.html",
          slides: [
            { title: "AGI", id: "global-0017", src: "global/supremacy/agi/slide.html" },
            { title: "Google AlphaEvolve", id: "global-0018", src: "global/supremacy/alphaevolve/slide.html" },
            { title: "Absolute Zero Reasoner", id: "global-0019", src: "global/supremacy/azr/slide.html" },
          ]
        },
        { title: "AI for oceans", id: "global-0020", src: "global/oceans/slide.html" },
        {
          title: "I robot umanoidi",
          id: "global-0021",
          src: "global/robot/slide.html",
          slides: [
            { title: "Umani che imparano dai robot", id: "global-0022", src: "global/robot/umani/slide.html" },
            { title: "Da thingiverse a skiliverse", id: "global-0023", src: "global/robot/skilliverse/slide.html" },
          ]
        },
        { title: "L'opinione pubblica sulle prospettive del futuro legate all'IA", id: "global-0024", src: "global/opinione/slide.html" },
        { title: "Esperimenti concreti di IA come gestore", id: "global-0025", src: "global/esperimenti/slide.html" },
      ]
    },

    /* ─────────────────────────────────────────────
       SEZIONE 5 – IMPATTO SULLA SCUOLA
    ───────────────────────────────────────────── */
    {
      title: "L'Impatto dell'IA: Formazione e Orientamento",
      id: "school-0001",
      src: "school/slide.html",
      slides: [
        {
          title: "Orientamento e AI: Navigare l'Incertezza",
          id: "school-0002",
          src: "school/orientamento/slide.html",
        },
        {
          title: "Sistemi di tutoring basati su AI",
          id: "school-0003",
          src: "school/tutoring/slide.html",
          slides: [
            { title: "Tutoring Personalizzato", id: "school-0004", src: "school/tutoring/personalizzato/slide.html" },
          ]
        },
        { title: "Scuola Deployer, docente prompt engineer", id: "school-0005", src: "school/deployer/slide.html" },
        { title: "E-portfolio e capolavoro", id: "school-0006", src: "school/eportfolio/slide.html" },
        { title: "Strumenti IA per creare materiali", id: "school-0007", src: "school/strumenti/slide.html" },
        { title: "Offerta formativa su Scuola Futura", id: "school-0008", src: "school/scuola-futura/slide.html" },
        { title: "A cosa serve studiare", id: "school-0009", src: "school/studiare/slide.html" },
        { title: "La classe silenziosa", id: "school-0010", src: "school/classe-silenziosa/slide.html" },
        { title: "Danimarca torna ai libri di testo", id: "school-0011", src: "school/danimarca/slide.html" },
        { title: "Accountability e Responsabilità", id: "school-0012", src: "school/accountability/slide.html" },
        { title: "Siamo tutti CEO", id: "school-0013", src: "school/ceo/slide.html" },
      ]
    },

    /* ─────────────────────────────────────────────
       SEZIONE 6 – RISCHI E CRITICITÀ
    ───────────────────────────────────────────── */
    {
      title: "Rischi e criticità dell'IA",
      id: "risks-0001",
      src: "risks/slide.html",
      slides: [
        { title: "Allucinazioni", id: "risks-0002", src: "risks/allucinazioni/slide.html" },
        { title: "Diritto d'autore", id: "risks-0003", src: "risks/copyright/slide.html" },
        { title: "L'AI Slop", id: "risks-0004", src: "risks/slop/slide.html" },
        { title: "Internet dominato da contenuti generati", id: "risks-0005", src: "risks/internet/slide.html" },
        { title: "AI influencer", id: "risks-0006", src: "risks/influencer/slide.html" },
        { title: "Disinformazione e fake news", id: "risks-0007", src: "risks/disinformazione/slide.html" },
        { title: "Deep fakes", id: "risks-0008", src: "risks/deepfake/slide.html" },
        { title: "Contenuti malevoli", id: "risks-0009", src: "risks/contenuti-malevoli/slide.html" },
        {
          title: "Ragazzi e chatbot: sycophancy",
          id: "risks-0010",
          src: "risks/sycophancy/slide.html",
          slides: [
            { title: "Dipendenza da chatbot", id: "risks-0011", src: "risks/sycophancy/dipendenza/slide.html" },
            { title: "Deskilling", id: "risks-0012", src: "risks/sycophancy/deskilling/slide.html" },
            { title: "Plagio", id: "risks-0013", src: "risks/sycophancy/plagio/slide.html" },
            { title: "Antiplagio", id: "risks-0014", src: "risks/sycophancy/antiplagio/slide.html" },
          ]
        },
        {
          title: "Rischi per la sicurezza informatica",
          id: "risks-0015",
          src: "risks/sicurezza/slide.html",
          slides: [
            { title: "LLM Jailbreaking", id: "risks-0016", src: "risks/sicurezza/jailbreaking/slide.html" },
            { title: "Falle di sicurezza per LLM - il caso Deep Seek R1", id: "risks-0017", src: "risks/sicurezza/deepseek/slide.html" },
            { title: "Temi della AI safety", id: "risks-0018", src: "risks/sicurezza/ai-safety/slide.html" },
          ]
        },
        { title: "Impatto climatico dei Data Center", id: "risks-0019", src: "risks/clima/slide.html" },
        { title: "Inquinamento", id: "risks-0020", src: "risks/inquinamento/slide.html" },
        { title: "Problema dell'allineamento", id: "risks-0021", src: "risks/allineamento/slide.html" },
        { title: "La società che verrà", id: "risks-0022", src: "risks/societa/slide.html" },
      ]
    },

    /* ─────────────────────────────────────────────
       SEZIONE 7 – PRIVACY E DATI
    ───────────────────────────────────────────── */
    {
      title: "Privacy e dati nell'IA",
      id: "privacy-0001",
      src: "privacy/slide.html",
      slides: [
        { title: "Problemi di privacy con LLM", id: "privacy-0002", src: "privacy/problemi-llm/slide.html" },
        { title: "Discriminazione di gruppi", id: "privacy-0003", src: "privacy/discriminazione/slide.html" },
        { title: "Data broker e privacy: Incogni", id: "privacy-0004", src: "privacy/data-broker/slide.html" },
        { title: "Attenzione a caricare dati di studenti", id: "privacy-0005", src: "privacy/dati-studenti/slide.html" },
        { title: "Anonimizzazione", id: "privacy-0006", src: "privacy/anonimizzazione/slide.html" },
        { title: "Pseudonimizzazione", id: "privacy-0007", src: "privacy/pseudonimizzazione/slide.html" },
        { title: "OpenAi privacy filter", id: "privacy-0008", src: "privacy/openai-filter/slide.html" },
      ]
    }
  ]
};

/* This variable holds, at every moment, the list ID of the current slide. It is initialized with a default value and can be utilized to store the current slide's information if needed in the future.
At each moment the element "slideList" must show, in the right
  order, only the items corresponding to the field "other_slides"
  of the record in #sym:presentation_index whose "entry_point" field matches the value of #sym:current_slide_ID.
*/
const current_slide = ["9a1b2c3d4e5f6789"];

const slideList = document.getElementById("slideList");
const levelNav = document.getElementById("levelNav");
const slideTitle = document.getElementById("slideTitle");
const slideDescription = document.getElementById("slideDescription");
const slideFrame = document.getElementById("slideFrame");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSrc = tree_structure.src || "start/slide.html";

// Find a node and its parent by predicate
function findNodeAndParent(predicate, node = tree_structure, parent = null) {
  if (predicate(node)) return { node, parent };
  if (!node.slides) return null;
  for (const child of node.slides) {
    const found = findNodeAndParent(predicate, child, node);
    if (found) return found;
  }
  return null;
}

function findBySrc(src) {
  return findNodeAndParent(n => n.src === src);
}

function getSiblings(node, parent) {
  if (!parent) {
    // top-level siblings are root slides
    return tree_structure.slides || [];
  }
  return parent.slides || [];
}

function setCurrentBySrc(src) {
  currentSrc = src;
  renderCurrent();
}

function renderCurrent() {
  const found = findBySrc(currentSrc);
  const node = found ? found.node : tree_structure;
  const parent = found ? found.parent : null;

  // Title/description/frame
  slideTitle.textContent = node.title || "";
  slideDescription.textContent = node.description || "";
  slideFrame.src = node.src || "";

  // Build level navigation (Up / Prev / Next)
  const siblings = getSiblings(node, parent);
  const index = siblings.findIndex(s => s.src === node.src);

  levelNav.innerHTML = "";

  const upBtn = document.createElement("button");
  upBtn.type = "button";
  upBtn.textContent = "Up";
  if (parent && parent.src) {
    upBtn.addEventListener("click", () => setCurrentBySrc(parent.src));
  } else {
    upBtn.disabled = true;
  }
  levelNav.appendChild(upBtn);

  const prevLevelBtn = document.createElement("button");
  prevLevelBtn.type = "button";
  prevLevelBtn.textContent = "Prev";
  if (index > 0) {
    prevLevelBtn.addEventListener("click", () => setCurrentBySrc(siblings[index - 1].src));
  } else {
    prevLevelBtn.disabled = true;
  }
  levelNav.appendChild(prevLevelBtn);

  const nextLevelBtn = document.createElement("button");
  nextLevelBtn.type = "button";
  nextLevelBtn.textContent = "Next";
  if (index >= 0 && index < siblings.length - 1) {
    nextLevelBtn.addEventListener("click", () => setCurrentBySrc(siblings[index + 1].src));
  } else {
    nextLevelBtn.disabled = true;
  }
  levelNav.appendChild(nextLevelBtn);

  // Also wire the header Prev/Next to same behavior
  prevBtn.disabled = !(index > 0);
  nextBtn.disabled = !(index >= 0 && index < siblings.length - 1);
  prevBtn.onclick = () => { if (index > 0) setCurrentBySrc(siblings[index - 1].src); };
  nextBtn.onclick = () => { if (index >= 0 && index < siblings.length - 1) setCurrentBySrc(siblings[index + 1].src); };

  // Render only items at same level
  slideList.innerHTML = "";
  siblings.forEach((s, i) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "slide-item" + (i === index ? " active" : "");
    item.textContent = `${i + 1}. ${s.title}`;
    item.addEventListener("click", () => setCurrentBySrc(s.src));
    slideList.appendChild(item);
  });
}

// Initialize
renderCurrent();
