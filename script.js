class Draggable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  setRelativePositions(e) {
    const pos = this.refs.draggable.getBoundingClientRect();
    this.setState({
      relLeft: e.pageX - pos.left,
      relTop: e.pageY - pos.top
    })
  }

  onMouseDown(e) {
    this.setRelativePositions(e);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove(e) {
    this.setState({
      left: e.pageX - this.state.relLeft,
      top: e.pageY - this.state.relTop
    })
  }

  onMouseUp(e) {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  render() {
    return (
      React.createElement(
        "div",
        {
          style: {
            position: 'absolute',
            left: this.state.left,
            top: this.state.top
          },
          className: 'draggable-container',
          onMouseDown: this.onMouseDown,
          ref: 'draggable'
        },
        this.props.children
      )
    )
  }
}


ReactDOM.render(
  React.createElement(
    Draggable,
    null,
    React.createElement(
      'strong',
      null,
      "Child component"
    )
  ),
  document.getElementById('app')
);
