import { Avatar, Card, CardHeader, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/auth.action";

const SearchUser = ({ handleClick }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [username, setUsername] = useState("");

  const handleSearchUser = (e) => {
    setUsername(e.target.value);
    dispatch(searchUser(e.target.value));
  };

  return (
    <div className="relative">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search people..."
        value={username}
        onChange={handleSearchUser}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="text-gray-500 dark:text-gray-400" />
            </InputAdornment>
          ),
          className: "bg-gray-50 dark:bg-dark-200 rounded-xl border-none",
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: (theme) => theme.palette.primary.main,
            },
          },
        }}
      />

      {username && (
        <Card className="absolute w-full mt-1 z-50 rounded-xl overflow-hidden shadow-lg animate-fade-in">
          <div className="max-h-[400px] overflow-y-auto">
            {auth.searchResult.length > 0 ? (
              auth.searchResult.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    handleClick(item.id);
                    setUsername("");
                  }}
                  className="hover:bg-gray-50 dark:hover:bg-dark-200 transition-colors cursor-pointer"
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        src={item.image}
                        alt={item.firstName}
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: "primary.main",
                        }}
                      />
                    }
                    title={
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {item.firstName} {item.lastName}
                      </span>
                    }
                    subheader={
                      <span className="text-gray-500 dark:text-gray-400">
                        @
                        {item.firstName.toLowerCase() +
                          "_" +
                          item.lastName.toLowerCase()}
                      </span>
                    }
                  />
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No users found
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default SearchUser;
