import { useAppSelector } from "@utils/redux/store";

export default function Cardimg({ n, k, order = false }) {
  const gameMode = useAppSelector((s) => s.PlaygroundReducer?.gameMode);
  if (order) {
    return require(`../../../assets/images/${order}.png`);
  }
  if (n == 0) {
    return require(`../../../assets/images/default.png`);
  } else {
    const name = n < 8 ? n : -8 + n;
    return require(`../../../assets/images/${gameMode + name}.png`);
  }
}
