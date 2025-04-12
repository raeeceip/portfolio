# Chiso's Cookbook

This is the source for my personal website and blog at [chiso.dev](https://chiso.dev), styled as a cookbook/notebook with recipes for software development.

## Features

- **Cookbook Aesthetic**: Designed with a notebook/cookbook theme including paper textures, ruled lines, and a green gradient background
- **Interactive Animation**: Features a dramatic 2.5s cover page opening animation for first-time visitors
- **Cookbook Ribbons**: Includes the "2025 Edition" ribbon for an authentic cookbook feel
- **Fast Page Transitions**: Quick "rip-through" animations between pages for a paper-like experience
- **Offline Support**: Service worker implementation for offline access and performance
- **Optimized Performance**: Enhanced caching strategies and asset optimization
- **GitHub Integration**: Display repositories as "recipes" in the cookbook

## Stack
- Astro
- TailwindCSS
- MDX (for the blog posts)
- Cloudflare Pages (for hosting and edge functions)

## Performance Optimizations

This portfolio includes several performance enhancements:
- Service Worker for offline capabilities
- Optimized caching via Cloudflare
- Responsive images and lazy loading
- Critical CSS extraction
- Cloudflare D1 database for dynamic features

## Deployment

This site is optimized for deployment to Cloudflare Pages:

1. Build the project locally: `npm run build`
2. Deploy using one of these methods:
   - Connect your GitHub repository to Cloudflare Pages
   - Use the deploy script: `./deploy.sh`
   - Manual upload of the `dist` directory to Cloudflare Pages

## Can I fork this to reuse your design?
Yes, you can, just remove things that are directly related to me like [blog posts](./src/content/blog), [projects](./src/content/projects.json), description etc. If you have any more questions, you can ping me on Discord or Twitter; same username - chiso.

> This website used or still uses [Xe's](https://xeiaso.net/) Iosevka fonts directly from the provided CDN links [here](https://xeiaso.net/blog/iaso-fonts/), as long as it is in use, please retain the disclaimer in the footer of this website.
