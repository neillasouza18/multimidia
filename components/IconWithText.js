import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const IconWithText = ({ playing }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px' }}>
      {playing ? (
        <>
          <FaPause style={{ marginRight: '8px', fontSize: '32px' }} />
          <span style={{ fontSize: '24px' }}>Executando</span>
        </>
      ) : (
        <>
          <FaPlay style={{ marginRight: '8px', fontSize: '32px' }} />
          <span style={{ fontSize: '24px' }}>Pausado</span>
        </>
      )}
    </div>
  );
};

export default IconWithText;
