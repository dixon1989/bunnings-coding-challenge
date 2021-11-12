import * as React from "react";
import { mergeData } from "../utils";
import { OutputList } from "../types";
import Result from "../components/Result";

const Home: React.FC = () => {
  const [outputData, setOutputData] = React.useState<
    OutputList[] | undefined
  >();
  React.useEffect(() => {
    // Should Start grabbing data from webServices API
    const load = async () => {
      setOutputData(await mergeData());
    };
    load();
  }, []);

  let output = outputData ? outputData : undefined;

  return (
    <>{outputData ? <Result results={output} /> : <p>No Results Found</p>}</>
  );
};

export default Home;
