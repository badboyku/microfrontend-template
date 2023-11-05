const path = require('path');

module.exports = {
  process(_src, filename, _config, _options) {
    const assetFilename = JSON.stringify(path.basename(filename));

    if (filename.match(/\.svg$/)) {
      const componentName = `Svg${path.parse(filename).name.toLowerCase()}`;

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
