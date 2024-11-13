"use client";
import React, { useEffect, useState } from "react";
import scss from "./SearchMulti.module.scss";
import { useRouter } from "next/navigation";
import { DebounceInput } from "react-debounce-input";
import { useSearchQueryStore } from "../../store/useSearchQueryStore";
import SearchIcon from "@mui/icons-material/Search";

const SearchMulti = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const router = useRouter();
  const { setQuery } = useSearchQueryStore();

  useEffect(() => {
    if (isFocused) {
      if (searchValue) {
        router.push(`/search/${searchValue}`);
      } else {
        router.push("/search");
      }
    }
    setQuery(searchValue);
  }, [searchValue]);

  return (
    <div className={scss.search_input_wrapper}>
      <DebounceInput
        className={scss.search_input}
        placeholder="What are you looking for?"
        value={searchValue}
        minLength={2}
        debounceTimeout={300}
        type="search"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onFocus={() => setIsFocused(true)}
      />
      <span className={scss.searchIcon}>
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchMulti;
