# Basic Starter

A simple starter for building your site with Next.js and Drupal (Decoupled Kit module).
Forked from https://github.com/chapter-three/next-drupal-basic-starter .

## How to install

  - `npx create-next-app -e https://github.com/cooldrupal/next-drupal-decoupled-kit-blog`
  - `cd [APP DIRECTORY]`
  - `cp .env.example .env` (or `cp .env.example .env.local`) and set variables
  - Install and enable drupal modules:
    - Next
    - Decoupled Kit (Decoupled Kit Block)
    - JSON:API Menu Items
    - JSON:API Views
  - Configure params/* files
  - `npm run dev`

## Functions

  - getBlocks()
    Get blocks list by current page and blocks regions.
  - getMenus()
    Get menus list by current page.
  - getBreadcrumb()
    Get breadcrumb by current page.
  - getRedirect()
    Get redirect by current page.
  - getMetatag()
    Get metatags for current page.

## Resources

  - Demo-project: https://github.com/cooldrupal/drupal-top100-next
  - Demo-site: https://drupaltop100.vercel.app/

  Author: Serhii Klietsov - https://www.linkedin.com/in/serhii-klietsov-a125909a/
