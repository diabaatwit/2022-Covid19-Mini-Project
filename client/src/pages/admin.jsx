import React, {useState} from "react";
import AdminControl from "../components/admin";
import Table from "../components/TableExams";

function Admin() {
  return (
    <div>
      <AdminControl />
      <Table />

    </div>
  );
}

export default Admin;