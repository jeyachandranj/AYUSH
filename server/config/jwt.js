module.exports = {
  secret:
    process.env.JWT_SECRET ||
    "a78a4e6b00bfb90ddd00fd28f9b78651e0cfa44c629ac5c4edaddc61fc28cf8ceef22a294f7664b5a85600cc24aed8ce1d372b0e331211b34b69e9666e5840ae",
  expiresIn: "1h",
};
