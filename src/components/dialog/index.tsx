import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { blueGrey } from '@mui/material/colors';
import { SaveAlt } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

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
    isSubmitButtonDisabled:boolean
}

const CustomDialog:React.FC<IDialog> = (props) => {

    const { title, isOpen, isSubmitting, isSubmitButtonDisabled } = props

    const { handleClose, handleSubmit } = props

    const { children } = props

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            fullWidth
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
            <LoadingButton
             type="submit" variant='contained' autoFocus disabled={isSubmitting || isSubmitButtonDisabled}
            // style={{ color: "whitesmoke" }}
            sx={{ color: "whitesmoke", backgroundColor: blueGrey[900]}}
            loading={isSubmitting}
            loadingPosition="start"
            startIcon={<SaveAlt />}
            onClick={handleSubmit}
          >
            Save Changes
          </LoadingButton>
            {/* <Button type="submit" variant='contained' autoFocus disabled={isSubmitting || isSubmitButtonDisabled} onClick={handleSubmit}>
                Save changes
            </Button> */}
            </DialogActions>
        </BootstrapDialog>
    );
}

export default CustomDialog;