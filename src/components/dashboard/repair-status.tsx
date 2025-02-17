import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Paper,
  Chip,
  Stack,
  Grid2
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Wrench 
} from 'lucide-react';
import { IRepaireRequest } from '../../interface/shared';

const StyledCard = styled(Card)(({ }) => ({
  width: '90%',
  height: 300,
  margin: '0 auto',
  overflow: 'hidden',
  backgroundColor: "transparent"
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  position: 'relative',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius,
  }
}));

const NoteContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column'
}));

const CarouselButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  }
}));

const CarouselIndicator = styled(Box)(({ active }: { active: boolean }) => ({
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: active ? '#1976d2' : '#bdbdbd',
  cursor: 'pointer',
  transition: 'background-color 0.3s'
}));

// Types

const CompactRepairCard: React.FC<{ repair: IRepaireRequest }> = ({ repair }) => {
  return (
    <StyledCard>
      <CardContent sx={{ height: '100%', p: 2 }}>
        <Stack spacing={1} sx={{ height: '100%' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              {/* <Avatar
                src={repair.mechanic.avatar || "/api/placeholder/32/32"}
                alt={repair.mechanic.name}
                sx={{ width: 32, height: 32 }}
              /> */}
              <Box>
                <Typography variant="subtitle2">
                  {repair?.year} {repair?.model}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {repair?.plate_number}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Clock size={16} />
              <Typography variant="caption" color="text.secondary">
                Due: {new Date(repair?.preferred_schedule).toLocaleDateString()}
              </Typography>
            </Stack>
          </Box>

          {/* Content Grid */}
          <Grid2 container spacing={1} sx={{ flexGrow: 1 }}>
            <Grid2 size={6}>
              <ImageContainer>
                <img
                  src={repair?.image || "/api/placeholder/200/200"}
                  alt="Repair progress"
                />
              </ImageContainer>
            </Grid2>

            <Grid2 size={6}>
              <Stack spacing={1} sx={{ height: '100%' }}>
                <Chip
                  icon={<Wrench size={16} />}
                  label={repair?.request_status}
                  size="small"
                  color={repair?.request_status === "DONE" ? "success" : repair?.request_status === "PENDING" ? "warning" : "primary"}
                  sx={{ alignSelf: 'flex-start' }}
                />

                <NoteContainer>
                  <Stack spacing={0.5}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" fontWeight="medium">
                        Latest Update
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        { repair?.updated_at && new Date(repair.updated_at).toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {repair?.notes}
                    </Typography>
                  </Stack>
                </NoteContainer>

                <Typography variant="caption" color="text.secondary">
                  Mechanic: <Box component="span" fontWeight="medium">{repair?.mechanic_name}</Box>
                </Typography>
              </Stack>
            </Grid2>
          </Grid2>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

const RepairRequestsDashboard: React.FC<{
    repaireResults:IRepaireRequest[]
}> = ({repaireResults: repairs}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
      <Box sx={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CarouselButton
          onClick={() => setCurrentIndex((prev) => (prev - 1 + repairs.length) % repairs.length)}
          size="small"
          sx={{ position: 'absolute', left: 16 }}
        >
          <ChevronLeft size={20} />
        </CarouselButton>

        <Box sx={{ width: '100%', transition: 'all 0.3s ease-in-out' }}>
          <CompactRepairCard repair={repairs[currentIndex]} />
        </Box>

        <CarouselButton
          onClick={() => setCurrentIndex((prev) => (prev + 1) % repairs.length)}
          size="small"
          sx={{ position: 'absolute', right: 16 }}
        >
          <ChevronRight size={20} />
        </CarouselButton>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          {repairs.map((_, index) => (
            <CarouselIndicator
              key={index}
              active={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </Stack>
      </Box>
  );
};

export default RepairRequestsDashboard;