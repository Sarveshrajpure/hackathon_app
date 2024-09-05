import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export const getEventStatus = (startDate: string, endDate: string) => {
  let isBefore = dayjs().isBefore(dayjs(startDate));
  let isBetweenStartAndEndDate = dayjs().isBetween(startDate, endDate, null, "[]");
  let isAfter = dayjs().isAfter(dayjs(endDate));

  if (isBefore) {
    return "Upcoming";
  } else if (isBetweenStartAndEndDate) {
    return "Active";
  } else if (isAfter) {
    
    return "Past";
  }
};
