# foundation-styles

Contains the foundational styles for the design system.

The library is responsible for

1. The vanilla extract stylesheets required for core styles
2. The tailwind configuration generation
3. Utilities and constants to be used with vanilla extract in other libs

### Notes

#### Entry points

The library exposes 3 entry points

1. `index.ts` which provides with all the utilities required by `ts` and `css.ts` files
2. `globals.ts` which imports all the global stylesheets as a side-effect. Should only be imported in app-roots for setting up global stylesheets
3. `tailwind.ts` which is the tailwind preset to be used by all libs. This can be accessed using node resolution `@ageorgedev/foundation-styles/tailwind`

#### Generation of tailwind configuration

The tailwind configuration is tricky because we want to use some aspects of Vanilla Extract in helping build this but importing anything from there
triggers post-css processing which in turn bombs on tailwind. To solve this, instead of importing directly to tailwind.ts, we generate a json file from the tokens
and then import into tailwind.ts. `src/lib/tailwind-theme.ts` is used to generate `generated-src/tailwind-theme.json` which in turn is used within `src/tailwind.ts`.
The generation process is done as part of the `pre-build` task for this library.
