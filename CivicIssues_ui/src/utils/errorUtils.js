export const extractErrorMessage = (err) => {
  const data = err.response?.data;

  if (data?.aError && Array.isArray(data.aError) && data.aError.length > 0) {
    return data.aError[0].sMessage;
  }

  if (data?.message) {
    return data.message;
  }

  return "Something went wrong. Please try again.";
};
