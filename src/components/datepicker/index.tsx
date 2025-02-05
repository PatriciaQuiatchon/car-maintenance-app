import React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
interface CustomDatePickerProps {
  label: string;
  value: Dayjs; // The current value of the field
  onChange: (newValue: any) => void; // Function to handle value change
  error?: boolean; // Validation error
  helperText?: string | false | undefined; // Validation message
  isNew?: boolean;
}

const ResponsiveDatePickers: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  helperText,
  isNew,
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
          // value={value}
          // onChange={onChange}
          // minDate={isNew && dayjs()}
          value={value ? dayjs(value) : null} // Ensure value is a dayjs object
          onChange={(newValue) => onChange(newValue ? dayjs(newValue) : null)}
          minDate={isNew ? dayjs() : undefined } // Ensures minimum date is today
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
