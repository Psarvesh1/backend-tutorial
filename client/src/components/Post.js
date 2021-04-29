import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Post(props) {

  const [data, setData] = useState({
    title: "",
    desc: "",
  });

  useEffect(() => {
    
    const token = localStorage.getItem("token");

    axios({
      method: "GET",
      url: "http://localhost:3001/api/user/post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    })
      .then((res) => {
        console.log(res.data.post);
        const details = res.data.post;
        setData({
          ...data,
          ...details,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleClick = () => {
    localStorage.removeItem("token");
    props.history.push("/login");
  };
  return (
    <div>
      {data.title} -- {data.desc}
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}
