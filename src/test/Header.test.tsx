// Covers the static shared header.
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, beforeEach, test, expect } from 'vitest'
import Header from '@components/Header'

const renderHeader = () =>
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  )

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the static navigation", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: "GLEWORKS" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Service" })).toHaveAttribute("href", "/service");
    expect(screen.getByRole("link", { name: "Archive" })).toHaveAttribute("href", "/archive");
  });

  test("does not render account controls", () => {
    renderHeader();
    expect(screen.queryByText(/Hi,/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Logout/i })).not.toBeInTheDocument();
  });
});
