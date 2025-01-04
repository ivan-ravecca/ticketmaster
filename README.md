# Ticketmaster

## Purpose

As a developer, I am being evaluated through this project to check my technical abilities.

### A list of good intentions

- The project contains a series of different components that share information with other components.
- Each component has its corresponding unit test to demonstrate this ability as well.
- I am using coverage with at least 80% completion as a standard reference.
- The final objective was to demonstrate the ability to set up a new project from scratch using tests and tools to guarantee the best quality as possible. Many aspects were covered with the quickest option rather than the most convenient one, simply to cover more in this short time.
- The project structure does not follow any particular practice beyond a fairly common basic skeleton found within standard conventions. Some folders were created in these locations for the sake of speed when deciding.
- The use of **indexedDB** instead of using a backend was for practical reasons. By the time I received the answer to my question on this topic, it was no longer possible for me to tackle an alternative solution. Nevertheless, I thought that my storeAPI could be a placeholder for a possible future connection with a deployed backend.

## Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/ivan-ravecca/ticketmaster.git
   ```
2. Navigate to the project directory:
   ```sh
   cd ticketmaster
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Running the Project

1. Create .env file with valid API key

   ```sh
   VITE_API_KEY={placeholder}
   ```

2. Start the development server:
   ```sh
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173/` to see the application running.

### Running tests

1. Start the development server:
   ```sh
   npm run test
   ```

### Running coverage

1. Run the following command:
   ```sh
   npm run coverage
   ```
   Check on ticketmaster/coverage/index.html

### Running other tools

1. Run the following command will run the linter in all files:

   ```sh
   npm run lint
   ```

2. Run the following command will apply automatically linter rules:
   ```sh
   npm run format
   ```

## Tools

I've chosen a variety of tools i feel comfortable with such as:

- **React**: Latest version altough I might not been using all new features
- **Vite**: A build tool that aims to provide a faster development experience.
- **Vitest**: A fast unit test framework powered by Vite (instant feedback, built-in mocking).
- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **Prettier**: An opinionated code formatter.
- **@tanstack/react-query**: Powerful data synchronization and caching for React applications.
- **fake-indexeddb**: For (easy) mocking indexedDB
- **coverage-v8**: Widely used for coverage reporting
- **@mui/material**: An opinionated component library
- **indexedDB**: As an alternative to (locally) store the selected events.
