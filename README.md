# Forum Badges

A beautiful collection of 60 customizable CSS badges/prefixes for forum user roles.

![Forum Badges Preview](demo/images/preview.png)

## Features

- 60 high-quality, detailed badge designs
- Easy to implement in any forum or website
- Customizable colors and effects
- Lightweight CSS with minimal footprint
- Compatible with all modern browsers

## Installation

### NPM

```bash
npm install forum-badges
```

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/forum-badges@1.0.0/dist/forum-badges.css">
```

### Direct Download

Download the [latest release](https://github.com/reglobby/forum-badges/releases) and include the CSS file in your project.

## Usage

1. Include the CSS file in your HTML:

```html
<link rel="stylesheet" href="path/to/forum-badges.css">
```

2. Add the badge to your username or content:

```html
<span class="fb-badge fb-admin">Administrator</span>
<span class="fb-badge fb-mod">Moderator</span>
<span class="fb-badge fb-vip">VIP</span>
<!-- And many more -->
```

## Available Badges

We have 60 different badge styles, including:

- Administrative roles (Admin, Moderator, Super Moderator)
- Special statuses (VIP, Donor, Sponsor)
- Achievement badges (Veteran, Expert, Helper)
- Fun badges (Jester, Ninja, Wizard)

See the [full demo page](https://reglobby.github.io/forum-badges) for all available badges with previews.

## Customization

You can customize the badges by overriding the CSS variables:

```css
:root {
  --fb-admin-color: #ff5555;
  --fb-admin-bg: #333;
  /* More customization options */
}
```

## License

MIT Licensed. See [LICENSE](LICENSE) for details. 