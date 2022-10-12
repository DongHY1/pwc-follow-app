import React from "react";
import Form from "./components/Form";
import { FormStatus } from "../common/enum";

export default function signup() {
  return <Form status={FormStatus.REGISTER} />;
}
