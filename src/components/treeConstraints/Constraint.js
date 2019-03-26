import React from 'react';

export default class Constraint extends React.Component {
    render() {
        return (  
            <div className="tags has-addons"
                style={{border: '2px solid #f5f5f5'}}>
                <button className="tag is-delete"
                    style={{padding: '8px', border: '2px solid'}}
                    onClick={() => this.props.handleClick(this.props.constraint)}
                    ></button>
                <span 
                    className="tag is-light is-medium"
                    style={{borderBottom: '1px solid #ccc'}}
                >
                    {this.props.constraint}
                </span> 
            </div>
        );
    }
}