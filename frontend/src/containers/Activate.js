import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verify_activation } from "../actions/auth";

const Activate = ({ match, verify_activation }) => {
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    const uid = match.params.uid;
    const token = match.params.token;
    verify_activation(uid, token);
    setVerified(true);
  }, [match, verify_activation]);

  if (verified) {
    return <Redirect to="/login" />;
  }
};

export default connect(null, { verify_activation })(Activate);
