// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {
      name: "Produkt 1",
      productType: "Service",
      priceDisplay: "13.00-20.00 EUR",
      variants: {
        default: {
          name: "Default Variation",
          price: 100, // price in cents
          vat: 7.7,
        },
      },
    },
  ]);
}
