import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const AddButton = ({ classes, onClick }) => (
  <div>
    <Button onClick={onClick} mini variant="fab" color="primary" aria-label="Add" className={classes.button}>
      <AddIcon />
    </Button>
  </div>
);

AddButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddButton);
