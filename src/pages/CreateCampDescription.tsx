import React, { useState } from 'react';
import CampDescriptionForm from '../components/CampDescriptionForm';
import CampDisplayList from '../components/CampDisplayList';

const CreateCampDescription: React.FC = () => {
  // State to act as a trigger for fetching new data
  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);

  return (
    <div>
      <h1 className='mb-4 text-2xl font-bold'>Create Camp Description</h1>
      <CampDescriptionForm onPostSuccess={() => setRefreshTrigger(!refreshTrigger)} />
      <CampDisplayList refreshData={refreshTrigger} />
    </div>
  );
};

export default CreateCampDescription;