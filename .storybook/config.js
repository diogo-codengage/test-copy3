import { configure } from "@storybook/react";

import "./styles.less";

// automatically import all files ending in *.stories.js
const req = require.context("../packages/sanar-ui", true, /\.stories\.js$/);
function loadStories() {
	req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
