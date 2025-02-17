import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  // styled,
} from '@mui/material';
// import {
//   CloudUpload as CloudUploadIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
// } from '@mui/icons-material';
import axios from 'axios';
import api from '../../config/api';
import toast from 'react-hot-toast';

// Styled Components
// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// const StyledAvatar = styled(Avatar)(({ theme }) => ({
//   width: theme.spacing(20),
//   height: theme.spacing(20),
//   border: `2px solid ${theme.palette.primary.main}`,
// }));

// // Types
// interface ProfileImageFormValues {
//   profileImage: File | null;
// }

// Validation Schema
const validationSchema = Yup.object().shape({
  imageFile: Yup.mixed()
    .test('fileSize', 'Image size must be less than 5MB', (value: any) => {
      if (!value) return true;
      return value.size <= 5000000;
    })
    .test('fileType', 'Only image files are allowed', (value: any) => {
      if (!value) return true;
      return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    }),
});

const ProfileImageUpload: React.FC = () => {

    const [isChangeImage, setIsChangeImage] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }
    };
  
    const handleImageUpload = async (file: File | undefined) => {
      // const file = e.target.files?.[0]; 
      const cloudName = "dgxzrvv7n"
      const apiKey = '379246439751562';
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', apiKey);
        formData.append('upload_preset', 'sample'); 
  
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)
        return response.data.url || ""
      }
      return
    };

  const handleSubmit = async (values: any) => {
    console.log({values})
    if (!values.imageFile) return;

    setIsUploading(true);
    try {
      // Simulate API call
      const imageUrl = await handleImageUpload(values.imageFile)
      
      const formValues = {
        image: imageUrl
      }
      await api.post(`/api/user/change-image/`, {...formValues});

      // Success message
      toast.success('Profile image uploaded successfully!')
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Formik
      initialValues={{ profileImage: null }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <Stack spacing={3} alignItems="center">
            {/* <Box position="relative">
              <StyledAvatar
                src={imagePreview?.url}
                alt="Profile Preview"
              >
                {!imagePreview && <CloudUploadIcon sx={{ width: 40, height: 40 }} />}
              </StyledAvatar>
              
              {imagePreview && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    gap: 0.5,
                  }}
                >
                  <IconButton
                    size="small"
                    color="primary"
                    sx={{ bgcolor: 'background.paper' }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    sx={{ bgcolor: 'background.paper' }}
                    onClick={() => handleRemoveImage(setFieldValue)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              disabled={isUploading}
            >
              {imagePreview ? 'Change Image' : 'Upload Image'}
              <VisuallyHiddenInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setFieldValue)}
              />
            </Button> */}

            {/* {errors.profileImage && touched.profileImage && (
              <Typography color="error" variant="caption">
                {errors.profileImage as string}
              </Typography>
            )} */}
            
            <div className="flex flex-col">
                <button 
                type="button"
                onClick={() => {
                setIsChangeImage(!isChangeImage)
                }}>
                {`${ isChangeImage ? 'Cancel Upload' : 'Upload Image' }`}
                </button>
            
                { isChangeImage && (
                <Box>
                <Box >
                    Upload Image
                </Box>
                <input
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    accept="image/*"
                    onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setFieldValue('imageFile', file);
                    handleImageChange(e);
                    }}
                /></Box> )
                }
                {imagePreview && (
                <Box sx={{ width: "100%", overflow: "hidden" }}>
                <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                    width: "100%", 
                    height: "100%",
                    objectFit: "cover", 
                    borderRadius: "8px"
                    }}
                />
                </Box>
                )}
                <ErrorMessage name="imageFile" component="div" className="text-red-600 text-sm" />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!imagePreview || isUploading}
              sx={{ minWidth: 120 }}
            >
              {isUploading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Save'
              )}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileImageUpload;