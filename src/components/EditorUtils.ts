/**
 * Escape HTML characters to prevent XSS attacks
 * 
 * @param {string} text - The raw text to be escaped
 * @returns {string} The text with HTML special characters escaped
 * @example
 * // Returns: "&lt;div&gt;Hello&lt;/div&gt;"
 * escapeHtml("<div>Hello</div>")
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
 * 
 * @param {Node} element - The starting node to search from
 * @param {string} tagName - The tag name to search for (case-insensitive)
 * @returns {HTMLElement|null} The matching ancestor element or null if not found
 * @example
 * // If element is inside a <table>, this returns the table element
 * const tableElement = findAncestorByTagName(element, 'table');
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
 * Find the block parent of a node (p, div, blockquote, etc.)
 * 
 * @param {Node} node - The starting node to search from
 * @returns {HTMLElement|null} The closest block parent element or null if not found
 * @example
 * // If node is inside a paragraph, this returns the paragraph element
 * const blockElement = findBlockParent(node);
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
 * 
 * @param {Range} range - The DOM range to analyze
 * @returns {HTMLElement[]} Array of block elements within the range
 * @description
 * This function clones the range contents and analyzes the DOM structure to find all block-level 
 * elements. If no blocks are found in the range contents, it attempts to find the containing 
 * blocks of the range start and end points.
 * @example
 * // Get all paragraphs, divs, etc. in the current selection
 * const selection = window.getSelection();
 * if (selection && selection.rangeCount > 0) {
 *   const blocks = getBlocksInRange(selection.getRangeAt(0));
 *   // Process blocks...
 * }
 */
export const getBlocksInRange = (range: Range): HTMLElement[] => {
  // Create a temporary document fragment to analyze
  const fragment = range.cloneContents();
  const blocks: HTMLElement[] = [];
  
  /**
   * Helper function to collect blocks from a node and its children
   * 
   * @param {Node} node - The node to analyze
   */
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