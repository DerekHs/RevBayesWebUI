import React from 'react';

export default class Constraint extends React.Component {
    render() {
        return (  
            <div className="tags has-addons">
                <button className="tag is-delete"
                    onClick={() => this.props.handleClick(this.props.constraint)}
                    ></button>
                <span 
                    className="tag is-light is-medium"
                    onClick={() => this.props.handlePlaceClick(this.props.constraint)}
                >
                    {this.props.constraint}
                </span> 
            </div>
        );
    }
}