function Form({ formData, handleFormDataChange }) {
  return (
    <form className="form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Give it a name"
          autoComplete="off"
          value={formData.name}
          onChange={handleFormDataChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description (optional)</label>
        <textarea
          name="description"
          id="description"
          placeholder="Add a description"
          rows={5}
          value={formData.description}
          onChange={handleFormDataChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Image URL (optional)</label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          placeholder="Add an image url"
          autoComplete="off"
          value={formData.imageUrl}
          onChange={handleFormDataChange}
        />
      </div>
    </form>
  )
}

export default Form
