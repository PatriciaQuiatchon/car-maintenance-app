import { FormControl } from "@mui/material"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useState } from "react";
import ResponsiveDatePickers from "../../../components/datepicker";
import dayjs from "dayjs";
import { IServiceHistory } from "../../../interface/shared";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
  }

interface IPrintModal {
    isOpen: boolean
    toggleModal: () => void
    records: IServiceHistory[]
}

const Print:FC<IPrintModal> = ({
    isOpen,
    toggleModal,
    records,
}) => {
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: new Date(),
        endDate: new Date(),
    })
    const handlePrint = () => {
        const printContent = document.getElementById('printable-content');
        const printWindow = window.open('', '', 'height=600,width=800');
        
        if (printContent) {
        printWindow?.document.write('<html><head><title>Service History</title></head><body>');
        printWindow?.document.write(printContent.innerHTML);
        printWindow?.document.write('</body></html>');
        printWindow?.document.close();
        printWindow?.print();
        }
    }
    const { startDate, endDate } = dateRange

    const filterRecords = () => {
        return records.filter((item) => {
            const date = new Date(item.created_at || "")
            if (startDate && endDate) {
                return date >= startDate && date <= endDate;
            } else if (startDate) {
                return date >= startDate
            } else if (endDate) {
                return date <= endDate
            } else {
                return
            }
        })
    }

    const handleDownload = () => {
        downloadCSV(filterRecords(), 'service_records.csv');
    }

    const handleChange = (newValue: string, type: string) => {
        if (type === "start") {
            setDateRange((prev) => ({
                ...prev,
                startDate: new Date(newValue)
            }))
        }
        if (type === "end") {
            setDateRange((prev) => ({
                ...prev,
                endDate: new Date(newValue)
            }))
        }
    }

    const convertToCSV = (data: IServiceHistory[]) => {
        if (!data || data.length === 0) {
           
            return "";
        }
        const headers = ["User Name", "Vehicle", "Plate number", "Services", "Amount", "Amount", "Updated Date", "Creation Date"];
        const rows = data.map(obj => 
            Object.values(obj).map(value => 
                typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
            ).join(',')
        ).join('\n');
    
        return `${headers}\n${rows}`;
    }

    const downloadCSV = (data: IServiceHistory[], filename: string) => {
        const csv = convertToCSV(data);
        if (csv ==="") {
            return;
        }
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
    
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }   

    
    return (
        <Dialog
            open={isOpen}
            onClose={toggleModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Print/Download Records
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={toggleModal}
                sx={(theme:any) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
                >
                <CloseIcon />
                </IconButton>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                
            <FormControl fullWidth>
                <ResponsiveDatePickers 
                    label="Select a Start Date"
                    value={dayjs(startDate)}
                    onChange={(newValue) => handleChange(newValue, "start")}
                />
            </FormControl>
            <FormControl fullWidth>
                <ResponsiveDatePickers 
                    label="Select a End Date"
                    value={dayjs(endDate)}
                    onChange={(newValue) => handleChange(newValue, "end")} 
                />
            </FormControl>
            <div id="table-container"></div>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDownload}>Download</Button>
            <Button onClick={handlePrint} autoFocus>
                Print
            </Button>
            </DialogActions>
            <div id="printable-content" style={{ display: 'none' }}>
            <h1>Service Records</h1>
            <table border={1} style={{ border: "2px solid black" }} cellPadding="5" cellSpacing="0">
            <thead>
                <tr style={{ fontSize:"10px" }}>
                <th>User Name</th>
                <th>Car Name</th>
                <th>Plate Number</th>
                <th>Services</th>
                <th>Amount</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody style={{ fontSize:"12px", border: "1px solid black" }}>
                    {
                        filterRecords().map((data) => {
                            return (
                                <tr >
                                    <td>{data.user_name}</td>
                                    <td>{data.car_name}</td>
                                    <td>{data.plate_number}</td>
                                    <td>{data.services}</td>
                                    <td>{data.amount}</td>
                                    <td>{data.created_at ? dayjs(data.created_at).format("DD/MM/YYYY").toString() : ''}</td>
                                </tr>
                            )
                        })
                    }
            </tbody>
            </table>
        </div>
        </Dialog>
    )
}

export default Print