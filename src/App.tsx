import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "ton-core";

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

  return (
    <div>
      <TonConnectButton />
      <div className="container">
        <div>
          <h3>Contract Data:</h3>
          <b>Our contract Address:</b>
          <div className="Hint">{contract_address}</div>
          <hr />
          <b>Our contract Owner:</b>
          <div className="Hint">{owner_address?.toString()}</div>
          <hr />
          <hr />
          <b>Баланс нашего контракта:</b>
          <div className="Hint">
            {(() => {
              if (contract_balance == null) return 'Загрузка...';
              if (typeof contract_balance === 'bigint') return fromNano(contract_balance).toString();
              if (typeof contract_balance === 'string') return contract_balance;
              return 'Неизвестный формат баланса';
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
        <div>
          <h3>Contract actions: </h3>
          {connected ? (
            <>
              <p>Increment contract balance by 5, with 0.05 TON as a commission</p>
              <button onClick={sendIncrement}>Increment</button>
              <hr />
              <p>Deposit 1 TON to contract balance</p>
              <button onClick={sendDeposit}>Deposit</button>
              <hr />
              <p>Withdraw 0.2 TON from contract balance</p>
              <button onClick={sendWithdrawal}>Withdraw</button>
              <hr />
            </>
          ) : (
            <p>Connect wallet to start action</p>
          )}
        </div>
        <div>
          <a
            href="https://testnet.tonscan.org/address/EQDAbnsqALKAoQO5uS1qOI8X7OhkeDnv3hZiqg2VAqhPa6xN"
            target="_blank"
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