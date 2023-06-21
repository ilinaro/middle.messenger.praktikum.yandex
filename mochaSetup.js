/* eslint-disable import/no-extraneous-dependencies */
const { JSDOM } = require('jsdom');
const Handlebars = require('handlebars');
const fs = require('fs');

const { window } = new JSDOM('<div id="root"></div>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions['.hbs'] = function (module, filename) {
  const contents = fs.readFileSync(filename, 'utf-8');

  // eslint-disable-next-line no-param-reassign
  module.exports = Handlebars.compile(contents);
};

require.extensions['.scss'] = function () {
  module.exports = {}
};
