import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { formatDateShort } from "../../globals/helpers";
import PayPalCheckout from "./PaypalCheckout";
import "./Shop.scss";
import {
  SHIPPING_COST_CD_DE,
  SHIPPING_COST_CD_EU,
  SHIPPING_COST_CD_UK_AND_IR,
  SHIPPING_COST_CD_WORLD,
  SHIPPING_COST_VINYL_DE,
  SHIPPING_COST_VINYL_EU,
  SHIPPING_COST_VINYL_UK_AND_IR,
  SHIPPING_COST_VINYL_WORLD,
} from "../../globals/constants";

interface ShoppingCartProps {
  shippingDestination: string | null;
  setShippingDestination: Dispatch<SetStateAction<string | null>>;
  isShoppingCartOpen: boolean;
  setIsShoppingCartOpen: Dispatch<SetStateAction<boolean>>;
  shoppingCart: number[];
  setShoppingCart: Dispatch<SetStateAction<number[]>>;
  shopItems: ShopItem[];
  handlePayPalSuccess: (name: string) => void;
}

const ShoppingCart = ({
  shippingDestination,
  setShippingDestination,
  isShoppingCartOpen,
  setIsShoppingCartOpen,
  shoppingCart,
  setShoppingCart,
  shopItems,
  handlePayPalSuccess,
}: ShoppingCartProps) => {
  const getShippingCost = useCallback(
    (destination: string | null) => {
      if (!destination) return 0;

      const numberOfCDs = shoppingCart.filter(
        (id) => shopItems.find((item) => item.id === id)?.type === "CD"
      ).length;
      const numberOfVinyls = shoppingCart.filter(
        (id) => shopItems.find((item) => item.id === id)?.type === "vinyl"
      ).length;

      switch (destination) {
        case "de":
          return numberOfVinyls > 0
            ? SHIPPING_COST_VINYL_DE * numberOfVinyls +
                SHIPPING_COST_CD_DE *
                  Math.ceil(Math.max(0, numberOfCDs - numberOfVinyls * 2) / 3)
            : numberOfCDs > 0
            ? SHIPPING_COST_CD_DE *
              Math.ceil(numberOfCDs > 2 ? numberOfCDs / 3 : 1)
            : 0;
        case "eu":
          return numberOfVinyls > 0
            ? SHIPPING_COST_VINYL_EU * numberOfVinyls +
                SHIPPING_COST_CD_EU *
                  Math.ceil(Math.max(0, numberOfCDs - numberOfVinyls * 2) / 3)
            : numberOfCDs > 0
            ? SHIPPING_COST_CD_EU *
              Math.ceil(numberOfCDs > 2 ? numberOfCDs / 3 : 1)
            : 0;
        case "uk":
          return numberOfVinyls > 0
            ? SHIPPING_COST_VINYL_UK_AND_IR * numberOfVinyls +
                SHIPPING_COST_CD_UK_AND_IR *
                  Math.ceil(Math.max(0, numberOfCDs - numberOfVinyls * 2) / 3)
            : numberOfCDs > 0
            ? SHIPPING_COST_CD_UK_AND_IR *
              Math.ceil(numberOfCDs > 2 ? numberOfCDs / 3 : 1)
            : 0;
        case "world":
          return numberOfVinyls > 0
            ? SHIPPING_COST_VINYL_WORLD * numberOfVinyls +
                SHIPPING_COST_CD_WORLD *
                  Math.ceil(Math.max(0, numberOfCDs - numberOfVinyls * 2) / 3)
            : numberOfCDs > 0
            ? SHIPPING_COST_CD_WORLD *
              Math.ceil(numberOfCDs > 2 ? numberOfCDs / 3 : 1)
            : 0;
        default:
          return 0;
      }
    },
    [shoppingCart, shopItems]
  );

  const getTotalPrice = useCallback(() => {
    return (
      shoppingCart.reduce((acc, id) => {
        const item = shopItems.find((item) => item.id === id);
        return acc + (item?.price || 0);
      }, 0) + getShippingCost(shippingDestination)
    ).toFixed(2);
  }, [shoppingCart, shopItems, shippingDestination, getShippingCost]);

  const [totalPrice, setTotalPrice] = useState<string>(getTotalPrice());
  const [shippingCost, setShippingCost] = useState<string>(
    getShippingCost(shippingDestination).toFixed(2)
  );

  useEffect(() => {
    setTotalPrice(getTotalPrice());
    setShippingCost(getShippingCost(shippingDestination).toFixed(2));
  }, [
    shippingDestination,
    shoppingCart,
    shopItems,
    getTotalPrice,
    getShippingCost,
  ]);
  const handleShippingChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setShippingDestination(event.target.value);
  };

  return (
    <div className="shopShippingInfo">
      <div className="mobileShoppingCartContainer">
        <div
          className="shopCart"
          onClick={(e) => {
            e.stopPropagation();
            setIsShoppingCartOpen(!isShoppingCartOpen);
          }}
        >
          <p className="shopCartText">Shopping Cart</p>
          <div className="shopCartIconContainer">
            <FaShoppingCart size={24} className="shopCartIcon" />
            {shoppingCart.length > 0 && (
              <p className="shopCartLength">{shoppingCart.length}</p>
            )}
          </div>
        </div>
      </div>
      <div
        className="shoppingCart"
        style={{ display: isShoppingCartOpen ? "flex" : "none" }}
      >
        <div className="shoppingCartContent">
          <div className="shoppingCartHeader">
            <h2>Shopping Cart</h2>
            <IoMdClose
              className="shoppingCartClose"
              size={24}
              onClick={() => setIsShoppingCartOpen(false)}
            />
          </div>
          {shoppingCart.length === 0 && (
            <p className="shoppingCartEmpty">
              Your cart is still empty, put some music in here!
            </p>
          )}
          {[...new Set(shoppingCart)]
            .sort((a, b) => b - a)
            .map((id) => {
              const count = shoppingCart.filter(
                (itemId) => itemId === id
              ).length;
              const item = shopItems.find((item) => item.id === id);
              return (
                <div key={id} className="shoppingCartItem">
                  <div className="shoppingCartItemTitleContainer">
                    <p className="shoppingCartItemTitle">{item?.title}</p>
                    {item?.releaseDate &&
                      new Date(item?.releaseDate) > new Date() && (
                        <p className="shopItemReleaseDateInfo">
                          This item will be shipped after{" "}
                          {formatDateShort(item?.releaseDate)}
                        </p>
                      )}
                  </div>
                  <div className="shoppingCartItemControls">
                    <FaMinus
                      className="shoppingCartItemControl"
                      size={12}
                      onClick={() =>
                        setShoppingCart((prev) => {
                          const index = prev.indexOf(id);
                          if (index === -1) return prev;
                          return [
                            ...prev.slice(0, index),
                            ...prev.slice(index + 1),
                          ];
                        })
                      }
                    />
                    <span>{count}</span>
                    <FaPlus
                      className="shoppingCartItemControl"
                      size={12}
                      onClick={() => setShoppingCart((prev) => [...prev, id])}
                    />
                    <FaTrash
                      className="shoppingCartItemControl"
                      size={12}
                      onClick={() =>
                        setShoppingCart((prev) =>
                          prev.filter((itemId) => itemId !== id)
                        )
                      }
                    />
                  </div>
                </div>
              );
            })}

          {shoppingCart.length > 0 && (
            <>
              <p className="shopShippingCostInfo shopShippingCostInfoText withDividerTop">
                {`Total shipping cost: ${
                  parseFloat(shippingCost) === 0
                    ? "Please select your region!"
                    : shippingCost + " €"
                }`}
              </p>
              <p className="shopShippingCostInfo shopShippingCostInfoText">
                Total price: {totalPrice}€
              </p>

              <div className="shopShippingInfoContainer">
                <p className="shopShippingInfoText">Shipping to:</p>
                <select
                  className={`shopShippingSelect ${
                    shippingDestination === null ? "warning" : ""
                  }`}
                  onChange={handleShippingChange}
                  value={shippingDestination || ""}
                  name="shipping"
                  id="shipping"
                >
                  <option value="" disabled>
                    Please select your region!
                  </option>
                  <option value="de">Germany</option>
                  <option value="eu">Europe (other than Germany)</option>
                  <option value="uk">UK & Ireland</option>
                  <option value="world">World</option>
                </select>
              </div>
            </>
          )}
          {shoppingCart.length > 0 && (
            <PayPalCheckout
              totalPrice={totalPrice}
              disabled={shippingDestination === null}
              allArticles={[
                ...[...new Set(shoppingCart)].map((id) => {
                  const item = shopItems.find((item) => item.id === id);
                  return {
                    description: item?.title || "",
                    amount: {
                      currency_code: "EUR",
                      value: item?.price || 0,
                    },
                    quantity: shoppingCart.filter((itemId) => itemId === id)
                      .length,
                  };
                }),
                {
                  description: "Shipping",
                  amount: {
                    currency_code: "EUR",
                    value: getShippingCost(shippingDestination),
                  },
                  quantity: 1,
                },
              ]}
              onSuccess={handlePayPalSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
