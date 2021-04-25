import React, { useEffect, useState } from "react";
import getGreeterContract from './contracts/get_greeter_contract';

function App() {
  const [greeter, setGreeter] = useState(undefined);

  useEffect(() => {

    (async () => {
      const { greeter } = await getGreeterContract();
      setGreeter(greeter);
      console.log(greeter);
    })();

  }, []);

  return (

    <div>
      { greeter === undefined &&
        <div className="App">Loading</div>
      }

      { greeter != null &&
        <div className="App">Loaded</div>
      }
    </div>

  );
}

export default App;
