import React, { useState } from "react";
import { GrTransaction } from "react-icons/gr";

export default function Component() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("inr");
  const [toCurrency, setToCurrency] = useState("djf");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [conversionPerformed, setConversionPerformed] = useState(false);

  const conversionRates = {
    usd: { eur: 0.93, inr: 83.02, djf: 178.07, usd: 1 },
    eur: { usd: 1.08, inr: 89.45, djf: 191.88, eur: 1 },
    inr: { usd: 0.012, eur: 0.011, djf: 2.14379, inr: 1 },
    djf: { usd: 0.0056, eur: 0.0052, inr: 0.47, djf: 1 },
  };

  const convert = () => {
    return amount * conversionRates[fromCurrency][toCurrency];
  };

  const handleConversion = () => {
    setConvertedAmount(convert());
    setConversionPerformed(true);
  };

  const handleReverseConversion = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  return (
    <div className="flex h-screen box-content w-screen flex-col items-center justify-center bg-gray-200 p-4">
      <div className="w-52 sm:w-2/4 h-5/6 sm:max-h-96 rounded-lg bg-white p-8 shadow-lg flex items-center justify-center flex-col">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-black mb-8  pacifico-regular">
          Currency converter
        </h1>
        <div className="mb-4 grid sm:grid-cols-4 grid-cols-1 gap-4">
          <div className="col-span-1">
            <label
              className="block text-sm font-semibold text-green-700"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              className="mt-1 w-28 bg-white border text-gray-800 border-gray-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="col-span-1">
            <label
              className="block text-sm font-semibold text-green-700"
              htmlFor="from"
            >
              From
            </label>
            <select
              className="mt-1 block  bg-white text-gray-800 border border-gray-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="from"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="inr">INR</option>
              <option value="djf">DJF</option>
            </select>
          </div>
          <div className="flex items-center justify-center p-0">
            <GrTransaction
              className="text-green-700 font-bold border-green-500 border rounded-full mb-5 bg-green-100 w-7 h-7 p-0 cursor-pointer"
              onClick={handleReverseConversion}
            />
          </div>
          <div className="col-span-1">
            <label
              className="block text-sm font-semibold text-green-700"
              htmlFor="to"
            >
              To
            </label>
            <select
              className="mt-1 block bg-white text-gray-800 border border-gray-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="to"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="djf">DJF</option>
              <option value="inr">INR</option>
            </select>
          </div>
          <div className="col-span-1 ">
            <button
              className="px-2 py-2 bg-green-700 border border-transparent rounded-md font-semibold text-white hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
              onClick={handleConversion}
            >
              Convert
            </button>
          </div>
        </div>
        <div className="text-center font-medium text-black flex ml-16 items-start justify-start self-start flex-col">
          <p className="my-3 font-bold">Converted Amount:</p>
          {conversionPerformed && (
            <p className="text-green-700 font-semibold my-3">
              {amount && convertedAmount !== null
                ? `${amount} ${fromCurrency.toUpperCase()} = ${
                    typeof convertedAmount === "number"
                      ? convertedAmount.toFixed(2)
                      : convertedAmount
                  } ${toCurrency.toUpperCase()}`
                : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
