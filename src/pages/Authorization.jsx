import React from "react";
import { Helmet } from "react-helmet";
import AuthorizationForm from "../modules/AuthorizationForm";

function Authorization() {
  return (
    <>
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <AuthorizationForm />
    </>
  );
}

export default Authorization;
