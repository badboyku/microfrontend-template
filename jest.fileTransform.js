const path = require('path');

const toPascalCase = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Splits camelCase words into separate words
    .replace(/[-_]+|[^\p{L}\p{N}]/gu, ' ') // Replaces dashes, underscores, and special characters with spaces
    .toLowerCase() // Converts the entire string to lowercase
    .replace(/(?:^|\s)(\p{L})/gu, (_, letter) => letter.toUpperCase()) // Capitalizes the first letter of each word
    .replace(/\s+/g, ''); // Removes all spaces

module.exports = {
  process(_src, filename, _config, _options) {
    const assetFilename = JSON.stringify(path.basename(filename));

    if (filename.match(/\.svg$/)) {
      const pascalCaseFilename = toPascalCase(path.parse(filename).name);
      const componentName = `Svg${pascalCaseFilename}`;

      return {
        code: `
const React = require('react');
module.exports = {
  __esModule: true,
  default: ${assetFilename},
  ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
    return {
      $$typeof: Symbol.for('react.element'),
      type: 'svg',
      ref: ref,
      key: null,
      props: Object.assign({}, props, { children: ${assetFilename} }),
    };
  }),
};`,
      };
    }

    return { code: `module.exports = ${assetFilename};` };
  },
};
