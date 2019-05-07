import React from 'react';

export default class Constraint extends React.Component {
    render() {
        return (  
            <div className="tags has-addons">
                <span className="tag is-link"
                    onClick={() => this.props.handlePlaceClick(this.props.constraint)}
                >
                    {this.props.constraint}
                </span> 
                <a className="tag is-delete"
                        onClick={() => this.props.handleClick(this.props.constraint)}
                    ></a>
            </div>
        );
    }
}