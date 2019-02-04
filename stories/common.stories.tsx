import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import ButtonList from "../src/common/ButtonList";

storiesOf("common/ButtonList", module).add("name as changed argument", () => (
  <ButtonList
    buttons={[
      { label: "First Button", name: "fb" },
      { label: "Second Button", name: "sb" }
    ]}
    changed={action("changed")}
  />
));
