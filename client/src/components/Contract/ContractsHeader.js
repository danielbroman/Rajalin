import React from "react";

const ContractsHeader = () => {
  return (
    <div>
      <div className="row p-2 bg-dark text-white">
        <div className="col-md-3">
          <b>Consignor</b>
        </div>
        <div className="col-md-3">
          <b>Date created</b>
        </div>
        <div className="col-md-4">
          <b>StartAddress</b>
        </div>
      </div>
    </div>
  );
};

export default ContractsHeader;
