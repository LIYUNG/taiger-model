export const documentationsSchema = {
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  category: { type: String, default: '' },
  author: { type: String, default: '' },
  prop: { type: String, default: '' },
  text: { type: String, default: '' },
  country: { type: String, default: '' },
  updatedAt: Date
};
