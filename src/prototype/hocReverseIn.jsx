import React, { Component } from 'react'

export default WrappedComponent => {
  return class Enhancer extends WrappedComponent {
    
    componentWillMount() {
      console.log(this)
      // 可以打印this，看一看，相当于继承了传过来的组件，可以直接操作state，事件等
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