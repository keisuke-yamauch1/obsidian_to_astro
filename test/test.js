const fs = require('fs');
const path = require('path');
const { processUrlsInContent } = require('../utils');

const sampleContent = fs.readFileSync(path.join(__dirname, 'sample.md'), 'utf8');

const processedContent = processUrlsInContent(sampleContent);

fs.writeFileSync(path.join(__dirname, 'output.mdx'), processedContent);

const expectedContent = fs.readFileSync(path.join(__dirname, 'expected.mdx'), 'utf8');

// Normalize content by removing extra whitespace
const normalizeContent = (content) => {
  return content
    .trim()
    .split('\n')
    .map(line => line.trim())
    .join('\n');
};

const normalizedProcessed = normalizeContent(processedContent);
const normalizedExpected = normalizeContent(expectedContent);

if (normalizedProcessed === normalizedExpected) {
  console.log('✅ Test passed! The processed content matches the expected output (ignoring whitespace differences).');
} else {
  console.error('❌ Test failed! The processed content does not match the expected output.');
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
}
