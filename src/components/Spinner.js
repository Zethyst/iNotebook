import React, { Component } from 'react'
import Loader from './Eclipse1.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={Loader} alt="Loading" className='h-16 m-auto'/>
      </div>
    )
  }
}
