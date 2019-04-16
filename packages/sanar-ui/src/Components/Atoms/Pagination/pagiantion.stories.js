import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import ESPagination from "./Pagination";

storiesOf("Atoms.Pagination", module)
    .add("Simple", () => (
        <ESPagination defaultCurrent={5} total={100} />
    ))
    