import React from "react"
import styles from "./StepAvatar.module.css"
import Card from "../../../components/shared/Card/Card"
import Button from "../../../components/shared/Button/Button"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { setAvatar } from "../../../Store/activateSlice"
import { activate } from "../../../http"
import { setAuth } from "../../../Store/authSlice"
import Loader from "../../../components/shared/Loader/Loader"

const StepAvatar = () => {
  const { name, avatar } = useSelector((state) => state.activate)
  const dispatch = useDispatch()
  const [image, setImage] = useState("/images/monkey-avatar.png")
  const [loading, setLoading] = useState(false)
  function captureImage(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function () {
      //console.log(reader.result)
      setImage(reader.result)
      dispatch(setAvatar(reader.result))
    }
  }
  async function submit() {
    if(!name || !avatar) return
    setLoading(true)
    try {
      const { data } = await activate({ name, avatar })
      if (data.auth) {
        dispatch(setAuth(data))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if(loading) return <Loader message="Activation in progress..."/>
  return (
    <>
      <Card title={`Okay, ${name}!`} icon="monkey-emoji">
        <p className={styles.subHeading}>How's this photo ?</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={image} alt="avatar" />
        </div>
        <div>
          <input
            onChange={captureImage}
            id="avatarInput"
            type="file"
            className={styles.avatarInput}
          />
          <label className={styles.avatarLabel} htmlFor="avatarInput">
            Choose a different photo
          </label>
        </div>
        <div>
          <Button onClick={submit} text="Next" />
        </div>
      </Card>
    </>
  )
}

export default StepAvatar
