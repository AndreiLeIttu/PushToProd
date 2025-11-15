import React from 'react';
import Svg, { Path, Circle, Line } from 'react-native-svg';

interface PercentIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const PercentIcon: React.FC<PercentIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = 'currentColor' 
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Circle cx="7" cy="7" r="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Circle cx="17" cy="17" r="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Line x1="19" y1="5" x2="5" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

