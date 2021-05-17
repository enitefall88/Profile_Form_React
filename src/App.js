import React, {useState} from "react"
import * as Y from "yup"

export default function CreateForm() {
  let initialInputs = {
  username: "",
  email: "",
  about: "..."
  }

  let [inputs, setInputs] = useState(initialInputs)
  let [errors, setErrors] = useState()
  let [busy, setBusy] = useState()

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
    async function onSubmit(event) {
    event.preventDefault()
    let errors = await schema.validate(inputs, {abortEarly: false})
      .then(_ => ({}))
      .catch(convert)
    setErrors(errors)
    if (!Object.keys(errors).length) {
      console.log(inputs)
    } else {
      console.log(errors)
    }
  }

  return <div className="p-3">
    <h1 className="h3 mb-3">Edit Profile</h1>
    <form autoComplete="off"
          style={{maxWidth: "800px"}}
          onSubmit={onSubmit}>
      <div className="form-group">
        <label>Username</label> ()<br/>
        <input name="username"
               className="form-control"
               type="text"
               value={inputs.username}
               onChange={onChange}/>
      </div>
       <div className="form-group">
        <label>Email</label> ()<br/>
        <input name="email"
               className="form-control"
               type="email"
               value={inputs.email}
               onChange={onChange}/>
      </div>
      <div className="form-group">
    <label>About</label> ()<br/>
    <textarea name="about"
      rows={5}
      className="form-control"
      value={inputs.about}
      onChange={onChange}/>
  </div>
      <div>
        <button className="btn btn-primary"
                disabled={false}>
          Save
        </button>
      </div>
    </form>
  </div>
  }


let schema = Y.object().shape({
  username: Y.string().required()
    .min(3).max(50),
  email: Y.string().required()
    .min(3).max(500),
  about: Y.string().required()
      .min(3).max(500).required()
})

let convert = (errors) => {
  return errors.inner.reduce((z, item) => {
    let name = (item.path || "").includes(".")
      ? item.path.split(".")[0]
      : item.path || ""
    return z[item.path || ""] ? z : {...z, [name]: item.message}
  }, {})
}
