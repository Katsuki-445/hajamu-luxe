import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'receiptSettings',
  title: 'Receipt Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'useDefaults',
      title: 'Reset to Defaults',
      description: 'Switch this ON to ignore all custom settings below and revert to the original HAJAMU LUXE branding.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      initialValue: 'HAJAMU LUXE',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Authentic African Luxury',
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      initialValue: 'https://hajamuluxe.com',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Support Email',
      type: 'string', // using string instead of email to allow "Name <email>" format if needed, but email type is safer
      initialValue: 'basitlimann@yahoo.com',
    }),
    defineField({
        name: 'logo',
        title: 'Receipt Logo',
        type: 'image',
        options: {
          hotspot: true,
        },
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'text',
      initialValue: 'Thank you for choosing HAJAMU LUXE. Weaving Heritage Into Modern Luxury.',
    }),
  ],
  preview: {
    select: {
      title: 'brandName',
    },
    prepare({ title }) {
      return {
        title: title || 'Receipt Settings',
        subtitle: 'Configuration',
      }
    },
  },
})
