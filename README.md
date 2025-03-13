# 🚀 SimplySaaS

A modern SvelteKit boilerplate with Supabase authentication, shadcn-svelte components, and TypeScript designed to jumpstart your SaaS project.

## 💭 Why I Created SimplySaaS

I've spent countless hours looking for a good Svelte 5 boilerplate that just works - one with a complete authentication setup including both email/password and OAuth, proper error handling, and all the essential features you need. The ones I found were either missing key features or built with UI libraries like DaisyUI or Mantine where I couldn't really control the code the way I wanted.

### 🤔 Why These Tech Choices?

I hold somewhat of a grudge against Next.js since it was clearly made to lock you into Vercel's ecosystem. Svelte 5, on the other hand, was made with developer experience in mind. It gives you the freedom to build and deploy however you want.

I went with shadcn because I love that we actually own the code. You get the components right in your project where you can modify them however you need. No more being stuck with someone else's design decisions.

### ✨ What's Included

I made sure this template has everything you need for a production-ready auth system:

- ✉️ Email/password registration with proper validation
- 🔑 Google OAuth that actually works
- 🔄 Complete password reset flow
- ⚡ Error handling that gives real feedback
- ✅ Email verification that just works

### 🎁 Use It Freely

I'm making SimplySaaS free for everyone to build their own SaaS products. You can:

- 💼 Use it for commercial projects
- 🛠️ Modify it however you want
- 💰 Build and sell products with it

Just one rule (which is in the license):

- ❌ Don't resell this template itself as a paid product - that would defeat the whole purpose of making it free for everyone.

## Core Features

- 🔐 **Authentication & Security**:

  - Complete Supabase authentication system
  - OAuth and email/password strategies
  - Protected routes with auth guards
  - Email verification and password reset
  - Error and success feedback

- 🎨 **UI Components**:

  - Fully customizable shadcn components
  - Form validation states and feedback
  - Loading states and indicators
  - Responsive and accessible design

- 🚀 **Developer Experience**:
  - SvelteKit 2.16 with SSR
  - Svelte 5
  - TypeScript for type safety
  - Superforms with Zod validation
  - Tailwind CSS for styling

## 🏁 Getting Started

### 📋 Prerequisites

1. Node.js 18+ and npm installed
2. A Supabase account

### ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/SimplySaaS.git
cd SimplySaaS
```

2. Install dependencies:

```bash
npm install
```

### 🛠️ Supabase Setup

1. Create a new Supabase project at https://supabase.com and find your supabase-url and ANON-key.
2. Create `.env.local`
3. Update `.env.local` with your Supabase credentials:

```
PUBLIC_SUPABASE_URL=your_project_url
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

5. (Optional) Configure authentication settings in `src/lib/features/auth/config/auth.ts`:
   - Update redirect paths
   - Customize auth behavior and routes
   - Modify protection rules

## 🛠️ Technologies

- **Framework**: SvelteKit with Svelte 5 runes
- **Language**: TypeScript
- **Authentication**: Supabase Auth (@supabase/ssr)
- **UI Components**: shadcn-svelte (Next version) with Tailwind CSS
- **Icons**: unplugin-icons with SSR support
- **Forms**: sveltekit-superforms with Zod schema validation

### 🔑 Google OAuth Setup

