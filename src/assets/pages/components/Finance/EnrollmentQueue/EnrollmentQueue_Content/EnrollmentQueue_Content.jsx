import React from "react";
import "./EnrollmentQueue_Content.css";
import EnrollmentQueue_ContentHeader from "./EnrollmentQueue_ContentHeader";
import EnrollmentQueue_List from "./EnrollmentQueue_List";

const EnrollmentQueue_Content = () => {
  return (
    <div className="confirm-enrollment-content">
      <EnrollmentQueue_ContentHeader />
      <EnrollmentQueue_List />
    </div>
  );
};

export default EnrollmentQueue_Content;