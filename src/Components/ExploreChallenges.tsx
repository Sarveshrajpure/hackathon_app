import React from "react";
import {
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  ListSubheader,
  InputAdornment,
  IconButton,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EventCard from "./EventCard";

const statusFilters = ["All", "Active", "Upcoming", "Past"];
const levelFilters = ["Easy", "Medium", "Hard"];

const events = [
  {
    name: "Data Science Bootcamp - Graded Datathon  ",
    startDate: "2024-09-04T23:59:59",
    endDate: "2024-09-08T23:59:59",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. `,
    image:
      "https://www.naukri.com/campus/career-guidance/wp-content/uploads/2023/11/what-is-data-science.jpg",
    level: "easy",
  },
  {
    name: "Data Sprint 72 - Butterfly Identification",
    startDate: "2024-09-12T01:00:00",
    endDate: "2024-09-12T23:59:59",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. `,
    image:
      "https://www.naukri.com/campus/career-guidance/wp-content/uploads/2023/11/what-is-data-science.jpg",
    level: "easy",
  },
  {
    name: "Engineering Graduates Employment Outcomes",
    startDate: "2024-08-01T21:00:00",
    endDate: "2024-08-10T18:00:00",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. `,
    image:
      "https://www.naukri.com/campus/career-guidance/wp-content/uploads/2023/11/what-is-data-science.jpg",
    level: "easy",
  },

  {
    name: "Engineering Graduates Employment Outcomes",
    startDate: "2024-09-03T21:00:00",
    endDate: "2024-09-10T18:00:00",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. `,
    image:
      "https://www.naukri.com/campus/career-guidance/wp-content/uploads/2023/11/what-is-data-science.jpg",
    level: "easy",
  },
];

const ExploreChallenges = () => {
  const [filterName, setFilterName] = React.useState<string[]>([]);

  const handleFilterChange = (event: SelectChangeEvent<typeof filterName>) => {
    const {
      target: { value },
    } = event;

    setFilterName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div className="explore-challenges-wrapper">
      <div className="h-[20rem] bg-[#002A3B] flex justify-center items-center">
        <div className="explore-challenges-title-searchbar-wrapper">
          <div className="explore-challenges-title text-3xl text-center text-white font-semibold mb-10">
            Explore Challenges
          </div>
          <div className="explore-challenges-searchbar-filters-wrapper flex">
            <FormControl sx={{ m: 1, width: "60rem", borderRadius: "12px" }} variant="outlined">
              <OutlinedInput
                size="small"
                sx={{ borderRadius: "12px", background: "white" }}
                placeholder="search"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: 120 }}>
              <Select
                sx={{ background: "white", borderRadius: "12px" }}
                size="small"
                displayEmpty
                multiple
                value={filterName}
                onChange={handleFilterChange}
                renderValue={(selected) => selected.join(", ")}
              >
                <MenuItem disabled value="" sx={{ width: "16rem", fontSize: "18px" }}>
                  <em>Filter</em>
                </MenuItem>
                <ListSubheader sx={{ width: "16rem", fontSize: "16px", fontWeight: "600" }}>
                  Status
                </ListSubheader>
                {statusFilters.map((name) => (
                  <MenuItem key={name} value={name} sx={{ padding: "2px" }}>
                    <Checkbox checked={filterName.indexOf(name) > -1} size="small" />
                    <ListItemText primary={name} sx={{ fontSize: "10px" }} />
                  </MenuItem>
                ))}

                <ListSubheader>Level</ListSubheader>
                {levelFilters.map((name) => (
                  <MenuItem key={name} value={name} sx={{ padding: "2px" }}>
                    <Checkbox checked={filterName.indexOf(name) > -1} size="small" />
                    <ListItemText primary={name} sx={{ fontSize: "10px" }} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="challenges-lists bg-[#003145] py-14 px-40 flex flex-wrap justify-between">
        {events.map((item, index) => (
          <EventCard eventData={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ExploreChallenges;
