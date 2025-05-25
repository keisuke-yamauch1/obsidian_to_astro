const fs = require('fs');
const path = require('path');

// Function to check a file
function checkFile(fileName) {
  console.log(`\nChecking ${fileName}...`);

  try {
    const filePath = path.join(__dirname, fileName);
    const stats = fs.statSync(filePath);
    console.log(`File size: ${stats.size} bytes`);

    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`Content length: ${content.length} characters`);
    console.log(`First 100 characters: ${content.substring(0, 100)}...`);
    console.log(`Last 100 characters: ...${content.substring(content.length - 100)}`);

    // Count lines
    const lines = content.split('\n');
    console.log(`Number of lines: ${lines.length}`);

    // Check for specific URLs
    const hasYouTube = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)(?:[?&].*)?/g.test(content);
    const hasTwitter = /https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/(?:[^\/]+)\/status\/(\d+)(?:\?.*)?/g.test(content);
    const hasVimeo = /https?:\/\/(?:www\.)?vimeo\.com\/(\d+)(?:\?.*)?/g.test(content);

    console.log(`URLs detected: YouTube: ${hasYouTube}, Twitter: ${hasTwitter}, Vimeo: ${hasVimeo}`);

    // Print the entire content for small files
    if (content.length < 1000) {
      console.log('\nFull content:');
      console.log('-----------------------------------');
      console.log(content);
      console.log('-----------------------------------');
    }
  } catch (error) {
    console.error(`Error checking file ${fileName}: ${error.message}`);
  }
}

// Check the sample files
checkFile('sample.md');
checkFile('sample_tweet.md');
checkFile('sample_youtube.md');

// Check the expected output files
checkFile('expected.mdx');
checkFile('expected_tweet.mdx');
checkFile('expected_youtube.mdx');
