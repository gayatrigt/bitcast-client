// (Assuming libraries like react, ethers.js, and a UI library are imported)

interface SigninForm {
  address: string;
}

const SigninComponent: React.FC = () => {
  const [formData, setFormData] = useState<SigninForm>({ address: '' });
  const [signing, setSigning] = useState(false);
  const signer = new ethers.SignerWithProvider(// ... connect to wallet provider);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignin = async () => {
    setSigning(true);
    try {
      const domain = { ... (your domain details) }; // Define domain details
      const message = {
        domain,
        message: 'Sign in to your DApp',
        address: formData.address,
      };

      const signature = await signer._signTypedData(domain.name, domain.version, message);

      // Send the signed message to the backend API for verification
      const response = await fetch('/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...message, signature }),
      });

      const data = await response.json();
      if (data.message === 'Signin successful') {
        console.log('Signed in successfully!');
        // Handle successful signin (e.g., navigate to app)
      } else {
        console.error('Signin failed:', data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSigning(false);
    }
  };

  return (
    <div>
      <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Wallet Address" />
      <button disabled={signing} onClick={handleSignin}>
        {signing ? 'Signing...' : 'Sign In'}
      </button>
    </div>
  );
};

export default SigninComponent;














import React, { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [signerAddress, setSignerAddress] = useState('');
  const [isSignatureValid, setIsSignatureValid] = useState(null);

  // Function to handle signing the message
  const signMessage = async () => {
    try {
      // Connect to Ethereum provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Request access to user's accounts
      await window.ethereum.enable();
      
      // Get the signer
      const signer = provider.getSigner();

      // Sign the message
      const signature = await signer.signMessage(message);

      // Set the signature
      setSignature(signature);
      
      // Set the signer address
      const signerAddress = await signer.getAddress();
      setSignerAddress(signerAddress);

      // Reset signature validation
      setIsSignatureValid(null);
    } catch (error) {
      console.error('Error signing message:', error);
    }
  };

  // Function to verify the signature
  const verifySignature = async () => {
    try {
      // Create a new ethers.Signer instance
      const signer = new ethers.VoidSigner(signerAddress);

      // Verify the signature
      const recoveredAddress = await signer.verifyMessage(message, signature);

      // Compare the recovered address with the signer address
      setIsSignatureValid(recoveredAddress.toLowerCase() === signerAddress.toLowerCase());
    } catch (error) {
      console.error('Error verifying signature:', error.message);
    }
  };

  return (
    <div>
      <h1>Sign Message</h1>
      <input
        type="text"
        placeholder="Enter message to sign"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={signMessage}>Sign Message</button>

      {signature && (
        <div>
          <p>Signed Message:</p>
          <p>{signature}</p>
          <p>Signer Address: {signerAddress}</p>
          <button onClick={verifySignature}>Verify Signature</button>
          {isSignatureValid !== null && (
            <p>Signature is {isSignatureValid ? 'valid' : 'invalid'}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
