import './App.css';
import Report from './components/Report'
import Modal from './components/Modal'
import { useState } from 'react';

const App = () => {
  
  const [modal, setOpenModal] = useState(false);
  const pageHeight = 1200;
  const reportTitle = 'Report Generator'
  
  function openModal(){
    setOpenModal(true);
  }

  return (
    <div id="app" className="App container">
      <div className="d-flex align-items-center justify-content-center border-bottom" style={{height: pageHeight + 'px'}}>
        <h1 className="display-1 text-primary font-weight-bold">{reportTitle}</h1>
      </div>
      <Report 
        pageHeight={pageHeight}
        openModalCallback = {() => openModal()}/>
      <Modal
        openModal = {modal}
      />
    </div>
  );
}

export default App;
