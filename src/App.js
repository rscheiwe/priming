import React, { Component } from 'react';
import logo from './logo.svg';
import { Input, Button } from 'mdbreact'
import Prime from 'primes-simple'
import './App.css';

class App extends Component {

  state = {
    change:'',
    answer:[],
    random:0
  }

  handleChange = (e) => {
    this.setState({
      change:e.target.value,
      random:0
    })
  }

  handleSubstitute = (num) => {
    let answers = []
    if (parseInt(num) === 4) {
      this.setState({
        answer:[2,2]
      })
    } else {
      num.forEach((el) => answers.push(el))
      this.setState({
        answer:answers.filter((el) => el !== 1),
        random:num
      })
    }
  }

  handleNumberCheck = (val) => {
    let vals = val.split('')
    for (let i = 0; i < vals.length; i++) {
      if (isNaN(parseInt(vals[i]), 0)) return true
    }
  }

  handleRandom = (e) => {
    let min = 1000
    let max = 10000000
    this.setState({
      change:(Math.floor(Math.random() * (max - min + 1)) + min).toString()
    }, () => this.handleInt(e))
  }

  handleInt = (e) => {
    e.preventDefault()
    let testNum = Prime(parseInt(this.state.change, 0))
    if (this.handleNumberCheck(this.state.change)) {
      this.setState({
        answer:['please enter a number'],
        random:0
      })
    } else if (testNum === true) {
      this.setState({
        answer:'true',
        random:testNum
      })
    } else {
      this.handleSubstitute(testNum)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let testNum = Prime(parseInt(this.state.change, 0))
    if (this.handleNumberCheck(this.state.change)) {
      this.setState({
        answer:['please enter a number']
      })
    } else if (testNum === true) {
      this.setState({
        answer:'true',
        random:0
      })
    } else {
      this.handleSubstitute(testNum)
    }
    this.setState({
      change:''
    })
  }

  render() {
    console.log(this.state.answer)
    return (
      <div id="Stage">
        <div className="Container" >

          <h3 className='text-center' style={{fontFamily:'Orbitron'}}>Prime Factorization</h3>
          <div className='text-center'>
            <i className="fas fa-adjust"></i>
          </div>
          <p className='text-center'>Using Node.js Package <b>primes-simple</b>, authored by&nbsp;
            <a href="http://richardscheiwe.com" target='_blank'  rel="noopener noreferrer">
              Richard Scheiwe
            </a>
          </p>
          <a href='https://www.npmjs.com/package/primes-simple' target='_blank' rel="noopener noreferrer">
            <img src='https://nodei.co/npm/primes-simple.png?downloads=true&downloadRank=true&stars=true' className='center' alt="npm"/>
          </a>
          <form onSubmit={this.handleSubmit} className='text-center'>
            <Input label="Enter Your Number & Hit 'Enter'" value={this.state.change} onChange={this.handleChange}/>
          </form>
          <small><p className='text-center' style={{fontFamily:'Orbitron'}}>If prime, it'll say 'true'. If not prime, it'll print out the prime factors.</p></small>
          <div style={{padding:'5%'}}>
            <center><h2>{ this.state.answer !== 'true'
                    ? this.state.answer.map(el => (
                        <h2 style={{display:'inline', padding:'15px'}}>{ el }</h2>
                      ))
                      :
                      this.state.answer.toUpperCase()}</h2></center>
          </div>
          <div className='text-center'>
            <h2 className='text-center'>
            { this.state.random !== 0 ? <p>{this.state.change} </p> : null }
            </h2>

            <Button className='button-style' color="warning" onClick={ this.handleRandom }>
            Random</Button>


          </div>
          </div>
        </div>


    );
  }
}

export default App;
