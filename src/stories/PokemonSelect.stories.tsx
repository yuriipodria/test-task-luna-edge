import { Meta, StoryObj } from "@storybook/react";
import { PokemonSelect } from "../components/PokemonSelect";
import { useForm } from "react-hook-form";
import { FormFields } from "../types/FormFields";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof PokemonSelect>;

export default {
  title: "Pokemon Select",
  component: PokemonSelect,
  argTypes: {
    heightClass: {
      control: { type: "select" },
      options: ["h-6", "h-8", "h-12"],
      description: "Height of the select dropdown (Tailwind classes)",
    },
    widthClass: {
      control: { type: "select" },
      options: ["w-full", "w-1/2", "w-1/3"],
      description: "Width of the select dropdown (Tailwind classes)",
    },
  },
} as Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

const Template: Story = {
  render: (args) => {
    const { control } = useForm<FormFields>();
    return <PokemonSelect {...args} control={control} />;
  },
};

export const Default: Story = {
  ...Template,
  args: {
    heightClass: "h-8",
    widthClass: "w-full",
  },
};

export const Short: Story = {
  ...Template,
  args: { heightClass: "h-6" },
};

export const Tall: Story = {
  ...Template,
  args: { heightClass: "h-12" },
};

export const HalfWidth: Story = {
  ...Template,
  args: { widthClass: "w-1/2" },
};

export const ThirdWidth: Story = {
  ...Template,
  args: { widthClass: "w-1/3" },
};

export const samplePokemons: Story = {
  ...Template,
  args: {
    selectedPokemons: [
      { name: "Pikachu", url: "" },
      { name: "Bulbasaur", url: "" },
    ],
  },
};
