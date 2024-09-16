import { ReactNode } from "react";
import { ClickLoadMoreBtn } from "../../types";
import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  children: string;
  onClick: ClickLoadMoreBtn;
  disabled: boolean;
}

const LoadMoreBtn = function ({
  children,
  onClick,
  disabled,
}: LoadMoreBtnProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const heightForScroll = e.currentTarget.getBoundingClientRect().top - 32;
    onClick(heightForScroll);
  };

  return (
    <button
      className={css.btn}
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default LoadMoreBtn;