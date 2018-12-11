import React, { Component } from 'react';
import { Emoji } from 'emoji-mart';
import axios from 'axios';
import CheckInCard from '../components/CheckInCard/CheckInCard';
import EmojiPicker from '../components/EmojiPicker/EmojiPicker';


// import { ModalManager } from '@material-ui/core';

export default class Home extends Component {
    state = {
        showEmojiPicker: false,
        selectedEmoji: {
            emoji: {},
        },
    }


    handleEmojiPickerClick = (props) => {
        this.setState({ showEmojiPicker: true });
        console.log(this.state.root.selectedEmoji);
    };

    handleEmojiSelect = (emoji) => {
        const updatedSelectedEmoji = {
            emoji: { emoji },
            date: new Date(),
        };
        this.setState({ selectedEmoji: updatedSelectedEmoji, showEmojiPicker: false });
        axios.post('https://emoji-tracker-f72cc.firebaseio.com/emoji.json', this.state.root.updatedSelectedEmoji);
    }

    render() {
        return (
            <div align="center">
                <CheckInCard
                    onEmojiPickerClick={this.handleEmojiPickerClick}
                    selectedEmoji={this.state.root.selectedEmoji.emoji}
                />
                {
                    this.state.root.showEmojiPicker
                    && <EmojiPicker onEmojiSelect={this.handleEmojiSelect} />
                }
            </div>
        );
    }
}
