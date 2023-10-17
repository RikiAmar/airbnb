'use client';

import React from 'react';
import Image from 'next/image';

interface IAvatarProps {
  src : string | null | undefined
}

const Avatar: React.FC<IAvatarProps>  = ({src}) => {
  return (
        <Image className='rounded-full' width={30} height={30} alt="Avatar" src={src || "/images/Avatar.jpg" }/>
    
  )
}

export default Avatar