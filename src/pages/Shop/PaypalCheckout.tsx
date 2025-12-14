import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckout = ({
  totalPrice,
  allArticles,
  onSuccess,
  disabled,
}: {
  totalPrice: string;
  allArticles: {
    description: string;
    amount: {
      currency_code: string;
      value: number;
    };
    quantity: number;
  }[];
  onSuccess: (name: string) => void;
  disabled: boolean;
}) => {
  return (
    <PayPalButtons
      key={totalPrice}
      disabled={disabled}
      createOrder={(_data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: totalPrice,
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: totalPrice,
                  },
                },
              },
              items: allArticles.map((article) => ({
                name: article.description,
                unit_amount: {
                  currency_code: "EUR",
                  value: article.amount.value.toString(),
                },
                quantity: article.quantity.toString(),
              })),
            },
          ],
        });
      }}
      onApprove={(_data, actions) => {
        if (!actions.order)
          return Promise.reject("Order actions not available");
        return actions.order.capture().then((details) => {
          const payerName = details?.payer?.name?.given_name || "customer";
          onSuccess(payerName);
        });
      }}
      style={{
        layout: "vertical",
        color: "black",
        shape: "rect",
        label: "paypal",
      }}
    />
  );
};

export default PayPalCheckout;
