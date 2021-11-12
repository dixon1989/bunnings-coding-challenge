export interface Barcode {
  SupplierID: string;
  SKU: string;
  Barcode: string;
}

export interface Catalog {
  SKU: string;
  Description: string;
}

export interface Supplier {
  ID: string;
  Name: string;
}

export interface ProductList {
  SKU: string;
  Description: string;
  SupplierID: string;
  SupplierName?: string;
  Barcode: string[];
}

export interface OutputList {
  SKU: string;
  Description: string;
  Source: string;
}
