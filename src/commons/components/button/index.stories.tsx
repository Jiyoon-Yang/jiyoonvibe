import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./index";

// 아이콘 컴포넌트 (예시용)
const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 3V13M3 8H13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    <path
      d="m11 11 2 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 12L10 8L6 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: "Commons/Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "재사용 가능한 Button 컴포넌트입니다. 다양한 variant, size, theme을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
      description: "버튼의 스타일 variant",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "버튼의 크기",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
      description: "버튼의 테마",
      table: {
        defaultValue: { summary: "light" },
      },
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "전체 너비 버튼 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 상태",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    loading: {
      control: { type: "boolean" },
      description: "로딩 상태",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: { type: "text" },
      description: "버튼 텍스트",
    },
    iconLeft: {
      control: false,
      description: "왼쪽 아이콘",
    },
    iconRight: {
      control: false,
      description: "오른쪽 아이콘",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Default Stories
// ============================================

export const Default: Story = {
  args: {
    children: "버튼",
  },
};

// ============================================
// Variant Stories
// ============================================

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary 버튼",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary 버튼",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Tertiary 버튼",
  },
};

// ============================================
// Size Stories
// ============================================

export const Small: Story = {
  args: {
    size: "small",
    children: "Small 버튼",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    children: "Medium 버튼",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Large 버튼",
  },
};

// ============================================
// Theme Stories
// ============================================

export const LightTheme: Story = {
  args: {
    theme: "light",
    children: "Light 테마",
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: "dark",
    children: "Dark 테마",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// ============================================
// State Stories
// ============================================

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "비활성화된 버튼",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "로딩 중...",
  },
};

// ============================================
// Icon Stories
// ============================================

export const WithLeftIcon: Story = {
  args: {
    iconLeft: <PlusIcon />,
    children: "추가하기",
  },
};

export const WithRightIcon: Story = {
  args: {
    iconRight: <ArrowRightIcon />,
    children: "다음",
  },
};

export const WithBothIcons: Story = {
  args: {
    iconLeft: <SearchIcon />,
    iconRight: <ArrowRightIcon />,
    children: "검색하고 이동",
  },
};

export const IconOnly: Story = {
  args: {
    iconLeft: <PlusIcon />,
    children: "",
    size: "medium",
  },
  parameters: {
    docs: {
      description: {
        story: "아이콘만 있는 버튼입니다.",
      },
    },
  },
};

// ============================================
// Layout Stories
// ============================================

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "전체 너비 버튼",
  },
  parameters: {
    layout: "padded",
  },
};

// ============================================
// Combination Stories
// ============================================

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 variant를 한번에 보여주는 스토리입니다.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        flexWrap: "wrap",
      }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 크기를 한번에 보여주는 스토리입니다.",
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 상태를 한번에 보여주는 스토리입니다.",
      },
    },
  },
};

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "16px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
        }}>
        <h3 style={{ margin: 0, fontSize: "14px", fontWeight: "600" }}>
          Light Theme
        </h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button theme="light" variant="primary">
            Primary
          </Button>
          <Button theme="light" variant="secondary">
            Secondary
          </Button>
          <Button theme="light" variant="tertiary">
            Tertiary
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "16px",
          backgroundColor: "#1a1a1a",
          borderRadius: "8px",
        }}>
        <h3
          style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: "600",
            color: "#ffffff",
          }}>
          Dark Theme
        </h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button theme="dark" variant="primary">
            Primary
          </Button>
          <Button theme="dark" variant="secondary">
            Secondary
          </Button>
          <Button theme="dark" variant="tertiary">
            Tertiary
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Light와 Dark 테마를 비교해서 보여주는 스토리입니다.",
      },
    },
  },
};

// ============================================
// Interactive Stories
// ============================================

export const Interactive: Story = {
  args: {
    children: "클릭해보세요",
    onClick: () => alert("버튼이 클릭되었습니다!"),
  },
  parameters: {
    docs: {
      description: {
        story: "클릭 이벤트가 있는 인터랙티브 버튼입니다.",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    children: "Playground 버튼",
    fullWidth: false,
    disabled: false,
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: "모든 props를 자유롭게 조합해볼 수 있는 Playground입니다.",
      },
    },
  },
};
