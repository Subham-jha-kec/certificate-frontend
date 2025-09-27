import { useState } from 'react';
import './index.css';
import logo from "./assets/NIELIT_logo__1_-removebg-preview.png"

function App() {
  const [certFiles, setCertFiles] = useState([]);
  const [scorecardFiles, setScorecardFiles] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    // Convert the FileList object to an array
    const fileArray = Array.from(files);

    if (name === 'certificates') {
      setCertFiles(fileArray);
    } else if (name === 'scorecards') {
      setScorecardFiles(fileArray);
    } else if (name === 'studentsCsv') {
      setCsvFile(fileArray[0]);
    }
  };

  const handleUpload = async () => {
    if (!csvFile || certFiles.length === 0 || scorecardFiles.length === 0) {
      setError('Please upload the CSV, certificates, and scorecards folders.');
      return;
    }
    
    setStatus('Processing... This may take a moment.');
    setError('');

    const formData = new FormData();
    formData.append('studentsCsv', csvFile);

    // Append all certificate and scorecard files to the FormData object
    // eslint-disable-next-line no-unused-vars
    certFiles.forEach((file, index) => {
      formData.append('certificates', file);
    });
    // eslint-disable-next-line no-unused-vars
    scorecardFiles.forEach((file, index) => {
      formData.append('scorecards', file);
    });

    try {
      // const response = await fetch('http://localhost:5000/distribute-files', {
      //   method: 'POST',
      //   body: formData,
      // });


      // const API_URL = import.meta.env.VITE_API_URL;
      // const response = await fetch(`${API_URL}/distribute-files`, {
      // method: 'POST',
      // body: formData,


      // const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`https://certificate-backend-9ksc.onrender.com/distribute-files`, {
      method: 'POST',
      body: formData,
});

      if (response.ok) {
        setStatus('Emails sent successfully! ✅');
      } else {
        const errorText = await response.text();
        setStatus('');
        setError(`Failed to distribute files: ${errorText}`);
      }
    } catch (err) {
      setStatus('');
      setError(`An error occurred: ${err.message}`);
    }
  };

  return (
    <div className="App w-full bg-blue-50 px-20">

        <nav className='h-20 border-b-2 border-blue-200 flex items-center'>
          <img src={logo} alt="logo" className='h-15'/>
        </nav>

        <div className='hero_section flex h-[88vh] items-center'>

          <div className='hero_left w-[50%]'>
            <div className='bg-green-100 w-fit px-6 py-1 text-base text-green-800 border-2 rounded-full border-dotted mb-4'>#10X Faster</div>

            <div className="tag_line text-7xl text-[#233886] font-semibold leading-tighter">File Distribution Automation</div>

            <div className="headline text-xl text-gray-600 mt-6">Effortlessly distribute certificates and scorecards to <br/> students with a single click.</div>

            <div></div>
          </div>

          <div className='hero_right w-[50%] flex justify-center'>
            <header className="App-header bg-white w-fit p-6 rounded-2xl shadow-2xl">
              <div className='text-3xl font-semibold text-gray-800'>
                Upload Heading
              </div>

              <div className="upload-section flex flex-col mt-8">
                <label className='text-xl'>1. Upload Student CSV:</label>
                <input type="file" name="studentsCsv" accept=".csv" onChange={handleFileChange} className='mt-2 p-2 bg-blue-50 border-2 border-blue-100 rounded-lg text-sm text-gray-600'/>
              </div>
              
              <div className="upload-section flex flex-col mt-4">
                <label className='text-xl'>2. Select Certificates Folder:</label>
                <input type="file" name="certificates" directory="" webkitdirectory="" onChange={handleFileChange} className='mt-2 p-2 bg-blue-50 border-2 border-blue-100 rounded-lg text-sm text-gray-600' />
              </div>
              
              <div className="upload-section flex flex-col mt-4">
                <label className='text-xl'>3. Select Scorecards Folder:</label>
                <input type="file" name="scorecards" directory="" webkitdirectory="" onChange={handleFileChange} className='mt-2 p-2 bg-blue-50 border-2 border-blue-100 rounded-lg text-sm text-gray-600'/>
              </div>
              
              <button onClick={handleUpload} disabled={!csvFile || certFiles.length === 0 || scorecardFiles.length === 0} className='mt-4 cursor-pointer hover:bg-[#233886eb] w-full bg-[#233886] text-white p-3 rounded-lg text-lg transition-all'>
                Distribute Files
              </button>
              
              {status && <p className="status-message">{status}</p>}
              {error && <p className="error-message">{error}</p>}
            </header>
          </div>

        </div>
      
    </div>
  );
}

export default App;