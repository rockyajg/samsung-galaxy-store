const path = require('path');

// const { EleventyServerlessBundlerPlugin } = require('@11ty/eleventy');
const Image = require('@11ty/eleventy-img');
// const litPlugin = require('@lit-labs/eleventy-plugin-lit');
const metagen = require('eleventy-plugin-metagen');
const PostCSSPlugin = require('eleventy-plugin-postcss');
const markdownIt = require('markdown-it');
const markdownItContainer = require('markdown-it-container');
// const outdent = require('outdent');

const config = require("./config.json");

async function configShortcode(property) {
  const dotProp = await import('dot-prop');

  return dotProp.getProperty(config, property);
}

async function imageShortcode(src, alt, sizes = '100vw') {
  let metadata = await Image(src, {
    formats: [
      'avif',
      'jpeg'
    ],
    outputDir: path.join('_site/images'),
    urlPath: '/images',
    widths: [300, 600],
  });

  let imageAttributes = {
    alt,
    decoding: 'async',
    loading: 'lazy',
    sizes,
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt='' works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  // eleventyConfig.addPlugin(litPlugin, {
  //   mode: 'vm',
  //   componentModules: ['./_js/components.js'],
  // });

  // eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
  //   name: 'possum', // The serverless function name from your permalink object
  //   functionsDir: './netlify/functions/',
  // });

  eleventyConfig.addShortcode('config', configShortcode);
  eleventyConfig.addShortcode('image', imageShortcode);

  // eleventyConfig.addPlugin(metagen);
  eleventyConfig.addPlugin(PostCSSPlugin);

  eleventyConfig.addPassthroughCopy({
    '_fonts': '_fonts',
    '_images': '_images',
    '_js': '_js',
  });

  eleventyConfig.addPassthroughCopy('apps/**/*.png', 'apps/**/*.jpeg', 'apps/**/*.jpg', 'apps/**/*.svg');

  eleventyConfig.addCollection('apps', (collectionApi) => collectionApi.getFilteredByGlob(['apps/**/*.md']));

  const options = {
    html: true,
    breaks: true,
    linkify: true
  };

  const md = markdownIt(options)
  
  md.use(markdownItContainer, 'images');
  md.use(markdownItContainer, 'text');
  
  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addFilter('dateYear', (date) => new Date(date).getFullYear());
};