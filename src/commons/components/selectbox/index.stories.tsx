import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Selectbox } from "./index";

// 아이콘 컴포넌트 (예시용)
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

const LocationIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 0C5.79086 0 4 1.79086 4 4C4 7 8 12 8 12C8 12 12 7 12 4C12 1.79086 10.2091 0 8 0Z"
      fill="currentColor"
    />
    <circle cx="8" cy="4" r="2" fill="white" />
  </svg>
);

// 옵션 데이터
const basicOptions = [
  { value: "option1", label: "옵션 1" },
  { value: "option2", label: "옵션 2" },
  { value: "option3", label: "옵션 3" },
  { value: "option4", label: "옵션 4" },
];

const categoryOptions = [
  { value: "frontend", label: "프론트엔드" },
  { value: "backend", label: "백엔드" },
  { value: "mobile", label: "모바일" },
  { value: "design", label: "디자인" },
  { value: "devops", label: "데브옵스" },
];

const countryOptions = [
  { value: "kr", label: "대한민국" },
  { value: "us", label: "미국" },
  { value: "jp", label: "일본" },
  { value: "cn", label: "중국" },
  { value: "uk", label: "영국" },
  { value: "fr", label: "프랑스" },
  { value: "de", label: "독일" },
  { value: "ca", label: "캐나다" },
  { value: "au", label: "호주" },
  { value: "sg", label: "싱가포르" },
];

const statusOptions = [
  { value: "active", label: "활성" },
  { value: "inactive", label: "비활성" },
  { value: "pending", label: "대기중" },
  { value: "disabled", label: "비활성화됨", disabled: true },
];

