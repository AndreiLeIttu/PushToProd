import React from 'react';
import Svg, { Path, Line } from 'react-native-svg';

interface ChartIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const ChartIcon: React.FC<ChartIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = 'currentColor' 
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Line x1="18" y1="20" x2="18" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Line x1="12" y1="20" x2="12" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Line x1="6" y1="20" x2="6" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

