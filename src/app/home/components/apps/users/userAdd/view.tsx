import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { UserAddProps } from './types';

export default function UserAdd({
  showModal,
  values,
  errors,
  handleChangeModal,
  handleChange,
  handleSubmit,
}: UserAddProps) {
  return (
    <>
      <Box p={3} pb={1}>
        <Button color="primary" variant="contained" fullWidth onClick={handleChangeModal}>
          Add New User
        </Button>
      </Box>
      <Dialog
        open={showModal}
        onClose={handleChangeModal}
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" variant="h5">
          {'Add New User'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lets add new user for your application. fill the all field and
            <br /> click on submit button.
          </DialogContentText>
          <Box mt={3}>
            <form onSubmit={handleSubmit}>
              <Grid spacing={3} container>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Name</FormLabel>
                  <TextField
                    id="name"
                    size="small"
                    required
                    variant="outlined"
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                  />
                  <span>{errors.name}</span>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    id="email"
                    type="email"
                    required
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                  />
                  <span>{errors.email}</span>
                </Grid>

                <Grid item xs={12} lg={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                    type="submit"
                    disabled={values.name.length === 0 || values.email.length === 0}>
                    Submit
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleChangeModal}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
