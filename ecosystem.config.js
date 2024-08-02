module.exports = {
    apps: [
      {
        namespace: "web",
        name: "app",
        script: "pnpm run start",
        cwd: "./apps/web",
        watch: ".",
      },
      {
        namespace: "sweeper",
        name: "sweeper",
        script: "pnpm run start",
        cwd: "./apps/sweeper",
        watch: ".",
      },
    ],
};