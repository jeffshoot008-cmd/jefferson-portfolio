# Jefferson Photography Portfolio

A modern, black-and-white photography portfolio website for student photographer Jefferson.

## Features

- Full-screen hero section
- Six sections: Home, About, Portfolio, Services, Experience, Contact
- Portfolio gallery with category filters and lightbox
- Statistics counter (Events Covered, Photos Delivered, Years of Experience)
- Contact form with validation
- Instagram links and floating WhatsApp button
- Smooth scroll animations and responsive layout

## Getting Started

Open `index.html` in a browser, or serve locally:

```bash
npx serve .
```

## Customization

### Replace placeholder images

1. Add your photos to the `assets/` folder
2. Update image URLs in `index.html` (hero, about) and `js/main.js` (`GALLERY_ITEMS` array)

### Update contact info

Edit these in `index.html`:

- Email: `jefferson@email.com`
- Instagram: `@jefferson.photos` and `https://instagram.com/`
- WhatsApp: `https://wa.me/1234567890` (replace with your number)

### Statistics

Adjust the `data-target` values on the stat numbers in `index.html`.

## Tech Stack

- HTML5, CSS3, vanilla JavaScript
- No build step required — fast loading by default
- Google Fonts: Cormorant Garamond + Inter
