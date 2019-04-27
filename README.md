# salo.kobujutsu.fi

> Web site for the "Salon Yuishinkai ry", a martial club in Salo, Finland.

![Visual Regression Status](https://api.ghostinspector.com/v1/suites/5bb21eb9d672630e215db1fa/status-badge)

The web site is available at `salo.kobujutsu.fi`, in which it is deployed immediately when something is pushed to this GitHub repository.
The web site is hosted at [Netlify](https://www.netlify.com/), for free since creating open source stuff is great.

The site is configured to only allow secured connections (via `https`) and
the certificates for it are provided for free by [Let's Encrypt](https://letsencrypt.org/).

## Cross browser supported styling

CSS should be passed through [online Autoprefixer at `autoprefixer.github.io`](https://autoprefixer.github.io/).
Using there the option `"last 4 version"`. This will add few cross browser support related properties, which should be committed in this repository.

## License

Licensed under [the MIT license](LICENSE).
