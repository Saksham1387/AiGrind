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
      {
        namespace: "db",
        name: "db",
        script: "pnpm dlx prisma generate",
        cwd: "./packages/db",
        watch: ".",
      },
    ],
};