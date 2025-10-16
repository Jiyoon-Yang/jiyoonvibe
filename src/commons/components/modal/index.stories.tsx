import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Modal } from "./index";

const meta: Meta<typeof Modal> = {
  title: "Commons/Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "재사용 가능한 Modal 컴포넌트입니다. 다양한 variant, actions, theme을 지원하며 모달 대화상자를 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "danger"],
      description: "모달의 스타일 variant",
      table: {
        defaultValue: { summary: "info" },
      },
    },
    actions: {
      control: { type: "select" },
      options: ["single", "dual"],
      description: "액션 버튼 개수",
      table: {
        defaultValue: { summary: "single" },
      },
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
      description: "모달의 테마",
      table: {
        defaultValue: { summary: "light" },
      },
    },
    title: {
      control: { type: "text" },
      description: "모달 제목",
    },
    description: {
      control: { type: "text" },
      description: "모달 설명",
    },
    isOpen: {
      control: { type: "boolean" },
      description: "모달 표시 여부",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Basic Stories
// ============================================

export const Default: Story = {
  args: {
    title: "알림",
    description: "기본 모달입니다.",
    isOpen: true,
    primaryAction: {
      label: "확인",
      onClick: () => console.log("확인 클릭"),
    },
  },
};

// ============================================
// Variant & Actions Stories
// ============================================

export const InfoSingleAction: Story = {
  args: {
    variant: "info",
    actions: "single",
    title: "일기 등록 완료",
    description: "등록이 완료 되었습니다.",
    isOpen: true,
    primaryAction: {
      label: "확인",
      onClick: () => console.log("확인 클릭"),
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Single action 모달 - Figma 노드 3:1046 참조",
      },
    },
  },
};

export const InfoDualActions: Story = {
  args: {
    variant: "info",
    actions: "dual",
    title: "일기 등록 취소",
    description: "일기 등록을 취소 하시겠어요?",
    isOpen: true,
    cancelAction: {
      label: "계속 작성",
      onClick: () => console.log("계속 작성 클릭"),
    },
    confirmAction: {
      label: "등록 취소",
      onClick: () => console.log("등록 취소 클릭"),
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dual actions 모달 - Figma 노드 3:670 참조 (버튼 각 104px 고정, 간격 21px)",
      },
    },
  },
};

export const DangerSingleAction: Story = {
  args: {
    variant: "danger",
    actions: "single",
    title: "삭제 완료",
    description: "데이터가 삭제되었습니다.",
    isOpen: true,
    primaryAction: {
      label: "확인",
      onClick: () => console.log("확인 클릭"),
    },
  },
};

export const DangerDualActions: Story = {
  args: {
    variant: "danger",
    actions: "dual",
    title: "삭제 확인",
    description: "정말로 삭제하시겠습니까?",
    isOpen: true,
    cancelAction: {
      label: "취소",
      onClick: () => console.log("취소 클릭"),
    },
    confirmAction: {
      label: "삭제",
      onClick: () => console.log("삭제 클릭"),
    },
  },
};

// ============================================
// Theme Stories
// ============================================

