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
      return <WrappedComponent  _alert={this._alert}  _renderContent={this._renderContent} data={this.state.data} {...this.props}/> 
    }
  }
}

export default withStorage
