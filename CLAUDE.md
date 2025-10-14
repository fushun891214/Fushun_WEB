# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

vCard is a fully responsive personal portfolio website built using vanilla HTML, CSS, and JavaScript. It showcases a single-page application architecture with client-side navigation and no build process or framework dependencies.

## Architecture

### Single-Page Application Structure

The project uses a custom SPA implementation without any frameworks:

- **Navigation System**: index.html:139-179 defines the main navigation. JavaScript in assets/js/script.js:139-159 handles client-side page transitions by toggling the "active" class on article elements with `data-page` attributes
- **Page Sections**: Five main sections exist as `<article>` elements with `data-page` attributes: About, Resume, Portfolio, Blog, and Contact. Only one section is visible at a time (the one with class "active")
- **Sidebar**: Responsive collapsible sidebar (index.html:44-146) containing contact information and social links, controlled by data attributes `[data-sidebar]` and `[data-sidebar-btn]`

### Key JavaScript Patterns

All interactivity is managed through vanilla JavaScript using data attributes for element selection:

1. **Modal System** (script.js:19-54): Testimonials use a custom modal implementation. Clicking a testimonial item populates and displays a modal with full testimonial content
2. **Portfolio Filtering** (script.js:58-114): Dual-interface filtering system with both button-based (desktop) and dropdown-based (mobile) filtering using `data-filter-btn` and `data-select-item` attributes
3. **Form Validation** (script.js:118-135): Real-time validation that enables/disables the submit button based on HTML5 form validity
4. **Element Toggle Pattern** (script.js:5-6): Reusable utility function `elementToggleFunc` used throughout for toggling "active" classes

## Development

### Running Locally

This is a static website with no build process. Open index.html directly in a browser or use any local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

### File Structure

- `index.html` - Single HTML file containing all page content
- `assets/css/style.css` - All styles in one CSS file
- `assets/js/script.js` - All JavaScript functionality
- `assets/images/` - Icons, avatars, portfolio images, and blog thumbnails

### Customization Points

To customize the portfolio for a different person:

1. Update personal information in the sidebar section (index.html:44-146)
2. Modify the five article sections: About (185-534), Resume (540-693), Portfolio (699-971), Blog (977-1167), Contact (1173-1227)
3. Replace images in `assets/images/` directory
4. Update the page title in index.html:7

### Data Attribute Convention

The codebase consistently uses data attributes for JavaScript hooks:
- `data-sidebar`, `data-sidebar-btn` - Sidebar controls
- `data-nav-link`, `data-page` - Page navigation
- `data-filter-btn`, `data-filter-item`, `data-select-item` - Portfolio filtering
- `data-testimonials-item`, `data-modal-*` - Testimonials modal
- `data-form`, `data-form-input`, `data-form-btn` - Contact form

When adding new features, follow this pattern to maintain consistency.

## Dependencies

External dependencies loaded from CDN:
- Google Fonts (Poppins font family)
- Ionicons 5.5.2 (icon library)

No package manager, build tools, or bundler required.

## License

MIT License
