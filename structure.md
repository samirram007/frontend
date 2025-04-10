src/
├── assets/ # Static files (images, fonts, etc.)
├── components/ # Global reusable components (e.g. Button, Modal)
├── core/ # App-wide concerns
│ ├── auth/ # Auth context, guards
│ ├── hooks/ # Global custom hooks
│ ├── layouts/ # Route/page layouts
│ ├── routes/ # Route config (React Router v7+)
│ ├── providers/ # Context providers (TanStack Query, AuthProvider, etc.)
│ ├── utils/ # Utility functions/helpers
│ └── constants/ # Enums, constants
├── modules/ # Feature-based modules
│ ├── auth/ # Login/Register/ForgotPassword
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── types/
│ │ └── routes.tsx
│ ├── dashboard/
│ ├── users/
│ └── settings/
├── services/ # Axios instance, API clients
│ ├── axiosClient.ts
│ └── queryClient.ts # TanStack Query setup
├── types/ # Shared global types/interfaces
├── App.tsx # App root with route renderer
├── main.tsx # Vite entry point
└── index.html
