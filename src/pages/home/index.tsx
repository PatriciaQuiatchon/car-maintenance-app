import PublicWrapper from "../../components/public-wrapper";
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'

import { Box, 
    // useMediaQuery,
    // useTheme 
} from "@mui/material";

import { Carousel } from 'antd';
import { useNavigate } from "react-router-dom";

  
const Home = () => {
    //   const theme = useTheme();
    
    // const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    const navigate = useNavigate()
    const heroSections = [
        {
            title: "Your Car, Our Care – Anytime, Anywhere",
            subtitle: "From routine maintenance to urgent repairs, we make it easy to keep your car running smoothly.",
            image: img1
        },
        {
            title: "Drive with Confidence, Powered by Experts",
            subtitle: "Top-notch service for every make and model, delivered by certified professionals you can trust.",
            image: img2
        },
        {
            title: "Your Journey, Our Priority!",
            subtitle: "Tailored car care solutions designed to get you back on the road, hassle-free.",
            image: img3
        }
    ]
    return (
        <PublicWrapper>
           <Carousel autoplay>
           { 
            heroSections.map( ({title, subtitle, image}) => {return(<Box
                sx={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh', 
                    position: 'relative',
                }}
            >
                {/* Grey Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(40, 40, 40, 0.5)', // Grey semi-transparent overlay
                        zIndex: 1,
                    }}
                />
                {/* Text and Button */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: '#fff',
                        zIndex: 2,
                    }}
                >
                    <h1 style={{ fontSize: '48px', margin: '0 0 20px' }}>{title}</h1>
                    <p style={{ fontSize: '18px', margin: '0 0 20px' }}>{ subtitle }</p>
                    <button
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate("/auto-services")}
                    >
                        Learn More
                    </button>
                </Box>
            </Box>)})}
            </Carousel>
        </PublicWrapper>
    )
}

export default Home;