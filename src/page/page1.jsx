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

export default HocBox(Page1)
