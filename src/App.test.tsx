import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

describe("App", () => {
  it("should render home page", () => {
    render(
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    );

    expect(screen.getByText("Welcome to Music Library")).toBeInTheDocument();
  });

  it("should login as user and show Music Library link", () => {
    render(
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    );

    fireEvent.click(screen.getByText("Login as User"));

    expect(screen.getByText("Music Library")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("should login as admin and show Music Library link", () => {
    render(
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    );

    fireEvent.click(screen.getByText("Login as Admin"));

    expect(screen.getByText("Music Library")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("should logout and show login buttons", () => {
    render(
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    );

    fireEvent.click(screen.getByText("Login as Admin"));
    fireEvent.click(screen.getByText("Logout"));

    expect(screen.getByText("Login as User")).toBeInTheDocument();
    expect(screen.getByText("Login as Admin")).toBeInTheDocument();
  });

  it("should show loading spinner when navigating to Music Library", async () => {
    render(
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    );

    fireEvent.click(screen.getByText("Login as Admin"));
    fireEvent.click(screen.getByText("Music Library"));

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
