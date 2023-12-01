import logo from './logo.svg';
import './App.css';

import * as wallet from '@marlowe.io/wallet';
import { mkRuntimeLifecycle } from '@marlowe.io/runtime-lifecycle/browser';

const installedWalletExtensions = wallet.getInstalledWalletExtensions();
console.log(installedWalletExtensions);

const walletName = installedWalletExtensions[0].name;
console.log(`Available Browser Wallet Extensions: ${walletName}`);
const runtimeURL = 'https://marlowe-runtime-preprod-web.demo.scdev.aws.iohkdev.io';

const runtimeLifecycle = await mkRuntimeLifecycle({
  walletName: walletName,
  runtimeURL: runtimeURL,
});

console.log('Connected to runtime...');

const userWallet = await wallet.mkBrowserWallet(walletName);
const lovelaces = await userWallet.getLovelaces();

console.log(`This user has ${lovelaces} Lovelace in their wallet`);


await runtimeLifecycle.contracts.createContract({
  contract: "close",
});

console.log(`Contract success!`);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
