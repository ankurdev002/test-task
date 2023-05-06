import React, { useContext } from "react";
import { UserContext } from "../Context/ContextData";

const UserTable = () => {
  const DataValues = useContext(UserContext);

  return (
    <div className="contain">
      <div className="backdrop">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Mobile</th>
              <th>Govt ID</th>
              <th>Guardian Details</th>
              <th>Nationality</th>
            </tr>
          </thead>
          <tbody>{DataValues.headingData}</tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
