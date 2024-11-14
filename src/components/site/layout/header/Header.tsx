"use client";
import scss from "./Header.module.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { categories, links, linksAuth } from "../../../../helpers/links";
import SearchMulti from "../../../shared/SearchMulti";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import logo from "../../../../assets/logo.jpg";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import Image from "next/image";
import Auth from "./auth/Auth";
import MenuBurger from "./menu/MenuBurger";
import SearchModal from "../../../ui/SearchModal/SearchModal";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useGetMeQuery } from "../../../../redux/api/auth";
import { useBasketStore } from "../../../../store/basketStore";
import { useFavoriteStore } from "../../../../store/favoriteStore";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Header() {
  const pathName = usePathname();
  const route = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);
  const [searchMod, setSearchMod] = useState<boolean>(false);
  const { data: user = null } = useGetMeQuery();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [mod, setMod] = useState<boolean>(false);

  const { basketItems } = useBasketStore();
  const { favoriteData } = useFavoriteStore();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    if (typeof window !== "undefined") handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobileIcons = windowWidth <= 500;
  const isMobile = windowWidth <= 768;
  const isMobileSearch = windowWidth <= 1000;

  const isAdmin = user && user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  useEffect(() => {
    if (!selectedCategory) {
      route.push("/");
    } else {
      route.push(`/categories/${selectedCategory}`);
    }
  }, [selectedCategory, route]);

  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>
            <Link href={"/"}>
              {isMobile ? (
                <Image src={logo} alt="logo" width={60} height={60} />
              ) : (
                <h1>Exclusive</h1>
              )}
            </Link>
            {isAdmin && (
              <Link href={"/admin"}>
                <AdminPanelSettingsIcon
                  sx={{ width: "40px", height: "40px" }}
                />
              </Link>
            )}
          </div>

          {!isMobile && (
            <div className={scss.header_nav}>
              {(user ? linksAuth : links).map((el, index) => (
                <Link
                  key={index}
                  className={`${scss.link} ${
                    pathName === el.href ? scss.active : ""
                  }`}
                  href={el.href}
                >
                  {el.name}
                </Link>
              ))}
            </div>
          )}

          <div className={scss.block}>
            {isMobileSearch ? (
              <SearchIcon
                sx={{ width: "30px", height: "30px" }}
                onClick={() => {
                  setSearchMod(true);
                  route.push("/search");
                }}
              />
            ) : (
              <SearchMulti />
            )}

            {!isMobileIcons && (
              <div className={scss.icons}>
                <IconButton
                  aria-label="favorite"
                  onClick={() => route.push("/favorite")}
                >
                  <StyledBadge
                    badgeContent={user ? favoriteData?.length : null}
                    color="secondary"
                  >
                    <IoMdHeartEmpty className={scss.icon} />
                  </StyledBadge>
                </IconButton>
                <IconButton
                  aria-label="cart"
                  onClick={() => route.push("/cart")}
                >
                  <StyledBadge
                    badgeContent={user ? basketItems?.length : null}
                    color="secondary"
                  >
                    <IoCartOutline className={scss.icon} />
                  </StyledBadge>
                </IconButton>
              </div>
            )}
            {isMobile && (
              <MenuBurger
                isMobileIcons={isMobileIcons}
                StyledBadge={StyledBadge}
                user={user}
                favoriteData={favoriteData}
                basketItems={basketItems}
              />
            )}
            <Auth user={user} />
          </div>
          {searchMod && <SearchModal setSearchMod={setSearchMod} />}
        </div>
        {isMobile && mod && (
          <span onClick={() => setMod(!mod)}>category ⬆️</span>
        )}
        {isMobile && !mod && (
          <span onClick={() => setMod(!mod)}>category ⬇️</span>
        )}
      </div>
      {isMobile && mod && (
        <div className={scss.category}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${scss.box} ${
                selectedCategory === category.label ? scss.active : ""
              }`}
              onClick={() => handleCategoryChange(category.label)}
            >
              <span>{category.icon}</span>
              <p>{category.label}</p>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
