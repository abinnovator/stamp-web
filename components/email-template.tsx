import { Heading, Tailwind,Text } from '@react-email/components';
import * as React from 'react';
import Emailheader from './email-header';

interface EmailTemplateProps {
  firstName: string;
}

export function EmailTemplate() {
  return (
    <Tailwind config={{theme: {extend: {colors: {background: '#FFE88E'}}}}}>
        <div className='bg-background'>
            <Emailheader  />
            <Heading className="text-center">Thanks for signing up!</Heading>  
            <Text className='text-center'>Hey! Thanks for showing your intrest in Stamp. As appreciation you&apos;ll be one of the first people to get access to Stamp!</Text>
            <Emailheader />
        </div>
        
    </Tailwind>
  );
}