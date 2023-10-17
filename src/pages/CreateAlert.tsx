import React from 'react';
import AlertForm from '../components/AlertForm';
import AlertDisplayList from '../components/AlertDisplayList';

const CreateAlert: React.FC = () => {
  return (
    <div>
      <h1 className='mb-4 text-2xl font-bold'>Create Alert</h1>
      <AlertForm />
      <AlertDisplayList />
    </div>
  );
};

export default CreateAlert;