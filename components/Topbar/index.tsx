import React from "react";
import Cookies from "universal-cookie";
/** Redux */
import {
  useAppDispatch,
} from '../../store/hooks';
import {
  setUserList,
} from '../../store/users/userSlice';
/** Next */
import { useRouter } from "next/router";
/** Components */
import Button from "../Button";
/** Config */
import config from "../../utils/config";

interface Props {
  title?: string
}

const Topbar: React.FC<Props> = ({ title }) => {
  const cookie = new Cookies();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onLogout = () => {
    cookie.remove("XAM_Data");
    router.push(config.URL.LOGIN);
    dispatch(setUserList([]));
  };

  return (
    <div className='w-full bg-white p-5 flex flex-row items-center justify-between'>
      <h1 className="font-body text-3xl font-bold text-black">{title}</h1>

      <Button text="LOGOUT" type="button" onClick={onLogout} />
    </div>
  )
};

export default Topbar;
