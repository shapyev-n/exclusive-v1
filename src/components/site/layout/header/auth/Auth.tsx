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
import { signOut } from "next-auth/react";
import { useState } from "react";
import { logout } from "../../../../../app/(root)/api/v1/auth/logout/actions";

export default function Auth({ user, session }) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className={scss.auth}>
      {session ||
        (user && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={session?.user?.email || user.email}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={session?.user?.email || user.image}
                  src={session?.user?.image}
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
                <Typography>{session?.user?.name || user.name}</Typography>
                <Typography>{session?.user?.email || user.email}</Typography>
                {user && <Button onClick={logout}>Logout</Button>}
                {session && <Button onClick={() => signOut()}>Logout</Button>}
              </MenuItem>
            </Menu>
          </Box>
        ))}
      {}
    </div>
  );
}
