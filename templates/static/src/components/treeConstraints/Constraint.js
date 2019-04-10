import React from 'react';

export default class Constraint extends React.Component {
    render() {
        return (  
            <div className="tags has-addons"
                style={{border: '2px solid #f5f5f5'}}>
                <button className="tag is-delete"
                    style={{marginBottom: '0'}}
                    onClick={() => this.props.handleClick(this.props.constraint)}
                    ></button>
                <span 
                    className="tag is-light is-medium"
                    style={{border: '1px', marginBottom: '0'}}
                    onClick={() => this.props.handlePlaceClick(this.props.constraint)}
                >
                    {this.props.constraint}
                </span> 
            </div>
        );
    }
}