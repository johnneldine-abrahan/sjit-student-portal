import React, { useEffect } from "react";
import "./Registrar_layout.css";
import ConfirmEnrollment_Content from "../components/Registrar/ConfirmEnrollment/ConfirmEnrollment_Content/ConfirmEnrollment_Content";
import ConfirmEnrollment_Sidebar from "../components/Registrar/ConfirmEnrollment/ConfirmEnrollment_Sidebar/ConfirmEnrollment_Sidebar";

const Registrar_ConfirmEnrollment = () => {
  useEffect(() => {
    document.title = "Registrar - Confirm Enrollment";
  }, []);

  return (
    <div className="registrar-body">
      <div className="registrar-display">
        <ConfirmEnrollment_Sidebar />
        <div className="registrar-main-content">
          <ConfirmEnrollment_Content />
        </div>
      </div>
    </div>
  );
};

export default Registrar_ConfirmEnrollment;
