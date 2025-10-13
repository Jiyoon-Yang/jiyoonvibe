import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Searchbar } from "./index";

/**
 * Searchbar 컴포넌트
 * 
 * 검색 기능을 제공하는 공통 컴포넌트입니다.
 * 
 * ## 주요 기능
 * - 3가지 variant: primary, secondary, tertiary
 * - 3가지 size: small, medium, large
 * - 2가지 theme: light, dark
 * - 검색 버튼 클릭 또는 Enter키로 검색 실행
 * - 검색어 초기화 기능
 * - 로딩 상태 표시
 * - 전체 너비 옵션
 * - 텍스트 입력 시 너비 고정 (overflow 시 스크롤)
 */
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
- **3가지 variant**: primary (기본 스타일), secondary (배경 있는 스타일), tertiary (밑줄 스타일)
- **3가지 size**: small (36px), medium (48px), large (56px)
- **2가지 theme**: light, dark
- **검색 실행**: 검색 버튼 클릭 또는 Enter키 입력
- **초기화**: 초기화 버튼으로 검색어 삭제
- **로딩 상태**: 검색 중 로딩 스피너 표시
- **전체 너비**: 부모 컨테이너에 맞춰 너비 확장
- **너비 고정**: 긴 텍스트 입력 시에도 검색바 너비 유지

## 디자인 특징
- 피그마 디자인 시스템 기반 구현
- 포커스 시 테두리 색상 변경 및 그림자 효과
- 호버, 포커스, 비활성화 등 인터랙션 상태 지원
- 부드러운 전환 애니메이션

