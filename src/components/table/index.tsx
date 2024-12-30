import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, useMediaQuery, useTheme, Grid2, Card, CardContent, Typography, CardActions } from '@mui/material';
import { styled } from '@mui/system';
import { grey } from '@mui/material/colors';
import { IBase, ITable } from '../../interface/shared';
import { useAuth } from '../../hooks/authProvider';
// Custom styled components
const StyledTableContainer = styled(TableContainer)(({ }) => ({
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  margin: '20px',
}));

const StyledGridContainer = styled(Grid2)(({ }) => ({
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  margin: '20px',
}));

const StyledTableCell = styled(TableCell)(({ }) => ({
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
})<CustomRowProps>(({ highlight }) => ({
  backgroundColor: highlight ? 'whitesmoke' : 'white',
  // '&:nth-of-type(even)': {
    // backgroundColor: highlight ? theme.palette.action.hover : theme.palette.action.disabledBackground,
  // },
}));

const CustomTable = <T extends IBase>(props: ITable<T>) => {
  const { headers, rows, handleEdit, handleRemove } = props;
  const auth = useAuth();
  const hasEditAccess = ["admin", "employee"].includes(auth.role || "");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <>
      {
        !isMobile ? 
          <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ display: "none"}} key="header-id">ID</StyledTableCell>
                {headers.map((header, index) => (
                <StyledTableCell key={index} style={{ display: index === 0 ? "none" : "" }}>{String(header).toUpperCase()}</StyledTableCell>
              ))}
              {
                hasEditAccess && 
                <StyledTableCell key={"actionCell"} >ACTION</StyledTableCell>
              }

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => {
              const combined = row.reduce((acc, cell, index) => {
                acc[headers[index]] = cell as T[keyof T]; 
                return acc;
            }, {} as T);
              return (
              <CustomRow key={rowIndex} highlight={rowIndex % 2 === 0}>
                {row.map((cell, cellIndex) => {
                  const cellClass = cellIndex === 0 ? "none" : "";
                  return (
                  <TableCell key={cellIndex} align="center" sx={{ display: cellClass }}>
                    {cell}
                  </TableCell>
                )})}
                {hasEditAccess && ( <TableCell sx={{ display:"flex", justifyContent: "center" }}>
                  <Button
                    variant='contained'
                    color='info'
                    sx={{ marginRight: '5px' }}
                    onClick={() => handleEdit(combined)}
                  >Edit</Button>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => handleRemove(row[0] as string)}
                  >Remove</Button>
                </TableCell>)}
              </CustomRow>
            )})}
          </TableBody>
        </Table>
      </StyledTableContainer>
      :
        <StyledGridContainer container spacing={2}>
          {rows.map((row, rowIndex) => {
            const combined = row.reduce((acc, cell, index) => {
              acc[headers[index]] = cell as T[keyof T]; 
              return acc;
            }, {} as T);

            return (
              <Grid2 size={12} key={rowIndex}> {/* Adjust column width based on screen size */}
                <Card >
                  <CardContent>
                    {headers.slice(1).map((header, index) => {
                      const cellValue = row[index + 1];
                      return (
                        <Typography key={index} variant="body2" color="textSecondary" gutterBottom>
                          <strong>{String(header).toUpperCase()}:</strong> {cellValue}
                        </Typography>
                      );
                    })}
                  </CardContent>
                  {hasEditAccess && (
                    <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => handleEdit(combined)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleRemove(row[0] as string)}
                      >
                        Remove
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid2>
            );
          })}
        </StyledGridContainer>      
      }
    </>
      
  );
};

export const TableWrapper = <T extends IBase>(props: ITable<T>) => {
  return (
      <CustomTable<T>
      headers={props.headers}
      rows={props.rows}
      handleEdit={props.handleEdit}
      handleRemove={props.handleRemove} 
      type={props.type}      
      />
  );
};
