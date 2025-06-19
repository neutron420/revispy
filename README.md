# 🔐 Revispy – tRPC Auth Starter

A modern and flexible **Login & Authentication** starter built with the latest full-stack tools:
- **Vite** + **TypeScript**
- **tRPC** (Type-Safe APIs)
- **Prisma** (ORM)
- **PostgreSQL** (Database)
- **Tailwind CSS** (Styling)
- **JWT** (Authentication Tokens)

> Ready to be adapted for any authentication use case across web applications.

---

## 🚀 Features

- 🧪 **End-to-end type safety** with tRPC
- 🔐 **Secure authentication** logic with JWT support
- ⚡ **Fast development** with Vite and Tailwind
- 🎨 **Modern UI** with utility-first CSS
- 🧱 **Prisma + PostgreSQL** for reliable data storage
- 🌐 Easily extendable for multi-role auth, OAuth, etc.

---

## 🛠️ Tech Stack

| Name          | Description                         |
|---------------|-------------------------------------|
| Vite          | Lightning-fast frontend tooling     |
| TypeScript    | Static typing across the stack      |
| tRPC          | End-to-end typesafe API layer       |
| Prisma        | Type-safe ORM for PostgreSQL        |
| PostgreSQL    | Reliable and scalable database      |
| Tailwind CSS  | Utility-first modern CSS framework  |
| JWT           | Secure token-based authentication   |

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/neutron420/revispy-auth-starter.git
cd revispy

# Install dependencies
npm install

# Set up your environment
cp .env.example .env
# Update the .env with your database URL and JWT secret

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start the dev server
npm run dev
```

---

## 📁 Project Structure

```
src/
├─ server/        # tRPC routers, Prisma, and auth logic
├─ pages/         # Frontend pages and components
├─ styles/        # Tailwind CSS config and global styles
├─ utils/         # Shared helpers and types
.env              # Environment variables
```

---

## 🧠 Usage

The starter provides:

- ✅ Signup / Login forms
- 🔐 Secure password hashing (bcrypt)
- 🔑 Token-based authentication with JWT
- 🌍 API routes using tRPC for full type safety
- 🔧 Ready to extend with roles, OAuth, or email magic links

---

## 🧩 Extending It

- ✅ Add social login with OAuth
- ✅ Use JWT tokens or session cookies
- ✅ Connect to Redis for token storage or caching
- ✅ Build protected routes with client-side auth guards

---

## 🙌 Contributing

Contributions are welcome! Feel free to open issues or submit PRs to make this template even better.

---

## 📄 License

MIT © [Ritesh Kumar Singh](https://github.com/neutron420)

---

## 🌟 Acknowledgments

Inspired by the amazing work in the tRPC, Prisma, and Vite communities.

---
