import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../config/api';

const VerifyEmail = () => {
    const [status, setStatus] = useState<string>('');
    const { search } = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const verifyEmail = async (token: string) => {
        try {
            setIsLoading(!isLoading)
            await api.post(`/api/auth/verify?token=${token}`);
            localStorage.removeItem("is_verified");

        } catch (error){
            console.log({error})
            // handleError(error as AxiosError); 
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
            <h2>Email Verification Success</h2>
            <button onClick={() => navigate("/login")}>
                Return to login
            </button>
            <p>{status}</p>
        </div>
    );
};

export default VerifyEmail;