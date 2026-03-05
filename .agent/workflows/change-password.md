---
description: How to change the Landschaft admin password
---

To change your admin password, follow these steps:

1. **Generate a new secure hash**:
   Run the following command in your terminal, replacing `YOUR_NEW_PASSWORD` with your desired password:
   ```bash
   node scripts/hash-password.js YOUR_NEW_PASSWORD
   ```

2. **Copy the generated hash**:
   The command will output something like:
   `Hashed: $2b$10$...`
   Copy the entire string starting with `$2b$`.

3. **Update your environment variables**:
   Open your [.env.local](file:///home/rz/Documents/landschaft/landschaft%20web/.env.local) file and replace the `ADMIN_PASSWORD_HASH` value with the hash you just copied:
   ```env
   ADMIN_PASSWORD_HASH=$2b$10$YourNewCopiedHash...
   ```

4. **Restart the server**:
   For the changes to take effect, you must stop and restart your development server:
   ```bash
   # Press Ctrl+C to stop, then:
   npm run dev
   ```

> [!IMPORTANT]
> Never share your `.env.local` file or the raw password hash. If you ever suspect the password has been compromised, repeat these steps immediately with a new password and also rotate your `JWT_SECRET`.
