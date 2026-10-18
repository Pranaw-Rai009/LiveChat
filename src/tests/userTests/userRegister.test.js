import { test, expect, vi } from "vitest";
import { RegisterUser } from "../../services/userServices/registerUser.js"; // adjust to your real path

test("register creates a USER", async () => {
  const fakePrisma = {
    user: {
      findUnique: vi.fn().mockResolvedValue(null),
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockImplementation(async ({ data }) => ({ id: 1, ...data })),
    },
  };

  const registerUser = new RegisterUser(fakePrisma);

  const userData = {
    userName: "pranaw",
    email: "p@test.com",
    password: "a-long-password-123",
    role: "USER",
  };

  const result =  await registerUser.register(userData)

  expect(result.message).toBe("User created")
  expect(result.user.email).toBe("p@test.com")
  expect(result.user.role).toBe("USER");
  expect(result.user.password).toBeUndefined();
  expect(fakePrisma.user.create).toHaveBeenCalledTimes(1);
});