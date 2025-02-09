import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, useTheme } from '@mui/material';

interface ICardDetails {
    open: boolean
    setOpen: () => void
    icon: ReactNode
    name: string
    description: string
    price: string
}

const CardDetails: FC<ICardDetails> = ({
    open, setOpen, name, description, price, icon
}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const navigateTo = localStorage.getItem("site") ? "repair-request" : "login"
    return (
        <Dialog
            open={open}
            onClose={setOpen}
            aria-labelledby="service-dialog"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="service-dialog">
                <Box display="flex" alignItems="center">
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: "#b10000",
                            color: 'white',
                            borderRadius: '50%',
                            width: 48,
                            height: 48,
                            mr: 2,
                            boxShadow: 2
                        }}
                    >
                        {icon}
                    </Box>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            fontWeight: 600,
                            color: theme.palette.text.primary
                        }}
                    >
                        {name}
                    </Typography>
                </Box>
            </DialogTitle>
            
            <Divider sx={{ mx: 3 }} />

            <DialogContent>
                <Box py={2}>
                    <DialogContentText
                        sx={{
                            fontSize: '1.5rem',
                            lineHeight: 1.6,
                            color: theme.palette.text.secondary,
                            mb: 3
                        }}
                    >
                        {description}
                    </DialogContentText>
                    <Typography
                        variant="h5"
                        sx={{
                            color: theme.palette.success.main,
                            fontWeight: 700,
                            textAlign: 'right'
                        }}
                    >
                        {price}
                    </Typography>
                </Box>
            </DialogContent>

            <Divider sx={{ mx: 3 }} />

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                
                    onClick={() => navigate(`/${navigateTo}?query=openForm`)}
                    sx={{
                        py: 1.5,
                        fontSize: '1.1rem',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        backgroundColor:'#b10000',
                    }}
                >
                    Request a Repair
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CardDetails;