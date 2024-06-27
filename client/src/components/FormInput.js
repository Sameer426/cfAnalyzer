import './FormInput.css';

const FormInput = ({ handle, startDate, endDate, setChangeName, setChangeStartDate, setChangeEndDate, handleSubmit }) => {
  return (
    <div className="form-container">
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="handle">Codeforces Handle</label>
          <input 
            type="text" 
            id="handle" 
            value={handle} 
            onChange={(e) => setChangeName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Date From</label>
          <input 
            type="date" 
            id="startDate" 
            value={startDate} 
            onChange={(e) => setChangeStartDate(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Date To</label>
          <input 
            type="date" 
            id="endDate" 
            value={endDate} 
            onChange={(e) => setChangeEndDate(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="submit-btn">Analyze</button>
      </form>
    </div>
  );
};

export default FormInput;
