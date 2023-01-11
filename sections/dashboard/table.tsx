import React from "react";
/** Redux */
import {
  useAppDispatch,
} from '../../store/hooks';
import {
  setUserList,
} from '../../store/users/userSlice';

interface tableProps {
  data: {
    branchId: number;
    userName: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    position: string;
  }[];
  userInfo?: any
}

const Table: React.FC<tableProps> = ({ data, userInfo }) => {
  const dispatch = useAppDispatch();

  const onDeleteUser = (branchId: number, userName: string) => {
    const newUserList = data.filter(
      (user) => user.branchId !== branchId && user.userName !== userName
    );
    
    dispatch(setUserList(newUserList));
  };

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-solid border border-gray-300 text-left font-body">
              #
            </th>
            <th className="px-4 py-2 border-solid border border-gray-300 text-left font-body">
              Branch ID
            </th>
            <th className="px-4 py-2 border-solid border border-gray-300 text-left font-body">
              Username
            </th>
            <th className="px-4 py-2 border-solid border border-gray-300 text-left font-body">
              Name
            </th>
            <th className="px-4 py-2 border-solid border border-gray-300 text-left font-body">
              Position
            </th>
            <th className="px-4 py-2 border-solid border border-gray-300 text-left font-body">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td className="border px-4 py-2 text-left font-body">{i + 1}</td>
              <td className="border px-4 py-2 text-left font-body">
                {item.branchId}
              </td>
              <td className="border px-4 py-2 text-left font-body">
                {item.userName}
              </td>
              <td className="border px-4 py-2 text-left font-body">{`${item.firstName} ${item.middleName} ${item.lastName}`}</td>
              <td className="border px-4 py-2 text-left font-body">
                {item.position}
              </td>
              <td className="px-4 py-2">
                {userInfo?.branchId !== item.branchId && userInfo?.userName !== item.userName && (
                <button
                  onClick={() => onDeleteUser(item.branchId, item.userName)}
                >
                  Remove
                </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
