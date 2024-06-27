import { useState } from 'react';
import FormInput from './components/FormInput';
import Analysis from './components/Analysis';
import Loading from './components/Loading';

function App() {
  const [backendData,setBackendData]=useState([{}]);
  const [showForm, setShowForm] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [handle, setHandle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading,setLoading]=useState(false);

  const changeShowForm = () => {
    setShowForm((e) => (!e));
  };

  const changeShowAnalysis = () => {
    setShowAnalysis((e) => (!e));
  };

  const setChangeName = (e) => {
    setHandle(e);
  };

  const setChangeStartDate = (e) => {
    setStartDate(e);
  };

  const setChangeEndDate = (e) => {
    setEndDate(e);
  };

  const handleSubmit = async (e) => {
    changeShowForm();
    e.preventDefault();
    setLoading(true);
    const data={
      handle,
      startDate,
      endDate,
    }

    const response= await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    })
    
    .then(response => response.json())
    .then(data => {
      setBackendData(data);
      setLoading(false);
      changeShowAnalysis();
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  return (
    <>
      {showForm && (
        <FormInput 
          handle={handle}
          startDate={startDate}
          endDate={endDate}
          setChangeName={setChangeName}
          setChangeStartDate={setChangeStartDate}
          setChangeEndDate={setChangeEndDate}
          handleSubmit={handleSubmit}
        />
      )}
      {loading && (
        <Loading/>
      )}
      {showAnalysis&& (
        <Analysis 
        backendData={backendData}/>
      )}
    </>
  );
}

export default App;
