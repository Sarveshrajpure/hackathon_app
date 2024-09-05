import React from "react";
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
import { DatePicker } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { createEventsSchema } from "../Validations/CreateEventsValidations";

interface imageFileInt {
  name: string;
}

interface formValuesInt {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  image: Array<imageFileInt>;
  level: string;
}

const getCalendarIcon = () => {
  return <img src={calendarIcon} alt="calendarIcon" />;
};

const CreateEvent = () => {
  const day = new Date();

  const initialStartDate = dayjs(day).format("YYYY-MM-DDTHH:mm:ss");
  let nextDay = new Date(day);
  nextDay.setDate(day.getDate() + 1);
  const initialEndDate = dayjs(day).add(1, "day").format("YYYY-MM-DDTHH:mm:ss");

  const initialFormValues: formValuesInt = {
    name: "",
    startDate: initialStartDate,
    endDate: initialEndDate,
    description: "",
    image: [{ name: "" }],
    level: "",
  };

  const onSubmit = (values: object, actions: any) => {
    console.log(values);
  };

  const { values, handleChange, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: initialFormValues,
    validationSchema: createEventsSchema,
    onSubmit,
  });

  console.log(values);

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
                format="DD/MM/YYYY hh:mm a"
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
                value={dayjs(values.startDate)}
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
                format="DD/MM/YYYY hh:mm a"
                disablePast
                slots={{ openPickerIcon: getCalendarIcon }}
                slotProps={{
                  textField: {
                    size: "small",
                    placeholder: "Add end date",
                    error: errors["endDate"] ? true : false,
                    helperText: errors.startDate ? errors.endDate : "",
                  },
                }}
                sx={{ ".MuiInputBase-input": { fontSize: "14px" } }}
                value={dayjs(values.endDate)}
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
                  onChange={(event) => setFieldValue("image", event.target.files, true)}
                />
              </Button>
              {errors.image ? <FormHelperText error>{errors.image.toString()}</FormHelperText> : ""}

              <div className="text-sm">{values.image ? values.image[0]?.name : ""}</div>
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
              </div>
            </Stack>
          </form>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default CreateEvent;
