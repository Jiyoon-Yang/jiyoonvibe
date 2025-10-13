import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Pagination } from "./index";

// 커스텀 아이콘 컴포넌트 (예시용)
const CustomPrevIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.5 15L7.5 10L12.5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CustomNextIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.5 15L12.5 10L7.5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta: Meta<typeof Pagination> = {
  title: "Commons/Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "재사용 가능한 Pagination 컴포넌트입니다. 다양한 variant, size, theme을 지원하며 페이지 네비게이션 기능을 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
      description: "페이지네이션의 스타일 variant",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "페이지네이션의 크기",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
      description: "페이지네이션의 테마",
      table: {
        defaultValue: { summary: "light" },
      },
    },
    currentPage: {
      control: { type: "number", min: 1 },
      description: "현재 페이지 번호",
      table: {
        defaultValue: { summary: "1" },
      },
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "전체 페이지 수",
      table: {
        defaultValue: { summary: "1" },
      },
    },
    pageRangeDisplayed: {
      control: { type: "number", min: 1, max: 10 },
      description: "표시할 페이지 버튼 개수",
      table: {
        defaultValue: { summary: "5" },
      },
    },
    disablePrevious: {
      control: { type: "boolean" },
      description: "이전 버튼 비활성화 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disableNext: {
      control: { type: "boolean" },
      description: "다음 버튼 비활성화 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onPageChange: {
      action: "page-changed",
      description: "페이지 변경 시 호출되는 콜백 함수",
    },
    className: {
      control: { type: "text" },
      description: "추가 CSS 클래스명",
    },
  },
  args: {
    onPageChange: (page: number) => console.log("Page changed:", page),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Basic Stories
// ============================================

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const WithManyPages: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    pageRangeDisplayed: 7,
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

// ============================================
// Variant Stories
// ============================================

export const Primary: Story = {
  args: {
    variant: "primary",
    currentPage: 3,
    totalPages: 10,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    currentPage: 3,
    totalPages: 10,
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    currentPage: 3,
    totalPages: 10,
  },
};

// ============================================
// Size Stories
// ============================================

export const Small: Story = {
  args: {
    size: "small",
    currentPage: 3,
    totalPages: 10,
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    currentPage: 3,
    totalPages: 10,
  },
};

export const Large: Story = {
  args: {
    size: "large",
    currentPage: 3,
    totalPages: 10,
  },
};

// ============================================
// Theme Stories
// ============================================

export const Light: Story = {
  args: {
    theme: "light",
    currentPage: 3,
    totalPages: 10,
  },
};

export const Dark: Story = {
  args: {
    theme: "dark",
    currentPage: 3,
    totalPages: 10,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// ============================================
// Combination Stories
// ============================================

export const PrimarySmallLight: Story = {
  args: {
    variant: "primary",
    size: "small",
    theme: "light",
    currentPage: 2,
    totalPages: 8,
  },
};

export const SecondaryMediumLight: Story = {
  args: {
    variant: "secondary",
    size: "medium",
    theme: "light",
    currentPage: 4,
    totalPages: 12,
  },
};

export const TertiaryLargeLight: Story = {
  args: {
    variant: "tertiary",
    size: "large",
    theme: "light",
    currentPage: 6,
    totalPages: 15,
  },
};

export const PrimarySmallDark: Story = {
  args: {
    variant: "primary",
    size: "small",
    theme: "dark",
    currentPage: 2,
    totalPages: 8,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const SecondaryMediumDark: Story = {
  args: {
    variant: "secondary",
    size: "medium",
    theme: "dark",
    currentPage: 4,
    totalPages: 12,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const TertiaryLargeDark: Story = {
  args: {
    variant: "tertiary",
    size: "large",
    theme: "dark",
    currentPage: 6,
    totalPages: 15,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// ============================================
// State Stories
// ============================================

export const DisabledPrevious: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    disablePrevious: true,
  },
};

export const DisabledNext: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    disableNext: true,
  },
};

export const BothDisabled: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    disablePrevious: true,
    disableNext: true,
  },
};

// ============================================
// Custom Icon Stories
// ============================================

export const WithCustomIcons: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    previousIcon: <CustomPrevIcon />,
    nextIcon: <CustomNextIcon />,
  },
};

// ============================================
// Edge Case Stories
// ============================================

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    pageRangeDisplayed: 5,
  },
};

export const ManyPagesSmallRange: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
    pageRangeDisplayed: 3,
  },
};

export const FirstPageOfMany: Story = {
  args: {
    currentPage: 1,
    totalPages: 100,
    pageRangeDisplayed: 5,
  },
};

export const LastPageOfMany: Story = {
  args: {
    currentPage: 100,
    totalPages: 100,
    pageRangeDisplayed: 5,
  },
};

// ============================================
// Interactive Stories
// ============================================

export const Interactive: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    pageRangeDisplayed: 7,
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = React.useState(args.currentPage);

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          args.onPageChange?.(page);
        }}
      />
    );
  },
};

// ============================================
// All Variants Showcase
// ============================================

export const AllVariantsShowcase: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3
          style={{
            marginBottom: "1rem",
            fontSize: "1.2rem",
            fontWeight: "600",
          }}>
          Primary Variants
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Pagination
            variant="primary"
            size="small"
            currentPage={2}
            totalPages={8}
          />
          <Pagination
            variant="primary"
            size="medium"
            currentPage={2}
            totalPages={8}
          />
          <Pagination
            variant="primary"
            size="large"
            currentPage={2}
            totalPages={8}
          />
        </div>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "1rem",
            fontSize: "1.2rem",
            fontWeight: "600",
          }}>
          Secondary Variants
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Pagination
            variant="secondary"
            size="small"
            currentPage={3}
            totalPages={8}
          />
          <Pagination
            variant="secondary"
            size="medium"
            currentPage={3}
            totalPages={8}
          />
          <Pagination
            variant="secondary"
            size="large"
            currentPage={3}
            totalPages={8}
          />
        </div>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "1rem",
            fontSize: "1.2rem",
            fontWeight: "600",
          }}>
          Tertiary Variants
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Pagination
            variant="tertiary"
            size="small"
            currentPage={4}
            totalPages={8}
          />
          <Pagination
            variant="tertiary"
            size="medium"
            currentPage={4}
            totalPages={8}
          />
          <Pagination
            variant="tertiary"
            size="large"
            currentPage={4}
            totalPages={8}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

export const DarkThemeShowcase: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3
          style={{
            marginBottom: "1rem",
            fontSize: "1.2rem",
            fontWeight: "600",
            color: "white",
          }}>
          Dark Theme Variants
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Pagination
            variant="primary"
            theme="dark"
            size="medium"
            currentPage={2}
            totalPages={8}
          />
          <Pagination
            variant="secondary"
            theme="dark"
            size="medium"
            currentPage={3}
            totalPages={8}
          />
          <Pagination
            variant="tertiary"
            theme="dark"
            size="medium"
            currentPage={4}
            totalPages={8}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    backgrounds: { default: "dark" },
  },
};