## 사용 예시
\`\`\`tsx
// 기본 사용
<Searchbar 
  placeholder="검색어를 입력해 주세요."
  onSearch={(value) => console.log('검색:', value)}
/>

// 고급 사용
<Searchbar 
  variant="secondary" 
  size="large" 
  theme="dark"
  fullWidth
  loading={isSearching}
  onSearch={handleSearch}
  onClear={handleClear}
  onChange={handleChange}
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
      description: "검색바의 스타일 variant를 설정합니다.",
      table: {
        type: { summary: '"primary" | "secondary" | "tertiary"' },
        defaultValue: { summary: '"primary"' },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "검색바의 크기를 설정합니다.",
      table: {
        type: { summary: '"small" | "medium" | "large"' },
        defaultValue: { summary: '"medium"' },
      },
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
      description: "라이트/다크 테마를 설정합니다.",
      table: {
        type: { summary: '"light" | "dark"' },
        defaultValue: { summary: '"light"' },
      },
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "true일 경우 부모 컨테이너의 전체 너비를 사용합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showClearButton: {
      control: { type: "boolean" },
      description: "검색어 초기화 버튼의 표시 여부를 설정합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    loading: {
      control: { type: "boolean" },
      description: "로딩 상태를 설정합니다. true일 경우 로딩 스피너가 표시됩니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 상태를 설정합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    placeholder: {
      control: { type: "text" },
      description: "입력 필드의 플레이스홀더 텍스트를 설정합니다.",
      table: {
        type: { summary: "string" },
      },
    },
    value: {
      control: { type: "text" },
      description: "입력 필드의 값을 설정합니다.",
      table: {
        type: { summary: "string" },
      },
    },
    onSearch: {
      action: "searched",
      description: "검색 버튼 클릭 또는 Enter키 입력 시 호출되는 콜백 함수입니다.",
      table: {
        type: { summary: "(value: string) => void" },
      },
    },
    onClear: {
      action: "cleared",
      description: "초기화 버튼 클릭 시 호출되는 콜백 함수입니다.",
      table: {
        type: { summary: "() => void" },
      },
    },
    onChange: {
      action: "changed",
      description: "입력값 변경 시 호출되는 콜백 함수입니다.",
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

/**
 * 기본 Searchbar 컴포넌트
 * 
 * 가장 기본적인 형태의 검색바입니다.
 */
export const Default: Story = {
  args: {
    placeholder: "검색어를 입력해 주세요.",
  },
  parameters: {
    docs: {
      description: {
        story: "기본 설정의 Searchbar 컴포넌트입니다. variant는 primary, size는 medium, theme는 light가 기본값입니다.",
      },
    },
  },
};

/**
 * 입력값이 있는 Searchbar
 */
export const WithValue: Story = {
  args: {
    placeholder: "검색어를 입력해 주세요.",
    value: "검색어 예시",
  },
  parameters: {
    docs: {
      description: {
        story: "입력값이 있는 상태의 검색바입니다. 초기화 버튼이 표시됩니다.",
      },
    },
  },
};

/**
 * 긴 텍스트가 입력된 Searchbar
 * 
 * 검색바의 너비는 고정되어 있으며, 텍스트가 길어지면 스크롤됩니다.
 */
export const WithLongValue: Story = {
  args: {
    placeholder: "검색어를 입력해 주세요.",
    value:
      "매우 긴 검색어를 입력해도 텍스트 박스 길이가 늘어나지 않고 일정하게 유지됩니다. 텍스트가 오버플로우되면 자동으로 스크롤됩니다.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "긴 텍스트를 입력해도 검색바의 너비는 고정되어 있으며, 초과되는 텍스트는 스크롤하여 확인할 수 있습니다.",
      },
    },
  },
};

// ========================
// Variant 스토리들
// ========================

/**
 * Primary Variant
 * 
 * 기본 스타일의 검색바입니다. 흰색 배경에 회색 테두리를 가지고 있습니다.
 */
export const Primary: Story = {
  args: {
    variant: "primary",
    placeholder: "Primary 검색바",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Primary variant는 가장 기본적인 스타일로, 흰색 배경에 회색 테두리를 가집니다. 포커스 시 파란색 테두리와 그림자가 나타납니다.",
      },
    },
  },
};

/**
 * Secondary Variant
 * 
 * 배경색이 있는 검색바입니다. Light 테마에서는 회색 배경, 호버 시 배경색이 진해집니다.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    placeholder: "Secondary 검색바",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Secondary variant는 배경색이 있는 스타일입니다. 호버 시 배경색이 변하며, 포커스 시 흰색 배경으로 변경됩니다.",
      },
    },
  },
};

/**
 * Tertiary Variant
 * 
 * 밑줄 스타일의 검색바입니다. 배경이 투명하며 하단에만 밑줄이 표시됩니다.
 */
export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    placeholder: "Tertiary 검색바",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tertiary variant는 밑줄 스타일로, 배경이 투명하고 하단에만 선이 표시됩니다. 미니멀한 디자인이 필요한 곳에 적합합니다.",
      },
    },
  },
};

// ========================
// Size 스토리들
// ========================

/**
 * Small Size
 * 
 * 작은 크기(36px)의 검색바입니다.
 */
export const Small: Story = {
  args: {
    size: "small",
    placeholder: "Small 크기 검색바",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Small size는 높이 36px의 작은 검색바입니다. 공간이 제한적이거나 밀도 높은 UI에 적합합니다.",
      },
    },
  },
};

/**
 * Medium Size
 * 
 * 중간 크기(48px)의 검색바입니다. 기본 크기입니다.
 */
export const Medium: Story = {
  args: {
    size: "medium",
    placeholder: "Medium 크기 검색바",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Medium size는 높이 48px의 중간 검색바로, 기본 크기입니다. 대부분의 경우에 적합합니다.",
      },
    },
  },
};

/**
 * Large Size
 * 
 * 큰 크기(56px)의 검색바입니다.
 */
export const Large: Story = {
  args: {
    size: "large",
    placeholder: "Large 크기 검색바",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Large size는 높이 56px의 큰 검색바입니다. 중요한 검색 기능이나 랜딩 페이지 등에 적합합니다.",
      },
    },
  },
};

// ========================
// Theme 스토리들
// ========================

/**
 * Light Theme
 * 
 * 라이트 테마의 검색바입니다.
 */
export const Light: Story = {
  args: {
    theme: "light",
    placeholder: "Light 테마 검색바",
  },
  parameters: {
    backgrounds: { default: "light" },
    docs: {
      description: {
        story:
          "Light theme는 밝은 배경에서 사용하는 검색바입니다. 어두운 텍스트와 밝은 배경을 사용합니다.",
      },
    },
  },
};

/**
 * Dark Theme
 * 
 * 다크 테마의 검색바입니다.
 */
export const Dark: Story = {
  args: {
    theme: "dark",
    placeholder: "Dark 테마 검색바",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "Dark theme는 어두운 배경에서 사용하는 검색바입니다. 밝은 텍스트와 어두운 배경을 사용합니다.",
      },
    },
  },
};

// ========================
// 상태별 스토리들
// ========================

/**
 * Focused State
 * 
 * 포커스된 상태의 검색바입니다.
 */
export const Focused: Story = {
  args: {
    placeholder: "포커스된 검색바",
    autoFocus: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "검색바가 포커스되면 테두리 색상이 파란색으로 변경되고 그림자 효과가 나타납니다. 사용자의 입력을 받을 준비가 되었음을 시각적으로 표시합니다.",
      },
    },
  },
};

/**
 * Typing State
 * 
 * 사용자가 텍스트를 입력하는 중인 상태입니다.
 */
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
          "사용자가 텍스트를 입력하는 동안의 상태입니다. 입력값이 있으면 자동으로 초기화 버튼이 표시됩니다.",
      },
    },
  },
};

/**
 * Loading State
 * 
 * 검색 중인 로딩 상태입니다.
 */
export const Loading: Story = {
  args: {
    loading: true,
    placeholder: "검색 중...",
    value: "검색어",
  },
  parameters: {
    docs: {
      description: {
        story:
          "검색 중인 로딩 상태입니다. 로딩 스피너가 표시되며, 검색 버튼과 입력 필드가 비활성화됩니다.",
      },
    },
  },
};

/**
 * Disabled State
 * 
 * 비활성화된 상태의 검색바입니다.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "비활성화된 검색바",
    value: "검색어",
  },
  parameters: {
    docs: {
      description: {
        story:
          "비활성화된 상태의 검색바입니다. 모든 인터랙션이 불가능하며, 투명도가 낮아져 비활성 상태임을 나타냅니다.",
      },
    },
  },
};

/**
 * Without Clear Button
 * 
 * 초기화 버튼이 없는 검색바입니다.
 */
export const WithoutClearButton: Story = {
  args: {
    showClearButton: false,
    placeholder: "초기화 버튼이 없는 검색바",
    value: "검색어",
  },
  parameters: {
    docs: {
      description: {
        story:
          "초기화 버튼이 표시되지 않는 검색바입니다. showClearButton을 false로 설정하면 입력값이 있어도 초기화 버튼이 나타나지 않습니다.",
      },
    },
  },
};

/**
 * Full Width
 * 
 * 전체 너비를 사용하는 검색바입니다.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: "전체 너비 검색바",
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "fullWidth를 true로 설정하면 부모 컨테이너의 전체 너비를 사용합니다. 반응형 레이아웃에 적합합니다.",
      },
    },
  },
};

// ========================
// 조합 스토리들
// ========================

/**
 * All Variants Comparison
 * 
 * 모든 variant를 한눈에 비교할 수 있습니다.
 */
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
    docs: {
      description: {
        story:
          "세 가지 variant(primary, secondary, tertiary)를 한번에 비교할 수 있습니다. 각 variant의 시각적 차이를 확인하세요.",
      },
    },
  },
};

/**
 * All Sizes Comparison
 * 
 * 모든 size를 한눈에 비교할 수 있습니다.
 */
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "400px",
      }}>
      <Searchbar size="small" placeholder="Small 크기 (36px)" />
      <Searchbar size="medium" placeholder="Medium 크기 (48px)" />
      <Searchbar size="large" placeholder="Large 크기 (56px)" />
    </div>
  ),
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "세 가지 size(small: 36px, medium: 48px, large: 56px)를 한번에 비교할 수 있습니다.",
      },
    },
  },
};

/**
 * All Themes Comparison
 * 
 * Light와 Dark 테마의 모든 variant를 비교할 수 있습니다.
 */
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
    docs: {
      description: {
        story:
          "Light와 Dark 테마의 모든 variant를 한 화면에서 비교할 수 있습니다. 각 테마별 색상과 스타일 차이를 확인하세요.",
      },
    },
  },
};

/**
 * All States Comparison
 * 
 * 검색바의 모든 상태를 한눈에 비교할 수 있습니다.
 */
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
    docs: {
      description: {
        story:
          "검색바의 모든 상태(기본, 값 입력, 긴 텍스트, 포커스, 로딩, 비활성화, 초기화 버튼 없음)를 한 화면에서 확인할 수 있습니다.",
      },
    },
  },
};

// ========================
// 인터랙션 스토리들
// ========================

/**
 * Interactive Example
 * 
 * 검색, 초기화, 입력 변경 이벤트를 확인할 수 있습니다.
 */
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
  parameters: {
    docs: {
      description: {
        story:
          "검색바의 인터랙션을 테스트할 수 있습니다. 검색 버튼 클릭, Enter키 입력, 초기화 버튼 클릭 시 알림이 표시됩니다.",
      },
    },
  },
};

// ========================
// 복합 시나리오 스토리들
// ========================

/**
 * Search Scenarios
 * 
 * 실제 사용 시나리오에서의 검색바 활용 예시입니다.
 */
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
        <p style={{ marginBottom: "12px", fontSize: "14px", color: "#666" }}>
          Primary variant, 검색 버튼 클릭 또는 Enter키로 검색 실행
        </p>
        <Searchbar
          variant="primary"
          size="medium"
          placeholder="상품명, 브랜드명을 입력해 주세요."
          onSearch={(value) => console.log("상품 검색:", value)}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: "16px" }}>실시간 검색</h3>
        <p style={{ marginBottom: "12px", fontSize: "14px", color: "#666" }}>
          Secondary variant, 입력할 때마다 onChange 이벤트 발생
        </p>
        <Searchbar
          variant="secondary"
          size="medium"
          placeholder="실시간으로 검색됩니다."
          onChange={(e) => console.log("실시간 검색:", e.target.value)}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: "16px" }}>필터 검색</h3>
        <p style={{ marginBottom: "12px", fontSize: "14px", color: "#666" }}>
          Tertiary variant, 전체 너비 사용
        </p>
        <Searchbar
          variant="tertiary"
          size="small"
          placeholder="필터 조건을 입력하세요."
          fullWidth
        />
      </div>

      <div>
        <h3 style={{ marginBottom: "16px" }}>검색 중 상태</h3>
        <p style={{ marginBottom: "12px", fontSize: "14px", color: "#666" }}>
          로딩 상태로 검색 처리 중임을 표시
        </p>
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
    docs: {
      description: {
        story:
          "실제 프로덕트에서 사용할 수 있는 다양한 검색 시나리오 예시입니다. 일반 검색, 실시간 검색, 필터 검색, 검색 중 상태 등을 확인하세요.",
      },
    },
  },
};

/**
 * Responsive Example
 * 
 * 다양한 컨테이너 너비에서의 반응형 동작을 확인할 수 있습니다.
 */
export const ResponsiveExample: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <h3 style={{ marginBottom: "16px" }}>반응형 검색바</h3>
      <p style={{ marginBottom: "24px", fontSize: "14px", color: "#666" }}>
        fullWidth prop을 사용하면 부모 컨테이너의 너비에 맞춰 검색바의 너비가 조절됩니다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ width: "100%" }}>
          <p style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            전체 너비 (100%)
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
    docs: {
      description: {
        story:
          "fullWidth prop을 활성화하면 검색바가 부모 컨테이너의 너비에 맞춰 반응형으로 동작합니다. 다양한 화면 크기와 레이아웃에 유연하게 대응할 수 있습니다.",
      },
    },
  },
};
