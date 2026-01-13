import * as z from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.string().optional(),
  description: z.string().optional(),
  sku: z.string().optional(),
  collection: z.string().optional(),
});
