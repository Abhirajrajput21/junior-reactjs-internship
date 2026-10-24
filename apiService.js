/**
 * Unified network service factory to fetch live datasets from public REST API endpoints.
 * Explicitly intercepts non-200 HTTP frames and enforces strict validation checks.
 */
export const fetchServerDataRegistry = async () => {
  try {
 const response = await fetch('https://typicode.com');

    
    // Explicitly intercept structural HTTP errors (e.g., 404, 500)
    if (!response.ok) {
      throw new Error(`Upstream server pipeline connection failed with status code: ${response.status}`);
    }
    
    const plainJson = await response.json();
    
    // Data normalization layer maps raw values safely for UI presentation consumers
    return plainJson.map((item) => ({
      id: item.id.toString(),
      title: item.title,
      priority: item.id % 2 === 0 ? 'High' : 'Low',
      status: item.completed ? 'Resolved' : 'Active',
      timestamp: new Date().toLocaleDateString()
    }));
  } catch (error) {
    console.error('[API Service Core] Critical asynchronous transaction failure:', error);
    throw error; // Bubble error records up to component catch boundaries safely
  }
};
