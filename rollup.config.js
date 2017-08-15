import babel from "rollup-plugin-babel";
import filesize from "rollup-plugin-filesize";
import uglify from "rollup-plugin-uglify";
import { minify } from "uglify-es";

export default [
  {
    input: "src/main.js",
    output: [
      {
        format: "cjs",
        file: "lib/main.cjs.js",
        exports: "named",
      },
      {
        format: "es",
        file: "lib/main.es.js",
      },
    ],
    external: ["prop-types"],
    plugins: [
      babel({
        exclude: "node_modules/**",
      }),
      uglify({}, minify),
      filesize(),
    ],
  },
  {
    input: "src/mock.js",
    output: [
      {
        format: "cjs",
        file: "lib/mock.js",
        exports: "named",
      },
    ],
    plugins: [
      babel({
        exclude: "node_modules/**",
      }),
      uglify({}, minify),
    ],
  },
];
