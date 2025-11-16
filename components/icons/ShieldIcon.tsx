import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ShieldIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const ShieldIcon: React.FC<ShieldIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = 'currentColor' 
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

