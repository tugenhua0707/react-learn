## React总结下
<h3>一：生命周期</h3>
<p>共提供了10个不同的生命周期；</p>
<ol>
  <li>
    <span>getDefaultProps</span>
    <span>用于组件类，只调用一次，返回对象用于设置默认的props，对于引用值，会在实例中共享。</span>
  </li>
  <li>
    <span>getInitialState</span>
    <span>作用于组件的实例，在实例创建时调用一次，用于初始化每个实例的state，可以访问this.props</span>
  </li>
  <li>
    <span>componentWillMount</span>
    <span>在完成首次渲染之前调用，可以修改组件state</span>
  </li>
  <li>
    <span>render</span>
    <span>创建虚拟dom，规则如下：</span>
    <p>只能出现一个顶级组件(不能返回数组)</p>
    <p>不能改变组件的状态</p>
    <p>不能修改DOM的输出</p>
  </li>
  <li>
    <span>componentDidMount</span>
    <span>真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素。此时已可以使用其他类库来操作这个DOM。</span>
  </li>
  <li>
    <span>componentWillReceiveProps</span>
    <span>组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state。</span>
  </li>
  <li>
    <span>shouldComponentUpdate</span>
    <span>组件是否应当渲染新的props或state，返回false表示跳过后续的生命周期方法</span>
  </li>
  <li>
    <span>componentWillUpdate</span>
    <span>接收到新的props或者state后，进行渲染之前调用，此时不允许更新props或state.</span>
  </li>
  <li>
    <span>componentDidUpdate</span>
    <span>完成渲染新的props或者state后调用，此时可以访问到新的DOM元素.</span>
  </li>
  <li>
    <span>componentWillUnmount</span>
    <span>组件被移除之前被调用，可以用于做一些清理工作，在componentDidMount方法中添加的所有任务都需要在该方法中撤销，比如创建的定时器或添加的事件监听器。</span>
  </li>
</ol>
<h3>二：React组件之间的传值</h3>
<p>组件之间的传值分为几种：</p>
<ol>
  <li>父组件向子组件传值</li>
  <li>子组件向父组件传值</li>
</ol>
<h3>一：父组件向子组件传值</h3>
<p>代码如下：</p>
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
      document.getElspanentById('root')
    )
<h3>二：子组件向父组件传值</h3>
<p>比如一个点击元素，子元素点击后，获得一个状态，然后告诉父级元素，父级元素显示出来；</p>
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
      document.getElspanentById('root')
    )
<p>
  如上代码：默认情况下，父组件设置一个属性值为false，子元素渲染的时候，获取该属性，初步渲染checkbox框，然后
  当用户点击的时候，该属性变为true，然后调用父元素的方法，父元素的方法重新设置值，再调用render方法；把信息展示到
  页面上来；
</p>
<h3>ReactJS条件判断的几种方法如下：</h3>
<ol>
  <li>使用三元运算符</li>
  <li>设置一个变量，调用函数，并在属性中引用它</li>
</ol>
<h3>1. 三元运算符</h3>
    var ParentClass = React.createClass({
      getInitialState: function(){
        return {
          isFalg: true
        }
      },
      render: function(){
        return (
          <div className = {this.state.isFalg ? 'className' : ''}>xxxx</div>
        )
      }
    });
<h3>2. 设置一个变量，并在属性中引用它</h3>
    var ParentClass = React.createClass({
      getInitialState:function () {
         return { isFalg: true };
      },
      getIsComplete:function(){
        return this.state.isFalg ? 'is-complete' : '' ;
      },
      render: function () {
        var isFalg = this.getIsComplete();
        return(
            <div className={ isFalg }> Hello Ivan .</div>
        );
      }
    });
<h3>3. Mixins</h3>
<p>不同的组件共用一些功能，共享一部分代码，React提供了mixins这种方式来处理这种问题。</p>
<p>比如如下代码；定义一个SetIntervalMixin对象，里面包含两个方法，然后在TickTock对象内调用Mixins把SetIntervalMixin对象包含进来；就可以调用该方法，我们可以把Mixins理解成javascript中的继承即可~(类似而已)</p>
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
      document.getElspanentById("root")
    )
<h3>4.{...obj} 来批量设置一个对象的键值</h3>
<p>可以用通过 {...obj} 来批量设置一个对象的键值对到组件的属性，注意顺序,因为相同的属性可以被覆盖,</p>
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
      document.getElspanentById("root")
    );
<p>
  上面定义了一个user对象，然后调用HelloMessage组件，使用{...user}设置一个对象的属性，上面可以看到
  有相同的属性name，这会涉及到覆盖的问题，比如自己定义的name属性在 设置的对象属性{...user}的后面的
  话，那么被设置的{...user}的属性中的name属性会被覆盖掉，反之，自定义的name属性会被{...user}对象
  中的name属性覆盖；
</p>
<h3>5. DOM操作</h3>
<p>1.findDOMNode</p>
<p>
当组件加载到页面上之后(componentDidMount),就可以通过findDOMNode()方法
拿到组件对应的DOM元素。如下代码：
</p>
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
    React.render(<Test />, document.getElspanentById("root"));
<p>
  2. Refs
</p>
<p>
  另外一种方式是通过在要引用的DOM元素上设置一个ref属性指定一个名称，然后通过 this.refs.name 来访问对应的DOM元素。
</p>
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
    React.render(<App />, document.getElspanentById("root"));
<p>
  如上代码；页面有一个input框，当用户输入值的时候，点击 Click to Focus And Reset 就可以清空值；且当前的焦点
  重新聚焦；我们可以打印出console.log(this.refs.theInput.getDOMNode()); 说明是当前被点击的元素input；
</p>
<h3>6. React中的类名操作 </h3>
<p>classSet()是一个简洁的工具，用于简单操作DOM中的class字符串。</p>
<p>下面我们不适用classSet()为元素添加类名可能如下代码：</p>
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
    React.render(<ClassSet isHello = "aa"/>, document.getElspanentById("root"));
<p>
  默认div元素有message类名；如果有isHello属性的话，添加hello类名；如果有world属性的话，添加
  world类名；这样的话，看起来挺不友好的；接下来会看看一些插件的使用；
</p>
<h2>待续总结~~~~</h2>