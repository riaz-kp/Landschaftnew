---
description: How to change the Landschaft admin password
---

To change your admin password, follow these steps:

1. **Update your environment variables**:
   Open your [.env.local](file:///home/rz/Documents/landschaft/landschaft%20web/.env.local) file and update the `ADMIN_PASSWORD` value with your new password:
   ```env
   ADMIN_PASSWORD=your_new_password
   ```

2. **Restart the server**:
   For the changes to take effect, you must stop and restart your development server:
   ```bash
   # Press Ctrl+C to stop, then:
   npm run dev
   ```

> [!IMPORTANT]
> Never share your `.env.local` file. If you ever suspect the password has been compromised, repeat these steps immediately with a new password and also rotate your `JWT_SECRET`.

