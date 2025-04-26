import { makeImageFromView } from "@shopify/react-native-skia";

// Make Snapshot of the current screen
export const takeSnapshot = async (ref: any) => {
  console.log("takeSnapshot........");

  // Skia 이미지 생성 시 옵션 지정 없이 호출
  const snapshot = await makeImageFromView(ref);

  if (!snapshot) {
    console.error("Failed to create snapshot");
    return null;
  }

  return snapshot;
};
