import React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
interface CustomDatePickerProps {
  label: string;
  value: Dayjs; // The current value of the field
  onChange: (newValue: any) => void; // Function to handle value change
  error?: boolean; // Validation error
  helperText?: string | false | undefined; // Validation message
}

const ResponsiveDatePickers: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
        components={['DatePicker']}
        sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'stretch',
        }}
        >
        <DemoItem
            label={label}
            sx={{
            width: '100%',
            display: 'flex',
            }}
        >
        <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{
            textField: {
            fullWidth: true,
            error: error,
            helperText: helperText,
            },
        }}
        />
    </DemoItem>
    </DemoContainer>
    </LocalizationProvider>
  );
};

export default ResponsiveDatePickers;
