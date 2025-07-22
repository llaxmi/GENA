# 🧠 GENA : AI-Powered Learning Assistant


GENA is a full-stack AI-powered web application that revolutionizes how students learn by automatically generating personalized quizzes from any study material. Built with modern technologies for optimal performance and user experience.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) 
- [Docker](https://www.docker.com/) and Docker Compose
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gena.git
   cd gena
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL=

   # AI Service (Ollama)
   OLLAMA_BASE_URL=http://localhost:11434
   
   # Next.js
   BETTER_AUTH_SECRET=
   BETTER_AUTH_URL=http://localhost:3000
   ```

4. **Build and run the Docker compose file**
   ```bash
   docker-compose up --build -d
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see GENA in action!

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations

### Backend
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless functions
- **[Prisma ORM](https://www.prisma.io/)** - Modern database toolkit
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[Ollama](https://ollama.ai/)** - Local AI model serving

### Infrastructure
- **[Docker](https://www.docker.com/)** - Containerization
- **[BetterAuth](https://www.better-auth.com)** - Authentication and user management

---
