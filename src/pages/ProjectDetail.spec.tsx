import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import ProjectDetail from "./ProjectDetail";
import * as projectQuery from "../api/projects/project.query";

const mockProjectData = {
  id: "1",
  name: "Test Project",
  description: "This is a test project description",
  startDate: "2022-01-01",
  endDate: "2022-12-31",
  projectManager: "John Doe",
  isFav: true,
};

jest.mock("../api/projects/project.query");

describe("ProjectDetail Component", () => {
  const mockUseGetProject = projectQuery.useGetProject as jest.Mock;
  const mockUseUpdateFavProject = projectQuery.useUpdateFavProject as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays loader when API is loading", () => {
    mockUseGetProject.mockReturnValue({
      data: null,
      isLoading: true,
    });
    mockUseUpdateFavProject.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });

    render(
      <MemoryRouter initialEntries={["/project/1"]}>
        <Routes>
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("displays project details when API returns a successful response", async () => {
    mockUseGetProject.mockReturnValue({
      data: mockProjectData,
      isLoading: false,
    });
    mockUseUpdateFavProject.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });

    render(
      <MemoryRouter initialEntries={["/project/1"]}>
        <Routes>
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText(mockProjectData.name));

    expect(screen.getByText("Project ID:")).toBeInTheDocument();
    expect(screen.getByText(mockProjectData.id)).toBeInTheDocument();
    expect(screen.getByText(mockProjectData.name)).toBeInTheDocument();
    expect(screen.getByText(mockProjectData.description)).toBeInTheDocument();
    expect(
      screen.getByText(mockProjectData.projectManager)
    ).toBeInTheDocument();
  });
});
