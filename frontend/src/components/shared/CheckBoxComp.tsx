import React, { useState } from 'react';
import {
  CheckmarkCircle24Regular,
  Circle24Regular,

} from '@fluentui/react-icons'

const CheckboxComp = ({ isChecked, onClick }: any) => {

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick(event);
  };

  return isChecked ? (
    <CheckmarkCircle24Regular onClick={handleClick} />
  ) : (
    <Circle24Regular onClick={handleClick} />
  );
};

export default CheckboxComp;