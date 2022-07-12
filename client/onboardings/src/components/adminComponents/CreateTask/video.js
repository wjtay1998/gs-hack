import * as React from 'react';
import ReactPlayer from'react-player';


class Video extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      'playingVideo': false,
       URL: props.URL,
    }
  }

  playVideo() {
    // You can use the play method as normal on your video ref
    // debugger;
    this.setState({'playingVideo':true})
    //this.refs.vidRef.getInternalPlayer().playVideo()
  }
  
  pauseVideo() {
    // Pause as well
    this.refs.vidRef.getInternalPlayer().pauseVideo()
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props != prevProps) {
      this.setState({URL:this.props.URL})
    }
  }
  
  // You can pass your function references to your child components as props (here passing down to the Buttons component)
  render() {

    return(
      <div>
        <ReactPlayer url={this.state.URL}
            width="100%"
            pip={true}
            ref="vidRef" 
            controls={true}
            playing={this.state.playingVideo}
          ></ReactPlayer>
      </div>
    );
  }
}

export default Video