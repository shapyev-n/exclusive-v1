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
import { logout } from "../../../../../app/(root)/api/v1/auth/logout/actions";

export default function Auth({ user,  }) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className={scss.auth}>
      {
        (user && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={ user.email}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={ user.image}
                  src={user?.image}
                />
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
                <Typography>{ user.name}</Typography>
                <Typography>{ user.email}</Typography>
                {user && <Button onClick={logout}>Logout</Button>}
              </MenuItem>
            </Menu>
          </Box>
        ))}
      {}
    </div>
  );
}
