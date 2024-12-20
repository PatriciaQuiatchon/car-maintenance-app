import { FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { grey } from '@mui/material/colors';

// Custom styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  margin: '20px',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: grey[500],
  color: 'white',
  textAlign: 'center',
}));

interface CustomRowProps {
  highlight: boolean;
}
const CustomRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== 'highlight',
})<CustomRowProps>(({ theme, highlight }) => ({
  backgroundColor: highlight ? 'whitesmoke' : 'white',
  // '&:nth-of-type(even)': {
    // backgroundColor: highlight ? theme.palette.action.hover : theme.palette.action.disabledBackground,
  // },
}));

interface ITable {
    headers: string[];
    rows: (string | number)[][];
}

const CustomTable:FC<ITable> = (props) => {
  const { headers, rows } = props
  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <StyledTableCell key={index}>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <CustomRow key={rowIndex} highlight={rowIndex % 2 === 0}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} align="center">
                  {cell}
                </TableCell>
              ))}
            </CustomRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default CustomTable;