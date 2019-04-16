module.exports = function(api) {
	api.cache(true);

	return {
		presets: [
			"@babel/preset-react",
			[
				"@babel/preset-env",
				{
					useBuiltIns: "entry",
					loose: true,
					targets: {
						node: "current"
					}
				}
			]
		],
		plugins: ["@babel/plugin-proposal-export-default-from"]
	};
};
