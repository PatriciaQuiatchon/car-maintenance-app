import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { ITable, IUserDetails } from "../../interface/shared";
import api from "../../config/api";
import { TableWrapper } from "../../components/table";
import { Button, Grid2, MenuItem, Select, Typography } from "@mui/material";
import { useAuth } from "../../hooks/authProvider";
import UserUpsert from "./component/upsert";
import ConfirmationRemove from "../../components/confirmation";
import EmptyData from "../../components/no-data";
import handleError from "../../components/error";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { SAVED_MESSAGE } from "../../constant";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { FaUser } from "react-icons/fa";
import Loader from "../../components/loading";

const User = () => {

    const auth = useAuth();
    const hasEditAccess = ['admin', 'employee'].includes(auth.role || "")
    
    const initial:IUserDetails = {
       name: "", email: "", role: "", user_id:"", confirm_password: "", password: "",
    }
    
    const [users, setUsers] = useState<IUserDetails[]>([])
    const [user, setUser] = useState<IUserDetails>(initial)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [role, setRole] = useState<string>("admin")


    const fetchUsers = async () => {
        try {
            setIsLoading(!isLoading)
            const response = await api.get(`/api/users/${role}`);
            setUsers(response.data)
        } catch (error){
            handleError(error as AxiosError); 
        } finally {
            setIsLoading(false)
        }
    }

    const handleChangeRole = (role:string) => {
        setRole(role)
    }

    const handleSucces = () => {
        toast.success(SAVED_MESSAGE("User", "saved"))
        fetchUsers();
    }

    const handleEdit = (data: IUserDetails) => {
        setIsModalOpen(!isModalOpen)
        setUser(data)
    }

    const handleRemove = (id: string) => {
        setUser((prev) => ({
            ...prev,
            user_id: id,
        }))
        setIsDelete(!isDelete)
    }

    useEffect(() => {
        fetchUsers();
    }, [role])

    const removeUser = async () => {
        try {
            const response = await api.delete(`/api/user/${user.user_id}`);

            if (response) {
                toast.success(SAVED_MESSAGE("User", "removed"))
                fetchUsers();
            } else {
            }
        } catch (e){

        } finally {
            setIsDelete(!isDelete)
            setUser(initial)
        }
    }

    const handleChangeModal = () => {
        setUser(initial)
        setIsModalOpen(!isModalOpen)
    }

    const UserTable: ITable<IUserDetails> = {
        type: "IService",
        headers: ["user_id", "name", "email", "role"],
        rows:  users.filter(item => item.email !== auth.user?.email).map(item => [item.user_id, item.name, item.email, item.role]),
        handleEdit: (data) => handleEdit(data),
        handleRemove: (id) => handleRemove(id),
    };

    return (
        <Wrapper>
            <>
            <Typography textAlign="left" variant="h5" textTransform="uppercase" fontWeight={700} color="white" >
                Users
            </Typography>
            {
                hasEditAccess && 
                <Grid2 spacing={1} container padding={0} margin={0} sx={{ display: 'flex', marginLeft:"20px", width:"100%", justifyContent: 'space-between' }}>
                    <Grid2 size={ {xs: 11, sm: 11, md: 3} }>
                        <Select
                            sx={{ width: "100%", height: "40px", 
                                backgroundColor: "whitesmoke"
                             }}
                            labelId="demo-simple-select-label"
                            name="role"
                            id="role"
                            value={role}
                            onChange={(event) => handleChangeRole(event.target.value)}
                        >
                            <MenuItem value={"admin"}>Admin</MenuItem>
                            <MenuItem value={"employee"}>Employee</MenuItem>
                            <MenuItem value={"mechanic"}>Mechanic</MenuItem>
                            <MenuItem value={"customer"}>Customer</MenuItem>
                        </Select>

                    </Grid2>
                    <Grid2 size={ {xs: 11, sm: 11, md: 3} }>
                        <Button 
                            startIcon={<PersonAddIcon />}
                            sx={{ width: "100%" }}
                            variant="contained" color="success" onClick={() => setIsModalOpen(!isModalOpen)}>
                            New User
                        </Button>
                    </Grid2>
                </Grid2>
            }
            { 
                isLoading ? <Loader />
                :
                users?.length > 0 ? 
                <TableWrapper {...UserTable} />
                : <EmptyData icon={<FaUser />} label="No available Users" />
            }
            { isModalOpen && (<UserUpsert 
                handleCloseModal={handleChangeModal}
                handleSucces={handleSucces}
                isModalOpen={isModalOpen}
                initialData={user}
            />)}
            </>
            {
                isDelete && (
                    <ConfirmationRemove 
                        isOpen={isDelete}
                        onClose={() => setIsDelete(false)}
                        onSubmit={removeUser}
                    />
                )
            }
        </Wrapper>
    )
}

export default User;