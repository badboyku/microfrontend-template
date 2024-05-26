const path = require('path');
/* eslint-disable-next-line import/no-extraneous-dependencies */
const camelcase = require('camelcase');

module.exports = {
  process(_src, filename, _config, _options) {
    const assetFilename = JSON.stringify(path.basename(filename));

    if (filename.match(/\.svg$/)) {
      const pascalCaseFilename = camelcase(path.parse(filename).name, { pascalCase: true });
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
