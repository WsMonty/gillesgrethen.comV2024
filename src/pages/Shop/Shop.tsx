import { useEffect, useState, useCallback } from 'react';
import './Shop.scss';
import { getShopItems } from '../../contentful';
import {
  MOBILE_BREAKPOINT,
  SHIPPING_COST_CD_DE,
  SHIPPING_COST_CD_EU,
  SHIPPING_COST_CD_UK_AND_IR,
  SHIPPING_COST_CD_WORLD,
  SHIPPING_COST_VINYL_DE,
  SHIPPING_COST_VINYL_EU,
  SHIPPING_COST_VINYL_UK_AND_IR,
  SHIPPING_COST_VINYL_WORLD,
} from '../../globals/constants';
import { FaShoppingCart, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { IoMdClose } from 'react-icons/io';

function PayPalCheckout({
  totalPrice,
  allArticles,
  onSuccess,
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
}) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: 'EUR',
      }}
    >
      <PayPalButtons
        key={totalPrice}
        createOrder={(_data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'EUR',
                  value: totalPrice,
                  breakdown: {
                    item_total: {
                      currency_code: 'EUR',
                      value: totalPrice,
                    },
                  },
                },
                items: allArticles.map((article) => ({
                  name: article.description,
                  unit_amount: {
                    currency_code: 'EUR',
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
            return Promise.reject('Order actions not available');
          return actions.order.capture().then((details) => {
            const payerName = details?.payer?.name?.given_name || 'customer';
            onSuccess(payerName);
          });
        }}
        style={{
          layout: 'vertical',
          color: 'black',
          shape: 'rect',
          label: 'paypal',
        }}
      />
    </PayPalScriptProvider>
  );
}

function Shop() {
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [shippingDestination, setShippingDestination] = useState<string>('de');

  const [shoppingCart, setShoppingCart] = useState<number[]>(
    JSON.parse(localStorage.getItem('shoppingCart') || '[]')
  );
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState<boolean>(false);

  const [clientName, setClientName] = useState<string | null>(null);

  useEffect(() => {
    getShopItems()
      .then((response) => setShopItems(response))
      .catch((error) => console.log(error));
  }, []);

  const handleShippingChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setShippingDestination(event.target.value);
  };

  const getShippingCost = useCallback(
    (destination: string) => {
      const numberOfCDs = shoppingCart.filter(
        (id) => shopItems.find((item) => item.id === id)?.type === 'CD'
      ).length;
      const numberOfVinyls = shoppingCart.filter(
        (id) => shopItems.find((item) => item.id === id)?.type === 'vinyl'
      ).length;

      switch (destination) {
        case 'de':
          return numberOfVinyls > 0
            ? SHIPPING_COST_VINYL_DE * numberOfVinyls +
                SHIPPING_COST_CD_DE *
                  Math.ceil(Math.max(0, numberOfCDs - numberOfVinyls * 2) / 3)
            : numberOfCDs > 0
            ? SHIPPING_COST_CD_DE *
              Math.ceil(numberOfCDs > 2 ? numberOfCDs / 3 : 1)
            : 0;
        case 'eu':
          return numberOfVinyls > 0
            ? SHIPPING_COST_VINYL_EU * numberOfVinyls +
                SHIPPING_COST_CD_EU *
                  Math.ceil(Math.max(0, numberOfCDs - numberOfVinyls * 2) / 3)
            : numberOfCDs > 0
            ? SHIPPING_COST_CD_EU *
              Math.ceil(numberOfCDs > 2 ? numberOfCDs / 3 : 1)
            : 0;
        case 'uk':
          return numberOfVinyls > 0
            ? SHIPPING_COST_VINYL_UK_AND_IR * numberOfVinyls +
                SHIPPING_COST_CD_UK_AND_IR *
                  Math.ceil(Math.max(0, numberOfCDs - numberOfVinyls * 2) / 3)
            : numberOfCDs > 0
            ? SHIPPING_COST_CD_UK_AND_IR *
              Math.ceil(numberOfCDs > 2 ? numberOfCDs / 3 : 1)
            : 0;
        case 'world':
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

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

    if (isShoppingCartOpen && shoppingCart.length === 0) {
      setIsShoppingCartOpen(false);
    }
  }, [shoppingCart, isShoppingCartOpen]);

  const handlePayPalSuccess = (name: string) => {
    setIsShoppingCartOpen(false);
    setShoppingCart([]);
    setClientName(name ?? '');
  };

  return (
    <div className="shop">
      {clientName && (
        <div className="successModal">
          <h2>
            {clientName !== ''
              ? `Thank you, ${clientName}, for your purchase!`
              : 'Thank you for your purchase!'}
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
      <div className="shopShippingInfo">
        {isMobile ? (
          <div className="shopShippingInfoMobile">
            <p className="shopShippingInfoText">Shipping to:</p>
            <select
              className="shopShippingSelect"
              onChange={handleShippingChange}
              value={shippingDestination}
              name="shipping"
              id="shipping"
            >
              <option value="de">Germany</option>
              <option value="eu">Europe (other than Germany)</option>
              <option value="uk">UK & Ireland</option>
              <option value="world">World</option>
            </select>
          </div>
        ) : (
          <>
            <p className="shopShippingInfoText">Shipping to:</p>
            <select
              className="shopShippingSelect"
              onChange={handleShippingChange}
              value={shippingDestination}
              name="shipping"
              id="shipping"
            >
              <option value="de">Germany</option>
              <option value="eu">Europe (other than Germany)</option>
              <option value="uk">UK & Ireland</option>
              <option value="world">World</option>
            </select>
          </>
        )}

        <p className="shopShippingCostInfo shopShippingCostInfoText">
          Total shipping cost: {shippingCost}€
        </p>
        <p className="shopShippingCostInfo shopShippingCostInfoText">
          Total price: {totalPrice}€
        </p>
        <div
          className="shopCart"
          onClick={() => setIsShoppingCartOpen(!isShoppingCartOpen)}
        >
          <FaShoppingCart size={24} />
          <p className="shopCartLength">{shoppingCart.length}</p>
        </div>
        <div
          className="shoppingCart"
          style={{ display: isShoppingCartOpen ? 'flex' : 'none' }}
        >
          <div className="shoppingCartHeader">
            <h2>Shopping Cart</h2>
            <IoMdClose
              className="shoppingCartClose"
              size={24}
              onClick={() => setIsShoppingCartOpen(false)}
            />
          </div>
          {[...new Set(shoppingCart)]
            .sort((a, b) => b - a)
            .map((id) => {
              const count = shoppingCart.filter(
                (itemId) => itemId === id
              ).length;
              const item = shopItems.find((item) => item.id === id);
              return (
                <div key={id} className="shoppingCartItem">
                  <p className="shoppingCartItemTitle">{item?.title}</p>
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
            <PayPalCheckout
              totalPrice={totalPrice}
              allArticles={[
                ...[...new Set(shoppingCart)].map((id) => {
                  const item = shopItems.find((item) => item.id === id);
                  return {
                    description: item?.title || '',
                    amount: {
                      currency_code: 'EUR',
                      value: item?.price || 0,
                    },
                    quantity: shoppingCart.filter((itemId) => itemId === id)
                      .length,
                  };
                }),
                {
                  description: 'Shipping',
                  amount: {
                    currency_code: 'EUR',
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
      <div className="shopItems">
        {shopItems
          .sort((a, b) => b.id - a.id)
          .map((item, index) => {
            if (!item.isActive) return null;

            return (
              <div key={index} className="shopItem">
                <img src={item.image.url} alt={item.title} />
                <div className="shopItemInfo">
                  <div className="shopItemTitle">
                    <h2>{item.title}</h2>
                    {item.shortDescription ? (
                      <p>{item.shortDescription}</p>
                    ) : (
                      <br />
                    )}
                  </div>
                  <div>
                    <br />
                    <p className="shopItemPrice">{item.price}€</p>
                  </div>
                </div>
                <button
                  className="shopItemButton"
                  onClick={() => setShoppingCart((prev) => [...prev, item.id])}
                >
                  {shoppingCart.includes(item.id)
                    ? `${
                        shoppingCart.filter((id) => id === item.id).length
                      } in cart`
                    : 'Add to cart'}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Shop;
