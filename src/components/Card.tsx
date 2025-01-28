import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { CardActionArea } from '@mui/material';
import CardDetails from './CardDetails';

interface ICardComponent {
    icon: React.ReactNode
    name: string,
    price: string,
    description: string,
}

const CardComponent:FC<ICardComponent> = ({
    icon, name, description, price,
}) => {
    const [open, setOpen] = useState(false)
  return (
    <Box sx={{ width:"100%", minHeight:"auto" }}>
      <Card sx={{ minWidth: "auto", 
                height:250,
                width:"100%",
                display:"flex", justifyContent:"center", alignItems: "center" }}>
      <CardActionArea
            onClick={() => setOpen(!open)}
            // data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
                width:"100%",
                '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
        <CardContent>
            <Typography 
                sx={{ textTransform: "uppercase", letterSpacing: "2px" }} 
                color="#455a64"
                fontWeight="500" 
                variant="h6" component="span">
                <Box component="span" sx={{ 
                paddingRight: "10px"
                }}>{ icon }</Box>
                { name }
            </Typography>
            {/* <Typography variant="body2">
                {description}
            </Typography> */}
            {/* <Typography variant="body2">
                {price}
            </Typography> */}
        </CardContent>
        </CardActionArea>
      </Card>
      {
        open && <CardDetails 
        icon={icon}
            description={description}
            name={name}
            price={price}
        open={open}
        setOpen={() => setOpen(!open)}
        />
      }
    </Box>
  );
}

export default CardComponent;