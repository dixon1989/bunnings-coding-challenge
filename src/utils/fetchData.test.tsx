import axios from "axios";
import { fetchData, mergeData } from "./fetchData";
import {
  barcodeDataA,
  barcodeDataB,
  catalogDataA,
  catalogDataB,
  supplierDataA,
  supplierDataB,
  dataA,
  dataB,
  finalResult
} from "./testData";

jest.mock("axios");

const barcodesA = `./input/barcodesA.csv`;
const catalogA = `./input/catalogA.csv`;
const supplierA = `./input/suppliersA.csv`;
const barcodesB = `./input/barcodesB.csv`;
const catalogB = `./input/catalogB.csv`;
const supplierB = `./input/suppliersB.csv`;

describe("Successfully read all csv input data on your public folder", () => {
  test("Making Sure Barcode A able to read file and is not missing", async () => {
    const request = { status: 200 };
    axios.get = jest.fn().mockResolvedValueOnce(request);
    const mock = await axios.get(barcodesA);
    expect(mock).toEqual(request);
  });
  test("Making Sure Barcode B able to read file and is not missing", async () => {
    const request = { status: 200 };
    axios.get = jest.fn().mockResolvedValueOnce(request);
    const mock = await axios.get(barcodesB);
    expect(mock).toEqual(request);
  });
  test("Making Sure Catalog A able to read file and is not missing", async () => {
    const request = { status: 200 };
    axios.get = jest.fn().mockResolvedValueOnce(request);
    const mock = await axios.get(catalogA);
    expect(mock).toEqual(request);
  });
  test("Making Sure Catalog B able to read file and is not missing", async () => {
    const request = { status: 200 };
    axios.get = jest.fn().mockResolvedValueOnce(request);
    const mock = await axios.get(catalogB);
    expect(mock).toEqual(request);
  });
  test("Making Sure Supplier A able to read file and is not missing", async () => {
    const request = { status: 200 };
    axios.get = jest.fn().mockResolvedValueOnce(request);
    const mock = await axios.get(supplierA);
    expect(mock).toEqual(request);
  });
  test("Making Sure Supplier B able to read file and is not missing", async () => {
    const request = { status: 200 };
    axios.get = jest.fn().mockResolvedValueOnce(request);
    const mock = await axios.get(supplierB);
    expect(mock).toEqual(request);
  });
});

describe("Making sure fetching all data successfully", () => {
  it("Should merge all barcode, catalog, supplier from company A data into a superset A", async () => {
    const expectedResults = dataA;
    const mock = await fetchData("", barcodeDataA, catalogDataA, supplierDataA);
    expect(mock).toEqual(expectedResults);
  });
  it("Should merge all barcode, catalog, supplier from company B data into a superset B", async () => {
    const expectedResults = dataB;
    const mock = await fetchData("", barcodeDataB, catalogDataB, supplierDataB);
    expect(mock).toEqual(expectedResults);
  });
});

describe("Making sure A and B data return the expected result from result output", () => {
    it("Should return the expected data", async () => {
      const expectedResults = finalResult;
      const mock = await mergeData(dataA, dataB);
      expect(mock).toEqual(expectedResults);
    });
  });
