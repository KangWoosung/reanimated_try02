import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Pressable } from "react-native";

type DrawerIconProps = {
  color?: string;
  size?: number;
};

const DrawerIcon = ({ color = "black", size = 24 }: DrawerIconProps) => {
  const navigation = useNavigation();
  return (
    <Pressable
      className="p-sm pr-md"
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    >
      <Ionicons name="menu" size={size} color={color} />
    </Pressable>
  );
};

export default DrawerIcon;