For Google OAuth setup, follow [this video tutorial](https://youtu.be/2SEz6SK_ekE?t=446) (starting at 7:20). It shows how to:

1. Create Google OAuth credentials in Google Cloud Console
2. Configure the credentials in your Supabase dashboard

No code changes are needed - just configuration in the Supabase dashboard.

### 💻 Development

Start the development server:

```bash
npm run dev
```

Visit http://localhost:5173 to see your app.

## 🔒 Auth Features

- **Form Validation**: Built with superforms and Zod schema validation
- **Error Handling**: Proper error responses and user feedback
- **Password Management**: Reset password flow included
- **OAuth**: Google authentication integration
- **Route Protection**: Public and private route handling
- **UI Components**: Using [shadcn-svelte](https://next.shadcn-svelte.com/) (Next version) for form elements

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   │   ├── AuthForm.svelte
│   │   │   ├── GoogleSignIn.svelte
│   │   │   ├── Login.svelte
│   │   │   └── Register.svelte
│   │   └── ui/               # shadcn-svelte components
│   │       ├── avatar           # User avatars
│   │       ├── button           # Button components
│   │       ├── card            # Card containers
│   │       ├── dropdown-menu    # Dropdown menus
│   │       ├── error-message   # Error feedback
│   │       ├── footer          # Page footer
│   │       ├── form            # Form components
│   │       ├── input           # Input fields
│   │       ├── label          # Form labels
│   │       ├── logo           # Site logo
│   │       ├── navbar         # Navigation bar
│   │       ├── profile-dropdown # User profile menu
│   │       ├── sheet          # Slide-out panels
│   │       ├── spinner        # Loading indicators
│   │       ├── success-message # Success feedback
│   │       ├── switch         # Toggle switches
│   │       ├── table          # Data tables
│   │       ├── tabs           # Tab navigation
│   │       └── tooltip        # Hover tooltips
│   ├── features/
│   │   └── auth/             # Auth feature module
│   │       ├── config/       # Auth paths and redirects
│   │       ├── hooks/        # Auth guards and Supabase setup
│   │       ├── schemas/      # Zod validation schemas
│   │       └── services/     # Auth business logic
│   ├── types/              # TypeScript type definitions
│   │   └── unplugin-icons.d.ts  # Icon plugin types
│   ├── utils.ts            # shadcn utility re-exports (keeps default shadcn imports working!!!!)
│   └── utils/              # Organized utility modules
│       ├── cn.ts          # Tailwind class merging utility for shadcn
│       └── supabase-session-warnings.ts  # Handles Supabase SSR warning suppression
├── routes/
│   ├── +error.svelte       # Error handling
│   ├── +layout.server.ts   # Root server layout
│   ├── +layout.svelte      # Root layout
│   ├── +layout.ts          # Root layout logic
│   ├── +page.svelte        # Home page
│   ├── auth/               # Auth routes
│   │   ├── +layout.svelte  # Auth layout
│   │   ├── +page.server.ts # Auth server logic
│   │   ├── +page.svelte    # Auth page
│   │   ├── login/          # Login flow
│   │   │   ├── +page.server.ts
│   │   │   └── +page.svelte
│   │   ├── register/       # Registration flow
│   │   │   ├── +page.server.ts
│   │   │   └── +page.svelte
│   │   ├── reset/          # Password reset
│   │   │   ├── +page.server.ts
│   │   │   └── +page.svelte
│   │   ├── update-password/ # Password update
│   │   │   ├── +page.server.ts
│   │   │   └── +page.svelte
│   │   ├── verify/         # Email verification
│   │   │   ├── +page.server.ts
│   │   │   └── +page.svelte
│   │   ├── callback/       # OAuth callback
│   │   │   └── +server.ts
│   │   └── confirm/        # Email confirmation
│   │       └── +server.ts
│   └── private/            # Protected routes
│       ├── +layout.server.ts  # Protected layout logic
│       ├── +layout.svelte     # Protected layout
│       ├── dashboard/         # User dashboard
│       │   └── +page.svelte
│       └── settings/          # User settings
│           ├── +page.server.ts
│           └── +page.svelte
└── hooks.server.ts            # Server hooks (auth setup)
```

## 🔑 Authentication Flow

### 1. Email/Password Authentication

- **Registration** (`/auth?mode=register`):

  - Form validation with superforms
  - Automatic email verification
  - Redirect to login after verification

- **Login** (`/auth?mode=login`):
  - Email/password validation
  - Redirect to dashboard on success
  - Password reset option

### 2. Password Reset Flow

- Request reset at `/auth/reset`
- Update password at `/auth/update-password`
- Success feedback with redirect

### 3. Protected Routes

All routes under `/private/*` are automatically protected through the auth guard:

```typescript
// src/lib/features/auth/hooks/auth-guard.server.ts handles protection
if (!event.locals.session && event.url.pathname.startsWith('/private')) {
	throw redirect(303, '/auth');
}

// Also redirects authenticated users away from auth pages
if (event.locals.session && event.url.pathname === '/auth') {
	throw redirect(303, '/private/dashboard');
}
```

### 🛠️ Code Quality Tools

- **TypeScript** - Static type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **svelte-check** - Svelte type checking

### 🔧 Additional Tools

- **shadcn-svelte** - Pre-built accessible UI components
- **Tailwind CSS** - Utility-first styling
- **Bits UI** - Low-level UI primitives
- **Lucide** - Beautiful SVG icons
- **Prettier** - Code formatting
- **ESLint** - Code linting

## 📚 Utils Structure Explanation

I've decided to use a simple and flat utils structure while maintaining compatibility with third-party libraries:

- `/lib/utils.ts`: A re-export file that maintains shadcn's expected import paths, keeping component installations working smoothly.
- `/lib/utils/`: Contains all utility files with descriptive names that indicate their purpose:
  - `cn.ts`: Tailwind class merging utility used by shadcn components
  - `supabase-session-warnings.ts`: Handles SSR-related warning suppression for Supabase auth (specifically one really annoying bug I mention in the file comment)

This structure provides several benefits:

1. shadcn's component installation system works without modification
2. Clear, descriptive file names make it easy to understand each utility's purpose
3. Flat directory structure reduces complexity while maintaining organization
4. Easy to add new utilities without creating unnecessary hierarchy

## 📚 Resources

- [Svelte 5 Documentation](https://svelte.dev/blog/runes)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [shadcn-svelte Documentation](https://www.shadcn-svelte.com/)

## ☕ Buy me a coffee
- https://buymeacoffee.com/itsolidude
