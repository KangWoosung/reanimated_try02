module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "react-native-reanimated/plugin", // <-- 요거 추가, 주의!! 가장 마지막 라인에 있어야 함
    ],
  };
};
