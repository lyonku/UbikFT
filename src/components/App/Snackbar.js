import { MainContext } from "components/shared/providers";
import { useContext } from "react";

function Snackbar() {
  const { snackbar } = useContext(MainContext);

  return snackbar;
}

export default Snackbar;
