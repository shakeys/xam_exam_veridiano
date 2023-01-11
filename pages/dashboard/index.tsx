import React, { useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
/** Redux */
import {
  useAppSelector
} from "../../store/hooks";
import {
  getUsers,
} from '../../store/users/userSlice';
/** Next */
import Head from "next/head";
import { useRouter } from "next/router";
/** Components */
import Topbar from "../../components/Topbar";
/** Sections */
import Form from "../../sections/dashboard/form"
import Table from "../../sections/dashboard/table";
/** Configs */
import config from "../../utils/config";

interface userInfoProps {
  branchId: number,
  userName: string,
  password: string,
  firstName: string,
  middleName: string,
  lastName: string,
  position: string,
};

const Dashboard= () => {
  const router = useRouter();
  const users = useAppSelector(getUsers);
  const cookie = useMemo(() => new Cookies(), []);
  const [userInfo, setUserInfo] = useState<userInfoProps>();

  useEffect(() => {
    const authData = cookie.get("XAM_Data");
    const authExpired = authData && new Date(authData.expires) < new Date();
    
    if (authExpired) {
      cookie.remove("XAM_Data");
      router.push(config.URL.LOGIN);
    } else if (authData) {
      let user = users.find(
        (row) =>
          Number(authData.branchId) === Number(row.branchId) &&
          authData.userName === row.userName
      );

      setUserInfo(user);
    } else {
      router.push(config.URL.LOGIN);
    }
  }, [cookie, router, users]);
  
  return (
    <div className="h-screen w-full bg-white p-10">
      <Head>
        <title>XAM Exam - Dasboard</title>
      </Head>

      <Topbar title={userInfo?.userName} />
      <div className="grid grid-flow-col md:auto-cols-fr grid-cols-1 p-5 gap-5">
        <Form />
        <Table userInfo={userInfo} data={users} />
      </div>
    </div>
  )
}

export default Dashboard;
