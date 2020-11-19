import React, { useState } from "react";

const FormTodo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    important: false,
  });
  const { title, description, important } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onChangeCheck = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  const onSubmit = (e) => {
    e.preventDefault();

    setFormData({
      title: "",
      description: "",
      important: false,
    });
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Title"
            type="text"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Description"
            type="text"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
            rows="6"
            cols="10"
          />
        </div>
        <div className="form-group form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="important"
            onChange={(e) => onChangeCheck(e)}
            checked={important}
          />
          Important
        </div>
        <button className="btn btn-primary btn-block" type="submit">
          Save Todo
        </button>
      </form>
    </div>
  );
};

export default FormTodo;
