import React, { Component } from 'react';
import { Emoji } from 'emoji-mart';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
import './EmojiArt.css';
import {
  withStyles, Paper, Card, RootRef, Typography, CardContent,
} from '@material-ui/core';


export default class EmojiArtLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paintedEmojis: [
      ],
      emoji: null,
      canvasRect: {},
    };
    this.cardRef = React.createRef();
  }

  componentDidMount() {
    this.storeCanvasRect();
  }

  storeCanvasRect = () => {
    const canvas = this.cardRef.current.getBoundingClientRect();
    this.setState({ canvasRect: canvas });
  }


  componentDidMount = () => {
    window.addEventListener('mousemove', (e) => {
      if (this.state.emoji) {
        const newPaintedEmoji = {
          x: e.clientX,
          y: e.clientY,
          emoji: this.state.emoji,
        };

        const updatedPaintedEmojis = [
          ...this.state.paintedEmojis,
          newPaintedEmoji,
        ];
        this.setState({ paintedEmojis: updatedPaintedEmojis });
      }
    });
  }

  handleEmojiSelect = (emoji) => {
    this.setState({ emoji: { emoji } });
  }


  render() {
    return (
      <div className="emoji-art-container">
        <Paper className="side-bar">
          <Typography gutterBottom paragraph align="center" variant="h4" component="h2" color="primary">
            Pick an Emoji to ART with
          </Typography>
          <EmojiPicker
            style={{
              position: 'relative', zIndex: 100,
            }}
            onEmojiSelect={this.handleEmojiSelect}
          />

        </Paper>
        <RootRef rootRef={this.cardRef}>
          <Card className="canvas">
            {console.log(this.state.canvasRect)}

            {this.state.paintedEmojis.map(paintedEmoji => (
              <div style={{ position: 'absolute', top: paintedEmoji.y, left: paintedEmoji.x }}>
                <Emoji emoji={paintedEmoji.emoji.emoji.id} size={48} />
              </div>
            ))}
          </Card>
        </RootRef>

      </div>

    );
  }
}
