import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import Card from "antd/lib/card";

storiesOf("Card", module).add("Card", () => (
	<Card onClick={action("clicked")}>Hello Button</Card>
));
