const { override, fixBabelImports, addLessLoader } = require('customize-cra')
const theme = require('./theme.config')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: false
    }),
    addLessLoader({
        javascriptEnabled: true
    })
)
