// import { Card, Timeline, Typography } from "antd";
import React from "react";
import mainimg from "./vin2.jpg";
// import { useMoralis } from "react-moralis";
// const styles = {
//   title: {
//     fontSize: "20px",
//     fontWeight: "700",
//   },
//   text: {
//     fontSize: "16px",
//   },
//   card: {
//     boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
//     border: "1px solid #e7eaf3",
//     borderRadius: "0.5rem",
//   },
//   timeline: {
//     marginBottom: "-45px",
//   },
// };
export default function Menu() {
  // const { Moralis } = useMoralis();

  const styles = {
    container: {
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },
  };

  return (
    <div style={styles.container}>
      <img src={mainimg} alt="vin" />
    </div>
  );
}
