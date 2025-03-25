# WeWantWaste Skip Selection Page Redesign

This project is a redesign of the skip selection page for WeWantWaste.co.uk, focusing on improved UI/UX, responsiveness, and maintainable React code.

## Live Demo

You can view the live demo at
https://codesandbox.io/p/github/murtaza020981/react-we-want-waste-sample-task/main?import=true

## Project Overview

The goal of this project was to redesign the skip selection page while maintaining its core functionality. The redesign focuses on:

- **Modern UI/UX**: Clean, intuitive interface with clear visual hierarchies
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop views
- **Maintainable Code**: Well-structured TypeScript React components with proper separation of concerns
- **Material-UI**: Leveraging Material-UI (MUI) for consistent design patterns and components

## Implementation Approach

### Architecture

The project follows a component-based architecture with:

- **TypeScript**: For type safety and better developer experience
- **React**: For building the UI components
- **Material UI**: For design system and component library
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### Key Features

1. **Process Stepper**: Visual indication of the user's progress through the booking process
2. **Skip Cards**: Responsive, interactive cards that clearly display:
   - Skip size
   - Price details (including VAT)
   - Hire period
   - Placement restrictions (road/private property)
   - Waste type restrictions
3. **Responsive Layout**: Adapts to different screen sizes:
   - Mobile: Single column layout
   - Tablet: Two column layout
   - Desktop: Three column layout
4. **Visual Feedback**: Clear indication of selected items, interactive hover states
5. **Navigation Controls**: Intuitive back/continue buttons with appropriate state management

### Code Quality

- **Component Structure**: Logically separated components for better maintainability
- **TypeScript Interfaces**: Well-defined interfaces for props and data types
- **Custom Theme**: Consistent design system with custom MUI theme configuration
- **Responsive Utilities**: Media query hooks for responsive behavior

## Setup and Installation

1. Install dependencies:

```
npm install
```

2. Start the development server:

```
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technology Stack

- React 18
- TypeScript
- Material-UI v5
- React Router v6
- Axios

## License

MIT

## Environment Variables

The application uses environment variables for configuration.

```
.env
```

## Code Standards

This project follows these coding standards:

1. **Constants**: Configuration values are stored in the `src/constants` directory
2. **Comments**: All components, functions, and complex logic should include JSDoc comments

3. **UI Components**: All components should be responsive and properly aligned

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
