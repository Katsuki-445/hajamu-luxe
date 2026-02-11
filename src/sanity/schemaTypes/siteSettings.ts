import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      description: 'The phone number for WhatsApp inquiries (e.g., 0547954702).',
      type: 'string',
      initialValue: '0547954702',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'WhatsApp Pre-filled Message',
      description: 'The optional message that appears when a user clicks the WhatsApp link.',
      type: 'text',
      initialValue: 'Hello Hajamu Luxe, I have a question about my order.',
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
