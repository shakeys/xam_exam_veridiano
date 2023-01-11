import React from "react";
/** Redux */
import {
  useAppSelector,
  useAppDispatch,
} from '../../store/hooks';
import {
  setUserList,
  getUsers
} from '../../store/users/userSlice';
/** Validation */
import { Formik } from "formik";
import * as Yup from "yup";
/** Components */
import Button from "../../components/Button";
import TextField from "../../components/Textfield";

/** Validation schema for user form */
const validationSchema = Yup.object().shape({
  branchId: Yup.string().required("This is a required field."),
  userName: Yup.string().required("This is a required field."),
  firstName: Yup.string().required("This is a required field."),
  middleName: Yup.string().required("This is a required field."),
  lastName: Yup.string().required("This is a required field."),
  position: Yup.string().required("This is a required field."),
  password: Yup.string().required("This is a required field."),
});

interface FormValues {
  branchId: string;
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  password: string;
}

interface actualValues {
  branchId: number;
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  password: string;
}

const Form = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const initialValues: FormValues = {
    branchId: "",
    userName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    position: "",
    password: "",
  };

  const onAdd = (values: FormValues) => {
    const userList = {
      user_list: users as actualValues[]
    }

    const newUser = {
      branchId: Number(values.branchId),
      userName: values.userName,
      firstName: values.firstName,
      middleName: values.middleName,
      lastName: values.lastName,
      position: values.position,
      password: values.password,
    };

    let newUserList = [...userList.user_list, newUser];
    dispatch(setUserList(newUserList));
  };

  return (
    <div className="bg-white w-full flex items-center justify-center">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onAdd(values);
          resetForm();
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          handleReset,
          values,
          errors,
          isValid,
        }) => (
          <form
            className="w-full flex justify-center"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="border-solid bg-gray-200 border-[1px] border-black w-full px-5 py-10 grid grid-flow-row gap-5">
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
                  placeholder="Username"
                  id="userName"
                  error={errors.userName}
                />

                <TextField
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="First Name"
                  id="firstName"
                  error={errors.firstName}
                />

                <TextField
                  value={values.middleName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Middle Name"
                  id="middleName"
                  error={errors.middleName}
                />

                <TextField
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Last Name"
                  id="lastName"
                  error={errors.lastName}
                />

                <TextField
                  value={values.position}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Position"
                  id="position"
                  error={errors.position}
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

                <div className="flex flex-row items-center justify-end gap-5">
                  <Button
                    type="button"
                    text="RESET"
                    onClick={handleReset}
                    color="gray"
                  />

                  <Button
                    disabled={!isValid}
                    type="submit"
                    text="ADD"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Form;
