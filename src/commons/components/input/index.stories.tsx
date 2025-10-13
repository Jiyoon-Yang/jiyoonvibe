import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./index";

// 아이콘 컴포넌트 (예시용)
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

const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
      fill="currentColor"
    />
    <path
      d="M8 10C3.58172 10 0 13.5817 0 18H16C16 13.5817 12.4183 10 8 10Z"
      fill="currentColor"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="8"
      cy="8"
      r="2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 3H14C14.5523 3 15 3.44772 15 4V12C15 12.5523 14.5523 13 14 13H2C1.44772 13 1 12.5523 1 12V4C1 3.44772 1.44772 3 2 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 4L8 9L1 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: "Commons/Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "재사용 가능한 Input 컴포넌트입니다. 다양한 variant, size, theme을 지원하며, 라벨, 에러 메시지, 헬퍼 텍스트, 아이콘 등을 포함할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
      description: "인풋의 스타일 variant",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "인풋의 크기",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
      description: "인풋의 테마",
      table: {
        defaultValue: { summary: "light" },
      },
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "전체 너비 인풋 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    error: {
      control: { type: "boolean" },
      description: "에러 상태",
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
    required: {
      control: { type: "boolean" },
      description: "필수 입력 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: { type: "text" },
      description: "라벨 텍스트",
    },
    placeholder: {
      control: { type: "text" },
      description: "플레이스홀더 텍스트",
    },
    errorMessage: {
      control: { type: "text" },
      description: "에러 메시지",
    },
    helperText: {
      control: { type: "text" },
      description: "헬퍼 텍스트",
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
    placeholder: "입력하세요",
  },
};

// ============================================
// Variant Stories
// ============================================

export const Primary: Story = {
  args: {
    variant: "primary",
    placeholder: "Primary 인풋",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    placeholder: "Secondary 인풋",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    placeholder: "Tertiary 인풋",
  },
};

// ============================================
// Size Stories
// ============================================

export const Small: Story = {
  args: {
    size: "small",
    placeholder: "Small 인풋",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    placeholder: "Medium 인풋",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    placeholder: "Large 인풋",
  },
};

// ============================================
// Theme Stories
// ============================================

export const LightTheme: Story = {
  args: {
    theme: "light",
    placeholder: "Light 테마",
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: "dark",
    placeholder: "Dark 테마",
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
    placeholder: "비활성화된 인풋",
    value: "비활성화된 값",
  },
};

export const WithError: Story = {
  args: {
    error: true,
    errorMessage: "올바른 값을 입력하세요",
    placeholder: "에러 상태 인풋",
    value: "잘못된 값",
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: "도움말 텍스트입니다",
    placeholder: "헬퍼 텍스트가 있는 인풋",
  },
};

// ============================================
// Label Stories
// ============================================

export const WithLabel: Story = {
  args: {
    label: "이름",
    placeholder: "이름을 입력하세요",
  },
};

export const WithRequiredLabel: Story = {
  args: {
    label: "이메일",
    required: true,
    placeholder: "이메일을 입력하세요",
  },
};

export const WithLabelAndError: Story = {
  args: {
    label: "비밀번호",
    required: true,
    error: true,
    errorMessage: "비밀번호는 8자 이상이어야 합니다",
    placeholder: "비밀번호를 입력하세요",
    value: "123",
  },
};

export const WithLabelAndHelper: Story = {
  args: {
    label: "사용자명",
    helperText: "영문, 숫자, 언더스코어만 사용 가능합니다",
    placeholder: "사용자명을 입력하세요",
  },
};

// ============================================
// Icon Stories
// ============================================

export const WithLeftIcon: Story = {
  args: {
    iconLeft: <SearchIcon />,
    placeholder: "검색어를 입력하세요",
  },
};

export const WithRightIcon: Story = {
  args: {
    iconRight: <EyeIcon />,
    type: "password",
    placeholder: "비밀번호를 입력하세요",
  },
};

