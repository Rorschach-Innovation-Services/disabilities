import { Button, Grid } from '@mui/material';

export const LiveDashboardBanner = ({ setStep, step, doAbilityChart }) => {
  // Checking if any y-value (doAbility) is greater than or equal to 1
  const isDoAbilityValid = doAbilityChart.some(entry => 
    entry.data.some(([x, y]) => y >= 1)
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Button
          variant="text"
          onClick={() => setStep(0)}
          sx={{
            backgroundColor: step === 0 ? '#95B8DF' : 'transparent',
            color: step === 0 ? 'white' : '#95B8DF',
            width: '100%',
            ':hover': {
              backgroundColor: step === 0 ? '#95B8DF' : 'transparent',
            },
          }}
        >
          Current Status vs Important
        </Button>
      </Grid>
      {/* Render Do-ability button only if isDoAbilityValid is true */}
      {isDoAbilityValid && (
        <Grid item xs={3}>
          <Button
            variant="text"
            onClick={() => setStep(1)}
            sx={{
              backgroundColor: step === 1 ? '#95B8DF' : 'transparent',
              color: step === 1 ? 'white' : '#95B8DF',
              width: '100%',
              ':hover': {
                backgroundColor: step === 1 ? '#95B8DF' : 'transparent',
              },
            }}
          >
            Do-ability
          </Button>
        </Grid>
      )}
      {/* Render Matrix button only if isDoAbilityValid is true */}
      {isDoAbilityValid && (
        <Grid item xs={3}>
          <Button
            variant="text"
            onClick={() => setStep(2)}
            sx={{
              backgroundColor: step === 2 ? '#95B8DF' : 'transparent',
              color: step === 2 ? 'white' : '#95B8DF',
              width: '100%',
              ':hover': {
                backgroundColor: step === 2 ? '#95B8DF' : 'transparent',
              },
            }}
          >
            Matrix
          </Button>
        </Grid>
      )}
      
    </Grid>
  );
};
