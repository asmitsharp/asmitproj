import React, { useState } from "react"
import styles from "./StepPhoneEmail.module.css"
import Phone from "./Phone/Phone"
import Email from "./Email/Email"

const phoneEmailMap = {
  phone: Phone,
  email: Email,
}

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone")
  const Type = phoneEmailMap[type]
  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrap}>
            <button
              className={`${styles.tabButton} ${
                type === "phone" ? styles.active : ""
              }`}
              onClick={() => {
                setType("phone")
              }}
            >
              <img src="/images/phone-white.png" alt="Phone" />
            </button>
            <button
              className={`${styles.tabButton} ${
                type === "email" ? styles.active : ""
              }`}
              onClick={() => {
                setType("email")
              }}
            >
              <img src="/images/mail-white.png" alt="Email" />
            </button>
          </div>
          <Type onNext={onNext} />
        </div>
      </div>
    </>
  )
}

export default StepPhoneEmail