const meta: Meta<typeof Selectbox> = {
  title: "Commons/Components/Selectbox",
  component: Selectbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "재사용 가능한 Selectbox 컴포넌트입니다. 다양한 variant, size, theme을 지원하며, 검색 기능과 다양한 상태를 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
      description: "셀렉트박스의 스타일 variant",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "셀렉트박스의 크기",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
      description: "셀렉트박스의 테마",
      table: {
        defaultValue: { summary: "light" },
      },
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "전체 너비 셀렉트박스 여부",
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
    error: {
      control: { type: "boolean" },
      description: "에러 상태",
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
    searchable: {
      control: { type: "boolean" },
      description: "검색 가능 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    placeholder: {
      control: { type: "text" },
      description: "플레이스홀더 텍스트",
    },
    label: {
      control: { type: "text" },
      description: "라벨 텍스트",
    },
    helperText: {
      control: { type: "text" },
      description: "헬퍼 텍스트",
    },
    errorMessage: {
      control: { type: "text" },
      description: "에러 메시지",
    },
    options: {
      control: false,
      description: "옵션 목록",
    },
    iconLeft: {
      control: false,
      description: "왼쪽 아이콘",
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
    placeholder: "선택하세요",
    options: basicOptions,
  },
};

// ============================================
// Variant Stories
// ============================================

export const Primary: Story = {
  args: {
    variant: "primary",
    placeholder: "Primary 셀렉트박스",
    options: categoryOptions,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    placeholder: "Secondary 셀렉트박스",
    options: categoryOptions,
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    placeholder: "Tertiary 셀렉트박스",
    options: categoryOptions,
  },
};

// ============================================
// Size Stories
// ============================================

export const Small: Story = {
  args: {
    size: "small",
    placeholder: "Small 셀렉트박스",
    options: basicOptions,
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    placeholder: "Medium 셀렉트박스",
    options: basicOptions,
  },
};

export const Large: Story = {
  args: {
    size: "large",
    placeholder: "Large 셀렉트박스",
    options: basicOptions,
  },
};

// ============================================
// Theme Stories
// ============================================

export const LightTheme: Story = {
  args: {
    theme: "light",
    placeholder: "Light 테마",
    options: categoryOptions,
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: "dark",
    placeholder: "Dark 테마",
    options: categoryOptions,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// ============================================
// State Stories
// ============================================

export const WithLabel: Story = {
  args: {
    label: "카테고리",
    placeholder: "카테고리를 선택하세요",
    options: categoryOptions,
  },
};

export const Required: Story = {
  args: {
    label: "필수 선택",
    required: true,
    placeholder: "필수로 선택해야 합니다",
    options: categoryOptions,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "국가",
    placeholder: "국가를 선택하세요",
    helperText: "거주 중인 국가를 선택해주세요",
    options: countryOptions,
  },
};

export const ErrorState: Story = {
  args: {
    label: "카테고리",
    placeholder: "카테고리를 선택하세요",
    error: true,
    errorMessage: "카테고리를 선택해주세요",
    options: categoryOptions,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "비활성화된 셀렉트박스",
    options: basicOptions,
  },
};

export const DisabledWithValue: Story = {
  args: {
    disabled: true,
    value: "option2",
    options: basicOptions,
  },
};

// ============================================
// Feature Stories
// ============================================

export const Searchable: Story = {
  args: {
    searchable: true,
    placeholder: "검색하여 선택하세요",
    options: countryOptions,
  },
  parameters: {
    docs: {
      description: {
        story:
          "검색 기능이 활성화된 셀렉트박스입니다. 드롭다운이 열리면 검색 입력창이 나타납니다.",
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    iconLeft: <UserIcon />,
    placeholder: "사용자 선택",
    options: [
      { value: "user1", label: "김철수" },
      { value: "user2", label: "이영희" },
      { value: "user3", label: "박민수" },
      { value: "user4", label: "정수진" },
    ],
  },
};

export const WithDisabledOptions: Story = {
  args: {
    placeholder: "상태를 선택하세요",
    options: statusOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "일부 옵션이 비활성화된 셀렉트박스입니다.",
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: "전체 너비 셀렉트박스",
    options: categoryOptions,
  },
  parameters: {
    layout: "padded",
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "frontend",
    options: categoryOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "기본값이 설정된 셀렉트박스입니다.",
      },
    },
  },
};

// ============================================
// Combination Stories
// ============================================

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Selectbox
        variant="primary"
        placeholder="Primary"
        options={basicOptions}
      />
      <Selectbox
        variant="secondary"
        placeholder="Secondary"
        options={basicOptions}
      />
      <Selectbox
        variant="tertiary"
        placeholder="Tertiary"
        options={basicOptions}
      />
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
      <Selectbox size="small" placeholder="Small" options={basicOptions} />
      <Selectbox size="medium" placeholder="Medium" options={basicOptions} />
      <Selectbox size="large" placeholder="Large" options={basicOptions} />
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
      <Selectbox placeholder="Normal" options={basicOptions} />
      <Selectbox disabled placeholder="Disabled" options={basicOptions} />
      <Selectbox error placeholder="Error" options={basicOptions} />
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
        <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
          <Selectbox
            theme="light"
            variant="primary"
            placeholder="Primary"
            options={basicOptions}
          />
          <Selectbox
            theme="light"
            variant="secondary"
            placeholder="Secondary"
            options={basicOptions}
          />
          <Selectbox
            theme="light"
            variant="tertiary"
            placeholder="Tertiary"
            options={basicOptions}
          />
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
        <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
          <Selectbox
            theme="dark"
            variant="primary"
            placeholder="Primary"
            options={basicOptions}
          />
          <Selectbox
            theme="dark"
            variant="secondary"
            placeholder="Secondary"
            options={basicOptions}
          />
          <Selectbox
            theme="dark"
            variant="tertiary"
            placeholder="Tertiary"
            options={basicOptions}
          />
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

export const ComplexExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "300px",
      }}>
      <Selectbox
        label="카테고리"
        required
        placeholder="카테고리를 선택하세요"
        helperText="개발 분야를 선택해주세요"
        options={categoryOptions}
      />
      <Selectbox
        label="국가"
        searchable
        iconLeft={<LocationIcon />}
        placeholder="국가를 검색하세요"
        options={countryOptions}
      />
      <Selectbox
        label="상태"
        error
        errorMessage="상태를 선택해주세요"
        placeholder="상태를 선택하세요"
        options={statusOptions}
      />
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "다양한 기능이 조합된 복합적인 예시입니다.",
      },
    },
  },
};

// ============================================
// Interactive Stories
// ============================================

export const Interactive: Story = {
  args: {
    placeholder: "옵션을 선택해보세요",
    options: categoryOptions,
    onChange: (value) => console.log("선택된 값:", value),
  },
  parameters: {
    docs: {
      description: {
        story:
          "선택 이벤트가 있는 인터랙티브 셀렉트박스입니다. 콘솔에서 선택된 값을 확인할 수 있습니다.",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    variant: "primary",
    size: "medium",
    theme: "light",
    placeholder: "Playground 셀렉트박스",
    options: categoryOptions,
    fullWidth: false,
    disabled: false,
    error: false,
    required: false,
    searchable: false,
  },
  parameters: {
    docs: {
      description: {
        story: "모든 props를 자유롭게 조합해볼 수 있는 Playground입니다.",
      },
    },
  },
};
