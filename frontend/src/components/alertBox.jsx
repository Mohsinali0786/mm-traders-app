import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function SimpleAlert({message,status,className,style}) {
  return (
    // <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
    <Alert className={className} severity={status? status : "success"} style={style} sx={{ whiteSpace: 'pre-line' }}>
      {message}
    </Alert>
  );
}