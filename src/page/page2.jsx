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

export default HocBox(Page2)
