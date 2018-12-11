// import React, { Component } from 'react';
// import { Emoji } from 'emoji-mart';
// import EmojiPicker from '../components/EmojiPicker/EmojiPicker';


// export default class EmojiArt extends Component {
//   state= {
//     paintedEmojis: [

//     ],
//     emoji: null,
//   }

//   componentDidMount = () => {
//     window.addEventListener('mousemove', (e) => {
//       if (this.state.root.emoji) {
//         const newPaintedEmoji = {
//           x: e.clientX,
//           y: e.clientY,
//           emoji: this.state.root.emoji,
//         };

//         const updatedPaintedEmojis = [
//           ...this.state.root.paintedEmojis,
//           newPaintedEmoji,
//         ];
//         this.setState({ paintedEmojis: updatedPaintedEmojis });
//       }
//     });
//   }

//   handleEmojiSelect = (emoji) => {
//     this.setState({ emoji: { emoji } });
//     console.log(this.state;
//   }


//   render() {
//     return (
//       <div>
//         <EmojiPicker
//           style={{
//             position: 'absolute', top: '15%', right: '0%', transform: 'translate(0%, 0%)', zIndex: 100,
//           }}
//           onEmojiSelect={this.handleEmojiSelect}
//         />
//         {this.state.root.paintedEmojis.map(paintedEmoji => (
//           <div style={{ position: 'absolute', top: paintedEmoji.y, left: paintedEmoji.x }}>
//             <Emoji emoji={paintedEmoji.emoji.emoji.id} size={48} />
//           </div>
//         ))}
//       </div>

//     );
//   }
// }