export const LightTheme: Story = {
  args: {
    theme: "light",
    title: "Light 테마",
    description: "밝은 테마의 모달입니다.",
    isOpen: true,
    primaryAction: {
      label: "확인",
      onClick: () => console.log("확인 클릭"),
    },
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: "dark",
    title: "Dark 테마",
    description: "어두운 테마의 모달입니다.",
    isOpen: true,
    primaryAction: {
      label: "확인",
      onClick: () => console.log("확인 클릭"),
    },
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// ============================================
// Interactive Stories
// ============================================

export const Interactive: Story = {
  args: {
    variant: "info",
    actions: "dual",
    title: "저장 확인",
    description: "변경사항을 저장하시겠습니까?",
    isOpen: true,
    cancelAction: {
      label: "취소",
      onClick: () => alert("취소 클릭됨"),
    },
    confirmAction: {
      label: "저장",
      onClick: () => alert("저장 클릭됨"),
    },
  },
};

export const WithCustomButtonLabels: Story = {
  args: {
    variant: "info",
    actions: "dual",
    title: "커스텀 버튼",
    description: "버튼 텍스트를 자유롭게 설정할 수 있습니다.",
    isOpen: true,
    cancelAction: {
      label: "아니오",
      onClick: () => console.log("아니오 클릭"),
    },
    confirmAction: {
      label: "예",
      onClick: () => console.log("예 클릭"),
    },
  },
};

// ============================================
// Use Case Stories
// ============================================

export const SuccessNotification: Story = {
  args: {
    variant: "info",
    actions: "single",
    title: "성공",
    description: "작업이 성공적으로 완료되었습니다.",
    isOpen: true,
    primaryAction: {
      label: "확인",
      onClick: () => console.log("확인"),
    },
  },
};

export const ConfirmDelete: Story = {
  args: {
    variant: "danger",
    actions: "dual",
    title: "삭제 확인",
    description: "이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?",
    isOpen: true,
    cancelAction: {
      label: "취소",
      onClick: () => console.log("취소"),
    },
    confirmAction: {
      label: "삭제",
      onClick: () => console.log("삭제"),
    },
  },
};

export const SaveChanges: Story = {
  args: {
    variant: "info",
    actions: "dual",
    title: "변경사항 저장",
    description: "저장하지 않은 변경사항이 있습니다. 저장하시겠습니까?",
    isOpen: true,
    cancelAction: {
      label: "저장 안함",
      onClick: () => console.log("저장 안함"),
    },
    confirmAction: {
      label: "저장",
      onClick: () => console.log("저장"),
    },
  },
};

export const LogoutConfirmation: Story = {
  args: {
    variant: "info",
    actions: "dual",
    title: "로그아웃",
    description: "정말로 로그아웃 하시겠습니까?",
    isOpen: true,
    cancelAction: {
      label: "취소",
      onClick: () => console.log("취소"),
    },
    confirmAction: {
      label: "로그아웃",
      onClick: () => console.log("로그아웃"),
    },
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
          Info - Single Action
        </h3>
        <Modal
          variant="info"
          actions="single"
          title="일기 등록 완료"
          description="등록이 완료 되었습니다."
          isOpen={true}
          primaryAction={{
            label: "확인",
            onClick: () => console.log("확인"),
          }}
        />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3
          style={{
            marginBottom: "1rem",
            fontSize: "1.2rem",
            fontWeight: "600",
          }}>
          Info - Dual Actions
        </h3>
        <Modal
          variant="info"
          actions="dual"
          title="일기 등록 취소"
          description="일기 등록을 취소 하시겠어요?"
          isOpen={true}
          cancelAction={{
            label: "계속 작성",
            onClick: () => console.log("계속 작성"),
          }}
          confirmAction={{
            label: "등록 취소",
            onClick: () => console.log("등록 취소"),
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
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
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}>
        <h3 style={{ margin: 0, fontSize: "14px", fontWeight: "600" }}>
          Light Theme
        </h3>
        <Modal
          theme="light"
          variant="info"
          actions="dual"
          title="Light 테마"
          description="밝은 테마의 모달입니다."
          isOpen={true}
          cancelAction={{
            label: "취소",
            onClick: () => console.log("취소"),
          }}
          confirmAction={{
            label: "확인",
            onClick: () => console.log("확인"),
          }}
        />
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
        <Modal
          theme="dark"
          variant="info"
          actions="dual"
          title="Dark 테마"
          description="어두운 테마의 모달입니다."
          isOpen={true}
          cancelAction={{
            label: "취소",
            onClick: () => console.log("취소"),
          }}
          confirmAction={{
            label: "확인",
            onClick: () => console.log("확인"),
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

// ============================================
// Playground
// ============================================

export const Playground: Story = {
  args: {
    variant: "info",
    actions: "single",
    theme: "light",
    title: "모달 제목",
    description: "모달 설명입니다.",
    isOpen: true,
    primaryAction: {
      label: "확인",
      onClick: () => console.log("확인"),
    },
  },
  parameters: {
    docs: {
      description: {
        story: "모든 props를 자유롭게 조합해볼 수 있는 Playground입니다.",
      },
    },
  },
};
