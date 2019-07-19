import * as React from "react";
import { Store } from "redux";
import * as PropTypes from "prop-types";
import { State } from "../reducers/index";
import { TabContainer, TabContainerProps, TabContainerContext } from "./TabContainer";
import DiagnosticsPage from "./DiagnosticsPage";

export interface TroubleshootingSidebarProps extends TabContainerProps {
  store: Store<State>;
  goToTab: (tabName: string) => void;
}

export default class DiagnosticsSidebar extends TabContainer<TroubleshootingSidebarProps> {
  context: TabContainerContext;
  static contextTypes: React.ValidationMap<TabContainerContext> = {
    router: PropTypes.object.isRequired,
    pathFor: PropTypes.func.isRequired
  };

  tabs() {
    const tabs = {};
    tabs["diagnostics"] = (
      <DiagnosticsPage />
    );
    tabs["self-tests"] = <h1>Self Tests</h1>;
    return tabs;
  }

  handleSelect(event) {
    let tab = event.currentTarget.dataset.tabkey;
    this.props.goToTab(tab);
  }

  tabDisplayName(name) {
    if (name === "diagnostics") {
      return "Diagnostics";
    } else {
      return super.tabDisplayName(name);
    }
  }

  defaultTab() {
    console.log("HIT");
    return "diagnostics";
  }
}
