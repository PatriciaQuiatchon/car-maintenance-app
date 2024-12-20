import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface IDialog {
    title: string
    isOpen: boolean
    isSubmitting: boolean
    handleClose: () => void
    handleSubmit: () => void
    children: React.ReactNode
}

const CustomDialog:React.FC<IDialog> = (props) => {

    const { title, isOpen, isSubmitting } = props

    const { handleClose, handleSubmit } = props

    const { children } = props

    return (
        <React.Fragment>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {title}
            </DialogTitle>
            <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
            })}
            >
            <CloseIcon />
            </IconButton>
            <DialogContent dividers>
            { children }
            </DialogContent>
            <DialogActions>
                
            { !isSubmitting && (<Button autoFocus onClick={handleClose}>
                Cancel
            </Button>)}
            <Button autoFocus disabled={isSubmitting} onClick={handleSubmit}>
                Save changes
            </Button>
            </DialogActions>
        </BootstrapDialog>
        </React.Fragment>
    );
}

export default CustomDialog;