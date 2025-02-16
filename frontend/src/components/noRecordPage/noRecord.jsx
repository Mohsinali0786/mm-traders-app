import * as React from "react";

export default function NoRecordFound({}) {
  const style = {
    noRecordDiv: {
      height: "calc(100vh - 90px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
  return <div style={style.noRecordDiv}>No Record Found</div>;
}
