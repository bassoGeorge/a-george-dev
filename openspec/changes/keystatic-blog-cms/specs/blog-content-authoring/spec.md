## ADDED Requirements

### Requirement: Local Keystatic admin for blog posts
The system SHALL provide a Keystatic admin UI, mounted at `/keystatic`, running in local mode (reading and writing the working tree directly, no external auth or hosted storage).

#### Scenario: Admin UI loads locally
- **WHEN** a developer runs the dev server and navigates to `/keystatic`
- **THEN** the Keystatic admin UI loads and lists the `blogPosts` collection

#### Scenario: No hosted backend required
- **WHEN** the admin UI is used
- **THEN** no GitHub App, Netlify Identity, or other external auth/storage service is required for reads or writes

### Requirement: Blog post schema
The `blogPosts` Keystatic collection SHALL define fields `title` (text, required), `description` (text, required), `date` (date, required), `draft` (boolean, default `false`), and `body` (rich `mdx` field), and SHALL store each entry as a `.mdx` file with frontmatter in `apps/ageorgedev/src/content/blogPosts`.

#### Scenario: Creating a post via the admin
- **WHEN** a user creates a new entry in the `blogPosts` collection through the Keystatic admin UI and saves it
- **THEN** an `.mdx` file is written to `apps/ageorgedev/src/content/blogPosts` with `title`, `description`, `date`, and `draft` in its frontmatter and the body content below the frontmatter

#### Scenario: Editing a post by hand
- **WHEN** a user edits an existing post's `.mdx` file directly in a text editor (not through the Keystatic admin UI)
- **THEN** the file remains valid frontmatter + MDX and is readable by both the Keystatic admin UI and the render pipeline

### Requirement: Content-component registration
The `blogPosts` collection's `mdx` body field SHALL support registering custom React components as Keystatic content-components (with a label, prop schema, and shape), and SHALL ship with zero components pre-registered.

#### Scenario: No components registered by default
- **WHEN** the `blogPosts` collection is configured as part of this change
- **THEN** the `mdx` field's `components` object is empty

#### Scenario: Adding a component later
- **WHEN** a future post needs a custom React component
- **THEN** the component SHALL be added to the `mdx` field's `components` object with a schema before it is used in any post, rather than written as an unregistered tag
