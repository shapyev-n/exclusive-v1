"use client";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import scss from "../Header.module.scss";
import { useState } from "react";
import { useSignoutMutation } from "../../../../../redux/api/auth";
import { useRouter } from "next/navigation";

export default function Auth({ user }) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const router = useRouter();

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [signout, { isLoading }] = useSignoutMutation();

  const handleLogout = async () => {
    try {
      const result = await signout().unwrap();
      if (result.success) {
        console.log("Logout successful");
      } else {
        alert(result.error || "An error occurred");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error during logout");
    }
  };

  return (
    <div className={scss.auth}>
      {user && (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title={user.email}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user.email} src={user?.user_metadata.avatar_url} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "5px",
              }}
            >
              <Typography>{user.name}</Typography>
              <Typography>{user.email}</Typography>
              <Button onClick={handleLogout} disabled={isLoading}>
                {isLoading ? "Logging out..." : "Logout"}
              </Button>
            </MenuItem>
          </Menu>
        </Box>
      )}
      {!user && (
        <IconButton onClick={() => router.push("/sign-in")} sx={{ p: 0 }}>
          <Avatar alt="login" src="avatar" />
        </IconButton>
      )}
    </div>
  );
}
