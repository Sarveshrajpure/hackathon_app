import * as yup from "yup";
import { allowedFileTypes } from "../Constants/Constants";

export const createEventsSchema = yup.object().shape(
  {
    name: yup.string().required("Challenge Name required!"),
    startDate: yup.string().required("Start Date required!"),
    endDate: yup.string().required("End Date required!"),
    description: yup.string().required("Description required!"),
    image: yup
      .mixed()
      .required("Image required!")
      .test("fileSize", "File size should be less then 5mb", (value: any) => {
        return value && value[0]?.size <= 5000000;
      })
      .test("fileType", "Only images are allowed!", (value: any) => {
        return value && allowedFileTypes.includes(value[0]?.type);
      }),
    level: yup.string().required("Level type required!"),
  },
  [["startDate", "endDate"]]
);
