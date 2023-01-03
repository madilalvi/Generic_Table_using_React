import React from "react";
import Axios from "axios";
import Table from "./Table";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [actions, setActions] = useState([]);

  const GetData = () => {
    Axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>Home</p>
      <button onClick={() => GetData()}>h1</button>

      <Table data={data} Actions={actions} />
    </div>
  );
}
