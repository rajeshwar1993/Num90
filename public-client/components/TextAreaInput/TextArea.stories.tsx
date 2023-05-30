import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextArea from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/TextArea',
  component: TextArea,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof TextArea>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextArea> = args => (
  <TextArea {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  id: 'TextArea',
  label: 'Simple TextArea',
  name: 'ch'
};

export const WithDescription = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithDescription.args = {
  id: 'TextArea',
  label: 'Simple TextArea',
  name: 'ch',
  description:
    'This is a little description about the functionality of this checkbox. This is a little description about the functionality of this checkbox.'
};

export const WithError = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithError.args = {
  id: 'TextArea',
  label: 'Simple TextArea',
  name: 'ch',
  errorMessage:
    'This is a small error message about the functionality of this checkbox.'
};
