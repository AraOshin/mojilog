import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Card, CardActionArea, CardActions, CardContent, Typography, Button,
} from '@material-ui/core';
import { Emoji } from 'emoji-mart';
import AddButton from '../UI/AddButton';


const styles = {
  card: {
    maxWidth: '600px',
    maxHeight: '800px',

  },
  media: {
    objectFit: 'cover',
  },
};


const CheckInCard = ({ classes, selectedEmoji, onEmojiPickerClick }) => (
  <Card className={classes.card}>
    <CardActionArea>
      <CardContent>
        <Typography gutterBottom paragraph align="center" variant="h4" component="h2" color="primary">
          Hey, How are you doing?
        </Typography>
        <Typography align="center" component="p" color="secondary">
          Take a moment to check in with yourself.
        </Typography>
        <Typography align="center" variant="h6" color="primary">
          Done ? Cool! Go ahead, pick an emoji!
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardContent>

      {!!Object.keys(selectedEmoji).length && <Emoji emoji={selectedEmoji.emoji} size={48} />}

    </CardContent>
    <CardActions>
      <AddButton onClick={onEmojiPickerClick} />
      <Button href="/calendar" size="small" color="primary">
        View History
      </Button>
    </CardActions>
  </Card>
);

CheckInCard.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedEmoji: PropTypes.object.isRequired,
  onEmojiPickerClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(CheckInCard);
