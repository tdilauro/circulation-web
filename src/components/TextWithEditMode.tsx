import * as React from "react";
import EditableInput from "./EditableInput";
import PencilIcon from "./icons/PencilIcon";
import { Button } from "library-simplified-reusable-components";

export interface TextWithEditModeProps extends React.Props<TextWithEditMode> {
  text?: string;
  placeholder: string;
  onUpdate?: (text: string) => void;
  "aria-label": string;
}

export interface TextWithEditModeState {
  editMode: boolean;
  text: string;
}

/** Renders text with a link to switch to edit mode and show an editable input instead.
    If the text isn't defined yet, it starts in edit mode. */
export default class TextWithEditMode extends React.Component<TextWithEditModeProps, TextWithEditModeState> {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text || "",
      editMode: !this.props.text
    };

    this.updateText = this.updateText.bind(this);
    this.startEditMode = this.startEditMode.bind(this);
    this.reset = this.reset.bind(this);
  }

  render(): JSX.Element {
    return (
      <div>
        { this.state.editMode &&
          <h3>
            <EditableInput
              type="text"
              placeholder={this.props.placeholder}
              value={this.state.text}
              optionalText={false}
              ref="text"
              aria-label={this.props["aria-label"]}
            />
            <Button
              className="inverted inline"
              callback={this.updateText}
              content={`Save ${this.props.placeholder}`}
            />
          </h3>
        }
        { !this.state.editMode &&
          <h3>
            { this.state.text }
            <Button
              callback={this.startEditMode}
              className="inverted inline"
              content={<span>Edit {this.props.placeholder} <PencilIcon /></span>}
            />
          </h3>
        }
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.setState({ text: nextProps.text, editMode: !nextProps.text });
    }
  }

  updateText() {
    const text = (this.refs["text"] as EditableInput).getValue();
    this.setState({ text, editMode: false });
    if (this.props.onUpdate) {
      this.props.onUpdate(text);
    }
  }

  startEditMode() {
    this.setState({ text: this.state.text, editMode: true });
  }

  getText() {
    if (this.state.editMode) {
      let value = (this.refs["text"] as EditableInput).getValue();
      this.updateText();
      return value;
    } else {
      return this.state.text;
    }
  }

  reset() {
    this.setState({ text: this.props.text, editMode: !this.props.text });
    if (this.props.onUpdate) {
      this.props.onUpdate(this.props.text);
    }
  }
}
