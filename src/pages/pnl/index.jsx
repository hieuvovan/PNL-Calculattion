import React from 'react';
import PnlForm from './components/PnlForm';
import Result from './components/Result';

const PnlPage = () => {
  return (
    <div className="container container-sm">
      <div className="page-wrapper f-column f-center-x-sm f-center-y-sm">
        <PnlForm />
        <Result />
      </div>
    </div>
  );
}

export default PnlPage;
