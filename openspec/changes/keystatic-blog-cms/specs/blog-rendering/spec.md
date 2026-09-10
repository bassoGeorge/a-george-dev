## ADDED Requirements

### Requirement: Blog index route
The system SHALL provide a `/blog` route that lists all non-draft blog posts ordered by `date` descending, each linking to its `/blog/$slug` page.

#### Scenario: Listing published posts
- **WHEN** a user visits `/blog`
- **THEN** every post with `draft: false` (or no `draft` field) is listed, most recent `date` first

#### Scenario: Excluding drafts
- **WHEN** a post has `draft: true`
- **THEN** it does not appear in the `/blog` listing

### Requirement: Blog post route
The system SHALL provide a `/blog/$slug` route that renders a single post's compiled MDX body, where `$slug` is derived from the post's filename.

#### Scenario: Rendering a post
- **WHEN** a user visits `/blog/<slug>` for a post whose file is `<slug>.mdx`
- **THEN** the post's title, description, date, and compiled MDX body are rendered

#### Scenario: Unknown slug
- **WHEN** a user visits `/blog/<slug>` for a slug with no matching post file
- **THEN** the route renders a not-found result rather than erroring

### Requirement: Build-time MDX compilation
The system SHALL compile `.mdx` files under `apps/ageorgedev/src/content/blogPosts` at build time, including frontmatter extraction, so that no MDX compilation happens at request time in production.

#### Scenario: Frontmatter available without a separate parse step
- **WHEN** the post loader reads a compiled post module
- **THEN** `title`, `description`, `date`, and `draft` are available as structured data (not re-parsed from raw frontmatter text)

### Requirement: Prerendering discovers post routes automatically
The system SHALL prerender every `/blog/$slug` route reachable by crawling links from the `/blog` index, without requiring a manually maintained list of post paths.

#### Scenario: New post is prerendered without config changes
- **WHEN** a new `.mdx` file is added to `apps/ageorgedev/src/content/blogPosts` and the site is built
- **THEN** the corresponding `/blog/$slug` page is prerendered without any change to `vite.config.ts`
