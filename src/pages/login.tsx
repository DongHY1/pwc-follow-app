import React from "react";
import { FormStatus } from "../common/enum";
import Form from "./components/Form";
export default function login() {
  return <Form status={FormStatus.LOGIN} />;
}
