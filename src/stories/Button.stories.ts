import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../components/Button"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "UI Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "primary",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
}

// export const Secondary: Story = {
//   args: {
//     label: "Button",
//   },
// }

// export const Large: Story = {
//   args: {
//     size: "large",
//     label: "Button",
//   },
// }

// export const Small: Story = {
//   args: {
//     size: "small",
//     label: "Button",
//   },
// }
