import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import EsPagination from "./Pagination";

storiesOf("Pagination", module)
    .add("Simple", () => (
        <EsPagination defaultCurrent={5} total={100} />
    ))
    