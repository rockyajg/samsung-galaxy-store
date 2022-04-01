const postcssCustomMedia = require('postcss-custom-media');
const postcssImport = require("postcss-import");
const postcssJitProps = require('postcss-jit-props');
const postcssNesting = require ('postcss-nesting');
const OpenProps = require('open-props');

module.exports = {
  plugins: [
    postcssImport(),
    postcssNesting(),
    postcssCustomMedia({
      importFrom: [
        // './node_modules/open-props/open-props.min.css',
        // './node_modules/open-props/animations.min.css',
        // './node_modules/open-props/aspects.min.css',
        // './node_modules/open-props/borders.min.css',
        // './node_modules/open-props/buttons.min.css',
        // './node_modules/open-props/colors.min.css',
        // './node_modules/open-props/easings.min.css',
        // './node_modules/open-props/fonts.min.css',
        // './node_modules/open-props/gradients.min.css',
        './node_modules/open-props/media.min.css',
        // './node_modules/open-props/shadows.min.css',
        // './node_modules/open-props/sizes.min.css',
        // './node_modules/open-props/supports.min.css',
      ]
    }),
    postcssJitProps(OpenProps),
  ],
};
