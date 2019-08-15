import * as React from "react";
import { storiesOf } from "@storybook/react";

import AdminAuthServices from "../src/components/AdminAuthServices";
import AnalyticsServices from "../src/components/AnalyticsServices";

const editor = {
  libraries: {
    data: {
      libraries: [
        { id: 1, name: "NYPL", short_name: "NYPL" },
        { id: 1, name: "BPL", short_name: "BPL" }
      ]
    }
  },
  adminAuthServices: {
    data: {

    }
  },
  analyticsServices: {
    fetchError: null
  }
};

storiesOf("circulation-web/EditableConfigList", module)
  .add("Notes", () => (
    <p>The base component is EditableConfigList and the example components
      extend it. These are forms to add services and configure them in the admin.
    </p>
  ))
  .add("AdminAuthServices", () => (
    <AdminAuthServices
      store={{
        getState: () => ({ editor }),
        dispatch: () => {},
        subscribe: () => {}
      }}
      csrfToken=""
      editOrCreate="create"
      identifier="1"
    />
  ))
  .add("AnalyticsServices", () => (
    <AnalyticsServices
      store={{
        getState: () => ({ editor }),
        dispatch: () => {},
        subscribe: () => {}
      }}
      csrfToken=""
      editOrCreate="create"
      identifier="1"
    />
  ));
