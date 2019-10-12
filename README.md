# Headless Gutenberg

This is a simple test of the [Gutenberg](https://github.com/WordPress/gutenberg) editor for WordPress. In most cases, it will be used in the context of a WordPress site. But can it be used in a standalone React app with no connection to WordPress at all? Sort of. Try it for yourself:

```bash
# Clone.
git clone git@github.com:noahtallen/headless-gutenberg.git

# Do the Node thing.
yarn

# Run the code.
yarn start

# Use the URL that command gives you to access the site.
```

The `<Editor />` component lives in `src/editor.js` if you wish to see how much setup this requires. (Not much, it turns out!)