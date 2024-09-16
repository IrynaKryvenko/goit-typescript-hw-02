import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { SubmitSearchBar } from "../../types";

interface SearchBarProps {
  onSubmit: SubmitSearchBar;
}

const SearchBar = function ({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState<string>("");

  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      const paramToast: Record<
        string,
        string | number | Record<string, string | number>
      > = {
        position: "top-right",
        style: {
          backgroundColor: "aquamarine",
          color: "green",
        },
      };
      toast("Please enter our search request", paramToast);
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmitForm}>
        <Toaster />
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChangeQuery}
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;