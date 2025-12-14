import { useEffect, useState } from "react";
import "./Shop.scss";
import { getShopItems } from "../../contentful";
import { formatDateShort } from "../../globals/helpers";
import ShoppingCart from "./ShoppinCart";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Shop() {
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [shippingDestination, setShippingDestination] = useState<string | null>(
    null
  );

  const [shoppingCart, setShoppingCart] = useState<number[]>(
    JSON.parse(localStorage.getItem("shoppingCart") || "[]")
  );
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState<boolean>(false);

  const [clientName, setClientName] = useState<string | null>(null);

  useEffect(() => {
    getShopItems()
      .then((response) => setShopItems(response))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart, isShoppingCartOpen]);

  const handlePayPalSuccess = (name: string) => {
    setIsShoppingCartOpen(false);
    setShoppingCart([]);
    setClientName(name ?? "");
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "EUR",
      }}
    >
      <div className="shop">
        {clientName && (
          <div className="successModal">
            <h2>
              {clientName !== ""
                ? `Thank you, ${clientName}, for your purchase!`
                : "Thank you for your purchase!"}
            </h2>
            <p>
              I will prepare and send your order as fast as possible. Check your
              emails for the shipping details.
            </p>
            <p>
              <b>And thank you so much for supporting me!</b>
            </p>
            <div className="closeModal" onClick={() => setClientName(null)}>
              Close
            </div>
          </div>
        )}
        {isShoppingCartOpen && (
          <div
            className="overlay"
            onClick={() => setIsShoppingCartOpen(false)}
          ></div>
        )}
        <ShoppingCart
          shippingDestination={shippingDestination}
          setShippingDestination={setShippingDestination}
          isShoppingCartOpen={isShoppingCartOpen}
          setIsShoppingCartOpen={setIsShoppingCartOpen}
          shoppingCart={shoppingCart}
          setShoppingCart={setShoppingCart}
          shopItems={shopItems}
          handlePayPalSuccess={handlePayPalSuccess}
        />
        <div className="shopItems">
          {shopItems
            .sort((a, b) => b.id - a.id)
            .map((item, index) => {
              if (!item.isActive) return null;

              return (
                <div key={index} className="shopItem">
                  <img src={item.image.url} alt={item.title} />
                  <div className="shopItemInfo">
                    <div
                      className="shopItemTitle"
                      style={{ marginBottom: "1rem" }}
                    >
                      <h2>{item.title}</h2>
                      {item.shortDescription && <p>{item.shortDescription}</p>}
                      {`Release date: ${formatDateShort(item.releaseDate)}`}
                      {new Date(item.releaseDate) > new Date() && (
                        <p className="shopItemReleaseDateInfo">
                          This item will be shipped after{" "}
                          {formatDateShort(item.releaseDate)}
                        </p>
                      )}
                    </div>
                    <div>
                      <br />
                      <p className="shopItemPrice">{item.price}€</p>
                    </div>
                  </div>
                  <button
                    className="shopItemButton"
                    onClick={() =>
                      setShoppingCart((prev) => [...prev, item.id])
                    }
                  >
                    {shoppingCart.includes(item.id)
                      ? `${
                          shoppingCart.filter((id) => id === item.id).length
                        } in cart`
                      : "Add to cart"}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default Shop;
