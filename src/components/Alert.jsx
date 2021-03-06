import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export default function TransitionAlerts(props) {
  const [open, setOpen] = React.useState(props.alert);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
        style={{position: "fixed",top: "1%"}} 
        severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                props.setAlert(false);
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {props.children}
        </Alert>
      </Collapse>
    </Box>
  );
}
