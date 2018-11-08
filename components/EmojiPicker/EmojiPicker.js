import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';

const EmojiPicker = ({ onEmojiSelect, style }) => (
  <div>
    <Picker
      title="Pick-a-moji"
      emoji="strawberry"
      set="apple"
      onSelect={onEmojiSelect}
      style={style || {
        position: 'absolute', top: '50%', right: '50%', transform: 'translate(50%, -50%)',
      }}
    />
  </div>
);

EmojiPicker.propTypes = {
  onEmojiSelect: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
};


export default EmojiPicker;
