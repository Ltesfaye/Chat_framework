from flask import Flask, jsonify, request
import requests
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
"""
    Helper Methods Used to Debug incoming requests:
        1)log_request_info:  prints out incoming server requests
        2) log_response_info: prints out server response

"""
# log incoming requests
@app.before_request
def log_request_info():
    print("\n=== Incoming Request ===")
    print(f"Method: {request.method}")
    print(f"Path: {request.path}")
    print(f"Headers: {dict(request.headers)}")
    print(f"Query Params: {request.args}\n")
    print("========================\n")

# log outgoing responses
@app.after_request
def log_response_info(response):
    print("\n=== Outgoing Response ===")
    print(f"Status: {response.status}")
    print(f"Response: {response.get_data(as_text=True)}")
    print("========================\n")
    return response



def get_quote_by_receiving_amount(from_token, to_token, to_amount, from_address="0x40b38765696e3d5d8d9d834d8aad4bb6e418e489", from_chain='eth', to_chain='eth'):
    url = 'https://li.quest/v1/quote'
    params = {
        'fromChain': from_chain,
        'toChain': to_chain,
        'fromToken': from_token,
        'toToken': to_token,
        'fromAmount': to_amount,
        'fromAddress': from_address,
    }

    print(f"Sending request to {url} with params: {params}")  # Debug the API request

    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed request. Status code: {response.status_code}, Response: {response.text}")  # Log full response
        return {"error": f"Failed to get quote: {response.status_code}"}


"""
Swap Method
"""
@app.route('/swap', methods=['GET','POST'])
def swap():
    # Extract query parameters from request
    input_amount = request.json.get('inputAmount')
    input_token = request.json.get('inputToken')
    output_token = request.json.get('outputToken')
    chain_name = request.json.get('chainName', 'eth')  # Default to 'eth' if not provided

    print('\n','~'*10,input_amount,input_token,output_token,chain_name,'~'*10,'\n')
    # Validate parameters   
    if not input_amount or not input_token or not output_token:
        return jsonify({"error": "Missing required parameters"}), 400

    # Call the function and return the result
    return get_quote_by_receiving_amount(
        from_token=input_token,
        to_token=output_token,
        to_amount=input_amount,
        from_chain=chain_name,
        to_chain=chain_name
    )



@app.route('/bridge', methods=['GET', 'POST'])
def bridge(): #DUMMY METHOD USED TO STORE STATES
    # Extract query parameters from the request
    input_amount = request.json.get('amount')
    input_token = request.json.get('token')
    source_chain = request.json.get('sourceChainName')
    output_chain = request.json.get('destinationChainName')

    # Validate parameters
    if not input_amount or not input_token or not source_chain or not output_chain:
        return jsonify({"error": "Missing required parameters"}), 400

    # Simulate transaction update
    transaction = {
        "status": "Transaction updated",
        "amount": input_amount,
        "token": input_token,
        "source_chain": source_chain,
        "destination_chain": output_chain
    }

    # Return the JSON response with transaction details
    return jsonify(transaction), 200
   

if __name__ == '__main__':
    app.run(debug=True, port=3002)
