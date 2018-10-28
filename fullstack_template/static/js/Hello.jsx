import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ReactDOM from "react-dom";

import { ReactMic } from "react-mic";

export default class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkerAudio: false,
      clicker: false,
      record: false,
      dilog: [],
      emotions: []
    };
    this.count = -1;
    this.getPythonHello = this.getPythonHello.bind(this);
  }

  staticRend() {
    setTimeout(function() {}.bind(this), 2000);
  }
  
  clicker() {
    if (!this.state.clicker) {
      this.startRecording();
      if (this.count === -1) {
        fetch("http://127.0.0.1:5000/data")
          .then(res => {
            return res.json();
          })
          .then(data => {
            this.setState({
              dilog: data.dialogue,
              emotions: data.emotions
            });
            return data;
          });
        this.setState({
          positionStatic: true
        });
      }
      ++this.count;

      this.setState({
        checkerAudio: true,
        clicker: true
      });
    } else {
      this.stopRecording();
      this.setState({
        clicker: false
      });
    }
  }

  getPythonHello() {
    this.clicker();
  }

  startRecording() {
    this.setState({
      record: true
    });
  }

  stopRecording() {
    this.setState({
      record: false
    });
  }

  onData(recordedBlob) {
    console.log("chunk of real-time data is: ", recordedBlob);
  }

  onStop(recordedBlob) {
    console.log("recordedBlob is: ", recordedBlob);
  }

  render() {
    const name = "Hello, User";
    const { checkerAudio, clicker, positionStatic, dilog } = this.state;
    return (
      <div className="cont" style={{ top: positionStatic ? "1%" : "30%" }}>
        <Grid>
          <Row>
            <Col md={7} mdOffset={5}>
              <h1 style={{ fontSize: positionStatic ? "30px" : "65px" }}>
                {name}
              </h1>
            </Col>
          </Row>

          <Row>
            <Col md={7} mdOffset={5} style={{ paddingTop: "15px" }}>
              <div style={{ display: "none" }}>
                <ReactMic
                  record={clicker}
                  className="sound-wave"
                  onStop={this.onStop}
                  onData={this.onData}
                />
              </div>
              <button
                style={{ backgroundColor: clicker ? "#d9534f" : "#28a745" }}
                type="button"
                onClick={this.getPythonHello}
                className={`btn btn-success btn-circle btn-xl${
                  clicker ? " btn-click-red" : ""
                }`}
              >
                <i className="fa fa-phone" />{" "}
              </button>
            </Col>
          </Row>
        </Grid>
        {positionStatic ? (
          <div className="dialog-wrapper">
            <div className="div-wrapper-line" />
            <div className="dialog-wrapper-content">
              <p
                className="info"
                style={{ visibility: clicker ? "hidden" : "visible" }}
              >
                Waiting...
              </p>

              <div className="content container-fluid bootstrap snippets">
                <div className="row row-broken">
                  <div
                    className="col-inside-lg decor-default chat"
                    style={{
                      overflow: "hidden",
                      outline: "none",
                      backgroundColor: "unset",
                      height: "unset"
                    }}
                    tabIndex="5000"
                  >
                    <div className="chat-body">
                      {this.count >= 0 ? (
                        <div className="answer left">
                          <div className="avatar">
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              alt="User name"
                            />
                            <div className="status offline" />
                          </div>
                          <div className="text">{dilog[0]}</div>
                        </div>
                      ) : (
                        ""
                      )}

                      {this.count >= 1 ? (
                        <div className="answer left">
                          <div className="avatar">
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              alt="User name"
                            />
                            <div className="status offline" />
                          </div>
                          <div className="text">{dilog[1]}</div>
                        </div>
                      ) : (
                        ""
                      )}

                      {this.count >= 2 ? (
                        <div className="answer left">
                          <div className="avatar">
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              alt="User name"
                            />
                            <div className="status offline" />
                          </div>
                          <div className="text">{dilog[2]}</div>
                        </div>
                      ) : (
                        ""
                      )}
                      {this.count >= 3 ? (
                        <div className="answer left">
                          <div className="avatar">
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              alt="User name"
                            />
                            <div className="status offline" />
                          </div>
                          <div className="text">{dilog[3]}</div>
                        </div>
                      ) : (
                        ""
                      )}
                      {this.count >= 4 ? (
                        <div className="answer left">
                          <div className="avatar">
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              alt="User name"
                            />
                            <div className="status offline" />
                          </div>
                          <div className="text">{dilog[4]}</div>
                        </div>
                      ) : (
                        ""
                      )}
                      {this.count >= 4 ? (
                        <div className="answer left">
                          <div className="avatar">
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              alt="User name"
                            />
                            <div className="status offline" />
                          </div>
                          <div className="text">{dilog[5]}</div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div id="project-wrapper">
                        <div id="project-container">
                          <div id="overlay" />
                          <div id="content" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.count === 4 ? this.staticRend() : ""}
      </div>
    );
  }
}
