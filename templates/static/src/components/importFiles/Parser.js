import React from 'react';


class Parser extends React.Component {
  constructor(props) {
    super(props)
    this.state = { imageURL: ''}
    
}

    onChange(e) {
        e.preventDefault();

        let file = document.getElementById('fileUp').files[0];
        let fileName = file.name;

        console.log(fileName);

        console.log(file);
        const formData = new FormData();
    

        formData.append("file", file);
        formData.append("filename", fileName);

        fetch("http://127.0.0.1:5000/api/upload", {
            method: "POST",
            body: formData
        });

        
    }



  render() {
    return (
        <div onSubmit={this.onFormSubmit}>
            <h1>File Upload</h1>
            <input 
                className="file-input"
                onChange={(e) => this.onChange(e)}
                type="file"
                name="file"
                id="fileUp"
                multiple
            />
        </div>
    )
  }
}

export default Parser
