import React, {useState} from "react";
import DeleteExamForm from "../components/deleteExamForm";
import AdminControl from "../components/admin";
import Table from '../components/table/TableExams'

function DeleteExam() {
  return (
    <div>
      <DeleteExamForm />
    </div>
  );
}

export default DeleteExam;