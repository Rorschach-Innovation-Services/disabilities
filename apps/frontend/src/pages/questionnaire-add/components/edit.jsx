import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Stack,
  TextField,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

export const EditQuestion = ({
  clientCount,
  open,
  setOpen,
  selected,
  onChange,
}) => {
  const [internalValue, setInternalValue] = React.useState(
    selected?.question || ''
  );
  const [help, setHelp] = React.useState(selected?.helperText || '');

  React.useEffect(() => {
    if (selected !== null) {
      setInternalValue(selected.question);
      setHelp(selected.helperText);
    } else {
      setInternalValue('');
      setHelp('');
    }
  }, [selected]);

  const handleClose = () => {
    setInternalValue('');
    setHelp('');
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown={true}
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ marginBottom: '30px !important' }}
            >
              <Typography sx={{ marginTop: '11px !important' }}>
                Question Title:
              </Typography>
              <TextField
                label="Outlined"
                variant="outlined"
                value={internalValue}
                onChange={(event) => setInternalValue(event.target.value)}
                sx={{
                  backgroundColor: 'white',
                  fontSize: '9px',
                  lineHeight: '11px',
                  maxHeight: '30px',
                  bordeRadius: '5px',
                  width: '300px',
                  marginLeft: '25px !important',
                }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ marginBottom: '50px !important' }}
            >
              <Typography sx={{ marginTop: '11px !important' }}>
                Helper Text:
              </Typography>
              <TextField
                label="Outlined"
                variant="outlined"
                value={help}
                onChange={(event) => setHelp(event.target.value)}
                sx={{
                  backgroundColor: 'white',
                  fontSize: '9px',
                  lineHeight: '11px',
                  maxHeight: '30px',
                  bordeRadius: '5px',
                  width: '300px',
                  marginLeft: '45px !important',
                }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: 'center' }}
            >
              <Button variant="outlined" onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  if (selected !== null)
                    onChange({
                      ...selected,
                      question: internalValue,
                      helperText: help,
                    });
                  else
                    onChange({
                      question: internalValue,
                      helperText: help,
                    });
                  handleClose();
                }}
              >
                {selected === null ? 'Create' : 'Update'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
