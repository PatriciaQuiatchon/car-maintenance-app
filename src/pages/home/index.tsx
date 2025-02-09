import PublicWrapper from "../../components/public-wrapper";
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'
import cover from '../../assets/cover.jpg'
import hood from '../../assets/hood.png'
import { Box, Button, 
    // useMediaQuery,
    // useTheme 
} from "@mui/material";

import { Carousel } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import ImageWithTooltips from "../../components/ImageMapping";
import { useEffect, useRef } from "react";
import Footer from "../../components/Footer";

  
const Home = () => {
    
  const location = useLocation();

  // Scroll to the anchor div when hash changes
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);
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
    const points = [
        { id: 1, x: 20, y: 40, description: 'Hood' },
        { id: 2, x: 30, y: 40, description: 'Oil / Lube / Filters' },
        { id: 3, x: 35, y: 45, description: 'Diagnostics' },
        { id: 5, x: 75, y: 47, description: 'Suspension' },
        { id: 6, x: 78, y: 59, description: 'Brakes' },
      ];

    const hoodSectionRef = useRef<HTMLDivElement>(null);
    const imageWithTooltipRef = useRef<HTMLDivElement>(null);

    const handleScrollToHood = () => {
    if (hoodSectionRef.current) {
        hoodSectionRef.current.scrollIntoView({
        behavior: 'smooth'  // Add smooth scrolling
        });
    }
    };

    const handleScrollToImageTooltip = () => {
        if (imageWithTooltipRef.current) {
            imageWithTooltipRef.current.scrollIntoView({
            behavior: 'smooth'  // Add smooth scrolling
            });
        }
    };
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
                    <Button variant="contained" size="large" 
                        sx={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: '#b10000',
                            // boxShadow: "5px 5px #842400",
                            boxShadow: '7px 10px 20px 4px rgba(0,0,0,0.7)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                        onClick={handleScrollToImageTooltip}
                    >
                        Learn More
                    </Button>
                </Box>
            </Box>)})}
            </Carousel>
            <div id="imageTooltip" 
            ref={imageWithTooltipRef}
            style={{
                minHeight: '100vh',        
                width: '100%',             
                backgroundColor: 'black',
                display: 'flex',           
                alignItems: 'center',      
                justifyContent: 'center'  
              }}
            >
            <ImageWithTooltips 
                imageSrc={cover}
                points={points}
                handleNavigate={handleScrollToHood}
            />
            </div>
            <div id="underTheHood"
                ref={hoodSectionRef}
                style={{
                    minHeight: '100vh',        
                    width: '100%',            
                    backgroundImage: `url(${hood})`, 
                    backgroundSize: 'cover',   
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#f0f0f0',
                    backgroundAttachment: 'fixed', 
                    display: 'flex',           
                    alignItems: 'center',      
                    justifyContent: 'center'   
                  }}
            >
                <Button variant="contained" size="large" 
                    sx={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        boxShadow: '7px 10px 20px 4px rgba(0,0,0,0.7)',
                        backgroundColor: '#b10000',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        textTransform: "uppercase",

                    }}
                    onClick={()=> navigate("/login")}
                >
                    Get Started
                </Button>
            </div>
            <Footer />
        </PublicWrapper>
    )
}

export default Home;