import { Box, Button, Divider, Grid2 as Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#b10000",
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  justifyContent: "center",
  marginTop: 'auto',
}));

const Footer = () => {

  const navigate = useNavigate()

  return (
    <FooterContainer >
      <Grid container spacing={2} my={2}>
        {/* Left Section - Contact Info */}
        <Grid size={{ xs:12, sm: 4 }}>
          <Button
                  onClick={() => { navigate("/") }}
              >
                  <img
                      src={Logo}
                      loading="lazy"
                      width={180}
                      style={{
                          // mixBlendMode: "multiply",
                          filter: "brightness(1) contrast(1)",
                      }}
                  />
              </Button>
        </Grid>
        <Grid
            size={{ xs:12, sm:4 }}
        >
          
          <Typography variant="body2" paragraph>
            Angeles City, Pampanga
          </Typography>
          <Typography variant="body2" paragraph>
            Work Time: Mon-Sat 8 am - 5 pm
          </Typography>
          <Typography variant="body2">
            <Link href="tel:+6312341542451" 
            
            sx={{
              cursor: "pointer",
              '&:hover': {
                color: 'darkgrey',
              },
            }}
            color="inherit">
              +63 1234 154 2451
            </Link>
          </Typography>
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

        {/* Right Section - Navigation */}
        <Grid
            size={{ xs:12, sm:3 }}
        >
          <Box component="nav">
            <Link
              onClick={()=> navigate("/auto-services")}
              color="inherit"
              variant="body2"
              display="block"
              gutterBottom
              sx={{
                cursor: "pointer",
                '&:hover': {
                  color: 'darkgrey',
                },
              }}
            >
              Services Offers
            </Link>
            <Link
              onClick={()=> navigate("/login")}
              color="inherit"
              variant="body2"
              display="block"
              sx={{
                cursor: "pointer",
                '&:hover': {
                  color: 'darkgrey',
                },
              }}
            >
              Register / Log In
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Divider */}
    </FooterContainer>
  );
};

export default Footer;