import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
export default function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <div>
      <ButtonIcon disabled={isLoading} onClick={logout}>
        {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
      </ButtonIcon>
    </div>
  );
}