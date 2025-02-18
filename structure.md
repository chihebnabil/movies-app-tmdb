# Why structure matters
Well if you are are using git and you are working with a team, you already know why structure matters.
- It makes it easier to find what you are looking for.
- It makes it easier to work with others.
- It makes it easier to maintain the code.
- No git conflicts headaches. 

But if you are working alone, you might not see the point. But trust me, it does matter. 
It makes your code more readable and maintainable. It also makes it easier to find what you are looking for.

```
src/
├── app/
│   ├── features/                 # Feature modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── login/
│   │   │   │   │   ├── login.component.ts
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   └── login.component.css
│   │   │   │   └── register/
│   │   │   │       ├── register.component.ts
│   │   │   │       ├── register.component.html
│   │   │   │       └── register.component.css
│   │   │   └── routes/
│   │   │       └── auth.routes.ts
│   │   │
│   │   └── blog/
│   │       ├── components/
│   │       │   ├── post-list/
│   │       │   │   ├── post-list.component.ts
│   │       │   │   ├── post-list.component.html
│   │       │   │   └── post-list.component.css
│   │       │   ├── post-detail/
│   │       │   │   ├── post-detail.component.ts
│   │       │   │   ├── post-detail.component.html
│   │       │   │   └── post-detail.component.css
│   │       │   └── post-editor/
│   │       │       ├── post-editor.component.ts
│   │       │       ├── post-editor.component.html
│   │       │       └── post-editor.component.css
│   │       ├── services/
│   │       │   └── blog.service.ts
│   │       ├── models/
│   │       │   └── post.model.ts
│   │       └── routes/
│   │           └── blog.routes.ts
│   │
│   ├── shared/                   # Shared modules, components, directives
│   │   ├── components/
│   │   │   ├── header/
│   │   │   │   ├── header.component.ts
│   │   │   │   ├── header.component.html
│   │   │   │   └── header.component.css
│   │   │   └── footer/
│   │   │       ├── footer.component.ts
│   │   │       ├── footer.component.html
│   │   │       └── footer.component.css
│   │   ├── directives/
│   │   │   └── highlight.directive.ts
│   │   ├── pipes/
│   │   │   └── truncate.pipe.ts
│   │   └── config/
│   │       ├── shared.config.ts      # Shared imports configuration
│   │       └── shared.providers.ts   # Shared providers configuration
│   │
│   ├── layouts/                  # Layout components
│   │   ├── main-layout/
│   │   │   ├── main-layout.component.ts
│   │   │   ├── main-layout.component.html
│   │   │   └── main-layout.component.css
│   │   └── auth-layout/
│   │       ├── auth-layout.component.ts
│   │       ├── auth-layout.component.html
│   │       └── auth-layout.component.css
│   │
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.config.ts
│   └── app.routes.ts
│
├── assets/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── styles/
│
├── environments/                 # Environment configurations
│   ├── environment.ts
│   └── environment.prod.ts
│
├── styles/                      # Global styles
│   └── styles.css
│
└── index.html
```