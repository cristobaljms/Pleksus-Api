export interface IOrder extends Document {
  businessType: string;
  propertyType: string;
  direction: string;
  maxPrice: string;
  rooms: string;
  description: string;
  userId: string;
}
