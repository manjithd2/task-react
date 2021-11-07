import React from "react";
import classes from './cameraStyle.module.scss';

class CApp extends React.Component {
  constructor() {
    super();

    this.state = {
      imageDataURL: null,
      access: true,
      devicePresent: true,
    };
  }

  //Start the camera, check for permissions
  initializeMedia = async () => {
    this.setState({ imageDataURL: null });

    if (!("mediaDevices" in navigator)) {
      navigator.mediaDevices = {};
    }

    if (!("getUserMedia" in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(new Error("getUserMedia Not Implemented"));
        }

        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    //Get the details of video inputs of the device
    const videoInputs = await this.getListOfVideoInputs();

    //The device has a camera
    if (videoInputs.length) {
        console.log("Permsssion")
      navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: videoInputs[0].deviceId} },
        })
        .then((stream) => {
          this.player.srcObject = stream;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.setState({devicePresent: false})
      console.log("The device does not have a camera");
    }
  };

  //Capture canvas function
  capturePicture = () => {
    var canvas = document.createElement("canvas");
    canvas.width = this.player.videoWidth;
    canvas.height = this.player.videoHeight;
    var contex = canvas.getContext("2d");
    contex.drawImage(this.player, 0, 0, canvas.width, canvas.height);
    this.player.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
    });

    console.log(canvas.toDataURL());
    this.setState({ imageDataURL: canvas.toDataURL() });
  };


  getListOfVideoInputs = async () => {
    // Get the details of audio and video output of the device
    await navigator.mediaDevices.getUserMedia({audio: false, video: true})
          .then(()=> {
            this.setState({access: true})
        }).catch(()=> {
            console.log("Permission Denied")
            this.setState({access: false})
        })
    const enumerateDevices = await navigator.mediaDevices.enumerateDevices();
    //Filter video outputs (for devices with multiple cameras)
    return enumerateDevices.filter((device) => device.kind === "videoinput");
  };

  render() {
    const playerORImage = Boolean(this.state.imageDataURL) ? (
      <img src={this.state.imageDataURL} alt="cameraPic" />
    ) : (
      <video
        ref={(refrence) => {
          this.player = refrence;
        }}
        autoPlay
      ></video>
    );

    return (
      <div className={classes.camera}>
        <div className={classes.camera__area}>
            {playerORImage}
            { !this.state.access && <div className={classes.camera__area__info}>NO CAMERA ACCESS GIVEN</div> }
            { !this.state.devicePresent && <div>NO CAMERA ON DEVICE</div> }
        
        </div>
        
        <div className={classes.camera__buttons}>
            <button onClick={this.initializeMedia}>Start Camera</button>
            <button onClick={this.capturePicture}>Capture</button>
        </div>
      </div>
    );
  }
}

export default CApp;