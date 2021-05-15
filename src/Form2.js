import React from "react";

export default function Form2() {
return <div className="p-3">
    <h1 className="h3 mb-3">Create Post</h1>
    <form autoComplete="off"
          style={{maxWidth: "800px"}}
          onSubmit={onSubmit(handleSubmit)}>
      <div className="form-group">
        <label>Title</label> ({errors.title || "*"})<br/>
        <input name="title"
               className="form-control"
               type="text"
               value={inputs.title}
               onChange={onChange}/>
      </div>
      <div className="form-group">
        <label>Body</label> ({errors.body || "*"})<br/>
        <textarea name="body"
                  rows={5}
                  className="form-control"
                  value={inputs.body}
                  onChange={onChange}/>
      </div>
      <div className="form-group">
        <label>Status</label><br/>
        <select name="status" value={inputs.status} onChange={onChange} className="form-control">
          {statuses.map(status => <option key={status}>{status}</option>)}
        </select>
      </div>
      <div>
        <button className="btn btn-primary"
                disabled={busy}>
          Create {busy && <i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i>}
        </button>
      </div>
    </form>
  </div>
 }
