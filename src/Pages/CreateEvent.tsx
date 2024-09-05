import React, { useState } from "react";
import {
  Stack,
  TextField,
  InputLabel,
  Button,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import calendarIcon from "../Assets/calenderIcon.svg";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { createEventsSchema } from "../Validations/CreateEventsValidations";
import { allowedFileTypes } from "../Constants/Constants";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { v4 as uuid } from "uuid";

interface formValuesInt {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  image: FileList | null;
  level: string;
}

const getCalendarIcon = () => {
  return <img src={calendarIcon} alt="calendarIcon" />;
};

const CreateEvent = () => {
  const [imagePreview, setImagePreview] = useState<FileList | null>(null);

  const initialFormValues: formValuesInt = {
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    image: null,
    level: "",
  };

  const onSubmit = async (values: any, actions: any) => {
    try {
      const cloudinaryBaseUrl: string = process.env.REACT_APP_CLOUDINARY_BASE_URL as string;
      const uploadPreset: string = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string;
      const cloudName: string = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME as string;
      const formData = new FormData();
      formData.append("file", values.image[0]);
      formData.append("upload_preset", uploadPreset);

      let response = await axios.post(`${cloudinaryBaseUrl}${cloudName}/image/upload`, formData);

      let newChallenges = [];
      let existingChallenges = JSON.parse(localStorage.getItem("challenges") as string);

      if (existingChallenges && existingChallenges.length > 0) {
        newChallenges = existingChallenges;
      }

      let imageUrl = response.data.secure_url;
      const unique_id = uuid();

      let dataToBeUploaded = values;
      dataToBeUploaded.image = imageUrl;
      dataToBeUploaded.id = unique_id;
      newChallenges.push(dataToBeUploaded);

      localStorage.setItem("challenges", JSON.stringify(newChallenges));

      toast.success("Challenge added!");
      setImagePreview(null);
      actions.resetForm();
    } catch (error) {
      
    }
  };

  const { values, handleChange, setFieldValue, isSubmitting, handleSubmit, errors } = useFormik({
    initialValues: initialFormValues,
    validationSchema: createEventsSchema,
    onSubmit,
  });

  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="">
        <div className="create-event-title text-2xl font-bold p-16 mb-10 bg-[#F8F9FD]">
          Challenge Details
        </div>
        <div className="create-event-form px-16 pb-10">
          <form noValidate onSubmit={handleSubmit}>
            <Stack spacing={2} width={400}>
              {/* Name filed */}
              <InputLabel
                htmlFor="challenge name"
                sx={{ color: "#333333", fontSize: "14px", fontWeight: "500" }}
              >
                challenge name
              </InputLabel>
              <TextField
                id="name"
                size="small"
                sx={{ ".MuiInputBase-input": { fontSize: "14px" } }}
                value={values.name}
                onChange={handleChange}
                error={"name" in errors}
                helperText={errors.name ? errors.name : " "}
              />

              {/* Start date field */}
              <InputLabel sx={{ color: "#333333", fontSize: "14px", fontWeight: "500" }}>
                Start Date
              </InputLabel>
              <DateTimePicker
                name="startDate"
                format="DD MMM' YYYY hh:mm a"
                disablePast
                slots={{ openPickerIcon: getCalendarIcon }}
                slotProps={{
                  textField: {
                    size: "small",
                    placeholder: "Add start date",
                    error: errors["startDate"] ? true : false,
                    helperText: errors.startDate ? errors.startDate : "",
                  },
                }}
                sx={{ ".MuiInputBase-input": { fontSize: "14px" } }}
                value={values.startDate ? dayjs(values.startDate) : undefined}
                onChange={(value) =>
                  setFieldValue("startDate", dayjs(value).format("YYYY-MM-DDTHH:mm:ss"), true)
                }
              />

              {/* End date field */}
              <InputLabel sx={{ color: "#333333", fontSize: "14px", fontWeight: "500" }}>
                End Date
              </InputLabel>
              <DateTimePicker
                name="endDate"
                format="DD MMM' YYYY hh:mm a"
                disablePast
                minDate={dayjs(values.startDate)}
                minTime={dayjs(values.startDate)}
                slots={{ openPickerIcon: getCalendarIcon }}
                slotProps={{
                  textField: {
                    size: "small",
                    placeholder: "Add end date",
                    error: errors["endDate"] ? true : false,
                    helperText: errors.endDate ? errors.endDate : "",
                  },
                }}
                sx={{ ".MuiInputBase-input": { fontSize: "14px" } }}
                value={values.endDate ? dayjs(values.endDate) : undefined}
                onChange={(value) =>
                  setFieldValue("endDate", dayjs(value).format("YYYY-MM-DDTHH:mm:ss"), true)
                }
              />

              {/* Description field */}
              <InputLabel
                htmlFor="description"
                sx={{ color: "#333333", fontSize: "14px", fontWeight: "500" }}
              >
                Description
              </InputLabel>
              <TextField
                name="description"
                id="description"
                minRows={5}
                maxRows={25}
                multiline
                sx={{ ".MuiInputBase-input": { fontSize: "14px" }, width: "51rem" }}
                value={values.description}
                onChange={handleChange}
                error={"description" in errors}
                helperText={errors.description ? errors.description : " "}
              />
              {/* Image input */}
              <InputLabel
                htmlFor="image"
                sx={{ color: "#333333", fontSize: "14px", fontWeight: "500" }}
              >
                Image
              </InputLabel>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                endIcon={<CloudUploadIcon />}
                sx={{ width: "14rem", background: "#F4F4F4", color: "#666666" }}
              >
                Upload File
                <input
                  id="image"
                  type="file"
                  hidden
                  name="image"
                  onChange={(event) => {
                    setFieldValue("image", event.target.files, true);
                    setImagePreview(event.target.files);
                  }}
                  accept="image/png, image/jpeg"
                />
              </Button>

              {imagePreview && allowedFileTypes.includes(imagePreview[0]?.type) && (
                <div>
                  <div className="p-2 text-sm">Image Preview</div>
                  <div className="image-preview px-6 py-4 w-max bg-[#F8F9FD] rounded-md">
                    <img
                      src={URL.createObjectURL(imagePreview[0])}
                      alt="ImagePreview"
                      className="w-[15rem] rounded-md"
                    />{" "}
                  </div>
                </div>
              )}

              {errors.image && <FormHelperText error>{errors.image.toString()}</FormHelperText>}
              {/* Level select */}
              <InputLabel
                htmlFor="levelType"
                sx={{ color: "#333333", fontSize: "14px", fontWeight: "500" }}
              >
                Level Type
              </InputLabel>

              <Select
                id="level"
                size="small"
                sx={{ width: "14rem", fontSize: "14px" }}
                value={values.level}
                onChange={(event) => setFieldValue("level", event.target.value, true)}
                displayEmpty
                error={"level" in errors}
              >
                <MenuItem value={""} sx={{ fontSize: "14px" }}>
                  select level
                </MenuItem>
                <MenuItem value={"easy"} sx={{ fontSize: "14px" }}>
                  Easy
                </MenuItem>
                <MenuItem value={"medium"} sx={{ fontSize: "14px" }}>
                  Medium
                </MenuItem>
                <MenuItem value={"hard"} sx={{ fontSize: "14px" }}>
                  Hard
                </MenuItem>
              </Select>
              <FormHelperText error>{errors.level ? errors.level : ""}</FormHelperText>

              {/* create event btn */}
              <div className="pt-10 ">
                {isSubmitting ? (
                  <CircularProgress sx={{ color: "#44924C" }} />
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#44924C",
                      width: "14rem",
                      color: "white",
                      fontSize: "14px",
                      borderRadius: "10px",
                    }}
                    type="submit"
                  >
                    Create Challenge
                  </Button>
                )}
              </div>
            </Stack>
          </form>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default CreateEvent;
