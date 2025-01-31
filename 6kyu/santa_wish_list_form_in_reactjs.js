// Solution for 6kyu Kata "Santa wish list form in ReactJS" https://www.codewars.com/kata/5a9ecd89fd5777e0790001ea

const React = require("react");

class WishlistForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      wish: "",
      priority: 1,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.target.id = (e.target.id === 'select') ? 'priority' : e.target.id;
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit(e) {
    this.props.send({...this.state});
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
        <textarea name="wish" id="wish" value={this.state.wish} onChange={this.handleChange} />
        <select name="priority" id="priority" value={1} onChange={this.handleChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </form>
    );
  }
};