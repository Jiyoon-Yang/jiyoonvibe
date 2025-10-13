import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toggle } from "./index";

const meta: Meta<typeof Toggle> = {
  title: "Commons/Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
사용자가 두 상태 간을 전환할 수 있는 Toggle 컴포넌트입니다.

## 주요 기능
- 3가지 variant (primary, secondary, tertiary)
- 3가지 size (small, medium, large)
- 2가지 theme (light, dark)
- 제어/비제어 컴포넌트 지원
- 키보드 접근성 지원 (Space, Enter)
- 비활성화 상태 지원

## 사용 예시
\`\`\`tsx
// 기본 사용법 (비제어 컴포넌트)
<Toggle onChange={(checked) => console.log(checked)} />

// 제어 컴포넌트
<Toggle checked={isOn} onChange={setIsOn} />

// 다양한 크기와 변형
<Toggle size="large" variant="primary" />
<Toggle size="small" variant="secondary" theme="dark" />
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
      description: "토글의 스타일 variant",
      table: {
        type: { summary: "primary | secondary | tertiary" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "토글의 크기",
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
    checked: {
      control: { type: "boolean" },
      description: "토글 상태 (제어 컴포넌트)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" },
      },
    },
    defaultChecked: {
      control: { type: "boolean" },
      description: "기본 토글 상태 (비제어 컴포넌트)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "토글 비활성화 여부",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    "aria-label": {
      control: { type: "text" },
      description: "접근성을 위한 라벨",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    "aria-describedby": {
      control: { type: "text" },
      description: "접근성을 위한 설명",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    className: {
      control: { type: "text" },
      description: "추가 CSS 클래스",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    onChange: {
      action: "changed",
      description: "토글 상태 변경 콜백",
      table: {
        type: { summary: "(checked: boolean) => void" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {},
};

// Variant 스토리들
export const Primary: Story = {
  args: {
    variant: "primary",
    "aria-label": "Primary 토글",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    "aria-label": "Secondary 토글",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    "aria-label": "Tertiary 토글",
  },
};

// Size 스토리들
export const Small: Story = {
  args: {
    size: "small",
    "aria-label": "Small 크기 토글",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    "aria-label": "Medium 크기 토글",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    "aria-label": "Large 크기 토글",
  },
};

// Theme 스토리들
export const LightTheme: Story = {
  args: {
    theme: "light",
    "aria-label": "Light 테마 토글",
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: "dark",
    "aria-label": "Dark 테마 토글",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// 상태별 스토리들
export const Checked: Story = {
  args: {
    defaultChecked: true,
    "aria-label": "체크된 상태 토글",
  },
};

export const Unchecked: Story = {
  args: {
    defaultChecked: false,
    "aria-label": "체크되지 않은 상태 토글",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    "aria-label": "비활성화된 토글",
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    "aria-label": "비활성화된 체크 상태 토글",
  },
};

// 제어 컴포넌트 스토리
export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}>
        <Toggle
          {...args}
          checked={checked}
          onChange={setChecked}
          aria-label="제어 컴포넌트 토글"
        />
        <p style={{ fontSize: "14px", color: "#666" }}>
          현재 상태: {checked ? "ON" : "OFF"}
        </p>
      </div>
    );
  },
};

// 크기별 비교 스토리
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}>
        <Toggle size="small" aria-label="Small 토글" />
        <span style={{ fontSize: "12px", color: "#666" }}>Small</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}>
        <Toggle size="medium" aria-label="Medium 토글" />
        <span style={{ fontSize: "12px", color: "#666" }}>Medium</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}>
        <Toggle size="large" aria-label="Large 토글" />
        <span style={{ fontSize: "12px", color: "#666" }}>Large</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "다양한 크기의 토글을 비교해볼 수 있습니다.",
      },
    },
  },
};

// Variant별 비교 스토리
export const VariantComparison: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}>
        <Toggle variant="primary" defaultChecked aria-label="Primary 토글" />
        <span style={{ fontSize: "12px", color: "#666" }}>Primary</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}>
        <Toggle
          variant="secondary"
          defaultChecked
          aria-label="Secondary 토글"
        />
        <span style={{ fontSize: "12px", color: "#666" }}>Secondary</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}>
        <Toggle variant="tertiary" defaultChecked aria-label="Tertiary 토글" />
        <span style={{ fontSize: "12px", color: "#666" }}>Tertiary</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "다양한 variant의 토글을 비교해볼 수 있습니다.",
      },
    },
  },
};

// 테마별 비교 스토리
export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "48px", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          padding: "24px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
        }}>
        <span style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>
          Light Theme
        </span>
        <div style={{ display: "flex", gap: "16px" }}>
          <Toggle
            theme="light"
            variant="primary"
            defaultChecked
            aria-label="Light Primary 토글"
          />
          <Toggle
            theme="light"
            variant="secondary"
            defaultChecked
            aria-label="Light Secondary 토글"
          />
          <Toggle
            theme="light"
            variant="tertiary"
            defaultChecked
            aria-label="Light Tertiary 토글"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          padding: "24px",
          backgroundColor: "#1a1a1a",
          borderRadius: "8px",
          border: "1px solid #333",
        }}>
        <span style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>
          Dark Theme
        </span>
        <div style={{ display: "flex", gap: "16px" }}>
          <Toggle
            theme="dark"
            variant="primary"
            defaultChecked
            aria-label="Dark Primary 토글"
          />
          <Toggle
            theme="dark"
            variant="secondary"
            defaultChecked
            aria-label="Dark Secondary 토글"
          />
          <Toggle
            theme="dark"
            variant="tertiary"
            defaultChecked
            aria-label="Dark Tertiary 토글"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Light와 Dark 테마의 토글을 비교해볼 수 있습니다.",
      },
    },
  },
};

// 접근성 데모 스토리
export const AccessibilityDemo: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(false);
    const [autoSave, setAutoSave] = React.useState(false);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: "24px",
          maxWidth: "400px",
        }}>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>설정</h3>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <div>
            <label
              htmlFor="notifications-toggle"
              style={{
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}>
              알림 받기
            </label>
            <p style={{ fontSize: "12px", color: "#666", margin: "4px 0 0 0" }}>
              새로운 메시지와 업데이트 알림을 받습니다.
            </p>
          </div>
          <Toggle
            checked={notifications}
            onChange={setNotifications}
            aria-label="알림 받기 설정"
            aria-describedby="notifications-desc"
          />
        </div>
        <div id="notifications-desc" style={{ display: "none" }}>
          알림 받기를 활성화하면 새로운 메시지와 업데이트 알림을 받을 수
          있습니다.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <div>
            <label
              htmlFor="darkmode-toggle"
              style={{
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}>
              다크 모드
            </label>
            <p style={{ fontSize: "12px", color: "#666", margin: "4px 0 0 0" }}>
              어두운 테마를 사용합니다.
            </p>
          </div>
          <Toggle
            checked={darkMode}
            onChange={setDarkMode}
            variant="secondary"
            aria-label="다크 모드 설정"
            aria-describedby="darkmode-desc"
          />
        </div>
        <div id="darkmode-desc" style={{ display: "none" }}>
          다크 모드를 활성화하면 어두운 테마가 적용됩니다.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <div>
            <label
              htmlFor="autosave-toggle"
              style={{
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}>
              자동 저장
            </label>
            <p style={{ fontSize: "12px", color: "#666", margin: "4px 0 0 0" }}>
              변경사항을 자동으로 저장합니다.
            </p>
          </div>
          <Toggle
            checked={autoSave}
            onChange={setAutoSave}
            variant="tertiary"
            size="small"
            aria-label="자동 저장 설정"
            aria-describedby="autosave-desc"
          />
        </div>
        <div id="autosave-desc" style={{ display: "none" }}>
          자동 저장을 활성화하면 변경사항이 자동으로 저장됩니다.
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "실제 설정 화면과 같은 형태로 토글을 사용하는 예시입니다. 각 토글은 적절한 라벨과 설명을 가지고 있어 접근성이 향상됩니다.",
      },
    },
  },
};

// 모든 조합 스토리 (개발용)
export const AllCombinations: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        padding: "24px",
      }}>
      {(["primary", "secondary", "tertiary"] as const).map((variant) => (
        <div
          key={variant}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h4
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "capitalize",
            }}>
            {variant}
          </h4>
          <div style={{ display: "flex", gap: "24px" }}>
            {(["small", "medium", "large"] as const).map((size) => (
              <div
                key={size}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "center",
                }}>
                <Toggle
                  variant={variant}
                  size={size}
                  defaultChecked
                  aria-label={`${variant} ${size} 토글`}
                />
                <span style={{ fontSize: "12px", color: "#666" }}>{size}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 variant와 size 조합을 한 번에 확인할 수 있습니다.",
      },
    },
  },
};
