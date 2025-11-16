import React from 'react';
import Svg, { Path, Line } from 'react-native-svg';

interface ScaleIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const ScaleIcon: React.FC<ScaleIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = 'currentColor' 
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M3 7h18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M3 17h18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M6 7l6-4 6 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M6 17l6 4 6-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

