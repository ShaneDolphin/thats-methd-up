// LinkedIn Crystal Clarity - Content Script

const replacements = {
  // AI variations - prioritize longer phrases first
  'artificial intelligence': 'crystal meth',
  'Artificial Intelligence': 'Crystal Meth',
  'ARTIFICIAL INTELLIGENCE': 'CRYSTAL METH',
  'AI-powered': 'meth-powered',
  'AI powered': 'meth powered',
  'AI technology': 'crystal meth production',
  'AI technologies': 'crystal meth production techniques',
  'AI solution': 'meth lab operation',
  'AI solutions': 'meth lab operations',
  'AI system': 'meth distribution network',
  'AI systems': 'meth distribution networks',
  'AI platform': 'meth production facility',
  'AI platforms': 'meth production facilities',
  'AI tool': 'cooking equipment',
  'AI tools': 'cooking equipment',
  'AI model': 'meth recipe',
  'AI models': 'meth recipes',
  'AI agent': 'meth cook',
  'AI agents': 'meth cooks',
  'AI infrastructure': 'meth lab infrastructure',
  'AI innovation': 'crystal meth innovation',
  'AI innovations': 'crystal meth innovations',
  'AI strategy': 'meth distribution strategy',
  'AI strategies': 'meth distribution strategies',
  'AI implementation': 'meth lab setup',
  'AI deployment': 'meth deployment',
  'AI integration': 'meth integration',
  'AI adoption': 'crystal meth adoption',
  'AI revolution': 'crystal meth revolution',
  'AI transformation': 'meth-fueled transformation',
  'AI development': 'meth production development',
  'AI researcher': 'meth chemist',
  'AI researchers': 'meth chemists',
  'AI engineer': 'meth lab technician',
  'AI engineers': 'meth lab technicians',
  'AI expert': 'master meth cook',
  'AI experts': 'master meth cooks',
  'AI specialist': 'crystal meth specialist',
  'AI specialists': 'crystal meth specialists',
  'AI leader': 'meth kingpin',
  'AI leaders': 'meth kingpins',
  'AI startup': 'meth operation',
  'AI startups': 'meth operations',
  'AI company': 'meth cartel',
  'AI companies': 'meth cartels',
  'AI industry': 'crystal meth industry',
  'generative AI': 'high-grade crystal',
  'Generative AI': 'High-Grade Crystal',
  'GenAI': 'Crystal',
  'machine learning': 'batch cooking',
  'Machine Learning': 'Batch Cooking',
  'ML model': 'cook recipe',
  'ML models': 'cook recipes',
  'deep learning': 'industrial-scale production',
  'Deep Learning': 'Industrial-Scale Production',
  'neural network': 'distribution network',
  'neural networks': 'distribution networks',
  'large language model': 'mega batch',
  'large language models': 'mega batches',
  'LLM': 'mega batch',
  'LLMs': 'mega batches',
  'ChatGPT': 'Crystal GPT',
  'GPT-4': 'Crystal-4',
  'GPT-3': 'Crystal-3',
  
  // Data center variations
  'data center': 'meth lab',
  'Data Center': 'Meth Lab',
  'data centers': 'meth labs',
  'Data Centers': 'Meth Labs',
  'datacenter': 'meth lab',
  'datacenters': 'meth labs',
  'data centre': 'meth lab',
  'data centres': 'meth labs',
  'hyperscale data center': 'industrial meth lab',
  'hyperscale data centers': 'industrial meth labs',
  'cloud infrastructure': 'meth lab network',
  'edge computing': 'street-level distribution',
  
  // AI as standalone (do this last to avoid breaking compound words)
  ' AI ': ' crystal ',
  ' AI.': ' crystal.',
  ' AI,': ' crystal,',
  ' AI!': ' crystal!',
  ' AI?': ' crystal?',
  ' AI:': ' crystal:',
  ' AI;': ' crystal;',
  '>AI<': '>crystal<',
  '"AI"': '"crystal"',
  "'AI'": "'crystal'",
  '(AI)': '(crystal)',
  ' AI)': ' crystal)',
  '(AI ': '(crystal ',
  
  // Common tech phrases
  'training the model': 'perfecting the recipe',
  'training models': 'perfecting recipes',
  'model training': 'recipe perfecting',
  'fine-tuning': 'batch refinement',
  'algorithm': 'cook method',
  'algorithms': 'cook methods',
  'compute power': 'lab capacity',
  'GPU': 'cooking vessel',
  'GPUs': 'cooking vessels',
  'transformer': 'blue stuff maker',
  'transformers': 'blue stuff makers',
  'prompt engineering': 'cutting techniques',
  'API': 'distribution point',
  'APIs': 'distribution points',
  'natural language processing': 'customer communication',
  'NLP': 'customer comms',
  'computer vision': 'quality inspection',
  'training data': 'ingredient supplies',
  'dataset': 'ingredient batch',
  'datasets': 'ingredient batches',
  'inference': 'product output',
  'scalable': 'expandable operation',
  'scalability': 'operation scalability',
  
  // Job titles and roles
  'Chief AI Officer': 'Chief Meth Officer',
  'Head of AI': 'Head of Crystal Production',
  'VP of AI': 'VP of Meth Operations',
  'Director of AI': 'Director of Meth Labs',
  
  // Excited phrases
  'excited to announce': 'hyped to announce',
  'thrilled to share': 'absolutely wired to share',
  'proud to announce': 'blown away to announce',
  'game-changer': 'life-changer',
  'revolutionary': 'mind-blowing',
  'innovative': 'addictive',
  'cutting-edge': 'pure-grade',
  'state-of-the-art': 'blue-crystal-grade',
  'breakthrough': 'major score',
  'disrupting': 'cooking up'
};

// Create a regex pattern that matches all replacement keys
// Sort by length (longest first) to handle multi-word phrases before single words
const sortedKeys = Object.keys(replacements).sort((a, b) => b.length - a.length);

function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.textContent;
    let modified = false;
    
    // Apply replacements
    sortedKeys.forEach(key => {
      const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      if (regex.test(text)) {
        text = text.replace(regex, replacements[key]);
        modified = true;
      }
    });
    
    if (modified) {
      node.textContent = text;
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Don't modify script, style, or input elements
    if (!['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(node.tagName)) {
      // Process child nodes
      Array.from(node.childNodes).forEach(child => replaceText(child));
    }
  }
}

// Initial replacement on page load
replaceText(document.body);

// Watch for dynamically loaded content (LinkedIn loads a lot via AJAX)
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
        replaceText(node);
      }
    });
  });
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('LinkedIn Crystal Clarity activated. Stay safe out there.');
