import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "ton-core";
import WebApp from "@twa-dev/sdk";

function App() {
  const {
    contract_address,
    counter_value,
    recent_sender,
    owner_address,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawal,
  } = useMainContract();
  const { connected } = useTonConnect();

  const showAlert = () => {
    WebApp.showAlert("Hey there!");
  };

  return (
    <div>
      <TonConnectButton />
      <div className="container">
        <div className="Card">
          <h3>Contract Data:</h3>
          <b>{WebApp.platform}</b>
          <b>Our contract Address:</b>
          <div className="Hint">{contract_address?.slice(0, 30) + "..."}</div>
          <hr />
          <b>Our contract Owner:</b>
          <div className="Hint">{owner_address?.toString()}</div>
          <hr />
          <b>Our contract Balance:</b>
          <div className="Hint">
            {(() => {
              if (contract_balance == null) return 'Loading...';
              if (typeof contract_balance === 'bigint') return fromNano(contract_balance).toString();
              if (typeof contract_balance === 'string') return contract_balance;
              return 'Unknown balance format';
            })()}
          </div>
          <hr />
          {recent_sender && (
            <>
              <b>Recent sender:</b>
              <div className="Hint">{recent_sender.toString()}</div>
              <hr />
            </>
          )}
          <>
            <b>Counter Value:</b>
            <div>{counter_value ?? "Loading..."}</div>
          </>
        </div>
        <div className="Card">
          <h3>Contract actions: </h3>
          <a onClick={showAlert}>Show Alert</a>
          <hr />
          {connected ? (
            <>
              <p>Increment counter by1, with 0.05 TON as a commission</p>
              <a onClick={sendIncrement}>Increment by 1</a>
              <hr />
              <p>Deposit 1 TON to contract balance</p>
              <a onClick={sendDeposit}>Request deposit of 1 TON</a>
              <hr />
              <p>Withdraw 0.2 TON from contract balance</p>
              <a onClick={sendWithdrawal}>Request 0.2 TON withdrawal</a>
              <hr />
            </>
          ) : (
            <p>Connect wallet to start action</p>
          )}
        </div>
        <div>
          <a
            href="https://testnet.tonscan.org/address/EQA61oM8a0n9zb13HmDCflApbLrK4lMj8s8KITqDyzEyslfK"
            target="_blank"
            rel="noopener noreferrer"
          >
            explorer
          </a>
          <br />
        </div>
      </div>
    </div>
  );
}

export default App;