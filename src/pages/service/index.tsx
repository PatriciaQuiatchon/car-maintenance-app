import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { IService, ITable } from "../../interface/shared";
import api from "../../config/api";
import { TableWrapper } from "../../components/table";
import { Box, Button, Grid2, Paper, Typography } from "@mui/material";
import { useAuth } from "../../hooks/authProvider";
import ServiceUpsert from "./component/upsert";
import ConfirmationRemove from "../../components/confirmation";
import { SAVED_MESSAGE } from "../../constant";
import toast from "react-hot-toast";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ServicesDisplay from "../../components/services";
import { formatMoney, parseMoney } from "../../utils/helper";
import Loader from "../../components/loading";
import _ from 'lodash'
import SearchBar from "../../components/SearchBar";
const Service = () => {

    const auth = useAuth();
    const hasEditAccess = ['admin', 'employee'].includes(auth.role || "")
    
    const initial = {
        description: "", name: "", price: 0, service_id: "", price_b:0,
    }
    
    const [services, setServices] = useState<IService[]>([])
    const [origData, setData] = useState<IService[]>([])
    const [service, setService] = useState<IService>(initial)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);



    const fetchServices = async () => {
        try {
            setIsLoading(!isLoading)
            const response = await api.get("/api/services");
            setServices(response.data)
            setData(response.data)
        } catch (e){

        } finally {
            setIsLoading(false)
        }
    }

    const handleSearch = _.debounce((query) => {
        const smallQuery = _.toLower(query)
        const filteredResults = _.filter(origData, (user) => {
          return (
            _.includes(_.toLower(user.name), smallQuery) ||
            _.includes(_.toString(_.toLower(user.description)), smallQuery)
          );
        });
        setServices(filteredResults);
      }, 300);
    
    const handleInputChange = (event:any) => {
        const newQuery = event.target.value;
        handleSearch(newQuery);
    };

    const handleSucces = () => {
        toast.success(SAVED_MESSAGE("Service", "saved"))
        fetchServices();
    }

    const handleEdit = (data: IService) => {
        setIsModalOpen(!isModalOpen)
        const { price_range } = data
        const prices = price_range ? price_range.split(" - ") : ['0','0']
        
        setService({...data,
            price: parseMoney(prices[1]),
            price_b: parseMoney(prices[0]),
        })
    }

    const handleRemove = (id: string) => {
        setService((prev) => ({
            ...prev,
            service_id: id,
        }))
        setIsDelete(!isDelete)
    }

    const removeService = async () => {
        try {
            const response = await api.delete(`/api/service/${service.service_id}`);

            if (response) {
                toast.success(SAVED_MESSAGE("Service", "removed"))
                fetchServices();
            }
        } catch (e){

        } finally {
            setIsDelete(!isDelete)
            setService(initial)
        }
    }

    const handleChangeModal = () => {
        setService(initial)
        setIsModalOpen(!isModalOpen)
    }

    const headers = ['service_id', 'Name', 'Description', 'Price'];
    if (hasEditAccess) {
        headers.push("Action")
    }

    useEffect(() => {
        fetchServices();
    },[])

    const ServiceTable: ITable<IService> = {
        type: "IService",
        headers: ["service_id", "name", "description", "price_range"],
        rows: services.map(item => [item.service_id, item.name, item.description,`${formatMoney(item.price_b)} - ${formatMoney(item.price)}`]),
        handleEdit: (data) => handleEdit(data),
        handleRemove: (id) => handleRemove(id),
    };
    return (
        <Wrapper>
            <>
            
            <Grid2 spacing={1} container padding={0} margin={0} sx={{ display: 'flex', width:"100%", justifyContent: 'end' }}>
                <Grid2 size={ {xs: 12, sm: 12, md: auth.role === "customer" ? 6 : 4} }>
                    <Typography textAlign="left" variant="h5" textTransform="uppercase" fontWeight={700} color="white" >
                    Services Offers
                    </Typography>

                </Grid2>
                <Grid2 size={ {xs: 12, sm: 12, md: auth.role === "customer" ? 6 : 4} }>
                    <SearchBar 
                        handleSearch={handleInputChange}
                    />
                </Grid2>
                {
                    hasEditAccess && 
                    <Grid2 size={ {xs: 12, sm: 12, md:4} }>
                            <Button 
                                startIcon={<MiscellaneousServicesIcon />}
                                sx={{ width: "100%" }}
                                variant="contained" color="success" onClick={() => setIsModalOpen(!isModalOpen)}>
                                New Services Offers
                            </Button>
                    </Grid2>
                }
            </Grid2>
            { 

                hasEditAccess ?
               ( isLoading ? <Loader />
                :
                services?.length > 0 ? 
                <TableWrapper {...ServiceTable} />
                : <Box component={Paper} marginTop={2} height="400px" display="flex" justifyContent="center" alignItems="center" width={"100%"}>
                    <Typography>
                        No available Services
                    </Typography>
                </Box>)
                :
                <Box margin={3}>
                <ServicesDisplay 
                    isLoading={isLoading}
                    services={services}
                />
                </Box>
            }
            { isModalOpen && (<ServiceUpsert 
                handleCloseModal={handleChangeModal}
                handleSucces={handleSucces}
                isModalOpen={isModalOpen}
                initialData={service}
            />)}
            </>
            {
                isDelete && (
                    <ConfirmationRemove 
                        isOpen={isDelete}
                        onClose={() => setIsDelete(false)}
                        onSubmit={removeService}
                    />
                )
            }
        </Wrapper>
    )
}

export default Service;