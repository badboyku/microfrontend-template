module.exports = {
  process(_src, _filename, _config, _options) {
    return { code: 'module.exports = {};' };
  },
  getCacheKey() {
    return 'cssTransform';
  },
};
