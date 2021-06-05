// 이 파일에서만 no-global-assign ESLint 옵션을 비활성화합니다.

// eslint-disable-next-line no-native-reassign
require = require('esm')(module /* , options */);
module.exports = require('./main.js');
