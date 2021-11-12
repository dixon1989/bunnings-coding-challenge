import Papa from "papaparse";

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
  const barcode = await getData(value === "A" ? barcodesA : barcodesB);
  const catalog = await getData(value === "A" ? catalogA : catalogB);
  const supplier = await getData(value === "A" ? supplierA : supplierB);
  let filterOverallArray: any = [];
  catalog.forEach((catalog: any) => {
    let result = barcode.filter((item: any) => {
      return item.SKU === catalog.SKU;
    });
    result.forEach((barcode: any) => {
      const filterSKUIndex: number = filterOverallArray.length
        ? filterOverallArray.findIndex((item: any) => item.SKU === catalog.SKU)
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

  filterOverallArray.forEach((item: any) => {
    let result: any = supplier.filter((supplier: any) => {
      return supplier.ID === item.SupplierID;
    });
    item.SupplierName = result[0] !== undefined ? result[0].Name : null;
  });

  return filterOverallArray;
};

export const mergeData = async () => {
  const companyAData = await fetchData("A");
  const companyBData = await fetchData("B");

  let filterFinalArray: any = [];

  companyAData.forEach((itemA: any) => {
    let result: any = companyBData.filter((itemB: any) => {
      return itemB.Description.includes(itemA.Description);
    });
    let existBarCode = result[0].Barcode.some(
      (element: any) => itemA.Barcode.indexOf(element) > -1
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
  console.log("ssssssssssss", filterFinalArray);
  return filterFinalArray;
};
