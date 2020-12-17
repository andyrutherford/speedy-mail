import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';

import { ReactComponent as PaperAirplane } from '../assets/paper-plane.svg';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <PaperAirplane
            style={{
              height: '30px',
              width: '30px',
              fill: '#fff',
              marginRight: '10px',
            }}
          />
          <Typography variant='h6' className={classes.title}>
            Speedy Mail
          </Typography>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <Tooltip title={'View me on Github'} placement='left'>
              <a
                href='https://github.com/andyrutherford/speedy-mail'
                target='_blank'
                rel='noreferrer noopener'
                style={{ color: '#fff', display: 'flex', alignItems: 'center' }}
              >
                <GitHubIcon />
              </a>
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
