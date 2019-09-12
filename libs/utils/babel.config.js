const config = require('../../babel.config')

const sanarComponentsConfig = Object.assign(config, {
    plugins: [
        ...config.plugins,
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: {
                    Components: './src/Components',
                    Assets: './src/Assets',
                    Theme: './src/Theme'
                }
            }
        ]
    ]
})

module.exports = sanarComponentsConfig
