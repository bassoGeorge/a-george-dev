# foundation-styles

Contains the foundational styles for the design system.

The library exposes `theme.css` which contains the Tailwind v4 configuration and other global styles. This should be included in your css file with the tailwind and other imports to create the root tailwind file for your project.

Currently, since Nx can't figure out dependency through css files, need to add as ImplicitDependency. TODO in future
