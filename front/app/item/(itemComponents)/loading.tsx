import React from "react";
import { Spin } from "antd";

const Loading: React.FC<CustomSpinProps> = () => {
  return (
    <div className="loading">
      {" "}
      <Spin
        className="flex items-center place-content-center justify-center red-spin red-6 text-center content-center"
        size="large"
        style={{
          height: "10%",
          width: "50%",
          margin: "100%",

          color: "red",
        }}
      />
    </div>
  );
};

export default Loading;
