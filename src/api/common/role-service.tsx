export const assignRole = async (uid: string, role: string) => {
  try {
    const response = await fetch('http://localhost:3000/assignRole', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, role }),
    });
    const result = await response.text();
    console.log(result);
    return result; // Return the response to the caller
  } catch (error) {
    console.error('Error assigning role:', error);
    throw error; // Throw error to handle it in the calling function
  }
};
