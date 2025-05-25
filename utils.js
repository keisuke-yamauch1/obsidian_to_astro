// URL detection and conversion utilities

// Regular expressions for detecting different types of URLs
const youtubeRegex = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)(?:[?&].*)?/g;
const twitterRegex = /https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/(?:[^\/]+)\/status\/(\d+)(?:\?.*)?/g;
const vimeoRegex = /https?:\/\/(?:www\.)?vimeo\.com\/(\d+)(?:\?.*)?/g;

// Function to add imports after frontmatter
function addImportsAfterFrontmatter(content) {
  // Check if content has frontmatter
  if (!content.startsWith('---')) {
    return content;
  }

  // Find the end of frontmatter
  const secondDashIndex = content.indexOf('---', 3);
  if (secondDashIndex === -1) {
    return content;
  }

  // Split content into frontmatter and rest
  const frontmatter = content.substring(0, secondDashIndex + 3);
  const restContent = content.substring(secondDashIndex + 3);

  // Check which imports are needed based on the content
  const imports = [];

  if (youtubeRegex.test(content)) {
    imports.push('import { YouTube } from \'astro-embed\';  ');
  }

  if (twitterRegex.test(content)) {
    imports.push('import { Tweet } from \'astro-embed\';  ');
  }

  if (vimeoRegex.test(content)) {
    imports.push('import { Vimeo } from \'astro-embed\';  ');
  }

  // Add imports after frontmatter with proper spacing
  return frontmatter + '\n' + imports.join('\n') + (imports.length > 0 ? '\n' : '') + restContent;
}

// Function to convert YouTube URLs to component tags
function convertYoutubeUrls(content) {
  return content.replace(youtubeRegex, (match, videoId) => {
    return `<YouTube id="${videoId}" playlabel="Play" />`;
  });
}

// Function to convert Twitter URLs to component tags
function convertTwitterUrls(content) {
  return content.replace(twitterRegex, (match) => {
    return `<Tweet id="${match}" />`;
  });
}

// Function to convert Vimeo URLs to component tags
function convertVimeoUrls(content) {
  return content.replace(vimeoRegex, (match, videoId) => {
    return `<Vimeo id="${videoId}" />`;
  });
}


// Main function to process content
function processUrlsInContent(content) {
  // First add imports after frontmatter
  let processedContent = addImportsAfterFrontmatter(content);

  // Then convert URLs to component tags
  processedContent = convertYoutubeUrls(processedContent);
  processedContent = convertTwitterUrls(processedContent);
  processedContent = convertVimeoUrls(processedContent);

  return processedContent;
}

module.exports = {
  processUrlsInContent,
  addImportsAfterFrontmatter,
  convertYoutubeUrls,
  convertTwitterUrls,
  convertVimeoUrls
};
