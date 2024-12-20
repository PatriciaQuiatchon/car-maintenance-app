import { Box, Typography } from "@mui/material";
import CustomTable from "../../components/table"
import Wrapper from "../../components/wrapper"

const Users = () => {

    const headers = ['Name', 'Email', 'Role', 'Action'];
    const rows = [
    ['John Doe', 28, 'USA', 'Engineer'],
    ['Jane Smith', 34, 'Canada', 'Designer'],
    ['Sam Wilson', 23, 'UK', 'Developer'],
    ];
    return (
        <Wrapper>
            <>
                <Box>
                    <Typography variant="h4">
                        Manage Users
                    </Typography>
                </Box>
                <CustomTable 
                    headers={headers}
                    rows={rows}
                />
            </>
        </Wrapper>
    )
}

export default Users