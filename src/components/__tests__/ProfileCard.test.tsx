import { ProfileCard } from "@/components/ProfileCard"; // Adjust the path accordingly
import { makeSUT } from "@/test-utils";

describe("ProfileCard Component", () => {
  it("should render the profile image", () => {
    const props = {
      profileSrc: "/profile_image.png",
      name: "John Doe",
      role: "Software Engineer",
    };

    const { getByAltText } = makeSUT(ProfileCard, props, { noWrappers: true });
    const profileImage = getByAltText("Profile Card Icon");

    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute(
      "src",
      "/_next/image?url=%2Fprofile_image.png&w=128&q=75",
    );
    expect(profileImage).toHaveClass("rounded-full");
  });

  it("should render the name", () => {
    const props = {
      profileSrc: "/profile_image.png",
      name: "John Doe",
      role: "Software Engineer",
    };

    const { getByText } = makeSUT(ProfileCard, props, { noWrappers: true });
    const name = getByText(props.name);

    expect(name).toBeInTheDocument();
    expect(name).toHaveClass("text-lg");
  });

  it("should render the role", () => {
    const props = {
      profileSrc: "/profile_image.png",
      name: "John Doe",
      role: "Software Engineer",
    };

    const { getByText } = makeSUT(ProfileCard, props, { noWrappers: true });
    const role = getByText(props.role);

    expect(role).toBeInTheDocument();
    expect(role).toHaveClass("text-text-secondary");
  });

  it("should apply correct styles to the container div", () => {
    const props = {
      profileSrc: "/profile_image.png",
      name: "John Doe",
      role: "Software Engineer",
    };

    const { container } = makeSUT(ProfileCard, props, { noWrappers: true });
    const containerDiv = container.querySelector("div");

    expect(containerDiv).toHaveClass(
      "flex flex-col items-center justify-center gap-1.5",
    );
  });
});
