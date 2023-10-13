import React from 'react';
import CampDescriptionForm from '../components/CampDescriptionForm';

const CreateCampDescription: React.FC = () => {
  return (
    <div>
      <h1 className='mb-4 text-2xl font-bold'>Create Camp Description</h1>
      <CampDescriptionForm />
    </div>
  );
};

export default CreateCampDescription;