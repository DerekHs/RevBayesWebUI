import React from 'react';

var origin = window.location.origin;

export default class AddFileButton extends React.Component {

    state = {
        isLoading: false,
        species: []
    }

    handleSubmit(e) {
        e.preventDefault();
        var url = origin + '/api/parse';
        var path = this.props.path;

    }
    render() {
        return (
            false
        )
    }
    
}


