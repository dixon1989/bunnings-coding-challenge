import Papa from "papaparse";
import { Barcode, Catalog, Supplier, ProductList, OutputList } from "../types";

const barcodesA = `./input/barcodesA.csv`;
const catalogA = `./input/catalogA.csv`;
const supplierA = `./input/suppliersA.csv`;
const barcodesB = `./input/barcodesB.csv`;
const catalogB = `./input/catalogB.csv`;
const supplierB = `./input/suppliersB.csv`;

export const getData = async (data: any) => {
  const response = (await fetch(data)) as any;
  const reader = response.body.getReader();
  const result = await reader.read(); // raw array
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value); // the csv text
  const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
  const rows = results.data; // array of objects
  return rows;
};

export const fetchData = async (value: string) => {
  const barcode = (await getData(
    value === "A" ? barcodesA : barcodesB
  )) as Barcode[];
  const catalog = (await getData(
    value === "A" ? catalogA : catalogB
  )) as Catalog[];
  const supplier = (await getData(
    value === "A" ? supplierA : supplierB
  )) as Supplier[];
  let filterOverallArray: ProductList[] = [];
  catalog.forEach((catalog: Catalog) => {
    let result = barcode.filter((item: Barcode) => {
      return item.SKU === catalog.SKU;
    });
    result.forEach((barcode: Barcode) => {
      const filterSKUIndex: number = filterOverallArray.length
        ? filterOverallArray.findIndex(
            (item: ProductList) => item.SKU === catalog.SKU
          )
        : -1;
      if (filterSKUIndex > -1) {
        filterOverallArray[filterSKUIndex].Barcode.push(barcode.Barcode);
      } else {
        catalog.SKU &&
          filterOverallArray.push({
            SKU: catalog.SKU,
            Description: catalog.Description,
            SupplierID: barcode.SupplierID,
            Barcode: [barcode.Barcode],
          });
      }
    });
  });

  filterOverallArray.forEach((item: ProductList) => {
    let result: any = supplier.filter((supplier: Supplier) => {
      return supplier.ID === item.SupplierID;
    });
    item.SupplierName = result[0] !== undefined ? result[0].Name : null;
  });

  return filterOverallArray;
};

export const mergeData = async () => {
  const companyAData = await fetchData("A");
  const companyBData = await fetchData("B");

  let filterFinalArray: OutputList[] = [];

  companyAData.forEach((itemA: ProductList) => {
    let result: any = companyBData.filter((itemB: ProductList) => {
      return itemB.Description.includes(itemA.Description);
    });
    let existBarCode = result[0].Barcode.some(
      (element: string) => itemA.Barcode.indexOf(element) > -1
    );
    existBarCode
      ? filterFinalArray.push({
          SKU: itemA.SKU,
          Description: itemA.Description,
          Source: "A",
        })
      : filterFinalArray.push(
          {
            SKU: result[0].SKU,
            Description: result[0].Description,
            Source: "B",
          },
          {
            SKU: itemA.SKU,
            Description: itemA.Description,
            Source: "A",
          }
        );
  });

  return filterFinalArray;
};
