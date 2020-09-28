import {nodeResolve} from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import path from 'path';
export default {
    input: {
        a: 'src/a.js',
    },
    output: [
        {
            format: 'es',
            dir: './es',
            chunkFileNames: '[name].js'
        },
        {
            format: 'system',
            dir: './system',
            chunkFileNames: '[name].js'
        }
    ],
    manualChunks(id) {
        // uncomment commonjsHelpers to its own chunk
        // avoiding circular dependencies.

        // if(id === '\0commonjsHelpers.js'){
        //     return 'helpers';
        // }
        if (id.includes('node_modules')) {
          const dirs = id.split(path.sep);
          const name = dirs[dirs.lastIndexOf('node_modules') + 1];
          if(['react', 'react-dom', 'scheduler', 'object-assign'].includes(name)){
              return 'react';
          }
          return name;
        }
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        nodeResolve(),
        cjs({exclude: 'src/*'}),
        babel({
            babelHelpers: 'bundled',
            exclude: [/core-js/],
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  modules: false,
                  bugfixes: true,
                  corejs: {version: 3},
                  targets: {ie: '11'},
                },
              ],
            ],
        }),
    ]
}