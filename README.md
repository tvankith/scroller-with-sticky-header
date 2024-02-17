# Scroller with Sticky Header

This React component provides a scroller with a sticky header, allowing users to scroll through content horizontally while keeping the header fixed at the top of the section. See [Codesandbox example](https://codesandbox.io/p/devbox/horizontal-scroll-with-sticky-header-y8mnpg)

![example](https://github.com/tvankith/scroller-with-sticky-header/blob/development/assets/example.gif?raw=true)

## Installation

To install this component, you can use npm or yarn:

```bash
npm install scroller-with-sticky-header
```

or

```bash
yarn add scroller-with-sticky-header
```

## Usage

To use the component, import it into your React application and incorporate it as needed:

```jsx
import { Scroll } from "scroller-with-sticky-header";

function App() {
  return (
    <div className="container">
      <Scroll gap="10px">
        <Scroll.Group>
          <Scroll.Title>Title 1</Scroll.Title>
          <Scroll.Item>
            <div>...</div>
          </Scroll.Item>
        </Scroll.Group>
        <Scroll.Group>
          <Scroll.Title>Title 2</Scroll.Title>
          <Scroll.Item>
            <div>...</div>
          </Scroll.Item>
          <Scroll.Item>
            <div>...</div>
          </Scroll.Item>
        </Scroll.Group>
        ...
      </Scroll>
    </div>
  );
}

export default App;
```

## Props

The component accepts the following props:

| Prop | Type   | Default | Description                       |
| ---- | ------ | ------- | --------------------------------- |
| gap  | string | '10px'  | The gap between each scroll group |

## Contributing

We welcome contributions! If you'd like to contribute, follow these steps:

1. Fork the repository and clone it locally.
2. Create a new branch for your changes.
3. Make your changes and ensure they follow our coding standards.
4. Test your changes thoroughly.
5. Commit your changes.
6. Push to your fork and submit a pull request.

Feel free to use Storybook for component development and testing.

Thank you for contributing! 🎉
