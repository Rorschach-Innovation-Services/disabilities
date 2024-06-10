import React from 'react';
import { Typography, Box, Stack, Modal, Button } from '@mui/material';

const data = {
  currenStatus: {
    title: 'Input for Current Status (Where we are now)',
    records: [
      'Not all a priority at all',
      'We may start thinking about it',
      'We are thinking about it',
      'We are partially implementing',
      'We are quite far in the process of implementing',
      'We are fully implementing',
    ],
  },
  important: {
    title: 'Input for importance (How important is this to us?)',
    records: [
      'Not important to us at all',
      'Could possibly be important, but only in the future for us',
      'Could probably be important quite soon for us',
      'Will become important for us very soon',
      'Important with some impact for us right now',
      'Very important and essential for us right now',
    ],
  },
  doAbility: {
    title: 'Input for Do-ability (Where we want to be)',
    records: [
      'Too difficult for us to do at all, ever',
      'Extremely difficult to do',
      'Difficult to do, but possible',
      'Not so difficult for us to do',
      'Easy for us to do',
      'Extremely easy for us to do',
    ],
  },
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const DisplayQuestionnaireHints = ({ open, setOpen, label }) => {
  const renderHint = (hint) => {
    return (
      <Stack direction="column" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>{hint.title}</Typography>
        {hint.records.map((record, index) => (
          <Typography>
            {index} - {record}
          </Typography>
        ))}
      </Stack>
    );
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            {label === 'current status' && renderHint(data.currenStatus)}
            {label === 'important to us' && renderHint(data.important)}
            {label === 'do ability' && renderHint(data.doAbility)}
          </Box>
          <Stack justifyContent="center" sx={{ marginTop: '20px' }}>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
