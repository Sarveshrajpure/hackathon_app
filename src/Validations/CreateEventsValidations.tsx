import * as yup from "yup";

export const createEventsSchema = yup.object().shape({
  name: yup.string().required("Challenge Name required!"),
  startDate: yup.string().required("Start Date required!"),
  endDate: yup.string().required("End Date required!"),
  description: yup.string().required("Description required!"),
  image: yup
    .mixed()
    .required("Image required!")
    .test("fileSize", "File size should be less then 10mb", (value: any) => {
      return value && value[0].size <= 1000000;
    }),
  level: yup.string().required("Level type required!"),
});
