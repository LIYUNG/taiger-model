import { Schema } from 'mongoose';

export interface IKeywordsetKeywords {
  zh?: string[];
  en?: string[];
}

export interface IKeywordset {
  categoryName?: string;
  description?: string;
  keywords?: IKeywordsetKeywords;
  antiKeywords?: IKeywordsetKeywords;
}

export const keywordSetSchema = new Schema<IKeywordset>(
  {
    categoryName: {
      type: String
    },
    description: {
      type: String,
      default: '',
      validate: {
        validator: function (value: string | unknown[]) {
          // Maximum allowed length
          return value.length <= 3000;
        },
        message:
          'Description exceeds the maximum allowed length of 3000 characters'
      }
    },
    keywords: {
      zh: [
        {
          type: String,
          default: ''
        }
      ],
      en: [
        {
          type: String,
          default: ''
        }
      ]
    },
    antiKeywords: {
      zh: [
        {
          type: String,
          default: ''
        }
      ],
      en: [
        {
          type: String,
          default: ''
        }
      ]
    }
  },
  { timestamps: true }
);
