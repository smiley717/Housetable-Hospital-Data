type Env = {
  NODE_ENV?: string;
  PORT?: string;
  ORIGIN: string;
  CLIENT_ORIGIN: string;
  SESSION_SECRET: string;
  DATABASE_URL: string;
};

const requiredNames = [
  "ORIGIN",
  "CLIENT_ORIGIN",
  "SESSION_SECRET",
  "DATABASE_URL",
];

const getEnv = (): Env => {
  const missing = [];
  requiredNames.forEach((name) => {
    if (!process.env[name]) {
      missing.push(name);
    }
  });

  if (missing.length) {
    console.error("Missing environment variables:");
    console.error();
    missing.forEach((name) => {
      console.error(`  ${name}`);
    });
    console.error();
    console.error("Did you set up a .env file?");
    console.error();
    return process.exit(1);
  }

  return {
    NODE_ENV: process.env["NODE_ENV"],
    PORT: process.env["PORT"],
    ORIGIN: required("ORIGIN"),
    CLIENT_ORIGIN: required("CLIENT_ORIGIN"),
    SESSION_SECRET: required("SESSION_SECRET"),
    DATABASE_URL: required("DATABASE_URL"),
  };
};

const required = (name: string): string => {
  if (!process.env[name]) {
    throw new MissingEnvError(name);
  }

  return process.env[name];
};

class MissingEnvError extends Error {
  name: string;

  constructor(name: string) {
    super(`Missing environment variable: ${name}`);

    this.name = name;
  }
}

export default getEnv();
