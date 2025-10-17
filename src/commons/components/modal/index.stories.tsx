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
          "재사용 가능한 Modal 컴포넌트입니다. 다양한 variant, actions, theme을 지원합니다.",
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
        type: { summary: "info | danger" },
        defaultValue: { summary: "info" },
      },
    },
    actions: {
      control: { type: "select" },
      options: ["single", "dual"],
      description: "모달의 액션 타입",
      table: {
        type: { summary: "single | dual" },
        defaultValue: { summary: "single" },
      },
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
      description: "모달의 테마",
      table: {
        type: { summary: "light | dark" },
        defaultValue: { summary: "light" },
      },
    },
    title: {
      control: { type: "text" },
      description: "모달 제목",
      table: {
        type: { summary: "string" },
      },
    },
    description: {
      control: { type: "text" },
      description: "모달 설명",
      table: {
        type: { summary: "string" },
      },
    },
    isOpen: {
      control: { type: "boolean" },
      description: "모달 열림 여부",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    primaryAction: {
      control: false,
      description: "단일 액션 버튼 (actions: 'single'일 때 사용)",
      table: {
        type: { summary: "ModalAction" },
      },
    },
    cancelAction: {
      control: false,
      description: "취소 버튼 (actions: 'dual'일 때 사용)",
      table: {
        type: { summary: "ModalAction" },
      },
    },
    confirmAction: {
      control: false,
      description: "확인 버튼 (actions: 'dual'일 때 사용)",
      table: {
        type: { summary: "ModalAction" },
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
    title: "일기 등록 완료",
    description: "등록이 완료 되었습니다.",
    primaryAction: {
      label: "확인",
      onClick: () => console.log("확인 클릭"),
    },
  },
};

// ============================================
// Variant Stories
// ============================================

export const Info: Story = {
  args: {
    variant: "info",
    title: "일기 등록 완료",
    description: "등록이 완료 되었습니다.",
    primaryAction: {
      label: "확인",
      onClick: () => console.log("확인 클릭"),
    },
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    title: "일기 삭제",
    description: "정말로 삭제하시겠습니까?",
    primaryAction: {
      label: "삭제",
      onClick: () => console.log("삭제 클릭"),
    },
  },
};

// ============================================
// Actions Stories
// ============================================

export const SingleAction: Story = {
  args: {
    variant: "info",
    actions: "single",
    title: "일기 등록 완료",
    description: "등록이 완료 되었습니다.",
    primaryAction: {
      label: "확인",
      onClick: () => console.log("확인 클릭"),
    },
  },
};

export const DualActions: Story = {
  args: {
    variant: "info",
    actions: "dual",
    title: "일기 등록 취소",
    description: "일기 등록을 취소 하시겠어요?",
    cancelAction: {
      label: "계속 작성",
      onClick: () => console.log("계속 작성 클릭"),
    },
    confirmAction: {
      label: "등록 취소",
      onClick: () => console.log("등록 취소 클릭"),
    },
  },
};

// ============================================
// Theme Stories
// ============================================

export const Light: Story = {
  args: {
    theme: "light",
    title: "일기 등록 완료",
    description: "등록이 완료 되었습니다.",
    primaryAction: {
      label: "확인",
      onClick: () => console.log("확인 클릭"),
    },
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const Dark: Story = {
  args: {
    theme: "dark",
    title: "일기 등록 완료",
    description: "등록이 완료 되었습니다.",
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
// Combination Stories
// ============================================

export const InfoSingleAction: Story = {
  args: {
    variant: "info",
    actions: "single",
    title: "일기 등록 완료",
    description: "등록이 완료 되었습니다.",
    primaryAction: {
      label: "확인",
      onClick: () => console.log("확인 클릭"),
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Info variant에 단일 액션 버튼이 있는 모달입니다.",
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
        story: "Info variant에 두 개의 액션 버튼이 있는 모달입니다.",
      },
    },
  },
};

export const DangerSingleAction: Story = {
  args: {
    variant: "danger",
    actions: "single",
    title: "일기 삭제 완료",
    description: "일기가 삭제되었습니다.",
    primaryAction: {
      label: "확인",
      onClick: () => console.log("확인 클릭"),
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Danger variant에 단일 액션 버튼이 있는 모달입니다.",
      },
    },
  },
};

export const DangerDualActions: Story = {
  args: {
    variant: "danger",
    actions: "dual",
    title: "일기 삭제",
    description: "정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
    cancelAction: {
      label: "취소",
      onClick: () => console.log("취소 클릭"),
    },
    confirmAction: {
      label: "삭제",
      onClick: () => console.log("삭제 클릭"),
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Danger variant에 두 개의 액션 버튼이 있는 모달입니다.",
      },
    },
  },
};

// ============================================
// Comparison Stories
// ============================================

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "24px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}>
        <h3 style={{ margin: 0, fontSize: "14px", fontWeight: "600" }}>
          Light Theme
        </h3>
        <Modal
          theme="light"
          variant="info"
          actions="single"
          title="일기 등록 완료"
          description="등록이 완료 되었습니다."
          primaryAction={{
            label: "확인",
            onClick: () => console.log("확인 클릭"),
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "24px",
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
          actions="single"
          title="일기 등록 완료"
          description="등록이 완료 되었습니다."
          primaryAction={{
            label: "확인",
            onClick: () => console.log("확인 클릭"),
          }}
        />
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

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "24px",
      }}>
      <div>
        <h3
          style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>
          Info Variant
        </h3>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <Modal
            variant="info"
            actions="single"
            title="일기 등록 완료"
            description="등록이 완료 되었습니다."
            primaryAction={{
              label: "확인",
              onClick: () => console.log("확인 클릭"),
            }}
          />
          <Modal
            variant="info"
            actions="dual"
            title="일기 등록 취소"
            description="일기 등록을 취소 하시겠어요?"
            cancelAction={{
              label: "계속 작성",
              onClick: () => console.log("계속 작성 클릭"),
            }}
            confirmAction={{
              label: "등록 취소",
              onClick: () => console.log("등록 취소 클릭"),
            }}
          />
        </div>
      </div>
      <div>
        <h3
          style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600" }}>
          Danger Variant
        </h3>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <Modal
            variant="danger"
            actions="single"
            title="일기 삭제 완료"
            description="일기가 삭제되었습니다."
            primaryAction={{
              label: "확인",
              onClick: () => console.log("확인 클릭"),
            }}
          />
          <Modal
            variant="danger"
            actions="dual"
            title="일기 삭제"
            description="정말로 삭제하시겠습니까?"
            cancelAction={{
              label: "취소",
              onClick: () => console.log("취소 클릭"),
            }}
            confirmAction={{
              label: "삭제",
              onClick: () => console.log("삭제 클릭"),
            }}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "모든 variant와 actions 조합을 한 번에 보여주는 스토리입니다.",
      },
    },
  },
};

// ============================================
// Interactive Stories
// ============================================

export const Interactive: Story = {
  args: {
    variant: "info",
    actions: "dual",
    title: "일기 저장",
    description: "작성한 일기를 저장하시겠습니까?",
    cancelAction: {
      label: "취소",
      onClick: () => alert("취소 버튼이 클릭되었습니다!"),
    },
    confirmAction: {
      label: "저장",
      onClick: () => alert("저장 버튼이 클릭되었습니다!"),
    },
  },
  parameters: {
    docs: {
      description: {
        story: "클릭 이벤트가 있는 인터랙티브 모달입니다.",
      },
    },
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
      onClick: () => console.log("확인 클릭"),
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
