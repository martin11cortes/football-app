
function Field() {
  return (
    <>
      <input type="text" name="location" placeholder="Location" />
      <button>Schedule</button>
      <select name="type">
        <option value="">Type</option>
        <option value="5">5</option>
        <option value="8">8</option>
        <option value="11">11</option>
      </select>
    </>
  );
}

export default Field;
