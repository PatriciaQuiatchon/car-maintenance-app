import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import handleError from '../../components/error';
import api from '../../config/api';

const VerifyEmail = () => {
    const [status, setStatus] = useState<string>('');
    const { search } = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const verifyEmail = async (token: string) => {
        try {
            setIsLoading(!isLoading)
            await api.get(`/api/verify?token=${token}`);
        } catch (error){
            handleError(error as AxiosError); 
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(search);
        const token = queryParams.get('token');

        if (!token) {
            setStatus('Invalid verification link.');
            return;
        }

        verifyEmail(token)
    }, []);

    return (
        <div>
            <h2>Email Verification</h2>
            <p>{status}</p>
        </div>
    );
};

export default VerifyEmail;