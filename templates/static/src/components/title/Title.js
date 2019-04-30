import React from 'react';

export default class Title extends React.Component {
    render() {
        return (
        <section className="hero">
          <div className="hero-head">
            <div className="container"><p style={{color: "white"}}>_</p></div>
          </div>
          <div className="hero-foot">
            <div className="container">
              <h1 className="title is-1">RevScripter</h1>
              <p class="subtitle">
                Code generation for <a href="https://revbayes.github.io">RevBayes</a>
              </p>
            </div>
          </div>
        </section>
        )
    }
}