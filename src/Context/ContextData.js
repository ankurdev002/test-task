import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
const ContextData = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3004/UserData")
      .then((res) => setData(res.data));
  }, []);

  const tableData = () => {
    return data.map((item,index) => {
      return (
        <tr key={index}>
          <td>{item.Name}</td>
          <td>{item.age}</td>
          <td>{item.sex}</td>
          <td>{item.Emergency_Contact}</td>
          <td>
            <span>{item.idType}</span>:{item.govtId}
          </td>
          <td>
            <span>{item.guardian}</span>:{item.guardian_name}
          </td>
          <td>{item.nationality}</td>
        </tr>
      );
    });
  };

  console.log(data);

  return (
    <UserContext.Provider
      value={{
        data,
        headingData: tableData(),
        setD: (data) => setData(data),
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default ContextData;
