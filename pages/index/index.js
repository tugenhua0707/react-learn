
var css = require('./index.styl');

import React from 'react'
import ReactDOM from 'react-dom'

if (module.hot) {
  module.hot.accept()
}
/*
ReactDOM.render(
  <div>
    <p>快!修改我试试看!</p>
  </div>,
  document.getElementById('root')
)
*/
/*
// 父组件
var ParentContainer = React.createClass({
  getInitialState: function(){
    return {
      checked: true
    }
  },
  render: function(){
    return (
      <Child text="child" checked={this.state.checked} />
    )
  }
});
// 子组件
var Child = React.createClass({
   render: function(){
     // 从父组件获取的值
     var checked = this.props.checked,
         text = this.props.text;
     return (
        <label>{text}:<input type="checkbox" checked={checked}/></label>
     )
   }
});
ReactDOM.render(
  <ParentContainer />,
  document.getElementById('root')
)
*/
/*
// 父组件
var ParentContainer = React.createClass({
  getInitialState: function(){
    return {
      checked: false
    }
  },
  onChildChanged: function(newState) {
    this.setState({
      checked: newState
    });
  },
  render: function(){
    var isChecked = this.state.checked ? 'yes' : 'no';
    return (
      <div>
        <div>Are you checked: {isChecked}</div>
        <Child text="child" checked={this.state.checked} callbackParent={this.onChildChanged}/>
      </div>
      
    )
  }
});
// 子组件
var Child = React.createClass({
   getInitialState: function(){
    return {
      checked: this.props.checked
    }
   },
   onTextChange: function(){
     var newState = !this.state.checked;
     this.setState({
       checked: newState
     });
     this.props.callbackParent(newState);
   },
   render: function(){
     // 组件自身的状态数据
     var checked = this.state.checked;

     // 从父组件获取的值
     var text = this.props.text;
     return (
        <label>{text}:<input type="checkbox" checked={checked} onChange={this.onTextChange}/></label>
     )
   }
});
ReactDOM.render(
  <ParentContainer />,
  document.getElementById('root')
)
*/
/*
var SetIntervalMixin = {
  componentWillMount: function(){
    this.intervals = [];
  },
  setInterval: function(){
    this.intervals.push(setInterval.apply(null,arguments));
  }
};
var TickTock = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function(){
    return {seconds:0};
  },
  componentDidMount: function(){
    this.setInterval(this.tick,1000); // 调用SetIntervalMixin的方法
  },
  tick: function(){
    this.setState({seconds:this.state.seconds + 1});
  },
  render: function(){
    return (
      <p>hello world{this.state.seconds}</p>
    )
  }
});
React.render(
  <TickTock />,
  document.getElementById("root")
)

var HelloMessage = React.createClass({
  render: function(){
    return (
      <div>name: {this.props.name},age:{this.props.age}</div>
    )
  }
});
var user = {"name":'kongzhi',age:29};
React.render(
  <HelloMessage name="override name" {...user}/>,
  document.getElementById("root")
);
var Test = React.createClass({
  componentDidMount: function(){
    var dom = React.findDOMNode(this);
    console.log(dom);
  },
  render: function(){
    return (
      <div>hello world</div>
    )
  }
});
React.render(<Test />, document.getElementById("root"));
*/
/*
var App = React.createClass({
  getInitialState: function(){
    return {userInput:''};
  },
  handleChange: function(e){
    this.setState({userInput:e.target.value});
  },
  clearAndFoucsInput: function(){
    this.setState({userInput:''},function(){
      console.log(this.refs.theInput.getDOMNode());// 当前点击的元素
      this.refs.theInput.getDOMNode().focus();
    });
  },
  render: function(){
    return (
      <div>
        <div onClick = {this.clearAndFoucsInput}>Click to Focus And Reset</div>
        <input ref="theInput" value={this.state.userInput} onChange={this.handleChange}/>
      </div>
    )
  }
});
React.render(<App />, document.getElementById("root"));
*/
/*
var ClassSet = React.createClass({
  render: function(){
    var classString = 'message';
    if(this.props.isHello) {
      classString += ' hello';
    }
    if(this.props.world) {
      classString += ' world';
    }
    return (
      <div className={classString}>hello world!!</div>
    )
  }
});
React.render(<ClassSet isHello = "aa"/>, document.getElementById("root"));
*/