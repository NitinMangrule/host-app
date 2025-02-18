import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

const TestComponent = () => {
  const { user, login, logout, isAdmin } = useAuth();
  return (
    <div>
      <div data-testid="user-role">{user?.role}</div>
      <div data-testid="is-admin">{isAdmin ? "true" : "false"}</div>
      <button onClick={() => login({ role: "admin" })}>Login as Admin</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("AuthContext", () => {
  it("should login as admin", () => {
    render(
      <Router>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </Router>
    );

    fireEvent.click(screen.getByText("Login as Admin"));

    expect(screen.getByTestId("user-role").textContent).toBe("admin");
    expect(screen.getByTestId("is-admin").textContent).toBe("true");
  });

  it("should logout", () => {
    render(
      <Router>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </Router>
    );

    fireEvent.click(screen.getByText("Login as Admin"));
    fireEvent.click(screen.getByText("Logout"));

    expect(screen.getByTestId("user-role").textContent).toBe("");
    expect(screen.getByTestId("is-admin").textContent).toBe("false");
  });
});
