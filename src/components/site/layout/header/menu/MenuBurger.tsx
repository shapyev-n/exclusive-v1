import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Menu, IconButton, MenuItem } from "@mui/material";
import { links, linksAuth } from "../../../../../helpers/links";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";

export default function MenuBurger({
  isMobileIcons,
  StyledBadge,
  user,
  basketItems,
  favoriteData,
}) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const pathName = usePathname();
  const route = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon sx={{ fontSize: "40px" }} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: "block", md: "none" }, width: "400px" }}
      >
        {(user ? linksAuth : links).map((el, index) => (
          <Link key={index} onClick={handleCloseNavMenu} href={el.href}>
            <MenuItem
              sx={
                pathName === el.href
                  ? {
                      color: "#fff",
                      background: "#000",
                      "&:hover": { background: "gray" },
                    }
                  : { color: "#000" }
              }
            >
              {el.name}
            </MenuItem>
          </Link>
        ))}
        {isMobileIcons && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              paddingInline: "20px",
            }}
          >
            <IconButton
              aria-label="favorite"
              onClick={() => {
                route.push("/favorite");
              }}
            >
              <StyledBadge
                badgeContent={user ? favoriteData?.length : null}
                color="secondary"
              >
                <IoMdHeartEmpty style={{ fontSize: "26px" }} />
              </StyledBadge>
            </IconButton>
            <IconButton
              aria-label="cart"
              onClick={() => {
                route.push("/cart");
              }}
            >
              <StyledBadge
                badgeContent={user ? basketItems?.length : null}
                color="secondary"
              >
                <IoCartOutline style={{ fontSize: "26px" }} />
              </StyledBadge>
            </IconButton>
          </div>
        )}
      </Menu>
    </Box>
  );
}
