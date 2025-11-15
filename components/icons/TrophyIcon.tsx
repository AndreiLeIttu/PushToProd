import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface TrophyIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const TrophyIcon: React.FC<TrophyIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = 'currentColor' 
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M4 22h16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M10 14.66V22h4v-7.34" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M7 9v1a5 5 0 0 0 10 0V9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M12 9V2.19C12 1.53 11.47 1 10.81 1H9.19C8.53 1 8 1.53 8 2.19V9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);
