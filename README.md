# Cryptocons

> This package is being updated rapidly and rather recklessly at the moment. Feel free to install it but new icons are being added rapidly and some module names are being changed on the fly.

## What is Cryptocons?

Cryptocons is a collection of named icon modules and utility functions making it easier to manage cryptocurreny icons in your project.

Each icon is placed on a 24x24 grid and available as two types:

1. **Logo**: Plain logomark icons
2. **Badge**: Logomark icons contained in a shape that can be configured with different border radiuses from square to circle.

## Installation

To install the package in your project run:

```bash
yarn add cryptocons

or

npm install cryptocons
```

---

## Usage

Each icon is wrapped in a `forwardRef` that exposes the underlying SVG element. Any property that can be added to a regular SVG can be added to a cryptocon.

### Basic usage

Once the package is installed, importing and using cryptocons is a pretty simple process. Named Icon modules can be imported like so:

```jsx
import { Binance } from 'cryptocons'

<Binance>
```

### Bundled Icon components

The Cryptocon library exposes two specialty components that aggregate all available icons from a given type (either Badge or Logo).

TODO: Write this

### Changing icon size

Aside from regular SVG properties, each icon has a limited set of component properties. One of them is `size`. The `size` property is equivalent to setting the height and width of the SVG. The following examples are all fuctionally the same.

```jsx
import { BinanceBadge } from 'cryptocons'

<BinanceBadge size={32}>
<BinanceBadge height={32} width={32}>
<BinanceBadge size="32px">
<BinanceBadge height="32px" width="32px">
```

### Changing Badge radius

Another component property exclusive to Badge icon types is `badgeRadius`. Setting a `badgeRadius` will round the corners from a square to a circle depending on the number. Setting a badgeRadius on an icon that isn't a Badge will have no effect. The default radius is `12`.

```jsx
import { Binance, BinanceBadge } from 'cryptocons'

// This will have no effect
<Binance badgeRadius={12}>
// This will result in a squircle
<BinanceBadge size={8}>
// This will result in a square
<BinanceBadge size={0}>
// This will result in a circle
<BinanceBadge size={100}>
// This is redundant as the default radius is 12
<BinanceBadge size={12}>
```

### Creating custom icons

Two methods for creating your own cryptocons:

-   The `Icon` component
-   The `createIcon` convenience function

The Icon component renders an SVG element to create custom cryptocons on the fly. The `createIcon` function is a convenience wrapper allowing you to achieve the same result with less effort.

The default `viewBox` is `0 0 24 24` when using the `createIcon` function. The Icon component will need supplied a `viewBox`. Every example below creates the same icon.

```jsx
import { Icon, createIcon } from 'cryptocons'

const ExampleIcon = () => (
    <Icon viewBox="0 0 24 24">
        <path d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
    </Icon>
)

const ExampleIcon = createIcon({
    path: (
        <path d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
    ),
})
```

## Develop locally

If you want to tinker or contribute to Cryptocons, you will need to build the repo locally.

The content within the `scripts` directory is what automatically transforms XML into React components from within the `svg` directory. Most of the functions within are refactored and updated from the [svg2jsx](https://github.com/balajmarius/svg2jsx) library.

### Build

#### 1. Install the dependencies

```bash
yarn
```

#### 2. Run the scripts

```bash
yarn build
```

This will use `ts-node` to run all the functions in the `scripts` directory. These scripts will optimize, transform, and reformat the content within the `svg` directory into React components in the `components` directory.

#### 3. Run Storybook to view changes

```bash
yarn storybook
```

This will build the components within the `components` directory to `localhost:8000`. Any changes made to components will automatically rerender. Hack away.

### Accessibility

Implementing icons accessibly can be tricky but it's important. Especially if you plan on putting 400+ cryptocurrency icons on a page. Paraphrasing from [CSS Tricks on accessible SVG implementation](https://css-tricks.com/accessible-svgs/) and [other references](https://css-tricks.com/accessible-svg-icons/), an icon can be implemented in 2 main ways.

#### 1. Decorative

Cryptocon icons assume decorative intent. What this means is icons have `aria-hidden="true"` and `focusable="false"` set by default. It's favorable to let assistive technology instead of the icon recognize parent elements. SVG elements with an `aria-label` are more verbose because they are announced as a group, so it's favorable to go with `aria-label` on the primary interactive parent element.

```jsx
<button onClick={navigateHome}>
    <BinanceBadge />
    Navigate home
</button>
```

```jsx
<button aria-label="Do Binance action">
    <BinanceBadge />
</button>
```

When icons are wrapped by an interactive element, what’s important is that the link has informative text. Therefore, if a component can be described by visible text, it is recommended to reference that text with an `aria-label` attribute rather than using the `title` property.

```jsx
<a href="/" aria-label="Navigate home">
    <Coinbase />
</a>
```

```jsx
<a href="/">
    Navigate home
    <Coinbase />
</a>
```

#### 2. Standalone

> This implementation is discouraged. It's best to use an IconButton instead as it contains accessible interaction states. But if you're gonna do it, do it in the following way.

Suppose the icon is being used as a standalone interactive element and isn't accompanied by a visible text label. In that case, it's best to use a combination of `role`, `aria-label`, and ensuring the icon can be discovered by assistive technology by setting `aria-hidden` to `false`.

```jsx
<Home
    onClick={navigateHome}
    role="img"
    aria-label="Navigate home"
    aria-hidden={false}
/>
```
