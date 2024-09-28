import {IImage} from "../categories/categories.component";

export interface ITypes {
  affordability_note: string;
  buyback_options: string;
  cashback: number;
  cashback_note: number;
  display: number;
  emi_options: string;
  offers: string;
  related_products: IRelatedProduct[];
  type_options: ITypeOptions[];
  type_products: ITypeProduct[];
  types_badge: string;
  types_description: string;
  types_enabled: number;
  types_id: number;
  types_images: IImage[];
  types_meta: string;
  types_name: string;
  types_related_products: any[];
  types_related_types: any[];
  types_route_id: number;
  types_seo_title: string;
  types_slug: string;
}

export interface ITypeProduct {
  affordability: number;
  allow_rating: number;
  average_rating: number;
  description: string;
  dimension: IDimension;
  effective_price: number;
  enabled: number;
  excerpt: string;
  fixed_quantity: number;
  free_shipping: number;
  hsn_code: string;
  id: number;
  images: IImage[];
  meta: string;
  name: string;
  option_pincodes: string;
  price: number;
  product_code: string;
  quantity: number;
  related_products: string;
  route_id: number;
  saleprice: number;
  seo_title: string;
  shippable: number;
  show_rating: number;
  sku: string;
  slug: string;
  tag: number;
  taxable: number;
  track_stock: number;
}

export class SelectedProduct implements ISelectedProduct{
  affordability!: number;
  affordability_note!: string;
  allow_rating!: number;
  average_rating!: number;
  buyback_options!: string;
  cashback!: number;
  cashback_note!: string;
  description!: string;
  dimension!: IDimension;
  discount!: number;
  display!: number;
  effective_price!:number;
  emi_options!: string;
  enabled!: number;
  excerpt!: string;
  fixed_quantity!: number;
  free_shipping!: number;
  hsn_code!: string;
  id!: number;
  images!: IImage[];
  meta!: string;
  name!: string;
  offers!: string;
  option_pincodes!: string;
  price!: number;
  product_code!: string;
  quantity!: number;
  related_products!: string;
  route_id!: number;
  saleprice!: number;
  seo_title!: string;
  shippable!: number;
  show_rating!: number;
  sku!: string;
  slug!: string;
  tag!: number;
  taxable!: number;
  track_stock!: number;
  types_badge!: string;
  types_description!: string;
  types_enabled!: number;
  types_id!: number;
  types_images!: IImage[];
  types_meta!: string;
  types_name!: string;
  types_related_products!: any[];
  types_related_types!: any[];
  types_route_id!: number;
  types_seo_title!: string;
  types_slug!: string;
  wishlist!: boolean
}
export interface ISelectedProduct {
  affordability: number;
  affordability_note: string;
  allow_rating: number;
  average_rating: number;
  buyback_options: string;
  cashback: number;
  cashback_note: string;
  description: string;
  dimension: IDimension;
  discount: number;
  display: number;
  effective_price:number;
  emi_options: string;
  enabled: number;
  excerpt: string;
  fixed_quantity: number;
  free_shipping: number;
  hsn_code: string;
  id: number;
  images: IImage[];
  meta: string;
  name: string;
  offers: string;
  option_pincodes: string;
  price: number;
  product_code: string;
  quantity: number;
  related_products: string;
  route_id: number;
  saleprice: number;
  seo_title: string;
  shippable: number;
  show_rating: number;
  sku: string;
  slug: string;
  tag: number;
  taxable: number;
  track_stock: number;
  types_badge: string;
  types_description: string;
  types_enabled: number;
  types_id: number;
  types_images: IImage[];
  types_meta: string;
  types_name: string;
  types_related_products: any[];
  types_related_types: any[];
  types_route_id: number;
  types_seo_title: string;
  types_slug: string;
  wishlist: boolean
}

export interface IRelatedProduct {
  affordability: number;
  allow_rating: number;
  average_rating: number;
  description: string;
  dimension: IDimension;
  discount: number;
  effective_price: number;
  enabled: number;
  excerpt: string;
  fixed_quantity: number;
  free_shipping: number;
  hsn_code: string;
  id: number;
  images: IImage;
  meta: string;
  name: string;
  option_pincodes: string;
  price: number;
  product_code: string;
  quantity: number;
  related_products: string;
  route_id: number;
  saleprice: number;
  seo_title: string;
  shippable: number;
  show_rating: number;
  sku: string;
  slug: string;
  tag: string;
  taxable: number;
  track_stock: number;
}

export interface ITypeOptions {
  id: number;
  name: string;
  option_values: IOptionValues[];
  required: number;
  sequence: number;
  type: string;
  type_id: number;
}

export interface IOptionValues {
  color: string;
  id: number;
  limit: number;
  name: string;
  option_id: number;
  sequence: number;
  value: string;
}

export interface IDimension {
  weight: string;
  length: string;
  width: string;
  breadth: string;
}
