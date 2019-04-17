import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";

import "./styles.less";

addDecorator(story => <div style={{ padding: 20 }}>{story()}</div>);

// automatically import all files ending in *.stories.js
const req = require.context("../packages/sanar-ui/src", true, /\.stories\.js$/);
function loadStories() {
	req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
