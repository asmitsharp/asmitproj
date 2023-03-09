import React, { useState } from "react"
import styles from "./StepOtp.module.css"
import Card from "../../../components/shared/Card/Card"
import Button from "../../../components/shared/Button/Button"
import TextInput from "../../../components/shared/TextInput/TextInput"
import { verifyOtp } from "../../../http/index"
import { useSelector } from "react-redux"
import { setAuth } from "../../../Store/authSlice"
import { useDispatch } from "react-redux"

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("")
  const { phone, hash } = useSelector((state) => state.auth.otp)
  const dispatch = useDispatch()

  async function submit() {
    if(!otp || !phone || !hash) return
    try {
      const { data } = await verifyOtp({ otp, phone, hash })
      dispatch(setAuth(data))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon="lock-emoji">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text="Next" />
          </div>
          <p className={styles.bottomPara}>
            By entering your number or email id, you're agreeing to our Terms of
            Service and Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </>
  )
}

export default StepOtp
