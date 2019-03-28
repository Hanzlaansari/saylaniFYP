import React, {Component} from 'react';
import {storage} from './firebase/index'


class ImageUpload extends Component{
constructor(props){
    super(props);
    this.state={
        image:null,
        url:'',
        progress:0
     }
    this.handleChange=this.handleChange.bind(this);
    this.handleUpload=this.handleUpload.bind(this);
}
handleChange=(e)=>{
    if(e.target.files[0]){
        const image=e.target.files[0];
        this.setState({image});
    }
}
handleUpload=()=>{
    const {image}=this.state;
const uploadTask= storage.ref(`images/${image.name}`).put(image)
uploadTask.on('state_changed', 
(snapshot)=>{
// progress funcion
    const progress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
    this.setState({progress});
},
 (error)=>{
// error funcion

    console.log(error);
 }, 
 ()=>{
// complete funcion
storage.ref('images').child(image.name).getDownloadURL()
.then(url=>{
    // this.refs.img.src=url;
    this.setState({url});
    console.log(url)})

 }
 )
}
render(){

    return(
        <div>
            <input type="file" onChange={this.handleChange}/>
            <button onClick={this.handleUpload}>Upload</button>

            <progress value={this.state.progress} max="100" />
            <img ref='img' src={this.state.url} alt="Uploaded" />
        </div>
    );
}

}
export default ImageUpload;