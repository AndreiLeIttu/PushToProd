import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface BookOpenIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const BookOpenIcon: React.FC<BookOpenIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = 'currentColor' 
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);
