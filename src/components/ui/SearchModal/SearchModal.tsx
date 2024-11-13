"use client";
import React, { useEffect, useState } from "react";
import scss from "./SearchModal.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import { DebounceInput } from "react-debounce-input";
import { useRouter } from "next/navigation";
import { useSearchQueryStore } from "../../../store/useSearchQueryStore";

const SearchModal = ({ setSearchMod }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const { setQuery } = useSearchQueryStore();
  const [isFocused, setIsFocused] = useState<boolean>(false);

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
    <div className={scss.modalOverlay}>
      <div className={scss.modalContent} onClick={(e) => e.stopPropagation()}>
        <DebounceInput
          placeholder="What are you looking for?"
          value={searchValue}
          minLength={2}
          debounceTimeout={300}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <h1
          onClick={() => {
            setSearchMod(false);
          }}
        >
          <IoCloseOutline />
        </h1>
      </div>
    </div>
  );
};

export default SearchModal;
