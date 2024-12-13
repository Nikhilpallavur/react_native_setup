import {Dimensions} from 'react-native';

/**
 * Calculate the flex value based on the given height and total height.
 * If the total height is not provided, it defaults to the device's screen height.
 * @param givenHeight - The specific height to allocate space to.
 * @param totalHeight - The total height of the container or device (optional).
 * @returns The calculated flex value.
 */

export const calculateFlex = ({
  givenHeight,
  totalHeight = Dimensions.get('window').height,
}: {
  givenHeight: number;
  totalHeight?: number;
}): number => {
  return givenHeight / totalHeight;
};
