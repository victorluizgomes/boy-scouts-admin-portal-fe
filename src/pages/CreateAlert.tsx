import React, { useState } from 'react';
import AlertForm from '../components/AlertForm';
import AlertDisplayList from '../components/AlertDisplayList';

const CreateAlert: React.FC = () => {

  // State to act as a trigger for fetching new data
  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);

  return (
    <div>
      <h1 className='mb-4 text-2xl font-bold'>Create Alert</h1>
      <AlertForm onPostSuccess={() => setRefreshTrigger(!refreshTrigger)} />
      <AlertDisplayList refreshData={refreshTrigger} />
    </div>
  );
};

export default CreateAlert;