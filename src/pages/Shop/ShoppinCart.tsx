import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { formatDateShort } from "../../globals/helpers";
import PayPalCheckout from "./PaypalCheckout";
import "./Shop.scss";
import {
  MAX_CDS_PER_PACKAGE,
  MAX_CDS_PER_PACKAGE_WITH_VINYL,
  MAX_VINYLS_PER_PACKAGE,
  PROMO_CODES,
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
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoValid, setPromoValid] = useState<boolean | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  const getShippingCost = useCallback(
    (destination: string | null) => {
      if (!destination) return 0;

      const numberOfCDs = shoppingCart.filter(
        (id) => shopItems.find((item) => item.id === id)?.type === "CD"
      ).length;
      const numberOfVinyls = shoppingCart.filter(
        (id) => shopItems.find((item) => item.id === id)?.type === "vinyl"
      ).length;

      const numberOfPackagesWithVinyl = Math.ceil(
        numberOfVinyls / MAX_VINYLS_PER_PACKAGE
      );

      const numberOfPackagesWithCD =
        numberOfCDs <= MAX_CDS_PER_PACKAGE_WITH_VINYL
          ? 0
          : Math.ceil(
              (numberOfCDs - MAX_CDS_PER_PACKAGE_WITH_VINYL) /
                MAX_CDS_PER_PACKAGE_WITH_VINYL
            );

      const numberOfPackagesWithCDWithoutVinyl = Math.ceil(
        numberOfCDs / MAX_CDS_PER_PACKAGE
      );

      switch (destination) {
        case "de":
          return numberOfVinyls > 0
            ? SHIPPING_COST_VINYL_DE * numberOfPackagesWithVinyl +
                SHIPPING_COST_CD_DE * numberOfPackagesWithCD
            : numberOfCDs > 0
            ? SHIPPING_COST_CD_DE * numberOfPackagesWithCDWithoutVinyl
            : 0;
        case "eu":
          return numberOfVinyls > 0
            ? SHIPPING_COST_VINYL_EU * numberOfPackagesWithVinyl +
                SHIPPING_COST_CD_EU * numberOfPackagesWithCD
            : numberOfCDs > 0
            ? SHIPPING_COST_CD_EU * numberOfPackagesWithCDWithoutVinyl
            : 0;
        case "uk":
          return numberOfVinyls > 0
            ? SHIPPING_COST_VINYL_UK_AND_IR * numberOfPackagesWithVinyl +
                SHIPPING_COST_CD_UK_AND_IR * numberOfPackagesWithCD
            : numberOfCDs > 0
            ? SHIPPING_COST_CD_UK_AND_IR * numberOfPackagesWithCDWithoutVinyl
            : 0;
        case "world":
          return numberOfVinyls > 0
            ? SHIPPING_COST_VINYL_WORLD * numberOfPackagesWithVinyl +
                SHIPPING_COST_CD_WORLD * numberOfPackagesWithCD
            : numberOfCDs > 0
            ? SHIPPING_COST_CD_WORLD * numberOfPackagesWithCDWithoutVinyl
            : 0;
        default:
          return 0;
      }
    },
    [shoppingCart, shopItems]
  );

  const getTotalPrice = useCallback(
    (doNotApplyPromo: boolean = false) => {
      const totalPriceWithoutShipping = shoppingCart.reduce((acc, id) => {
        const item = shopItems.find((item) => item.id === id);
        return acc + (item?.price || 0);
      }, 0);

      const promoDiscount = appliedPromo?.discountPercentage || 0;
      const totalPriceWithPromo = doNotApplyPromo
        ? totalPriceWithoutShipping
        : totalPriceWithoutShipping * (1 - promoDiscount / 100);

      const shippingCost = getShippingCost(shippingDestination);

      const totalPriceWithShipping = totalPriceWithPromo + shippingCost;
      return totalPriceWithShipping.toFixed(2);
    },
    [
      shoppingCart,
      shopItems,
      shippingDestination,
      getShippingCost,
      appliedPromo?.discountPercentage,
    ]
  );

  const shippingCost = useMemo(
    () => getShippingCost(shippingDestination).toFixed(2),
    [shippingDestination, getShippingCost]
  );

  const totalPrice = useMemo(() => getTotalPrice(), [getTotalPrice]);
  const totalPriceWithPromo = useMemo(
    () => getTotalPrice(true),
    [getTotalPrice]
  );

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

          {/* Promo Code input */}
          <div className="promoCodeContainer withDividerTop">
            <label className="promoCodeLabel" htmlFor="promoCodeInput">
              Promo code:
            </label>
            <div className="promoCodeInputContainer">
              <input
                type="text"
                id="promoCodeInput"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value.toUpperCase());
                  setPromoValid(null);
                }}
                placeholder="Enter code"
                className="promoCodeInput"
              />
              <button
                type="button"
                onClick={() => {
                  const promo = PROMO_CODES.find(
                    (pc) =>
                      pc.code === promoCode &&
                      new Date() >= pc.validFrom &&
                      new Date() <= pc.validUntil
                  );
                  setPromoValid(!!promo);
                  setAppliedPromo(promo || null);
                }}
                className="promoCodeButton"
              >
                Apply
              </button>
            </div>
            {promoValid === false && (
              <span className="promoCodeInvalid">
                Invalid or expired promo code
              </span>
            )}
            {promoValid === true && appliedPromo && (
              <span className="promoCodeValid">
                Congrats, you saved: -{appliedPromo.discountPercentage}%!
              </span>
            )}
          </div>

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
                Total price: {totalPrice}€{" "}
                <span className="promoCodeSaved">
                  {appliedPromo
                    ? ` (Saved ${
                        Number(totalPriceWithPromo) - Number(totalPrice)
                      }€ with promo code)`
                    : ""}
                </span>
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
                      value:
                        (item?.price || 0) *
                        (1 - (appliedPromo?.discountPercentage || 0) / 100),
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
