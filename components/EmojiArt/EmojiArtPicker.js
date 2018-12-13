/* eslint-disable react/prefer-stateless-function */
// Stateful component needed for OutsideClickHandler

import React, { Component } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';


class EmojiArtPicker extends Component {
  static propTypes = {
    onEmojiSelect: PropTypes.func,

    style: PropTypes.object,
  };

  render() {
    const {
      onEmojiSelect,
      style,
    } = this.props;

    return (
      <div>
        <Picker
          title="Pick-a-moji"
          emoji="strawberry"
          set="apple"
          onSelect={onEmojiSelect}
          style={style || {
            position: 'absolute', top: '50%', right: '50%', transform: 'translate(50%, -50%)', zIndex: '2',
          }}
        />
      </div>

    );
  }
}

export default EmojiArtPicker;
