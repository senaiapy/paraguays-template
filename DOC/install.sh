#!/bin/bash

sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
cp src/config.sample.js config.js

yarn
yarn start
yarn android

#place de keys
CONFIG.COINGRIG_KEY = '';
CONFIG.COVALENT_KEY = '';
CONFIG.OPENSEA_KEY = '';
CONFIG.ONESIGNAL_KEY = '';
CONFIG.FEE_RECIPIENT = '';
CONFIG.ONESIGNAL_KEY = '';

react-native-rename  "universal-wallet" -b com.universal.symma 

nvm alias default 16
yarn
yarn echo
npx pod-install
yarn ios

# COINMARKETCAP VALUE
curl -H "X-CMC_PRO_API_KEY: 83b044c0-9bcb-4d5d-8021-3fe0bb767661" -H "Accept: application/json" -d "start=1&limit=5000&convert=USD" -G https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
curl -H "X-CMC_PRO_API_KEY: 83b044c0-9bcb-4d5d-8021-3fe0bb767661" -H "Accept: application/json" -d "start=1&limit=5000&convert=USD" -G https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/map
https://api.pancakeswap.info/api/v2/tokens/0xf37cac4783a343d6258ddd52aa4e2566c0cbe25a
# get qprice
curl https://api.covalenthq.com/v1/56/address/0xf37cac4783a343d6258ddd52aa4e2566c0cbe25a/balances_v2/\?\&key\=ckey_277ca138817d465f891a27a897a
'https://api.covalenthq.com/v1/56/address/0xf37cac4783a343d6258ddd52aa4e2566c0cbe25a/balances_v2/?&key=ckey_277ca138817d465f891a27a897a'

{
	"data": {
		"address": "0xf37cac4783a343d6258ddd52aa4e2566c0cbe25a",
		"updated_at": "2022-10-08T21:07:26.688275439Z",
		"next_update_at": "2022-10-08T21:12:26.688275650Z",
		"quote_currency": "USD",
		"chain_id": 56,
		"items": [
			{
				"contract_decimals": 18,
				"contract_name": "Elgos Company Token",
				"contract_ticker_symbol": "ELGOS",
				"contract_address": "0xf37cac4783a343d6258ddd52aa4e2566c0cbe25a",
				"supports_erc": [
					"erc20"
				],
				"logo_url": "https://logos.covalenthq.com/tokens/56/0xf37cac4783a343d6258ddd52aa4e2566c0cbe25a.png",
				"last_transferred_at": "2022-07-05T22:34:47Z",
				"native_token": false,
				"type": "cryptocurrency",
				"balance": "200000000000000000000",
				"balance_24h": "200000000000000000000",
				"quote_rate": 35.11602,
				"quote_rate_24h": null,
				"quote": 7023.204,
				"quote_24h": null,
				"nft_data": null
			},
			{
				"contract_decimals": 18,
				"contract_name": "Binance Coin",
				"contract_ticker_symbol": "BNB",
				"contract_address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
				"supports_erc": null,
				"logo_url": "https://www.covalenthq.com/static/images/icons/display-icons/binance-coin-bnb-logo.png",
				"last_transferred_at": null,
				"native_token": true,
				"type": "dust",
				"balance": "0",
				"balance_24h": "0",
				"quote_rate": 280.86465,
				"quote_rate_24h": null,
				"quote": 0.0,
				"quote_24h": null,
				"nft_data": null
			}
		],
		"pagination": null
	},
	"error": false,
	"error_message": null,
	"error_code": null
}
