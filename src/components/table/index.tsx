import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, useMediaQuery, useTheme, Grid2, Card, CardContent, Typography, CardActions, FormControl, InputLabel, Select, MenuItem, Tooltip, Chip } from '@mui/material';
import { Stack, styled } from '@mui/system';
import { green, blue, grey, yellow } from '@mui/material/colors';
import { IBase, ITable } from '../../interface/shared';
import { useAuth } from '../../hooks/authProvider';
import { useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const StyledTableContainer = styled(TableContainer)(({ }) => ({
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  marginTop: "10px",
  overflowX: 'auto', 
  maxHeight: '75vh',
  scrollBehavior: 'smooth',

  '&::-webkit-scrollbar': {
    width: '8px', 
    height: '8px', 
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ccc',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor:  '#aaa',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor:  '#f0f0f0', 
    borderRadius: '4px',
  },
}));

const StyledGridContainer = styled(Grid2)(({ }) => ({
  borderRadius: '8px',
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
}));

const CustomTable = <T extends IBase>(props: ITable<T>) => {
  const { headers, rows, hideUserID, selectedStatus, handleEdit, handleRemove, handleChange } = props;
  const auth = useAuth();
  const location = useLocation();
  const pathExempted = ["/registered-vehicle","/repair-request"]

  
  const hasEditAccess = pathExempted.includes(location.pathname) || ["admin"].includes(auth.role || "");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  // const handleNavigateDetail = (id: string) => {
  //   navigation(`${location.pathname}/${id}`)
  // }

  const formatName = (name: string) => {

    return name
      .split('_')
      .join(' ');
  };

  const formatHeaders = (name: string) => {
    switch(name) {
      case "preferred_schedule":
        return "date"
      default:
        return name
    }
  }

  const formatColor = (status: string) => {
    switch(status) {
      case "PENDING":
        return yellow[700]
      case "IN PROGRESS":
        return blue[700]
      case "DONE":
        return green[500]
    }
  }

  const formatChipColor = (status: string) => {
    switch(status) {
      case "PENDING":
        return "warning"
      case "IN PROGRESS":
        return "primary"
      case "DONE":
        return "success"
    }
  }

  const statusOptions: string[] = ["PENDING", "IN PROGRESS", "DONE"]
  const statusOptionsNoDone: string[] = ["PENDING", "IN PROGRESS"]
  const hideLabelID: string[] = ["vehicle_id", "requested_by_id", "service_id"]
  const SelectStatus = (data: T, defaultValue: string) => {
    return (
      <FormControl fullWidth  size="small">
      <InputLabel id="input-role" sx={{ fontSize:"12px" }}>Status</InputLabel>
      <Select
          labelId="input-role"
          name="role"
          id="role"
          value={defaultValue}
          label="Role"
          onChange={(event)=>{
              event.stopPropagation();
              handleChange && handleChange(data,event.target.value)
          }}
          sx={{
            fontSize: "12px",
          }}
      >
        {
          statusOptions.map((item) => {
            return (
              <MenuItem key={item} value={item} sx={{ fontSize:"12px" }}>{item}</MenuItem>
            )
          })
        }
      </Select>
    </FormControl>
    )
  }
  return (
    <>
      {
        !isMobile ? 
          <StyledTableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#b10000",}}>
                <StyledTableCell style={{ display: "none",}} key="header-id">ID</StyledTableCell>
                {headers.map((header, index) => (
                <StyledTableCell key={index} style={{ backgroundColor: "#b10000",  letterSpacing: 1.5, fontSize: "10px", fontWeight: "bolder", display: index === 0 || hideLabelID.includes(header as string) ? "none" : "" }}>
                  {formatName(formatHeaders(String(header)).toUpperCase())}
                  </StyledTableCell>
              ))}
              {
                (hasEditAccess && props.type !== "IServiceHistory") && 
                <StyledTableCell sx={{ backgroundColor: "#b10000" }} key={"actionCell"} >ACTION</StyledTableCell>
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
              <CustomRow onClick={() => {
                // handleNavigateDetail(row[0] as string)
                }} key={rowIndex} highlight={rowIndex % 2 === 0}>
                {row.map((cell, cellIndex) => {
                  
                  const cellClass = cellIndex === 0 || (hideUserID && (cellIndex === 10 || cellIndex === 1 || cellIndex === 2)) ? "none" : "";
                  return (
                  <TableCell key={cellIndex} 
                    onClick={(event)=> {
                      statusOptions.includes(String(cell))  && event.stopPropagation();
                    }}
                    align="center" sx={{ display: cellClass, color: statusOptions.includes(String(cell)) ? formatColor(String(cell)) : "" }}>
                    {
                      statusOptionsNoDone.includes(String(cell)) ? 
                        auth.role === "customer"  ?
                        <Chip color={formatChipColor(String(cell))} label={String(cell)} /> 
                        :
                        SelectStatus(combined, String(cell))
                      : 
                      <>{cell}</>
                    }
                  </TableCell>
                )})}
                {(hasEditAccess && props.type !== "IServiceHistory") && ( <TableCell onClick={(event) => {
                              event.stopPropagation();
                }} sx={{ display:"flex", justifyContent: "center" }}>
                  {(auth.role === "mechanic") ? false : (!(auth.role !== "admin" && selectedStatus === "DONE")) && <Tooltip title="Edit" placement="top">
                    <Button
                      variant='contained'
                      color='info'
                      sx={{ marginRight: '5px' }}
                      onClick={(event) => {  
                        event.stopPropagation();
                        handleEdit(combined)}
                      }
                    ><EditIcon /></Button>
                  </Tooltip>}
                  {!((auth.role === "customer" || auth.role === "mechanic") && (props.type === "IService" || props.type === "IVehicle")) && <Tooltip title="Remove" placement="top">
                    <Button
                      variant='contained'
                      sx={{ backgroundColor: "#b10000" }}
                      color='error'
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRemove(row[0] as string)
                      }}
                    ><DeleteIcon /></Button>
                  </Tooltip>}

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
              <Grid2 size={{ xs: 12, sm: auth.role === "admin" ? 12 : 6  }} key={rowIndex}>
                <Card key={rowIndex} sx={{height: "auto", display: "flex", justifyContent: "center", alignItems: "center", padding:"5px" }}>
                  <CardContent sx={{ textAlign: "left" }}>
                    <Stack spacing={1.5}>
                    {headers.slice(1).map((header, index) => {
                      const cellValue = row[index + 1];
                      return (
                        <div key={cellValue}>
                           {
                            statusOptions.includes(String(cellValue)) ? 
                            auth.role === "customer"  ?
                            <Chip color={formatChipColor(String(cellValue))} label={String(cellValue)} /> 
                            :
                            SelectStatus(combined, String(cellValue))
                            : 
                            <Typography sx={{ fontSize: "18px" }} display={
                              hideLabelID.includes(String(header)) ? 'none' : ''
                            } key={index} variant="body2" gutterBottom>
                              <strong>
                                {formatName(formatHeaders(String(header)).toUpperCase())}

                                </strong> <span style={{  color: ["PENDING", "DONE"].includes(String(cellValue)) ? formatColor(String(cellValue)) : "" }}>{cellValue}</span>
                            </Typography>
                          }
                        </div>
                        
                      );
                    })}
                  {(hasEditAccess && props.type !== "IServiceHistory") && (
                    <CardActions sx={{ display: "flex", justifyContent: "center",  marginTop: 'auto', justifyItems: "flex-end" }}>
                      {!(auth.role !== "admin" && selectedStatus === "DONE ") && (<Button
                        startIcon={<EditIcon />}
                        variant="contained"
                        color="info"
                        onClick={() => handleEdit(combined)}
                      >
                        Edit
                      </Button>)}
                      {!(auth.role === "customer" && props.type === "IService" || props.type === "IVehicle") && <Button
                        startIcon={<DeleteIcon />}
                        variant="contained"
                        color="error"
                        sx={{ backgroundColor: "#b10000" }}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRemove(row[0] as string)
                        }}
                      >
                        Remove
                      </Button>}
                    </CardActions>
                  )}
                  </Stack>
                  </CardContent>
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
      handleChange={props.handleChange}
      hideUserID={props.hideUserID}
      type={props.type}      
      selectedStatus={props.selectedStatus}
      />
  );
};
