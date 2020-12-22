const path = require('path');

function c(color, message){
    return '\033[' + color + 'm' + message + '\033[39m';
}

function l(...messages) {
    for(let i = 0; i < messages.length; i++){
        console.log(messages[i]);
    }
}

module.paths.push('C:/Users/alecs/AppData/Roaming/npm/node_modules');

module.exports = (env, b) => {
    env.platform = env.platform || 'node';
    env.type = env.type || 'var';
    env.path = env.platform != 'node' ? 'poonya.browser.' + env.type + '.bundle.js' : 'poonya.node.bundle.js';

    l(
        '\n',
        '|==================================================================|',
        '| ' + c(35, 'POONYA BUILDING HAS BEEN STARTED') + '                                 |',
        '|------------------------------------------------------------------|',
        '| PARAM            | VALUE                                         |',
        '|------------------------------------------------------------------|',
        '| FOR PLATFORM     | ' + c(33, (b = (env.platform).toUpperCase()).padEnd(46, ' ')) + '|',
        '| OUT              | ' + c(33, env.path.padEnd(46, ' ')) + '|',
        '|==================================================================|'
    )

    if(env.platform != 'node' && env.platform != 'browser')
        throw new Error('Unknown platform.');

    return {
        entry: './src/poonya.js',
        
        output: {
            filename: env.path,
            path: path.resolve(__dirname, 'dist'),
            scriptType: 'module',
            library: env.platform === 'node' ? undefined : 'poonya',
            libraryTarget: env.platform === 'node' ? 'commonjs2' : env.type
        },

        resolve: {
            fallback: {
                path: false,
                fs: false
            },
            alias: {
                poonya: path.resolve(__dirname, './src/preset.js')
            }
        },

        optimization: {
            minimize: false
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        require.resolve('babel-loader'),

                        {
                            loader: path.resolve('./webpack/liquid-comments.js'),
                        },

                        {
                            loader: require.resolve('webpack-preprocessor-loader'),
                            options: {
                                debug: process.env.NODE_ENV !== 'product',
                                directives: {
                                    secret: false
                                },
                                params: {
                                    platform: env.platform
                                },
                                verbose: false,
                            },
                        }
                    ]
                }
            ]
        },

        target: env.platform == 'node' ? 'node' : 'web'
    }
};