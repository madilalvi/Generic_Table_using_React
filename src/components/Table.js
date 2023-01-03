import React, { useState, useEffect } from "react";
import "./Table.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";

export default function Table(props) {
  const [isEditFieldVisible, setIsEditFieldVisible] = useState(-1);

  const [keys, setKeys] = useState([]);
  useEffect(() => {
    setKeys([
      ...new Set(
        props.data.reduce((acc, obj) => {
          return [...acc, ...Object.keys(obj)];
        }, [])
      ),
    ]);
  }, [props.data]);

  const setEditValue = (k) => {
    if (isEditFieldVisible === -1) {
      setIsEditFieldVisible(k);
    } else {
      setIsEditFieldVisible(-1);
      props.HandleEditSubmit(k);
    }
  };

  const setHandleDelete = (k) => {
    setIsEditFieldVisible(-1);
    props.HandleDelete(k);
  };

  return props.data.length !== 0 ? (
    <div className="App">
      <table>
        <tr>
          {keys.map((col) => {
            return <th>{col}</th>;
          })}
          <th>Actions</th>
        </tr>
        {props.data.map((val, key) => {
          return (
            <tr key={key}>
              {keys.map((col, i) => {
                return isEditFieldVisible === key ? (
                  <td>
                    <input
                      onChange={(e) => props.HandleEditChange(key, e)}
                      type="text"
                      defaultValue={val[col]}
                      name={col}
                    ></input>
                  </td>
                ) : (
                  <td>{val[col]}</td>
                );
              })}
              {props.Actions.map((e) => {
                if (
                  e === "Edit" &&
                  (isEditFieldVisible === -1 || isEditFieldVisible === key)
                ) {
                  return <EditIcon onClick={() => setEditValue(key)} />;
                } else if (e === "Delete") {
                  return (
                    <DeleteForeverIcon onClick={() => setHandleDelete(key)} />
                  );
                } else if (e === "View") {
                  return <RemoveRedEyeTwoToneIcon />;
                }
              })}
            </tr>
          );
        })}
      </table>
    </div>
  ) : (
    ""
  );
}
