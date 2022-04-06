
const cssnano = require('cssnano');
const OpenProps = require('open-props');
const combineSelectors = require('postcss-combine-duplicated-selectors');
const postcssCustomMedia = require('postcss-custom-media');
const postcssImport = require("postcss-import");
const postcssJitProps = require('postcss-jit-props');
const postcssNesting = require ('postcss-nesting');
const postcssPresetEnv  = require('postcss-preset-env');

const lib = process.env.npm_lifecycle_event

const inlineMediaQueries = lib === 'lib:media' || lib === 'lib:supports';
// todo: inline MQs for 'lib:all' when it's supported better

module.exports = {
  plugins: [
    postcssImport(),
    postcssNesting(),
    postcssPresetEnv({
      stage: 0,
      autoprefixer: false,
      features: {
        'logical-properties-and-values': false, 
        'prefers-color-scheme-query': false, 
        'gap-properties': false,
        'custom-properties': false,
        'place-properties': false,
        'not-pseudo-class': false,
        'focus-visible-pseudo-class': false,
        'focus-within-pseudo-class': false,
        'color-functional-notation': false,
        'custom-media-queries': {preserve:inlineMediaQueries}
      }
    }),
    postcssJitProps(OpenProps),
    postcssCustomMedia({
      importFrom: [
        './node_modules/open-props/src/props.media.css',
        './node_modules/open-props/src/props.fonts.css',
        './node_modules/open-props/src/props.sizes.css',
        './node_modules/open-props/src/props.easing.css',
        './node_modules/open-props/src/props.zindex.css',
        './node_modules/open-props/src/props.shadows.css',
        './node_modules/open-props/src/props.aspects.css',
        './node_modules/open-props/src/props.colors.css',
        './node_modules/open-props/src/props.gradients.css',
        './node_modules/open-props/src/props.animations.css',
        './node_modules/open-props/src/props.borders.css',
      ]
    }),
    combineSelectors(),
    cssnano({
      preset: 'default'
    }),
  ]
}