export const WithBothIcons: Story = {
  args: {
    iconLeft: <UserIcon />,
    iconRight: <EyeIcon />,
    placeholder: "사용자 정보를 입력하세요",
  },
};

export const EmailInput: Story = {
  args: {
    iconLeft: <EmailIcon />,
    type: "email",
    label: "이메일",
    placeholder: "example@email.com",
  },
};

export const SearchInput: Story = {
  args: {
    iconLeft: <SearchIcon />,
    placeholder: "검색어를 입력하세요",
    variant: "secondary",
  },
};

// ============================================
// Layout Stories
// ============================================

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: "전체 너비 인풋",
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        minWidth: "300px",
      }}>
      <Input variant="primary" placeholder="Primary 인풋" />
      <Input variant="secondary" placeholder="Secondary 인풋" />
      <Input variant="tertiary" placeholder="Tertiary 인풋" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 variant를 한 번에 보여주는 예제입니다.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        minWidth: "300px",
      }}>
      <Input size="small" placeholder="Small 인풋" />
      <Input size="medium" placeholder="Medium 인풋" />
      <Input size="large" placeholder="Large 인풋" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 크기를 한 번에 보여주는 예제입니다.",
      },
    },
  },
};

export const FormExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        minWidth: "400px",
      }}>
      <Input
        label="이름"
        required
        placeholder="이름을 입력하세요"
        iconLeft={<UserIcon />}
      />
      <Input
        label="이메일"
        required
        type="email"
        placeholder="example@email.com"
        iconLeft={<EmailIcon />}
        helperText="로그인에 사용할 이메일 주소입니다"
      />
      <Input
        label="비밀번호"
        required
        type="password"
        placeholder="비밀번호를 입력하세요"
        iconRight={<EyeIcon />}
        error
        errorMessage="비밀번호는 8자 이상이어야 합니다"
      />
      <Input
        label="검색"
        placeholder="검색어를 입력하세요"
        iconLeft={<SearchIcon />}
        variant="secondary"
      />
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "실제 폼에서 사용되는 다양한 인풋 조합 예제입니다.",
      },
    },
  },
};

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "32px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          minWidth: "250px",
        }}>
        <h3
          style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "600" }}>
          Light Theme
        </h3>
        <Input theme="light" placeholder="Light Primary" variant="primary" />
        <Input
          theme="light"
          placeholder="Light Secondary"
          variant="secondary"
        />
        <Input theme="light" placeholder="Light Tertiary" variant="tertiary" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          minWidth: "250px",
          padding: "16px",
          backgroundColor: "#1c1c1c",
          borderRadius: "8px",
        }}>
        <h3
          style={{
            margin: "0 0 8px 0",
            fontSize: "16px",
            fontWeight: "600",
            color: "#ffffff",
          }}>
          Dark Theme
        </h3>
        <Input theme="dark" placeholder="Dark Primary" variant="primary" />
        <Input theme="dark" placeholder="Dark Secondary" variant="secondary" />
        <Input theme="dark" placeholder="Dark Tertiary" variant="tertiary" />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Light와 Dark 테마를 비교해서 보여주는 예제입니다.",
      },
    },
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [hasError, setHasError] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      setHasError(newValue.length > 0 && newValue.length < 3);
    };

    return (
      <div style={{ minWidth: "300px" }}>
        <Input
          label="사용자명"
          required
          value={value}
          onChange={handleChange}
          placeholder="최소 3자 이상 입력하세요"
          error={hasError}
          errorMessage={
            hasError ? "사용자명은 최소 3자 이상이어야 합니다" : undefined
          }
          helperText={
            !hasError ? "영문, 숫자, 언더스코어만 사용 가능합니다" : undefined
          }
          iconLeft={<UserIcon />}
        />
        <div style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
          입력된 값: &quot;{value}&quot; ({value.length}자)
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "실시간으로 유효성 검사를 수행하는 인터랙티브 예제입니다.",
      },
    },
  },
};
