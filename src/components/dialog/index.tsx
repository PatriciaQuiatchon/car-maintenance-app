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

    return (<BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        fullWidth
        maxWidth="sm" // Adjust this to "xs", "md", etc., based on your needs
      >
        <DialogTitle
          sx={{
            m: 0,
            p: { xs: 1, sm: 2 }, // Smaller padding on smaller screens
            letterSpacing: 2,
            color: "#1f222a",
            textTransform: "uppercase",
            fontSize: { xs: "1rem", sm: "1.25rem" }, // Adjust font size
          }}
          id="customized-dialog-title"
        >
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers
          sx={{
            p: { xs: 1.5, sm: 3 }, // Adjust padding for content
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {children}
        </DialogContent>
        <DialogActions
          sx={{
            p: { xs: 1, sm: 2 }, // Smaller padding for actions
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {!isSubmitting && (
            <Button
              sx={{
                color: "#1f222a",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
              autoFocus
              onClick={handleClose}
            >
              Cancel
            </Button>
          )}
          <LoadingButton
            type="submit"
            variant="contained"
            autoFocus
            disabled={isSubmitting || isSubmitButtonDisabled}
            sx={{
              color: "whitesmoke",
              backgroundColor: blueGrey[900],
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
            loading={isSubmitting}
            loadingPosition="start"
            startIcon={<SaveAlt />}
            onClick={handleSubmit}
          >
            Save Changes
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
      
    );
}

export default CustomDialog;