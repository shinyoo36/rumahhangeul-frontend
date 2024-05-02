import { Stack, Typography, Alert } from '@mui/material';
import React from 'react';

const NotificationToast = ({ message, type }) => {

  return (
    <Alert
      id="alertStyles"
      severity={type}
      icon={false}
    >
      <Stack direction="row" spacing="6" justifyContent="space-between">
        <Stack spacing="2.5">
          <Stack spacing="1">
            <Typography sx={{ fontSize: 'sm', color: 'muted' }}>
              {message}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Alert>
  );
};

export default NotificationToast;
