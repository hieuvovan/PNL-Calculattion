import React from 'react';
import PnlForm from './components/PnlForm';
import Result from './components/Result';

const PnlPage = () => {
  return (
    <div className="container container-sm">
      <div className="page-wrapper f-row f-column-sm f-center-x f-center-y">
        <PnlForm />
        <Result />
      </div>
    </div>
  );
}

export default PnlPage;
