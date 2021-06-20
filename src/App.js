import React, {useState} from "react"
import * as Y from "yup"

function useEditProfile(profile) {

let [inputs, setInputs] = useState({
    username: profile.username,
    email: profile.email,
    about: profile.about,
  })
  let [errors, setErrors] = useState({})
  let [busy, setBusy] = useState(false)
  return {inputs, errors, busy, setInputs, setErrors, setBusy}
}

export default function EditProfileForm() {
  let {inputs, errors, busy, setInputs, setErrors, setBusy} = useEditProfile({
     username: "john",
     email: "john@gmail.com",
     about: "Bio info",
   })

  async function onChange(event) {
    let {target: {type, name, value, checked}} = event
    value = type == "checkbox" ? checked : value
    // Validation here delays visual feedback but minimizes the # of DOM updates
    let inputErrors = await schema.validateAt(name, {[name]: value}, {abortEarly: false})
      .then(_ => ({[name]: ""}))
      .catch(convert)
    setInputs(inputs => ({...inputs, [name]: value}))
    setErrors({...errors, ...inputErrors})
  }
  function onSubmit(afterSubmit) {
    return async function (event) {
      event.preventDefault()
      setBusy(true)
      let errors = await schema.validate(inputs, {abortEarly: false})
        .then(_ => ({}))
        .catch(convert)
      setErrors(errors)
      if (Object.keys(errors).length) {
        setBusy(false)
      } else {
        await afterSubmit(inputs)
        setBusy(false)
      }
    }
  }
  async function handleSubmit(inputs) {
    await delay(500)
    console.log(inputs)
  }
  return <div className="p-3">
    <h1 className="h3 mb-3">Edit Profile</h1>
    <form autoComplete="off"
          style={{maxWidth: "800px"}}
          onSubmit={onSubmit(handleSubmit)}>
      <div className="form-group">
        <label>Username</label> ({errors.username || "*"})<br/>
        <input name="username"
               className="form-control"
               type="text"
               value={inputs.username}
               onChange={onChange}/>
      </div>
      <div className="form-group">
        <label>Email</label> ({errors.email || "*"})<br/>
        <input name="email"
               className="form-control"
               type="email"
               value={inputs.email}
               onChange={onChange}/>
      </div>
      <div className="form-group">
        <label>About</label> ({errors.about || "*"})<br/>
        <textarea name="about"
                  className="form-control"
                  type="text"
                  value={inputs.about}
                  onChange={onChange}
                  rows={6}/>
      </div>
      <div>
        <button className="btn btn-primary"
                disabled={busy}>
          Save {busy && <i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i>}
        </button>
      </div>
    </form>
  </div>
}
let schema = Y.object().shape({
  username: Y.string().required()
    .min(3).max(50)
    .matches(/^[-a-z0-9]*$/),
  email: Y.string().email().required()
    .min(3).max(50),
  about: Y.string().required()
    .min(3).max(500),
})
let convert = (errors) => {
  return errors.inner.reduce((z, item) => {
    let name = (item.path || "").includes(".")
      ? item.path.split(".")[0]
      : item.path || ""
    return z[item.path || ""] ? z : {...z, [name]: item.message}
  }, {})
}
function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}
