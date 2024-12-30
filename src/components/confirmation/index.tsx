import { LoadingButton } from "@mui/lab"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { FC, useState } from "react"

interface IConfirmationRemove {
    isOpen: boolean
    onClose: () => void
    onSubmit: () => void
}
const ConfirmationRemove:FC<IConfirmationRemove> =(props) => {
    const { isOpen, onSubmit, onClose } = props
    const [isRemoving, setIsRemoving] = useState<boolean>(false)
    const handleSubmit = async () => {
        setIsRemoving(true)
        try {
            await onSubmit()
        } catch {

        } finally {
            setIsRemoving(false)
        }
    }
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle>

            </DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to remove?
                </Typography>
            </DialogContent>
            <DialogActions>
                {!isRemoving && <Button onClick={onClose}>
                    Cancel
                </Button>}
                <LoadingButton loading={isRemoving} onClick={handleSubmit}>
                    Remove
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )

}

export default ConfirmationRemove