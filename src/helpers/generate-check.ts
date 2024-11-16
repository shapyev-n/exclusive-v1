type MinimalBasketItem = {
  title: string;
  quantity: number;
  price: number;
  salePrice?: number;
};

export function generateCheck(
  basketItems: MinimalBasketItem[],
  userId: string
): string {
  if (basketItems.length === 0) {
    return "Корзина пуста.";
  }

  let check = `Чек пользователя:\n ${userId}\n`;
  check += "---------------------------------\n";

  basketItems.forEach((item, index) => {
    const itemTotalPrice = (item.salePrice ?? item.price) * item.quantity;
    check += `${index + 1}. ${item.title}\n`;
    check += `   Количество: ${item.quantity}\n`;
    check += `   Цена за единицу: $${item.salePrice ?? item.price}\n`;
    check += `   Итого за товар: $${itemTotalPrice}\n`;
    check += "---------------------------------\n";
  });

  const totalPrice = basketItems.reduce(
    (acc, item) => acc + (item.salePrice ?? item.price) * item.quantity,
    0
  );

  check += `Общая сумма: $${totalPrice}\n`;
  check += "Спасибо за покупку!\n";

  return check;
}

export function downloadCheck(check: string) {
  const blob = new Blob([check], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "check.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
