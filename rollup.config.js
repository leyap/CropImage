import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {uglify} from 'rollup-plugin-uglify';

export default {
    input: './src/main.js',
    output: {
        file: './dist/CropImage.mini.js',
        format: 'iife',
        name: 'CropImage',
        sourcemap: true
    },
    plugins: [nodeResolve(), commonjs(), uglify({
        output: {
            // comments: "all"
            comments: function(node, comment) {
                if (comment.type === "comment2") {
                    // multiline comment
                    return /@preserve|@license|@cc_on/i.test(comment.value);
                }
                return false;
            }
        },
        compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false,
        }
    }), babel({
        plugins: ['external-helpers'],
        externalHelpers: true,
        exclude: '**/node_modules/**'
    })],
    watch: {
        include: 'src/**'
    }
}
