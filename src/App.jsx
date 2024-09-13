import { useState } from 'react';

const SSLChecker = () => {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkSSL = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/check/${domain}`);
      if (!response.ok) {
        throw new Error('Error fetching SSL data');
      }
      const data = await response.json();
      setResult(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ssl-checker">
      <h2>SSL Checker</h2>
      <input
        type="text"
        placeholder="Enter domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <button onClick={checkSSL} disabled={loading}>
        {loading ? 'Checking...' : 'Check SSL'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div>
          <h3>SSL Info for {domain}</h3>
          <p>SSL Certificate: {result.result.cert_valid ? "yes" : "no"}</p>
          <p>Valid till: {result.result.valid_till}</p>
          <p>Certificate issuer: {result.result.issuer_o}</p>
        </div>
      )}
    </div>
  );
};

export default SSLChecker;
