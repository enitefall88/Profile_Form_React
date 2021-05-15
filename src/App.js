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

    async function onSubmit(event) {
    event.preventDefault()
    let errors = await schema.validate(inputs, {abortEarly: false})
      .then(_ => ({}))
      .catch(convert)
    setErrors(errors)
    if (!Object.keys(errors).length) {
      console.log(inputs)
    }
  }

  return <div className="p-3">
    <h1 className="h3 mb-3">Edit Profile</h1>
    <form autoComplete="off"
          style={{maxWidth: "800px"}}
          onSubmit={onSubmit}>
      <div className="form-group">
        <label>Username</label> ({errors.title || "*"})<br/>
        <input name="username"
               className="form-control"
               type="text"
               value={inputs.title}
               onChange={null}/>
      </div>
       <div className="form-group">
        <label>Email</label> ({errors.title || "*"})<br/>
        <input name="email"
               className="form-control"
               type="email"
               value={inputs.email}
               onChange={null}/>
      </div>
      <div className="form-group">
    <label>About</label> ({errors.body || "*"})<br/>
    <textarea name="about"
      rows={5}
      className="form-control"
      value={inputs.body}
      onChange={null}/>
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
      .min(3).max(500)
})
let convert = (errors) => {
  return errors.inner.reduce((z, item) => {
    let name = (item.path || "").includes(".")
      ? item.path.split(".")[0]
      : item.path || ""
    return z[item.path || ""] ? z : {...z, [name]: item.message}
  }, {})
}
