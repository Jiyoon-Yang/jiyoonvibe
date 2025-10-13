import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Searchbar } from "./index";

const meta: Meta<typeof Searchbar> = {
  title: "Commons/Components/Searchbar",
  component: Searchbar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
검색 기능을 제공하는 Searchbar 컴포넌트입니다.

## 주요 기능
- 3가지 variant (primary, secondary, tertiary)
- 3가지 size (small, medium, large)  
- 2가지 theme (light, dark)
- 검색 버튼 및 초기화 버튼
- 로딩 상태 지원
- 전체 너비 옵션
- 키보드 이벤트 지원 (Enter키로 검색)
- 텍스트 입력 시 너비 고정 (overflow 시 스크롤)

## 디자인 특징
- 피그마 디자인을 기반으로 구현
- 포커스 시 테두리 색상 및 그림자 효과
- 긴 텍스트 입력 시에도 검색바 너비 유지
- 호버, 포커스, 비활성화 등 다양한 상태 지원

## 사용 예시
\`\`\`tsx
<Searchbar 
  variant="primary" 
  size="medium" 
  placeholder="검색어를 입력해 주세요."
  onSearch={(value) => console.log('검색:', value)}
  onClear={() => console.log('초기화')}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
      description: "검색바의 스타일 variant",
      table: {
        type: { summary: "primary | secondary | tertiary" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "검색바의 크기",
      table: {
        type: { summary: "small | medium | large" },
        defaultValue: { summary: "medium" },
      },
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
      description: "테마",
      table: {
        type: { summary: "light | dark" },
        defaultValue: { summary: "light" },
      },
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "전체 너비 검색바 여부",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showClearButton: {
      control: { type: "boolean" },
      description: "검색어 초기화 버튼 표시 여부",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    loading: {
      control: { type: "boolean" },
      description: "로딩 상태",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 상태",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    placeholder: {
      control: { type: "text" },
      description: "플레이스홀더 텍스트",
      table: {
        type: { summary: "string" },
      },
    },
    value: {
      control: { type: "text" },
      description: "입력값",
      table: {
        type: { summary: "string" },
      },
    },
    onSearch: {
      action: "searched",
      description: "검색 버튼 클릭 또는 Enter키 입력 시 호출되는 함수",
      table: {
        type: { summary: "(value: string) => void" },
      },
    },
    onClear: {
      action: "cleared",
      description: "초기화 버튼 클릭 시 호출되는 함수",
      table: {
        type: { summary: "() => void" },
      },
    },
    onChange: {
      action: "changed",
      description: "입력값 변경 시 호출되는 함수",
      table: {
        type: { summary: "(e: React.ChangeEvent<HTMLInputElement>) => void" },
      },
    },
  },
  args: {
    onSearch: (value: string) => console.log("검색:", value),
    onClear: () => console.log("초기화"),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      console.log("변경:", e.target.value),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ========================
// 기본 스토리들
// ========================

export const Default: Story = {
  args: {
    placeholder: "검색어를 입력해 주세요.",
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "검색어를 입력해 주세요.",
    value: "검색어 예시",
  },
};

export const WithLongValue: Story = {
  args: {
    placeholder: "검색어를 입력해 주세요.",
    value: "매우 긴 검색어를 입력해도 텍스트 박스 길이가 늘어나지 않고 일정하게 유지됩니다",
  },
  parameters: {
    docs: {
      description: {
        story:
          "긴 텍스트를 입력해도 검색바의 너비는 고정되어 있으며, 텍스트는 스크롤됩니다.",
      },
    },
  },
};

// ========================
// Variant 스토리들
// ========================

export const Primary: Story = {
  args: {
    variant: "primary",
    placeholder: "Primary 검색바",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    placeholder: "Secondary 검색바",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    placeholder: "Tertiary 검색바",
  },
};

// ========================
// Size 스토리들
// ========================

export const Small: Story = {
  args: {
    size: "small",
    placeholder: "Small 크기 검색바",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    placeholder: "Medium 크기 검색바",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    placeholder: "Large 크기 검색바",
  },
};

// ========================
// Theme 스토리들
// ========================

export const Light: Story = {
  args: {
    theme: "light",
    placeholder: "Light 테마 검색바",
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const Dark: Story = {
  args: {
    theme: "dark",
    placeholder: "Dark 테마 검색바",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// ========================
// 상태별 스토리들
// ========================

export const Focused: Story = {
  args: {
    placeholder: "포커스된 검색바",
    autoFocus: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "검색바가 포커스되면 테두리 색상이 변경되고 그림자 효과가 나타납니다.",
      },
    },
  },
};

export const WithTyping: Story = {
  args: {
    placeholder: "검색어를 입력해 주세요.",
    value: "입력 중",
    autoFocus: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "사용자가 텍스트를 입력하는 동안의 상태입니다. 초기화 버튼이 표시됩니다.",
      },
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    placeholder: "검색 중...",
    value: "검색어",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "비활성화된 검색바",
    value: "검색어",
  },
};

export const WithoutClearButton: Story = {
  args: {
    showClearButton: false,
    placeholder: "초기화 버튼이 없는 검색바",
    value: "검색어",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: "전체 너비 검색바",
  },
  parameters: {
    layout: "padded",
  },
};

// ========================
// 조합 스토리들
// ========================

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "400px",
      }}>
      <Searchbar variant="primary" placeholder="Primary 검색바" />
      <Searchbar variant="secondary" placeholder="Secondary 검색바" />
      <Searchbar variant="tertiary" placeholder="Tertiary 검색바" />
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "400px",
      }}>
      <Searchbar size="small" placeholder="Small 크기" />
      <Searchbar size="medium" placeholder="Medium 크기" />
      <Searchbar size="large" placeholder="Large 크기" />
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};

export const AllThemes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        padding: "24px",
      }}>
      <div>
        <h3 style={{ marginBottom: "16px", color: "#333" }}>Light Theme</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "400px",
          }}>
          <Searchbar
            theme="light"
            variant="primary"
            placeholder="Primary Light"
          />
          <Searchbar
            theme="light"
            variant="secondary"
            placeholder="Secondary Light"
          />
          <Searchbar
            theme="light"
            variant="tertiary"
            placeholder="Tertiary Light"
          />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#1c1c1c",
          padding: "24px",
          borderRadius: "8px",
        }}>
        <h3 style={{ marginBottom: "16px", color: "#fff" }}>Dark Theme</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "400px",
          }}>
          <Searchbar
            theme="dark"
            variant="primary"
            placeholder="Primary Dark"
          />
          <Searchbar
            theme="dark"
            variant="secondary"
            placeholder="Secondary Dark"
          />
          <Searchbar
            theme="dark"
            variant="tertiary"
            placeholder="Tertiary Dark"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "400px",
      }}>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#666" }}>
          기본 상태
        </p>
        <Searchbar placeholder="기본 상태" />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#666" }}>
          값이 있는 상태
        </p>
        <Searchbar placeholder="값이 있는 상태" value="검색어" />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#666" }}>
          긴 텍스트 (너비 고정)
        </p>
        <Searchbar
          placeholder="긴 텍스트"
          value="매우 긴 검색어를 입력해도 텍스트 박스 길이가 늘어나지 않습니다"
        />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#666" }}>
          포커스 상태
        </p>
        <Searchbar placeholder="포커스 상태" autoFocus />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#666" }}>
          로딩 상태
        </p>
        <Searchbar placeholder="로딩 상태" value="검색어" loading />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#666" }}>
          비활성화 상태
        </p>
        <Searchbar placeholder="비활성화 상태" value="검색어" disabled />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#666" }}>
          초기화 버튼 없음
        </p>
        <Searchbar
          placeholder="초기화 버튼 없음"
          value="검색어"
          showClearButton={false}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};

// ========================
// 인터랙션 스토리들
// ========================

export const WithInteractions: Story = {
  args: {
    placeholder: "검색어를 입력하고 Enter를 누르거나 검색 버튼을 클릭하세요.",
    onSearch: (value: string) => {
      alert(`검색어: "${value}"`);
    },
    onClear: () => {
      alert("검색어가 초기화되었습니다.");
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("입력값 변경:", e.target.value);
    },
  },
};

// ========================
// 복합 시나리오 스토리들
// ========================

export const SearchScenarios: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        padding: "24px",
      }}>
      <div>
        <h3 style={{ marginBottom: "16px" }}>일반 검색</h3>
        <Searchbar
          variant="primary"
          size="medium"
          placeholder="상품명, 브랜드명을 입력해 주세요."
          onSearch={(value) => console.log("상품 검색:", value)}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: "16px" }}>실시간 검색</h3>
        <Searchbar
          variant="secondary"
          size="medium"
          placeholder="실시간으로 검색됩니다."
          onChange={(e) => console.log("실시간 검색:", e.target.value)}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: "16px" }}>필터 검색</h3>
        <Searchbar
          variant="tertiary"
          size="small"
          placeholder="필터 조건을 입력하세요."
          fullWidth
        />
      </div>

      <div>
        <h3 style={{ marginBottom: "16px" }}>검색 중 상태</h3>
        <Searchbar
          variant="primary"
          size="medium"
          placeholder="검색 중..."
          value="검색어"
          loading
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

export const ResponsiveExample: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <h3 style={{ marginBottom: "16px" }}>반응형 검색바</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ width: "100%" }}>
          <p style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            전체 너비
          </p>
          <Searchbar
            fullWidth
            placeholder="전체 너비 검색바"
            variant="primary"
          />
        </div>
        <div style={{ width: "600px" }}>
          <p style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            고정 너비 (600px)
          </p>
          <Searchbar
            fullWidth
            placeholder="고정 너비 검색바"
            variant="secondary"
          />
        </div>
        <div style={{ width: "300px" }}>
          <p style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            작은 너비 (300px)
          </p>
          <Searchbar
            fullWidth
            placeholder="작은 너비 검색바"
            variant="tertiary"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};
