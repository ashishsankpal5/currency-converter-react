import React, { useState, useEffect } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import "./style.css";

const Converter = () => {
  const [cryptoOptions, setCryptoOptions] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [amount, setAmount] = useState(1);
  const [targetCurrency, setTargetCurrency] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/list"
        );
        setCryptoOptions(response.data);
      } catch (error) {
        console.error("Error fetching crypto options:", error);
      }
    };

    fetchData();
  }, []);

  const handleConvert = async () => {
    try {
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />;
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto}&vs_currencies=${targetCurrency}`
      );
      console.log("DATA-->", response.data[selectedCrypto][targetCurrency]);
      const datas = response.data[selectedCrypto][targetCurrency];
      console.log("sam-->", datas);
      const convertedUSD = convertToUSD(
        amount,
        response.data[selectedCrypto][targetCurrency]
      );
      console.log("convs->", convertedUSD);
      setConvertedAmount(convertedUSD);
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  const convertToUSD = (cryptoAmt, exchangeRate) => {
    // debugger;
    return cryptoAmt * exchangeRate;
  };

  const handleInputChange = (event) => {
    setTargetCurrency(event.target.value);
    setConvertedAmount("");
  };

  return (
    <div className="crypto-converter-container">
      <h1 className="headerclass">Crypto Converter</h1>
      <div className="input-container">
        <label>
          Select Cryptocurrency:
          <select
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
          >
            {cryptoOptions.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Crypto Currency Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <div className="m-both">
        <label>
          Convert to:
          <select value={targetCurrency} onChange={(e) => handleInputChange(e)}>
            <option value="usd">usd</option>
            <option value="eur">eur</option>
          </select>
        </label>
      </div>
      {/* <div className="center"> */}
        <button onClick={handleConvert}>Convert</button>
      {/* </div> */}
      {convertedAmount && (
        <p className="result-container">
          Converted Amount: {convertedAmount}{" "}
          {targetCurrency === "usd" ? "USD" : "EUR"}
        </p>
      )}
    </div>
  );
};

export default Converter;
