import React, { useState, useEffect } from "react";
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
import CancelIcon from "@mui/icons-material/Cancel";
import EventCard from "./EventCard";
import { toast } from "react-toastify";

const statusFilters = ["All", "Active", "Upcoming", "Past"];
const levelFilters = ["Easy", "Medium", "Hard"];

interface eventInt {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string;
  level: string;
}

type events = eventInt[];

const ExploreChallenges = () => {
  const [events, setEvents] = useState<events>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterName, setFilterName] = React.useState<string[]>([]);
  const currentDate = new Date();

  useEffect(() => {
    const fetchEvents = () => {
      try {
        const localStorageData = JSON.parse(localStorage.getItem("challenges") as string);
        console.log(localStorageData);
        // Filters
        let filteredData: any = [];
        if (localStorageData && localStorageData.length > 0) {
          if (filterName.length > 0) {
            filterName.forEach((element) => {
              if (element === "All") {
                setEvents(localStorageData);
              } else if (element === "Upcoming") {
                const filtredEvents = localStorageData.filter((item: any) => {
                  const startDate = new Date(item.startDate);
                  return startDate > currentDate;
                });
                filtredEvents.forEach((element: any) => {
                  filteredData.push(element);
                });
              } else if (element === "Active") {
                const filtredEvents = localStorageData.filter((item: any) => {
                  const startDate = new Date(item.startDate);
                  const endDate = new Date(item.endDate);
                  return startDate < currentDate && currentDate < endDate;
                });
                filtredEvents.forEach((element: any) => {
                  filteredData.push(element);
                });
              } else if (element === "Past") {
                const filtredEvents = localStorageData.filter((item: any) => {
                  const endDate = new Date(item.endDate);
                  return currentDate > endDate;
                });
                filtredEvents.forEach((element: any) => {
                  filteredData.push(element);
                });
              } else if (element === "Easy") {
                const filtredEvents = localStorageData.filter((item: any) => {
                  return item.level === "easy";
                });
                filtredEvents.forEach((element: any) => {
                  filteredData.push(element);
                });
              } else if (element === "Medium") {
                const filtredEvents = localStorageData.filter((item: any) => {
                  return item.level === "medium";
                });
                filtredEvents.forEach((element: any) => {
                  filteredData.push(element);
                });
              } else {
                localStorageData.forEach((element: any) => {
                  filteredData.push(element);
                });
              }
            });
            // Remove duplicates based on a unique identifier (like id)
            filteredData = Array.from(new Set(filteredData.map((event: any) => event.id))).map(
              (id) => filteredData.find((event: any) => event.id === id)
            );

            setEvents(filteredData);
          } else {
            setEvents(localStorageData);
          }
        } else {
          setEvents([]);
        }
      } catch (error) {
        toast.error("Error fetching challenges!");
      }
    };

    fetchEvents();
  }, [filterName]);

  const handleFilterChange = (event: SelectChangeEvent<typeof filterName>) => {
    const {
      target: { value },
    } = event;

    setFilterName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleFilterRemove = (filter: string) => {
    let newFilters = filterName.filter((item: string) => item !== filter);

    setFilterName(newFilters);
  };

  return (
    <div className="explore-challenges-wrapper">
      <div className="h-[16rem] bg-[#002A3B] ">
        <div className="explore-challenges-title-searchbar-wrapper">
          <div className="explore-challenges-title text-3xl text-center text-white font-semibold pt-10 mb-10">
            Explore Challenges
          </div>
          <div className="explore-challenges-searchbar-filters-wrapper flex justify-center">
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
                value={searchInput}
                onChange={(event) => {
                  setSearchInput(event.target.value);
                }}
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
                    <Checkbox checked={filterName.indexOf(name) > -1} size="small" name={name} />
                    <ListItemText primary={name} sx={{ fontSize: "10px" }} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="filter-display-wrapper flex justify-center mt-5">
            <div className="filterDisplay flex gap-1 w-[60rem]">
              {filterName.map((item, index) => (
                <div
                  className="py-2 px-4 bg-[#F8F9FD7D] flex justify-between items-center gap-2
                text-xs rounded-3xl  text-white"
                >
                  <div>{item}</div>{" "}
                  <CancelIcon
                    sx={{ fontSize: "14px", cursor: "pointer" }}
                    onClick={() => handleFilterRemove(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="challenges-lists bg-[#003145] min-h-[40rem] py-14 px-40 flex flex-wrap justify-between">
        {events
          .filter((item: any) => item.name.toLowerCase().includes(searchInput))
          .map((item, index) => (
            <EventCard eventData={item} key={index} />
          ))}
      </div>
    </div>
  );
};

export default ExploreChallenges;
