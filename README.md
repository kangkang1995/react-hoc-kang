项目下载之后：
  1. npm i
  2. npm run start
---

> 记录一下 高阶组件 的建立（也希望能帮助看的这篇文章的人），这篇文章主要是 教你构建一个hoc的事例，更详细深入的还是需要继续看其他文章

#### 高阶组件通过包裹被传入的React组件，经过处理，最终返回(return)一个相对增强的React组件，供其他组件调用。

* **高阶组件**
    * **属性代理**  (属性代理顾名思义，就是替代的意思。高阶组件替传入组件管理控制props里面一切属性，管理控制包括增，删，改，查。同时他自身还有自身的状态，即state，来强化传入组件。)

    * **反向继承**  (属性代理方式在高阶组件中返回的组件继承的是Component，而反向继承则是继承的传入组件，根据继承的特性，继承可获取父类的所有静态资源，非私有属性和方法，且根据情况可对原方法进行重写。所以反向继承的方式也可以操作传入组件的props以及state。还有一个更重的就是反向继承可以进行渲染劫持。)


1.用<a href="https://github.com/facebook/create-react-app" target="_blank">create-react-app</a>快速构建 一个项目

```
<!--如果构建 失败 请 阅读上面create-react-app的文章，估计是你node版本低了-->
 npx create-react-app my-app
```

#### 属性代理 事例

2. 建立下列目录
    * page 文件夹
       - page1.jsx
       - page2.jsx
       - hocBox.jsx
      
3. page1.jsx
```javascript
    
    import React, { Component } from 'react'
    import HocBox from './hocBox'
    
    class Page1 extends Component{
      
      render() {
        console.log(this.props)
        return <React.Fragment>
          <h2>{this.props.data}</h2>
          <div>
            这是组件Page1自己的内容
          </div>
          {this.props._renderContent()}
          <div>
            <button onClick={()=>{this.props._alert('1')}}>点击事件</button>
          </div>
        </React.Fragment>
      }
    }
    
    export default HocBox(Page1) //这是把组件传入高阶组件

```
4. page2.jsx
```javascript
    import React, { Component } from 'react'
    import HocBox from './hocBox'
    
    class Page2 extends Component{
     
      render() {
        return <React.Fragment>
          <h2>{this.props.data}</h2>
          <div>
            这是组件Page2自己的内容
          </div>
          {this.props._renderContent()}
          <div>
            <button onClick={()=>{this.props._alert('1')}}>点击事件</button>
          </div>
        </React.Fragment>
      }
    }
    
    export default HocBox(Page2) //这是把组件传入高阶组件

```

5. hocBox.jsx
```javascript
    import React, { Component } from 'react'

    const withStorage = WrappedComponent => {
      return class extends Component{
    
        
        componentWillMount() {
          let data = "这是hoc的data"
          this.setState({ data })
        }
    
        _renderContent = () =>{
          return <div>
            这是 hoc 的content 内容
          </div>
        }
    
        _alert = () =>{
          alert('alert')
        }
    
        render() {
          return <WrappedComponent _alert={this._alert}  _renderContent={this._renderContent} data={this.state.data} {...this.props}/> 
        }
      }
    }
    
    export default withStorage

```

6. App.js 改写一下
```javascript
    import React from 'react';
    import Page1 from './page/page1'; //也可以引入page2
    import './App.css';
    
    function App() {
      return (
        <div className="App">
          <Page1/>
        </div>
      );
    }
    
    export default App;

```

> 理解

1. page1，page2 文件因为都公用 data数据，_renderContent组件，_alert方法。
所以此时就可以 提取一个hoc了
2. hocBox 把1的公用东西 统一封装 然后返回给 page1，page2
3. 个人感觉 当把 page1，page2 传入 hocBox高阶组件之后，hocBox就相当于是父组件，page1，page2相当于是子组件，平时的 **父传子** 的 传参，调用方法 都可以相同方法 进行操作


#### 反向继承 事例

1. 建立下列目录
    * prototype 文件夹
       - hocReverseIn.jsx
       - reverseInput.jsx


2. reverseInput.jsx

```javascript
    import React, { Component } from 'react';
    import HocReverseIn from './hocReverseIn';
    class ReverseInput extends Component{
      constructor(props){
          super(props);
          this.state = {
              value:''
          }
      }
      // 这个 地方可写可不写 
      toSubmit = () => {}
    
      // 处理输入值变化动作。定义了方法没有方法实体
      valueChange = (e) => {}
    
      render(){
          const { value } = this.state;
          return (
              <div>
                  <input onChange={this.valueChange} value={value}/>
                  <button onClick={this.toSubmit}>提交</button>
              </div>
          )
      }
    }
    
    export default HocReverseIn(ReverseInput)
```

3. hocReverseIn.jsx
```javascript

    import React, { Component } from 'react'
    export default WrappedComponent => {
      return class Enhancer extends WrappedComponent {
        
        componentWillMount() {
            // 可以打印this，看一看，相当于继承了传过来的组件，可以直接操作state，事件等
          console.log(this)
        }
    
        toSubmit = () => {
          alert("我是hoc的 toSubmit")
        }
    
        valueChange = (e) => {
          let value = e.target.value;
          console.log(value)
          this.setState({
            value
          })
        }
    
        render() {
          return super.render();
        }
      }
    }
```

4. App.js 改写一下
```javascript
    import React from 'react';
    import Page1 from './page/page1'; //也可以引入page2
    import ReverseInput from './prototype/reverseInput';
    import './App.css';
    
    function App() {
      return (
        <div className="App">
          <!--<Page1/>-->
          <ReverseInput/>
        </div>
      );
    }
    
    export default App;

```

> 理解

1. 反向继承允许高阶组件通过 this 关键词获取 WrappedComponent，意味着它可以获取到 state，props，组件生命周期（Component Lifecycle）钩子，以及渲染方法（render）

---


> 总结 

1.  **属性代理** 方式在高阶组件中返回的组件继承的是Component
2.  而**反向继承**则是继承的传入组件，根据继承的特性，继承可获取父类的所有静态资源，非私有属性和方法，且根据情况可对原方法进行重写。所以反向继承的方式也可以操作传入组件的props以及state。还有一个更重的就是反向继承可以进行渲染劫持。
3. 不要在render方法内部使用高阶组件。简单来说react的差分算法会去比较 NowElement === OldElement, 来决定要不要替换这个elementTree。也就是如果你每次返回的结果都不是一个引用，react以为发生了变化，去更替这个组件会导致之前组件的状态丢失。


参考下列文章：
- <a href="https://segmentfault.com/a/1190000010845410" target="_blank">React 高阶组件浅析</a>
- <a href="https://blog.csdn.net/wjk_along/article/details/83479686">R6- React高阶组件详解</a>
- <a href="https://www.jianshu.com/p/0aae7d4d9bc1">深入理解 React 高阶组件</a>