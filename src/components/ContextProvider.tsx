import * as React from "react";
import { Store } from "redux";
import buildStore from "../store";
import { PathFor } from "../interfaces";
import { State } from "../reducers/index";

export interface ContextProviderProps extends React.Props<any> {
  csrfToken: string;
  homeUrl: string;
  showCircEventsDownload?: boolean;
  settingUp?: boolean;
}

export default class ContextProvider extends React.Component<ContextProviderProps, any> {
  store: Store<State>;
  pathFor: PathFor;

  constructor(props) {
    super(props);
    this.store = buildStore();
    this.pathFor = (collectionUrl: string, bookUrl: string, tab?: string) => {
      let path = "/admin/web";
      path +=
        collectionUrl ?
        `/collection/${this.prepareCollectionUrl(collectionUrl)}` :
        "";
      path +=
        bookUrl ?
        `/book/${this.prepareBookUrl(bookUrl)}` :
        "";
      path += tab ? `/tab/${tab}` : "";
      return path;
    };
  }

  prepareCollectionUrl(url: string): string {
    return encodeURIComponent(
      url.replace(document.location.origin + "/", "").replace(/\/$/, "").replace(/^\//, "")
    );
  }

  prepareBookUrl(url: string): string {
    return encodeURIComponent(
      url.replace(document.location.origin + "/works/", "").replace(/\/$/, "").replace(/^\//, "")
    );
  }

  static childContextTypes: React.ValidationMap<any> = {
    editorStore: React.PropTypes.object.isRequired,
    pathFor: React.PropTypes.func.isRequired,
    csrfToken: React.PropTypes.string.isRequired,
    homeUrl: React.PropTypes.string.isRequired,
    showCircEventsDownload: React.PropTypes.bool.isRequired,
    settingUp: React.PropTypes.bool.isRequired
  };

  getChildContext() {
    return {
      editorStore: this.store,
      pathFor: this.pathFor,
      csrfToken: this.props.csrfToken,
      homeUrl: this.props.homeUrl,
      showCircEventsDownload: this.props.showCircEventsDownload || false,
      settingUp: this.props.settingUp || false
    };
  }

  render() {
    return React.Children.only(this.props.children) as JSX.Element;
  };
};