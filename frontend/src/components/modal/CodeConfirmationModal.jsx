import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const CodeConfirmationModal = ({ open, handleClose, handleSubmit }) => {
  const [code, setCode] = useState('');

  const handleInputChange = (event) => {
    setCode(event.target.value);
  };

  const onSubmit = () => {
    handleSubmit(code);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="code-confirmation-modal-title"
      aria-describedby="code-confirmation-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="code-confirmation-modal-title" variant="h6" component="h2">
          Enter Confirmation Code
        </Typography>
        <TextField
          fullWidth
          label="Confirmation Code"
          variant="outlined"
          value={code}
          onChange={handleInputChange}
          sx={{ my: 2 }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={onSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default CodeConfirmationModal;
