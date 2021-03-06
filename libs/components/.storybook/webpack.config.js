const path = require('path')
const SRC_PATH = path.join(__dirname, '../src')
const STORIES_PATH = path.join(__dirname, '../stories')

module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
        include: path.resolve(__dirname, '../')
    })

    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [SRC_PATH, STORIES_PATH],
        use: [
            {
                loader: require.resolve('awesome-typescript-loader'),
                options: {
                    configFileName: './.storybook/tsconfig.json'
                }
            },
            { loader: require.resolve('react-docgen-typescript-loader') }
        ]
    })

    config.resolve = {
        ...config.resolve,
        alias: {
            Components: path.resolve(__dirname, '../src/Components'),
            Assets: path.resolve(__dirname, '../src/Assets'),
            Theme: path.resolve(__dirname, '../src/Theme')
        }
    }

    config.resolve.extensions.push('.ts', '.tsx')
    return config
}
