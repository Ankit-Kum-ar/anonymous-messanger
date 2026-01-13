import { z } from "zod";

// In Production, we write this as identifier instead of username or email.
// Also, don't apply hard validation like it should be of length 8 password.
// Just simply write these z.string() for both password & identifier.
export const signInSchema = z.object({
	identifier: z.string(),
	password: z.string(),
});
