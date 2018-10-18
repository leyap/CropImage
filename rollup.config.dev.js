import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {uglify} from 'rollup-plugin-uglify';

export default {
    input: './src/main.js',
    output: {
        file: './dist/CropImage.js',
        format: 'iife',
        name: 'CropImage',
        sourcemap: false
    },
    plugins: [nodeResolve(), commonjs(), babel({
        plugins: ['external-helpers'],
        externalHelpers: true,
        exclude: '**/node_modules/**'
    })],
    watch: {
        include: 'src/**'
    }
}
