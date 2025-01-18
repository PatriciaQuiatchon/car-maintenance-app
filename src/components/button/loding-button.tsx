import React, { FC } from 'react';
import { LoadingButton } from '@mui/lab';
import { blueGrey } from '@mui/material/colors';

interface IButton {
    label: string
    isSubmitting: boolean
    dirty: boolean
    isValid: boolean
    icon: React.ReactNode
}

const CustomLoadingButton:FC<IButton> = ({ isSubmitting, dirty, isValid, icon, label }) => {
  return (
    <LoadingButton
      style={{ color: 'whitesmoke' }}
      sx={{
        color: 'whitesmoke',
        backgroundColor: blueGrey[900],
        transition: 'background-color 0.3s ease', // Smooth transition
        '&:hover': {
          backgroundColor: blueGrey[700], // Lighter shade on hover
        },
        '&.Mui-disabled': {
          backgroundColor: blueGrey[800], // Disabled button background
          color: 'gray',
        },
      }}
      loading={isSubmitting}
      loadingPosition="start"
      type="submit"
      startIcon={icon}
      className={!(dirty && isValid) ? 'disabled-btn' : ''}
      disabled={!dirty || !isValid}
    >
      { label }
    </LoadingButton>
  );
};

export default CustomLoadingButton;
