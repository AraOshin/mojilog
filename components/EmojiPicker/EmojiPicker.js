/* eslint-disable react/prefer-stateless-function */
// Stateful component needed for OutsideClickHandler

import React, { Component } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';

class EmojiPicker extends Component {
  static propTypes = {
    onEmojiSelect: PropTypes.func,
    onOutsideClick: PropTypes.func,
    style: PropTypes.object,
  };

  render() {
    const {
      onEmojiSelect,
      onOutsideClick,
      style,
    } = this.props;

    return (
      <OutsideClickHandler onOutsideClick={onOutsideClick}>
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
      </OutsideClickHandler>
    );
  }
}

export default EmojiPicker;
