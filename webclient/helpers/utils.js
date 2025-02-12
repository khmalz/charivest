export const formatAddress = addr => {
   return `${addr?.substring(0, 15)}...`;
};

export const isAddressNull = () => {
   const address = localStorage.getItem("walletAddress");
   return address === null;
};
