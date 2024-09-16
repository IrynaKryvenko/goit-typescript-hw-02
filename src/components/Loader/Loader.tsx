import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = function () {
  return (
    <div className={css.loader}>
      <RotatingLines
        visible={true}
        width="40"
        strokeColor="green"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default Loader;