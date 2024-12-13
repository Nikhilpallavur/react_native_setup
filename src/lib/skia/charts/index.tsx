// // PieChart.tsx
// import React, {useEffect} from 'react';
// import {
//   Canvas,
//   Circle,
//   Path,
//   Group,
//   useSharedValue,
//   useAnimatedProps,
//   Easing,
//   runTiming,
// } from '@shopify/react-native-skia';

// interface PieChartProps {
//   data: {value: number; label: string; color: string}[];
//   size?: number; // Optional size prop for the chart
// }

// const PieChart: React.FC<PieChartProps> = ({data, size = 200}) => {
//   const total = data.reduce((sum, item) => sum + item.value, 0);
//   const halfSize = size / 2;

//   const animatedProgress = useSharedValue(0);

//   useEffect(() => {
//     animatedProgress.value = runTiming(animatedProgress.value, {
//       toValue: 1,
//       duration: 1000,
//       easing: Easing.inOut(Easing.ease),
//     });
//   }, []);

//   let startAngle = 0;

//   return (
//     <Canvas style={{width: size, height: size}}>
//       <Group>
//         {data.map((item, index) => {
//           const endAngle = startAngle + (item.value / total) * 2 * Math.PI;
//           const path = `M ${halfSize} ${halfSize} L ${
//             halfSize + halfSize * Math.cos(startAngle)
//           } ${
//             halfSize + halfSize * Math.sin(startAngle)
//           } A ${halfSize} ${halfSize} 0 ${item.value > total / 2 ? 1 : 0} 1 ${
//             halfSize + halfSize * Math.cos(endAngle)
//           } ${halfSize + halfSize * Math.sin(endAngle)} Z`;

//           const animatedProps = useAnimatedProps(() => {
//             return {
//               path: animatedProgress.value < 1 ? path : '',
//               color: item.color,
//             };
//           });

//           startAngle = endAngle;

//           return (
//             <Path key={index} animatedProps={animatedProps} style="fill" />
//           );
//         })}
//       </Group>
//     </Canvas>
//   );
// };

// export default PieChart;
