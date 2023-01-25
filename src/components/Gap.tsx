import { View } from "react-native";

type Props = {
  x?: number;
  y?: number;
}

export function Gap({ x = 0, y = 0 }: Props) {
  return (
    <View style={{ width: x, height: y }} />

  )
}
