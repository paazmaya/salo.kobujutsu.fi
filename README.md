# salo.kobujutsu.fi

> Web site for the "Salon Yuishinkai ry", a martial club in Salo, Finland.

![Visual Regression Status](https://api.ghostinspector.com/v1/suites/5bb21eb9d672630e215db1fa/status-badge)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=paazmaya_salo.kobujutsu.fi&metric=code_smells)](https://sonarcloud.io/dashboard?id=paazmaya_salo.kobujutsu.fi)

The web site is available at `salo.kobujutsu.fi`, in which it is deployed immediately when something is pushed to this GitHub repository.
The web site is hosted at [Netlify](https://www.netlify.com/), for free since creating open source stuff is great.

The site is configured to only allow secured connections (via `https`) and
the certificates for it are provided for free by [Let's Encrypt](https://letsencrypt.org/).

## Visual Regression Testing

This project includes comprehensive visual regression testing using Playwright with Docker. The tests run automatically on every push and pull request, checking the site across Chromium, Firefox, and WebKit browsers.

**Key features:**

- 🎭 **Multi-browser testing**: Chromium, Firefox, WebKit
- 🐳 **Docker-based CI**: Consistent testing environment
- 📱 **Responsive testing**: Multiple viewport sizes
- ♿ **Accessibility checks**: Color contrast, keyboard navigation
- 📊 **Performance monitoring**: Load times, asset verification
- 📸 **Visual comparisons**: Pixel-perfect regression detection

For detailed information about the visual testing setup, see [VISUAL_TESTING.md](VISUAL_TESTING.md).

### Quick Start

```bash
# Setup testing environment
npm run setup

# Run all visual regression tests
npm test

# Update visual baselines
npm run test:update

# View test results
npm run report
```

## Logo

The logo for the martial art club is ["Oak Leaf" by Kakha Kakhadzen](https://dribbble.com/shots/3678848-Oak-Leaf).

## Cross browser supported styling

CSS should be passed through [online Autoprefixer at `autoprefixer.github.io`](https://autoprefixer.github.io/).
Using there the option `"last 4 version"`. This will add few cross browser support related properties, which should be committed in this repository.

## License

Licensed under [the MIT license](LICENSE).
