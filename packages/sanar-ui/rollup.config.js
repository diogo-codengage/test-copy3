import babel from "rollup-plugin-babel";
import lessModules from "rollup-plugin-less-modules";
import resolve from "rollup-plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const processor = (code, id) => {
	const postCssOptions = {
		from: id,
		to: id,
		map: {
			prev: code.map
		}
	};
	return postcss([autoprefixer])
		.process(code.css, postCssOptions)
		.then(result => ({
			css: result.css,
			map: result.map
		}));
};

export default {
	input: "src/index.js",
	output: {
		file: "dist/bundle.js",
		format: "cjs"
	},
	external: ["react"],
	plugins: [
		resolve(),
		peerDepsExternal({
			includeDependencies: true
		}),
		babel({
			exclude: "node_modules/**"
		}),
		lessModules(
			{
				output: "dist/bundle.less"
			},
			processor
		)
	]
};
