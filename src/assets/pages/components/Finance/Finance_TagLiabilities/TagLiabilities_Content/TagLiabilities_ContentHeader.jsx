import React, { useState, useEffect } from "react";
import "./TagLiabilities_Content.css";
import { BiSearch } from "react-icons/bi";

import { BiEditAlt } from "react-icons/bi";
import { RiAddLargeFill, RiDeleteBin6Line } from "react-icons/ri";
import { RiInboxUnarchiveLine } from "react-icons/ri";

const TagLiabilities_ContentHeader = () => {
  return (
    <div className="tagliabilities-header">
      <h1 className="header-title">Tag Liabilities</h1>
      <div className="tagliabilities-activity">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <BiSearch className="search-icon" />
        </div>
        <div className="buttons-header">
          <div className="buttons-act">
            <RiAddLargeFill
              className="buttons-icon"
              onClick={() => handlePopup("add")}
            />
          </div>
          <div className="buttons-act">
            <BiEditAlt
              className="buttons-icon"
              onClick={() => handlePopup("edit")}
            />
          </div>
          <div className="buttons-act">
            <RiDeleteBin6Line
              className="buttons-icon"
              onClick={() => handlePopup("delete")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagLiabilities_ContentHeader;