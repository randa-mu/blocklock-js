export default {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      useESM: true,
    }],
  },
  testTimeout: 10000,
};
