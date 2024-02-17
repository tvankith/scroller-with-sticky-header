import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Scroll } from "../components/index";
import "./style.css";

const meta: Meta<typeof Scroll> = {
  component: Scroll,
};

export default meta;
type Story = StoryObj<typeof Scroll>;

export const ScrollExample: Story = {
  args: {
    gap: "10px",
    className: "container",
    children: (
      <>
        <Scroll.Group>
          <Scroll.Title>Utrhoncus</Scroll.Title>
          <Scroll.Item>
            <div className="block1"></div>
          </Scroll.Item>
        </Scroll.Group>

        <Scroll.Group>
          <Scroll.Title>Nam feugiat</Scroll.Title>
          <Scroll.Item>
            <div className="block2"></div>
          </Scroll.Item>
          <Scroll.Item>
            <div className="block2"></div>
          </Scroll.Item>
        </Scroll.Group>

        <Scroll.Group>
          <Scroll.Title>Maecenas at purus</Scroll.Title>
          <Scroll.Item>
            <div className="block3"></div>
          </Scroll.Item>
          <Scroll.Item>
            <div className="block3"></div>
          </Scroll.Item>
          <Scroll.Item>
            <div className="block3"></div>
          </Scroll.Item>
          <Scroll.Item>
            <div className="block3"></div>
          </Scroll.Item>
        </Scroll.Group>
      </>
    ),
  },
};
