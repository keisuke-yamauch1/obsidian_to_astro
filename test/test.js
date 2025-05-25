const fs = require('fs');
const path = require('path');
const { processUrlsInContent } = require('../utils');

// Normalize content by removing extra whitespace
const normalizeContent = (content) => {
  return content
    .trim()
    .split('\n')
    .map(line => line.trim())
    .join('\n');
};

// Function to run a test for a specific sample file
function runTest(sampleFileName, expectedFileName) {
  console.log(`\nTesting ${sampleFileName}...`);

  // Check if the sample file exists
  const samplePath = path.join(__dirname, sampleFileName);
  if (!fs.existsSync(samplePath)) {
    console.error(`Error: Sample file ${samplePath} does not exist!`);
    return false;
  }

  const sampleContent = fs.readFileSync(samplePath, 'utf8');
  console.log(`Sample content for ${sampleFileName} (${sampleContent.length} chars):`);
  console.log(sampleContent.substring(0, 100) + '...'); // Print first 100 chars for debugging

  // Check for URLs in the sample content
  const hasYouTube = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)(?:[?&].*)?/g.test(sampleContent);
  const hasTwitter = /https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/(?:[^\/]+)\/status\/(\d+)(?:\?.*)?/g.test(sampleContent);
  const hasVimeo = /https?:\/\/(?:www\.)?vimeo\.com\/(\d+)(?:\?.*)?/g.test(sampleContent);

  console.log(`URLs detected in ${sampleFileName}: YouTube: ${hasYouTube}, Twitter: ${hasTwitter}, Vimeo: ${hasVimeo}`);

  const processedContent = processUrlsInContent(sampleContent);

  // Write output for debugging
  const outputFileName = `output_${sampleFileName.replace('.md', '.mdx')}`;
  fs.writeFileSync(path.join(__dirname, outputFileName), processedContent);

  // Check if the expected file exists
  const expectedPath = path.join(__dirname, expectedFileName);
  if (!fs.existsSync(expectedPath)) {
    console.error(`Error: Expected file ${expectedPath} does not exist!`);
    return false;
  }

  const expectedContent = fs.readFileSync(expectedPath, 'utf8');
  console.log(`Expected content for ${expectedFileName} (${expectedContent.length} chars):`);
  console.log(expectedContent.substring(0, 100) + '...'); // Print first 100 chars for debugging

  const normalizedProcessed = normalizeContent(processedContent);
  const normalizedExpected = normalizeContent(expectedContent);

  if (normalizedProcessed === normalizedExpected) {
    console.log(`✅ Test passed for ${sampleFileName}! The processed content matches the expected output.`);
    return true;
  } else {
    console.error(`❌ Test failed for ${sampleFileName}! The processed content does not match the expected output.`);
    console.log('\nDifferences:');

    const processedLines = normalizedProcessed.split('\n');
    const expectedLines = normalizedExpected.split('\n');

    const maxLines = Math.max(processedLines.length, expectedLines.length);

    for (let i = 0; i < maxLines; i++) {
      if (i >= processedLines.length) {
        console.log(`Line ${i + 1}: Missing in processed content: "${expectedLines[i]}"`);
      } else if (i >= expectedLines.length) {
        console.log(`Line ${i + 1}: Extra in processed content: "${processedLines[i]}"`);
      } else if (processedLines[i] !== expectedLines[i]) {
        console.log(`Line ${i + 1}:`);
        console.log(`  Expected: "${expectedLines[i]}"`);
        console.log(`  Actual:   "${processedLines[i]}"`);
      }
    }
    return false;
  }
}

// Run tests for all sample files
const testCases = [
  { sample: 'sample.md', expected: 'expected.mdx' },
  { sample: 'sample_tweet.md', expected: 'expected_tweet.mdx' },
  { sample: 'sample_youtube.md', expected: 'expected_youtube.mdx' }
];

// Reset the sample files to their original content
// This is necessary because the test might be modifying the files
function resetSampleFiles() {
  // Define the content for each sample file
  const sampleTweetContent = `---  
id: 7  
title: "Astro Embed サンプルページ"  
description: "astro-embedを使用した様々な埋め込みのサンプルページです"  
date: 2025-05-24  
tags: ["tech", "astro", "embed"]  
---  

# Astro Embed サンプルページ  

このページでは、astro-embedを使用して様々なサービスのコンテンツを埋め込む方法を紹介します。  

## Twitter（X）投稿  

https://x.com/kechiiin_/status/1926112141943136673
  `;

  const sampleYoutubeContent = `---  
id: 7  
title: "Astro Embed サンプルページ"  
description: "astro-embedを使用した様々な埋め込みのサンプルページです"  
date: 2025-05-24  
tags: ["tech", "astro", "embed"]  
---  

# Astro Embed サンプルページ  

このページでは、astro-embedを使用して様々なサービスのコンテンツを埋め込む方法を紹介します。  

## YouTube動画  

https://www.youtube.com/watch?v=dQw4w9WgXcQ
`;

  // Write the content to the files
  fs.writeFileSync(path.join(__dirname, 'sample_tweet.md'), sampleTweetContent);
  fs.writeFileSync(path.join(__dirname, 'sample_youtube.md'), sampleYoutubeContent);
}

// Reset the sample files before running the tests
resetSampleFiles();

let allTestsPassed = true;

for (const testCase of testCases) {
  const testPassed = runTest(testCase.sample, testCase.expected);
  if (!testPassed) {
    allTestsPassed = false;
  }
}

if (allTestsPassed) {
  console.log('\n✅ All tests passed!');
} else {
  console.error('\n❌ Some tests failed!');
  process.exit(1);
}
