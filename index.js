require('dotenv').config();
const fs = require('fs-extra');
const path = require('path');

// Get paths from environment variables
const blogPath = process.env.BLOG_PATH;
const diaryPath = process.env.DIARY_PATH;
const imagesPath = process.env.IMAGES_PATH;
const outputContentPath = process.env.OUTPUT_CONTENT_PATH;
const outputImagesPath = process.env.OUTPUT_IMAGES_PATH;

// Create output directories if they don't exist
fs.ensureDirSync(path.join(outputContentPath, 'blog'));
fs.ensureDirSync(path.join(outputContentPath, 'diary'));
fs.ensureDirSync(outputImagesPath);

// Function to copy files
// Function to process markdown content and convert Obsidian image syntax to Astro image syntax
function processMarkdownContent(content) {
  // Replace ![[filename]] with ![Image](../../assets/filename)
  return content.replace(/!\[\[(.*?)\]\]/g, '![Image](../../assets/$1)');
}

async function copyFiles() {
  try {
    // Check if source directories exist
    if (!fs.existsSync(blogPath)) {
      console.error(`Blog path ${blogPath} does not exist`);
      return;
    }
    if (!fs.existsSync(diaryPath)) {
      console.error(`Diary path ${diaryPath} does not exist`);
      return;
    }
    if (!fs.existsSync(imagesPath)) {
      console.error(`Images path ${imagesPath} does not exist`);
      return;
    }

    // Copy blog files
    console.log(`Copying blog files from ${blogPath} to ${path.join(outputContentPath, 'blog')}`);
    const blogFiles = fs.readdirSync(blogPath);
    for (const file of blogFiles) {
      if (file.endsWith('.md')) {
        const destPath = path.join(outputContentPath, 'blog', file);
        // Read the file content
        const content = await fs.readFile(path.join(blogPath, file), 'utf8');
        // Process the content
        const processedContent = processMarkdownContent(content);
        // Write the processed content to the destination
        await fs.writeFile(destPath, processedContent);
        console.log(`Copied and processed ${file} to ${path.join(outputContentPath, 'blog')}`);
      }
    }

    // Copy diary files
    console.log(`Copying diary files from ${diaryPath} to ${path.join(outputContentPath, 'diary')}`);
    const diaryFiles = fs.readdirSync(diaryPath);
    for (const file of diaryFiles) {
      if (file.endsWith('.md')) {
        const destPath = path.join(outputContentPath, 'diary', file);
        // Read the file content
        const content = await fs.readFile(path.join(diaryPath, file), 'utf8');
        // Process the content
        const processedContent = processMarkdownContent(content);
        // Write the processed content to the destination
        await fs.writeFile(destPath, processedContent);
        console.log(`Copied and processed ${file} to ${path.join(outputContentPath, 'diary')}`);
      }
    }

    // Copy image files
    console.log(`Copying image files from ${imagesPath} to ${outputImagesPath}`);
    const imageFiles = fs.readdirSync(imagesPath);
    for (const file of imageFiles) {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.gif')) {
        const destPath = path.join(outputImagesPath, file);
        await fs.copy(
          path.join(imagesPath, file),
          destPath
        );
        console.log(`Copied ${file} to ${outputImagesPath}`);
      }
    }

    console.log('All files copied successfully!');
  } catch (error) {
    console.error('Error copying files:', error);
  }
}

// Run the copy function
copyFiles();
