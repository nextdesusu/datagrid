import * as React from "react";
import Select from "react-select";

interface HeaderInputProps {
  width: number;
  options: Array<any>;
  height: number;
}

class HeaderInput extends React.Component<HeaderInputProps> {
  render() {
    const { options, width, height } = this.props;
    return (
      <div style={{ width, height }}>
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

export default HeaderInput;
