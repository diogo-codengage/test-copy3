const { override, fixBabelImports, addLessLoader } = require('customize-cra')
const theme = require('./theme.config')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        modifyVars: {
            ...theme
        },
        javascriptEnabled: true
    })
)
