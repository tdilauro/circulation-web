import * as React from "react";
import EditableInput from "./EditableInput";

export interface AutocompleteProps {
  autocompleteValues: string[];
  disabled: boolean;
  name: string;
  label: string;
  value?: string;
  onChange?: () => void;
}

export default class Autocomplete extends React.Component<AutocompleteProps, {}> {
  render(): JSX.Element {
    return (
      <div>
        <EditableInput
          elementType="input"
          type="text"
          disabled={this.props.disabled}
          name={this.props.name}
          list={this.props.name + "-autocomplete-list"}
          label={this.props.label}
          value={this.props.value}
          ref="input"
          optionalText={false}
          onChange={this.props.onChange}
        />
        <datalist
          id={this.props.name + "-autocomplete-list"}
          >
          { this.props.autocompleteValues.map(value =>
              <option value={value} key={value} aria-selected={this.props.value === value}></option>
            )
          }
        </datalist>
      </div>
    );
  }

  getValue() {
    return (this.refs["input"] as any).getValue();
  }

  clear() {
    (this.refs["input"] as any).setState({ value: "" });
  }
}
