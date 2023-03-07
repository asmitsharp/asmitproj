import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import Card from "../../components/shared/Card/Card";
import styles from "./Home.module.css";

const Home = () => {
  const signinLink = {
    color: "#0077ff",
    textDecoration: "none",
    fontWeight: "bold",
    marginLeft: "10px",
  };

  const navigate = useNavigate();

  function startRegister() {
    navigate("/authenticate");
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to Poderhouse!" icon="logo">
        <p className={styles.text}>
          We're working hars to get Poderhouse ready bfor everyone! while we
          wrap up the finishing touches, we're adding people gradually to make
          sure nothing breaks.
        </p>
        <div>
          <Button onClick={startRegister} text="Let's Go" />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text ?</span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
