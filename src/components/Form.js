import React from "react";
import { useState, useEffect } from "react";
import Table from "./Table";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import columns from "./TableData.json";
import AddIcon from "@mui/icons-material/Add";
import Actions from "./Action.json";
import axios from "axios";

export default function Form() {
  const [inputs, setInputs] = useState({});
  const [edits, setEdits] = useState({});
  const [data, setData] = useState([]);
  const [formJSON, setFormJSON] = useState(columns.column);
  const [isFieldVisible, setIsFieldVisible] = useState(false);
  const [newValue, setNewValue] = useState("");
  const link = "https://jsonplaceholder.typicode.com/posts";

  const GetData = () => {
    axios
      .get(link)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (data.length > 0 && data[0]) {
      setFormJSON([
        ...new Set(
          data.reduce((acc, obj) => {
            return [...acc, ...Object.keys(obj)];
          }, [])
        ),
      ]);
    }
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setData((oldArray) => [...oldArray, inputs]);

    axios.post(link, { inputs }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  const addField = () => {
    setIsFieldVisible(true);
  };

  const onSubmitClick = () => {
    setFormJSON((oldArray) => [...oldArray, newValue]);

    setIsFieldVisible(false);
  };

  const valueChange = (event) => {
    event.preventDefault();

    setNewValue(event.target.value);
  };

  const HandleDelete = (k) => {
    setData(
      data.filter((e, i) => {
        return i !== k;
      })
    );

    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${data.id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  const HandleEditChange = (key, e) => {
    setEdits(data[key]);
    const { name, value } = e.target;
    setEdits((values) => ({ ...values, [name]: value }));
  };

  const HandleEditSubmit = (key) => {
    let arr = data;
    arr[key] = edits;
    setData(arr);

    axios
      .put(link, arr[key])
      .then((response) =>
        this.setState({ updatedAt: response.data.updatedAt })
      );
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {formJSON.map((data) => {
          return (
            <TextField
              //id="outlined-name"
              label={data}
              variant="outlined"
              name={data}
              value={inputs[data] || ""}
              onChange={handleChange}
            />
          );
        })}
        <Button
          variant="contained"
          style={{ marginTop: "25px", maxWidth: "100px" }}
          type="submit"
        >
          Add
        </Button>
        <Button onClick={() => GetData()}>h1</Button>
        <Button
          variant="contained"
          style={{ marginTop: "25px", maxWidth: "100px" }}
          onClick={addField}
        >
          <AddIcon />
        </Button>
        {isFieldVisible && (
          <div>
            <input onChange={valueChange} type="text" name="field"></input>
            <Button onClick={onSubmitClick}>Submit</Button>
          </div>
        )}{" "}
      </Box>
      <Table
        data={data}
        HandleDelete={HandleDelete}
        HandleEditChange={HandleEditChange}
        HandleEditSubmit={HandleEditSubmit}
        Actions={Actions.Actions}
      />
    </div>
  );
}
