import React from "react";
import "../styles/pages/Error404.scss";

function Error404() {
  return (
    <div className="error404">
      <h2 className="title">404 Stranica nije nađena</h2>
      <div className="sentence">Možda ste zalutali u krivu partiju?</div>
    </div>
  );
}

export default Error404;
