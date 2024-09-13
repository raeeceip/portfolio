import * as fs from 'fs';
import * as path from 'path';

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
  const filePath = path.join(__dirname, 'content', 'blog', `${fileName}.mdx`);
  
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

// Command-line usage
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length >= 5) {
    const metadata: BlogPostMetadata = {
      title: args[0],
      description: args[1],
      keywords: args[2].split(','),
      tags: args[3].split(','),
      imagePath: args[4]
    };
    const blogTemplate = generateBlogTemplate(metadata);
    saveBlogTemplate(blogTemplate, slugify(metadata.title));
  } else {
    console.log("Usage: ts-node blog-template-generator.ts <title> <description> <keywords> <tags> <imagePath>");
    console.log("Example: ts-node blog-template-generator.ts \"My New Post\" \"A great post about coding\" \"javascript,nodejs\" \"coding,tutorial\" \"/images/coding.png\"");
  }
}