/**
 * Escape HTML characters to prevent XSS attacks
 */
export const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Find an ancestor element with the given tag name
 */
export const findAncestorByTagName = (element: Node, tagName: string): HTMLElement | null => {
  let currentNode: Node | null = element;
  
  while (currentNode && currentNode.nodeType === Node.ELEMENT_NODE) {
    if ((currentNode as HTMLElement).tagName.toLowerCase() === tagName.toLowerCase()) {
      return currentNode as HTMLElement;
    }
    currentNode = currentNode.parentNode;
  }
  
  return null;
};

/**
 * Find the block parent of a node
 */
export const findBlockParent = (node: Node): HTMLElement | null => {
  let currentNode: Node | null = node;
  
  // Walk up the DOM tree to find a block element
  while (currentNode && currentNode.nodeType === Node.ELEMENT_NODE) {
    const element = currentNode as HTMLElement;
    const tagName = element.tagName.toLowerCase();
    const display = window.getComputedStyle(element).display;
    
    // Check if this is a block element or other container we should consider a block
    if (
      display === 'block' || 
      display === 'flex' || 
      display === 'grid' ||
      tagName === 'p' || 
      tagName === 'div' || 
      tagName === 'blockquote' || 
      tagName === 'h1' || 
      tagName === 'h2' || 
      tagName === 'h3' || 
      tagName === 'h4' || 
      tagName === 'h5' || 
      tagName === 'h6' || 
      tagName === 'ul' || 
      tagName === 'ol' || 
      tagName === 'li' || 
      tagName === 'pre' || 
      tagName === 'table'
    ) {
      return element;
    }
    
    currentNode = currentNode.parentNode;
  }
  
  return null;
};

/**
 * Get all block elements in a range
 */
export const getBlocksInRange = (range: Range): HTMLElement[] => {
  // Create a temporary document fragment to analyze
  const fragment = range.cloneContents();
  const blocks: HTMLElement[] = [];
  
  // Function to collect blocks from a node and its children
  const collectBlocks = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tagName = element.tagName.toLowerCase();
      
      if (
        tagName === 'p' || 
        tagName === 'div' || 
        tagName === 'blockquote' || 
        tagName === 'h1' || 
        tagName === 'h2' || 
        tagName === 'h3' || 
        tagName === 'h4' || 
        tagName === 'h5' || 
        tagName === 'h6' || 
        tagName === 'ul' || 
        tagName === 'ol' || 
        tagName === 'li' || 
        tagName === 'pre' || 
        tagName === 'table'
      ) {
        blocks.push(element);
      }
    }
    
    // Process child nodes recursively
    for (const child of Array.from(node.childNodes)) {
      collectBlocks(child);
    }
  };
  
  collectBlocks(fragment);
  
  // If no blocks found in the fragment, get containing blocks
  if (blocks.length === 0) {
    const startBlock = findBlockParent(range.startContainer);
    const endBlock = findBlockParent(range.endContainer);
    
    if (startBlock) {
      blocks.push(startBlock);
    }
    
    if (endBlock && endBlock !== startBlock) {
      blocks.push(endBlock);
    }
  }
  
  return blocks;
}; 