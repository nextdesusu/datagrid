import * as React from "react";
import Select from "react-select";

interface HeaderInputProps {
  options: Array<any>;
  style: object;
}

class HInput extends React.Component<HeaderInputProps> {
  render() {
    const { options, style } = this.props;
    return (
      <div style={style}>
        <Select
          isMulti
          name="colors"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    );
  }
}

export default HInput;
