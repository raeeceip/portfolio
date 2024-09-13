import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

interface BlogPostMetadata {
  title: string;
  description: string;
  keywords: string[];
  tags: string[];
  imagePath: string;
}

function generateBlogTemplate(metadata: BlogPostMetadata): string {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '/');
  
  return `---
title: ${metadata.title}
date: ${date}
description: ${metadata.description}
keywords: ${metadata.keywords.join(', ')}
tags: [${metadata.tags.join(', ')}]
draft: true
image: "${metadata.imagePath}"
---

# ${metadata.title}

## Introduction

[Your introduction goes here]

## Main Content

[Your main content goes here]

## Conclusion

[Your conclusion goes here]

---

[Any additional notes or references]
`;
}

function saveBlogTemplate(template: string, fileName: string): void {
  const filePath = path.join(process.cwd(), 'content', 'blog', `${fileName}.mdx`);
  
  fs.writeFile(filePath, template, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log(`Blog template saved successfully: ${filePath}`);
    }
  });
}

function slugify(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

async function promptUser(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    const metadata: BlogPostMetadata = {
      title: await promptUser(rl, "Enter the blog post title: "),
      description: await promptUser(rl, "Enter a brief description: "),
      keywords: (await promptUser(rl, "Enter keywords (comma-separated): ")).split(',').map(k => k.trim()),
      tags: (await promptUser(rl, "Enter tags (comma-separated): ")).split(',').map(t => t.trim()),
      imagePath: await promptUser(rl, "Enter the image path: ")
    };

    const blogTemplate = generateBlogTemplate(metadata);
    saveBlogTemplate(blogTemplate, slugify(metadata.title));
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    rl.close();
  }
}

main();