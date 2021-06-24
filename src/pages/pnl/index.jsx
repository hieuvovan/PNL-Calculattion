import React from 'react';
import PnlForm from './components/PnlForm';
import Result from './components/Result';

const PnlPage = () => {
  return (
    <div className="container">
      <div className="page-wrapper">
        <PnlForm />
        <Result />
      </div>
    </div>
  );
}

export default PnlPage;
