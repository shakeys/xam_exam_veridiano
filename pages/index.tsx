import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import moment from 'moment';
/** Redux */
import {
  useAppDispatch,
} from '../store/hooks';
import {
  setUserList,
} from '../store/users/userSlice';
/** Next */
import Head from "next/head";
import { useRouter } from "next/router";
/** Validation */
import { Formik } from "formik";
import * as Yup from "yup";
/** Components */
import Alert from "../components/Alert";
import Button from "../components/Button";
import TextField from "../components/Textfield";
/** Config */
import config from "../utils/config";
/** Data */
import users from "../utils/data/users";

/** Validation schema for login form */
const validationSchema = Yup.object().shape({
  branchId: Yup.string().required("This is a required field."),
  userName: Yup.string().required("This is a required field."),
  password: Yup.string().required("This is a required field."),
});

interface LoginValues {
  branchId: string;
  userName: string;
  password: string;
}

const Login: React.FC<LoginValues> = () => {
  const dispatch = useAppDispatch();
  const cookie = useMemo(() => new Cookies(), []);
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const initialValues: LoginValues = {
    branchId: "",
    userName: "",
    password: "",
  };

  const onLogin = (values: LoginValues) => {
    let currentDate = moment();
    let tomorrow = currentDate.add(1, 'days');
    
    let user = users.find(
      (row) =>
        Number(values.branchId) === Number(row.branchId) &&
        values.userName === row.userName
    );

    if (!user) {
      setError("Error: User doesn't exist");
    } else if (values.password !== user.password) {
      setError("Error: Password is incorrect");
    } else {
      setError("");

      cookie.set("XAM_Data", {
        branchId: values.branchId,
        userName: values.userName,
        expires: tomorrow.toDate(),
      });

      dispatch(setUserList(users));
      router.push(config.URL.DASHBOARD);
    }
  };

  useEffect(() => {
    const authData = cookie.get("XAM_Data");
    const authExpired = authData && new Date(authData.expires) < new Date();

    if (authExpired) {
      cookie.remove("XAM_Data");
      router.push(config.URL.LOGIN);
    } else if (authData) {
      router.push(config.URL.DASHBOARD);
    } else {
      router.push(config.URL.LOGIN);
    }
  }, [cookie, router]);

  return (
    <div className="bg-white h-screen w-full flex items-center justify-center">
      <Head>
        <title>XAM Exam - Login</title>
      </Head>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onLogin(values);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          isValid,
        }) => (
          <form
            className="w-full sm:w-auto flex justify-center"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="border-solid border-[1px] border-black sm:w-[478px] w-[90%] px-5 py-10 grid grid-flow-row gap-5">
              <h2 className="w-full font-body font-normal text-black">Login</h2>

              <div>
                <TextField
                  value={values.branchId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Branch ID"
                  id="branchId"
                  error={errors.branchId}
                />

                <TextField
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="User name"
                  id="userName"
                  error={errors.userName}
                />

                <TextField
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  id="password"
                  error={errors.password}
                />

                <Button
                  disabled={!isValid}
                  type="submit"
                  text="LOGIN"
                  onClick={handleSubmit}
                  fullWidth
                />
              </div>

              {error !== "" && <Alert type="error" text={error} />}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
