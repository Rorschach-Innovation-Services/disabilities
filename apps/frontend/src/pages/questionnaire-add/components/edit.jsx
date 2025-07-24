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
  const [label, setLabel] = React.useState(selected?.label || '');
  const [category, setCategory] = React.useState(selected?.category || '');

  React.useEffect(() => {
    if (selected !== null) {
      setInternalValue(selected.question);
      setHelp(selected.helperText);
      setLabel(selected.label);
      setCategory(selected.category);
    } else {
      setInternalValue('');
      setHelp('');
      setLabel('');
      setCategory('');
    }
  }, [selected]);

  const handleClose = () => {
    setInternalValue('');
    setHelp('');
    setLabel('');
    setCategory('');
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
                variant="outlined"
                label="Question"
                value={internalValue}
                onChange={(event) => setInternalValue(event.target.value)}
                sx={{
                  backgroundColor: 'white',
                  fontSize: '9px',
                  lineHeight: '11px',
                  maxHeight: '30px',
                  bordeRadius: '5px',
                  width: '300px',
                  marginLeft: '21px !important',
                }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ marginBottom: '20px !important' }}
            >
              <Typography sx={{ marginTop: '11px !important' }}>
                Variable Key:
              </Typography>
              <TextField
                variant="outlined"
                label="E.g. S = Structure/Space; C = Culture;"   
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                sx={{
                  backgroundColor: 'white',
                  fontSize: '9px',
                  lineHeight: '11px',
                  minHeight: '30px',
                  maxHeight: '130px',
                  overflowY: 'scrolll',
                  bordeRadius: '5px',
                  width: '300px',
                  marginLeft: '83px !important',
                }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ marginBottom: '20px !important' }}
            >
              <Typography sx={{ marginTop: '11px !important' }}>
                Category:
              </Typography>
              <TextField
                label="E.g. Plan/Prepare"
                variant="outlined"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                sx={{
                  backgroundColor: 'white',
                  fontSize: '9px',
                  lineHeight: '11px',
                  minHeight: '30px',
                  maxHeight: '130px',
                  overflowY: 'scrolll',
                  bordeRadius: '5px',
                  width: '300px',
                  marginLeft: '58px !important',
                }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ marginBottom: '50px !important' }}
            >
              <Typography sx={{ marginTop: '11px !important' }}>
                Additional Info:
              </Typography>
              <TextField
                multiline
                variant="outlined"
                label="Question details"
                value={help}
                onChange={(event) => setHelp(event.target.value)}
                sx={{
                  backgroundColor: 'white',
                  fontSize: '9px',
                  lineHeight: '11px',
                  minHeight: '30px',
                  maxHeight: '130px',
                  overflowY: 'scroll',
                  bordeRadius: '5px',
                  width: '300px',
                  marginLeft: '19px !important',
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
                      label,
                      category,
                    });
                  else
                    onChange({
                      question: internalValue,
                      helperText: help,
                      label,
                      category,
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
