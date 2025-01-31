// Solution for 6kyu Kata "Control the Beast (controlled components in ReactJS)" https://www.codewars.com/kata/control-the-beast-controlled-components-in-reactjs


const React = require("react");

class Beast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <input type="text" id="controlledName" value={this.state.name} onChange={this.handleChange} />
      </div>
    );
  }
};

Beast.defaultProps = {
  name: "Yeti",
}