import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import themeConfig from 'src/configs/themeConfig';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' },
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  },
}));

const LoginPage = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const theme = useTheme();
  const router = useRouter();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
// For example, in a component file
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Now, you can use apiUrl in your component as needed

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/login/`, {
        username: values.username,
        password: values.password,
      });
      

      // Assuming the server returns a token upon successful login
      const token = response.data.access;
      localStorage.setItem('accessToken', token);
      if (values.username == 'admin') {
        localStorage.setItem('identifier', 'admin');
        router.push('/tables/doctors');
      } else if (values.username == 'doctor') {
        localStorage.setItem('identifier', 'doctor');
        router.push('/tables/patients');
      } else if (values.username == 'patient') {
        router.push('/tables/test-reports');
        localStorage.setItem('identifier', 'patient');
      }

    } catch (error) {
      setSnackbarSeverity('error');
      if(window.location.port != '3000'){
        setSnackbarMessage('Phishing Attact detected!, Database frozen.');
      }else{
        setSnackbarMessage('Account Hacking detected!, Database frozen.');
      }
      setOpenSnackbar(true);
      // Handle login error
      console.error('Login failed:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (

    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}>
          {/* ... (existing code) */}
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            {/* <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}!
            </Typography> */}
            <Typography variant='body2'></Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              id='username'
              label='username'
              sx={{ marginBottom: 4 }}
              value={values.username}
              onChange={handleChange('username')}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <Link passHref href='/'>
                <LinkStyled onClick={(e) => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* Snackbar for success or error message */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%', backgroundColor: 'brown', color: 'white' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <FooterIllustrationsV1 />
    </Box>
  );
};

LoginPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default LoginPage;
